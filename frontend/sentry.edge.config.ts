/**
 * Sentry Edge Runtime Configuration
 *
 * Initializes Sentry for Edge Runtime (middleware, edge API routes)
 * Set SENTRY_DSN in environment variables to enable
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,

  // Adjust this value in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  debug: false,

  environment: process.env.NODE_ENV || 'development',
});
