/**
 * @mizan-mcp/shared
 *
 * Shared utilities and types for Mizan MCP servers
 */

// Authentication
export {
  validateServiceToken,
  extractTokenFromHeader,
  isTokenExpired,
  getTokenExpiration,
  JWTPayloadSchema,
  type JWTPayload,
} from './auth/jwt-validator';

export {
  TenantContext,
  createTenantContext,
} from './auth/tenant-context';

// Error Handling
export {
  MCPError,
  handleError,
  createSuccessResponse,
  withErrorHandling,
  assert,
  isErrorCode,
  ErrorCodes,
  ErrorResponseSchema,
  SuccessResponseSchema,
  type ErrorResponse,
  type SuccessResponse,
} from './utils/error-handler';

// Logging
export {
  createLogger,
  initializeLogger,
  getLogger,
  logWithContext,
  logToolExecution,
  logToolSuccess,
  logToolError,
  createChildLogger,
  LogLevels,
  type Logger,
} from './utils/logger';

// Types
export type {
  ToolExecutionContext,
  ToolResult,
  MCPServerConfig,
  AuthConfig,
  RateLimitConfig,
  ToolMetadata,
  CultureScope,
  CylinderLevel,
  ValueType,
  CylinderInfo,
  EntropyResult,
  AggregationResult,
  ExportFormat,
  DatasetExportResult,
  ValidationResult,
  EmailPreviewResult,
  FileSearchResult,
  CommandExecutionResult,
  FileReadResult,
  GitStatusResult,
} from './types/mcp-types';

export {
  FilePathSchema,
  FileSearchSchema,
  CommandExecutionSchema,
  EntropyComputationSchema,
  ExportDatasetSchema,
  EmailSendSchema,
} from './types/mcp-types';

// Validation Schemas
export {
  UUIDSchema,
  EmailSchema,
  DateRangeSchema,
  PaginationSchema,
  SortOrderSchema,
  FileEncodingSchema,
  EnvironmentSchema,
  LogLevelSchema,
  TenantIdListSchema,
  CommandAllowlistSchema,
  PositiveIntSchema,
  NonNegativeIntSchema,
  PercentageSchema,
  URLSchema,
  JSONStringSchema,
  TimeoutSchema,
  FileSizeSchema,
} from './validation/zod-schemas';
