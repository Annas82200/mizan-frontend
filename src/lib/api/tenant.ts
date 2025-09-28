import { apiClient } from "./client";

export interface TenantInfo {
  id: string;
  name: string;
  plan: "free" | "pro" | "proplus" | "enterprise";
  status: string;
  employeeCount?: number;
  purchasedModules: string[];
  features: Record<string, boolean>;
  automatedFlowEnabled: boolean;
  multiTenantAccess?: boolean;
}

export async function getTenantInfo(): Promise<TenantInfo> {
  return apiClient.get("/tenant");
}

export async function updateTenantInfo(updates: Partial<TenantInfo>): Promise<TenantInfo> {
  return apiClient.patch("/tenant", updates);
}

export async function purchaseModule(moduleType: string): Promise<{
  success: boolean;
  checkoutUrl?: string;
}> {
  return apiClient.post(`/tenant/purchase-module`, { moduleType });
}

export async function upgradePlan(plan: string): Promise<{
  success: boolean;
  checkoutUrl?: string;
}> {
  return apiClient.post(`/tenant/upgrade`, { plan });
}

export async function getUsageStats(): Promise<{
  analyses: Record<string, number>;
  modules: Record<string, number>;
  users: {
    total: number;
    active: number;
    byRole: Record<string, number>;
  };
  storage: {
    used: number;
    limit: number;
  };
}> {
  return apiClient.get("/tenant/usage");
}
