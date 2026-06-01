/**
 * validators.js — express-validator rule sets
 *
 * Each exported array is passed directly to the route definition.
 * Validation errors are collected and checked at the top of each controller.
 */

'use strict';

const { body } = require('express-validator');

// ── Shared helpers ────────────────────────────────────────────────────────────

/**
 * Build an email validation rule for a given field name.
 * Pre-registration uses 'Email' (capital E); contact form uses 'email'.
 */
const emailRule = (field = 'email') =>
  body(field)
    .trim()
    .isEmail()
    .withMessage('A valid email address is required')
    .normalizeEmail({ gmail_remove_dots: false });

/**
 * Build a phone validation rule for a given field name.
 * Accepts international format: +<7–15 digits>
 */
const phoneRule = (field) =>
  body(field)
    .trim()
    .matches(/^\+\d{7,15}$/)
    .withMessage(`${field} must be a valid international phone number (e.g. +919876543210)`);

// ── Pre-Registration ──────────────────────────────────────────────────────────
// Field names match the frontend FormData keys exactly (PascalCase).

const preRegistrationRules = [
  body('Name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 30 }).withMessage('Name must be 30 characters or fewer')
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Name may only contain letters, numbers, and spaces'),

  // Frontend sends 'Email' (capital E)
  emailRule('Email'),

  // Frontend sends 'Contact/WhatsApp' with dial code already prepended
  phoneRule('Contact/WhatsApp'),

  body('Age')
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 1, max: 99 }).withMessage('Age must be between 1 and 99'),

  body('Gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Non-Binary', 'Other']).withMessage('Invalid gender value'),

  body('City')
    .trim()
    .notEmpty().withMessage('City is required')
    .isLength({ max: 100 }).withMessage('City must be 100 characters or fewer'),

  body('Fandom')
    .notEmpty().withMessage('Fandom is required')
    .isIn(['Anime', 'K-Pop', 'Anime & K-Pop', 'Other']).withMessage('Invalid fandom value'),

  body('page')
    .optional()
    .trim()
    .isLength({ max: 100 }),
];

// ── Contact / Partners Enquiry ────────────────────────────────────────────────
// Field names match the frontend formData keys exactly (camelCase).

const contactEnquiryRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 30 }).withMessage('Name must be 30 characters or fewer')
    .matches(/^[a-zA-Z0-9 ]+$/).withMessage('Name may only contain letters, numbers, and spaces'),

  // Frontend sends 'email' (lowercase)
  emailRule('email'),

  // Frontend sends 'phone' with dial code already prepended
  phoneRule('phone'),

  body('company')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 30 }).withMessage('Company must be 30 characters or fewer')
    .matches(/^[a-zA-Z0-9 ]*$/).withMessage('Company may only contain letters, numbers, and spaces'),

  body('interest')
    .notEmpty().withMessage('Interest is required')
    .isIn([
      'Investor',
      'Brand Sponsor',
      'Exhibitor / Vendor',
      'Media Partner',
      'Artist / Performer',
      'Fan / Attendee',
      'Other',
    ]).withMessage('Invalid interest value'),

  body('message')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 2000 }).withMessage('Message must be 2000 characters or fewer'),

  body('page')
    .optional()
    .trim()
    .isLength({ max: 100 }),

  body('usePartnersSheet')
    .optional()
    .isBoolean().withMessage('usePartnersSheet must be a boolean'),
];

module.exports = { preRegistrationRules, contactEnquiryRules };
