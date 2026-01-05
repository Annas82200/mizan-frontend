import { promises as fs } from 'fs';
import { z } from 'zod';
import { MCPError, ErrorCodes, FileReadResult } from '@mizan-mcp/shared';
import { validatePath, validateIsFile, validateFileSize } from '../../security/path-validator';
import { getConfig } from '../../config';

/**
 * Input schema for read_file tool
 */
const ReadFileInputSchema = z.object({
  path: z.string().min(1, 'Path is required'),
  encoding: z.enum(['utf-8', 'binary']).default('utf-8'),
});

/**
 * Read file tool
 *
 * Reads a file from the repository with security checks
 *
 * @param input - Tool input
 * @returns File contents and metadata
 */
export async function readFile(input: unknown): Promise<FileReadResult> {
  const config = getConfig();

  // Validate input
  const params = ReadFileInputSchema.parse(input);

  // Security: Validate path is within repo root
  const fullPath = validatePath(params.path, config.repoRoot);

  // Validate file exists and is a file
  try {
    await validateIsFile(fullPath);
  } catch (error) {
    if (error instanceof MCPError) {
      throw error;
    }
    throw new MCPError(
      `File not found: ${params.path}`,
      ErrorCodes.RESOURCE_NOT_FOUND,
      404,
      { path: params.path }
    );
  }

  // Check file size
  await validateFileSize(fullPath, config.maxFileSize);

  // Read file
  const stats = await fs.stat(fullPath);
  const content = await fs.readFile(fullPath, params.encoding);

  return {
    path: params.path,
    content: content.toString(),
    size: stats.size,
    encoding: params.encoding,
  };
}
