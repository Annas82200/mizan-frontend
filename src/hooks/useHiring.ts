import { useState, useEffect } from "react";

interface HiringRequisition {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  status: "draft" | "open" | "paused" | "closed" | "filled";
  createdAt: string;
  createdBy: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";
  cultureFitScore?: number;
  appliedAt: string;
}

export function useHiring() {
  const [requisitions, setRequisitions] = useState<HiringRequisition[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHiringData = async () => {
      setIsLoading(true);
      try {
        // Mock data for now
        const mockRequisitions: HiringRequisition[] = [
          {
            id: "1",
            title: "Senior Software Engineer",
            department: "Engineering",
            description: "We're looking for a senior software engineer to join our team.",
            requirements: ["5+ years experience", "React/TypeScript", "Node.js"],
            status: "open",
            createdAt: new Date().toISOString(),
            createdBy: "admin"
          },
          {
            id: "2",
            title: "Product Manager",
            department: "Product",
            description: "Seeking an experienced product manager to drive our product strategy.",
            requirements: ["3+ years PM experience", "Technical background", "Leadership skills"],
            status: "open",
            createdAt: new Date().toISOString(),
            createdBy: "admin"
          }
        ];

        const mockCandidates: Candidate[] = [
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            position: "Senior Software Engineer",
            status: "interview",
            cultureFitScore: 85,
            appliedAt: new Date().toISOString()
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            position: "Product Manager",
            status: "screening",
            cultureFitScore: 92,
            appliedAt: new Date().toISOString()
          }
        ];

        setRequisitions(mockRequisitions);
        setCandidates(mockCandidates);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch hiring data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHiringData();
  }, []);

  const createRequisition = async (data: Omit<HiringRequisition, "id" | "createdAt" | "createdBy">) => {
    setIsLoading(true);
    try {
      // Mock API call
      const response = await fetch('/api/hiring/requisitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create requisition');
      }

      const result = await response.json();
      setRequisitions(prev => [...prev, result]);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create requisition");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequisitionStatus = async (id: string, status: HiringRequisition["status"]) => {
    try {
      // Mock API call
      const response = await fetch(`/api/hiring/requisitions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update requisition');
      }

      setRequisitions(prev => 
        prev.map(req => req.id === id ? { ...req, status } : req)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update requisition");
      throw err;
    }
  };

  const updateCandidateStatus = async (id: string, status: Candidate["status"]) => {
    try {
      // Mock API call
      const response = await fetch(`/api/hiring/candidates/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update candidate');
      }

      setCandidates(prev => 
        prev.map(candidate => candidate.id === id ? { ...candidate, status } : candidate)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update candidate");
      throw err;
    }
  };

  return {
    requisitions,
    candidates,
    interviews: [], // Mock empty array for now
    metrics: {
      totalRequisitions: requisitions.length,
      activeRequisitions: requisitions.filter(r => r.status === 'open').length,
      totalCandidates: candidates.length,
      averageTimeToHire: 15, // days
      openPositions: requisitions.filter(r => r.status === 'open').length,
      candidatesInPipeline: candidates.filter(c => ['screening', 'interview', 'offer'].includes(c.status)).length,
      hiredThisMonth: candidates.filter(c => c.status === 'hired').length,
      activeCandidates: candidates.filter(c => c.status !== 'rejected' && c.status !== 'hired').length,
      scheduledInterviews: candidates.filter(c => c.status === 'interview').length
    },
    createRequisition,
    updateRequisitionStatus,
    updateCandidateStatus,
    isLoading,
    error
  };
}
