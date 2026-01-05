import { z } from 'zod';

/**
 * MCP Error Class
 *
 * Custom error class for MCP servers with structured error information
 * Follows Mizan's production-ready error handling patterns
 */
export class MCPError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;
  public readonly timestamp: string;

  constructor(
    message: string,
    code: string,
    statusCode: number = 500,
    details?: unknown
  ) {
    super(message);
    this.name = 'MCPError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();

    // Maintain proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MCPError);
    }
  }

  /**
   * Convert error to JSON-serializable object
   */
  toJSON(): ErrorResponse['error'] {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
    };
  }
}

/**
 * Error Response Schema
 *
 * Standardized error response format for all MCP tools
 */
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
    timestamp: z.string(),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

/**
 * Success Response Schema
 *
 * Standardized success response format for all MCP tools
 */
export const SuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.unknown(),
  metadata: z
    .object({
      timestamp: z.string(),
      processingTime: z.number().optional(),
    })
    .optional(),
});

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

/**
 * Standard Error Codes
 *
 * Consistent error codes across all MCP servers
 */
export const ErrorCodes = {
  // Authentication & Authorization
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID: 'AUTH_INVALID',
  AUTH_EXPIRED: 'AUTH_EXPIRED',
  TENANT_UNAUTHORIZED: 'TENANT_UNAUTHORIZED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',

  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_PARAMETER: 'MISSING_PARAMETER',

  // Resources
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',

  // Operations
  OPERATION_FAILED: 'OPERATION_FAILED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',

  // Security
  PATH_TRAVERSAL: 'PATH_TRAVERSAL',
  COMMAND_NOT_ALLOWED: 'COMMAND_NOT_ALLOWED',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

  // Internal
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',
} as const;

/**
 * Handle error and convert to standardized error response
 *
 * @param error - Error instance (MCPError, ZodError, or generic Error)
 * @returns Standardized error response object
 */
export function handleError(error: unknown): ErrorResponse {
  // MCP Error - already structured
  if (error instanceof MCPError) {
    return {
      success: false,
      error: error.toJSON(),
    };
  }

  // Zod Validation Error
  if (error instanceof z.ZodError) {
    return {
      success: false,
      error: {
        code: ErrorCodes.VALIDATION_ERROR,
        message: 'Input validation failed',
        details: error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
          code: err.code,
        })),
        timestamp: new Date().toISOString(),
      },
    };
  }

  // Generic Error
  if (error instanceof Error) {
    return {
      success: false,
      error: {
        code: ErrorCodes.INTERNAL_ERROR,
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      },
    };
  }

  // Unknown error type
  return {
    success: false,
    error: {
      code: ErrorCodes.INTERNAL_ERROR,
      message: 'An unknown error occurred',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Create success response
 *
 * @param data - Response data
 * @param metadata - Optional metadata (timestamp, processingTime, etc.)
 * @returns Standardized success response object
 */
export function createSuccessResponse(
  data: unknown,
  metadata?: { processingTime?: number }
): SuccessResponse {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };
}

/**
 * Wrap async function with error handling
 *
 * @param fn - Async function to wrap
 * @returns Wrapped function that returns standardized response
 */
export function withErrorHandling<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<SuccessResponse | ErrorResponse> {
  return async (...args: T) => {
    const startTime = Date.now();
    try {
      const result = await fn(...args);
      const processingTime = Date.now() - startTime;
      return createSuccessResponse(result, { processingTime });
    } catch (error) {
      return handleError(error);
    }
  };
}

/**
 * Assert condition with MCPError
 *
 * @param condition - Condition to check
 * @param message - Error message if condition fails
 * @param code - Error code
 * @param statusCode - HTTP status code
 * @throws MCPError if condition is false
 */
export function assert(
  condition: boolean,
  message: string,
  code: string = ErrorCodes.VALIDATION_ERROR,
  statusCode: number = 400
): asserts condition {
  if (!condition) {
    throw new MCPError(message, code, statusCode);
  }
}

/**
 * Check if error is MCPError with specific code
 *
 * @param error - Error to check
 * @param code - Error code to match
 * @returns True if error is MCPError with matching code
 */
export function isErrorCode(error: unknown, code: string): boolean {
  return error instanceof MCPError && error.code === code;
}
