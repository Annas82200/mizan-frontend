import apiClient from '@/lib/api-client';
import { z } from 'zod';

// ============================================
// ZOD VALIDATION SCHEMAS
// ============================================

// Common schemas
const PaginationParamsSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  search: z.string().optional(),
});

const TimeRangeParamsSchema = z.object({
  timeRange: z.enum(['7d', '30d', '90d', '1y']).optional(),
});

// API Response wrapper schema
const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  success: z.boolean(),
  data: dataSchema,
  message: z.string().optional(),
  error: z.string().optional(),
});

// Success response schema
const SuccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

// Superadmin schemas
const SuperadminStatsSchema = z.object({
  totalTenants: z.number().nonnegative(),
  activeTenants: z.number().nonnegative(),
  totalRevenue: z.number().nonnegative(),
  monthlyGrowth: z.number(),
  totalUsers: z.number().nonnegative(),
  totalAnalyses: z.number().nonnegative(),
});

const TenantSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  domain: z.string().min(1),
  plan: z.enum(['starter', 'professional', 'enterprise']),
  status: z.enum(['active', 'suspended', 'trial', 'cancelled']),
  userCount: z.number().nonnegative(),
  createdAt: z.string().datetime(),
  lastActivity: z.string().datetime(),
  monthlyRevenue: z.number().nonnegative(),
});

const TenantsResponseSchema = z.object({
  tenants: z.array(TenantSchema),
  total: z.number().nonnegative(),
  page: z.number().positive(),
  limit: z.number().positive(),
  totalPages: z.number().nonnegative(),
});

const RevenueDataSchema = z.object({
  totalRevenue: z.number().nonnegative(),
  monthlyRevenue: z.array(z.object({
    month: z.string().min(1),
    revenue: z.number().nonnegative(),
    growth: z.number(),
  })),
  revenueByPlan: z.record(z.string(), z.number().nonnegative()),
});

