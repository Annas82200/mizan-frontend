import { apiClient } from "./client";

export interface DashboardData {
  currentHealth: number;
  healthChange: number;
  healthStatus: string;
  healthTrend: Array<{ date: string; score: number }>;
  topAreas: Array<{ name: string; score: number }>;
  cylinderScores: Array<{
    cylinder: string;
    score: number;
    benchmark: number;
  }>;
  focusAreas: Array<{
    id: number;
    name: string;
    issue: string;
    priority: "critical" | "high" | "medium" | "low";
  }>;
  lastAnalyses: Record<string, string>;
  scores: Record<string, number>;
  actionModules: any[];
  engagementData: any;
  automatedFlows: any[];
  automatedFlowStatus?: {
    enabled: boolean;
  };
}

export async function getDashboardData(timeRange: string = "30d"): Promise<DashboardData> {
  return apiClient.get(`/dashboard?timeRange=${timeRange}`);
}

export async function refreshDashboard(): Promise<void> {
  return apiClient.post("/dashboard/refresh");
}
