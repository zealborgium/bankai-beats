/**
 * routes/contact.js
 *
 * POST /api/contact
 */

'use strict';

const { Router } = require('express');
const { contactEnquiryRules }   = require('../middleware/validators');
const { createContactEnquiry }  = require('../controllers/contactController');
const { asyncHandler }          = require('../middleware/errorHandler');

const router = Router();

/**
 * @route   POST /api/contact
 * @desc    Save a contact/partner enquiry and dual-write to Google Sheets
 * @access  Public
 */
router.post('/', contactEnquiryRules, asyncHandler(createContactEnquiry));

module.exports = router;
