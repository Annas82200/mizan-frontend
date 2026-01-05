import { z } from 'zod';
import { BackendClient, AssessmentSubmission } from '../../clients/backend-client';

/**
 * Input schema for validate_submission tool
 */
const ValidateSubmissionInputSchema = z.object({
  submission: z.object({
    employeeId: z.string().uuid(),
    tenantId: z.string().uuid(),
    personalValues: z.array(z.string()).min(1),
    currentExperienceValues: z.array(z.string()),
    desiredFutureValues: z.array(z.string()),
    engagementLevel: z.number().min(0).max(100),
    recognitionLevel: z.number().min(0).max(100),
  }),
});

/**
 * Validate culture assessment submission
 *
 * Checks:
 * - Required fields present
 * - Value selections are valid
 * - Engagement/recognition levels in range
 * - Employee and tenant exist
 *
 * @param input - Tool input
 * @returns Validation result with errors and warnings
 */
export async function validateSubmission(input: unknown): Promise<{
  valid: boolean;
  errors: string[];
  warnings: string[];
  submission: AssessmentSubmission;
}> {
  // Validate input schema
  const params = ValidateSubmissionInputSchema.parse(input);

  // Create backend client
  const client = new BackendClient();

  // Validate submission
  const result = await client.validateSubmission(params.submission);

  return {
    ...result,
    submission: params.submission,
  };
}
