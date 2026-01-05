/**
 * SendGrid client wrapper for email operations
 *
 * Provides rate-limited, validated email sending with:
 * - Email preview (render without sending)
 * - Queue send (batch operations)
 * - Direct send (with confirmation requirement)
 * - Size and recipient limit validation
 */

import sgMail from '@sendgrid/mail';
import { getConfig } from '../config';
import { MCPError, ErrorCodes } from '@mizan-mcp/shared';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface EmailMessage {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    content: string; // Base64 encoded
    filename: string;
    type?: string;
    disposition?: 'attachment' | 'inline';
  }>;
  replyTo?: string;
}

export interface EmailPreview {
  to: string[];
  from: { email: string; name?: string };
  subject: string;
  htmlPreview: string; // First 500 characters
  textPreview: string; // First 500 characters
  sizeKB: number;
  recipientCount: number;
  hasAttachments: boolean;
  warnings: string[];
}

export interface EmailSendResult {
  messageId: string;
  status: 'sent' | 'queued';
  timestamp: string;
  recipientCount: number;
  sizeKB: number;
}

// ============================================================================
// SENDGRID CLIENT CLASS
// ============================================================================

export class SendGridClient {
  private config: ReturnType<typeof getConfig>;
  private rateLimitTracker: Map<string, number[]> = new Map();

  constructor() {
    this.config = getConfig();
    sgMail.setApiKey(this.config.sendgridApiKey);
  }

  /**
   * Preview email without sending
   *
   * Validates message structure and provides preview
   */
  previewEmail(message: EmailMessage): EmailPreview {
    // Normalize recipients
    const toArray = Array.isArray(message.to) ? message.to : [message.to];
    const ccArray = message.cc ? (Array.isArray(message.cc) ? message.cc : [message.cc]) : [];
    const bccArray = message.bcc ? (Array.isArray(message.bcc) ? message.bcc : [message.bcc]) : [];
    const allRecipients = [...toArray, ...ccArray, ...bccArray];

    // Calculate size
    const htmlSize = message.html ? Buffer.byteLength(message.html, 'utf8') : 0;
    const textSize = message.text ? Buffer.byteLength(message.text, 'utf8') : 0;
    const attachmentSize = message.attachments
      ? message.attachments.reduce((sum, att) => sum + Buffer.byteLength(att.content, 'base64'), 0)
      : 0;
    const totalSizeBytes = htmlSize + textSize + attachmentSize;
    const sizeKB = Math.round((totalSizeBytes / 1024) * 100) / 100;

    // Generate warnings
    const warnings: string[] = [];

    if (sizeKB > this.config.emailSizeLimitKB) {
      warnings.push(
        `Email size (${sizeKB} KB) exceeds recommended limit (${this.config.emailSizeLimitKB} KB)`
      );
    }

    if (allRecipients.length > this.config.emailRecipientWarningThreshold) {
      warnings.push(
        `High recipient count (${allRecipients.length}) exceeds threshold (${this.config.emailRecipientWarningThreshold}). Consider batch sending.`
      );
    }

    if (!message.html && !message.text) {
      warnings.push('Email has no content (neither HTML nor text)');
    }

    if (!message.subject || message.subject.trim() === '') {
      warnings.push('Email subject is empty');
    }

    // Create previews
    const htmlPreview = message.html ? this.truncateText(message.html, 500) : '[No HTML content]';
    const textPreview = message.text ? this.truncateText(message.text, 500) : '[No text content]';

    return {
      to: toArray,
      from: {
        email: this.config.sendgridFromEmail,
        name: this.config.sendgridFromName,
      },
      subject: message.subject,
      htmlPreview,
      textPreview,
      sizeKB,
      recipientCount: allRecipients.length,
      hasAttachments: !!message.attachments && message.attachments.length > 0,
      warnings,
    };
  }

