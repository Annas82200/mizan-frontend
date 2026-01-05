/**
 * Storage client wrapper for cloud storage operations
 *
 * Supports S3-compatible storage providers:
 * - AWS S3
 * - Google Cloud Storage (GCS)
 * - Azure Blob Storage
 * - MinIO / other S3-compatible services
 */

import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getConfig } from '../config';
import { MCPError, ErrorCodes } from '@mizan-mcp/shared';
import { Readable } from 'stream';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface FileUpload {
  filename: string;
  content: string; // Base64 encoded
  contentType?: string;
  metadata?: Record<string, string>;
  publicRead?: boolean;
}

export interface FileUploadResult {
  fileId: string;
  filename: string;
  url: string;
  signedUrl?: string; // Presigned URL for private files
  sizeBytes: number;
  contentType: string;
  uploadedAt: string;
}

export interface FileDownload {
  fileId: string;
  filename: string;
  content: string; // Base64 encoded
  contentType: string;
  sizeBytes: number;
  metadata: Record<string, string>;
  lastModified: Date;
}

// ============================================================================
// STORAGE CLIENT CLASS
// ============================================================================

export class StorageClient {
  private s3Client: S3Client;
  private config: ReturnType<typeof getConfig>;

  constructor() {
    this.config = getConfig();

    // Initialize S3 client
    const clientConfig: {
      region?: string;
      credentials?: { accessKeyId: string; secretAccessKey: string };
      endpoint?: string;
      forcePathStyle?: boolean;
    } = {
      region: this.config.storageRegion || 'us-east-1',
    };

    if (this.config.storageAccessKeyId && this.config.storageSecretAccessKey) {
      clientConfig.credentials = {
        accessKeyId: this.config.storageAccessKeyId,
        secretAccessKey: this.config.storageSecretAccessKey,
      };
    }

    if (this.config.storageEndpoint) {
      clientConfig.endpoint = this.config.storageEndpoint;
      clientConfig.forcePathStyle = true; // Required for MinIO and custom endpoints
    }

    this.s3Client = new S3Client(clientConfig);
  }

  /**
   * Upload file to cloud storage
   *
   * @param upload - File upload details
   * @returns Upload result with URL
   */
  async uploadFile(upload: FileUpload): Promise<FileUploadResult> {
    try {
      // Decode base64 content
      const buffer = Buffer.from(upload.content, 'base64');
      const sizeBytes = buffer.length;

      // Generate unique file key
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(7);
      const fileKey = `uploads/${timestamp}-${randomSuffix}-${upload.filename}`;

      // Determine content type
      const contentType = upload.contentType || this.guessContentType(upload.filename);

      // Prepare metadata
      const metadata = {
        'original-filename': upload.filename,
        'upload-timestamp': new Date().toISOString(),
        ...upload.metadata,
      };

      // Upload to S3
      const command = new PutObjectCommand({
        Bucket: this.config.storageBucket,
        Key: fileKey,
        Body: buffer,
        ContentType: contentType,
        Metadata: metadata,
        ACL: upload.publicRead ? 'public-read' : 'private',
      });

      await this.s3Client.send(command);

      // Generate URLs
      const publicUrl = this.generatePublicUrl(fileKey);
      let signedUrl: string | undefined;

      if (!upload.publicRead) {
        // Generate presigned URL for private files (valid for 1 hour)
        signedUrl = await this.generatePresignedUrl(fileKey, 3600);
      }

      return {
        fileId: fileKey,
        filename: upload.filename,
        url: publicUrl,
        signedUrl,
        sizeBytes,
        contentType,
        uploadedAt: new Date().toISOString(),
      };
    } catch (error) {
      throw new MCPError(
        `Storage upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCodes.EXTERNAL_SERVICE_ERROR,
        500,
        { provider: this.config.storageProvider, error }
      );
    }
  }

  /**
   * Download file from cloud storage
   *
   * @param fileId - File key/ID in storage
   * @returns File content and metadata
   */
  async downloadFile(fileId: string): Promise<FileDownload> {
    try {
      // Get object metadata first
      const headCommand = new HeadObjectCommand({
        Bucket: this.config.storageBucket,
        Key: fileId,
      });

      const headResponse = await this.s3Client.send(headCommand);

      // Get object content
      const getCommand = new GetObjectCommand({
        Bucket: this.config.storageBucket,
        Key: fileId,
      });

      const getResponse = await this.s3Client.send(getCommand);

      if (!getResponse.Body) {
        throw new Error('Empty response body from storage');
      }

      // Convert stream to buffer
      const chunks: Uint8Array[] = [];
      const stream = getResponse.Body as Readable;

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);
      const base64Content = buffer.toString('base64');

      // Extract metadata
      const metadata = headResponse.Metadata || {};
      const originalFilename = metadata['original-filename'] || fileId.split('/').pop() || 'unknown';

      return {
        fileId,
        filename: originalFilename,
        content: base64Content,
        contentType: headResponse.ContentType || 'application/octet-stream',
        sizeBytes: headResponse.ContentLength || buffer.length,
        metadata,
        lastModified: headResponse.LastModified || new Date(),
      };
    } catch (error) {
      // Check if file not found
      if ((error as { name?: string }).name === 'NoSuchKey') {
        throw new MCPError(
          `File not found: ${fileId}`,
          ErrorCodes.RESOURCE_NOT_FOUND,
          404,
          { fileId }
        );
      }

      throw new MCPError(
        `Storage download failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCodes.EXTERNAL_SERVICE_ERROR,
        500,
        { provider: this.config.storageProvider, fileId, error }
      );
    }
  }

  /**
   * Generate presigned URL for file access
   *
   * @param fileKey - File key in storage
   * @param expiresIn - Expiration time in seconds
   * @returns Presigned URL
   */
  async generatePresignedUrl(fileKey: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.config.storageBucket,
      Key: fileKey,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Generate public URL for file (if bucket allows public access)
   */
  private generatePublicUrl(fileKey: string): string {
    if (this.config.storageEndpoint) {
      // Custom endpoint (e.g., MinIO)
      return `${this.config.storageEndpoint}/${this.config.storageBucket}/${fileKey}`;
    } else {
      // Standard S3 URL
      const region = this.config.storageRegion || 'us-east-1';
      return `https://${this.config.storageBucket}.s3.${region}.amazonaws.com/${fileKey}`;
    }
  }

  /**
   * Guess content type from filename extension
   */
  private guessContentType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();

    const contentTypes: Record<string, string> = {
      // Images
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      webp: 'image/webp',

      // Documents
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

      // Text
      txt: 'text/plain',
      csv: 'text/csv',
      json: 'application/json',
      xml: 'application/xml',
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',

      // Archives
      zip: 'application/zip',
      tar: 'application/x-tar',
      gz: 'application/gzip',

      // Media
      mp3: 'audio/mpeg',
      mp4: 'video/mp4',
      avi: 'video/x-msvideo',
      mov: 'video/quicktime',
    };

    return ext && contentTypes[ext] ? contentTypes[ext] : 'application/octet-stream';
  }
}
