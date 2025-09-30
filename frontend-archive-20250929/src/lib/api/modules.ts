import { apiClient } from "./client";

export interface ActionModule {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "not_started" | "in_progress" | "completed";
  progress: number;
  impact: "high" | "medium" | "low";
  timeframe: string;
}

export async function getActionModules(): Promise<ActionModule[]> {
  return apiClient.get("/modules");
}

export async function startModule(moduleId: string): Promise<ActionModule> {
  return apiClient.post(`/modules/${moduleId}/start`);
}

export async function updateModuleProgress(
  moduleId: string,
  progress: number
): Promise<ActionModule> {
  return apiClient.patch(`/modules/${moduleId}/progress`, { progress });
}

export async function completeModule(moduleId: string): Promise<ActionModule> {
  return apiClient.post(`/modules/${moduleId}/complete`);
}

export async function getModuleDetails(moduleId: string): Promise<{
  module: ActionModule;
  steps: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    order: number;
  }>;
  resources: Array<{
    id: string;
    title: string;
    type: string;
    url: string;
  }>;
}> {
  return apiClient.get(`/modules/${moduleId}/details`);
}
