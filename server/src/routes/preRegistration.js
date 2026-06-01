/**
 * routes/preRegistration.js
 *
 * POST /api/pre-registration
 */

'use strict';

const { Router } = require('express');
const { preRegistrationRules }    = require('../middleware/validators');
const { createPreRegistration }   = require('../controllers/preRegistrationController');
const { asyncHandler }            = require('../middleware/errorHandler');

const router = Router();

/**
 * @route   POST /api/pre-registration
 * @desc    Save a new pre-registration and dual-write to Google Sheets
 * @access  Public
 */
router.post('/', preRegistrationRules, asyncHandler(createPreRegistration));

module.exports = router;