  /**
   * Send email with confirmation requirement
   *
   * Security: Requires explicit confirmation parameter
   */
  async sendEmail(message: EmailMessage, confirmed: boolean): Promise<EmailSendResult> {
    // Security check: require explicit confirmation
    if (!confirmed && this.config.requireEmailConfirmation) {
      throw new MCPError(
        'Email send requires explicit confirmation. Set confirmed=true to send.',
        ErrorCodes.PERMISSION_DENIED,
        403,
        { message: 'Use preview_email tool first, then call send_email with confirmed=true' }
      );
    }

    // Validate message
    this.validateMessage(message);

    // Check rate limit
    this.checkRateLimit();

    // Prepare SendGrid message
    const sgMessage: Record<string, unknown> = {
      to: message.to,
      from: {
        email: this.config.sendgridFromEmail,
        ...(this.config.sendgridFromName && { name: this.config.sendgridFromName }),
      },
      subject: message.subject,
      ...(message.html && { html: message.html }),
      ...(message.text && { text: message.text }),
      ...(message.cc && { cc: message.cc }),
      ...(message.bcc && { bcc: message.bcc }),
      ...(message.replyTo && { replyTo: message.replyTo }),
      ...(message.attachments && { attachments: message.attachments }),
    };

    // Send email
    try {
      const response = await sgMail.send(sgMessage as any);

      // Calculate stats
      const toArray = Array.isArray(message.to) ? message.to : [message.to];
      const ccArray = message.cc ? (Array.isArray(message.cc) ? message.cc : [message.cc]) : [];
      const bccArray = message.bcc ? (Array.isArray(message.bcc) ? message.bcc : [message.bcc]) : [];
      const totalRecipients = toArray.length + ccArray.length + bccArray.length;

      const htmlSize = message.html ? Buffer.byteLength(message.html, 'utf8') : 0;
      const textSize = message.text ? Buffer.byteLength(message.text, 'utf8') : 0;
      const sizeKB = Math.round(((htmlSize + textSize) / 1024) * 100) / 100;

      // Track for rate limiting
      this.trackSend();

      return {
        messageId: response[0].headers['x-message-id'] || 'unknown',
        status: 'sent',
        timestamp: new Date().toISOString(),
        recipientCount: totalRecipients,
        sizeKB,
      };
    } catch (error: unknown) {
      throw new MCPError(
        `SendGrid email send failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCodes.EXTERNAL_SERVICE_ERROR,
        500,
        { provider: 'sendgrid', error }
      );
    }
  }

  /**
   * Queue email for batch sending
   *
   * Validates message and adds to queue (simulated - returns queued status)
   */
  async queueEmail(message: EmailMessage): Promise<EmailSendResult> {
    // Validate message
    this.validateMessage(message);

    // In production, this would add to a queue (Redis, SQS, etc.)
    // For now, we'll simulate queueing

    const toArray = Array.isArray(message.to) ? message.to : [message.to];
    const ccArray = message.cc ? (Array.isArray(message.cc) ? message.cc : [message.cc]) : [];
    const bccArray = message.bcc ? (Array.isArray(message.bcc) ? message.bcc : [message.bcc]) : [];
    const totalRecipients = toArray.length + ccArray.length + bccArray.length;

    const htmlSize = message.html ? Buffer.byteLength(message.html, 'utf8') : 0;
    const textSize = message.text ? Buffer.byteLength(message.text, 'utf8') : 0;
    const sizeKB = Math.round(((htmlSize + textSize) / 1024) * 100) / 100;

    return {
      messageId: `queued-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      status: 'queued',
      timestamp: new Date().toISOString(),
      recipientCount: totalRecipients,
      sizeKB,
    };
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Validate email message structure
   */
  private validateMessage(message: EmailMessage): void {
    if (!message.to || (Array.isArray(message.to) && message.to.length === 0)) {
      throw new MCPError('Email must have at least one recipient', ErrorCodes.VALIDATION_ERROR, 400);
    }

    if (!message.subject || message.subject.trim() === '') {
      throw new MCPError('Email subject is required', ErrorCodes.VALIDATION_ERROR, 400);
    }

    if (!message.html && !message.text) {
      throw new MCPError('Email must have HTML or text content', ErrorCodes.VALIDATION_ERROR, 400);
    }

    // Validate email addresses
    const toArray = Array.isArray(message.to) ? message.to : [message.to];
    for (const email of toArray) {
      if (!this.isValidEmail(email)) {
        throw new MCPError(`Invalid email address: ${email}`, ErrorCodes.VALIDATION_ERROR, 400);
      }
    }
  }

  /**
   * Simple email validation
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check rate limit (emails per minute)
   */
  private checkRateLimit(): void {
    const now = Date.now();
    const minute = 60 * 1000;
    const windowKey = 'email-sends';

    // Get send timestamps in last minute
    const timestamps = this.rateLimitTracker.get(windowKey) || [];
    const recentTimestamps = timestamps.filter((ts) => now - ts < minute);

    if (recentTimestamps.length >= this.config.emailRateLimitPerMinute) {
      throw new MCPError(
        `Rate limit exceeded: ${this.config.emailRateLimitPerMinute} emails per minute`,
        ErrorCodes.RATE_LIMIT_EXCEEDED,
        429,
        { limit: this.config.emailRateLimitPerMinute, window: '1 minute' }
      );
    }
  }

  /**
   * Track email send for rate limiting
   */
  private trackSend(): void {
    const now = Date.now();
    const minute = 60 * 1000;
    const windowKey = 'email-sends';

    const timestamps = this.rateLimitTracker.get(windowKey) || [];
    const recentTimestamps = timestamps.filter((ts) => now - ts < minute);
    recentTimestamps.push(now);

    this.rateLimitTracker.set(windowKey, recentTimestamps);
  }

  /**
   * Truncate text to specified length
   */
  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }
}
