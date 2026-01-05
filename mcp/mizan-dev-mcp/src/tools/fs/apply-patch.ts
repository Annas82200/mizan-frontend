import { promises as fs } from 'fs';
import { z } from 'zod';
import { validatePath } from '../../security/path-validator';
import { getConfig } from '../../config';

/**
 * Input schema for apply_patch tool
 */
const ApplyPatchInputSchema = z.object({
  changes: z.array(
    z.object({
      path: z.string().min(1),
      content: z.string(),
      mode: z.enum(['create', 'update', 'delete']).default('update'),
    })
  ),
  dryRun: z.boolean().default(false),
});

/**
 * Apply patch tool
 *
 * Applies multiple file changes in a single operation
 *
 * @param input - Tool input
 * @returns Results of patch operation
 */
export async function applyPatch(input: unknown): Promise<{
  applied: string[];
  failed: Array<{ path: string; error: string }>;
  dryRun: boolean;
}> {
  const config = getConfig();

  // Validate input
  const params = ApplyPatchInputSchema.parse(input);

  const applied: string[] = [];
  const failed: Array<{ path: string; error: string }> = [];

  for (const change of params.changes) {
    try {
      // Validate path
      const fullPath = validatePath(change.path, config.repoRoot);

      if (params.dryRun) {
        // Dry run: just validate, don't actually apply
        applied.push(change.path);
        continue;
      }

      switch (change.mode) {
        case 'create':
        case 'update':
          await fs.writeFile(fullPath, change.content, 'utf-8');
          applied.push(change.path);
          break;

        case 'delete':
          await fs.unlink(fullPath);
          applied.push(change.path);
          break;
      }
    } catch (error) {
      failed.push({
        path: change.path,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return {
    applied,
    failed,
    dryRun: params.dryRun,
  };
}
