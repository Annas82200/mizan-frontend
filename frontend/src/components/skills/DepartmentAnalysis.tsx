'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, TrendingUp, AlertCircle, Loader2, Award, Target } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface DepartmentAnalysisProps {
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

interface TopSkill {
  skill: string;
  proficiency: number;
  employeeCount: number;
}

interface DepartmentAnalysisData {
  departmentId: string;
  totalEmployees: number;
  skillsCoverage: Record<string, number>;
  criticalGaps: SkillsGap[];
  topSkills: TopSkill[];
  recommendations: string[];
}

/**
 * Department Analysis Component
 * ✅ PHASE 3.1: Dedicated Department Analysis View
 * Shows comprehensive department-level skills analysis
 */
export const DepartmentAnalysis: React.FC<DepartmentAnalysisProps> = ({ userRole }) => {
  const [departments, setDepartments] = useState<Array<{ id: string; name: string; description?: string }>>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('');
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>('');
  const [analysisData, setAnalysisData] = useState<DepartmentAnalysisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch departments list
   */
  const fetchDepartments = async () => {
    try {
      setLoadingDepartments(true);
      const response = await apiClient.admin.getDepartments();
      if (response.success && response.data) {
        setDepartments(response.data);
      }
    } catch (error) {
      console.error('Failed to load departments:', error);
      setError('Failed to load departments list');
    } finally {
      setLoadingDepartments(false);
    }
  };

  /**
   * Load department analysis
   */
  const loadDepartmentAnalysis = async (deptId: string) => {
    if (!deptId) {
      setError('Please select a department');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.skills.getDepartmentAnalysis(deptId) as any;

      if (response.success && response.analysis) {
        setAnalysisData(response.analysis as DepartmentAnalysisData);
      } else {
        throw new Error('Failed to load department analysis');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load department analysis';
      console.error('Failed to load department analysis:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load departments on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  /**
   * Handle department selection
   */
  const handleDepartmentChange = (deptId: string) => {
    setSelectedDepartmentId(deptId);
    const dept = departments.find(d => d.id === deptId);
    setSelectedDepartmentName(dept?.name || '');
    if (deptId) {
      loadDepartmentAnalysis(deptId);
    } else {
      setAnalysisData(null);
    }
  };

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
   * Calculate proficiency percentage
   */
  const getProficiencyPercentage = (proficiency: number): number => {
    return Math.round(proficiency * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          <span>Department Analysis</span>
        </h3>
        <p className="text-sm text-gray-600">Comprehensive skills analysis for a specific department</p>
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

      {/* Department Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="departmentSelect">Department</Label>
            <select
              id="departmentSelect"
              value={selectedDepartmentId}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              disabled={loadingDepartments}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">-- Select Department --</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {loadingDepartments ? 'Loading departments...' : 'Select a department to view its comprehensive skills analysis'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* Analysis Results */}
      {!loading && analysisData && (
        <>
          {/* Overview Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Total Employees</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{analysisData.totalEmployees}</div>
                <p className="text-xs text-gray-500 mt-1">{selectedDepartmentName}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Critical Gaps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{analysisData.criticalGaps.length}</div>
                <p className="text-xs text-gray-500 mt-1">Immediate attention required</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Top Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{analysisData.topSkills.length}</div>
                <p className="text-xs text-gray-500 mt-1">Department strengths</p>
              </CardContent>
            </Card>
          </div>

          {/* Critical Gaps */}
          {analysisData.criticalGaps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span>Critical Skills Gaps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.criticalGaps.map((gap, index) => (
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

          {/* Top Skills */}
          {analysisData.topSkills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Top Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.topSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{skill.skill}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {skill.employeeCount} employee{skill.employeeCount !== 1 ? 's' : ''} proficient
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {getProficiencyPercentage(skill.proficiency)}%
                        </div>
                        <p className="text-xs text-gray-500">Average proficiency</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {analysisData.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {analysisData.criticalGaps.length === 0 && analysisData.topSkills.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Building2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">No Analysis Data Available</h4>
                <p className="text-sm text-gray-600">
                  This department may not have any skills assessments completed yet.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Empty State - No Department Selected */}
      {!loading && !analysisData && !error && (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Select a Department</h4>
            <p className="text-sm text-gray-600">
              Choose a department from the dropdown above to view its comprehensive skills analysis.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
