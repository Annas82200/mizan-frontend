/**
 * Backend client wrapper for mizan-analytics-mcp
 *
 * Direct imports from Mizan backend for culture analytics operations
 * Provides type-safe, tenant-isolated access to:
 * - Culture assessment validation
 * - Entropy calculations
 * - Cylinder score aggregations
 * - Insight generation
 * - Data exports
 */

import { db } from '../../../../backend/db/index';
import {
  cultureAssessments,
  cultureReports,
  cylinderScores,
  tenants,
  users,
} from '../../../../backend/db/schema';
import { eq, and, inArray, desc } from 'drizzle-orm';
import { CultureAgentV2, CultureAnalysisInput } from '../../../../backend/src/services/agents/culture/culture-agent';
import { ThreeEngineConfig } from '../../../../backend/src/services/agents/base/three-engine-agent';
import { MCPError, ErrorCodes } from '@mizan-mcp/shared';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AssessmentSubmission {
  employeeId: string;
  tenantId: string;
  personalValues: string[];
  currentExperienceValues: string[];
  desiredFutureValues: string[];
  engagementLevel: number;
  recognitionLevel: number;
}

export interface EntropyCalculationScope {
  type: 'individual' | 'department' | 'organization';
  tenantId: string;
  departmentId?: string;
  employeeId?: string;
}

export interface CylinderAggregation {
  cylinderLevel: number;
  cylinderName: string;
  enablingScore: number;
  limitingScore: number;
  netScore: number;
  employeeCount: number;
}

export interface InsightObject {
  type: 'strength' | 'gap' | 'risk' | 'opportunity';
  cylinder: number;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  recommendations: string[];
  affectedEmployeeCount?: number;
}

export interface ExportDatasetOptions {
  tenantId: string;
  scope: 'assessments' | 'reports' | 'cylinder_scores';
  format: 'csv' | 'json';
  filters?: {
    departmentId?: string;
    startDate?: Date;
    endDate?: Date;
    completedOnly?: boolean;
  };
  maxRows?: number;
}

// ============================================================================
// BACKEND CLIENT CLASS
// ============================================================================

export class BackendClient {
  private cultureAgent: CultureAgentV2;

  constructor() {
    // Initialize CultureAgentV2 with configuration
    const config: ThreeEngineConfig = {
      agentType: 'culture',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      model: 'claude-sonnet-4-5-20250929',
      maxTokens: 8000,
      temperature: 0.3,
      enableCaching: true,
      cacheTTL: 300000, // 5 minutes
    };

    this.cultureAgent = new CultureAgentV2('culture', config);
  }

  // ============================================================================
  // VALIDATION METHODS
  // ============================================================================

