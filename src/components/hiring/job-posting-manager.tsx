import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  status: "draft" | "open" | "paused" | "closed" | "filled";
  createdAt: string;
  applicants: number;
}

interface JobPostingManagerProps {
  postings: JobPosting[];
  onCreateNew: () => void;
  onEdit: (posting: JobPosting) => void;
  onStatusChange: (id: string, status: JobPosting["status"]) => void;
  onViewApplicants: (posting: JobPosting) => void;
}

export default function JobPostingManager({ 
  postings, 
  onCreateNew, 
  onEdit, 
  onStatusChange, 
  onViewApplicants 
}: JobPostingManagerProps) {
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");

  const getStatusColor = (status: JobPosting["status"]) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "open": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-red-100 text-red-800";
      case "filled": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPostings = postings.filter(posting => {
    if (filter === "all") return true;
    if (filter === "open") return posting.status === "open";
    if (filter === "closed") return posting.status === "closed" || posting.status === "filled";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Job Postings</h2>
          <p className="text-gray-600">Manage your open positions and track applications</p>
        </div>
        <Button onClick={onCreateNew}>
          Create New Posting
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          All ({postings.length})
        </Button>
        <Button
          variant={filter === "open" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("open")}
        >
          Open ({postings.filter(p => p.status === "open").length})
        </Button>
        <Button
          variant={filter === "closed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("closed")}
        >
          Closed ({postings.filter(p => p.status === "closed" || p.status === "filled").length})
        </Button>
      </div>

      {/* Postings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPostings.map((posting) => (
          <Card key={posting.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{posting.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{posting.department}</p>
                </div>
                <Badge className={getStatusColor(posting.status)}>
                  {posting.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 line-clamp-3">
                {posting.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Requirements:</div>
                <div className="flex flex-wrap gap-1">
                  {posting.requirements.slice(0, 3).map((req, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {req}
                    </span>
                  ))}
                  {posting.requirements.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{posting.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Created {new Date(posting.createdAt).toLocaleDateString()}</span>
                <span>{posting.applicants} applicants</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(posting)}
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewApplicants(posting)}
                  className="flex-1"
                >
                  View Applicants
                </Button>
              </div>

              {/* Status Actions */}
              <div className="flex gap-1">
                {posting.status === "draft" && (
                  <Button
                    size="sm"
                    onClick={() => onStatusChange(posting.id, "open")}
                    className="flex-1"
                  >
                    Publish
                  </Button>
                )}
                {posting.status === "open" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStatusChange(posting.id, "paused")}
                      className="flex-1"
                    >
                      Pause
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStatusChange(posting.id, "closed")}
                      className="flex-1"
                    >
                      Close
                    </Button>
                  </>
                )}
                {posting.status === "paused" && (
                  <Button
                    size="sm"
                    onClick={() => onStatusChange(posting.id, "open")}
                    className="flex-1"
                  >
                    Resume
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPostings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings found</h3>
          <p className="text-gray-600 mb-4">
            {filter === "all" 
              ? "Get started by creating your first job posting."
              : `No ${filter} job postings at the moment.`
            }
          </p>
          {filter === "all" && (
            <Button onClick={onCreateNew}>
              Create Your First Posting
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