const ActivityItemSchema = z.object({
  id: z.number().positive(),
  type: z.enum(['tenant_created', 'analysis_completed', 'user_registered', 'subscription_changed']),
  description: z.string().min(1),
  tenantId: z.number().positive().optional(),
  tenantName: z.string().min(1).optional(),
  timestamp: z.string().datetime(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const CreateTenantSchema = z.object({
  name: z.string().min(1).max(255),
  domain: z.string().min(1).max(255),
  plan: z.enum(['starter', 'professional', 'enterprise']),
  adminEmail: z.string().email().max(255),
  adminName: z.string().min(1).max(255),
});

const UpdateTenantSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  plan: z.enum(['starter', 'professional', 'enterprise']).optional(),
  status: z.enum(['active', 'suspended', 'trial', 'cancelled']).optional(),
});

const UsageStatsSchema = z.object({
  totalApiCalls: z.number().nonnegative(),
  totalAnalyses: z.number().nonnegative(),
  activeUsers: z.number().nonnegative(),
  storageUsed: z.number().nonnegative(),
  dailyStats: z.array(z.object({
    date: z.string().date(),
    apiCalls: z.number().nonnegative(),
    analyses: z.number().nonnegative(),
    activeUsers: z.number().nonnegative(),
  })),
});

const ApiStatsSchema = z.object({
  totalRequests: z.number().nonnegative(),
  averageResponseTime: z.number().nonnegative(),
  errorRate: z.number().min(0).max(1),
  endpointStats: z.array(z.object({
    endpoint: z.string().min(1),
    requests: z.number().nonnegative(),
    averageTime: z.number().nonnegative(),
    errorCount: z.number().nonnegative(),
  })),
});

const AgentStatsSchema = z.object({
  totalAnalyses: z.number().nonnegative(),
  structureAnalyses: z.number().nonnegative(),
  cultureAnalyses: z.number().nonnegative(),
  skillsAnalyses: z.number().nonnegative(),
  performanceAnalyses: z.number().nonnegative(),
  hiringAnalyses: z.number().nonnegative(),
  averageProcessingTime: z.number().nonnegative(),
  successRate: z.number().min(0).max(1),
});

const PerformanceMetricsSchema = z.object({
  cpuUsage: z.number().min(0).max(100),
  memoryUsage: z.number().min(0).max(100),
  diskUsage: z.number().min(0).max(100),
  responseTime: z.number().nonnegative(),
  uptime: z.number().nonnegative(),
  errorRate: z.number().min(0).max(1),
});

const StructureAnalysisDataSchema = z.object({
  orgChartFile: z.string().min(1).optional(),
  analysisType: z.enum(['full', 'quick', 'targeted']),
  focusAreas: z.array(z.string().min(1)).optional(),
});

const CultureAnalysisDataSchema = z.object({
  surveyType: z.enum(['full', 'pulse', 'targeted']),
  targetGroups: z.array(z.string().min(1)).optional(),
  customQuestions: z.array(z.string().min(1)).optional(),
});

const BillingOverviewSchema = z.object({
  totalRevenue: z.number().nonnegative(),
  monthlyRecurring: z.number().nonnegative(),
  churnRate: z.number().min(0).max(1),
  averageRevenuePerTenant: z.number().nonnegative(),
  outstandingInvoices: z.number().nonnegative(),
});

const InvoiceSchema = z.object({
  id: z.number().positive(),
  tenantId: z.number().positive(),
  tenantName: z.string().min(1),
  amount: z.number().nonnegative(),
  status: z.enum(['paid', 'pending', 'overdue', 'cancelled']),
  dueDate: z.string().date(),
  createdAt: z.string().datetime(),
});

// Admin schemas
const AdminOverviewSchema = z.object({
  totalEmployees: z.number().nonnegative(),
  activeAnalyses: z.number().nonnegative(),
  completedAnalyses: z.number().nonnegative(),
  pendingSurveys: z.number().nonnegative(),
  teamHealth: z.number().min(0).max(100),
  cultureScore: z.number().min(0).max(100),
});

const CylinderHealthSchema = z.object({
  structure: z.object({
    status: z.enum(['healthy', 'warning', 'critical']),
    score: z.number().min(0).max(100),
    lastUpdated: z.string().datetime(),
  }),
  culture: z.object({
    status: z.enum(['healthy', 'warning', 'critical']),
    score: z.number().min(0).max(100),
    lastUpdated: z.string().datetime(),
  }),
  skills: z.object({
    status: z.enum(['healthy', 'warning', 'critical']),
    score: z.number().min(0).max(100),
    lastUpdated: z.string().datetime(),
  }),
  performance: z.object({
    status: z.enum(['healthy', 'warning', 'critical']),
    score: z.number().min(0).max(100),
    lastUpdated: z.string().datetime(),
  }),
});

const RecentAnalysisSchema = z.object({
  id: z.number().positive(),
  type: z.enum(['structure', 'culture', 'skills', 'performance']),
  title: z.string().min(1),
  status: z.enum(['pending', 'processing', 'completed', 'failed']),
  createdAt: z.string().datetime(),
  completedAt: z.string().datetime().optional(),
});

const EmployeeSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email(),
  position: z.string().min(1),
  department: z.string().min(1),
  status: z.enum(['active', 'inactive', 'pending']),
  joinDate: z.string().date(),
  lastActivity: z.string().datetime(),
});

const CreateEmployeeSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  position: z.string().min(1).max(255),
  department: z.string().min(1).max(255),
  managerId: z.number().positive().optional(),
});

const UpdateEmployeeSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  position: z.string().min(1).max(255).optional(),
  department: z.string().min(1).max(255).optional(),
  managerId: z.number().positive().optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

const CultureSurveyLaunchSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  targetGroups: z.array(z.string().min(1)),
  deadline: z.string().datetime(),
  anonymous: z.boolean(),
});

