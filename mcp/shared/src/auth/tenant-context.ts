import { JWTPayload } from './jwt-validator';

/**
 * Tenant Context
 *
 * Manages tenant isolation and access control for MCP servers.
 * Ensures all operations are properly scoped to a specific tenant.
 */
export class TenantContext {
  private readonly tenantId: string;
  private readonly userId: string;
  private readonly userRole: string;
  private readonly userEmail: string;

  constructor(payload: JWTPayload) {
    this.tenantId = payload.tenantId;
    this.userId = payload.userId;
    this.userRole = payload.role;
    this.userEmail = payload.email;
  }

  /**
   * Get tenant ID
   */
  getTenantId(): string {
    return this.tenantId;
  }

  /**
   * Get user ID
   */
  getUserId(): string {
    return this.userId;
  }

  /**
   * Get user role
   */
  getUserRole(): string {
    return this.userRole;
  }

  /**
   * Get user email
   */
  getUserEmail(): string {
    return this.userEmail;
  }

  /**
   * Validate access against allowed tenant list
   *
   * @param allowedTenants - Array of allowed tenant IDs
   * @returns True if tenant is authorized, false otherwise
   */
  validateAccess(allowedTenants: string[]): boolean {
    if (!allowedTenants || allowedTenants.length === 0) {
      throw new Error('Allowed tenants list is empty or undefined');
    }

    return allowedTenants.includes(this.tenantId);
  }

  /**
   * Enforce access control - throws error if unauthorized
   *
   * @param allowedTenants - Array of allowed tenant IDs
   * @throws Error if tenant is not authorized
   */
  enforceAccess(allowedTenants: string[]): void {
    if (!this.validateAccess(allowedTenants)) {
      throw new Error(
        `Unauthorized tenant access: ${this.tenantId} is not in allowed list`
      );
    }
  }

  /**
   * Get tenant filter object for database queries
   * Ensures all database queries are tenant-scoped
   *
   * @returns Object with tenantId filter
   */
  getTenantFilter(): { tenantId: string } {
    return { tenantId: this.tenantId };
  }

  /**
   * Check if user has specific role
   *
   * @param role - Role to check
   * @returns True if user has the specified role
   */
  hasRole(role: string): boolean {
    return this.userRole === role;
  }

  /**
   * Check if user has any of the specified roles
   *
   * @param roles - Array of roles to check
   * @returns True if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    return roles.includes(this.userRole);
  }

  /**
   * Check if user is admin or superadmin
   */
  isAdmin(): boolean {
    return this.hasAnyRole(['admin', 'superadmin']);
  }

  /**
   * Check if user is superadmin
   */
  isSuperAdmin(): boolean {
    return this.hasRole('superadmin');
  }

  /**
   * Get context metadata for logging
   *
   * @returns Object with context information for logging
   */
  getLoggingContext(): {
    tenantId: string;
    userId: string;
    userRole: string;
    userEmail: string;
  } {
    return {
      tenantId: this.tenantId,
      userId: this.userId,
      userRole: this.userRole,
      userEmail: this.userEmail,
    };
  }

  /**
   * Create tenant context from service account token payload
   *
   * @param payload - Validated JWT payload
   * @param allowedTenants - Array of allowed tenant IDs
   * @returns TenantContext instance
   * @throws Error if tenant is not authorized
   */
  static fromServiceAccount(
    payload: JWTPayload,
    allowedTenants: string[]
  ): TenantContext {
    const context = new TenantContext(payload);
    context.enforceAccess(allowedTenants);
    return context;
  }
}

/**
 * Create tenant context from environment configuration
 *
 * @param jwtPayload - Validated JWT payload
 * @param allowedTenantIds - Comma-separated list of allowed tenant IDs
 * @returns TenantContext instance
 * @throws Error if configuration is invalid or tenant is unauthorized
 */
export function createTenantContext(
  jwtPayload: JWTPayload,
  allowedTenantIds: string
): TenantContext {
  if (!allowedTenantIds) {
    throw new Error('MCP_ALLOWED_TENANT_IDS environment variable is not set');
  }

  const allowedTenants = allowedTenantIds.split(',').map((id) => id.trim());

  return TenantContext.fromServiceAccount(jwtPayload, allowedTenants);
}
