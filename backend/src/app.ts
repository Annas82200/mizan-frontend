/**
 * Mizan Platform — Backend Application Entry Point
 *
 * Express.js server with:
 * - Three-Engine AI System (Claude + Mistral + Gemini)
 * - Universal HRIS Connector
 * - Unified AI Assistant
 * - White-Label Branding Engine
 * - WebSocket (Socket.io) for real-time features
 * - Redis caching + BullMQ job queues
 * - Audit logging + rate limiting
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { initializeWebSocket } from './infrastructure/websocket/socket-server';
import { rateLimiter, aiRateLimiter, hrisSyncRateLimiter } from './middleware/rate-limiter';
import { auditLogger } from './middleware/audit-logger';
import { authMiddleware } from './middleware/auth';
import { closeDatabase } from './db/index';
import { closeRedis } from './infrastructure/redis';
import { closeAllQueues } from './infrastructure/bullmq/queue-registry';

// Route imports
import assistantRoutes from './routes/assistant';
import hrisRoutes from './routes/hris';
import brandingRoutes from './routes/branding';
import engagementRoutes from './routes/engagement';
import onboardingRoutes from './routes/onboarding';
import modulesRoutes from './routes/modules';
import gdprRoutes from './routes/gdpr';
import analyticsRoutes from './routes/analytics';
import lxpAiRoutes from './routes/lxp-ai';
import performance360Routes from './routes/performance-360';
// Core HR module routes
import skillsRoutes from './routes/skills';
import performanceRoutes from './routes/performance';
import cultureRoutes from './routes/culture';
import hiringCrudRoutes from './routes/hiring-crud';
import lxpCrudRoutes from './routes/lxp-crud';
import talentRoutes from './routes/talent';
import bonusRoutes from './routes/bonus-routes';
import analysisRoutes from './routes/analysis';

const app = express();
const httpServer = createServer(app);

// === Global Middleware ===
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(rateLimiter()); // Global rate limiter
app.use(authMiddleware()); // JWT auth — populates tenantId/userId/userRole (skips /api/health, /api/branding)
app.use(auditLogger()); // Audit log all mutations

// === Health Check ===
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    version: '2.0.0',
    engines: { knowledge: 'mistral', reasoning: 'claude', data: 'gemini' },
    timestamp: new Date().toISOString(),
  });
});

// === API Routes (with specialized rate limiters) ===
app.use('/api/assistant', aiRateLimiter, assistantRoutes);
app.use('/api/hris', hrisSyncRateLimiter, hrisRoutes);
app.use('/api/branding', brandingRoutes);
app.use('/api/engagement', engagementRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/modules', modulesRoutes);
app.use('/api/gdpr', gdprRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/lxp/ai', aiRateLimiter, lxpAiRoutes);
app.use('/api/performance/360', aiRateLimiter, performance360Routes);
// Core HR module routes
app.use('/api/skills', skillsRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/culture', cultureRoutes);
app.use('/api/hiring', hiringCrudRoutes);
app.use('/api/lxp', lxpCrudRoutes);
app.use('/api/talent', talentRoutes);
app.use('/api/bonus', bonusRoutes);
app.use('/api/analysis', aiRateLimiter, analysisRoutes);

// === WebSocket Initialization ===
initializeWebSocket(httpServer);

// === Start Server ===
const PORT = parseInt(process.env.PORT || '5001', 10);
const server = httpServer.listen(PORT, () => {
  console.info(`[Mizan] Server running on port ${PORT}`);
  console.info(`[Mizan] AI Engines: Knowledge(Mistral) + Reasoning(Claude) + Data(Gemini)`);
  console.info(`[Mizan] WebSocket: Enabled`);
  console.info(`[Mizan] Routes: 18 API route groups mounted`);
});

// === Graceful Shutdown ===
async function shutdown(signal: string) {
  console.info(`[Mizan] ${signal} received, shutting down gracefully...`);
  server.close(async () => {
    await closeAllQueues();
    await closeRedis();
    await closeDatabase();
    console.info('[Mizan] Shutdown complete');
    process.exit(0);
  });
  // Force close after 10 seconds
  setTimeout(() => { process.exit(1); }, 10_000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default app;
