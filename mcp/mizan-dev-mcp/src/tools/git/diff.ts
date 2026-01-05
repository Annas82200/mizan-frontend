import { exec } from 'child_process';
import { promisify } from 'util';
import { z } from 'zod';
import { MCPError, ErrorCodes } from '@mizan-mcp/shared';
import { getConfig } from '../../config';

const execAsync = promisify(exec);

/**
 * Input schema for git_diff tool
 */
const GitDiffInputSchema = z.object({
  path: z.string().optional(),
  staged: z.boolean().default(false),
  maxLines: z.number().positive().default(1000),
});

/**
 * Git diff tool
 *
 * Shows git diff for the repository
 *
 * @param input - Tool input
 * @returns Git diff output
 */
export async function gitDiff(input: unknown): Promise<{
  diff: string;
  stats: {
    filesChanged: number;
    insertions: number;
    deletions: number;
  };
  truncated: boolean;
}> {
  const config = getConfig();

  // Validate input
  const params = GitDiffInputSchema.parse(input);

  try {
    // Build diff command
    let diffCmd = 'git diff';
    if (params.staged) {
      diffCmd += ' --cached';
    }
    if (params.path) {
      diffCmd += ` -- "${params.path}"`;
    }

    // Get diff
    const { stdout: diffOutput } = await execAsync(diffCmd, {
      cwd: config.repoRoot,
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });

    // Get diff stats
    let statsCmd = 'git diff --stat';
    if (params.staged) {
      statsCmd += ' --cached';
    }
    if (params.path) {
      statsCmd += ` -- "${params.path}"`;
    }

    const { stdout: statsOutput } = await execAsync(statsCmd, {
      cwd: config.repoRoot,
    });

    // Parse stats
    let filesChanged = 0;
    let insertions = 0;
    let deletions = 0;

    const statsMatch = statsOutput.match(/(\d+) files? changed(?:, (\d+) insertions?)?(?:, (\d+) deletions?)?/);
    if (statsMatch) {
      filesChanged = parseInt(statsMatch[1]) || 0;
      insertions = parseInt(statsMatch[2]) || 0;
      deletions = parseInt(statsMatch[3]) || 0;
    }

    // Truncate if too long
    const lines = diffOutput.split('\n');
    const truncated = lines.length > params.maxLines;
    const diff = lines.slice(0, params.maxLines).join('\n');

    return {
      diff,
      stats: {
        filesChanged,
        insertions,
        deletions,
      },
      truncated,
    };
  } catch (error) {
    throw new MCPError(
      'Git diff failed',
      ErrorCodes.OPERATION_FAILED,
      500,
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        cwd: config.repoRoot,
      }
    );
  }
}
