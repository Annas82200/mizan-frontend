"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Zap, 
  Target,
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Users,
  Activity
} from "lucide-react";
import { Line, Bar } from "react-chartjs-2";

interface EngagementData {
  currentScore: number;
  trend: "up" | "down" | "stable";
  dimensions: {
    belonging: number;
    autonomy: number;
    mastery: number;
    purpose: number;
    recognition: number;
    growth: number;
    wellbeing: number;
  };
  turnoverRisk: {
    level: "high" | "medium" | "low";
    percentage: number;
    atRiskEmployees: number;
  };
  recentSurvey: {
    responseRate: number;
    lastCompleted: string;
    nextScheduled: string;
  };
  weeklyTrend: Array<{
    week: string;
    score: number;
  }>;
  hotspots: Array<{
    area: string;
    sentiment: "positive" | "neutral" | "negative";
    change: number;
  }>;
}

interface EngagementPulseProps {
  data: EngagementData;
}

export default function EngagementPulse({ data }: EngagementPulseProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-green-600 bg-green-100";
    }
  };

  const dimensionIcons = {
    belonging: Heart,
    autonomy: Zap,
    mastery: Target,
    purpose: Brain,
    recognition: Heart,
    growth: TrendingUp,
    wellbeing: Activity
  };

  // Chart data for weekly trend
  const trendChartData = {
    labels: data.weeklyTrend.map(w => w.week),
    datasets: [{
      label: "Engagement Score",
      data: data.weeklyTrend.map(w => w.score),
      borderColor: "rgb(99, 102, 241)",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      fill: true,
      tension: 0.4,
    }]
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  // Chart data for dimensions
  const dimensionChartData = {
    labels: Object.keys(data.dimensions).map(d => 
      d.charAt(0).toUpperCase() + d.slice(1)
    ),
    datasets: [{
      label: "Current",
      data: Object.values(data.dimensions),
      backgroundColor: "rgba(99, 102, 241, 0.8)",
    }]
  };

  const dimensionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Engagement Score */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Index</CardTitle>
            <CardDescription>
              Overall employee engagement health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold">{data.currentScore}%</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(data.trend)}
                  <span className={`text-sm font-medium ${
                    data.trend === "up" ? "text-green-600" : 
                    data.trend === "down" ? "text-red-600" : "text-gray-600"
                  }`}>
                    {data.trend === "up" ? "+3%" : data.trend === "down" ? "-2%" : "0%"}
                  </span>
                </div>
              </div>
              <Badge className={getRiskColor(data.turnoverRisk.level)}>
                {data.turnoverRisk.level} turnover risk
              </Badge>
            </div>
            <div className="h-48">
              <Line data={trendChartData} options={trendChartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Turnover Risk</CardTitle>
            <CardDescription>
              Predicted attrition indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Risk Level</span>
                  <Badge className={getRiskColor(data.turnoverRisk.level)}>
                    {data.turnoverRisk.level}
                  </Badge>
                </div>
                <Progress 
                  value={data.turnoverRisk.percentage} 
                  className={`h-3 ${
                    data.turnoverRisk.level === "high" ? "[&>div]:bg-red-500" :
                    data.turnoverRisk.level === "medium" ? "[&>div]:bg-yellow-500" : ""
                  }`}
                />
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">At-risk employees</span>
                  <span className="font-semibold">{data.turnoverRisk.atRiskEmployees}</span>
                </div>
                <Button size="sm" className="w-full">
                  View Risk Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Dimensions */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Dimensions</CardTitle>
          <CardDescription>
            Breakdown by key engagement factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64">
              <Bar data={dimensionChartData} options={dimensionChartOptions} />
            </div>
            <div className="space-y-3">
              {Object.entries(data.dimensions).map(([key, value]) => {
                const Icon = dimensionIcons[key as keyof typeof dimensionIcons];
                return (
                  <div key={key} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      value >= 70 ? "bg-green-100" :
                      value >= 50 ? "bg-yellow-100" : "bg-red-100"
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        value >= 70 ? "text-green-600" :
                        value >= 50 ? "text-yellow-600" : "text-red-600"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium capitalize">{key}</span>
                        <span className="text-sm font-semibold">{value}%</span>
                      </div>
                      <Progress value={value} className="h-1.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hot Spots */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Hotspots</CardTitle>
            <CardDescription>
              Areas requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.hotspots.map((hotspot, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {hotspot.sentiment === "negative" ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : hotspot.sentiment === "positive" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Activity className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="font-medium">{hotspot.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${
                      hotspot.change > 0 ? "text-green-600" : 
                      hotspot.change < 0 ? "text-red-600" : "text-gray-600"
                    }`}>
                      {hotspot.change > 0 ? "+" : ""}{hotspot.change}%
                    </span>
                    <Badge variant={
                      hotspot.sentiment === "negative" ? "destructive" :
                      hotspot.sentiment === "positive" ? "default" : "secondary"
                    }>
                      {hotspot.sentiment}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Survey Status</CardTitle>
            <CardDescription>
              Engagement measurement health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="font-semibold">{data.recentSurvey.responseRate}%</span>
                </div>
                <Progress value={data.recentSurvey.responseRate} className="h-2" />
              </div>
              
              <div className="space-y-3 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Survey</span>
                  <span className="font-medium">
                    {new Date(data.recentSurvey.lastCompleted).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Survey</span>
                  <span className="font-medium">
                    {new Date(data.recentSurvey.nextScheduled).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  View Results
                </Button>
                <Button size="sm" className="flex-1">
                  Launch Survey
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
