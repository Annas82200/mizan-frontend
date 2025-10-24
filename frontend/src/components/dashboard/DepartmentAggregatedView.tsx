'use client';

import React, { useState } from 'react';
import { Building2, TrendingUp, TrendingDown, AlertTriangle, Target, Loader2, BarChart3, Users } from 'lucide-react';

interface DepartmentAggregatedViewProps {
  tenantId: string;
  tenantName: string;
}

interface DepartmentAnalysis {
  department: string;
  employeeCount: number;
  responseRate: number;
  healthySurveyQuestion: string;
  overallAssessment: string;
  entropyScore: number;
  healthScore: number;
  intendedCulture: {
    values: string[];
    interpretation: string;
    cylindersEmphasized: number[];
  };
  currentReality: {
    values: string[];
    interpretation: string;
    healthyCylinders: number[];
    unhealthyCylinders: number[];
  };
  gapAnalysis: {
    intendedVsCurrent: {
      gap: string;
      interpretation: string;
      affectedCylinders: number[];
    };
    intendedVsDesired: {
      gap: string;
      interpretation: string;
      misalignment: boolean;
    };
    currentVsDesired: {
      gap: string;
      interpretation: string;
      urgentChanges: string[];
    };
  };
  engagement: {
    averageScore: number;
    interpretation: string;
    byDepartment: Array<{ dept: string; score: number }>;
  };
  recognition: {
    averageScore: number;
    interpretation: string;
    byDepartment: Array<{ dept: string; score: number }>;
  };
  threatsAndRisks: Array<{
    type: string;
    severity: 'critical' | 'high' | 'medium';
    description: string;
  }>;
  recommendations: Array<{
    priority: 'critical' | 'high' | 'medium';
    category: string;
    title: string;
    description: string;
    actionItems: string[];
    expectedImpact: string;
    timeframe: string;
  }>;
}

