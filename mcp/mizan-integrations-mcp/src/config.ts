import { z } from 'zod';
import { EnvironmentSchema, LogLevelSchema } from '@mizan-mcp/shared';

/**
 * Configuration schema for mizan-integrations-mcp server
 */
const ConfigSchema = z.object({
  serverName: z.string().default('mizan-integrations-mcp'),
  serverVersion: z.string().default('1.0.0'),
  nodeEnv: EnvironmentSchema.default('development'),
  logLevel: LogLevelSchema.default('info'),
  logFilePath: z.string().optional(),

  // Email configuration (SendGrid)
  sendgridApiKey: z.string().min(1, 'SENDGRID_API_KEY is required'),
  sendgridFromEmail: z.string().email('Invalid FROM email address').min(1, 'SENDGRID_FROM_EMAIL is required'),
  sendgridFromName: z.string().optional(),

  // Email limits
  emailRateLimitPerMinute: z.number().positive().default(60),
  emailSizeLimitKB: z.number().positive().default(100),
  emailRecipientWarningThreshold: z.number().positive().default(50),

  // Storage configuration (S3-compatible)
  storageProvider: z.enum(['s3', 'gcs', 'azure']).default('s3'),
  storageBucket: z.string().min(1, 'Storage bucket is required'),
  storageRegion: z.string().optional(),
  storageAccessKeyId: z.string().optional(),
  storageSecretAccessKey: z.string().optional(),
  storageEndpoint: z.string().optional(),

  // Security
  requireEmailConfirmation: z.boolean().default(true),
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

    sendgridApiKey: process.env.SENDGRID_API_KEY,
    sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL,
    sendgridFromName: process.env.SENDGRID_FROM_NAME,

    emailRateLimitPerMinute: process.env.EMAIL_RATE_LIMIT_PER_MINUTE
      ? parseInt(process.env.EMAIL_RATE_LIMIT_PER_MINUTE)
      : undefined,
    emailSizeLimitKB: process.env.EMAIL_SIZE_LIMIT_KB
      ? parseInt(process.env.EMAIL_SIZE_LIMIT_KB)
      : undefined,
    emailRecipientWarningThreshold: process.env.EMAIL_RECIPIENT_WARNING_THRESHOLD
      ? parseInt(process.env.EMAIL_RECIPIENT_WARNING_THRESHOLD)
      : undefined,

    storageProvider: process.env.STORAGE_PROVIDER as 's3' | 'gcs' | 'azure',
    storageBucket: process.env.STORAGE_BUCKET || process.env.S3_BUCKET,
    storageRegion: process.env.STORAGE_REGION || process.env.AWS_REGION,
    storageAccessKeyId: process.env.STORAGE_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    storageSecretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
    storageEndpoint: process.env.STORAGE_ENDPOINT,

    requireEmailConfirmation: process.env.REQUIRE_EMAIL_CONFIRMATION === 'false' ? false : true,
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
