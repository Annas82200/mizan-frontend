/**
 * Database Client — Drizzle ORM connection to PostgreSQL
 *
 * Provides the `db` instance used by all services and routes.
 * Supports connection pooling for enterprise-scale concurrency.
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema/index';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

const pool = new Pool({
  connectionString,
  max: parseInt(process.env.DB_POOL_MAX || '20', 10),
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
  console.error('[Database] Unexpected pool error:', err.message);
});

export const db = drizzle(pool, { schema });

/**
 * Graceful shutdown — drain the connection pool
 */
export async function closeDatabase(): Promise<void> {
  await pool.end();
}
