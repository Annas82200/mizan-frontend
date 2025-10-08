import { apiClient } from "./client";

export interface AutomatedFlow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  triggers: Array<{
    assessment: string;
    condition: string;
    threshold?: number;
  }>;
  actions: Array<{
    type: string;
    target: string;
    delay?: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export async function getAutomatedFlows(): Promise<AutomatedFlow[]> {
  return apiClient.get("/automation/flows");
}

export async function createFlow(flow: Omit<AutomatedFlow, "id" | "createdAt" | "updatedAt">): Promise<AutomatedFlow> {
  return apiClient.post("/automation/flows", flow);
}

export async function updateFlow(
  flowId: string,
  updates: Partial<AutomatedFlow>
): Promise<AutomatedFlow> {
  return apiClient.patch(`/automation/flows/${flowId}`, updates);
}

export async function toggleFlow(flowId: string, enabled: boolean): Promise<AutomatedFlow> {
  return apiClient.patch(`/automation/flows/${flowId}`, { enabled });
}

export async function deleteFlow(flowId: string): Promise<void> {
  return apiClient.delete(`/automation/flows/${flowId}`);
}

export async function getFlowExecutions(flowId: string): Promise<Array<{
  id: string;
  flowId: string;
  startedAt: string;
  completedAt?: string;
  status: string;
  error?: string;
}>> {
  return apiClient.get(`/automation/flows/${flowId}/executions`);
}

export async function runFlowManually(flowId: string): Promise<void> {
  return apiClient.post(`/automation/flows/${flowId}/run`);
}
