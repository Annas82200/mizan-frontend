/**
 * Shared Zod Validation Schemas
 *
 * Common validation schemas used across all MCP servers
 */

import { z } from 'zod';

/**
 * UUID schema
 */
export const UUIDSchema = z.string().uuid('Invalid UUID format');

/**
 * Email schema
 */
export const EmailSchema = z.string().email('Invalid email format');

/**
 * Date range schema
 */
export const DateRangeSchema = z.object({
  start: z.string().datetime('Invalid start date format'),
  end: z.string().datetime('Invalid end date format'),
}).refine(
  (data) => new Date(data.start) <= new Date(data.end),
  {
    message: 'Start date must be before or equal to end date',
  }
);

/**
 * Pagination schema
 */
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(1000).default(100),
  offset: z.number().int().nonnegative().optional(),
});

/**
 * Sort order schema
 */
export const SortOrderSchema = z.enum(['asc', 'desc']);

/**
 * File path schema with validation
 */
export const FilePathSchema = z
  .string()
  .min(1, 'Path cannot be empty')
  .refine(
    (path) => !path.includes('..'),
    {
      message: 'Path cannot contain ".." (parent directory traversal)',
    }
  );

/**
 * File encoding schema
 */
export const FileEncodingSchema = z.enum(['utf-8', 'binary', 'ascii', 'base64']);

/**
 * Environment schema
 */
export const EnvironmentSchema = z.enum(['development', 'production', 'test']);

/**
 * Log level schema
 */
export const LogLevelSchema = z.enum([
  'error',
  'warn',
  'info',
  'http',
  'verbose',
  'debug',
  'silly',
]);

/**
 * Tenant ID list schema (comma-separated)
 */
export const TenantIdListSchema = z
  .string()
  .min(1, 'Tenant ID list cannot be empty')
  .transform((val) => val.split(',').map((id) => id.trim()))
  .pipe(z.array(UUIDSchema));

/**
 * Command allowlist schema (comma-separated)
 */
export const CommandAllowlistSchema = z
  .string()
  .min(1, 'Command allowlist cannot be empty')
  .transform((val) => val.split(',').map((cmd) => cmd.trim()));

/**
 * Positive integer schema
 */
export const PositiveIntSchema = z.number().int().positive();

/**
 * Non-negative integer schema
 */
export const NonNegativeIntSchema = z.number().int().nonnegative();

/**
 * Percentage schema (0-100)
 */
export const PercentageSchema = z.number().min(0).max(100);

/**
 * URL schema
 */
export const URLSchema = z.string().url('Invalid URL format');

/**
 * JSON string schema
 */
export const JSONStringSchema = z.string().refine(
  (val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  },
  {
    message: 'Invalid JSON string',
  }
);

/**
 * Timeout schema (milliseconds, max 10 minutes)
 */
export const TimeoutSchema = z.number().int().positive().max(600000);

/**
 * File size schema (bytes, max 100MB)
 */
export const FileSizeSchema = z.number().int().positive().max(100 * 1024 * 1024);
