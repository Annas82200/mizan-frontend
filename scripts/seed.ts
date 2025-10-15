import { db } from '../db/client';
import { sql } from 'drizzle-orm';
import {
  frameworkConfig,
  payments,
  skillsFrameworks
} from '../db/schema';
import { hashPassword } from '../services/auth';
import { randomUUID } from 'crypto';

console.log('🌱 Seeding database...');
