import { Router } from 'express';
import { AgentManager } from '../services/agents/agent-manager';
import { authenticate as authenticateToken, authorize } from '../middleware/auth';
import { z } from 'zod';

const router = Router();
