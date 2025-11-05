'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, TrendingUp, AlertCircle, Loader2, Award, Target, BarChart3 } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface OrganizationAnalysisProps {
  userRole: string;
}

interface SkillsGap {
  id: string;
  skillName: string;
  category: string;
  currentLevel: string;
  requiredLevel: string;
  gapSeverity: 'critical' | 'high' | 'medium' | 'low';
  affectedEmployees: number;
}

interface DepartmentComparison {
  departmentId: string;
  departmentName: string;
  skillsScore: number;
  criticalGaps: number;
}

interface OrganizationAnalysisData {
  totalEmployees: number;
  totalSkills: number;
  skillsCoverage: Record<string, number>;
  departmentComparison: DepartmentComparison[];
  organizationGaps: SkillsGap[];
  strategicAlignment: number;
  recommendations: string[];
}

/**
 * Organization Analysis Component
 * ✅ PHASE 3.2: Dedicated Organization-Wide Analysis View
 * Shows comprehensive organization-level skills analysis with department comparisons
 */
export const OrganizationAnalysis: React.FC<OrganizationAnalysisProps> = ({ userRole }) => {
  const [analysisData, setAnalysisData] = useState<OrganizationAnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load organization analysis
   */
  const loadOrganizationAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.skills.getOrganizationAnalysis() as any;

      if (response.success && response.analysis) {
        setAnalysisData(response.analysis as OrganizationAnalysisData);
      } else {
        throw new Error('Failed to load organization analysis');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load organization analysis';
      console.error('Failed to load organization analysis:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load analysis on mount
  useEffect(() => {
    loadOrganizationAnalysis();
  }, []);

  /**
   * Get severity color
   */
  const getSeverityColor = (severity: 'critical' | 'high' | 'medium' | 'low'): string => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[severity];
  };

  /**
   * Get department score color
   */
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  /**
   * Get strategic alignment color and label
   */
  const getAlignmentDisplay = (alignment: number): { color: string; label: string } => {
    if (alignment >= 80) return { color: 'text-green-600', label: 'Excellent' };
    if (alignment >= 60) return { color: 'text-yellow-600', label: 'Good' };
    if (alignment >= 40) return { color: 'text-orange-600', label: 'Fair' };
    return { color: 'text-red-600', label: 'Needs Attention' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <span>Organization-Wide Analysis</span>
        </h3>
        <p className="text-sm text-gray-600">Comprehensive skills analysis across the entire organization</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 p-0 h-auto mt-1"
              onClick={() => setError(null)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-end">
        <Button
          onClick={loadOrganizationAnalysis}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh Analysis
            </>
          )}
        </Button>
      </div>

      {/* Loading State */}
      {loading && !analysisData && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* Analysis Results */}
      {analysisData && (
        <>
          {/* Overview Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Total Employees</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{analysisData.totalEmployees}</div>
                <p className="text-xs text-gray-500 mt-1">Organization-wide</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Total Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{analysisData.totalSkills}</div>
                <p className="text-xs text-gray-500 mt-1">Skills tracked</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Organization Gaps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{analysisData.organizationGaps.length}</div>
                <p className="text-xs text-gray-500 mt-1">Critical skills gaps</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Strategic Alignment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${getAlignmentDisplay(analysisData.strategicAlignment).color}`}>
                  {Math.round(analysisData.strategicAlignment)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {getAlignmentDisplay(analysisData.strategicAlignment).label}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Department Comparison */}
          {analysisData.departmentComparison.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Department Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.departmentComparison.map((dept, index) => (
                    <div key={dept.departmentId || index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{dept.departmentName}</h4>
                          <div className="flex items-center space-x-4 mt-2">
                            <div>
                              <span className="text-sm text-gray-600">Skills Score: </span>
                              <span className={`text-sm font-semibold ${getScoreColor(dept.skillsScore)}`}>
                                {Math.round(dept.skillsScore)}%
                              </span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Critical Gaps: </span>
                              <span className="text-sm font-semibold text-red-600">
                                {dept.criticalGaps}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-24 h-24">
                          <div className="relative w-full h-full">
                            <svg viewBox="0 0 36 36" className="w-full h-full">
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="3"
                              />
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={dept.skillsScore >= 80 ? '#10b981' : dept.skillsScore >= 60 ? '#f59e0b' : '#ef4444'}
                                strokeWidth="3"
                                strokeDasharray={`${dept.skillsScore}, 100`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className={`text-sm font-bold ${getScoreColor(dept.skillsScore)}`}>
                                {Math.round(dept.skillsScore)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Organization-Wide Gaps */}
          {analysisData.organizationGaps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span>Organization-Wide Skills Gaps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.organizationGaps.map((gap, index) => (
                    <div key={gap.id || index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{gap.skillName}</h4>
                          <p className="text-sm text-gray-600 mt-1">Category: {gap.category}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {gap.currentLevel} → {gap.requiredLevel}
                            </Badge>
                            <span className="text-sm text-red-600">
                              {gap.affectedEmployees} employees affected
                            </span>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(gap.gapSeverity)}>
                          {gap.gapSeverity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Strategic Recommendations */}
          {analysisData.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Strategic Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {analysisData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-blue-600 mt-1 font-bold">{index + 1}.</span>
                      <span className="text-sm text-gray-700 flex-1">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {analysisData.organizationGaps.length === 0 && analysisData.departmentComparison.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Building2 className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">Organization in Great Shape!</h4>
                <p className="text-sm text-gray-600">
                  No critical gaps detected. Your organization's skills are well-aligned with strategic goals.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
