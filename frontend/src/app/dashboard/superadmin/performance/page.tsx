'use client';

import React, { useState } from 'react';
import { logger } from '@/lib/logger';
import {
  Target,
  TrendingUp,
  Award,
  MessageSquare,
  Calendar,
  Users,
  AlertCircle,
  Loader2,
  CheckCircle2,
  BarChart3,
  Download,
  RefreshCw,
  Star
} from 'lucide-react';
import { TenantSelector, EmployeeSelector } from '@/components/dashboard';

interface PerformanceGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: 'on_track' | 'at_risk' | 'behind';
  dueDate: string;
}

interface PerformanceMetric {
  category: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  benchmark: number;
}

interface Feedback {
  type: '360' | 'peer' | 'manager' | 'self';
  rating: number;
  comment: string;
  date: string;
}

interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionItems: string[];
}

interface PerformanceAnalysisOutput {
  overallScore: number;
  goals: PerformanceGoal[];
  metrics: PerformanceMetric[];
  feedback: Feedback[];
  recommendations: Recommendation[];
  strengths: string[];
  developmentAreas: string[];
}

interface Tenant {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  title?: string | null;
  role: string;
}

export default function PerformanceAnalysisPage() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<PerformanceAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedTenant) {
      setError('Please select a client first');
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);

      // Production-ready API call to Performance Module
      // Compliant with AGENT_CONTEXT_ULTIMATE.md Lines 1665-1863 (Performance Module)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const endpoint = selectedEmployee
        ? `/api/performance/analyze/employee/${selectedEmployee.id}`
        : `/api/performance/analyze/tenant/${selectedTenant.id}`;

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Performance analysis failed' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const analysisData: PerformanceAnalysisOutput = await response.json();
      
      // Validate response structure
      if (!analysisData || typeof analysisData.overallScore !== 'number') {
        throw new Error('Invalid performance analysis data received from server');
      }

      setResults(analysisData);
    } catch (err: unknown) {
      logger.error('Performance analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze performance');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-100 text-green-700';
      case 'at_risk': return 'bg-yellow-100 text-yellow-700';
      case 'behind': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold text-mizan-primary mb-2">Performance Management</h1>
        <p className="text-mizan-secondary">
          Track goals, review performance metrics, and provide feedback
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <TenantSelector
          selectedTenantId={selectedTenant?.id || null}
          onSelectTenant={(id, tenant) => {
            setSelectedTenant(tenant);
            setResults(null);
            setError(null);
          }}
          label="Select Client"
          required
        />

        {selectedTenant && (
          <div className="mt-4">
            <EmployeeSelector
              tenantId={selectedTenant.id}
              selectedEmployeeId={selectedEmployee?.id || null}
              onSelectEmployee={(id, employee) => {
                setSelectedEmployee(employee);
                setResults(null);
              }}
              label="Select Employee (Optional)"
              placeholder="Choose an employee or analyze company-wide..."
            />
          </div>
        )}
      </div>

      {selectedTenant && !results && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900 mb-1">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full px-6 py-4 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl font-semibold"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Performance...</span>
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                <span>Run Performance Analysis</span>
              </>
            )}
          </button>
        </div>
      )}

      {results && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-mizan-secondary text-sm font-medium mb-1">Overall Performance Score</p>
                <h2 className={`text-5xl font-bold ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}/100
                </h2>
              </div>
              <Award className={`w-16 h-16 ${getScoreColor(results.overallScore)}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.metrics.map((metric, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-mizan-primary mb-2">{metric.category}</h3>
                <p className={`text-3xl font-bold ${getScoreColor(metric.score)}`}>{metric.score}</p>
                <p className="text-xs text-mizan-secondary mt-1">Benchmark: {metric.benchmark}</p>
              </div>
            ))}
          </div>

          {results.goals.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-mizan-primary mb-4">Goals Progress</h3>
              <div className="space-y-4">
                {results.goals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-mizan-primary">{goal.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                        {goal.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-mizan-secondary mb-3">{goal.description}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-green-600">{goal.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-mizan-primary mb-4">Strengths</h3>
              <div className="space-y-2">
                {results.strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-mizan-secondary">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-mizan-primary mb-4">Development Areas</h3>
              <div className="space-y-2">
                {results.developmentAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-mizan-secondary">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(results, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `performance-analysis-${selectedTenant?.name}-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
              }}
              className="px-6 py-3 border-2 border-mizan-primary text-mizan-primary rounded-xl hover:bg-mizan-primary hover:text-white transition-all duration-400 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Results</span>
            </button>

            <button
              onClick={() => setResults(null)}
              className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Run New Analysis</span>
            </button>
          </div>
        </div>
      )}

      {!selectedTenant && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <Target className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mizan-primary mb-2">
            Select a Client to Begin
          </h3>
          <p className="text-mizan-secondary">
            Choose a client and optionally an employee to analyze performance
          </p>
        </div>
      )}
    </div>
  );
}
