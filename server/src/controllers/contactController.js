/**
 * contactController.js
 *
 * Handles POST /api/contact
 *
 * The same controller serves both the general Contact form and the Partners
 * form.  The frontend passes a `usePartnersSheet` flag (or the backend infers
 * it from the `page` field) to route the GAS webhook to the correct script URL.
 *
 * Flow:
 *  1. Validate & sanitise.
 *  2. INSERT into contact_enquiries.
 *  3. Return 201 to the client.
 *  4. Fire-and-forget GAS dual-write to the correct script URL.
 */

'use strict';

const { validationResult } = require('express-validator');
const { v4: uuidv4 }       = require('uuid');
const { query }            = require('../config/db');
const { dispatchToGAS }    = require('../services/gasWebhook');
const logger               = require('../config/logger');

/**
 * Determine which GAS URL to use based on the payload.
 * The frontend sets usePartnersSheet=true for the Partners page form.
 */
function resolveGASUrl(body) {
  const isPartners =
    body.usePartnersSheet === true ||
    body.usePartnersSheet === 'true' ||
    (body.page && body.page.toLowerCase().includes('partner'));

  return isPartners
    ? process.env.GAS_PARTNERS_URL
    : process.env.GAS_CONTACT_URL;
}

/**
 * POST /api/contact
 */
async function createContactEnquiry(req, res) {
  // ── Validation ─────────────────────────────────────────────────────────────
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors:  errors.array(),
    });
  }

  // ── Extract fields (matching the frontend formData keys exactly) ───────────
  const {
    name,
    email,
    phone,
    company   = null,
    interest,
    message   = null,
    page      = 'Homepage',
    usePartnersSheet = false,
  } = req.body;

  // Determine sheet target label for the DB record
  const sheetTarget =
    usePartnersSheet === true || usePartnersSheet === 'true' ? 'partners' : 'contact';

  try {
    // ── 1. Primary DB write ──────────────────────────────────────────────────
    const result = await query(
      `INSERT INTO contact_enquiries
         (id, name, email, phone, company, interest, message, page, sheet_target)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, created_at`,
      [
        uuidv4(),
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        company ? company.trim() : null,
        interest,
        message ? message.trim() : null,
        page,
        sheetTarget,
      ]
    );

    const { id: recordId, created_at } = result.rows[0];

    logger.info('Contact enquiry saved', { recordId, email, interest, sheetTarget });

    // ── 2. Respond to client immediately ─────────────────────────────────────
    res.status(201).json({
      success:  true,
      message:  'Enquiry received successfully',
      data:     { id: recordId, created_at },
    });

    // ── 3. Fire-and-forget GAS dual-write ────────────────────────────────────
    // Strip the internal `usePartnersSheet` flag before forwarding — the GAS
    // script doesn't need it and it keeps the payload clean.
    const gasPayload = { ...req.body };
    delete gasPayload.usePartnersSheet;

    dispatchToGAS({
      targetUrl:   resolveGASUrl(req.body),
      payload:     gasPayload,
      recordType:  'contact_enquiry',
      recordId,
      sourceTable: 'contact_enquiries',
    });

  } catch (err) {
    logger.error('Failed to save contact enquiry', { error: err.message });

    return res.status(500).json({
      success: false,
      message: 'An internal error occurred. Please try again.',
    });
  }
}

module.exports = { createContactEnquiry };
