/**
 * HRIS Connector Routes — CRUD and sync operations for HRIS integrations
 */

import { Router, Request, Response } from 'express';
import { validate } from '../middleware/validate';
import { createConnectorSchema } from '../middleware/schemas';
import { ConnectorGateway } from '../services/hris/connector-gateway';
import { db } from '../db/index';
import { connectorConfigs, syncLogs, syncConflicts } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';

const router = Router();
const gateway = new ConnectorGateway();

interface AuthRequest extends Request {
  userId: string;
  tenantId: string;
}

// List all connectors for tenant
router.get('/connectors', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const connectors = await gateway.listConnectors(tenantId);
    return res.json({ connectors });
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Failed to list connectors' });
  }
});

// Create a new connector
router.post('/connectors', validate(createConnectorSchema), async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  const { name, hrisType, connectionType, baseUrl, authConfig, fieldMappings, syncSchedule, conflictResolution, metadata } = req.body;

  try {
    const [connector] = await db
      .insert(connectorConfigs)
      .values({
        tenantId,
        name,
        hrisType,
        connectionType,
        baseUrl,
        authConfig,
        fieldMappings: fieldMappings || {},
        syncSchedule: syncSchedule || {},
        conflictResolution: conflictResolution || 'hris_wins',
        metadata: metadata || {},
        status: 'configuring',
      })
      .returning();

    return res.status(201).json({ connector });
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Failed to create connector' });
  }
});

// Get connector details
router.get('/connectors/:id', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  const connectorId = req.params.id;

  try {
    const rows = await db
      .select()
      .from(connectorConfigs)
      .where(and(eq(connectorConfigs.id, connectorId), eq(connectorConfigs.tenantId, tenantId)))
      .limit(1);

    if (rows.length === 0) return res.status(404).json({ error: 'Connector not found' });
    return res.json({ connector: rows[0] });
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Failed to get connector' });
  }
});

// Update connector
router.put('/connectors/:id', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  const connectorId = req.params.id;

  try {
    // Whitelist allowed fields — never spread raw req.body into DB update
    const { name, hrisType, connectionType, baseUrl, authConfig, fieldMappings, syncSchedule, conflictResolution, metadata } = req.body;
    const [updated] = await db
      .update(connectorConfigs)
      .set({ name, hrisType, connectionType, baseUrl, authConfig, fieldMappings, syncSchedule, conflictResolution, metadata, updatedAt: new Date() })
      .where(and(eq(connectorConfigs.id, connectorId), eq(connectorConfigs.tenantId, tenantId)))
      .returning();

    return res.json({ connector: updated });
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Failed to update connector' });
  }
});

// Test connection
router.post('/connectors/:id/test', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const result = await gateway.testConnection(req.params.id, tenantId);
    return res.json(result);
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Connection test failed' });
  }
});

// Trigger full sync
router.post('/connectors/:id/sync/full', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const result = await gateway.executeFullSync(req.params.id, tenantId);
    return res.json(result);
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Full sync failed' });
  }
});

// Trigger incremental sync
router.post('/connectors/:id/sync/incremental', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const result = await gateway.executeIncrementalSync(req.params.id, tenantId);
    return res.json(result);
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Incremental sync failed' });
  }
});

// Get sync logs
router.get('/connectors/:id/sync/logs', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  const limit = parseInt(req.query.limit as string) || 20;

  try {
    const logs = await db
      .select()
      .from(syncLogs)
      .where(and(eq(syncLogs.connectorId, req.params.id), eq(syncLogs.tenantId, tenantId)))
      .orderBy(desc(syncLogs.startedAt))
      .limit(limit);

    return res.json({ logs });
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Failed to get sync logs' });
  }
});

// Get unresolved conflicts
router.get('/connectors/:id/conflicts', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;

  try {
    const conflicts = await db
      .select()
      .from(syncConflicts)
      .where(and(
        eq(syncConflicts.connectorId, req.params.id),
        eq(syncConflicts.tenantId, tenantId),
        eq(syncConflicts.status, 'pending')
      ));

    return res.json({ conflicts });
  } catch (error) {
    console.error('[API] Error:', (error as Error).message);
    return res.status(500).json({ error: 'Failed to get conflicts' });
  }
});

export default router;
