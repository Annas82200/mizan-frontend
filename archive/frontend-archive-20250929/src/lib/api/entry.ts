import { apiClient } from "./client";
import { StructureResult } from "@/types/agents";

export async function analyzeOrgStructure(data: {
  orgText?: string;
  csvData?: any[];
}): Promise<StructureResult> {
  return apiClient.post("/entry/analyze", data, { requireAuth: false });
}

export async function downloadAnalysisReport(analysisId: string): Promise<Blob> {
  const response = await fetch(
    `/api/entry/report/${analysisId}`,
    { method: "GET" }
  );
  
  if (!response.ok) {
    throw new Error("Failed to download report");
  }
  
  return response.blob();
}
