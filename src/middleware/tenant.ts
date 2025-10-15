import { db } from '../../db/index';
import { tenants, users } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Request, Response, NextFunction } from 'express';
