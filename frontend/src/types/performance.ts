export interface PerformanceMetricData {
  id: string;
  metric: string;
  value: string;
  category: string;
  trend: string | null;
  benchmarkComparison: string | null;
  timestamp: Date;
}

export interface PerformanceAnalysisInput {
  userId: string;
  entryId: string;
  performanceData: PerformanceMetricData[];
  timeframe: 'last_7_days' | 'last_30_days' | 'last_90_days';
}

export interface PerformanceAnalysisResult {
  overallScore: number;
  keyMetrics: {
    metric: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
    benchmarkComparison: number;
  }[];
  insights: string[];
  recommendations: string[];
  riskFactors: string[];
  strengths: string[];
  improvementAreas: string[];
}