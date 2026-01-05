import { z } from 'zod';
import { BackendClient, ExportDatasetOptions } from '../../clients/backend-client';
import { getConfig } from '../../config';

/**
 * Input schema for export_dataset tool
 */
const ExportDatasetInputSchema = z.object({
  tenantId: z.string().uuid(),
  scope: z.enum(['assessments', 'reports', 'cylinder_scores']),
  format: z.enum(['csv', 'json']),
  filters: z
    .object({
      departmentId: z.string().uuid().optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      completedOnly: z.boolean().optional(),
    })
    .optional(),
  maxRows: z.number().positive().optional(),
});

/**
 * Export dataset as CSV or JSON
 *
 * Supports exporting:
 * - Culture assessments (assessment submissions and responses)
 * - Culture reports (generated reports with analysis)
 * - Cylinder scores (individual cylinder-level scores)
 *
 * Optional filters:
 * - Department (departmentId)
 * - Date range (startDate, endDate)
 * - Completion status (completedOnly)
 *
 * Export limits:
 * - Maximum rows: configurable (default 10,000)
 * - Formats: CSV or JSON
 *
 * @param input - Tool input
 * @returns Exported data as string with metadata
 */
export async function exportDataset(input: unknown): Promise<{
  data: string;
  format: 'csv' | 'json';
  rowCount: number;
  exportedAt: string;
  scope: string;
  tenantId: string;
  maxRowsReached: boolean;
}> {
  const config = getConfig();

  // Validate input schema
  const params = ExportDatasetInputSchema.parse(input);

  // Validate format is allowed
  if (!config.allowedFileExportFormats.includes(params.format)) {
    throw new Error(
      `Export format '${params.format}' is not allowed. Allowed formats: ${config.allowedFileExportFormats.join(', ')}`
    );
  }

  // Prepare export options
  const exportOptions: ExportDatasetOptions = {
    tenantId: params.tenantId,
    scope: params.scope,
    format: params.format,
    filters: params.filters
      ? {
          ...params.filters,
          startDate: params.filters.startDate ? new Date(params.filters.startDate) : undefined,
          endDate: params.filters.endDate ? new Date(params.filters.endDate) : undefined,
        }
      : undefined,
    maxRows: params.maxRows || config.maxExportRows,
  };

  // Create backend client
  const client = new BackendClient();

  // Export dataset
  const result = await client.exportDataset(exportOptions);

  return {
    ...result,
    scope: params.scope,
    tenantId: params.tenantId,
    maxRowsReached: result.rowCount >= (params.maxRows || config.maxExportRows),
  };
}
