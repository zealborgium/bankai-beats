/**
 * index.js — Bankai Beats Backend entry point
 *
 * Boots the Express server with:
 *  - Security headers (helmet)
 *  - CORS (configurable via ALLOWED_ORIGINS env var)
 *  - JSON body parsing
 *  - Request logging (morgan → winston)
 *  - Rate limiting
 *  - API routes
 *  - Global error handler
 */

'use strict';

// Load .env before anything else
require('dotenv').config();

const express     = require('express');
const helmet      = require('helmet');
const cors        = require('cors');
const morgan      = require('morgan');
const rateLimit   = require('express-rate-limit');

const logger              = require('./config/logger');
const { globalErrorHandler } = require('./middleware/errorHandler');

// ── Route modules ─────────────────────────────────────────────────────────────
const healthRouter          = require('./routes/health');
const preRegistrationRouter = require('./routes/preRegistration');
const contactRouter         = require('./routes/contact');

// ─────────────────────────────────────────────────────────────────────────────

const app  = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' is not allowed`));
    },
    methods:     ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// ── HTTP request logging ──────────────────────────────────────────────────────
// Pipe morgan output through winston so all logs go to the same stream.
app.use(
  morgan('combined', {
    stream: { write: (msg) => logger.http(msg.trim()) },
    skip:   (req) => req.path === '/api/health', // don't log health-check noise
  })
);

// ── Rate limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 min
  max:      parseInt(process.env.RATE_LIMIT_MAX       || '100',    10),
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
});

app.use('/api/', limiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/health',           healthRouter);
app.use('/api/pre-registration', preRegistrationRouter);
app.use('/api/contact',          contactRouter);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler (must be last) ───────────────────────────────────────
app.use(globalErrorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  logger.info(`🚀  Bankai Beats backend running on port ${PORT}`, {
    env:  process.env.NODE_ENV,
    port: PORT,
  });
});

// Graceful shutdown — close DB pool on SIGTERM (e.g. from Docker / PM2)
const { pool } = require('./config/db');

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received — shutting down gracefully');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received — shutting down gracefully');
  await pool.end();
  process.exit(0);
});

module.exports = app; // exported for testing
