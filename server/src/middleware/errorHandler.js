/**
 * errorHandler.js — Global Express error-handling middleware
 *
 * Must be registered LAST in the middleware chain (after all routes).
 * Catches any error passed via next(err) or thrown inside async handlers
 * that are wrapped with asyncHandler.
 */

'use strict';

const logger = require('../config/logger');

/**
 * Wraps an async route handler so unhandled promise rejections are forwarded
 * to Express's next() instead of crashing the process.
 *
 * Usage:  router.post('/path', asyncHandler(myController))
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Express error-handling middleware (4-argument signature required).
 */
// eslint-disable-next-line no-unused-vars
function globalErrorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;

  logger.error('Unhandled error', {
    status,
    message: err.message,
    path:    req.path,
    method:  req.method,
    stack:   process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });

  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message,
  });
}

module.exports = { asyncHandler, globalErrorHandler };
