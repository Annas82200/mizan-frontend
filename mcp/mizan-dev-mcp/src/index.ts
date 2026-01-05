#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { initializeLogger, getLogger, handleError } from '@mizan-mcp/shared';
import { getConfig } from './config';
import { readFile } from './tools/fs/read-file';
import { listDir } from './tools/fs/list-dir';
import { searchFiles } from './tools/fs/search';
import { applyPatch } from './tools/fs/apply-patch';
import { gitStatus } from './tools/git/status';
import { gitDiff } from './tools/git/diff';
import { runCommand } from './tools/exec/run-command';

/**
 * Main MCP server for developer tools and repository operations
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
  logger.info('Starting Mizan Dev MCP Server', {
    version: config.serverVersion,
    nodeEnv: config.nodeEnv,
    repoRoot: config.repoRoot,
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
          name: 'fs_read_file',
          description: 'Read a file from the repository with security checks',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Path to the file (relative to repo root)',
              },
              encoding: {
                type: 'string',
                enum: ['utf-8', 'binary'],
                default: 'utf-8',
                description: 'File encoding',
              },
            },
            required: ['path'],
          },
        },
        {
          name: 'fs_list_dir',
          description: 'List contents of a directory',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                default: '.',
                description: 'Directory path (relative to repo root)',
              },
              includeHidden: {
                type: 'boolean',
                default: false,
                description: 'Include hidden files and directories',
              },
            },
          },
        },
        {
          name: 'fs_search',
          description: 'Search for files using glob patterns',
          inputSchema: {
            type: 'object',
            properties: {
              pattern: {
                type: 'string',
                description: 'Glob pattern to match files',
              },
              paths: {
                type: 'array',
                items: { type: 'string' },
                default: [],
                description: 'Paths to search (defaults to repo root)',
              },
              maxResults: {
                type: 'number',
                description: 'Maximum number of results to return',
              },
              excludePatterns: {
                type: 'array',
                items: { type: 'string' },
                default: ['node_modules/**', 'dist/**', '.git/**'],
                description: 'Patterns to exclude from search',
              },
            },
            required: ['pattern'],
          },
        },
        {
          name: 'fs_apply_patch',
          description: 'Apply multiple file changes in a single operation',
          inputSchema: {
            type: 'object',
            properties: {
              changes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    path: { type: 'string' },
                    content: { type: 'string' },
                    mode: {
                      type: 'string',
                      enum: ['create', 'update', 'delete'],
                      default: 'update',
                    },
                  },
                  required: ['path', 'content'],
                },
              },
              dryRun: {
                type: 'boolean',
                default: false,
                description: 'Preview changes without applying them',
              },
            },
            required: ['changes'],
          },
        },
        {
          name: 'git_status',
          description: 'Get git status for the repository',
          inputSchema: {
            type: 'object',
            properties: {
              short: {
                type: 'boolean',
                default: false,
                description: 'Use short format',
              },
            },
          },
        },
        {
          name: 'git_diff',
          description: 'Get git diff for the repository',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Path to get diff for (optional)',
              },
              staged: {
                type: 'boolean',
                default: false,
                description: 'Show staged changes',
              },
              maxLines: {
                type: 'number',
                default: 1000,
                description: 'Maximum number of lines to return',
              },
            },
          },
        },
        {
          name: 'exec_run',
          description: 'Execute an allowed command',
          inputSchema: {
            type: 'object',
            properties: {
              command: {
                type: 'string',
                description: 'Command to execute',
              },
              args: {
                type: 'array',
                items: { type: 'string' },
                default: [],
                description: 'Command arguments',
              },
              cwd: {
                type: 'string',
                description: 'Working directory (defaults to repo root)',
              },
              timeout: {
                type: 'number',
                default: 30000,
                description: 'Timeout in milliseconds',
              },
            },
            required: ['command'],
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
        case 'fs_read_file':
          result = await readFile(args);
          break;
        case 'fs_list_dir':
          result = await listDir(args);
          break;
        case 'fs_search':
          result = await searchFiles(args);
          break;
        case 'fs_apply_patch':
          result = await applyPatch(args);
          break;
        case 'git_status':
          result = await gitStatus(args);
          break;
        case 'git_diff':
          result = await gitDiff(args);
          break;
        case 'exec_run':
          result = await runCommand(args);
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

  logger.info('Mizan Dev MCP Server started successfully');
}

// Run server
main().catch((error) => {
  console.error('Fatal error starting MCP server:', error);
  process.exit(1);
});
