'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  AlertCircle,
  Loader2,
  BarChart3,
  Download,
  RefreshCw,
  Target
} from 'lucide-react';
import { TenantSelector, EmployeeSelector } from '@/components/dashboard';

interface LearningPath {
  id: string;
  title: string;
  category: string;
  progress: number;
  enrolledCount: number;
  completionRate: number;
  estimatedHours: number;
}

interface Course {
  id: string;
  title: string;
  pathId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  duration: number;
}

interface LearningMetrics {
  totalEnrollments: number;
  averageCompletionRate: number;
  averageEngagementScore: number;
  skillsAcquired: number;
}

interface LXPAnalysisOutput {
  overallEngagement: number;
  learningPaths: LearningPath[];
  courses: Course[];
  metrics: LearningMetrics;
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    actionItems: string[];
  }>;
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

export default function LXPAnalysisPage() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<LXPAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedTenant) {
      setError('Please select a client first');
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);

      // Mock data
      const mockResults: LXPAnalysisOutput = {
        overallEngagement: 76,
        learningPaths: [
          {
            id: '1',
            title: 'Leadership Development',
            category: 'Management',
            progress: 45,
            enrolledCount: 28,
            completionRate: 72,
            estimatedHours: 40
          },
          {
            id: '2',
            title: 'Technical Skills Mastery',
            category: 'Technical',
            progress: 62,
            enrolledCount: 45,
            completionRate: 68,
            estimatedHours: 60
          }
        ],
        courses: [
          {
            id: '1',
            title: 'Effective Communication',
            pathId: '1',
            status: 'in_progress',
            progress: 65,
            duration: 8
          }
        ],
        metrics: {
          totalEnrollments: 156,
          averageCompletionRate: 70,
          averageEngagementScore: 76,
          skillsAcquired: 42
        },
        recommendations: [
          {
            priority: 'high',
            title: 'Create Personalized Learning Paths',
            description: 'Leverage AI to create custom paths based on skills gaps',
            actionItems: ['Analyze skills gaps', 'Map to learning objectives', 'Auto-assign courses']
          }
        ]
      };

      setResults(mockResults);
    } catch (err: any) {
      console.error('LXP analysis error:', err);
      setError(err.message || 'Failed to analyze LXP');
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'bg-gray-100 text-gray-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold text-mizan-primary mb-2">Learning Experience Platform (LXP)</h1>
        <p className="text-mizan-secondary">
          Manage learning paths, track progress, and analyze learning outcomes
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
                <span>Analyzing Learning Data...</span>
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                <span>Run LXP Analysis</span>
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
                <p className="text-mizan-secondary text-sm font-medium mb-1">Overall Engagement Score</p>
                <h2 className="text-5xl font-bold text-mizan-primary">{results.overallEngagement}/100</h2>
              </div>
              <GraduationCap className="w-16 h-16 text-mizan-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-mizan-primary">Total Enrollments</h3>
                <BookOpen className="w-5 h-5 text-mizan-gold" />
              </div>
              <p className="text-3xl font-bold text-mizan-primary">{results.metrics.totalEnrollments}</p>
              <p className="text-xs text-mizan-secondary">active learners</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-mizan-primary">Completion Rate</h3>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{results.metrics.averageCompletionRate}%</p>
              <p className="text-xs text-mizan-secondary">average rate</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-mizan-primary">Engagement</h3>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{results.metrics.averageEngagementScore}%</p>
              <p className="text-xs text-mizan-secondary">engagement score</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-mizan-primary">Skills Acquired</h3>
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600">{results.metrics.skillsAcquired}</p>
              <p className="text-xs text-mizan-secondary">new skills</p>
            </div>
          </div>

          {results.learningPaths.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-mizan-primary mb-4">Learning Paths</h3>
              <div className="space-y-4">
                {results.learningPaths.map((path) => (
                  <div key={path.id} className="p-5 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-mizan-primary mb-1">{path.title}</h4>
                        <p className="text-sm text-mizan-secondary mb-2">
                          {path.category} • {path.enrolledCount} enrolled • {path.estimatedHours}h total
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-mizan-secondary mb-1">Overall Progress</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${path.progress}%` }} />
                          </div>
                          <span className="text-xs font-bold text-blue-600">{path.progress}%</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-mizan-secondary mb-1">Completion Rate</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${path.completionRate}%` }} />
                          </div>
                          <span className="text-xs font-bold text-green-600">{path.completionRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(results, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `lxp-analysis-${selectedTenant?.name}-${new Date().toISOString().split('T')[0]}.json`;
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
          <GraduationCap className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mizan-primary mb-2">
            Select a Client to Begin
          </h3>
          <p className="text-mizan-secondary">
            Choose a client to analyze learning paths and track progress
          </p>
        </div>
      )}
    </div>
  );
}
