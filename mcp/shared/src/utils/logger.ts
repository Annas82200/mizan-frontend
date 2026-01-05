import winston from 'winston';
import path from 'path';

/**
 * Log levels
 */
export const LogLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
} as const;

/**
 * Custom log format with colors
 */
const customFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;

  // Append metadata if present
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }

  return msg;
});

/**
 * Create Winston logger instance
 *
 * @param options - Logger configuration options
 * @returns Winston logger instance
 */
export function createLogger(options: {
  serverName: string;
  logLevel?: string;
  logFilePath?: string;
}): winston.Logger {
  const { serverName, logLevel = 'info', logFilePath } = options;

  const transports: winston.transport[] = [
    // Console transport with colors
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat
      ),
    }),
  ];

  // Add file transport if log file path is provided
  if (logFilePath) {
    const logsDir = path.dirname(logFilePath);

    // Error log file
    transports.push(
      new winston.transports.File({
        filename: path.join(logsDir, `${serverName}-error.log`),
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      })
    );

    // Combined log file
    transports.push(
      new winston.transports.File({
        filename: logFilePath,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      })
    );
  }

  const logger = winston.createLogger({
    level: logLevel,
    levels: LogLevels,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: serverName },
    transports,
  });

  return logger;
}

/**
 * Logger interface for type safety
 */
export interface Logger {
  error(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  http(message: string, meta?: Record<string, unknown>): void;
  verbose(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
}

/**
 * Global logger instance (will be initialized by each MCP server)
 */
let globalLogger: winston.Logger | null = null;

/**
 * Initialize global logger
 *
 * @param options - Logger configuration options
 */
export function initializeLogger(options: {
  serverName: string;
  logLevel?: string;
  logFilePath?: string;
}): void {
  globalLogger = createLogger(options);
}

/**
 * Get global logger instance
 *
 * @returns Winston logger instance
 * @throws Error if logger not initialized
 */
export function getLogger(): winston.Logger {
  if (!globalLogger) {
    throw new Error('Logger not initialized. Call initializeLogger() first.');
  }
  return globalLogger;
}

/**
 * Log with context metadata
 *
 * @param level - Log level
 * @param message - Log message
 * @param context - Context metadata (tenantId, userId, etc.)
 */
export function logWithContext(
  level: keyof typeof LogLevels,
  message: string,
  context?: {
    tenantId?: string;
    userId?: string;
    toolName?: string;
    [key: string]: unknown;
  }
): void {
  const logger = getLogger();
  logger[level](message, context);
}

/**
 * Log tool execution
 *
 * @param toolName - Name of the tool
 * @param operation - Operation being performed
 * @param context - Context metadata
 */
export function logToolExecution(
  toolName: string,
  operation: string,
  context?: {
    tenantId?: string;
    userId?: string;
    [key: string]: unknown;
  }
): void {
  logWithContext('info', `Tool execution: ${toolName}.${operation}`, {
    ...context,
    toolName,
    operation,
  });
}

/**
 * Log tool success
 *
 * @param toolName - Name of the tool
 * @param operation - Operation that succeeded
 * @param result - Result metadata
 * @param context - Context metadata
 */
export function logToolSuccess(
  toolName: string,
  operation: string,
  result?: Record<string, unknown>,
  context?: {
    tenantId?: string;
    userId?: string;
  }
): void {
  logWithContext('info', `Tool success: ${toolName}.${operation}`, {
    ...context,
    toolName,
    operation,
    result,
  });
}

/**
 * Log tool error
 *
 * @param toolName - Name of the tool
 * @param operation - Operation that failed
 * @param error - Error instance
 * @param context - Context metadata
 */
export function logToolError(
  toolName: string,
  operation: string,
  error: Error,
  context?: {
    tenantId?: string;
    userId?: string;
  }
): void {
  logWithContext('error', `Tool error: ${toolName}.${operation}`, {
    ...context,
    toolName,
    operation,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  });
}

/**
 * Create child logger with default metadata
 *
 * @param defaultMeta - Default metadata for all logs
 * @returns Child logger with default metadata
 */
export function createChildLogger(
  defaultMeta: Record<string, unknown>
): winston.Logger {
  const logger = getLogger();
  return logger.child(defaultMeta);
}
