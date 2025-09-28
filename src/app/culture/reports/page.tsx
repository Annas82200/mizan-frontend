"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3,
  Users,
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Download,
  Eye,
  Lock,
  Unlock,
  Heart,
  Brain,
  Shield,
  Zap,
  Target,
  Activity,
  Crown
} from "lucide-react";
import { motion } from "framer-motion";
import { useCultureReports } from "@/hooks/useCultureReports";
import { useTenant } from "@/hooks/useTenant";
import CylinderRadarChart from "@/components/charts/cylinder-radar-enhanced";
import EntropyGauge from "@/components/charts/entropy-gauge";
import ValueComparison from "@/components/charts/value-comparison";
// import EmployeeReportModal from "@/components/culture/employee-report-modal";

const CYLINDER_ICONS = {
  1: Shield,
  2: Heart,
  3: Target,
  4: Zap,
  5: Brain,
  6: Activity,
  7: Crown
};

const VALUES_BY_CYLINDER = {
  1: { name: "Survival", description: "Security and stability" },
  2: { name: "Relationship", description: "Belonging and trust" },
  3: { name: "Self-Esteem", description: "Achievement and recognition" },
  4: { name: "Transformation", description: "Growth and innovation" },
  5: { name: "Internal Cohesion", description: "Collaboration and unity" },
  6: { name: "Making a Difference", description: "Impact and purpose" },
  7: { name: "Service", description: "Legacy and service" }
};