export function DepartmentAggregatedView({ tenantId, tenantName }: DepartmentAggregatedViewProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DepartmentAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    try {
      setAnalyzing(true);
      setError(null);

      // ✅ PRODUCTION: Use httpOnly cookies for authentication (Phase 1 Security)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/culture-assessment/report/company?tenantId=${tenantId}`, {
        method: 'GET',
        credentials: 'include'  // Send httpOnly cookie automatically
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load analysis');
      }

      const data = await response.json();

      // Transform the backend report structure to frontend expected structure
      const report = data.report || {};

      const transformedAnalysis: DepartmentAnalysis = {
        department: selectedDepartment === 'all' ? 'Organization' : selectedDepartment,
        employeeCount: report.totalEmployees || 0,
        responseRate: report.responseRate || 0,
        healthySurveyQuestion: report.healthySurveyQuestion || 'Is your culture healthy?',
        overallAssessment: report.overallVerdict || 'Analysis in progress...',
        entropyScore: report.entropyScore || 0,
        healthScore: report.healthScore || (report.entropyScore ? 100 - report.entropyScore : 0),
        intendedCulture: {
          values: report.intendedCulture?.values || [],
          interpretation: report.intendedCulture?.interpretation || 'No company values defined yet',
          cylindersEmphasized: report.intendedCulture?.cylinders || []
        },
        currentReality: {
          values: report.currentReality?.values || [],
          interpretation: report.currentReality?.interpretation || 'Gathering employee feedback...',
          healthyCylinders: report.currentReality?.healthyCylinders || [],
          unhealthyCylinders: report.currentReality?.unhealthyCylinders || []
        },
        gapAnalysis: {
          intendedVsCurrent: {
            gap: report.gaps?.intendedVsCurrent?.score?.toString() || '0',
            interpretation: report.gaps?.intendedVsCurrent?.analysis || 'Analysis in progress...',
            affectedCylinders: report.gaps?.intendedVsCurrent?.affectedCylinders || []
          },
          intendedVsDesired: {
            gap: report.gaps?.intendedVsDesired?.score?.toString() || '0',
            interpretation: report.gaps?.intendedVsDesired?.analysis || 'Analysis in progress...',
            misalignment: report.gaps?.intendedVsDesired?.misalignment || false
          },
          currentVsDesired: {
            gap: report.gaps?.currentVsDesired?.score?.toString() || '0',
            interpretation: report.gaps?.currentVsDesired?.analysis || 'Analysis in progress...',
            urgentChanges: report.gaps?.currentVsDesired?.urgentChanges || []
          }
        },
        engagement: {
          averageScore: report.engagement?.average || 0,
          interpretation: report.engagement?.interpretation || '',
          byDepartment: report.engagement?.byDepartment || []
        },
        recognition: {
          averageScore: report.recognition?.average || 0,
          interpretation: report.recognition?.interpretation || '',
          byDepartment: report.recognition?.byDepartment || []
        },
        threatsAndRisks: report.threats || [],
        recommendations: report.recommendations || []
      };

      setAnalysis(transformedAnalysis);
    } catch (err: unknown) {
      console.error('Department analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load analysis';
      setError(errorMessage);
    } finally {
      setAnalyzing(false);
    }
  };

  const getEntropyColor = (score: number) => {
    if (score >= 70) return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
    if (score >= 40) return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
    return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  };

  const getSeverityColor = (severity: 'critical' | 'high' | 'medium') => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: 'text-red-600' };
      case 'high': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: 'text-orange-600' };
      case 'medium': return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: 'text-yellow-600' };
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Building2 className="w-6 h-6 text-mizan-gold" />
          <h2 className="text-2xl font-bold font-display text-mizan-primary">Department & Organization Analysis</h2>
        </div>
        <p className="text-mizan-secondary">
          Aggregated culture analysis for <span className="font-semibold text-mizan-primary">{tenantName}</span>
        </p>
      </div>

      {/* Department Selector & Analysis Trigger */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-mizan-primary mb-2">
              Select Department or Organization
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
            >
              <option value="all">All Organization</option>
              <option value="engineering">Engineering</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="hr">Human Resources</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={runAnalysis}
              disabled={analyzing}
              className="w-full px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md font-medium"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5" />
                  <span>Run Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Assessment */}
          <div className={`rounded-2xl p-6 border-2 ${getEntropyColor(analysis.healthScore).bg} ${getEntropyColor(analysis.healthScore).border}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold font-display text-mizan-primary mb-2">
                  {analysis.healthySurveyQuestion}
                </h3>
                <p className="text-mizan-secondary">{analysis.overallAssessment}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-mizan-secondary mb-1">Cultural Health</p>
                <p className={`text-4xl font-bold ${getEntropyColor(analysis.healthScore).text}`}>
                  {analysis.healthScore}
                </p>
                <p className="text-xs text-mizan-secondary">out of 100</p>
              </div>
            </div>
          </div>

          {/* Intended Culture */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-mizan-gold" />
              <h4 className="text-lg font-semibold font-display text-mizan-primary">Intended Culture (Leadership Vision)</h4>
            </div>
            <p className="text-sm text-mizan-secondary mb-4">{analysis.intendedCulture.interpretation}</p>
            <div className="flex flex-wrap gap-2">
              {analysis.intendedCulture.values.map((value, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium">
                  {value}
                </span>
              ))}
            </div>
          </div>

          {/* Current Reality */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold font-display text-mizan-primary mb-4">Current Reality (Employee Experience)</h4>
            <p className="text-sm text-mizan-secondary mb-4">{analysis.currentReality.interpretation}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-green-700 mb-2">Healthy Cylinders</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.currentReality.healthyCylinders.map((cyl) => (
                    <span key={cyl} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      C{cyl}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-700 mb-2">Unhealthy/Missing Cylinders</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.currentReality.unhealthyCylinders.map((cyl) => (
                    <span key={cyl} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                      C{cyl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gap Analysis */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold font-display text-mizan-primary mb-4">Gap Analysis</h4>
            <div className="space-y-4">
              {/* Intended vs Current */}
              <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                <p className="font-semibold text-mizan-primary text-sm mb-2">Intended vs Current (Say-Do Gap)</p>
                <p className="text-sm text-mizan-secondary">{analysis.gapAnalysis.intendedVsCurrent.interpretation}</p>
              </div>

              {/* Intended vs Desired */}
              {analysis.gapAnalysis.intendedVsDesired.misalignment && (
                <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <p className="font-semibold text-mizan-primary text-sm mb-2">Intended vs Desired (Vision Misalignment)</p>
                  <p className="text-sm text-mizan-secondary">{analysis.gapAnalysis.intendedVsDesired.interpretation}</p>
                </div>
              )}

              {/* Current vs Desired */}
              <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <p className="font-semibold text-mizan-primary text-sm mb-2">Current vs Desired (Improvement Opportunity)</p>
                <p className="text-sm text-mizan-secondary mb-3">{analysis.gapAnalysis.currentVsDesired.interpretation}</p>
                {analysis.gapAnalysis.currentVsDesired.urgentChanges.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-blue-700 mb-1">Most Urgent Changes:</p>
                    <ul className="space-y-1">
                      {analysis.gapAnalysis.currentVsDesired.urgentChanges.map((change, idx) => (
                        <li key={idx} className="text-xs text-blue-700">• {change}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Engagement & Recognition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-mizan-gold" />
                <h4 className="text-lg font-semibold font-display text-mizan-primary">Engagement</h4>
              </div>
              <p className="text-4xl font-bold text-mizan-primary mb-2">{analysis.engagement.averageScore.toFixed(1)}/5</p>
              <p className="text-sm text-mizan-secondary">{analysis.engagement.interpretation}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-mizan-gold" />
                <h4 className="text-lg font-semibold font-display text-mizan-primary">Recognition</h4>
              </div>
              <p className="text-4xl font-bold text-mizan-primary mb-2">{analysis.recognition.averageScore.toFixed(1)}/5</p>
              <p className="text-sm text-mizan-secondary">{analysis.recognition.interpretation}</p>
            </div>
          </div>

          {/* Threats & Risks */}
          {analysis.threatsAndRisks.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h4 className="text-lg font-semibold font-display text-mizan-primary">Threats & Risks</h4>
              </div>
              <div className="space-y-3">
                {analysis.threatsAndRisks.map((threat, idx) => {
                  const colors = getSeverityColor(threat.severity);
                  return (
                    <div key={idx} className={`p-4 rounded-xl border-2 ${colors.bg} ${colors.border}`}>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${colors.text}`}>
                              {threat.severity.toUpperCase()}
                            </span>
                            <span className="text-sm font-semibold text-mizan-primary">{threat.type}</span>
                          </div>
                          <p className="text-sm text-mizan-secondary">{threat.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-semibold font-display text-mizan-primary mb-4">Strategic Recommendations</h4>
            <div className="space-y-4">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 border-2 rounded-xl bg-gray-50 border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                          rec.priority === 'high' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                          'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                          {rec.priority.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 bg-mizan-primary/10 text-mizan-primary rounded-full text-xs font-medium">
                          {rec.category}
                        </span>
                      </div>
                      <h5 className="text-lg font-semibold font-display text-mizan-primary mb-2">{rec.title}</h5>
                      <div className="text-sm text-mizan-secondary mb-3 leading-relaxed">
                        {formatDescription(rec.description)}
                      </div>
                      <div className="space-y-2 mb-3">
                        <p className="text-sm font-medium text-mizan-primary">Action Items:</p>
                        <ul className="space-y-1">
                          {rec.actionItems.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-sm text-mizan-secondary">✓ {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-xs font-medium text-green-900 mb-1">Expected Impact:</p>
                          <p className="text-sm text-green-700">{rec.expectedImpact}</p>
                        </div>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-xs font-medium text-blue-900 mb-1">Timeframe:</p>
                          <p className="text-sm text-blue-700">{rec.timeframe}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!analysis && !analyzing && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <BarChart3 className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold font-display text-mizan-primary mb-2">
            Ready to Analyze
          </h3>
          <p className="text-mizan-secondary">
            Select a department or view organization-wide analysis, then click "Run Analysis"
          </p>
        </div>
      )}
    </div>
  );
}
