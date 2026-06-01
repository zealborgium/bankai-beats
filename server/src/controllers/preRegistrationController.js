/**
 * preRegistrationController.js
 *
 * Handles POST /api/pre-registration
 *
 * Flow:
 *  1. Validate & sanitise the incoming payload (express-validator).
 *  2. INSERT into pre_registrations (primary DB write).
 *  3. Immediately return 201 to the client.
 *  4. Fire-and-forget: dispatch the same payload to the GAS webhook so the
 *     existing Google Sheet automation continues to work unchanged.
 */

'use strict';

const { validationResult } = require('express-validator');
const { v4: uuidv4 }       = require('uuid');
const { query }            = require('../config/db');
const { dispatchToGAS }    = require('../services/gasWebhook');
const logger               = require('../config/logger');

/**
 * POST /api/pre-registration
 */
async function createPreRegistration(req, res) {
  // ── Validation ─────────────────────────────────────────────────────────────
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  errors.array(),
    });
  }

  // ── Extract fields (matching the frontend FormData keys exactly) ───────────
  // Note: normalizeEmail() in the validator writes the sanitised value back
  // to the same field name ('Email'), so we read it as 'Email' here.
  const {
    Name,
    Email,
    'Contact/WhatsApp': contactWhatsApp,
    Age,
    Gender,
    City,
    Fandom,
    page = 'Pre-Registration',
  } = req.body;

  try {
    // ── 1. Primary DB write ──────────────────────────────────────────────────
    const result = await query(
      `INSERT INTO pre_registrations
         (id, name, email, contact_whatsapp, age, gender, city, fandom, page)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, created_at`,
      [
        uuidv4(),
        Name.trim(),
        Email.trim().toLowerCase(),
        contactWhatsApp.trim(),
        parseInt(Age, 10),
        Gender,
        City.trim(),
        Fandom,
        page,
      ]
    );

    const { id: recordId, created_at } = result.rows[0];

    logger.info('Pre-registration saved', { recordId, email: Email });

    // ── 2. Respond to client immediately (don't wait for GAS) ────────────────
    res.status(201).json({
      success:   true,
      message:   'Pre-registration successful',
      data:      { id: recordId, created_at },
    });

    // ── 3. Fire-and-forget GAS dual-write ────────────────────────────────────
    // We intentionally do NOT await this.  The client already has its 201.
    // dispatchToGAS handles all errors internally and writes to gas_webhook_log.
    dispatchToGAS({
      targetUrl:   process.env.GAS_PRE_REGISTRATION_URL,
      payload:     req.body,   // forward the exact payload the frontend sent
      recordType:  'pre_registration',
      recordId,
      sourceTable: 'pre_registrations',
    });

  } catch (err) {
    logger.error('Failed to save pre-registration', { error: err.message });

    // Duplicate email is a common expected error — surface it clearly.
    if (err.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'This email is already pre-registered.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'An internal error occurred. Please try again.',
    });
  }
}

module.exports = { createPreRegistration };
