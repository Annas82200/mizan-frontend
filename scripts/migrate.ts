import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../db/client';
import { pool } from '../db/client';

console.log('Running migrations...');
