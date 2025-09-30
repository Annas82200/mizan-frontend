"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  RefreshCw, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Layers,
  GitBranch,
  Target,
  Lightbulb,
  ChevronRight,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";
import { StructureResult } from "@/types/agents";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface AnalysisReportProps {
  result: StructureResult;
  onReset: () => void;
}

function AnalysisReport({ result, onReset }: AnalysisReportProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const downloadPDF = async () => {
    const element = document.getElementById("analysis-report");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("org-structure-analysis.pdf");
  };

  const getHealthColor = (score: number) => {
    if (score >= 0.8) return "text-green-600 bg-green-100";
    if (score >= 0.6) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getHealthLabel = (score: number) => {
    if (score >= 0.8) return "Excellent";
    if (score >= 0.6) return "Good";
    if (score >= 0.4) return "Needs Attention";
    return "Critical";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" id="analysis-report">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Organization Analysis Report</h1>
              <p className="text-sm text-gray-600 mt-1">
                Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={downloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={onReset}>
                <RefreshCw className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
              <Button>
                Upgrade to Pro
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Organization Health Score</h2>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-5xl font-bold">{result.overallScore}</span>
                    <span className="text-xl text-gray-500">/ 100</span>
                    <Badge className={getHealthColor(result.overallScore)}>
                      {getHealthLabel(result.overallScore)}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Alignment Score</span>
                      <span className="font-medium">{result.healthMetrics.structuralClarity}%</span>
                    </div>
                    <Progress value={result.healthMetrics.structuralClarity} className="h-2" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Total Roles</span>
                      </div>
                      <p className="text-2xl font-semibold">{result.summary.nodes}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Layers className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Max Depth</span>
                      </div>
                      <p className="text-2xl font-semibold">{result.summary.maxDepth}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <GitBranch className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Avg Span</span>
                      </div>
                      <p className="text-2xl font-semibold">{result.summary.spanOfControl.average.toFixed(1)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Bottlenecks</span>
                      </div>
                      <p className="text-2xl font-semibold">{result.summary.bottlenecks.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Analysis Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
            <CardDescription>
              Comprehensive insights into your organizational structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="structure">Structure</TabsTrigger>
                <TabsTrigger value="values">Values Lens</TabsTrigger>
                <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
                <TabsTrigger value="recommendations">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 pt-6">
                <div>
                  <h3 className="font-semibold mb-3">Executive Summary</h3>
                  <p className="text-gray-600 mb-4">{result.summary.hint}</p>
                  
                  {/* Triad Analysis */}
                  <Card className="bg-gray-50 border-gray-200">
                    <CardHeader className="pb-3">
                      <h4 className="text-sm font-semibold">AI Triad Analysis</h4>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{result.triad.synthesis}</p>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-gray-500">Knowledge</span>
                          <p className="font-medium mt-1">{Math.round(result.triad.knowledge.confidence * 100)}% confidence</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Data</span>
                          <p className="font-medium mt-1">{Math.round(result.triad.data.confidence * 100)}% confidence</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Reasoning</span>
                          <p className="font-medium mt-1">{Math.round(result.triad.reasoning.confidence * 100)}% confidence</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Span of Control Distribution</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {Object.entries(result.summary.spanOfControl.distribution).map(([span, count]) => (
                      <Card key={span} className="text-center p-3">
                        <p className="text-xs text-gray-500">Span {span}</p>
                        <p className="text-lg font-semibold">{count}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="structure" className="space-y-6 pt-6">
                <div>
                  <h3 className="font-semibold mb-3">Organizational Hierarchy</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    {result.roles.map((role, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.02 }}
                        className="py-1"
                        style={{ paddingLeft: `${role.level * 24}px` }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            role.level === 0 ? "bg-blue-500" :
                            role.level === 1 ? "bg-green-500" :
                            role.level === 2 ? "bg-yellow-500" :
                            "bg-gray-400"
                          }`} />
                          <span className="text-sm font-medium">{role.title}</span>
                          {role.reportsTo && (
                            <span className="text-xs text-gray-500">→ {role.reportsTo}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="values" className="space-y-6 pt-6">
                <div>
                  <h3 className="font-semibold mb-3">Values Framework Alignment</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    How your structure maps to the 7-cylinder values framework
                  </p>
                  <div className="space-y-4">
                    {result.valuesLens.map((lens) => (
                      <Card key={lens.cylinder} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{lens.label}</h4>
                            <p className="text-xs text-gray-500 mt-1">{lens.ethicalPrinciple}</p>
                          </div>
                          <Badge variant={lens.weight > 0.2 ? "default" : "secondary"}>
                            {Math.round(lens.weight * 100)}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{lens.definition}</p>
                        <Progress value={lens.weight * 100} className="h-2 mb-2" />
                        {lens.implications.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-700 mb-1">Implications:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {lens.implications.map((imp, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <span className="text-gray-400 mt-0.5">•</span>
                                  {imp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bottlenecks" className="space-y-6 pt-6">
                <div>
                  <h3 className="font-semibold mb-3">Identified Bottlenecks</h3>
                  {result.summary.bottlenecks.length === 0 ? (
                    <Card className="p-8 text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <p className="text-gray-600">No major bottlenecks identified</p>
                    </Card>
                  ) : (
                    <div className="space-y-3">
                      {result.summary.bottlenecks.map((bottleneck, idx) => (
                        <Card key={idx} className="p-4 border-l-4 border-l-orange-400">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                            <div>
                              <p className="font-medium">{bottleneck.role}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                {bottleneck.issue}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6 pt-6">
                <div>
                  <h3 className="font-semibold mb-3">Recommended Actions</h3>
                  <div className="space-y-3">
                    {result.summary.recommendations.map((rec, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{rec}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Target className="w-3 h-3" />
                                  Impact: High
                                </span>
                                <span className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  Effort: Medium
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Pro Features Teaser */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <h4 className="font-semibold mb-2">Want deeper insights?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Unlock culture analysis, skills mapping, and automated recommendations with Pro
                  </p>
                  <ul className="text-sm space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Culture & values alignment analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Skills gap identification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Performance predictions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Industry benchmarking
                    </li>
                  </ul>
                  <Button className="w-full">
                    Upgrade to Pro
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function EntryPage() {
  // Sample data for the analysis report
  const sampleResult: StructureResult = {
    overallScore: 78,
    healthMetrics: {
      structuralClarity: 85,
      communicationFlow: 72,
      decisionMaking: 80,
      resourceAllocation: 75
    },
    insights: [
      "Strong hierarchical structure with clear reporting lines",
      "Communication bottlenecks identified in middle management",
      "Decision-making processes could be more streamlined"
    ],
    recommendations: [
      "Implement cross-functional teams to improve collaboration",
      "Establish regular feedback loops between departments",
      "Consider flattening organizational structure in key areas"
    ],
    riskAreas: [
      "Potential silos between departments",
      "Over-reliance on key personnel",
      "Limited succession planning"
    ],
    summary: {
      hint: "Your organization shows strong structural foundations with opportunities for improved communication flow.",
      nodes: 45,
      maxDepth: 5,
      spanOfControl: {
        average: 4.2,
        distribution: { "1": 5, "2": 8, "3": 12, "4": 10, "5": 7, "6": 3 }
      },
      bottlenecks: [
        { role: "Middle Management", issue: "Communication delays", severity: "medium" },
        { role: "IT Department", issue: "Resource constraints", severity: "high" }
      ],
      recommendations: [
        "Streamline reporting processes",
        "Implement cross-functional teams",
        "Enhance communication tools"
      ]
    },
    triad: {
      synthesis: "Analysis shows balanced organizational structure with room for optimization",
      knowledge: { confidence: 0.85 },
      data: { confidence: 0.92 },
      reasoning: { confidence: 0.78 }
    },
    roles: [
      { title: "CEO", level: 1, reports: 5 },
      { title: "VP Engineering", level: 2, reports: 8, reportsTo: "CEO" },
      { title: "VP Sales", level: 2, reports: 6, reportsTo: "CEO" },
      { title: "Engineering Manager", level: 3, reports: 7, reportsTo: "VP Engineering" },
      { title: "Sales Manager", level: 3, reports: 4, reportsTo: "VP Sales" }
    ],
    valuesLens: [
      { 
        cylinder: 1, 
        name: "Security", 
        description: "Organizational stability", 
        score: 82, 
        label: "Security Focus", 
        ethicalPrinciple: "Stability and safety", 
        weight: 0.25,
        definition: "Focus on maintaining stable operations and secure environment",
        implications: ["Strong risk management", "Conservative decision making", "Employee security"]
      },
      { 
        cylinder: 2, 
        name: "Belonging", 
        description: "Team cohesion", 
        score: 75, 
        label: "Team Unity", 
        ethicalPrinciple: "Trust and belonging", 
        weight: 0.22,
        definition: "Emphasis on team relationships and mutual support",
        implications: ["High collaboration", "Strong team bonds", "Inclusive culture"]
      },
      { 
        cylinder: 3, 
        name: "Achievement", 
        description: "Performance focus", 
        score: 88, 
        label: "Excellence", 
        ethicalPrinciple: "Recognition and achievement", 
        weight: 0.28,
        definition: "Drive for high performance and recognition",
        implications: ["Results-oriented", "Competitive environment", "Merit-based rewards"]
      },
      { 
        cylinder: 4, 
        name: "Innovation", 
        description: "Growth mindset", 
        score: 70, 
        label: "Growth", 
        ethicalPrinciple: "Transformation and innovation", 
        weight: 0.25,
        definition: "Commitment to continuous improvement and innovation",
        implications: ["Embraces change", "Encourages creativity", "Learning culture"]
      }
    ]
  };

  const handleReset = () => {
    console.log("Resetting analysis...");
  };

  return <AnalysisReport result={sampleResult} onReset={handleReset} />;
}
