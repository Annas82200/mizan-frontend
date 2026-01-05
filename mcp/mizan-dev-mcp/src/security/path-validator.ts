import path from 'path';
import { promises as fs } from 'fs';
import { MCPError, ErrorCodes } from '@mizan-mcp/shared';

/**
 * Validate path is within allowed repository root
 *
 * @param requestedPath - Path to validate
 * @param repoRoot - Repository root directory
 * @returns Normalized absolute path
 * @throws MCPError if path is invalid or outside repo root
 */
export function validatePath(requestedPath: string, repoRoot: string): string {
  if (!requestedPath) {
    throw new MCPError(
      'Path is required',
      ErrorCodes.INVALID_INPUT,
      400
    );
  }

  if (!repoRoot) {
    throw new MCPError(
      'Repository root not configured',
      ErrorCodes.CONFIGURATION_ERROR,
      500
    );
  }

  // Resolve to absolute path
  const absolutePath = path.isAbsolute(requestedPath)
    ? requestedPath
    : path.resolve(repoRoot, requestedPath);

  // Normalize path (removes .., ., etc.)
  const normalizedPath = path.normalize(absolutePath);

  // Normalize repo root for comparison
  const normalizedRepoRoot = path.normalize(repoRoot);

  // Check if path is within repo root
  if (!normalizedPath.startsWith(normalizedRepoRoot)) {
    throw new MCPError(
      `Path traversal detected: ${requestedPath} is outside repository root`,
      ErrorCodes.PATH_TRAVERSAL,
      403,
      {
        requestedPath,
        normalizedPath,
        repoRoot: normalizedRepoRoot,
      }
    );
  }

  // Check for sensitive file patterns
  const sensitivePatterns = [
    '.env',
    'credentials.json',
    'private-key',
    '.ssh',
    'secrets',
    '.pem',
    'id_rsa',
    '.aws',
  ];

  const pathLower = normalizedPath.toLowerCase();
  for (const pattern of sensitivePatterns) {
    if (pathLower.includes(pattern.toLowerCase())) {
      throw new MCPError(
        `Access to sensitive file denied: ${pattern}`,
        ErrorCodes.PERMISSION_DENIED,
        403,
        {
          requestedPath,
          blockedPattern: pattern,
        }
      );
    }
  }

  return normalizedPath;
}

/**
 * Check if path exists
 *
 * @param filePath - Path to check
 * @returns True if path exists, false otherwise
 */
export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate file size is within limits
 *
 * @param filePath - Path to file
 * @param maxSize - Maximum file size in bytes
 * @throws MCPError if file is too large
 */
export async function validateFileSize(
  filePath: string,
  maxSize: number
): Promise<void> {
  const stats = await fs.stat(filePath);

  if (stats.size > maxSize) {
    throw new MCPError(
      `File exceeds maximum size of ${maxSize} bytes`,
      ErrorCodes.FILE_TOO_LARGE,
      400,
      {
        filePath,
        fileSize: stats.size,
        maxSize,
      }
    );
  }
}

/**
 * Validate path is a file (not a directory)
 *
 * @param filePath - Path to validate
 * @throws MCPError if path is not a file
 */
export async function validateIsFile(filePath: string): Promise<void> {
  const stats = await fs.stat(filePath);

  if (!stats.isFile()) {
    throw new MCPError(
      `Path is not a file: ${filePath}`,
      ErrorCodes.INVALID_INPUT,
      400,
      {
        filePath,
        isDirectory: stats.isDirectory(),
      }
    );
  }
}

/**
 * Validate path is a directory (not a file)
 *
 * @param dirPath - Path to validate
 * @throws MCPError if path is not a directory
 */
export async function validateIsDirectory(dirPath: string): Promise<void> {
  const stats = await fs.stat(dirPath);

  if (!stats.isDirectory()) {
    throw new MCPError(
      `Path is not a directory: ${dirPath}`,
      ErrorCodes.INVALID_INPUT,
      400,
      {
        dirPath,
        isFile: stats.isFile(),
      }
    );
  }
}
