"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  Award,
  Target,
  RefreshCw,
  DollarSign,
  Shield,
  ChevronRight,
  Play,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

const moduleIcons = {
  Hiring: UserPlus,
  Onboarding: Users,
  Performance: TrendingUp,
  Talent: Award,
  Succession: RefreshCw,
  Rewards: DollarSign,
  Compensation: DollarSign,
  Leadership: Shield,
  AfterActionReview: Target
};

interface ActionModule {
  id: string;
  category: string;
  title: string;
  description: string;
  status: "not_started" | "in_progress" | "completed";
  progress: number;
  impact: "high" | "medium" | "low";
  timeframe: string;
  nextAction?: string;
  triggerReason?: string;
}

interface ActionModulesProps {
  modules: ActionModule[];
}

export default function ActionModules({ modules }: ActionModulesProps) {
  const [selectedModule, setSelectedModule] = useState<ActionModule | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "recommended">("all");

  const filteredModules = modules.filter(module => {
    if (filter === "all") return true;
    if (filter === "active") return module.status === "in_progress";
    if (filter === "recommended") return module.status === "not_started";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in_progress":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <Tabs defaultValue={filter}>
          <TabsList>
            <TabsTrigger value="all">All Modules</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="text-sm text-gray-600">
          {filteredModules.length} modules
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((module) => {
          const Icon = moduleIcons[module.category as keyof typeof moduleIcons] || Target;
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="cursor-pointer"
                onClick={() => setSelectedModule(module)}
              >
                <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      module.status === "completed" ? "bg-green-100" :
                      module.status === "in_progress" ? "bg-blue-100" : "bg-gray-100"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        module.status === "completed" ? "text-green-600" :
                        module.status === "in_progress" ? "text-blue-600" : "text-gray-600"
                      }`} />
                    </div>
                    <Badge variant={getImpactColor(module.impact)}>
                      {module.impact} impact
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {module.status === "in_progress" && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <Badge className={getStatusColor(module.status)}>
                        {module.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Timeline</span>
                      <span className="font-medium">{module.timeframe}</span>
                    </div>
                  </div>

                  {module.nextAction && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-gray-700 mb-1">Next Action</p>
                      <p className="text-xs text-gray-600">{module.nextAction}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add New Module */}
      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <div className="max-w-sm mx-auto">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="font-semibold mb-2">Need a custom module?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a tailored action plan for your specific needs
            </p>
            <Button>
              Create Custom Module
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Module Detail Modal */}
      {selectedModule && (
        <ModuleDetailModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}
    </div>
  );
}

interface ModuleDetailModalProps {
  module: ActionModule;
  onClose: () => void;
}

function ModuleDetailModal({ module, onClose }: ModuleDetailModalProps) {
  const Icon = moduleIcons[module.category as keyof typeof moduleIcons] || Target;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                module.status === "completed" ? "bg-green-100" :
                module.status === "in_progress" ? "bg-blue-100" : "bg-gray-100"
              }`}>
                <Icon className={`w-6 h-6 ${
                  module.status === "completed" ? "text-green-600" :
                  module.status === "in_progress" ? "text-blue-600" : "text-gray-600"
                }`} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{module.title}</h2>
                <p className="text-sm text-gray-600">{module.category} Module</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and Progress */}
          {module.status === "in_progress" && (
            <div>
              <h3 className="font-semibold mb-3">Progress</h3>
              <div className="space-y-2">
                <Progress value={module.progress} className="h-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completion</span>
                  <span className="font-medium">{module.progress}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{module.description}</p>
          </div>

          {/* Trigger Reason */}
          {module.triggerReason && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Why this module?</p>
                  <p className="text-sm text-blue-700 mt-1">{module.triggerReason}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Steps */}
          <div>
            <h3 className="font-semibold mb-3">Action Steps</h3>
            <div className="space-y-3">
              <ActionStep
                title="Initial Assessment"
                description="Evaluate current state and identify gaps"
                status="completed"
              />
              <ActionStep
                title="Plan Development"
                description="Create detailed implementation plan"
                status="completed"
              />
              <ActionStep
                title="Stakeholder Alignment"
                description="Get buy-in from key stakeholders"
                status="in_progress"
              />
              <ActionStep
                title="Implementation"
                description="Execute the plan with regular checkpoints"
                status="not_started"
              />
              <ActionStep
                title="Measurement & Iteration"
                description="Track results and optimize"
                status="not_started"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <div className="flex gap-3">
              {module.status === "not_started" && (
                <Button>
                  <Play className="w-4 h-4 mr-2" />
                  Start Module
                </Button>
              )}
              {module.status === "in_progress" && (
                <Button>
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ActionStepProps {
  title: string;
  description: string;
  status: "completed" | "in_progress" | "not_started";
}

function ActionStep({ title, description, status }: ActionStepProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5">
        {status === "completed" ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : status === "in_progress" ? (
          <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
        ) : (
          <Clock className="w-5 h-5 text-gray-400" />
        )}
      </div>
      <div className={status === "not_started" ? "opacity-60" : ""}>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
