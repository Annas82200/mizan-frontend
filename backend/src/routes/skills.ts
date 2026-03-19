/**
 * Skills Routes — Frameworks, assessments, employee profiles, gap analysis
 */
import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { skillFrameworks, skills, employeeSkills, skillAssessments, skillGapAnalyses } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';

const router = Router();
interface AuthRequest extends Request { userId: string; tenantId: string; userRole: string; }

// Frameworks
router.get('/frameworks', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const frameworks = await db.select().from(skillFrameworks).where(eq(skillFrameworks.tenantId, tenantId));
    return res.json({ frameworks });
  } catch (error) { console.error('[Skills] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to list frameworks' }); }
});

router.post('/frameworks', async (req: Request, res: Response) => {
  const { tenantId, userId } = req as AuthRequest;
  const { name, description, categories, levels } = req.body;
  try {
    const [framework] = await db.insert(skillFrameworks).values({ tenantId, name, description, categories, levels, createdBy: userId }).returning();
    return res.status(201).json({ framework });
  } catch (error) { console.error('[Skills] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to create framework' }); }
});

// Skills within a framework
router.get('/frameworks/:frameworkId/skills', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const result = await db.select().from(skills).where(and(eq(skills.frameworkId, req.params.frameworkId), eq(skills.tenantId, tenantId)));
    return res.json({ skills: result });
  } catch (error) { console.error('[Skills] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to list skills' }); }
});

// Employee skill profile
router.get('/employee/:employeeId', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  try {
    const profile = await db.select().from(employeeSkills).where(and(eq(employeeSkills.employeeId, req.params.employeeId), eq(employeeSkills.tenantId, tenantId)));
    return res.json({ skills: profile });
  } catch (error) { console.error('[Skills] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to get profile' }); }
});

// Assessments
router.get('/assessments', async (req: Request, res: Response) => {
  const { tenantId, userId } = req as AuthRequest;
  try {
    const assessments = await db.select().from(skillAssessments).where(and(eq(skillAssessments.tenantId, tenantId), eq(skillAssessments.employeeId, userId))).orderBy(desc(skillAssessments.createdAt));
    return res.json({ assessments });
  } catch (error) { console.error('[Skills] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to list assessments' }); }
});

router.post('/assessments', async (req: Request, res: Response) => {
  const { tenantId, userId } = req as AuthRequest;
  const { frameworkId, assessmentType, results } = req.body;
  try {
    const [assessment] = await db.insert(skillAssessments).values({ tenantId, employeeId: userId, frameworkId, assessmentType: assessmentType || 'self', results: results || [] }).returning();
    return res.status(201).json({ assessment });
  } catch (error) { console.error('[Skills] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to create assessment' }); }
});

// Gap analysis
router.get('/gaps', async (req: Request, res: Response) => {
  const { tenantId } = req as AuthRequest;
  const scope = (req.query.scope as string) || 'organization';
  try {
    const gaps = await db.select().from(skillGapAnalyses).where(and(eq(skillGapAnalyses.tenantId, tenantId), eq(skillGapAnalyses.scope, scope))).orderBy(desc(skillGapAnalyses.analysisDate)).limit(1);
    return res.json({ analysis: gaps[0] || null });
  } catch (error) { console.error('[Skills] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to get gap analysis' }); }
});

// Bot query endpoint (used by existing skills bot page)
router.post('/bot/query', async (req: Request, res: Response) => {
  const { tenantId, userId } = req as AuthRequest;
  const { message } = req.body;
  try {
    const { AssistantController } = await import('../services/assistant/assistant-controller');
    const controller = new AssistantController();
    const response = await controller.processMessage({ message, tenantId, userId, userRole: (req as AuthRequest).userRole });
    return res.json(response);
  } catch (error) { console.error('[Skills Bot] Error:', (error as Error).message); return res.status(500).json({ error: 'Failed to process query' }); }
});

export default router;
