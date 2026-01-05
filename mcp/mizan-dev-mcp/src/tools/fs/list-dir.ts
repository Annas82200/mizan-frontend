import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { MCPError, ErrorCodes } from '@mizan-mcp/shared';
import { validatePath, validateIsDirectory } from '../../security/path-validator';
import { getConfig } from '../../config';

/**
 * Input schema for list_dir tool
 */
const ListDirInputSchema = z.object({
  path: z.string().default('.'),
  includeHidden: z.boolean().default(false),
});

/**
 * Directory entry interface
 */
interface DirectoryEntry {
  name: string;
  path: string;
  type: 'file' | 'directory' | 'symlink' | 'other';
  size: number;
  modified: string;
}

/**
 * List directory tool
 *
 * Lists contents of a directory with metadata
 *
 * @param input - Tool input
 * @returns Directory contents
 */
export async function listDir(input: unknown): Promise<{
  path: string;
  entries: DirectoryEntry[];
  count: number;
}> {
  const config = getConfig();

  // Validate input
  const params = ListDirInputSchema.parse(input);

  // Security: Validate path is within repo root
  const fullPath = validatePath(params.path, config.repoRoot);

  // Validate directory exists and is a directory
  try {
    await validateIsDirectory(fullPath);
  } catch (error) {
    if (error instanceof MCPError) {
      throw error;
    }
    throw new MCPError(
      `Directory not found: ${params.path}`,
      ErrorCodes.RESOURCE_NOT_FOUND,
      404,
      { path: params.path }
    );
  }

  // Read directory
  const dirents = await fs.readdir(fullPath, { withFileTypes: true });

  // Build entry list
  const entries: DirectoryEntry[] = [];

  for (const dirent of dirents) {
    // Skip hidden files if not included
    if (!params.includeHidden && dirent.name.startsWith('.')) {
      continue;
    }

    const entryPath = path.join(fullPath, dirent.name);
    const stats = await fs.stat(entryPath);

    let type: DirectoryEntry['type'];
    if (dirent.isFile()) {
      type = 'file';
    } else if (dirent.isDirectory()) {
      type = 'directory';
    } else if (dirent.isSymbolicLink()) {
      type = 'symlink';
    } else {
      type = 'other';
    }

    entries.push({
      name: dirent.name,
      path: path.relative(config.repoRoot, entryPath),
      type,
      size: stats.size,
      modified: stats.mtime.toISOString(),
    });
  }

  // Sort: directories first, then by name
  entries.sort((a, b) => {
    if (a.type === 'directory' && b.type !== 'directory') return -1;
    if (a.type !== 'directory' && b.type === 'directory') return 1;
    return a.name.localeCompare(b.name);
  });

  return {
    path: params.path,
    entries,
    count: entries.length,
  };
}