// Employee schemas
const TaskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  dueDate: z.string().datetime(),
  priority: z.enum(['low', 'medium', 'high']),
});

const FeedbackItemSchema = z.object({
  id: z.number().positive(),
  from: z.string().min(1),
  message: z.string().min(1),
  date: z.string().datetime(),
});

const GoalItemSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  progress: z.number().min(0).max(100),
  dueDate: z.string().datetime(),
});

const TeamUpdateSchema = z.object({
  id: z.number().positive(),
  message: z.string().min(1),
  author: z.string().min(1),
  date: z.string().datetime(),
});

const EmployeeDashboardSchema = z.object({
  upcomingTasks: z.array(TaskSchema),
  recentFeedback: z.array(FeedbackItemSchema),
  goals: z.array(GoalItemSchema),
  teamUpdates: z.array(TeamUpdateSchema),
});

const EmployeeProfileSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email(),
  position: z.string().min(1),
  department: z.string().min(1),
  managerId: z.number().positive().optional(),
  managerName: z.string().min(1).optional(),
  joinDate: z.string().date(),
  skills: z.array(z.string().min(1)),
  bio: z.string().max(1000).optional(),
});

const UpdateProfileSchema = z.object({
  bio: z.string().max(1000).optional(),
  skills: z.array(z.string().min(1)).optional(),
});

const GoalSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
  progress: z.number().min(0).max(100),
  dueDate: z.string().datetime(),
  status: z.enum(['active', 'completed', 'overdue']),
});

const FeedbackSchema = z.object({
  id: z.number().positive(),
  from: z.string().min(1),
  fromId: z.number().positive(),
  message: z.string().min(1),
  type: z.enum(['praise', 'constructive', 'suggestion']),
  date: z.string().datetime(),
  isRead: z.boolean(),
});

const TeamMemberSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  position: z.string().min(1),
  email: z.string().email(),
  status: z.enum(['active', 'inactive', 'away']),
  lastActivity: z.string().datetime(),
});

// Common schemas
const NotificationSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(['info', 'warning', 'success', 'error']),
  isRead: z.boolean(),
  createdAt: z.string().datetime(),
});

const CurrentUserSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['superadmin', 'admin', 'employee']),
  tenantId: z.number().positive(),
  tenantName: z.string().min(1),
  permissions: z.array(z.string().min(1)),
});

