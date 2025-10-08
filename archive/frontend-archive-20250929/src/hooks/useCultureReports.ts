import { useState, useEffect } from "react";

interface CultureReport {
  id: string;
  title: string;
  type: "overview" | "trends" | "detailed";
  createdAt: string;
  data: any;
  department?: string;
  report?: any;
}

interface CultureMetrics {
  overallScore: number;
  trend: "improving" | "stable" | "declining";
  cylinders: Array<{
    id: number;
    name: string;
    score: number;
    change: number;
  }>;
  recommendations: string[];
}

export function useCultureReports() {
  const [reports, setReports] = useState<CultureReport[]>([]);
  const [metrics, setMetrics] = useState<CultureMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        // Mock data for now
        const mockReports: CultureReport[] = [
          {
            id: "1",
            title: "Q4 2024 Culture Overview",
            type: "overview",
            createdAt: new Date().toISOString(),
            data: {}
          },
          {
            id: "2", 
            title: "Culture Trends Analysis",
            type: "trends",
            createdAt: new Date().toISOString(),
            data: {}
          }
        ];

        const mockMetrics: CultureMetrics = {
          overallScore: 78,
          trend: "improving",
          cylinders: [
            { id: 1, name: "Stability", score: 82, change: 5 },
            { id: 2, name: "Belonging", score: 75, change: -2 },
            { id: 3, name: "Mastery", score: 80, change: 3 },
            { id: 4, name: "Autonomy", score: 77, change: 1 },
            { id: 5, name: "Purpose", score: 85, change: 7 },
            { id: 6, name: "Evolution", score: 72, change: -1 },
            { id: 7, name: "Legacy", score: 79, change: 4 }
          ],
          recommendations: [
            "Focus on improving belonging initiatives",
            "Strengthen evolution mindset through training",
            "Maintain strong purpose alignment"
          ]
        };

        setReports(mockReports);
        setMetrics(mockMetrics);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch culture reports");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const generateReport = async (type: "overview" | "trends" | "detailed") => {
    setIsLoading(true);
    try {
      // Mock API call
      const response = await fetch(`/api/culture/reports/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate report");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const requestEmployeeAccess = async (employeeId: string) => {
    try {
      // Mock API call
      console.log(`Requesting access for employee: ${employeeId}`);
      return { success: true };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request access");
      throw err;
    }
  };

  return {
    reports,
    metrics,
    generateReport,
    requestEmployeeAccess,
    isLoading,
    error,
    organizationReport: reports.find(r => r.type === "overview") || null,
    departmentReports: reports.filter(r => r.type === "detailed"),
    employeeReports: reports.filter(r => r.type === "trends"),
    accessPermissions: {
      canViewAll: true,
      canExport: true,
      canGenerateReports: true,
      employeeReports: true
    }
  };
}
