import { z } from 'zod';
import { StorageClient, FileDownload } from '../../clients/storage-client';

/**
 * Input schema for get_file tool
 */
const GetFileInputSchema = z.object({
  fileId: z.string().min(1),
});

/**
 * Download file from cloud storage
 *
 * Retrieves file by ID (file key) from cloud storage.
 *
 * Returns:
 * - File content (base64 encoded)
 * - Content type
 * - File size
 * - Metadata
 * - Last modified date
 *
 * @param input - Tool input
 * @returns File content and metadata
 */
export async function getFile(input: unknown): Promise<FileDownload> {
  // Validate input schema
  const params = GetFileInputSchema.parse(input);

  // Create storage client
  const client = new StorageClient();

  // Download file
  const result = await client.downloadFile(params.fileId);

  return result;
}