// Analysis response schemas
const AnalysisResponseSchema = z.object({
  analysisId: z.string().uuid(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']),
});

const FileUploadResponseSchema = z.object({
  fileId: z.string().uuid(),
  fileName: z.string().min(1),
  status: z.enum(['uploaded', 'processing', 'ready', 'error']),
});

const SurveyLaunchResponseSchema = z.object({
  surveyId: z.string().uuid(),
  surveyUrl: z.string().url(),
  status: z.enum(['created', 'active', 'paused', 'completed']),
});

const ImpersonationResponseSchema = z.object({
  token: z.string().min(1),
  tenant: TenantSchema,
});

// Pagination response wrapper
const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => z.object({
  items: z.array(itemSchema),
  total: z.number().nonnegative(),
  page: z.number().positive(),
  limit: z.number().positive(),
  totalPages: z.number().nonnegative(),
});

// ============================================
// TYPE DEFINITIONS
// ============================================

export type SuperadminStats = z.infer<typeof SuperadminStatsSchema>;
export type Tenant = z.infer<typeof TenantSchema>;
export type TenantsResponse = z.infer<typeof TenantsResponseSchema>;
export type RevenueData = z.infer<typeof RevenueDataSchema>;
export type ActivityItem = z.infer<typeof ActivityItemSchema>;
export type CreateTenantData = z.infer<typeof CreateTenantSchema>;
export type UpdateTenantData = z.infer<typeof UpdateTenantSchema>;
export type UsageStats = z.infer<typeof UsageStatsSchema>;
export type ApiStats = z.infer<typeof ApiStatsSchema>;
export type AgentStats = z.infer<typeof AgentStatsSchema>;
export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSchema>;
export type StructureAnalysisData = z.infer<typeof StructureAnalysisDataSchema>;
export type CultureAnalysisData = z.infer<typeof CultureAnalysisDataSchema>;
export type BillingOverview = z.infer<typeof BillingOverviewSchema>;
export type Invoice = z.infer<typeof InvoiceSchema>;
export type AdminOverview = z.infer<typeof AdminOverviewSchema>;
export type CylinderHealth = z.infer<typeof CylinderHealthSchema>;
export type RecentAnalysis = z.infer<typeof RecentAnalysisSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;
export type CreateEmployeeData = z.infer<typeof CreateEmployeeSchema>;
export type UpdateEmployeeData = z.infer<typeof UpdateEmployeeSchema>;
export type CultureSurveyLaunchData = z.infer<typeof CultureSurveyLaunchSchema>;
export type EmployeeDashboard = z.infer<typeof EmployeeDashboardSchema>;
export type EmployeeProfile = z.infer<typeof EmployeeProfileSchema>;
export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type Feedback = z.infer<typeof FeedbackSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type Notification = z.infer<typeof NotificationSchema>;
export type CurrentUser = z.infer<typeof CurrentUserSchema>;

// Response types
export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;
export type FileUploadResponse = z.infer<typeof FileUploadResponseSchema>;
export type SurveyLaunchResponse = z.infer<typeof SurveyLaunchResponseSchema>;
export type ImpersonationResponse = z.infer<typeof ImpersonationResponseSchema>;
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

// Pagination types
export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
export type TimeRangeParams = z.infer<typeof TimeRangeParamsSchema>;

// Extended pagination params for specific endpoints
export type TenantPaginationParams = PaginationParams & {
  plan?: 'starter' | 'professional' | 'enterprise';
  status?: 'active' | 'suspended' | 'trial' | 'cancelled';
};

export type EmployeePaginationParams = PaginationParams;

export type InvoicePaginationParams = PaginationParams;

// Service error type
export interface ServiceError extends Error {
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
}

// ============================================
// ERROR HANDLING UTILITIES
// ============================================

const handleServiceError = (error: unknown, context: string): never => {
  console.error(`${context}:`, error);
  
  if (error instanceof z.ZodError) {
    const serviceError = new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`) as ServiceError;
    serviceError.status = 400;
    serviceError.code = 'VALIDATION_ERROR';
    serviceError.details = { zodErrors: error.errors };
    throw serviceError;
  }
  
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response: { status: number; data?: { message?: string } } };
    const serviceError = new Error(axiosError.response.data?.message || 'API request failed') as ServiceError;
    serviceError.status = axiosError.response.status;
    serviceError.code = 'API_ERROR';
    throw serviceError;
  }
  
  if (error instanceof Error) {
    const serviceError = new Error(error.message) as ServiceError;
    serviceError.status = 500;
    serviceError.code = 'INTERNAL_ERROR';
    throw serviceError;
  }
  
  const serviceError = new Error('Unknown error occurred') as ServiceError;
  serviceError.status = 500;
  serviceError.code = 'UNKNOWN_ERROR';
  throw serviceError;
};

// ============================================
// SUPERADMIN API SERVICES
// ============================================

export const superadminService = {
  // Dashboard Home
  async getStats(): Promise<SuperadminStats> {
    try {
      const response = await apiClient.get('/api/superadmin/stats');
      return SuperadminStatsSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching superadmin stats');
    }
  },

  async getTenants(params?: TenantPaginationParams): Promise<TenantsResponse> {
    try {
      const validatedParams = PaginationParamsSchema.extend({
        plan: z.enum(['starter', 'professional', 'enterprise']).optional(),
        status: z.enum(['active', 'suspended', 'trial', 'cancelled']).optional(),
      }).parse(params || {});
      
      const response = await apiClient.get('/api/superadmin/tenants', { params: validatedParams });
      return TenantsResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching tenants');
    }
  },

  async getRevenue(params?: TimeRangeParams): Promise<RevenueData> {
    try {
      const validatedParams = TimeRangeParamsSchema.parse(params || {});
      const response = await apiClient.get('/api/superadmin/revenue', { params: validatedParams });
      return RevenueDataSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching revenue data');
    }
  },

  async getActivity(params?: { limit?: number }): Promise<ActivityItem[]> {
    try {
      const validatedParams = z.object({
        limit: z.number().min(1).max(100).optional(),
      }).parse(params || {});
      
      const response = await apiClient.get('/api/superadmin/activity', { params: validatedParams });
      return z.array(ActivityItemSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching activity data');
    }
  },

  // Tenant Management
  async getTenantById(id: number): Promise<Tenant> {
    try {
      const validatedId = z.number().positive().parse(id);
      const response = await apiClient.get(`/api/superadmin/tenants/${validatedId}`);
      return TenantSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error fetching tenant ${id}`);
    }
  },

  async createTenant(data: CreateTenantData): Promise<Tenant> {
    try {
      const validatedData = CreateTenantSchema.parse(data);
      const response = await apiClient.post('/api/superadmin/tenants', validatedData);
      return TenantSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error creating tenant');
    }
  },

  async updateTenant(id: number, data: UpdateTenantData): Promise<Tenant> {
    try {
      const validatedId = z.number().positive().parse(id);
      const validatedData = UpdateTenantSchema.parse(data);
      const response = await apiClient.put(`/api/superadmin/tenants/${validatedId}`, validatedData);
      return TenantSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error updating tenant ${id}`);
    }
  },

  async suspendTenant(id: number): Promise<SuccessResponse> {
    try {
      const validatedId = z.number().positive().parse(id);
      const response = await apiClient.post(`/api/superadmin/tenants/${validatedId}/suspend`);
      return SuccessResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error suspending tenant ${id}`);
    }
  },

  async impersonateTenant(id: number): Promise<ImpersonationResponse> {
    try {
      const validatedId = z.number().positive().parse(id);
      const response = await apiClient.post(`/api/superadmin/tenants/${validatedId}/impersonate`);
      return ImpersonationResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error impersonating tenant ${id}`);
    }
  },

  // System Analytics
  async getUsageStats(params?: TimeRangeParams): Promise<UsageStats> {
    try {
      const validatedParams = TimeRangeParamsSchema.parse(params || {});
      const response = await apiClient.get('/api/superadmin/analytics/usage', { params: validatedParams });
      return UsageStatsSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching usage stats');
    }
  },

  async getApiStats(params?: TimeRangeParams): Promise<ApiStats> {
    try {
      const validatedParams = TimeRangeParamsSchema.parse(params || {});
      const response = await apiClient.get('/api/superadmin/analytics/api', { params: validatedParams });
      return ApiStatsSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching API stats');
    }
  },

  async getAgentStats(params?: TimeRangeParams): Promise<AgentStats> {
    try {
      const validatedParams = TimeRangeParamsSchema.parse(params || {});
      const response = await apiClient.get('/api/superadmin/analytics/agents', { params: validatedParams });
      return AgentStatsSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching agent stats');
    }
  },

  async getPerformanceMetrics(params?: TimeRangeParams): Promise<PerformanceMetrics> {
    try {
      const validatedParams = TimeRangeParamsSchema.parse(params || {});
      const response = await apiClient.get('/api/superadmin/analytics/performance', { params: validatedParams });
      return PerformanceMetricsSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching performance metrics');
    }
  },

  // Module Access (with tenant selector)
  async runStructureAnalysis(tenantId: number, data: StructureAnalysisData): Promise<AnalysisResponse> {
    try {
      const validatedTenantId = z.number().positive().parse(tenantId);
      const validatedData = StructureAnalysisDataSchema.parse(data);
      const response = await apiClient.post(`/api/superadmin/structure/analyze?tenantId=${validatedTenantId}`, validatedData);
      return AnalysisResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error running structure analysis for tenant ${tenantId}`);
    }
  },

  async getStructureReports(tenantId: number): Promise<RecentAnalysis[]> {
    try {
      const validatedTenantId = z.number().positive().parse(tenantId);
      const response = await apiClient.get(`/api/superadmin/structure/reports?tenantId=${validatedTenantId}`);
      return z.array(RecentAnalysisSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error fetching structure reports for tenant ${tenantId}`);
    }
  },

  async runCultureAnalysis(tenantId: number, data: CultureAnalysisData): Promise<AnalysisResponse> {
    try {
      const validatedTenantId = z.number().positive().parse(tenantId);
      const validatedData = CultureAnalysisDataSchema.parse(data);
      const response = await apiClient.post(`/api/superadmin/culture/analyze?tenantId=${validatedTenantId}`, validatedData);
      return AnalysisResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error running culture analysis for tenant ${tenantId}`);
    }
  },

  async getCultureReports(tenantId: number): Promise<RecentAnalysis[]> {
    try {
      const validatedTenantId = z.number().positive().parse(tenantId);
      const response = await apiClient.get(`/api/superadmin/culture/reports?tenantId=${validatedTenantId}`);
      return z.array(RecentAnalysisSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error fetching culture reports for tenant ${tenantId}`);
    }
  },

  // Billing & Revenue
  async getBillingOverview(): Promise<BillingOverview> {
    try {
      const response = await apiClient.get('/api/superadmin/billing/overview');
      return BillingOverviewSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching billing overview');
    }
  },

  async getInvoices(params?: InvoicePaginationParams): Promise<{ invoices: Invoice[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const validatedParams = PaginationParamsSchema.parse(params || {});
      const response = await apiClient.get('/api/superadmin/billing/invoices', { params: validatedParams });
      return z.object({
        invoices: z.array(InvoiceSchema),
        total: z.number().nonnegative(),
        page: z.number().positive(),
        limit: z.number().positive(),
        totalPages: z.number().nonnegative(),
      }).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching invoices');
    }
  },
};

// ============================================
// ADMIN API SERVICES
// ============================================

export const adminService = {
  // Dashboard Home
  async getOverview(): Promise<AdminOverview> {
    try {
      const response = await apiClient.get('/api/admin/overview');
      return AdminOverviewSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching admin overview');
    }
  },

  async getCylinderHealth(): Promise<CylinderHealth> {
    try {
      const response = await apiClient.get('/api/admin/cylinders/health');
      return CylinderHealthSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching cylinder health');
    }
  },

  async getRecentAnalyses(): Promise<RecentAnalysis[]> {
    try {
      const response = await apiClient.get('/api/admin/analyses/recent');
      return z.array(RecentAnalysisSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching recent analyses');
    }
  },

  // Structure Analysis
  async uploadOrgChart(file: File): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post('/api/admin/structure/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return FileUploadResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error uploading org chart');
    }
  },

  async analyzeStructure(data: StructureAnalysisData): Promise<AnalysisResponse> {
    try {
      const validatedData = StructureAnalysisDataSchema.parse(data);
      const response = await apiClient.post('/api/admin/structure/analyze', validatedData);
      return AnalysisResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error analyzing structure');
    }
  },

  async getStructureReports(): Promise<RecentAnalysis[]> {
    try {
      const response = await apiClient.get('/api/admin/structure/reports');
      return z.array(RecentAnalysisSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching structure reports');
    }
  },

  // Culture Analysis
  async launchCultureSurvey(data: CultureSurveyLaunchData): Promise<SurveyLaunchResponse> {
    try {
      const validatedData = CultureSurveyLaunchSchema.parse(data);
      const response = await apiClient.post('/api/admin/culture/survey/launch', validatedData);
      return SurveyLaunchResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error launching culture survey');
    }
  },

  async getCultureResults(): Promise<RecentAnalysis[]> {
    try {
      const response = await apiClient.get('/api/admin/culture/results');
      return z.array(RecentAnalysisSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching culture results');
    }
  },

  // Team Management
  async getEmployees(params?: EmployeePaginationParams): Promise<{ employees: Employee[]; total: number; page: number; limit: number; totalPages: number }> {
    try {
      const validatedParams = PaginationParamsSchema.parse(params || {});
      const response = await apiClient.get('/api/admin/employees', { params: validatedParams });
      return z.object({
        employees: z.array(EmployeeSchema),
        total: z.number().nonnegative(),
        page: z.number().positive(),
        limit: z.number().positive(),
        totalPages: z.number().nonnegative(),
      }).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching employees');
    }
  },

  async createEmployee(data: CreateEmployeeData): Promise<Employee> {
    try {
      const validatedData = CreateEmployeeSchema.parse(data);
      const response = await apiClient.post('/api/admin/employees', validatedData);
      return EmployeeSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error creating employee');
    }
  },

  async updateEmployee(id: number, data: UpdateEmployeeData): Promise<Employee> {
    try {
      const validatedId = z.number().positive().parse(id);
      const validatedData = UpdateEmployeeSchema.parse(data);
      const response = await apiClient.put(`/api/admin/employees/${validatedId}`, validatedData);
      return EmployeeSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error updating employee ${id}`);
    }
  },

  async deleteEmployee(id: number): Promise<SuccessResponse> {
    try {
      const validatedId = z.number().positive().parse(id);
      const response = await apiClient.delete(`/api/admin/employees/${validatedId}`);
      return SuccessResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error deleting employee ${id}`);
    }
  },
};

// ============================================
// EMPLOYEE API SERVICES
// ============================================

export const employeeService = {
  // Dashboard Home
  async getDashboard(): Promise<EmployeeDashboard> {
    try {
      const response = await apiClient.get('/api/employee/dashboard');
      return EmployeeDashboardSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching employee dashboard');
    }
  },

  async getMyProfile(): Promise<EmployeeProfile> {
    try {
      const response = await apiClient.get('/api/employee/profile');
      return EmployeeProfileSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching employee profile');
    }
  },

  async updateMyProfile(data: UpdateProfileData): Promise<EmployeeProfile> {
    try {
      const validatedData = UpdateProfileSchema.parse(data);
      const response = await apiClient.put('/api/employee/profile', validatedData);
      return EmployeeProfileSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error updating employee profile');
    }
  },

  // Performance
  async getMyGoals(): Promise<Goal[]> {
    try {
      const response = await apiClient.get('/api/employee/goals');
      return z.array(GoalSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching employee goals');
    }
  },

  async getMyFeedback(): Promise<Feedback[]> {
    try {
      const response = await apiClient.get('/api/employee/feedback');
      return z.array(FeedbackSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching employee feedback');
    }
  },

  // Team
  async getMyTeam(): Promise<TeamMember[]> {
    try {
      const response = await apiClient.get('/api/employee/team');
      return z.array(TeamMemberSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching employee team');
    }
  },
};

// ============================================
// SHARED/COMMON SERVICES
// ============================================

export const commonService = {
  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await apiClient.get('/api/notifications');
      return z.array(NotificationSchema).parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching notifications');
    }
  },

  async markNotificationRead(id: number): Promise<SuccessResponse> {
    try {
      const validatedId = z.number().positive().parse(id);
      const response = await apiClient.put(`/api/notifications/${validatedId}/read`);
      return SuccessResponseSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, `Error marking notification ${id} as read`);
    }
  },

  async getCurrentUser(): Promise<CurrentUser> {
    try {
      const response = await apiClient.get('/api/auth/me');
      return CurrentUserSchema.parse(response.data);
    } catch (error) {
      handleServiceError(error, 'Error fetching current user');
    }
  },
};