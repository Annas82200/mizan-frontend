'use client';

import React, { useState } from 'react';
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
  CheckCircle2,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';
import { TenantSelector, SurveyManagementView, IndividualEmployeeView, DepartmentAggregatedView } from '@/components/dashboard';

// Helper to format rich text with subtitles
const formatDescription = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return (
        <span key={index} className="block mt-4 mb-2 text-xs font-semibold text-mizan-gold uppercase tracking-wider">
          {content}
        </span>
      );
    }
    return part.split('\n').map((line, lineIdx) => (
      line.trim() ? <span key={`${index}-${lineIdx}`} className="block">{line}</span> : null
    ));
  });
};

// 7-Cylinder Framework - Approved Configuration
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

interface CultureAnalysisOutput {
  entropyScore: number;
  cylinderHealth: {
    [cylinderId: number]: {
      status: 'healthy' | 'moderate' | 'unhealthy' | 'missing';
      enablingRatio: number;
      limitingRatio: number;
      dominantValues: string[];
    };
  };
  valueGaps: {
    personalVsCompany: Array<{
      value: string;
      personalScore: number;
      companyScore: number;
      gap: number;
    }>;
    currentVsDesired: Array<{
      value: string;
      currentScore: number;
      desiredScore: number;
      gap: number;
    }>;
  };
  recommendations: Array<{
    category: string;
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    actionItems: string[];
    expectedImpact: string;
  }>;
}

interface Tenant {
  id: string;
  name: string;
  industry?: string | null;
  plan: string;
  status: string;
  employeeCount?: number | null;
  userCount?: number;
}

type ViewMode = 'analysis' | 'survey-management' | 'individual' | 'aggregated';

