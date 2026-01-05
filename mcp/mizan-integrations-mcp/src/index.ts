#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { initializeLogger, getLogger, handleError } from '@mizan-mcp/shared';
import { getConfig } from './config';
import { previewEmail } from './tools/email/preview';
import { queueSendEmail } from './tools/email/queue-send';
import { sendEmail } from './tools/email/send';
import { uploadFile } from './tools/storage/upload';
import { getFile } from './tools/storage/get-file';

/**
 * Main MCP server for email and storage integrations
 */
async function main() {
  // Load configuration
  const config = getConfig();

  // Initialize logger
  initializeLogger({
    serverName: config.serverName,
    logLevel: config.logLevel,
    logFilePath: config.logFilePath,
  });

  const logger = getLogger();
  logger.info('Starting Mizan Integrations MCP Server', {
    version: config.serverVersion,
    nodeEnv: config.nodeEnv,
    emailProvider: 'sendgrid',
    storageProvider: config.storageProvider,
  });

  // Create MCP server
  const server = new Server(
    {
      name: config.serverName,
      version: config.serverVersion,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Register tool handlers
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'email_preview',
          description: 'Preview email without sending (validates structure and shows content preview)',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'object',
                properties: {
                  to: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'Recipient email(s)',
                  },
                  subject: {
                    type: 'string',
                    minLength: 1,
                    description: 'Email subject',
                  },
                  html: {
                    type: 'string',
                    description: 'HTML content',
                  },
                  text: {
                    type: 'string',
                    description: 'Plain text content',
                  },
                  cc: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'CC recipients (optional)',
                  },
                  bcc: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'BCC recipients (optional)',
                  },
                  replyTo: {
                    type: 'string',
                    format: 'email',
                    description: 'Reply-to address (optional)',
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        content: { type: 'string', description: 'Base64 encoded file content' },
                        filename: { type: 'string' },
                        type: { type: 'string', description: 'MIME type' },
                        disposition: { type: 'string', enum: ['attachment', 'inline'] },
                      },
                      required: ['content', 'filename'],
                    },
                    description: 'Email attachments (optional)',
                  },
                },
                required: ['to', 'subject'],
              },
            },
            required: ['message'],
          },
        },
        {
          name: 'email_queue_send',
          description: 'Queue email for batch sending (validates but does not send immediately)',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'object',
                properties: {
                  to: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'Recipient email(s)',
                  },
                  subject: {
                    type: 'string',
                    minLength: 1,
                    description: 'Email subject',
                  },
                  html: {
                    type: 'string',
                    description: 'HTML content',
                  },
                  text: {
                    type: 'string',
                    description: 'Plain text content',
                  },
                  cc: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'CC recipients (optional)',
                  },
                  bcc: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'BCC recipients (optional)',
                  },
                  replyTo: {
                    type: 'string',
                    format: 'email',
                    description: 'Reply-to address (optional)',
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        content: { type: 'string', description: 'Base64 encoded file content' },
                        filename: { type: 'string' },
                        type: { type: 'string', description: 'MIME type' },
                        disposition: { type: 'string', enum: ['attachment', 'inline'] },
                      },
                      required: ['content', 'filename'],
                    },
                    description: 'Email attachments (optional)',
                  },
                },
                required: ['to', 'subject'],
              },
            },
            required: ['message'],
          },
        },
        {
          name: 'email_send',
          description: 'Send email immediately (REQUIRES confirmed=true for security)',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'object',
                properties: {
                  to: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'Recipient email(s)',
                  },
                  subject: {
                    type: 'string',
                    minLength: 1,
                    description: 'Email subject',
                  },
                  html: {
                    type: 'string',
                    description: 'HTML content',
                  },
                  text: {
                    type: 'string',
                    description: 'Plain text content',
                  },
                  cc: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'CC recipients (optional)',
                  },
                  bcc: {
                    oneOf: [
                      { type: 'string', format: 'email' },
                      { type: 'array', items: { type: 'string', format: 'email' } },
                    ],
                    description: 'BCC recipients (optional)',
                  },
                  replyTo: {
                    type: 'string',
                    format: 'email',
                    description: 'Reply-to address (optional)',
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        content: { type: 'string', description: 'Base64 encoded file content' },
                        filename: { type: 'string' },
                        type: { type: 'string', description: 'MIME type' },
                        disposition: { type: 'string', enum: ['attachment', 'inline'] },
                      },
                      required: ['content', 'filename'],
                    },
                    description: 'Email attachments (optional)',
                  },
                },
                required: ['to', 'subject'],
              },
              confirmed: {
                type: 'boolean',
                default: false,
                description: 'REQUIRED: Must be true to send email (security confirmation)',
              },
            },
            required: ['message', 'confirmed'],
          },
        },
        {
          name: 'storage_upload',
          description: 'Upload file to cloud storage (S3-compatible)',
          inputSchema: {
            type: 'object',
            properties: {
              file: {
                type: 'object',
                properties: {
                  filename: {
                    type: 'string',
                    minLength: 1,
                    description: 'Filename with extension',
                  },
                  content: {
                    type: 'string',
                    description: 'Base64 encoded file content',
                  },
                  contentType: {
                    type: 'string',
                    description: 'MIME type (auto-detected if not provided)',
                  },
                  metadata: {
                    type: 'object',
                    additionalProperties: { type: 'string' },
                    description: 'Custom metadata key-value pairs',
                  },
                  publicRead: {
                    type: 'boolean',
                    default: false,
                    description: 'Allow public read access',
                  },
                },
                required: ['filename', 'content'],
              },
            },
            required: ['file'],
          },
        },
        {
          name: 'storage_get',
          description: 'Download file from cloud storage by file ID',
          inputSchema: {
            type: 'object',
            properties: {
              fileId: {
                type: 'string',
                minLength: 1,
                description: 'File ID (key) from storage_upload result',
              },
            },
            required: ['fileId'],
          },
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    logger.info('Tool called', { toolName: name, arguments: args });

    try {
      let result;

      switch (name) {
        case 'email_preview':
          result = await previewEmail(args);
          break;
        case 'email_queue_send':
          result = await queueSendEmail(args);
          break;
        case 'email_send':
          result = await sendEmail(args);
          break;
        case 'storage_upload':
          result = await uploadFile(args);
          break;
        case 'storage_get':
          result = await getFile(args);
          break;
        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      logger.info('Tool executed successfully', { toolName: name });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      logger.error('Tool execution failed', {
        toolName: name,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      const errorResponse = handleError(error);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(errorResponse, null, 2),
          },
        ],
        isError: true,
      };
    }
  });

  // Start server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info('Mizan Integrations MCP Server started successfully');
}

// Run server
main().catch((error) => {
  console.error('Fatal error starting MCP server:', error);
  process.exit(1);
});