function CultureReportsPage() {
  const { tenant } = useTenant();
  const { 
    organizationReport,
    departmentReports,
    employeeReports,
    accessPermissions,
    requestEmployeeAccess,
    isLoading
  } = useCultureReports();
  
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"organization" | "department" | "employee">("organization");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const isSuperadmin = tenant?.multiTenantAccess;
  const hasEmployeeAccess = isSuperadmin && accessPermissions?.employeeReports;

  const currentReport = viewMode === "department" && selectedDepartment !== "all"
    ? departmentReports?.find(d => d.department === selectedDepartment)?.report
    : organizationReport;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Culture Analysis Reports</h1>
              <p className="text-sm text-gray-600 mt-1">
                Mizan Framework-based cultural insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                  {isSuperadmin && (
                    <SelectItem value="employee">Employee</SelectItem>
                  )}
                </SelectContent>
              </Select>
              
              {viewMode === "department" && (
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departmentReports?.filter(dept => dept.department).map(dept => (
                      <SelectItem key={dept.department} value={dept.department!}>
                        {dept.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Response Rate"
            value={`${Math.round((currentReport?.overallResponseRate || 0) * 100)}%`}
            icon={Users}
            trend={currentReport?.responseRateTrend}
            color="blue"
          />
          <MetricCard
            title="Cultural Entropy"
            value={`${Math.round((currentReport?.entropy || 0) * 100)}%`}
            icon={Activity}
            trend={currentReport?.entropy > 0.5 ? "up" : "down"}
            color={currentReport?.entropy > 0.5 ? "red" : "green"}
          />
          <MetricCard
            title="Engagement Score"
            value={`${currentReport?.avgEngagement?.toFixed(1) || 0}/5`}
            icon={Heart}
            trend={currentReport?.engagementTrend}
            color="purple"
          />
          <MetricCard
            title="Cultural Gap"
            value={`${Math.round((currentReport?.culturalGap || 0) * 100)}%`}
            icon={AlertTriangle}
            trend={currentReport?.culturalGap > 0.3 ? "up" : "down"}
            color={currentReport?.culturalGap > 0.3 ? "orange" : "green"}
          />
        </div>

        {/* Main Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="values">Values Analysis</TabsTrigger>
            <TabsTrigger value="cylinders">Cylinder Health</TabsTrigger>
            <TabsTrigger value="evolution">Evolution Path</TabsTrigger>
            {viewMode === "employee" && <TabsTrigger value="employees">Employee Reports</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current vs Assumed Culture */}
              <Card>
                <CardHeader>
                  <CardTitle>Culture Alignment</CardTitle>
                  <CardDescription>
                    Current experience vs. assumed culture
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ValueComparison
                    data={[
                      { value: "Innovation", personal: 4, company: 3, desired: 5 },
                      { value: "Collaboration", personal: 5, company: 4, desired: 5 },
                      { value: "Excellence", personal: 4, company: 4, desired: 4 },
                      { value: "Growth", personal: 3, company: 3, desired: 5 },
                      { value: "Purpose", personal: 5, company: 3, desired: 5 }
                    ]}
                  />
                </CardContent>
              </Card>

              {/* Cultural Entropy */}
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Entropy</CardTitle>
                  <CardDescription>
                    Measure of cultural confusion and inefficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EntropyGauge value={currentReport?.entropy || 0} />
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cohesion Score</span>
                      <span className="font-medium">
                        {Math.round((currentReport?.culturalCohesion || 0) * 100)}%
                      </span>
                    </div>
                    {viewMode === "organization" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Department Variance</span>
                        <span className="font-medium">
                          {Math.round((currentReport?.departmentVariance || 0) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p>{currentReport?.insights}</p>
                </div>
              </CardContent>
            </Card>

            {/* Strategic Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Strategic Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentReport?.strategicRecommendations?.map((rec: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="values" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Current Values */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Culture Experience</CardTitle>
                  <CardDescription>
                    Most frequently selected values
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentReport?.currentExperience?.slice(0, 10).map((value: string, idx: number) => {
                      const cylinder = identifyValueCylinder(value);
                      const Icon = CYLINDER_ICONS[cylinder as keyof typeof CYLINDER_ICONS] || Shield;
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">{value}</span>
                          </div>
                          <Badge variant="secondary">
                            {Math.round((currentReport.currentCounts?.[value] / currentReport.totalEmployees) * 100)}%
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Desired Future Values */}
              <Card>
                <CardHeader>
                  <CardTitle>Desired Future Culture</CardTitle>
                  <CardDescription>
                    Values employees want to see
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentReport?.desiredCulture?.slice(0, 10).map((value: string, idx: number) => {
                      const cylinder = identifyValueCylinder(value);
                      const Icon = CYLINDER_ICONS[cylinder as keyof typeof CYLINDER_ICONS] || Shield;
                      const isNew = !currentReport.currentExperience?.includes(value);
                      
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-gray-600" />
                            <span className="text-sm">{value}</span>
                            {isNew && (
                              <Badge variant="outline" className="text-xs">New</Badge>
                            )}
                          </div>
                          <Badge variant="secondary">
                            {Math.round((currentReport.desiredCounts?.[value] / currentReport.totalEmployees) * 100)}%
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Aspiration Gap */}
            <Card>
              <CardHeader>
                <CardTitle>Cultural Aspiration Gap</CardTitle>
                <CardDescription>
                  The difference between current and desired culture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Overall Gap Score</span>
                    <span className="text-2xl font-bold">
                      {Math.round((currentReport?.aspirationGap || 0) * 100)}%
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Values to Strengthen</h4>
                      <div className="space-y-2">
                        {currentReport?.desiredCulture
                          ?.filter((v: string) => !currentReport.currentExperience?.includes(v))
                          .slice(0, 5)
                          .map((value: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span>{value}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Values to Reduce</h4>
                      <div className="space-y-2">
                        {currentReport?.currentExperience
                          ?.filter((v: string) => !currentReport.desiredCulture?.includes(v))
                          .slice(0, 5)
                          .map((value: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <TrendingDown className="w-4 h-4 text-red-600" />
                              <span>{value}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cylinders" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cylinder Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Cylinder Distribution</CardTitle>
                  <CardDescription>
                    Cultural emphasis across the 7 cylinders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CylinderRadarChart data={currentReport?.cylinderDistribution} />
                </CardContent>
              </Card>

              {/* Cylinder Health Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>Cylinder Health Status</CardTitle>
                  <CardDescription>
                    Assessment of each cylinder's representation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(currentReport?.cylinderHealth || {}).map(([cyl, health]) => {
                      const cylinder = parseInt(cyl);
                      const Icon = CYLINDER_ICONS[cylinder as keyof typeof CYLINDER_ICONS] || Shield;
                      const cylinderInfo = VALUES_BY_CYLINDER[cylinder as keyof typeof VALUES_BY_CYLINDER];
                      const healthColor = getHealthColor(health as string);
                      
                      return (
                        <div key={cyl} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${healthColor.bg} flex items-center justify-center`}>
                              <Icon className={`w-5 h-5 ${healthColor.text}`} />
                            </div>
                            <div>
                              <p className="font-medium">{cylinderInfo?.name}</p>
                              <p className="text-sm text-gray-600">{String(health)}</p>
                            </div>
                          </div>
                          <Badge className={healthColor.badge}>
                            {Math.round(currentReport?.cylinderDistribution?.[cylinder] || 0)}%
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Missing Cylinders Alert */}
            {currentReport?.cylinderHealth && 
             Object.values(currentReport.cylinderHealth).some((h: any) => h.includes("Critical")) && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-red-900">Critical Cylinder Gaps</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-800">
                    Some cylinders are critically underrepresented in your culture. 
                    This imbalance may lead to organizational blind spots and limit 
                    your ability to adapt and grow.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="evolution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cultural Evolution Path</CardTitle>
                <CardDescription>
                  Strategic roadmap for cultural transformation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentReport?.evolutionPath || '' }} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {viewMode === "employee" && (
            <TabsContent value="employees" className="space-y-6">
              {!hasEmployeeAccess ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Employee Reports Access Required
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You need client approval to access individual employee reports.
                    </p>
                    <Button onClick={() => requestEmployeeAccess("employee-1")}>
                      Request Access
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Employee Culture Reports</CardTitle>
                          <CardDescription>
                            Individual assessment results and insights
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <Unlock className="w-3 h-3 mr-1" />
                          Access Granted
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {employeeReports?.map((employee: any) => (
                          <div 
                            key={employee.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedEmployee(employee)}
                          >
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-gray-600">{employee.department}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">
                                Engagement: {employee.engagement}/5
                              </Badge>
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Employee Report Modal - Temporarily disabled */}
      {/* {selectedEmployee && (
        <EmployeeReportModal
          isOpen={!!selectedEmployee}
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )} */}
    </div>
  );
}

// Helper Components
function MetricCard({ title, value, icon: Icon, trend, color }: any) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600"
  };

  const trendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
            <Icon className="w-6 h-6" />
          </div>
          {trendIcon && (
            <span className={`text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {React.createElement(trendIcon, { className: "w-4 h-4" })}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </CardContent>
    </Card>
  );
}

function identifyValueCylinder(value: string): number {
  // Implementation to map value to cylinder
  // This would match the server-side logic
  return 1; // Placeholder
}

function getHealthColor(health: string): any {
  if (health.includes("Critical")) {
    return { bg: "bg-red-100", text: "text-red-600", badge: "destructive" };
  } else if (health.includes("Weak")) {
    return { bg: "bg-orange-100", text: "text-orange-600", badge: "bg-orange-100 text-orange-800" };
  } else if (health.includes("Dominant")) {
    return { bg: "bg-purple-100", text: "text-purple-600", badge: "bg-purple-100 text-purple-800" };
  } else {
    return { bg: "bg-green-100", text: "text-green-600", badge: "bg-green-100 text-green-800" };
  }
}

export default CultureReportsPage;
