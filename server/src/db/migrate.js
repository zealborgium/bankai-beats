/**
 * migrate.js — One-shot schema migration script
 *
 * Run with:  node src/db/migrate.js
 *
 * Creates all tables if they don't already exist.
 * Safe to re-run (uses IF NOT EXISTS throughout).
 */

'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const { pool } = require('../config/db');
const logger   = require('../config/logger');

// ─── Schema DDL ──────────────────────────────────────────────────────────────

const DDL = `
-- ── pre_registrations ────────────────────────────────────────────────────────
-- Mirrors the Pre-Registration form fields exactly.
-- "Contact/WhatsApp" is stored as contact_whatsapp to follow SQL naming.
CREATE TABLE IF NOT EXISTS pre_registrations (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(30) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  contact_whatsapp VARCHAR(20) NOT NULL,          -- includes dial code, e.g. +919876543210
  age              SMALLINT    NOT NULL CHECK (age BETWEEN 1 AND 99),
  gender           VARCHAR(20) NOT NULL,
  city             VARCHAR(100) NOT NULL,
  fandom           VARCHAR(50) NOT NULL,
  page             VARCHAR(100) NOT NULL DEFAULT 'Pre-Registration',

  -- Dual-write tracking
  gas_synced       BOOLEAN     NOT NULL DEFAULT FALSE,  -- TRUE once GAS webhook confirmed
  gas_sync_error   TEXT,                                -- last error message if sync failed

  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pre_reg_email      ON pre_registrations (email);
CREATE INDEX IF NOT EXISTS idx_pre_reg_created_at ON pre_registrations (created_at DESC);

-- ── contact_enquiries ─────────────────────────────────────────────────────────
-- Covers both the general Contact form and the Partners form.
-- The "page" column distinguishes the source (Homepage, Partners, etc.).
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name           VARCHAR(30)  NOT NULL,
  email          VARCHAR(255) NOT NULL,
  phone          VARCHAR(20)  NOT NULL,            -- includes dial code
  company        VARCHAR(30),
  interest       VARCHAR(50)  NOT NULL,
  message        TEXT,
  page           VARCHAR(100) NOT NULL DEFAULT 'Homepage',
  sheet_target   VARCHAR(20)  NOT NULL DEFAULT 'contact',  -- 'contact' | 'partners'

  -- Dual-write tracking
  gas_synced     BOOLEAN      NOT NULL DEFAULT FALSE,
  gas_sync_error TEXT,

  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_email      ON contact_enquiries (email);
CREATE INDEX IF NOT EXISTS idx_contact_interest   ON contact_enquiries (interest);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_enquiries (created_at DESC);

-- ── gas_webhook_log ───────────────────────────────────────────────────────────
-- Audit trail for every outbound call to Google Apps Script.
-- Useful for replaying failed syncs without touching the main tables.
CREATE TABLE IF NOT EXISTS gas_webhook_log (
  id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  record_type   VARCHAR(30)  NOT NULL,   -- 'pre_registration' | 'contact_enquiry'
  record_id     UUID         NOT NULL,
  target_url    TEXT         NOT NULL,
  payload       JSONB        NOT NULL,
  http_status   SMALLINT,               -- NULL if network error before response
  response_body TEXT,
  error_message TEXT,
  attempt       SMALLINT     NOT NULL DEFAULT 1,
  succeeded     BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gas_log_record_id ON gas_webhook_log (record_id);
CREATE INDEX IF NOT EXISTS idx_gas_log_succeeded ON gas_webhook_log (succeeded);

-- ── updated_at auto-update trigger ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_pre_reg_updated_at'
  ) THEN
    CREATE TRIGGER trg_pre_reg_updated_at
    BEFORE UPDATE ON pre_registrations
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_contact_updated_at'
  ) THEN
    CREATE TRIGGER trg_contact_updated_at
    BEFORE UPDATE ON contact_enquiries
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END $$;
`;

// ─── Run ─────────────────────────────────────────────────────────────────────

(async () => {
  logger.info('Running database migrations…');
  try {
    await pool.query(DDL);
    logger.info('✅  Migrations complete — all tables are up to date.');
  } catch (err) {
    logger.error('Migration failed', { error: err.message, detail: err.detail });
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
