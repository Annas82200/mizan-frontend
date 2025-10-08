const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export interface ApiError {
  error: string;
  details?: any;
}

export class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add existing headers
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

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  }

  // Auth endpoints
  auth = {
    login: (email: string, password: string) =>
      this.request<{ user: any; token: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    register: (data: any) =>
      this.request<{ user: any; token: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    me: () => this.request<{ user: any }>("/api/auth/me"),

    changePassword: (oldPassword: string, newPassword: string) =>
      this.request("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ oldPassword, newPassword }),
      }),

    resetPassword: (email: string) =>
      this.request("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
  };

  // Analysis endpoints
  analyses = {
    structure: (data: any) =>
      this.request("/api/analyses/structure", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    culture: (data: any) =>
      this.request("/api/analyses/culture", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    runAll: (data: any) =>
      this.request("/api/analyses/run-all", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    results: (data: any) =>
      this.request("/api/analyses/results", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  };

  // Admin endpoints
  admin = {
    getTenants: () =>
      this.request<{ tenants: any[] }>("/api/admin/tenants"),

    getOverview: (tenantId: string) =>
      this.request(`/api/admin/${tenantId}/overview`),

    runAnalyses: (tenantId: string, data: any) =>
      this.request(`/api/admin/${tenantId}/run-analyses`, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    inviteEmployee: (data: { email: string; name: string; title?: string }) =>
      this.request("/api/auth/invite", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  };

  // Employee endpoints
  employee = {
    getTenants: () =>
      this.request<{ tenants: any[] }>("/api/employee/tenants"),

    getEmployees: (tenantId: string) =>
      this.request<{ employees: any[] }>(`/api/employee/${tenantId}/employees`),

    getDashboard: (tenantId: string, employeeId: string) =>
      this.request(`/api/employee/${tenantId}/employees/${employeeId}/dashboard`),

    getLxp: (tenantId: string, employeeId: string) =>
      this.request(`/api/employee/${tenantId}/employees/${employeeId}/lxp`),
  };

  // Super admin endpoints
  superadmin = {
    getOverview: () =>
      this.request("/api/superadmin/overview"),

    getTenant: (tenantId: string) =>
      this.request(`/api/superadmin/tenants/${tenantId}`),

    updateToggles: (tenantId: string, toggles: any) =>
      this.request(`/api/superadmin/tenants/${tenantId}/toggles`, {
        method: "PATCH",
        body: JSON.stringify(toggles),
      }),

    getTrainingCenter: () =>
      this.request("/api/superadmin/ai/training-center"),
  };

  // Billing endpoints
  billing = {
    getPlans: () =>
      this.request<{ plans: any }>("/api/billing/plans"),

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

    getPayments: () =>
      this.request<{ payments: any[] }>("/api/billing/payments"),
  };

  // HRIS endpoints
  hris = {
    getProviders: () =>
      this.request<{ providers: any[] }>("/api/hris/providers"),

    getConnections: () =>
      this.request<{ connections: any[] }>("/api/hris/connections"),

    connect: (data: {
      provider: string;
      credentials: any;
    }) =>
      this.request("/api/hris/connect", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    disconnect: (provider: string) =>
      this.request(`/api/hris/disconnect/${provider}`, {
        method: "DELETE",
      }),

    sync: (provider: string, syncType?: string) =>
      this.request(`/api/hris/sync/${provider}`, {
        method: "POST",
        body: JSON.stringify({ syncType }),
      }),
  };

  // Upload endpoints
  upload = {
    analyzeFile: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE}/api/upload/analyze`, {
        method: "POST",
        headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      return response.json();
    },

    analyzeText: (orgText: string) =>
      this.request("/api/upload/analyze", {
        method: "POST",
        body: JSON.stringify({ orgText }),
      }),

    save: async (file?: File, orgText?: string) => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE}/api/upload/save`, {
          method: "POST",
          headers: { Authorization: `Bearer ${this.token}` },
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Save failed");
        }

        return response.json();
      } else {
        return this.request("/api/upload/save", {
          method: "POST",
          body: JSON.stringify({ orgText }),
        });
      }
    },

    getStructures: () =>
      this.request<{ structures: any[] }>("/api/upload/structures"),

    downloadTemplate: (format: "csv" | "text" = "csv") => {
      window.open(`${API_BASE}/api/upload/template?format=${format}`);
    },
  };
}

// Create singleton instance
export const apiClient = new ApiClient();

// Hook to use in components
import { useEffect } from "react";
import { useAuth } from "../contexts/auth";
import { getAuthToken } from "./auth";

export function useApiClient() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const token = getAuthToken();
    apiClient.setToken(token);
  }, [isAuthenticated]);

  return apiClient;
}
