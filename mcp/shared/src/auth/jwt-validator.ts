import jwt from 'jsonwebtoken';
import { z } from 'zod';

/**
 * JWT Payload Interface
 * Matches Mizan backend authentication pattern
 */
export interface JWTPayload {
  userId: string;
  email: string;
  tenantId: string;
  role: string;
  name?: string;
  iat: number;
  exp: number;
}

/**
 * JWT Payload Validation Schema
 * Production-ready: Runtime validation of JWT claims
 */
export const JWTPayloadSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  email: z.string().email('Invalid email format'),
  tenantId: z.string().min(1, 'tenantId is required'),
  role: z.string().min(1, 'role is required'),
  name: z.string().optional(),
  iat: z.number(),
  exp: z.number(),
});

/**
 * Legacy JWT Payload Format (backward compatibility)
 * Some tokens may use 'id' instead of 'userId'
 */
const LegacyJWTPayloadSchema = z.object({
  id: z.string().min(1),
  email: z.string().email().optional(),
  tenantId: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  iat: z.number(),
  exp: z.number(),
});

/**
 * Validate service account JWT token
 *
 * @param token - JWT token string to validate
 * @param jwtSecret - JWT secret for verification (from environment)
 * @returns Validated JWT payload
 * @throws Error if token is invalid or expired
 */
export function validateServiceToken(token: string, jwtSecret: string): JWTPayload {
  if (!token) {
    throw new Error('Token is required');
  }

  if (!jwtSecret) {
    throw new Error('JWT secret is not configured');
  }

  try {
    // Verify JWT signature
    const unverified = jwt.verify(token, jwtSecret);

    // Runtime validation of JWT payload - try modern format first
    const modernResult = JWTPayloadSchema.safeParse(unverified);
    if (modernResult.success) {
      return modernResult.data;
    }

    // Try legacy format (backward compatibility)
    const legacyResult = LegacyJWTPayloadSchema.safeParse(unverified);
    if (legacyResult.success) {
      return {
        userId: legacyResult.data.id,
        email: legacyResult.data.email || '',
        tenantId: legacyResult.data.tenantId || '',
        role: legacyResult.data.role || '',
        name: undefined,
        iat: legacyResult.data.iat,
        exp: legacyResult.data.exp,
      };
    }

    // Payload validation failed
    throw new Error(
      `Invalid token payload structure: ${JSON.stringify({
        modernErrors: modernResult.error.errors,
        legacyErrors: legacyResult.error.errors,
      })}`
    );
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Extract token from Authorization header
 *
 * @param authHeader - Authorization header value (e.g., "Bearer <token>")
 * @returns Extracted token string
 * @throws Error if header format is invalid
 */
export function extractTokenFromHeader(authHeader: string): string {
  if (!authHeader) {
    throw new Error('Authorization header is required');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    throw new Error('Invalid Authorization header format. Expected: "Bearer <token>"');
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new Error('Invalid Authorization scheme. Expected: "Bearer"');
  }

  return token;
}

/**
 * Check if token is expired
 *
 * @param payload - Validated JWT payload
 * @returns True if token is expired, false otherwise
 */
export function isTokenExpired(payload: JWTPayload): boolean {
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

/**
 * Get token expiration time in seconds
 *
 * @param payload - Validated JWT payload
 * @returns Time until expiration in seconds (negative if expired)
 */
export function getTokenExpiration(payload: JWTPayload): number {
  const now = Math.floor(Date.now() / 1000);
  return payload.exp - now;
}
