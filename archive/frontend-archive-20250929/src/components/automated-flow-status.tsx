"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  Settings,
  Plus,
  Activity,
  AlertCircle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Flow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
  status: "idle" | "running" | "completed" | "failed";
  triggers: Array<{
    type: string;
    condition: string;
    value?: any;
  }>;
  actions: Array<{
    type: string;
    target: string;
    delay: number;
  }>;
  executions: number;
  successRate: number;
}

interface AutomatedFlowStatusProps {
  flows: Flow[];
}

export default function AutomatedFlowStatus({ flows }: AutomatedFlowStatusProps) {
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Activity className="w-4 h-4 text-blue-600 animate-pulse" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-blue-600 bg-blue-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatTrigger = (trigger: any) => {
    if (trigger.type === "assessment" && trigger.condition === "completed") {
      return `When ${trigger.type} analysis completes`;
    }
    if (trigger.condition === "score_below") {
      return `When ${trigger.type} score < ${trigger.value}%`;
    }
    return `${trigger.type} ${trigger.condition}`;
  };

  const formatAction = (action: any) => {
    const delayText = action.delay > 0 ? ` (after ${action.delay}m)` : "";
    switch (action.type) {
      case "trigger_assessment":
        return `Run ${action.target} analysis${delayText}`;
      case "send_notification":
        return `Send ${action.target} notification${delayText}`;
      case "create_action":
        return `Create ${action.target} action item${delayText}`;
      default:
        return `${action.type}: ${action.target}${delayText}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Flows Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-8 h-8 text-yellow-600" />
              <Badge variant="secondary">
                {flows.filter(f => f.enabled).length}/{flows.length}
              </Badge>
            </div>
            <p className="text-2xl font-bold">{flows.filter(f => f.enabled).length}</p>
            <p className="text-sm text-gray-600">Active Flows</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <Badge className="text-blue-600 bg-blue-100">
                {flows.filter(f => f.status === "running").length}
              </Badge>
            </div>
            <p className="text-2xl font-bold">
              {flows.reduce((sum, f) => sum + f.executions, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Executions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                {Math.round(flows.reduce((sum, f) => sum + f.successRate, 0) / flows.length)}%
              </span>
            </div>
            <p className="text-2xl font-bold">
              {Math.round(flows.reduce((sum, f) => sum + f.successRate, 0) / flows.length)}%
            </p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Create Flow
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Flow List */}
      <div className="space-y-4">
        {flows.map((flow) => (
          <motion.div
            key={flow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <CardTitle className="text-lg">{flow.name}</CardTitle>
                      <Badge className={getStatusColor(flow.status)}>
                        {flow.status}
                      </Badge>
                    </div>
                    <CardDescription>{flow.description}</CardDescription>
                  </div>
                  <Switch
                    checked={flow.enabled}
                    onCheckedChange={() => {}}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Flow Visualization */}
                  <div className="flex items-center gap-2 overflow-x-auto py-2">
                    <Badge variant="outline" className="flex-shrink-0">
                      <Zap className="w-3 h-3 mr-1" />
                      Trigger
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    {flow.triggers.map((trigger, idx) => (
                      <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="secondary" className="text-xs">
                          {formatTrigger(trigger)}
                        </Badge>
                        {idx < flow.triggers.length - 1 && (
                          <span className="text-gray-400">OR</span>
                        )}
                      </div>
                    ))}
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <Badge variant="outline" className="flex-shrink-0">
                      Actions
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {flow.actions.map((action, idx) => (
                        <Badge key={idx} className="text-xs">
                          {formatAction(action)}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-600">Last Run</p>
                      <p className="text-sm font-medium">
                        {flow.lastRun ? new Date(flow.lastRun).toLocaleString() : "Never"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Next Run</p>
                      <p className="text-sm font-medium">
                        {flow.nextRun ? new Date(flow.nextRun).toLocaleString() : "On trigger"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Success Rate</p>
                      <div className="flex items-center gap-2">
                        <Progress value={flow.successRate} className="flex-1 h-1.5" />
                        <span className="text-sm font-medium">{flow.successRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between pt-4 border-t">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedFlow(flow)}
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        View History
                      </Button>
                    </div>
                    {flow.enabled && flow.status === "idle" && (
                      <Button size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Run Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                How Automated Flows Work
              </h4>
              <p className="text-sm text-blue-800">
                Automated flows trigger analyses and actions based on your configured conditions. 
                For example, when a culture analysis completes, the system can automatically trigger 
                skills and engagement analyses to get a comprehensive view of organizational health.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
