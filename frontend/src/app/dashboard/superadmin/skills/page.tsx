'use client';

import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BookOpen,
  Users,
  Target,
  Zap,
  AlertCircle,
  Loader2,
  CheckCircle2,
  BarChart3,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  UserPlus
} from 'lucide-react';
import { TenantSelector } from '@/components/dashboard';
import { ConversationalBOT } from '@/components/skills/ConversationalBOT';
import { SkillsFrameworkIntro } from '@/components/skills/SkillsFrameworkIntro';

interface SkillGap {
  skill: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  affectedEmployees: number;
}

interface SkillSurplus {
  skill: string;
  category: string;
  currentLevel: number;
  utilization: number;
  opportunity: string;
}

interface Recommendation {
  category: 'training' | 'hiring' | 'reallocation' | 'development';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionItems: string[];
  estimatedCost?: string;
  estimatedTime?: string;
  expectedROI?: string;
}

interface SkillsAnalysisOutput {
  overallCoverage: number;
  skillGaps: SkillGap[];
  skillSurplus: SkillSurplus[];
  recommendations: Recommendation[];
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

type ViewMode = 'analysis' | 'profile-builder';

export default function SkillsAnalysisPage() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('analysis');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<SkillsAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFrameworkIntro, setShowFrameworkIntro] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedTenant) {
      setError('Please select a client first');
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyses/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
        },
        body: JSON.stringify({
          tenantId: selectedTenant.id,
          targetType: 'company'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Skills analysis failed');
      }

      const analysisResults = await response.json();
      setResults(analysisResults);
    } catch (err: any) {
      console.error('Skills analysis error:', err);
      setError(err.message || 'Failed to analyze skills');
    } finally {
      setAnalyzing(false);
    }
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return { bg: 'bg-green-50 border-green-200', text: 'text-green-700', label: 'Excellent' };
    if (coverage >= 60) return { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', label: 'Good' };
    if (coverage >= 40) return { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', label: 'Fair' };
    return { bg: 'bg-red-50 border-red-200', text: 'text-red-700', label: 'Critical' };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', icon: AlertTriangle };
      case 'high': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', icon: TrendingUp };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300', icon: Target };
      case 'low': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', icon: CheckCircle2 };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', icon: AlertCircle };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'training': return BookOpen;
      case 'hiring': return Users;
      case 'reallocation': return Zap;
      case 'development': return TrendingUp;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'training': return 'bg-blue-100 text-blue-700';
      case 'hiring': return 'bg-purple-100 text-purple-700';
      case 'reallocation': return 'bg-amber-100 text-amber-700';
      case 'development': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Show framework intro if requested and results exist
  if (showFrameworkIntro && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 p-4 md:p-8">
        <SkillsFrameworkIntro onContinue={() => setShowFrameworkIntro(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-mizan-primary mb-2">Skills Analysis</h1>
        <p className="text-mizan-secondary">
          Analyze skill gaps, build employee profiles, and optimize talent allocation
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
          label="Select Client for Skills Analysis"
          placeholder="Choose a client to analyze their skills matrix..."
          required
        />
      </div>

      {/* Tab Navigation */}
      {selectedTenant && (
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('analysis')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-400 flex items-center justify-center space-x-2 ${
                viewMode === 'analysis'
                  ? 'bg-mizan-gold text-white shadow-md'
                  : 'text-mizan-secondary hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Skills Gap Analysis</span>
            </button>
            <button
              onClick={() => setViewMode('profile-builder')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-400 flex items-center justify-center space-x-2 ${
                viewMode === 'profile-builder'
                  ? 'bg-mizan-gold text-white shadow-md'
                  : 'text-mizan-secondary hover:bg-gray-50'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span>AI Profile Builder</span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Builder View */}
      {selectedTenant && viewMode === 'profile-builder' && (
        <div className="space-y-6">
          <ConversationalBOT
            employeeId="demo-employee"
            tenantId={selectedTenant.id}
            onProfileUpdate={(profileData) => {
              console.log('Profile updated:', profileData);
            }}
          />
        </div>
      )}

      {/* Skills Analysis View */}
      {selectedTenant && viewMode === 'analysis' && (
        <>
          {/* Info Card */}
          {!results && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <Award className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-2">About Skills Analysis</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Our AI-powered skills analysis uses 7 frameworks and multi-AI consensus to:
                  </p>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Identify critical skill gaps across your organization (O*NET, SFIA)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Detect underutilized skills and reallocation opportunities</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Generate personalized training plans (70-20-10 Learning Model)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Align skills with market demand (LinkedIn Skills Genome)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Measure soft skills and EQ for leadership readiness</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

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
                    <span>Analyzing Skills Matrix...</span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-5 h-5" />
                    <span>Run Skills Analysis</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Learn About Frameworks Button */}
              <div className="bg-gradient-to-r from-mizan-gold/10 to-mizan-background rounded-xl p-4 border border-mizan-gold/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-6 h-6 text-mizan-gold" />
                    <div>
                      <h3 className="font-semibold text-mizan-primary">Want to understand how we analyzed your skills?</h3>
                      <p className="text-sm text-mizan-secondary">Learn about the 7 AI frameworks powering this analysis</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFrameworkIntro(true)}
                    className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-all duration-400 font-medium text-sm"
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Overall Coverage */}
              <div className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${getCoverageColor(results.overallCoverage).bg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-mizan-secondary text-sm font-medium mb-1">Overall Skills Coverage</p>
                    <h2 className={`text-5xl font-bold ${getCoverageColor(results.overallCoverage).text}`}>
                      {results.overallCoverage}%
                    </h2>
                    <p className={`text-sm mt-2 ${getCoverageColor(results.overallCoverage).text}`}>
                      {getCoverageColor(results.overallCoverage).label}
                    </p>
                  </div>
                  <div className="text-center">
                    <Award className={`w-16 h-16 ${getCoverageColor(results.overallCoverage).text} mb-2`} />
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-medium ${getCoverageColor(results.overallCoverage).text}`}>
                        {results.skillGaps.length} gaps • {results.skillSurplus.length} surplus
                      </span>
                    </div>
                  </div>
                </div>
              </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-mizan-primary">Critical Gaps</h3>
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">
                {results.skillGaps.filter(g => g.priority === 'critical').length}
              </p>
              <p className="text-xs text-mizan-secondary mt-1">Require immediate attention</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-mizan-primary">High Priority</h3>
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {results.skillGaps.filter(g => g.priority === 'high').length}
              </p>
              <p className="text-xs text-mizan-secondary mt-1">Plan within 3 months</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-mizan-primary">Opportunities</h3>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">
                {results.skillSurplus.length}
              </p>
              <p className="text-xs text-mizan-secondary mt-1">Underutilized skills</p>
            </div>
          </div>

          {/* Skill Gaps */}
          {results.skillGaps.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-mizan-primary mb-6">Skill Gaps</h3>
              <div className="space-y-4">
                {results.skillGaps
                  .sort((a, b) => {
                    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                  })
                  .map((gap, idx) => {
                    const priorityConfig = getPriorityColor(gap.priority);
                    const PriorityIcon = priorityConfig.icon;

                    return (
                      <div
                        key={idx}
                        className={`p-5 rounded-xl border-2 ${priorityConfig.border} ${priorityConfig.bg}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-semibold text-mizan-primary">{gap.skill}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityConfig.bg} ${priorityConfig.text} border ${priorityConfig.border} flex items-center space-x-1`}>
                                <PriorityIcon className="w-3 h-3" />
                                <span>{gap.priority.toUpperCase()}</span>
                              </span>
                            </div>
                            <p className="text-sm text-mizan-secondary mb-3">
                              Category: {gap.category} • {gap.affectedEmployees} employees affected
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-mizan-secondary mb-1">Current Level</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-orange-500 rounded-full"
                                  style={{ width: `${gap.currentLevel}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-orange-600">{gap.currentLevel}%</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-mizan-secondary mb-1">Required Level</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${gap.requiredLevel}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-green-600">{gap.requiredLevel}%</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-mizan-secondary mb-1">Gap</p>
                            <div className="flex items-center space-x-2">
                              <ArrowDownRight className={`w-4 h-4 ${priorityConfig.text}`} />
                              <span className={`text-lg font-bold ${priorityConfig.text}`}>
                                {gap.gap}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Skill Surplus */}
          {results.skillSurplus.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-mizan-primary mb-6">Underutilized Skills (Opportunities)</h3>
              <div className="space-y-4">
                {results.skillSurplus.map((surplus, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border-2 border-green-200 bg-green-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <h4 className="text-lg font-semibold text-mizan-primary">{surplus.skill}</h4>
                        </div>
                        <p className="text-sm text-mizan-secondary mb-1">
                          Category: {surplus.category}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-mizan-secondary mb-1">Current Level</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${surplus.currentLevel}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-green-600">{surplus.currentLevel}%</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-mizan-secondary mb-1">Utilization</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-500 rounded-full"
                              style={{ width: `${surplus.utilization}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-amber-600">{surplus.utilization}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white border border-green-200 rounded-lg">
                      <p className="text-xs font-medium text-green-900 mb-1">Opportunity:</p>
                      <p className="text-sm text-green-700">{surplus.opportunity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-mizan-primary mb-6">Recommendations</h3>
            <div className="space-y-4">
              {results.recommendations.map((rec, idx) => {
                const CategoryIcon = getCategoryIcon(rec.category);
                const priorityConfig = getPriorityColor(rec.priority);

                return (
                  <div key={idx} className="p-5 border-2 rounded-xl bg-gray-50 border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${getCategoryColor(rec.category)}`}>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityConfig.bg} ${priorityConfig.text} border ${priorityConfig.border}`}>
                              {rec.priority.toUpperCase()}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(rec.category)}`}>
                              {rec.category.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-mizan-primary mb-2">{rec.title}</h4>
                    <p className="text-sm text-mizan-secondary mb-4">{rec.description}</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-semibold text-mizan-primary">Action Items:</p>
                      <ul className="space-y-2">
                        {rec.actionItems.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start space-x-2 text-sm text-mizan-secondary">
                            <CheckCircle2 className="w-4 h-4 text-mizan-gold flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {(rec.estimatedCost || rec.estimatedTime || rec.expectedROI) && (
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                        {rec.estimatedCost && (
                          <div>
                            <p className="text-xs text-mizan-secondary mb-1">Estimated Cost</p>
                            <p className="text-sm font-semibold text-mizan-primary">{rec.estimatedCost}</p>
                          </div>
                        )}
                        {rec.estimatedTime && (
                          <div>
                            <p className="text-xs text-mizan-secondary mb-1">Timeline</p>
                            <p className="text-sm font-semibold text-mizan-primary">{rec.estimatedTime}</p>
                          </div>
                        )}
                        {rec.expectedROI && (
                          <div>
                            <p className="text-xs text-mizan-secondary mb-1">Expected ROI</p>
                            <p className="text-sm font-semibold text-green-600">{rec.expectedROI}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
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
                    link.download = `skills-analysis-${selectedTenant?.name}-${new Date().toISOString().split('T')[0]}.json`;
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
          <Award className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mizan-primary mb-2">
            Select a Client to Begin
          </h3>
          <p className="text-mizan-secondary">
            Choose a client from the dropdown above to analyze their skills matrix
          </p>
        </div>
      )}
    </div>
  );
}
