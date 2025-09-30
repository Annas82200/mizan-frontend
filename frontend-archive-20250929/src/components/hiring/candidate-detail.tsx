import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: "applied" | "screening" | "interview" | "offer" | "hired" | "rejected";
  cultureFitScore?: number;
  appliedAt: string;
  resume?: string;
  notes?: string;
}

interface CandidateDetailProps {
  candidate: Candidate;
  onStatusChange: (candidateId: string, status: Candidate["status"]) => void;
  onScheduleInterview: (candidate: Candidate) => void;
  onClose: () => void;
}

export default function CandidateDetail({ 
  candidate, 
  onStatusChange, 
  onScheduleInterview, 
  onClose 
}: CandidateDetailProps) {
  const getStatusColor = (status: Candidate["status"]) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "screening": return "bg-yellow-100 text-yellow-800";
      case "interview": return "bg-purple-100 text-purple-800";
      case "offer": return "bg-green-100 text-green-800";
      case "hired": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
            <p className="text-sm text-gray-600">{candidate.position}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{candidate.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Applied Date</label>
              <p className="text-gray-900">{new Date(candidate.appliedAt).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <Badge className={getStatusColor(candidate.status)}>
                {candidate.status}
              </Badge>
            </div>
            {candidate.cultureFitScore && (
              <div>
                <label className="text-sm font-medium text-gray-500">Culture Fit Score</label>
                <p className="text-gray-900">{candidate.cultureFitScore}%</p>
              </div>
            )}
          </div>

          {/* Status Actions */}
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-2">Update Status</label>
            <div className="flex flex-wrap gap-2">
              {["screening", "interview", "offer", "hired", "rejected"].map((status) => (
                <Button
                  key={status}
                  variant={candidate.status === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => onStatusChange(candidate.id, status as Candidate["status"])}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Interview Scheduling */}
          {candidate.status === "screening" && (
            <div>
              <Button 
                onClick={() => onScheduleInterview(candidate)}
                className="w-full"
              >
                Schedule Interview
              </Button>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-2">Notes</label>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[100px]">
              <p className="text-gray-700 text-sm">
                {candidate.notes || "No notes available."}
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Download Resume
          </Button>
        </div>
      </div>
    </div>
  );
}
