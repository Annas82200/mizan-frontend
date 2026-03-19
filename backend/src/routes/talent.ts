/**
 * Talent Routes — Succession plans, development plans, 9-box, talent pools
 */
import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { talentPools, nineBoxPlacements, successionPlans, successionCandidates, developmentPlans } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';

const router = Router();
interface AuthRequest extends Request { userId: string; tenantId: string; userRole: string; }

// Overview
router.get('/overview', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const [pools, plans, placements] = await Promise.all([
      db.select().from(talentPools).where(eq(talentPools.tenantId, tenantId)),
      db.select().from(successionPlans).where(eq(successionPlans.tenantId, tenantId)),
      db.select().from(nineBoxPlacements).where(eq(nineBoxPlacements.tenantId, tenantId)),
    ]);
    return res.json({ talentPools: pools.length, successionPlans: plans.length, nineBoxPlacements: placements.length });
  } catch (error) { console.error('[Talent] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to get overview' }); }
});

// Succession plans
router.get('/succession-plans', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const plans = await db.select().from(successionPlans).where(eq(successionPlans.tenantId, tenantId)).orderBy(desc(successionPlans.createdAt));
    return res.json({ plans });
  } catch (error) { console.error('[Talent] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to list plans' }); }
});

router.post('/succession-plans', async (req: Request, res: Response) => {
  const { tenantId, userId } = req as AuthRequest;
  const { positionTitle, positionId, departmentId, priority, requiredCompetencies, timelineMonths } = req.body;
  try {
    const [plan] = await db.insert(successionPlans).values({ tenantId, positionTitle, positionId, departmentId, priority, requiredCompetencies, timelineMonths, createdBy: userId }).returning();
    return res.status(201).json({ plan });
  } catch (error) { console.error('[Talent] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to create plan' }); }
});

// Development plans
router.get('/development-plans', async (req: Request, res: Response) => {
  const { tenantId, userId, userRole } = req as AuthRequest;
  try {
    const query = ['manager', 'admin', 'executive'].includes(userRole)
      ? eq(developmentPlans.tenantId, tenantId)
      : and(eq(developmentPlans.tenantId, tenantId), eq(developmentPlans.employeeId, userId));
    const plans = await db.select().from(developmentPlans).where(query).orderBy(desc(developmentPlans.createdAt));
    return res.json({ plans });
  } catch (error) { console.error('[Talent] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to list plans' }); }
});

// Analytics
router.get('/analytics', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const [plans, placements] = await Promise.all([
      db.select().from(successionPlans).where(eq(successionPlans.tenantId, tenantId)),
      db.select().from(nineBoxPlacements).where(eq(nineBoxPlacements.tenantId, tenantId)),
    ]);
    const critical = plans.filter(p => p.priority === 'critical');
    return res.json({ totalPlans: plans.length, criticalPlans: critical.length, nineBoxCount: placements.length });
  } catch (error) { console.error('[Talent] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to get analytics' }); }
});

export default router;
