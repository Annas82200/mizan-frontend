#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { initializeLogger, getLogger, handleError } from '@mizan-mcp/shared';
import { getConfig } from './config';
import { validateSubmission } from './tools/validation/validate-submission';
import { computeEntropy } from './tools/entropy/compute-entropy';
import { aggregateLevels } from './tools/aggregation/aggregate-levels';
import { generateInsights } from './tools/insights/generate-insights';
import { exportDataset } from './tools/export/export-dataset';

/**
 * Main MCP server for culture analytics and entropy calculations
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
  logger.info('Starting Mizan Analytics MCP Server', {
    version: config.serverVersion,
    nodeEnv: config.nodeEnv,
    backendConnectionMode: config.backendConnectionMode,
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
          name: 'mizan_validate_submission',
          description: 'Validate culture assessment submission data for completeness and correctness',
          inputSchema: {
            type: 'object',
            properties: {
              submission: {
                type: 'object',
                properties: {
                  employeeId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Employee UUID',
                  },
                  tenantId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Tenant UUID',
                  },
                  personalValues: {
                    type: 'array',
                    items: { type: 'string' },
                    minItems: 1,
                    description: 'Personal values selected by employee',
                  },
                  currentExperienceValues: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Values experienced in current culture',
                  },
                  desiredFutureValues: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Values desired in future culture',
                  },
                  engagementLevel: {
                    type: 'number',
                    minimum: 0,
                    maximum: 100,
                    description: 'Employee engagement level (0-100)',
                  },
                  recognitionLevel: {
                    type: 'number',
                    minimum: 0,
                    maximum: 100,
                    description: 'Employee recognition level (0-100)',
                  },
                },
                required: [
                  'employeeId',
                  'tenantId',
                  'personalValues',
                  'currentExperienceValues',
                  'desiredFutureValues',
                  'engagementLevel',
                  'recognitionLevel',
                ],
              },
            },
            required: ['submission'],
          },
        },
        {
          name: 'mizan_compute_entropy',
          description: 'Calculate cultural entropy (percentage of limiting values) for individual, department, or organization',
          inputSchema: {
            type: 'object',
            properties: {
              scope: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    enum: ['individual', 'department', 'organization'],
                    description: 'Scope of entropy calculation',
                  },
                  tenantId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Tenant UUID',
                  },
                  departmentId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Department UUID (required for department scope)',
                  },
                  employeeId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Employee UUID (required for individual scope)',
                  },
                },
                required: ['type', 'tenantId'],
              },
            },
            required: ['scope'],
          },
        },
        {
          name: 'mizan_aggregate_levels',
          description: 'Aggregate cylinder scores (levels 1-7) across employees for department or organization',
          inputSchema: {
            type: 'object',
            properties: {
              tenantId: {
                type: 'string',
                format: 'uuid',
                description: 'Tenant UUID',
              },
              departmentId: {
                type: 'string',
                format: 'uuid',
                description: 'Department UUID (optional - omit for organization-wide)',
              },
            },
            required: ['tenantId'],
          },
        },
        {
          name: 'mizan_generate_insights',
          description: 'Generate structured insights using Three-Engine analysis (strengths, gaps, risks, opportunities)',
          inputSchema: {
            type: 'object',
            properties: {
              tenantId: {
                type: 'string',
                format: 'uuid',
                description: 'Tenant UUID',
              },
              companyValues: {
                type: 'array',
                items: { type: 'string' },
                minItems: 1,
                description: 'Company espoused values',
              },
              strategy: {
                type: 'string',
                description: 'Company strategy statement (optional)',
              },
            },
            required: ['tenantId', 'companyValues'],
          },
        },
        {
          name: 'mizan_export_dataset',
          description: 'Export culture data as CSV or JSON (assessments, reports, or cylinder scores)',
          inputSchema: {
            type: 'object',
            properties: {
              tenantId: {
                type: 'string',
                format: 'uuid',
                description: 'Tenant UUID',
              },
              scope: {
                type: 'string',
                enum: ['assessments', 'reports', 'cylinder_scores'],
                description: 'Type of data to export',
              },
              format: {
                type: 'string',
                enum: ['csv', 'json'],
                description: 'Export format',
              },
              filters: {
                type: 'object',
                properties: {
                  departmentId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Filter by department',
                  },
                  startDate: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Filter by start date',
                  },
                  endDate: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Filter by end date',
                  },
                  completedOnly: {
                    type: 'boolean',
                    description: 'Only include completed assessments',
                  },
                },
              },
              maxRows: {
                type: 'number',
                minimum: 1,
                description: 'Maximum rows to export (default from config)',
              },
            },
            required: ['tenantId', 'scope', 'format'],
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
        case 'mizan_validate_submission':
          result = await validateSubmission(args);
          break;
        case 'mizan_compute_entropy':
          result = await computeEntropy(args);
          break;
        case 'mizan_aggregate_levels':
          result = await aggregateLevels(args);
          break;
        case 'mizan_generate_insights':
          result = await generateInsights(args);
          break;
        case 'mizan_export_dataset':
          result = await exportDataset(args);
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

  logger.info('Mizan Analytics MCP Server started successfully');
}

// Run server
main().catch((error) => {
  console.error('Fatal error starting MCP server:', error);
  process.exit(1);
});
