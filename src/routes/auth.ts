import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/index';
import { users, tenants } from '../../db/schema';
import { authenticate, authorize } from '../../middleware/auth';
import * as authService from '../../services/auth';

const router = Router();
