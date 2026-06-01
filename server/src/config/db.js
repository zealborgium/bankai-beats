/**
 * db.js — PostgreSQL connection pool
 *
 * Uses the `pg` Pool so connections are reused across requests.
 * The pool is lazy: it connects on first query, not at import time.
 */

'use strict';

const { Pool } = require('pg');
const logger   = require('./logger');

// Build connection config from individual env vars OR a full DATABASE_URL.
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      // Required when connecting to managed Postgres (e.g. Supabase, Railway, Render)
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }
  : {
      host:     process.env.DB_HOST     || 'localhost',
      port:     parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_NAME     || 'bankai_beats',
      user:     process.env.DB_USER     || 'postgres',
      password: process.env.DB_PASSWORD || '',
      ssl:      process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };

const pool = new Pool({
  ...poolConfig,
  max:             10,   // max connections in pool
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

// Log pool-level errors so they don't crash the process silently.
pool.on('error', (err) => {
  logger.error('Unexpected PostgreSQL pool error', { error: err.message });
});

/**
 * Convenience wrapper — run a parameterised query.
 * @param {string} text   SQL string with $1, $2 … placeholders
 * @param {Array}  params Parameter values
 */
const query = (text, params) => pool.query(text, params);

module.exports = { pool, query };