  /**
   * Validate culture assessment submission
   *
   * Checks:
   * - Required fields present
   * - Value selections are valid
   * - Engagement/recognition levels in range
   * - Employee and tenant exist
   */
  async validateSubmission(
    submission: AssessmentSubmission
  ): Promise<{
    valid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate required fields
    if (!submission.employeeId) {
      errors.push('employeeId is required');
    }
    if (!submission.tenantId) {
      errors.push('tenantId is required');
    }
    if (!submission.personalValues || submission.personalValues.length === 0) {
      errors.push('personalValues must contain at least one value');
    }

    // Validate value arrays
    if (submission.personalValues && submission.personalValues.length > 10) {
      warnings.push('personalValues: typically 3-7 values recommended, more than 10 may dilute focus');
    }
    if (submission.currentExperienceValues && submission.currentExperienceValues.length > 10) {
      warnings.push('currentExperienceValues: more than 10 values may indicate lack of clarity');
    }

    // Validate engagement level
    if (submission.engagementLevel !== undefined) {
      if (submission.engagementLevel < 0 || submission.engagementLevel > 100) {
        errors.push('engagementLevel must be between 0 and 100');
      }
    }

    // Validate recognition level
    if (submission.recognitionLevel !== undefined) {
      if (submission.recognitionLevel < 0 || submission.recognitionLevel > 100) {
        errors.push('recognitionLevel must be between 0 and 100');
      }
    }

    // Verify tenant exists
    try {
      const tenant = await db
        .select({ id: tenants.id })
        .from(tenants)
        .where(eq(tenants.id, submission.tenantId))
        .limit(1);

      if (tenant.length === 0) {
        errors.push(`Tenant not found: ${submission.tenantId}`);
      }
    } catch (error) {
      errors.push(`Database error checking tenant: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Verify employee exists and belongs to tenant
    try {
      const employee = await db
        .select({ id: users.id, tenantId: users.tenantId })
        .from(users)
        .where(eq(users.id, submission.employeeId))
        .limit(1);

      if (employee.length === 0) {
        errors.push(`Employee not found: ${submission.employeeId}`);
      } else if (employee[0].tenantId !== submission.tenantId) {
        errors.push('Employee does not belong to specified tenant');
      }
    } catch (error) {
      errors.push(`Database error checking employee: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  // ============================================================================
  // ENTROPY CALCULATION METHODS
  // ============================================================================

  /**
   * Compute cultural entropy (percentage of limiting values)
   *
   * Entropy = (Limiting Value Count / Total Value Count) * 100
   *
   * Interpretation:
   * - 0-20%: Healthy culture, strong enabling values
   * - 21-40%: Moderate health, some limiting values present
   * - 41-60%: Warning signs, limiting values gaining ground
   * - 61-80%: Unhealthy culture, limiting values dominate
   * - 81-100%: Critical state, urgent intervention needed
   */
  async computeEntropy(
    scope: EntropyCalculationScope
  ): Promise<{
    entropy: number;
    enablingCount: number;
    limitingCount: number;
    totalCount: number;
    interpretation: string;
    affectedEmployeeCount: number;
  }> {
    let cylinderData: Array<{
      enablingValues: Record<string, number>;
      limitingValues: Record<string, number>;
    }> = [];

    // Fetch cylinder scores based on scope
    try {
      if (scope.type === 'individual' && scope.employeeId) {
        // Individual employee entropy
        const reports = await db
          .select({
            enablingValues: cultureReports.enablingValues,
            limitingValues: cultureReports.limitingValues,
          })
          .from(cultureReports)
          .where(
            and(
              eq(cultureReports.tenantId, scope.tenantId),
              eq(cultureReports.userId, scope.employeeId)
            )
          )
          .orderBy(desc(cultureReports.createdAt))
          .limit(1);

        cylinderData = reports as Array<{
          enablingValues: Record<string, number>;
          limitingValues: Record<string, number>;
        }>;
      } else if (scope.type === 'department' && scope.departmentId) {
        // Department entropy - aggregate from employees in department
        const reports = await db
          .select({
            enablingValues: cultureReports.enablingValues,
            limitingValues: cultureReports.limitingValues,
          })
          .from(cultureReports)
          .innerJoin(users, eq(cultureReports.userId, users.id))
          .where(
            and(
              eq(cultureReports.tenantId, scope.tenantId),
              eq(users.departmentId, scope.departmentId)
            )
          );

        cylinderData = reports as Array<{
          enablingValues: Record<string, number>;
          limitingValues: Record<string, number>;
        }>;
      } else if (scope.type === 'organization') {
        // Organization entropy - aggregate all employees
        const reports = await db
          .select({
            enablingValues: cultureReports.enablingValues,
            limitingValues: cultureReports.limitingValues,
          })
          .from(cultureReports)
          .where(eq(cultureReports.tenantId, scope.tenantId));

        cylinderData = reports as Array<{
          enablingValues: Record<string, number>;
          limitingValues: Record<string, number>;
        }>;
      }
    } catch (error) {
      throw new MCPError(
        `Failed to fetch cylinder data: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCodes.INTERNAL_ERROR,
        500,
        { scope }
      );
    }

    if (cylinderData.length === 0) {
      throw new MCPError(
        'No culture data found for the specified scope',
        ErrorCodes.RESOURCE_NOT_FOUND,
        404,
        { scope }
      );
    }

    // Calculate total enabling and limiting values
    let totalEnabling = 0;
    let totalLimiting = 0;

    for (const report of cylinderData) {
      if (report.enablingValues) {
        totalEnabling += Object.values(report.enablingValues).reduce(
          (sum, count) => sum + (typeof count === 'number' ? count : 0),
          0
        );
      }
      if (report.limitingValues) {
        totalLimiting += Object.values(report.limitingValues).reduce(
          (sum, count) => sum + (typeof count === 'number' ? count : 0),
          0
        );
      }
    }

    const totalCount = totalEnabling + totalLimiting;
    const entropy = totalCount > 0 ? (totalLimiting / totalCount) * 100 : 0;

    // Generate interpretation
    let interpretation: string;
    if (entropy <= 20) {
      interpretation = 'Healthy culture with strong enabling values';
    } else if (entropy <= 40) {
      interpretation = 'Moderate health with some limiting values present';
    } else if (entropy <= 60) {
      interpretation = 'Warning signs - limiting values gaining ground';
    } else if (entropy <= 80) {
      interpretation = 'Unhealthy culture - limiting values dominate';
    } else {
      interpretation = 'Critical state - urgent intervention needed';
    }

    return {
      entropy: Math.round(entropy * 100) / 100,
      enablingCount: totalEnabling,
      limitingCount: totalLimiting,
      totalCount,
      interpretation,
      affectedEmployeeCount: cylinderData.length,
    };
  }

  // ============================================================================
  // AGGREGATION METHODS
  // ============================================================================

  /**
   * Aggregate cylinder scores across employees
   *
   * Returns average cylinder scores by level (1-7) for:
   * - Department (if departmentId provided)
   * - Organization (if no departmentId)
   */
  async aggregateCylinderScores(
    tenantId: string,
    departmentId?: string
  ): Promise<CylinderAggregation[]> {
    try {
      // Build query based on scope
      let query = db
        .select({
          cylinderLevel: cylinderScores.cylinderLevel,
          enablingCount: cylinderScores.enablingCount,
          limitingCount: cylinderScores.limitingCount,
          userId: cylinderScores.userId,
        })
        .from(cylinderScores)
        .where(eq(cylinderScores.tenantId, tenantId));

      // If department filter, join with users table
      if (departmentId) {
        const scores = await db
          .select({
            cylinderLevel: cylinderScores.cylinderLevel,
            enablingCount: cylinderScores.enablingCount,
            limitingCount: cylinderScores.limitingCount,
            userId: cylinderScores.userId,
          })
          .from(cylinderScores)
          .innerJoin(users, eq(cylinderScores.userId, users.id))
          .where(
            and(
              eq(cylinderScores.tenantId, tenantId),
              eq(users.departmentId, departmentId)
            )
          );

        return this.aggregateScores(scores);
      } else {
        const scores = await query;
        return this.aggregateScores(scores);
      }
    } catch (error) {
      throw new MCPError(
        `Failed to aggregate cylinder scores: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCodes.INTERNAL_ERROR,
        500,
        { tenantId, departmentId }
      );
    }
  }

  /**
   * Helper method to aggregate scores by cylinder level
   */
  private aggregateScores(
    scores: Array<{
      cylinderLevel: number;
      enablingCount: number;
      limitingCount: number;
      userId: string;
    }>
  ): CylinderAggregation[] {
    const cylinderMap = new Map<
      number,
      {
        enablingSum: number;
        limitingSum: number;
        employeeIds: Set<string>;
      }
    >();

    // Cylinder names for reference
    const cylinderNames: Record<number, string> = {
      1: 'Safety & Survival',
      2: 'Belonging & Loyalty',
      3: 'Growth & Achievement',
      4: 'Meaning & Contribution',
      5: 'Integrity & Justice',
      6: 'Wisdom & Compassion',
      7: 'Transcendence & Unity',
    };

    // Aggregate scores by cylinder
    for (const score of scores) {
      if (!cylinderMap.has(score.cylinderLevel)) {
        cylinderMap.set(score.cylinderLevel, {
          enablingSum: 0,
          limitingSum: 0,
          employeeIds: new Set(),
        });
      }

      const data = cylinderMap.get(score.cylinderLevel)!;
      data.enablingSum += score.enablingCount;
      data.limitingSum += score.limitingCount;
      data.employeeIds.add(score.userId);
    }

    // Calculate averages
    const aggregations: CylinderAggregation[] = [];

    for (let level = 1; level <= 7; level++) {
      const data = cylinderMap.get(level);
      if (data) {
        const employeeCount = data.employeeIds.size;
        const enablingScore = employeeCount > 0 ? data.enablingSum / employeeCount : 0;
        const limitingScore = employeeCount > 0 ? data.limitingSum / employeeCount : 0;
        const netScore = enablingScore - limitingScore;

        aggregations.push({
          cylinderLevel: level,
          cylinderName: cylinderNames[level] || `Cylinder ${level}`,
          enablingScore: Math.round(enablingScore * 100) / 100,
          limitingScore: Math.round(limitingScore * 100) / 100,
          netScore: Math.round(netScore * 100) / 100,
          employeeCount,
        });
      } else {
        // No data for this cylinder
        aggregations.push({
          cylinderLevel: level,
          cylinderName: cylinderNames[level] || `Cylinder ${level}`,
          enablingScore: 0,
          limitingScore: 0,
          netScore: 0,
          employeeCount: 0,
        });
      }
    }

    return aggregations;
  }

  // ============================================================================
  // INSIGHT GENERATION METHODS
  // ============================================================================

  /**
   * Generate structured insight objects from culture data
   *
   * Uses CultureAgentV2 Three-Engine analysis to generate actionable insights
   */
  async generateInsights(
    tenantId: string,
    companyValues: string[],
    strategy?: string
  ): Promise<InsightObject[]> {
    // Fetch employee assessments for the tenant
    const assessments = await db
      .select({
        employeeId: cultureAssessments.userId,
        personalValues: cultureAssessments.personalValues,
        currentExperience: cultureAssessments.currentExperienceValues,
        desiredExperience: cultureAssessments.desiredFutureValues,
        engagement: cultureAssessments.engagementLevel,
        recognition: cultureAssessments.recognitionLevel,
      })
      .from(cultureAssessments)
      .where(
        and(
          eq(cultureAssessments.tenantId, tenantId),
          eq(cultureAssessments.status, 'completed')
        )
      )
      .limit(100); // Limit to prevent excessive API calls

    if (assessments.length === 0) {
      throw new MCPError(
        'No completed assessments found for tenant',
        ErrorCodes.RESOURCE_NOT_FOUND,
        404,
        { tenantId }
      );
    }

    // Prepare input for CultureAgentV2
    const input: CultureAnalysisInput = {
      companyId: tenantId, // Using tenantId as companyId
      tenantId,
      companyValues,
      strategy,
      employeeAssessments: assessments.map((a) => ({
        employeeId: a.employeeId,
        personalValues: (a.personalValues as string[]) || [],
        currentExperienceValues: (a.currentExperience as string[]) || [],
        desiredFutureValues: (a.desiredExperience as string[]) || [],
        engagementLevel: a.engagement || 50,
        recognitionLevel: a.recognition || 50,
      })),
    };

    // Run Three-Engine analysis
    try {
      const analysis = await this.cultureAgent.analyzeCulture(input);

      // Convert analysis to structured insights
      const insights: InsightObject[] = [];

      // Add strengths (accelerators)
      for (const accelerator of analysis.strategyAlignment.accelerators) {
        insights.push({
          type: 'strength',
          cylinder: 0, // Cross-cylinder strength
          title: 'Cultural Accelerator',
          description: accelerator,
          impact: 'high',
          recommendations: ['Leverage this strength in strategic initiatives'],
        });
      }

      // Add gaps (blockers)
      for (const blocker of analysis.strategyAlignment.blockers) {
        insights.push({
          type: 'gap',
          cylinder: 0, // Cross-cylinder gap
          title: 'Cultural Blocker',
          description: blocker,
          impact: 'high',
          recommendations: analysis.recommendations.immediate,
          affectedEmployeeCount: assessments.length,
        });
      }

      // Add cylinder-specific risks
      for (const [cylinderStr, health] of Object.entries(analysis.cylinderHealth)) {
        const cylinder = parseInt(cylinderStr);
        if (health.status === 'warning' || health.status === 'critical') {
          insights.push({
            type: 'risk',
            cylinder,
            title: `Cylinder ${cylinder} Health Risk`,
            description: `Status: ${health.status}. Score: ${health.score}`,
            impact: health.status === 'critical' ? 'high' : 'medium',
            recommendations: analysis.recommendations.shortTerm,
          });
        }
      }

      return insights;
    } catch (error) {
      throw new MCPError(
        `Failed to generate insights: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCodes.INTERNAL_ERROR,
        500,
        { tenantId }
      );
    }
  }

  // ============================================================================
  // EXPORT METHODS
  // ============================================================================

  /**
   * Export dataset as CSV or JSON
   *
   * Supports exporting:
   * - Culture assessments
   * - Culture reports
   * - Cylinder scores
   */
  async exportDataset(
    options: ExportDatasetOptions
  ): Promise<{
    data: string;
    format: 'csv' | 'json';
    rowCount: number;
    exportedAt: string;
  }> {
    const maxRows = options.maxRows || 10000;
    let data: unknown[] = [];
    let format: 'csv' | 'json' = options.format;

    try {
      // Fetch data based on scope
      if (options.scope === 'assessments') {
        let query = db
          .select()
          .from(cultureAssessments)
          .where(eq(cultureAssessments.tenantId, options.tenantId))
          .limit(maxRows);

        // Apply filters
        if (options.filters?.completedOnly) {
          query = db
            .select()
            .from(cultureAssessments)
            .where(
              and(
                eq(cultureAssessments.tenantId, options.tenantId),
                eq(cultureAssessments.status, 'completed')
              )
            )
            .limit(maxRows);
        }

        data = await query;
      } else if (options.scope === 'reports') {
        data = await db
          .select()
          .from(cultureReports)
          .where(eq(cultureReports.tenantId, options.tenantId))
          .limit(maxRows);
      } else if (options.scope === 'cylinder_scores') {
        data = await db
          .select()
          .from(cylinderScores)
          .where(eq(cylinderScores.tenantId, options.tenantId))
          .limit(maxRows);
      }
    } catch (error) {
      throw new MCPError(
        `Failed to export dataset: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ErrorCodes.INTERNAL_ERROR,
        500,
        { options }
      );
    }

    if (data.length === 0) {
      throw new MCPError(
        'No data found matching export criteria',
        ErrorCodes.RESOURCE_NOT_FOUND,
        404,
        { options }
      );
    }

    // Format data
    let formattedData: string;
    if (format === 'json') {
      formattedData = JSON.stringify(data, null, 2);
    } else {
      // CSV format
      formattedData = this.convertToCSV(data);
    }

    return {
      data: formattedData,
      format,
      rowCount: data.length,
      exportedAt: new Date().toISOString(),
    };
  }

  /**
   * Helper method to convert array of objects to CSV
   */
  private convertToCSV(data: unknown[]): string {
    if (data.length === 0) return '';

    const firstRow = data[0] as Record<string, unknown>;
    const headers = Object.keys(firstRow);

    // Create header row
    const csvRows: string[] = [headers.join(',')];

    // Create data rows
    for (const row of data) {
      const values = headers.map((header) => {
        const value = (row as Record<string, unknown>)[header];
        // Handle nulls, arrays, objects
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') return JSON.stringify(value);
        if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
        return String(value);
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  }
}