export default function CultureAnalysisPage() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('analysis');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<CultureAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedTenant) {
      setError('Please select a client first');
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);

      // ✅ PRODUCTION: Use httpOnly cookies for authentication (Phase 1 Security)
      // Get token from localStorage for Authorization header (hybrid auth)
      const token = localStorage.getItem('mizan_auth_token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyses/culture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: 'include',  // Send httpOnly cookie automatically
        body: JSON.stringify({
          tenantId: selectedTenant.id,
          targetType: 'company'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const analysisResults = await response.json();
      setResults(analysisResults);
    } catch (err: unknown) {
      console.error('Culture analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze culture');
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' };
      case 'moderate': return { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' };
      case 'unhealthy': return { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' };
      case 'missing': return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEntropyColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-green-50 border-green-200', text: 'text-green-700', label: 'Excellent Alignment' };
    if (score >= 60) return { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', label: 'Moderate Alignment' };
    return { bg: 'bg-red-50 border-red-200', text: 'text-red-700', label: 'Needs Improvement' };
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-mizan-primary mb-2">Culture Analysis</h1>
        <p className="text-mizan-secondary">
          Analyze organizational culture using the Mizan 7-Cylinder Framework
        </p>
      </div>

      {/* Tenant Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <TenantSelector
          selectedTenantId={selectedTenant?.id || null}
          onSelectTenant={(id, tenant) => {
            setSelectedTenant(tenant);
            setResults(null);
            setError(null);
          }}
          label="Select Client for Culture Analysis"
          placeholder="Choose a client to analyze their organizational culture..."
          required
        />
      </div>

      {/* Tab Navigation */}
      {selectedTenant && (
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('analysis')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-400 ${
                viewMode === 'analysis'
                  ? 'bg-mizan-gold text-white shadow-md'
                  : 'text-mizan-secondary hover:bg-gray-50'
              }`}
            >
              Organization Analysis
            </button>
            <button
              onClick={() => setViewMode('survey-management')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-400 ${
                viewMode === 'survey-management'
                  ? 'bg-mizan-gold text-white shadow-md'
                  : 'text-mizan-secondary hover:bg-gray-50'
              }`}
            >
              Survey Management
            </button>
            <button
              onClick={() => setViewMode('individual')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-400 ${
                viewMode === 'individual'
                  ? 'bg-mizan-gold text-white shadow-md'
                  : 'text-mizan-secondary hover:bg-gray-50'
              }`}
            >
              Individual Employees
            </button>
            <button
              onClick={() => setViewMode('aggregated')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-400 ${
                viewMode === 'aggregated'
                  ? 'bg-mizan-gold text-white shadow-md'
                  : 'text-mizan-secondary hover:bg-gray-50'
              }`}
            >
              Department View
            </button>
          </div>
        </div>
      )}

      {/* Survey Management View */}
      {selectedTenant && viewMode === 'survey-management' && (
        <SurveyManagementView tenantId={selectedTenant.id} tenantName={selectedTenant.name} />
      )}

      {/* Individual Employee View */}
      {selectedTenant && viewMode === 'individual' && (
        <IndividualEmployeeView tenantId={selectedTenant.id} tenantName={selectedTenant.name} />
      )}

      {/* Department Aggregated View */}
      {selectedTenant && viewMode === 'aggregated' && (
        <DepartmentAggregatedView tenantId={selectedTenant.id} tenantName={selectedTenant.name} />
      )}

      {/* Organization Analysis View */}
      {selectedTenant && viewMode === 'analysis' && (
        <>
          {/* 7-Cylinder Framework Overview */}
          <div className="bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 rounded-2xl p-8 border border-mizan-gold/20">
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-8 h-8 text-mizan-gold" />
              <h2 className="text-2xl font-bold text-mizan-primary">The Mizan 7-Cylinder Framework</h2>
            </div>
            <p className="text-mizan-secondary mb-6">
              A values-based cultural assessment system rooted in Islamic ethics (Maqasid al-Shariah), measuring organizational health across seven consciousness levels.
            </p>

            {/* First Row - 4 Cylinders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {CYLINDERS.slice(0, 4).map((cylinder) => {
                const Icon = cylinder.icon;
                return (
                  <div
                    key={cylinder.id}
                    className={`${cylinder.bgColor} ${cylinder.borderColor} border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className={`w-6 h-6 ${cylinder.textColor}`} />
                      <span className={`text-xs font-bold ${cylinder.textColor}`}>
                        CYLINDER {cylinder.id}
                      </span>
                    </div>
                    <h3 className="font-bold text-mizan-primary mb-1">{cylinder.name}</h3>
                    <p className="text-sm text-mizan-secondary mb-2">{cylinder.nameArabic}</p>
                    <p className="text-xs text-mizan-secondary italic">{cylinder.ethicalPrinciple}</p>
                  </div>
                );
              })}
            </div>

            {/* Second Row - 3 Cylinders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CYLINDERS.slice(4, 7).map((cylinder) => {
                const Icon = cylinder.icon;
                return (
                  <div
                    key={cylinder.id}
                    className={`${cylinder.bgColor} ${cylinder.borderColor} border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className={`w-6 h-6 ${cylinder.textColor}`} />
                      <span className={`text-xs font-bold ${cylinder.textColor}`}>
                        CYLINDER {cylinder.id}
                      </span>
                    </div>
                    <h3 className="font-bold text-mizan-primary mb-1">{cylinder.name}</h3>
                    <p className="text-sm text-mizan-secondary mb-2">{cylinder.nameArabic}</p>
                    <p className="text-xs text-mizan-secondary italic">{cylinder.ethicalPrinciple}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analyze Button */}
          {!results && (
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
                    <span>Analyzing Culture...</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    <span>Run Culture Analysis</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-6">
          {/* Entropy Score */}
          <div className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${getEntropyColor(results.entropyScore).bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-mizan-secondary text-sm font-medium mb-1">Cultural Entropy Score</p>
                <h2 className={`text-5xl font-bold ${getEntropyColor(results.entropyScore).text}`}>
                  {results.entropyScore}/100
                </h2>
                <p className={`text-sm mt-2 ${getEntropyColor(results.entropyScore).text}`}>
                  {getEntropyColor(results.entropyScore).label}
                </p>
              </div>
              <Heart className={`w-16 h-16 ${getEntropyColor(results.entropyScore).text}`} />
            </div>
          </div>

          {/* Cylinder Health */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-mizan-primary mb-6">7-Cylinder Health Assessment</h3>
            <div className="space-y-4">
              {CYLINDERS.map((cylinder) => {
                const health = results.cylinderHealth[cylinder.id];
                if (!health) return null;

                const Icon = cylinder.icon;
                const statusColors = getStatusColor(health.status);

                return (
                  <div
                    key={cylinder.id}
                    className={`${cylinder.bgColor} ${cylinder.borderColor} border-2 rounded-xl p-6`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-12 h-12 ${cylinder.bgColor} border-2 ${cylinder.borderColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-6 h-6 ${cylinder.textColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-mizan-primary">
                              Cylinder {cylinder.id}: {cylinder.name}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text} flex items-center space-x-1`}>
                              <span className={`w-2 h-2 rounded-full ${statusColors.dot}`}></span>
                              <span>{health.status.toUpperCase()}</span>
                            </span>
                          </div>
                          <p className="text-sm text-mizan-secondary">{cylinder.nameArabic}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-mizan-secondary mb-1">Enabling Ratio</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full transition-all duration-500"
                              style={{ width: `${health.enablingRatio}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-green-600">{health.enablingRatio}%</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-mizan-secondary mb-1">Limiting Ratio</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full transition-all duration-500"
                              style={{ width: `${health.limitingRatio}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-red-600">{health.limitingRatio}%</span>
                        </div>
                      </div>
                    </div>

                    {health.dominantValues.length > 0 && (
                      <div>
                        <p className="text-xs text-mizan-secondary mb-2">Dominant Values</p>
                        <div className="flex flex-wrap gap-2">
                          {health.dominantValues.map((value, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1 ${cylinder.bgColor} border ${cylinder.borderColor} ${cylinder.textColor} rounded-full text-xs font-medium`}
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value Gaps - Personal vs Company */}
          {results.valueGaps.personalVsCompany.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-mizan-primary mb-4">Personal vs Company Values Gap</h3>
              <div className="space-y-3">
                {results.valueGaps.personalVsCompany
                  .sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))
                  .slice(0, 10)
                  .map((gap, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-mizan-primary">{gap.value}</span>
                        <span className={`text-sm font-bold ${Math.abs(gap.gap) > 30 ? 'text-red-600' : Math.abs(gap.gap) > 15 ? 'text-yellow-600' : 'text-green-600'}`}>
                          Gap: {Math.abs(gap.gap)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-mizan-secondary mb-1">Personal</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${gap.personalScore}%` }} />
                            </div>
                            <span className="text-xs font-bold text-blue-600">{gap.personalScore}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-mizan-secondary mb-1">Company</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-mizan-gold rounded-full" style={{ width: `${gap.companyScore}%` }} />
                            </div>
                            <span className="text-xs font-bold text-mizan-gold">{gap.companyScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Value Gaps - Current vs Desired */}
          {results.valueGaps.currentVsDesired.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-mizan-primary mb-4">Current vs Desired Culture Gap</h3>
              <div className="space-y-3">
                {results.valueGaps.currentVsDesired
                  .sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))
                  .slice(0, 10)
                  .map((gap, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-mizan-primary">{gap.value}</span>
                        <span className={`text-sm font-bold ${Math.abs(gap.gap) > 30 ? 'text-red-600' : Math.abs(gap.gap) > 15 ? 'text-yellow-600' : 'text-green-600'}`}>
                          Gap: {Math.abs(gap.gap)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-mizan-secondary mb-1">Current</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-500 rounded-full" style={{ width: `${gap.currentScore}%` }} />
                            </div>
                            <span className="text-xs font-bold text-orange-600">{gap.currentScore}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-mizan-secondary mb-1">Desired</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: `${gap.desiredScore}%` }} />
                            </div>
                            <span className="text-xs font-bold text-green-600">{gap.desiredScore}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-mizan-primary mb-4">Recommendations</h3>
            <div className="space-y-4">
              {results.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 border-2 rounded-xl bg-gray-50 border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </span>
                        <span className="px-3 py-1 bg-mizan-primary/10 text-mizan-primary rounded-full text-xs font-medium">
                          {rec.category.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-mizan-primary mb-2">{rec.title}</h4>
                      <div className="text-sm text-mizan-secondary mb-3 leading-relaxed">
                        {formatDescription(rec.description)}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-mizan-primary">Action Items:</p>
                        <ul className="space-y-1">
                          {rec.actionItems.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start space-x-2 text-sm text-mizan-secondary">
                              <CheckCircle2 className="w-4 h-4 text-mizan-gold flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs font-medium text-green-900 mb-1">Expected Impact:</p>
                        <p className="text-sm text-green-700">{rec.expectedImpact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(results, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `culture-analysis-${selectedTenant?.name}-${new Date().toISOString().split('T')[0]}.json`;
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
        </>
      )}

      {/* Empty State */}
      {!selectedTenant && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <Heart className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mizan-primary mb-2">
            Select a Client to Begin
          </h3>
          <p className="text-mizan-secondary">
            Choose a client from the dropdown above to analyze their organizational culture
          </p>
        </div>
      )}
    </div>
  );
}
