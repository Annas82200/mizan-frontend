import { z } from 'zod';
import { SendGridClient, EmailMessage, EmailSendResult } from '../../clients/sendgrid-client';

/**
 * Input schema for queue_send_email tool
 */
const QueueSendEmailInputSchema = z.object({
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
 * Queue email for batch sending
 *
 * Adds email to send queue for later processing. Useful for:
 * - Bulk email operations
 * - Scheduled sends
 * - Rate-limited batch processing
 *
 * The email will be validated but not sent immediately.
 *
 * @param input - Tool input
 * @returns Queued status with message ID
 */
export async function queueSendEmail(input: unknown): Promise<EmailSendResult> {
  // Validate input schema
  const params = QueueSendEmailInputSchema.parse(input);

  // Create SendGrid client
  const client = new SendGridClient();

  // Queue email
  const result = await client.queueEmail(params.message as EmailMessage);

  return result;
}
