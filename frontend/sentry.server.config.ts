/**
 * Sentry Server Configuration
 *
 * Initializes Sentry for server-side error tracking in Next.js
 * Set SENTRY_DSN in environment variables to enable
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  environment: process.env.NODE_ENV || 'development',

  // Filter out sensitive data
  beforeSend(event) {
    // Remove sensitive data from server-side events
    if (event.request) {
      delete event.request.cookies;
      if (event.request.headers) {
        delete event.request.headers.authorization;
        delete event.request.headers.cookie;
      }
    }

    // Remove sensitive environment variables
    if (event.contexts?.runtime?.name === 'node') {
      delete event.contexts.runtime;
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    'ECONNRESET',
    'ETIMEDOUT',
    'ENOTFOUND',
    'Network request failed',
  ],
});
