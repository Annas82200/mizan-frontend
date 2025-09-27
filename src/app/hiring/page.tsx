"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserPlus,
  Briefcase,
  Users,
  Calendar,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Filter,
  Plus,
  ChevronRight,
  Bot
} from "lucide-react";
import { motion } from "framer-motion";
import { useHiring } from "@/hooks/useHiring";
import { useTenant } from "@/hooks/useTenant";
import RequisitionForm from "@/components/hiring/requisition-form";
import CandidatePipeline from "@/components/hiring/candidate-pipeline";
import InterviewScheduler from "@/components/hiring/interview-scheduler";
import JobPostingManager from "@/components/hiring/job-posting-manager";

function HiringDashboard() {
  const { tenant } = useTenant();
  const { 
    requisitions, 
    candidates, 
    interviews,
    metrics,
    isLoading 
  } = useHiring();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [showRequisitionForm, setShowRequisitionForm] = useState(false);

  const isEnterprise = tenant?.plan === "enterprise";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hiring Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your recruitment pipeline from requisition to onboarding
              </p>
            </div>
            <Button onClick={() => setShowRequisitionForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Requisition
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Open Positions"
            value={metrics?.openPositions || 0}
            icon={Briefcase}
            trend="+2 this week"
            color="blue"
          />
          <MetricCard
            title="Active Candidates"
            value={metrics?.activeCandidates || 0}
            icon={Users}
            trend="+15%"
            color="green"
          />
          <MetricCard
            title="Scheduled Interviews"
            value={metrics?.scheduledInterviews || 0}
            icon={Calendar}
            trend="8 this week"
            color="purple"
          />
          <MetricCard
            title="Avg. Time to Hire"
            value={`${metrics?.averageTimeToHire || 0} days`}
            icon={Clock}
            trend="-3 days"
            color="orange"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue={activeTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requisitions">Requisitions</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="postings">Job Postings</TabsTrigger>
            {isEnterprise && <TabsTrigger value="bot">Hiring Bot</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Active Requisitions */}
            <Card>
              <CardHeader>
                <CardTitle>Active Requisitions</CardTitle>
                <CardDescription>
                  Open positions awaiting candidates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requisitions?.slice(0, 5).map((req) => (
                    <RequisitionRow key={req.id} requisition={req} />
                  ))}
                </div>
                {requisitions?.length > 5 && (
                  <Button variant="ghost" className="mt-4">
                    View all requisitions
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Recent Candidates */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Candidates</CardTitle>
                <CardDescription>
                  Latest applications received
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidates?.slice(0, 5).map((candidate) => (
                    <CandidateRow key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requisitions">
            <RequisitionsView requisitions={requisitions} />
          </TabsContent>

          <TabsContent value="candidates">
            <CandidatePipeline candidates={candidates} />
          </TabsContent>

          <TabsContent value="interviews">
            <InterviewScheduler 
              candidate={{
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                position: "Software Engineer"
              }}
              onSchedule={(data) => console.log("Interview scheduled:", data)}
              onCancel={() => console.log("Interview cancelled")}
            />
          </TabsContent>

          <TabsContent value="postings">
            <JobPostingManager 
              postings={[]}
              onCreateNew={() => console.log("Create new posting")}
              onEdit={(posting) => console.log("Edit posting:", posting)}
              onStatusChange={(id, status) => console.log("Status change:", id, status)}
              onViewApplicants={(posting) => console.log("View applicants:", posting)}
            />
          </TabsContent>

          {isEnterprise && (
            <TabsContent value="bot">
              <HiringBotInterface />
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Requisition Form Modal */}
      {showRequisitionForm && (
        <RequisitionForm 
          onSubmit={(data) => {
            console.log("Requisition submitted:", data);
            setShowRequisitionForm(false);
          }}
          onCancel={() => setShowRequisitionForm(false)}
        />
      )}
    </div>
  );
}

// Helper Components
function MetricCard({ title, value, icon: Icon, trend, color }: any) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600"
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-sm text-gray-600">{trend}</span>
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </CardContent>
    </Card>
  );
}

function RequisitionRow({ requisition }: any) {
  const priorityColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    critical: "destructive",
    high: "default",
    medium: "secondary",
    low: "outline"
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div>
        <h4 className="font-medium">{requisition.role}</h4>
        <p className="text-sm text-gray-600">{requisition.department}</p>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={priorityColors[requisition.priority as keyof typeof priorityColors]}>
          {requisition.priority}
        </Badge>
        <span className="text-sm text-gray-600">
          {requisition.candidatesCount || 0} candidates
        </span>
        <Button size="sm" variant="outline">
          View
        </Button>
      </div>
    </div>
  );
}

function CandidateRow({ candidate }: any) {
  const stageColors = {
    screening: "bg-gray-100",
    culture_fit: "bg-blue-100",
    interview: "bg-purple-100",
    offer: "bg-green-100"
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {candidate.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-medium">{candidate.name}</h4>
          <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className={stageColors[candidate.stage as keyof typeof stageColors]}>
          {candidate.stage.replace("_", " ")}
        </Badge>
        <span className="text-sm text-gray-600">
          Applied {new Date(candidate.createdAt).toLocaleDateString()}
        </span>
        <Button size="sm" variant="outline">
          Review
        </Button>
      </div>
    </div>
  );
}

function RequisitionsView({ requisitions }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">All Requisitions</h3>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="grid gap-4">
        {requisitions?.map((req: any) => (
          <Card key={req.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">{req.role}</h4>
                  <p className="text-sm text-gray-600">{req.department}</p>
                  <p className="text-sm">{req.justification}</p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline">
                      {req.status}
                    </Badge>
                    <Badge variant={req.priority === "critical" ? "destructive" : "secondary"}>
                      {req.priority} priority
                    </Badge>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-sm text-gray-600">
                    Target start: {new Date(req.targetStartDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm">
                      Create Posting
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HiringBotInterface() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-purple-600" />
          <div>
            <CardTitle>Hiring Assistant Bot</CardTitle>
            <CardDescription>
              AI-powered assistance for scheduling, screening, and candidate engagement
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Bot Status */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Active Conversations</span>
                <Badge className="bg-green-100 text-green-800">Live</Badge>
              </div>
              <p className="text-2xl font-bold">12</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Interviews Scheduled</span>
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold">8</p>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Assessments Sent</span>
                <Send className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-2xl font-bold">24</p>
            </Card>
          </div>

          {/* Bot Configuration */}
          <div>
            <h4 className="font-medium mb-3">Bot Configuration</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Auto-scheduling</p>
                  <p className="text-sm text-gray-600">
                    Bot handles interview scheduling with candidates
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Culture fit screening</p>
                  <p className="text-sm text-gray-600">
                    Interactive assessments with candidates
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Interview prep assistance</p>
                  <p className="text-sm text-gray-600">
                    Provide candidates with preparation materials
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </div>

          <Button className="w-full">
            Configure Bot Settings
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default HiringDashboard;
