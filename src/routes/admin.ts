import { Router, Request, Response } from 'express';
import { db } from '../../db/index';
import { and, eq, desc } from 'drizzle-orm';
import { authenticate } from '../../middleware/auth';
import { 
  users,
  cultureAssessments,
  performanceReviews,
  skills,
  skillsGaps
} from '../../db/schema';
import { z } from 'zod';
