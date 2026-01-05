import { z } from 'zod';
import { BackendClient, CylinderAggregation } from '../../clients/backend-client';

/**
 * Input schema for aggregate_levels tool
 */
const AggregateLevelsInputSchema = z.object({
  tenantId: z.string().uuid(),
  departmentId: z.string().uuid().optional(),
});

/**
 * Aggregate cylinder scores across employees
 *
 * Returns average cylinder scores by level (1-7) for:
 * - Department (if departmentId provided)
 * - Organization (if no departmentId)
 *
 * Each cylinder includes:
 * - Enabling value score (average count of enabling values)
 * - Limiting value score (average count of limiting values)
 * - Net score (enabling - limiting)
 * - Employee count (number of employees with data for this cylinder)
 *
 * @param input - Tool input
 * @returns Cylinder aggregations for all 7 levels
 */
export async function aggregateLevels(input: unknown): Promise<{
  aggregations: CylinderAggregation[];
  scope: {
    tenantId: string;
    departmentId?: string;
    level: 'department' | 'organization';
  };
  totalEmployees: number;
}> {
  // Validate input schema
  const params = AggregateLevelsInputSchema.parse(input);

  // Create backend client
  const client = new BackendClient();

  // Aggregate cylinder scores
  const aggregations = await client.aggregateCylinderScores(
    params.tenantId,
    params.departmentId
  );

  // Calculate total unique employees
  const totalEmployees = Math.max(
    ...aggregations.map((agg) => agg.employeeCount),
    0
  );

  return {
    aggregations,
    scope: {
      tenantId: params.tenantId,
      departmentId: params.departmentId,
      level: params.departmentId ? 'department' : 'organization',
    },
    totalEmployees,
  };
}
