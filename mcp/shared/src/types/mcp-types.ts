/**
 * MCP Shared Types
 *
 * Common type definitions for all Mizan MCP servers
 * Follows Mizan's production-ready TypeScript standards (zero 'any' types)
 */

import { z } from 'zod';

/**
 * Tool execution context
 *
 * Contains authentication and tenant information for tool execution
 */
export interface ToolExecutionContext {
  tenantId: string;
  userId: string;
  userRole: string;
  userEmail: string;
  requestId?: string;
  timestamp: Date;
}

/**
 * Tool result interface
 *
 * Standardized result format for all MCP tools
 */
export interface ToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  metadata?: {
    timestamp: string;
    processingTime?: number;
    [key: string]: unknown;
  };
}

/**
 * Configuration for MCP servers
 */
export interface MCPServerConfig {
  serverName: string;
  serverVersion: string;
  nodeEnv: 'development' | 'production' | 'test';
  logLevel: string;
  logFilePath?: string;
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
  serviceAccountToken: string;
  allowedTenantIds: string[];
  jwtSecret: string;
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  perMinute: number;
  perHour: number;
  perDay?: number;
}

/**
 * Tool metadata
 *
 * Information about a specific tool
 */
export interface ToolMetadata {
  name: string;
  description: string;
  category: string;
  tier: 1 | 2 | 3;
  requiresAuth: boolean;
  requiresTenant: boolean;
  inputSchema: z.ZodSchema;
  outputSchema?: z.ZodSchema;
}

/**
 * Mizan domain-specific types
 */

/**
 * Culture assessment scope
 */
export type CultureScope = 'individual' | 'department' | 'team' | 'organization';

/**
 * Cylinder level (Mizan 7-cylinder framework)
 */
export type CylinderLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Value type (enabling or limiting)
 */
export type ValueType = 'enabling' | 'limiting';

/**
 * Cylinder information
 */
export interface CylinderInfo {
  level: CylinderLevel;
  name: string;
  theme: string;
  enablingValues: string[];
  limitingValues: string[];
}

/**
 * Entropy result
 */
export interface EntropyResult {
  entropy: number; // 0-100
  limitingValuesCount: number;
  enablingValuesCount: number;
  totalValuesCount: number;
  interpretation: string;
  cylinderBreakdown?: Record<string, number>;
}

/**
 * Aggregation result
 */
export interface AggregationResult {
  scope: CultureScope;
  groupBy: string;
  aggregations: unknown[];
  count: number;
}

/**
 * Export format
 */
export type ExportFormat = 'csv' | 'json';

/**
 * Dataset export result
 */
export interface DatasetExportResult {
  filename: string;
  format: ExportFormat;
  mimeType: string;
  content: string;
  rowCount: number;
  truncated: boolean;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  warnings?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Email preview result
 */
export interface EmailPreviewResult {
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  html: string;
  plainText: string;
  estimatedSize: number;
  recipientCount: number;
}

/**
 * File search result
 */
export interface FileSearchResult {
  pattern: string;
  matches: string[];
  count: number;
  truncated: boolean;
}

/**
 * Command execution result
 */
export interface CommandExecutionResult {
  command: string;
  stdout: string;
  stderr: string;
  exitCode: number;
}

/**
 * File read result
 */
export interface FileReadResult {
  path: string;
  content: string;
  size: number;
  encoding: string;
}

/**
 * Git status result
 */
export interface GitStatusResult {
  branch: string;
  ahead: number;
  behind: number;
  modified: string[];
  added: string[];
  deleted: string[];
  untracked: string[];
  staged: string[];
}

/**
 * Tool input validation schemas
 */

/**
 * File path input schema
 */
export const FilePathSchema = z.object({
  path: z.string().min(1, 'Path is required'),
});

/**
 * File search input schema
 */
export const FileSearchSchema = z.object({
  pattern: z.string().min(1, 'Pattern is required'),
  paths: z.array(z.string()).default([]),
  maxResults: z.number().positive().default(100),
  excludePatterns: z
    .array(z.string())
    .default(['node_modules/**', 'dist/**', '.git/**']),
});

/**
 * Command execution input schema
 */
export const CommandExecutionSchema = z.object({
  command: z.string().min(1, 'Command is required'),
  args: z.array(z.string()).default([]),
  cwd: z.string().optional(),
  timeout: z.number().positive().default(30000),
});

/**
 * Entropy computation input schema
 */
export const EntropyComputationSchema = z.object({
  scope: z.enum(['organization', 'department', 'team', 'individual']),
  filters: z.object({
    departmentId: z.string().uuid().optional(),
    teamId: z.string().uuid().optional(),
    employeeId: z.string().uuid().optional(),
    dateRange: z
      .object({
        start: z.string().datetime(),
        end: z.string().datetime(),
      })
      .optional(),
  }),
  tenantId: z.string().uuid(),
});

/**
 * Export dataset input schema
 */
export const ExportDatasetSchema = z.object({
  scope: z.enum(['culture_scores', 'assessments', 'aggregations']),
  filters: z.object({
    departmentId: z.string().uuid().optional(),
    dateRange: z
      .object({
        start: z.string().datetime(),
        end: z.string().datetime(),
      })
      .optional(),
  }),
  format: z.enum(['csv', 'json']),
  tenantId: z.string().uuid(),
  maxRows: z.number().positive().default(10000),
});

/**
 * Email send input schema
 */
export const EmailSendSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  subject: z.string().min(1).max(200),
  html: z.string().min(1),
  from: z.string().email().optional(),
  cc: z.array(z.string().email()).optional(),
  bcc: z.array(z.string().email()).optional(),
  confirmed: z.boolean(),
  confirmationToken: z.string().optional(),
  dryRun: z.boolean().default(false),
});
