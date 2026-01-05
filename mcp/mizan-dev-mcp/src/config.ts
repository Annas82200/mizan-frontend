import { z } from 'zod';
import { EnvironmentSchema, LogLevelSchema } from '@mizan-mcp/shared';

/**
 * Configuration schema for mizan-dev-mcp server
 */
const ConfigSchema = z.object({
  serverName: z.string().default('mizan-dev-mcp'),
  serverVersion: z.string().default('1.0.0'),
  nodeEnv: EnvironmentSchema.default('development'),
  logLevel: LogLevelSchema.default('info'),
  logFilePath: z.string().optional(),

  // Repository configuration
  repoRoot: z.string().min(1, 'MIZAN_REPO_ROOT is required'),

  // Security configuration
  allowedCommands: z.array(z.string()),

  // File operation limits
  maxFileSize: z.number().positive().default(1024 * 1024), // 1MB default
  maxSearchResults: z.number().positive().default(100),
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

    repoRoot: process.env.MIZAN_REPO_ROOT,

    allowedCommands: process.env.ALLOWED_COMMANDS
      ? process.env.ALLOWED_COMMANDS.split(',').map((cmd) => cmd.trim())
      : [
          'pytest',
          'ruff',
          'npm test',
          'npm run lint',
          'npm run build',
          'git status',
          'git diff',
          'git log',
        ],

    maxFileSize: process.env.MAX_FILE_SIZE_BYTES
      ? parseInt(process.env.MAX_FILE_SIZE_BYTES)
      : undefined,

    maxSearchResults: process.env.MAX_SEARCH_RESULTS
      ? parseInt(process.env.MAX_SEARCH_RESULTS)
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
