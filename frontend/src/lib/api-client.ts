/**
 * API Client for Mizan Platform
 * ✅ PRODUCTION-READY: Phase 1 Security - httpOnly cookies for authentication
 * Strict TypeScript types, comprehensive error handling
 * Full compliance with AGENT_CONTEXT_ULTIMATE.md
 */

// ✅ PRODUCTION: Default to Railway backend if NEXT_PUBLIC_API_URL not set
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://mizan-backend-production.up.railway.app";

export interface ApiError {
  error: string;
  details?: any;
  code?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Main API Client class for all backend communication
 * ✅ PRODUCTION: Uses httpOnly cookies for authentication (Phase 1 Security)
 * Implements comprehensive error handling and type safety
 */
export class ApiClient {
  /**
   * Set authentication token (NO-OP for httpOnly cookie authentication)
   * @deprecated Token is now in httpOnly cookie, managed by browser
   */
  setToken(_token: string | null) {
    // No-op: Token is in httpOnly cookie, managed by browser
  }

  /**
   * Generic request handler with full error handling and automatic token refresh
   * ✅ PRODUCTION: Uses credentials: 'include' to send httpOnly cookies (Phase 1 Security)
   * @param endpoint - API endpoint path
   * @param options - Fetch options
   * @returns Typed response data
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // ✅ PRODUCTION: Add Authorization header if token exists (hybrid auth until custom domain)
    // Backend supports both httpOnly cookie AND Authorization header
    const token = typeof window !== 'undefined' ? localStorage.getItem('mizan_auth_token') : null;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Merge existing headers
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, options.headers);
      }
    }

    try {
      // ✅ PRODUCTION: Include credentials to send httpOnly cookie (Phase 1 Security)
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',  // CRITICAL: Send httpOnly cookie automatically
      });

      // Handle 401 errors with automatic token refresh
      if (response.status === 401) {
        console.log('Authentication expired, attempting refresh...');

        // Import auth service dynamically to avoid circular dependency
        const { default: authService } = await import('../services/auth.service');
        const refreshSuccess = await authService.refreshToken();

        if (refreshSuccess) {
          // Retry the request (cookie automatically refreshed)
          const retryResponse = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',  // Send refreshed httpOnly cookie
          });

          if (retryResponse.ok) {
            const data = await retryResponse.json();
            return data;
          }
        }

        // If refresh failed, clear user data and redirect to login
        localStorage.removeItem('mizan_user');
        window.location.href = '/login';
        throw new Error('Authentication expired. Please log in again.');
      }

      // Handle non-OK responses
      if (!response.ok) {
        let errorData: ApiError;
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            error: `HTTP ${response.status}: ${response.statusText}`,
            code: response.status.toString()
          };
        }

        throw new Error(errorData.error || `Request failed: ${response.statusText}`);
      }

      // Parse and return successful response
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Request Error [${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * HTTP method helpers for axios-like interface
   */
  async get<T = any>(endpoint: string, options?: { params?: Record<string, any>; headers?: Record<string, string> }): Promise<{ data: T }> {
    const params = options?.params ? '?' + new URLSearchParams(options.params).toString() : '';
    const result = await this.request<T>(`${endpoint}${params}`, {
      method: 'GET',
      headers: options?.headers
    });
    return { data: result };
  }

