import { z } from 'zod';
import { StorageClient, FileUpload, FileUploadResult } from '../../clients/storage-client';

/**
 * Input schema for upload_file tool
 */
const UploadFileInputSchema = z.object({
  file: z.object({
    filename: z.string().min(1),
    content: z.string(), // Base64 encoded
    contentType: z.string().optional(),
    metadata: z.record(z.string()).optional(),
    publicRead: z.boolean().default(false),
  }),
});

/**
 * Upload file to cloud storage
 *
 * Supports:
 * - Images, documents, data files
 * - Public or private access
 * - Custom metadata
 * - Automatic content-type detection
 *
 * Returns:
 * - Public URL (if publicRead=true)
 * - Presigned URL (if publicRead=false, valid for 1 hour)
 * - File ID for future retrieval
 *
 * @param input - Tool input
 * @returns Upload result with URLs
 */
export async function uploadFile(input: unknown): Promise<FileUploadResult> {
  // Validate input schema
  const params = UploadFileInputSchema.parse(input);

  // Create storage client
  const client = new StorageClient();

  // Upload file
  const result = await client.uploadFile(params.file as FileUpload);

  return result;
}
