import jwt from 'jsonwebtoken';
import { db } from '../../db/index';
import { users, sessions } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { Request, Response, NextFunction } from 'express';
