import { z } from 'zod';
import { EnvironmentSchema, LogLevelSchema } from '@mizan-mcp/shared';

/**
 * Configuration schema for mizan-analytics-mcp server
 */
const ConfigSchema = z.object({
  serverName: z.string().default('mizan-analytics-mcp'),
  serverVersion: z.string().default('1.0.0'),
  nodeEnv: EnvironmentSchema.default('development'),
  logLevel: LogLevelSchema.default('info'),
  logFilePath: z.string().optional(),

  // Backend integration
  backendConnectionMode: z.enum(['direct', 'http']).default('direct'),
  anthropicApiKey: z.string().min(1, 'ANTHROPIC_API_KEY is required'),

  // Database configuration (for direct mode)
  databaseUrl: z.string().min(1, 'DATABASE_URL is required'),

  // Security configuration
  jwtSecret: z.string().min(1, 'JWT_SECRET is required'),
  allowedTenantIds: z.array(z.string()).optional(),

  // Export limits
  maxExportRows: z.number().positive().default(10000),
  allowedFileExportFormats: z.array(z.enum(['csv', 'json'])).default(['csv', 'json']),
});

export type Config = z.infer<typeof ConfigSchema>;

/**
 * Load and validate configuration from environment variables
 *
 * @returns Validated configuration object
 * @throws Error if configuration is invalid
 */
export function loadConfig(): Config {
  const config = {
    serverName: process.env.MCP_SERVER_NAME,
    serverVersion: process.env.MCP_SERVER_VERSION,
    nodeEnv: process.env.NODE_ENV as 'development' | 'production' | 'test',
    logLevel: process.env.LOG_LEVEL,
    logFilePath: process.env.LOG_FILE_PATH,

    backendConnectionMode: process.env.BACKEND_CONNECTION_MODE as 'direct' | 'http',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,

    databaseUrl: process.env.DATABASE_URL,

    jwtSecret: process.env.JWT_SECRET,
    allowedTenantIds: process.env.MCP_ALLOWED_TENANT_IDS
      ? process.env.MCP_ALLOWED_TENANT_IDS.split(',').map((id) => id.trim())
      : undefined,

    maxExportRows: process.env.MAX_EXPORT_ROWS
      ? parseInt(process.env.MAX_EXPORT_ROWS)
      : undefined,

    allowedFileExportFormats: process.env.ALLOWED_FILE_EXPORT_FORMATS
      ? (process.env.ALLOWED_FILE_EXPORT_FORMATS.split(',') as ('csv' | 'json')[])
      : undefined,
  };

  return ConfigSchema.parse(config);
}

let cachedConfig: Config | null = null;

/**
 * Get configuration (cached)
 */
export function getConfig(): Config {
  if (!cachedConfig) {
    cachedConfig = loadConfig();
  }
  return cachedConfig;
}
