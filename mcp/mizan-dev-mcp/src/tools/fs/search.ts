import { glob } from 'glob';
import { z } from 'zod';
import { FileSearchResult } from '@mizan-mcp/shared';
import { validatePath } from '../../security/path-validator';
import { getConfig } from '../../config';

/**
 * Input schema for search tool
 */
const SearchInputSchema = z.object({
  pattern: z.string().min(1, 'Pattern is required'),
  paths: z.array(z.string()).default([]),
  maxResults: z.number().positive().optional(),
  excludePatterns: z
    .array(z.string())
    .default(['node_modules/**', 'dist/**', '.git/**', 'build/**', 'coverage/**']),
});

/**
 * Search files tool
 *
 * Searches for files matching a glob pattern
 *
 * @param input - Tool input
 * @returns Search results
 */
export async function searchFiles(input: unknown): Promise<FileSearchResult> {
  const config = getConfig();

  // Validate input
  const params = SearchInputSchema.parse(input);

  const maxResults = params.maxResults || config.maxSearchResults;

  // Validate all paths if provided
  const searchPaths =
    params.paths.length > 0
      ? params.paths.map((p) => validatePath(p, config.repoRoot))
      : [config.repoRoot];

  const results: string[] = [];

  for (const searchPath of searchPaths) {
    if (results.length >= maxResults) break;

    const matches = await glob(params.pattern, {
      cwd: searchPath,
      ignore: params.excludePatterns,
      nodir: true,
      absolute: false,
    });

    // Add matches relative to repo root
    results.push(...matches.slice(0, maxResults - results.length));
  }

  return {
    pattern: params.pattern,
    matches: results.slice(0, maxResults),
    count: results.length,
    truncated: results.length === maxResults,
  };
}
