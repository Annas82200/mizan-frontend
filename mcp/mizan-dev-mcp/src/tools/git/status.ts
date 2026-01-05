import { exec } from 'child_process';
import { promisify } from 'util';
import { z } from 'zod';
import { MCPError, ErrorCodes, GitStatusResult } from '@mizan-mcp/shared';
import { getConfig } from '../../config';

const execAsync = promisify(exec);

/**
 * Input schema for git_status tool
 */
const GitStatusInputSchema = z.object({
  short: z.boolean().default(false),
});

/**
 * Git status tool
 *
 * Shows git status for the repository
 *
 * @param input - Tool input
 * @returns Git status information
 */
export async function gitStatus(input: unknown): Promise<GitStatusResult> {
  const config = getConfig();

  // Validate input
  GitStatusInputSchema.parse(input);

  try {
    // Get current branch
    const { stdout: branchOutput } = await execAsync('git branch --show-current', {
      cwd: config.repoRoot,
    });
    const branch = branchOutput.trim();

    // Get status with porcelain format for parsing
    const { stdout: statusOutput } = await execAsync('git status --porcelain', {
      cwd: config.repoRoot,
    });

    // Parse status output
    const modified: string[] = [];
    const added: string[] = [];
    const deleted: string[] = [];
    const untracked: string[] = [];
    const staged: string[] = [];

    const lines = statusOutput.split('\n').filter((line) => line.trim());
    for (const line of lines) {
      const status = line.substring(0, 2);
      const file = line.substring(3);

      if (status.includes('M')) {
        modified.push(file);
        if (status[0] === 'M') {
          staged.push(file);
        }
      }
      if (status.includes('A')) {
        added.push(file);
        staged.push(file);
      }
      if (status.includes('D')) {
        deleted.push(file);
        if (status[0] === 'D') {
          staged.push(file);
        }
      }
      if (status.includes('?')) {
        untracked.push(file);
      }
    }

    // Get ahead/behind counts
    let ahead = 0;
    let behind = 0;
    try {
      const { stdout: revListOutput } = await execAsync(
        'git rev-list --left-right --count HEAD...@{u}',
        { cwd: config.repoRoot }
      );
      const [aheadStr, behindStr] = revListOutput.trim().split('\t');
      ahead = parseInt(aheadStr) || 0;
      behind = parseInt(behindStr) || 0;
    } catch {
      // No upstream branch or other error - ignore
    }

    return {
      branch,
      ahead,
      behind,
      modified,
      added,
      deleted,
      untracked,
      staged,
    };
  } catch (error) {
    throw new MCPError(
      'Git status failed',
      ErrorCodes.OPERATION_FAILED,
      500,
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        cwd: config.repoRoot,
      }
    );
  }
}
