import { z } from 'zod';
import { BackendClient, InsightObject } from '../../clients/backend-client';

/**
 * Input schema for generate_insights tool
 */
const GenerateInsightsInputSchema = z.object({
  tenantId: z.string().uuid(),
  companyValues: z.array(z.string()).min(1),
  strategy: z.string().optional(),
});

/**
 * Generate structured insight objects from culture data
 *
 * Uses CultureAgentV2 Three-Engine analysis to generate actionable insights:
 * - Strengths (cultural accelerators)
 * - Gaps (cultural blockers)
 * - Risks (cylinder health warnings)
 * - Opportunities (areas for improvement)
 *
 * Each insight includes:
 * - Type (strength, gap, risk, opportunity)
 * - Cylinder level (1-7, or 0 for cross-cylinder)
 * - Title and description
 * - Impact level (low, medium, high)
 * - Actionable recommendations
 *
 * @param input - Tool input
 * @returns Array of structured insights
 */
export async function generateInsights(input: unknown): Promise<{
  insights: InsightObject[];
  tenantId: string;
  insightCounts: {
    strengths: number;
    gaps: number;
    risks: number;
    opportunities: number;
  };
  generatedAt: string;
}> {
  // Validate input schema
  const params = GenerateInsightsInputSchema.parse(input);

  // Create backend client
  const client = new BackendClient();

  // Generate insights using Three-Engine analysis
  const insights = await client.generateInsights(
    params.tenantId,
    params.companyValues,
    params.strategy
  );

  // Count insights by type
  const insightCounts = {
    strengths: insights.filter((i) => i.type === 'strength').length,
    gaps: insights.filter((i) => i.type === 'gap').length,
    risks: insights.filter((i) => i.type === 'risk').length,
    opportunities: insights.filter((i) => i.type === 'opportunity').length,
  };

  return {
    insights,
    tenantId: params.tenantId,
    insightCounts,
    generatedAt: new Date().toISOString(),
  };
}
