/**
 * gasWebhook.js — Google Apps Script dual-write service
 *
 * Responsibilities:
 *  1. Fire-and-forget POST to the appropriate GAS deployment URL.
 *  2. Write an audit row to gas_webhook_log regardless of outcome.
 *  3. Update the gas_synced / gas_sync_error columns on the source record.
 *
 * This function is intentionally NOT awaited by the controller so the HTTP
 * response is returned to the client immediately.  All errors are swallowed
 * here and written to the log table instead.
 *
 * GAS note: Google Apps Script web apps return HTTP 302 redirects when called
 * with mode:"no-cors" from a browser.  From a server-side Node call we follow
 * the redirect automatically (axios default) and receive a 200 with the script
 * output.  The script itself uses ContentService so the final status is 200.
 */

'use strict';

const axios  = require('axios');
const { query } = require('../config/db');
const logger = require('../config/logger');

// Axios instance with a generous timeout — GAS cold-starts can be slow.
const gasClient = axios.create({
  timeout: 15_000,          // 15 s
  maxRedirects: 5,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Dispatch a payload to a GAS webhook URL and record the outcome.
 *
 * @param {object} opts
 * @param {string} opts.targetUrl    - GAS deployment URL
 * @param {object} opts.payload      - The exact JSON body to forward
 * @param {string} opts.recordType   - 'pre_registration' | 'contact_enquiry'
 * @param {string} opts.recordId     - UUID of the DB row just inserted
 * @param {string} opts.sourceTable  - Table name to update gas_synced on
 */
async function dispatchToGAS({ targetUrl, payload, recordType, recordId, sourceTable }) {
  let httpStatus   = null;
  let responseBody = null;
  let errorMessage = null;
  let succeeded    = false;

  try {
    const response = await gasClient.post(targetUrl, payload);
    httpStatus   = response.status;
    responseBody = typeof response.data === 'string'
      ? response.data.slice(0, 500)          // cap stored response size
      : JSON.stringify(response.data).slice(0, 500);
    succeeded    = response.status >= 200 && response.status < 300;

    logger.info('GAS webhook dispatched', {
      recordType,
      recordId,
      httpStatus,
      succeeded,
    });
  } catch (err) {
    // Axios wraps HTTP errors; extract the most useful info.
    httpStatus   = err.response?.status ?? null;
    responseBody = err.response?.data
      ? JSON.stringify(err.response.data).slice(0, 500)
      : null;
    errorMessage = err.message;

    logger.warn('GAS webhook failed', {
      recordType,
      recordId,
      httpStatus,
      error: err.message,
    });
  }

  // ── 1. Write audit log ────────────────────────────────────────────────────
  try {
    await query(
      `INSERT INTO gas_webhook_log
         (record_type, record_id, target_url, payload, http_status, response_body, error_message, succeeded)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        recordType,
        recordId,
        targetUrl,
        JSON.stringify(payload),
        httpStatus,
        responseBody,
        errorMessage,
        succeeded,
      ]
    );
  } catch (logErr) {
    // Never let a logging failure surface to the caller.
    logger.error('Failed to write gas_webhook_log', { error: logErr.message });
  }

  // ── 2. Update source record sync status ───────────────────────────────────
  try {
    await query(
      `UPDATE ${sourceTable}
          SET gas_synced     = $1,
              gas_sync_error = $2
        WHERE id = $3`,
      [succeeded, errorMessage, recordId]
    );
  } catch (updateErr) {
    logger.error('Failed to update gas_synced on source record', {
      sourceTable,
      recordId,
      error: updateErr.message,
    });
  }
}

module.exports = { dispatchToGAS };
