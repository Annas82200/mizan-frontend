/**
 * Core API Type Definitions
 *
 * Centralized type definitions for API responses to eliminate 'any' usage.
 * Compliant with AGENT_CONTEXT_ULTIMATE.md - Strict TypeScript typing.
 *
 * These types should match the backend response structures.
 */

// ------------------------------------------------------------------------------
// Core Entity Types
// ------------------------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'manager' | 'admin' | 'clientAdmin' | 'superadmin';
  tenantId: string;
  departmentId?: string;
  managerId?: string;
  title?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tenant {
  id: string;
  name: string;
  domain?: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial' | 'cancelled';
  industry?: string;
  size?: string;
  employeeCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Department {
  id: string;
  name: string;
  tenantId: string;
  managerId?: string;
  parentDepartmentId?: string;
  createdAt?: string;
}

// ------------------------------------------------------------------------------
// Skills Module Types
// ------------------------------------------------------------------------------

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'strategic';
  level: number; // 0-100
  proficiency?: number;
  required?: boolean;
  importance?: 'low' | 'medium' | 'high' | 'critical';
}

export interface SkillGap {
  id: string;
  skillId?: string;
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  gapSeverity: 'minor' | 'moderate' | 'significant' | 'critical';
  priority: number;
  recommendations?: string[];
}

export interface SkillsFramework {
  id: string;
  name: string;
  tenantId: string;
  strategicSkills: Skill[];
  technicalSkills: Skill[];
  softSkills: Skill[];
  prioritization?: PrioritizationItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PrioritizationItem {
  skillName: string;
  priority: number;
  rationale: string;
}

export interface EmployeeSkillsProfile {
  employeeId: string;
  employeeName?: string;
  skills: Skill[];
  gaps: SkillGap[];
  strengths: Skill[];
  overallScore?: number;
  lastAssessment?: string;
}

// ------------------------------------------------------------------------------
// Culture Module Types
// ------------------------------------------------------------------------------

export interface CultureAssessment {
  id: string;
  tenantId: string;
  employeeId?: string;
  status: 'pending' | 'in_progress' | 'completed';
  scores?: Record<string, number>;
  completedAt?: string;
  createdAt?: string;
}

export interface CylinderScore {
  name: string;
  score: number;
  targetScore?: number;
  interpretation?: string;
}

// ------------------------------------------------------------------------------
// Performance Module Types
// ------------------------------------------------------------------------------

export interface PerformanceGoal {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'departmental' | 'culture' | 'skills';
  category: string;
  targetValue: number;
  currentValue?: number;
  progress?: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  weight: number;
  dueDate: string;
  employeeId?: string;
  createdAt?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  overallRating?: number;
  goals?: PerformanceGoal[];
  feedback?: string;
  status: 'draft' | 'submitted' | 'approved';
  createdAt?: string;
}

// ------------------------------------------------------------------------------
// Billing Types
// ------------------------------------------------------------------------------

export interface BillingPlan {
  id: string;
  name: string;
  pricePerEmployee: number;
  features: string[];
  recommended?: boolean;
}

export interface Invoice {
  id: string;
  tenantId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  dueDate: string;
  paidAt?: string;
  invoiceUrl?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account';
  last4: string;
  brand?: string;
  isDefault: boolean;
}

// ------------------------------------------------------------------------------
// Survey Types
// ------------------------------------------------------------------------------

export interface SurveyData {
  id: string;
  token: string;
  employeeEmail: string;
  status: 'pending' | 'completed' | 'expired';
  questions?: SurveyQuestion[];
  responses?: Record<string, any>;
  completedAt?: string;
}

export interface SurveyQuestion {
  id: string;
  text: string;
  type: 'rating' | 'text' | 'choice';
  options?: string[];
  required: boolean;
}

// ------------------------------------------------------------------------------
// API Response Wrappers
// ------------------------------------------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
}

export interface ApiError {
  error: string;
  code?: string;
  details?: ValidationErrorDetail[] | string;
}

// ------------------------------------------------------------------------------
// Analytics Types
// ------------------------------------------------------------------------------

export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalAnalyses: number;
  metrics: Record<string, number>;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  timestamp?: string;
}

// ------------------------------------------------------------------------------
// Upload Types
// ------------------------------------------------------------------------------

export interface FileUploadResponse {
  success: boolean;
  fileId?: string;
  fileName?: string;
  fileUrl?: string;
  extractedData?: any;
}

// ------------------------------------------------------------------------------
// Export/Import Types
// ------------------------------------------------------------------------------

export interface ExportOptions {
  format: 'csv' | 'json' | 'pdf' | 'excel';
  includeHeaders?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ExportResult {
  success: boolean;
  downloadUrl?: string;
  fileName?: string;
  recordCount?: number;
}