  async post<T = any>(endpoint: string, data?: any, options?: { headers?: Record<string, string> }): Promise<{ data: T }> {
    const result = await this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: options?.headers
    });
    return { data: result };
  }

  async put<T = any>(endpoint: string, data?: any, options?: { headers?: Record<string, string> }): Promise<{ data: T }> {
    const result = await this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers: options?.headers
    });
    return { data: result };
  }

  async delete<T = any>(endpoint: string, options?: { headers?: Record<string, string> }): Promise<{ data: T }> {
    const result = await this.request<T>(endpoint, {
      method: 'DELETE',
      headers: options?.headers
    });
    return { data: result };
  }

  async patch<T = any>(endpoint: string, data?: any, options?: { headers?: Record<string, string> }): Promise<{ data: T }> {
    const result = await this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      headers: options?.headers
    });
    return { data: result };
  }

  // Authentication endpoints
  auth = {
    login: (email: string, password: string) =>
      this.request<{ user: any; token: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    register: (data: {
      email: string;
      password: string;
      name: string;
      company: string;
      role?: string;
    }) =>
      this.request<{ user: any; token: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    me: () =>
      this.request<{ user: any }>("/api/auth/me"),

    changePassword: (oldPassword: string, newPassword: string) =>
      this.request<{ success: boolean; message: string }>("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ oldPassword, newPassword }),
      }),

    resetPassword: (email: string) =>
      this.request<{ success: boolean; message: string }>("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),

    logout: () =>
      this.request<{ success: boolean }>("/api/auth/logout", {
        method: "POST",
      }),
  };

  // Structure Analysis endpoints
  structure = {
    analyze: (data: any) =>
      this.request("/api/structure/analyze", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getAnalysis: (analysisId: string) =>
      this.request(`/api/structure/analysis/${analysisId}`),

    getRecommendations: (analysisId: string) =>
      this.request(`/api/structure/analysis/${analysisId}/recommendations`),

    export: (analysisId: string, format: 'pdf' | 'html' | 'csv' = 'pdf') =>
      this.request(`/api/structure/analysis/${analysisId}/export?format=${format}`),
  };

  // Culture Analysis endpoints
  culture = {
    createSurvey: (data: {
      tenantId: string;
      employeeEmails: string[];
      deadline?: string;
    }) =>
      this.request("/api/culture/survey/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    validateToken: (token: string) =>
      this.request<{ valid: boolean; survey: any }>("/api/culture/survey/validate-token", {
        method: "POST",
        body: JSON.stringify({ token }),
      }),

    submitSurvey: (data: {
      token: string;
      personalValues: string[];
      currentExperience: string[];
      desiredExperience: string[];
      engagement: number;
      recognition: number;
    }) =>
      this.request("/api/culture/survey/submit", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getAnalysis: (analysisId: string) =>
      this.request(`/api/culture/analysis/${analysisId}`),

    getCylinderScores: (analysisId: string) =>
      this.request(`/api/culture/analysis/${analysisId}/cylinders`),

    getAgentAnalysis: (analysisId: string, agentType: 'recognition' | 'engagement') =>
      this.request(`/api/culture/analysis/${analysisId}/agents/${agentType}`),
  };

  // Skills Analysis endpoints - Phase 3.1 Complete API Client
  skills = {
    // Dashboard & Stats
    getDashboardStats: () =>
      this.request("/api/skills/dashboard/stats"),

    // Workflow Management
    startWorkflow: (data: {
      strategy: string;
      industry: string;
      organizationName: string;
    }) =>
      this.request("/api/skills/workflow/start", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getWorkflowSessions: () =>
      this.request("/api/skills/workflow/sessions"),

    // Framework Management
    createFramework: (data: {
      industry: string;
      strategy: string;
      organizationName: string;
    }) =>
      this.request("/api/skills/framework", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getFrameworks: () =>
      this.request("/api/skills/frameworks"),

    // Resume Upload
    uploadResume: async (file: File, employeeId: string) => {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("employeeId", employeeId);

      const response = await fetch(`${API_BASE}/api/skills/resume/upload`, {
        method: "POST",
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Resume upload failed");
      }

      return response.json();
    },

    // CSV Import
    importCSV: async (file: File) => {
      const formData = new FormData();
      formData.append("csv", file);

      const response = await fetch(`${API_BASE}/api/skills/csv/import`, {
        method: "POST",
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "CSV import failed");
      }

      return response.json();
    },

    // Employee Skills Management
    getEmployeeSkills: (employeeId: string) =>
      this.request(`/api/skills/employee/${employeeId}`),

    updateEmployeeSkills: (employeeId: string, skills: Array<{
      name: string;
      category: string;
      level: string;
      yearsOfExperience?: number;
    }>) =>
      this.request(`/api/skills/employee/${employeeId}`, {
        method: "POST",
        body: JSON.stringify({ skills }),
      }),

    deleteEmployeeSkill: (employeeId: string, skillName: string) =>
      this.request(`/api/skills/employee/${employeeId}/skill/${skillName}`, {
        method: "DELETE",
      }),

    // Gap Analysis (Fixed endpoint paths)
    getEmployeeGapAnalysis: (employeeId: string) =>
      this.request(`/api/skills/employee/${employeeId}/gap`),

    getAllGaps: () =>
      this.request("/api/skills/gaps"),

    // Department & Organization Analysis
    getDepartmentAnalysis: (departmentId: string) =>
      this.request(`/api/skills/department/${departmentId}/analysis`),

    getOrganizationAnalysis: () =>
      this.request("/api/skills/organization/analysis"),

    // Assessments
    getAssessments: () =>
      this.request("/api/skills/assessments"),

    // Skills Bot
    queryBot: (query: string, context?: Record<string, unknown>) =>
      this.request("/api/skills/bot/query", {
        method: "POST",
        body: JSON.stringify({ query, context }),
      }),

    // Notifications
    sendNotification: (data: {
      notificationType: string;
      recipients: Array<{ email: string; name: string }>;
      data: Record<string, unknown>;
    }) =>
      this.request("/api/skills/notify", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  };

  // Performance Module endpoints
  performance = {
    createGoal: (data: {
      employeeId: string;
      title: string;
      description: string;
      targetDate: string;
      weight: number;
      type: 'individual' | 'team' | 'organizational';
    }) =>
      this.request("/api/performance/goals/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    approveGoal: (goalId: string, approverLevel: 'supervisor' | 'leader') =>
      this.request(`/api/performance/goals/${goalId}/approve`, {
        method: "POST",
        body: JSON.stringify({ approverLevel }),
      }),

    scheduleOneOnOne: (data: {
      supervisorId: string;
      employeeId: string;
      scheduledDate: string;
      agenda?: string;
    }) =>
      this.request("/api/performance/meetings/schedule", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    submitEvaluation: (data: {
      employeeId: string;
      evaluatorId: string;
      ratings: Record<string, number>;
      feedback: string;
      cycleId: string;
    }) =>
      this.request("/api/performance/evaluations/submit", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    calibrate: (departmentId: string, cycleId: string) =>
      this.request("/api/performance/calibration/run", {
        method: "POST",
        body: JSON.stringify({ departmentId, cycleId }),
      }),
  };

  // Hiring Module endpoints
  hiring = {
    createRequisition: (data: {
      title: string;
      department: string;
      requirements: string[];
      targetCompensation: number;
      urgency: 'low' | 'medium' | 'high';
    }) =>
      this.request("/api/hiring/requisitions/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    postJob: (requisitionId: string, platforms: string[]) =>
      this.request(`/api/hiring/jobs/post`, {
        method: "POST",
        body: JSON.stringify({ requisitionId, platforms }),
      }),

    reviewApplication: (applicationId: string, decision: 'accept' | 'reject' | 'hold') =>
      this.request(`/api/hiring/applications/${applicationId}/review`, {
        method: "POST",
        body: JSON.stringify({ decision }),
      }),

    scheduleInterview: (data: {
      applicationId: string;
      interviewerIds: string[];
      scheduledDate: string;
      type: 'phone' | 'video' | 'onsite';
    }) =>
      this.request("/api/hiring/interviews/schedule", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    analyzeCompensation: (positionId: string, market: string) =>
      this.request(`/api/hiring/compensation/analyze`, {
        method: "POST",
        body: JSON.stringify({ positionId, market }),
      }),
  };

  // Admin endpoints
  admin = {
    getTenants: () =>
      this.request<{ tenants: any[] }>("/api/admin/tenants"),

    getTenantDetails: (tenantId: string) =>
      this.request(`/api/admin/tenants/${tenantId}`),

    getOverview: (tenantId: string) =>
      this.request(`/api/admin/${tenantId}/overview`),

    runAnalyses: (tenantId: string, data: {
      analysisTypes: string[];
      employeeIds?: string[];
    }) =>
      this.request(`/api/admin/${tenantId}/run-analyses`, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    inviteEmployee: (data: {
      email: string;
      name: string;
      title?: string;
      department?: string;
      tenantId: string;
    }) =>
      this.request("/api/admin/invite-employee", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    getAnalytics: (tenantId: string, timeRange: '7d' | '30d' | '90d' | '1y') =>
      this.request(`/api/admin/${tenantId}/analytics?timeRange=${timeRange}`),
  };

  // Superadmin endpoints
  superadmin = {
    getOverview: () =>
      this.request("/api/superadmin/overview"),

    getAllTenants: () =>
      this.request<{ tenants: any[] }>("/api/superadmin/tenants"),

    getTenant: (tenantId: string) =>
      this.request(`/api/superadmin/tenants/${tenantId}`),

    updateTenantSettings: (tenantId: string, settings: any) =>
      this.request(`/api/superadmin/tenants/${tenantId}/settings`, {
        method: "PATCH",
        body: JSON.stringify(settings),
      }),

    updateToggles: (tenantId: string, toggles: Record<string, boolean>) =>
      this.request(`/api/superadmin/tenants/${tenantId}/toggles`, {
        method: "PATCH",
        body: JSON.stringify(toggles),
      }),

    getSystemHealth: () =>
      this.request("/api/superadmin/system/health"),

    getAuditLogs: (filters?: {
      tenantId?: string;
      userId?: string;
      action?: string;
      startDate?: string;
      endDate?: string;
    }) => {
      const params = new URLSearchParams(filters as any).toString();
      return this.request(`/api/superadmin/audit-logs${params ? `?${params}` : ''}`);
    },
  };

  // Billing endpoints
  billing = {
    getPlans: () =>
      this.request<{ plans: any[] }>("/api/billing/plans"),

    getSubscription: () =>
      this.request("/api/billing/subscription"),

    createCheckout: (data: {
      plan: "growth" | "enterprise";
      billing: "monthly" | "yearly";
      successUrl: string;
      cancelUrl: string;
    }) =>
      this.request<{ url: string }>("/api/billing/checkout", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    createPortalSession: (returnUrl: string) =>
      this.request<{ url: string }>("/api/billing/portal", {
        method: "POST",
        body: JSON.stringify({ returnUrl }),
      }),

    cancelSubscription: () =>
      this.request("/api/billing/cancel", {
        method: "POST",
      }),

    reactivateSubscription: () =>
      this.request("/api/billing/reactivate", {
        method: "POST",
      }),

    getInvoices: () =>
      this.request<{ invoices: any[] }>("/api/billing/invoices"),

    getPaymentMethods: () =>
      this.request<{ paymentMethods: any[] }>("/api/billing/payment-methods"),
  };

  // LXP Module endpoints (triggered)
  lxp = {
    getLearningPaths: (employeeId: string) =>
      this.request(`/api/lxp/learning-paths/${employeeId}`),

    updateProgress: (pathId: string, progress: {
      completedModules: string[];
      score: number;
      timeSpent: number;
    }) =>
      this.request(`/api/lxp/learning-paths/${pathId}/progress`, {
        method: "POST",
        body: JSON.stringify(progress),
      }),

    getRecommendations: (employeeId: string) =>
      this.request(`/api/lxp/recommendations/${employeeId}`),
  };

  // Talent Module endpoints (triggered)
  talent = {
    getNineBox: (tenantId: string) =>
      this.request(`/api/talent/nine-box/${tenantId}`),

    getSuccessionPlans: (tenantId: string) =>
      this.request(`/api/talent/succession-plans/${tenantId}`),

    createDevelopmentPlan: (data: {
      employeeId: string;
      planType: 'talent' | 'performance' | 'career';
      objectives: string[];
      timeline: string;
    }) =>
      this.request("/api/talent/development-plans/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  };

  // Bonus Module endpoints (triggered)
  bonus = {
    calculateBonus: (data: {
      employeeId: string;
      performanceScore: number;
      skillsDevelopment: number;
      tenureMultiplier: number;
    }) =>
      this.request("/api/bonus/calculate", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    distributeBonus: (cycleId: string) =>
      this.request(`/api/bonus/distribute/${cycleId}`, {
        method: "POST",
      }),

    getAnalytics: (tenantId: string) =>
      this.request(`/api/bonus/analytics/${tenantId}`),
  };
}

// Create singleton instance
const apiClient = new ApiClient();
export default apiClient;