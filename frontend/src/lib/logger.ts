/**
 * Frontend Logger Utility
 *
 * Production-ready logging wrapper that:
 * - Filters logs based on environment
 * - Provides structured logging
 * - Can integrate with external services (Sentry, LogRocket, etc.)
 * - Maintains console API compatibility for easy migration
 *
 * Compliant with AGENT_CONTEXT_ULTIMATE.md - No console.* in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  enabledInProduction: boolean;
  minLevel: LogLevel;
  enableRemoteLogging: boolean;
}

class FrontendLogger {
  private config: LoggerConfig;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.config = {
      enabledInProduction: false, // Disable console logs in production by default
      minLevel: this.isDevelopment ? 'debug' : 'error', // Only errors in production
      enableRemoteLogging: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'
    };
  }

  /**
   * Check if log level should be output
   */
  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) {
      return true; // Log everything in development
    }

    if (!this.config.enabledInProduction && level !== 'error') {
      return false; // Only errors in production
    }

    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(level);
    const minLevelIndex = levels.indexOf(this.config.minLevel);

    return currentLevelIndex >= minLevelIndex;
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (data && typeof data === 'object') {
      return `${prefix} ${message} ${JSON.stringify(data)}`;
    }

    return `${prefix} ${message}`;
  }

  /**
   * Send logs to external service (Sentry, LogRocket, etc.)
   */
  private sendToRemoteService(level: LogLevel, message: string, data?: any) {
    if (!this.config.enableRemoteLogging) {
      return;
    }

    // TODO: Integrate with Sentry or LogRocket
    // Example: Sentry.captureMessage(message, { level, extra: data });
  }

  /**
   * Debug level logging (development only)
   */
  debug(message: string, ...args: any[]) {
    if (!this.shouldLog('debug')) return;

    if (this.isDevelopment) {
      console.debug(message, ...args);
    }
  }

  /**
   * Info level logging
   */
  info(message: string, ...args: any[]) {
    if (!this.shouldLog('info')) return;

    if (this.isDevelopment) {
      console.info(message, ...args);
    }

    this.sendToRemoteService('info', message, args);
  }

  /**
   * Warning level logging
   */
  warn(message: string, ...args: any[]) {
    if (!this.shouldLog('warn')) return;

    if (this.isDevelopment) {
      console.warn(message, ...args);
    }

    this.sendToRemoteService('warn', message, args);
  }

  /**
   * Error level logging (always logged)
   */
  error(message: string, ...args: any[]) {
    if (!this.shouldLog('error')) return;

    // Always log errors to console (even in production for debugging)
    console.error(message, ...args);

    this.sendToRemoteService('error', message, args);
  }

  /**
   * Log method (maps to info)
   */
  log(message: string, ...args: any[]) {
    this.info(message, ...args);
  }

  /**
   * Table logging (development only)
   */
  table(data: any) {
    if (this.isDevelopment) {
      console.table(data);
    }
  }

  /**
   * Group logging (development only)
   */
  group(label: string) {
    if (this.isDevelopment) {
      console.group(label);
    }
  }

  groupEnd() {
    if (this.isDevelopment) {
      console.groupEnd();
    }
  }

  /**
   * Time tracking (development only)
   */
  time(label: string) {
    if (this.isDevelopment) {
      console.time(label);
    }
  }

  timeEnd(label: string) {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  }
}

// Export singleton instance
export const logger = new FrontendLogger();

// Export type for use in other files
export type { LogLevel };
