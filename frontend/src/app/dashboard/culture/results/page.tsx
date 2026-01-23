'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Shield,
  Users as UsersIcon,
  TrendingUp,
  Lightbulb,
  Scale,
  Target,
  AlertCircle,
  Loader2,
  BarChart3,
  Download,
  RefreshCw,
  ArrowLeft,
  PieChart,
  TrendingDown,
  Minus
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

// 7-Cylinder Framework Configuration
const CYLINDERS = [
  {
    id: 7,
    name: 'Transcendence & Unity',
    nameArabic: 'التسامي والوحدة',
    icon: Target,
    ethicalPrinciple: 'Unity of Being',
    color: '#CCA404',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700'
  },
  {
    id: 6,
    name: 'Wisdom & Compassion',
    nameArabic: 'الحكمة والرحمة',
    icon: Lightbulb,
    ethicalPrinciple: 'Mercy and Knowledge',
    color: '#8b5cf6',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-700'
  },
  {
    id: 5,
    name: 'Integrity & Justice',
    nameArabic: 'النزاهة والعدالة',
    icon: Scale,
    ethicalPrinciple: 'Justice and Accountability',
    color: '#3b82f6',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-700'
  },
  {
    id: 4,
    name: 'Meaning & Contribution',
    nameArabic: 'المعنى والمساهمة',
    icon: Heart,
    ethicalPrinciple: 'Service',
    color: '#22c55e',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    textColor: 'text-green-700'
  },
  {
    id: 3,
    name: 'Growth & Achievement',
    nameArabic: 'النمو والإنجاز',
    icon: TrendingUp,
    ethicalPrinciple: 'Striving with Excellence',
    color: '#eab308',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    textColor: 'text-yellow-700'
  },
  {
    id: 2,
    name: 'Belonging & Loyalty',
    nameArabic: 'الانتماء والولاء',
    icon: UsersIcon,
    ethicalPrinciple: 'Human Dignity',
    color: '#f97316',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    textColor: 'text-orange-700'
  },
  {
    id: 1,
    name: 'Safety & Survival',
    nameArabic: 'الأمان والبقاء',
    icon: Shield,
    ethicalPrinciple: 'Preservation of Life',
    color: '#ef4444',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-700'
  }
];

interface CompanyReport {
  participationRate?: number;
  totalResponses?: number;
  tenantValues?: {
    values: string[];
    mappings: Array<{ value: string; cylinder: number }>;
    analysis: string;
    dominantCylinders: Array<{ cylinder: number; name: string; count: number }>;
    culturalOrientation: string;
  };
  employeeExperience?: {
    current: {
      topValues: Array<{ value: string; count: number }>;
      analysis: string;
      alignment: number;
      gaps: string[];
    };
    desired: {
      topValues: Array<{ value: string; count: number }>;
      analysis: string;
      alignment: number;
      aspirationalGaps: string[];
    };
  };
  culturalHealth?: {
    overallScore: number;
    status: string;
    strengths: string[];
    challenges: string[];
    cylinderDistribution: Record<number, number>;
  };
  engagement?: {
    average: number;
    median: number;
    distribution: Record<number, number>;
    trend: string;
  };
  recognition?: {
    average: number;
    median: number;
    distribution: Record<number, number>;
    trend: string;
  };
  recommendations?: string[];
  nextSteps?: string[];
}

