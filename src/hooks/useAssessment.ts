import { useState, useEffect } from "react";

interface Assessment {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
}

interface AssessmentSubmission {
  personal_values: string[];
  current_experience: string[];
  desired_future: string[];
  engagement: number;
  recognition: number;
}

export function useAssessment(assessmentId: string) {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!assessmentId) return;

    const fetchAssessment = async () => {
      setIsLoading(true);
      try {
        // Mock assessment data for now
        const mockAssessment: Assessment = {
          id: assessmentId,
          title: "Culture Assessment",
          description: "Organizational culture evaluation",
          status: "in_progress",
          createdAt: new Date().toISOString()
        };
        
        setAssessment(mockAssessment);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch assessment");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessment();
  }, [assessmentId]);

  const submitAssessment = async (data: AssessmentSubmission) => {
    setIsLoading(true);
    try {
      // Mock API call
      const response = await fetch(`/api/assessments/${assessmentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit assessment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    assessment,
    submitAssessment,
    isLoading,
    error
  };
}
