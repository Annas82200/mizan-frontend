import { z } from 'zod';
import { BackendClient, EntropyCalculationScope } from '../../clients/backend-client';

/**
 * Input schema for compute_entropy tool
 */
const ComputeEntropyInputSchema = z.object({
  scope: z.object({
    type: z.enum(['individual', 'department', 'organization']),
    tenantId: z.string().uuid(),
    departmentId: z.string().uuid().optional(),
    employeeId: z.string().uuid().optional(),
  }),
});

/**
 * Compute cultural entropy (percentage of limiting values)
 *
 * Entropy = (Limiting Value Count / Total Value Count) * 100
 *
 * Interpretation:
 * - 0-20%: Healthy culture, strong enabling values
 * - 21-40%: Moderate health, some limiting values present
 * - 41-60%: Warning signs, limiting values gaining ground
 * - 61-80%: Unhealthy culture, limiting values dominate
 * - 81-100%: Critical state, urgent intervention needed
 *
 * @param input - Tool input
 * @returns Entropy calculation result with interpretation
 */
export async function computeEntropy(input: unknown): Promise<{
  entropy: number;
  enablingCount: number;
  limitingCount: number;
  totalCount: number;
  interpretation: string;
  affectedEmployeeCount: number;
  scope: EntropyCalculationScope;
}> {
  // Validate input schema
  const params = ComputeEntropyInputSchema.parse(input);

  // Validate scope parameters
  if (params.scope.type === 'individual' && !params.scope.employeeId) {
    throw new Error('employeeId is required for individual scope');
  }
  if (params.scope.type === 'department' && !params.scope.departmentId) {
    throw new Error('departmentId is required for department scope');
  }

  // Create backend client
  const client = new BackendClient();

  // Compute entropy
  const result = await client.computeEntropy(params.scope);

  return {
    ...result,
    scope: params.scope,
  };
}
