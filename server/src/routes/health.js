/**
 * routes/health.js
 *
 * GET /api/health — lightweight liveness + readiness probe.
 *
 * Returns:
 *  200  { status: 'ok', db: 'ok' }          — server and DB are healthy
 *  503  { status: 'degraded', db: 'error' } — server up but DB unreachable
 */

'use strict';

const { Router } = require('express');
const { query }  = require('../config/db');
const logger     = require('../config/logger');

const router = Router();

router.get('/', async (req, res) => {
  let dbStatus = 'ok';

  try {
    await query('SELECT 1');
  } catch (err) {
    dbStatus = 'error';
    logger.warn('Health check: DB unreachable', { error: err.message });
  }

  const httpStatus = dbStatus === 'ok' ? 200 : 503;

  res.status(httpStatus).json({
    status:    dbStatus === 'ok' ? 'ok' : 'degraded',
    db:        dbStatus,
    timestamp: new Date().toISOString(),
    env:       process.env.NODE_ENV,
  });
});

module.exports = router;
