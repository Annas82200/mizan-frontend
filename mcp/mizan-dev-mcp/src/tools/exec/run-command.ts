import { exec } from 'child_process';
import { promisify } from 'util';
import { z } from 'zod';
import { CommandExecutionResult } from '@mizan-mcp/shared';
import { validateCommand } from '../../security/command-allowlist';
import { getConfig } from '../../config';

const execAsync = promisify(exec);

/**
 * Input schema for run_command tool
 */
const RunCommandInputSchema = z.object({
  command: z.string().min(1, 'Command is required'),
  args: z.array(z.string()).default([]),
  cwd: z.string().optional(),
  timeout: z.number().positive().default(30000), // 30s default
});

/**
 * Run command tool
 *
 * Executes an allowed command with arguments
 *
 * @param input - Tool input
 * @returns Command execution result
 */
export async function runCommand(input: unknown): Promise<CommandExecutionResult> {
  const config = getConfig();

  // Validate input
  const params = RunCommandInputSchema.parse(input);

  // Build full command
  const fullCommand = [params.command, ...params.args].join(' ');

  // Security: Validate command against allowlist
  validateCommand(fullCommand, config.allowedCommands);

  // Determine working directory
  const cwd = params.cwd || config.repoRoot;

  try {
    const { stdout, stderr } = await execAsync(fullCommand, {
      cwd,
      timeout: params.timeout,
      maxBuffer: 1024 * 1024, // 1MB
    });

    return {
      command: fullCommand,
      stdout: stdout.toString(),
      stderr: stderr.toString(),
      exitCode: 0,
    };
  } catch (error: any) {
    // Command failed but still return result
    return {
      command: fullCommand,
      stdout: error.stdout?.toString() || '',
      stderr: error.stderr?.toString() || error.message,
      exitCode: error.code || 1,
    };
  }
}