/**
 * Culture Results Dashboard Page
 * Production-ready: Company-wide culture analysis results
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function CultureResultsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('');
  const [report, setReport] = useState<CompanyReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || 'employee');
        setUserName(payload.name || 'User');

        // Role-based access control
        const allowedRoles = ['superadmin', 'clientAdmin', 'manager'];
        if (!allowedRoles.includes(payload.role)) {
          router.push('/dashboard');
          return;
        }

        await fetchReport();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchReport = async () => {
    try {
      setError(null);
      const response = await apiClient.get<{ success: boolean; report: CompanyReport }>('/api/culture-assessment/report/company');
      if (response.data.success) {
        setReport(response.data.report);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('404')) {
        setError('No culture assessments found. Please distribute and complete surveys first.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load culture report');
      }
      logger.error('Error fetching report:', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchReport();
    setRefreshing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-100', text: 'text-green-700', label: 'Excellent' };
    if (score >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Good' };
    if (score >= 40) return { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Needs Improvement' };
    return { bg: 'bg-red-100', text: 'text-red-700', label: 'Critical' };
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const exportReport = () => {
    if (!report) return;
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `culture-company-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mizan-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Culture Analysis Results</h1>
                <p className="text-sm text-gray-600">
                  Company-wide cultural health assessment
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/culture')}
                className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Culture</span>
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-lg font-medium text-yellow-900 mb-2">No Results Available</p>
              <p className="text-yellow-700">{error}</p>
              <button
                onClick={() => router.push('/dashboard/culture/survey')}
                className="mt-4 px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors"
              >
                Go to Survey Management
              </button>
            </div>
          </div>
        ) : report ? (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={exportReport}
                className="px-4 py-2 bg-mizan-primary text-white rounded-lg hover:bg-mizan-primary/90 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            {/* Overall Health Score */}
            {report.culturalHealth && (
              <div className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${getScoreColor(report.culturalHealth.overallScore).bg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Overall Cultural Health</p>
                    <h2 className={`text-5xl font-bold ${getScoreColor(report.culturalHealth.overallScore).text}`}>
                      {report.culturalHealth.overallScore}/100
                    </h2>
                    <p className={`text-sm mt-2 ${getScoreColor(report.culturalHealth.overallScore).text}`}>
                      {getScoreColor(report.culturalHealth.overallScore).label} - {report.culturalHealth.status}
                    </p>
                  </div>
                  <Heart className={`w-16 h-16 ${getScoreColor(report.culturalHealth.overallScore).text}`} />
                </div>
              </div>
            )}

            {/* Participation & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.participationRate !== undefined && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Participation Rate</p>
                  <p className="text-3xl font-bold text-mizan-primary">{report.participationRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">{report.totalResponses || 0} responses</p>
                </div>
              )}

              {report.engagement && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-600">Engagement Score</p>
                    {getTrendIcon(report.engagement.trend)}
                  </div>
                  <p className="text-3xl font-bold text-mizan-primary">{report.engagement.average.toFixed(1)}/5</p>
                  <p className="text-xs text-gray-500 mt-1">Median: {report.engagement.median.toFixed(1)}</p>
                </div>
              )}

              {report.recognition && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-600">Recognition Score</p>
                    {getTrendIcon(report.recognition.trend)}
                  </div>
                  <p className="text-3xl font-bold text-mizan-primary">{report.recognition.average.toFixed(1)}/5</p>
                  <p className="text-xs text-gray-500 mt-1">Median: {report.recognition.median.toFixed(1)}</p>
                </div>
              )}
            </div>

            {/* Cylinder Distribution */}
            {report.culturalHealth?.cylinderDistribution && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-mizan-primary mb-6">7-Cylinder Distribution</h3>
                <div className="space-y-4">
                  {CYLINDERS.map((cylinder) => {
                    const Icon = cylinder.icon;
                    const value = report.culturalHealth?.cylinderDistribution[cylinder.id] || 0;
                    return (
                      <div key={cylinder.id} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${cylinder.bgColor} ${cylinder.borderColor} border-2 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${cylinder.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-mizan-primary">{cylinder.name}</span>
                            <span className={`text-sm font-bold ${cylinder.textColor}`}>{value}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${value}%`, backgroundColor: cylinder.color }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Strengths & Challenges */}
            {report.culturalHealth && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
                  <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Cultural Strengths</span>
                  </h3>
                  <ul className="space-y-2">
                    {(report.culturalHealth.strengths || []).map((strength, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-green-700">
                        <span className="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                    {(!report.culturalHealth.strengths || report.culturalHealth.strengths.length === 0) && (
                      <li className="text-gray-500 italic">No strengths identified yet</li>
                    )}
                  </ul>
                </div>

                {/* Challenges */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>Improvement Areas</span>
                  </h3>
                  <ul className="space-y-2">
                    {(report.culturalHealth.challenges || []).map((challenge, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-orange-700">
                        <span className="w-2 h-2 mt-2 bg-orange-500 rounded-full flex-shrink-0" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                    {(!report.culturalHealth.challenges || report.culturalHealth.challenges.length === 0) && (
                      <li className="text-gray-500 italic">No challenges identified</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* Employee Experience Analysis */}
            {report.employeeExperience && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-mizan-primary mb-6">Employee Experience Analysis</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Experience */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-mizan-primary mb-3">Current Experience</h4>
                    <p className="text-sm text-gray-600 mb-4">{report.employeeExperience.current.analysis}</p>

                    <p className="text-xs font-medium text-gray-500 mb-2">Top Values Experienced:</p>
                    <div className="flex flex-wrap gap-2">
                      {report.employeeExperience.current.topValues.slice(0, 5).map((v, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
                          {v.value} ({v.count})
                        </span>
                      ))}
                    </div>

                    {report.employeeExperience.current.gaps.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-red-600 mb-2">Gaps Identified:</p>
                        <ul className="space-y-1">
                          {report.employeeExperience.current.gaps.map((gap, idx) => (
                            <li key={idx} className="text-sm text-red-600 flex items-start space-x-1">
                              <span>-</span>
                              <span>{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Desired Experience */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-medium text-mizan-primary mb-3">Desired Future Experience</h4>
                    <p className="text-sm text-gray-600 mb-4">{report.employeeExperience.desired.analysis}</p>

                    <p className="text-xs font-medium text-gray-500 mb-2">Aspirational Values:</p>
                    <div className="flex flex-wrap gap-2">
                      {report.employeeExperience.desired.topValues.slice(0, 5).map((v, idx) => (
                        <span key={idx} className="px-3 py-1 bg-mizan-gold/10 border border-mizan-gold/20 rounded-full text-sm text-mizan-gold">
                          {v.value} ({v.count})
                        </span>
                      ))}
                    </div>

                    {report.employeeExperience.desired.aspirationalGaps.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-mizan-gold mb-2">Aspirational Gaps:</p>
                        <ul className="space-y-1">
                          {report.employeeExperience.desired.aspirationalGaps.map((gap, idx) => (
                            <li key={idx} className="text-sm text-mizan-gold flex items-start space-x-1">
                              <span>-</span>
                              <span>{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {report.recommendations && report.recommendations.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-mizan-primary mb-4">AI Recommendations</h3>
                <div className="space-y-3">
                  {report.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-4 bg-mizan-gold/5 rounded-xl border border-mizan-gold/20">
                      <span className="w-6 h-6 bg-mizan-gold text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-mizan-primary">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Next Steps */}
            {report.nextSteps && report.nextSteps.length > 0 && (
              <div className="bg-gradient-to-br from-mizan-primary to-mizan-primary/80 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Recommended Next Steps</h3>
                <div className="space-y-2">
                  {report.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                      <span className="w-6 h-6 bg-white text-mizan-primary rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-mizan-gold" />
          </div>
        )}
      </div>
    </div>
  );
}
