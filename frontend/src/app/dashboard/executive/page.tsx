'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { BarChart3, Users, TrendingUp, Shield, AlertTriangle, Brain, Activity, Target } from 'lucide-react';

interface ExecutiveMetrics {
  orgHealthScore: number;
  cultureEntropy: number;
  skillsReadiness: number;
  employeeCount: number;
  turnoverRate: number;
  engagementScore: number;
  openPositions: number;
  aiInsights: Array<{ title: string; description: string; priority: string }>;
  departmentScores: Array<{ name: string; health: number; trend: string }>;
}

export default function ExecutiveDashboardPage() {
  const [metrics, setMetrics] = useState<ExecutiveMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/api/analytics/executive');
      setMetrics(response.data);
    } catch (err) {
      setError('Failed to load executive dashboard metrics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Executive Dashboard</h1>
        <p className="text-gray-500 mt-1">Organization health overview and AI-powered strategic insights</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      {metrics && (
        <>
          {/* Key Metrics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Org Health Score', value: `${metrics.orgHealthScore}%`, icon: Activity, color: scoreColor(metrics.orgHealthScore) },
              { label: 'Culture Entropy', value: `${metrics.cultureEntropy}%`, icon: Shield, color: metrics.cultureEntropy <= 10 ? 'text-green-600' : 'text-yellow-600' },
              { label: 'Skills Readiness', value: `${metrics.skillsReadiness}%`, icon: Target, color: scoreColor(metrics.skillsReadiness) },
              { label: 'Engagement', value: `${metrics.engagementScore}%`, icon: TrendingUp, color: scoreColor(metrics.engagementScore) },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{label}</span>
                  <Icon className="h-4 w-4 text-gray-400" />
                </div>
                <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Workforce stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Total Employees</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{metrics.employeeCount.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Turnover Rate</span>
              </div>
              <p className={`mt-2 text-2xl font-semibold ${metrics.turnoverRate > 15 ? 'text-red-600' : 'text-gray-900'}`}>
                {metrics.turnoverRate}%
              </p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Open Positions</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{metrics.openPositions}</p>
            </div>
          </div>

          {/* AI Strategic Insights */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-500" />
              AI Strategic Insights
            </h2>
            <div className="space-y-3">
              {metrics.aiInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                  <span className={`mt-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                    insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {insight.priority}
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Health */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-4">Department Health Scores</h2>
            <div className="space-y-3">
              {metrics.departmentScores.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 w-32">{dept.name}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 rounded-full bg-gray-100">
                      <div
                        className={`h-2 rounded-full ${
                          dept.health >= 80 ? 'bg-green-500' :
                          dept.health >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${dept.health}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-sm font-medium w-12 text-right ${scoreColor(dept.health)}`}>{dept.health}%</span>
                  <span className="text-xs text-gray-400 w-8 text-right">
                    {dept.trend === 'up' ? '↑' : dept.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
