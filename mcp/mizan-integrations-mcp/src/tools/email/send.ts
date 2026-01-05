import { z } from 'zod';
import { SendGridClient, EmailMessage, EmailSendResult } from '../../clients/sendgrid-client';

/**
 * Input schema for send_email tool
 */
const SendEmailInputSchema = z.object({
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
  confirmed: z.boolean().default(false),
});

/**
 * Send email immediately
 *
 * SECURITY: Requires explicit confirmation (confirmed=true) to send.
 *
 * Recommended workflow:
 * 1. Call preview_email to validate message
 * 2. Review preview output
 * 3. Call send_email with confirmed=true
 *
 * This tool:
 * - Validates message structure
 * - Checks rate limits
 * - Sends via SendGrid
 * - Returns message ID and status
 *
 * @param input - Tool input
 * @returns Send result with message ID
 */
export async function sendEmail(input: unknown): Promise<EmailSendResult> {
  // Validate input schema
  const params = SendEmailInputSchema.parse(input);

  // Create SendGrid client
  const client = new SendGridClient();

  // Send email (with confirmation check)
  const result = await client.sendEmail(params.message as EmailMessage, params.confirmed);

  return result;
}
