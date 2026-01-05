import { z } from 'zod';
import { SendGridClient, EmailMessage, EmailPreview } from '../../clients/sendgrid-client';

/**
 * Input schema for preview_email tool
 */
const PreviewEmailInputSchema = z.object({
  message: z.object({
    to: z.union([z.string().email(), z.array(z.string().email())]),
    subject: z.string().min(1),
    html: z.string().optional(),
    text: z.string().optional(),
    cc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
    bcc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
    replyTo: z.string().email().optional(),
    attachments: z
      .array(
        z.object({
          content: z.string(), // Base64 encoded
          filename: z.string(),
          type: z.string().optional(),
          disposition: z.enum(['attachment', 'inline']).optional(),
        })
      )
      .optional(),
  }),
});

/**
 * Preview email without sending
 *
 * Validates message structure and provides:
 * - Content preview (first 500 characters)
 * - Size calculation
 * - Recipient count
 * - Warnings (if any)
 *
 * Use this tool before calling send_email to verify the email looks correct
 *
 * @param input - Tool input
 * @returns Email preview with validation results
 */
export async function previewEmail(input: unknown): Promise<EmailPreview> {
  // Validate input schema
  const params = PreviewEmailInputSchema.parse(input);

  // Create SendGrid client
  const client = new SendGridClient();

  // Generate preview
  const preview = client.previewEmail(params.message as EmailMessage);

  return preview;
}
