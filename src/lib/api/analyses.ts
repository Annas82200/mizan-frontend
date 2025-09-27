import { apiClient } from "./client";
import {
  StructureResult,
  CultureResult,
  SkillsResult,
  EngagementResult,
  RecognitionResult,
  PerformanceResult,
  BenchmarkingResult
} from "@/types/agents";

export interface RunAnalysisParams {
  type: "structure" | "culture" | "skills" | "engagement" | "recognition" | "performance" | "benchmarking";
  data?: any;
}

export async function runAnalysis(params: RunAnalysisParams): Promise<any> {
  return apiClient.post(`/analyses/${params.type}`, params.data);
}

export async function getAnalysisHistory(
  type?: string,
  limit: number = 10
): Promise<Array<{
  id: string;
  type: string;
  score: number;
  createdAt: string;
  summary: string;
}>> {
  const query = type ? `?type=${type}&limit=${limit}` : `?limit=${limit}`;
  return apiClient.get(`/analyses/history${query}`);
}

export async function getAnalysisDetails(id: string): Promise<any> {
  return apiClient.get(`/analyses/${id}`);
}

// Specific analysis endpoints
export async function runStructureAnalysis(data: {
  orgChart?: string;
  csvData?: any[];
}): Promise<StructureResult> {
  return apiClient.post("/analyses/structure", data);
}

export async function runCultureAnalysis(data: {
  companyValues: string[];
  employeeValues?: string[];
  surveyData?: any;
}): Promise<CultureResult> {
  return apiClient.post("/analyses/culture", data);
}

export async function runSkillsAnalysis(data: {
  employeeProfiles: any[];
  targetSkills?: string[];
}): Promise<SkillsResult> {
  return apiClient.post("/analyses/skills", data);
}

export async function runEngagementAnalysis(data: {
  surveyResponses?: any;
  historicalData?: any[];
}): Promise<EngagementResult> {
  return apiClient.post("/analyses/engagement", data);
}

export async function runRecognitionAnalysis(data: {
  recognitionData?: any;
  surveyData?: any;
}): Promise<RecognitionResult> {
  return apiClient.post("/analyses/recognition", data);
}

export async function runPerformanceAnalysis(data: {
  metrics?: any;
  historicalData?: any[];
}): Promise<PerformanceResult> {
  return apiClient.post("/analyses/performance", data);
}

export async function runBenchmarkingAnalysis(data: {
  industry?: string;
  companySize?: string;
  region?: string;
}): Promise<BenchmarkingResult> {
  return apiClient.post("/analyses/benchmarking", data);
}
