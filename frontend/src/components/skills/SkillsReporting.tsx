'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { FileText, Download, BarChart3, TrendingUp, Loader2, AlertCircle, FileSpreadsheet, FileDown } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { ReportPreviewData } from '@/types/skills';

interface SkillsReportingProps {
  userRole: string;
  tenantId?: string | null;
}

/**
 * Skills Reporting Component
 * ✅ PRODUCTION-READY: Full API integration with PDF/Excel/CSV export
 * Generates and displays skills gap analysis reports
 */
export const SkillsReporting: React.FC<SkillsReportingProps> = ({ userRole, tenantId }) => {
  const [reportPreview, setReportPreview] = useState<ReportPreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportType, setReportType] = useState<'organization' | 'department'>('organization');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [departments, setDepartments] = useState<Array<{ id: string; name: string; description?: string }>>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  /**
   * Load report preview data
   */
  const loadReportPreview = async () => {
    try {
      setLoading(true);
      setError(null);

      const response: any = await apiClient.skills.getReportPreview(
        reportType,
        reportType === 'department' ? selectedDepartment : undefined
      );

      if (response.success && response.data) {
        setReportPreview(response.data);
      } else {
        throw new Error(response.error || 'Failed to load report preview');
      }
    } catch (err: any) {
      console.error('Failed to load report preview:', err);
      setError(err.message || 'Failed to load report preview');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch departments list
   */
  const fetchDepartments = async () => {
    try {
      setLoadingDepartments(true);
      console.log('[SkillsReporting] Fetching departments...');
      const response = await apiClient.admin.getDepartments();
      console.log('[SkillsReporting] Departments response:', response);

      if (response.success && response.data) {
        console.log('[SkillsReporting] Departments loaded:', response.data.length, 'departments');
        setDepartments(response.data);

        if (response.data.length === 0) {
          console.warn('[SkillsReporting] No departments found in database');
          setError('No departments available. Please create departments first.');
        }
      } else {
        console.error('[SkillsReporting] Invalid response:', response);
        throw new Error('Invalid departments response');
      }
    } catch (error) {
      console.error('[SkillsReporting] Failed to load departments:', error);
      setError('Failed to load departments list');
    } finally {
      setLoadingDepartments(false);
    }
  };

  // Fetch departments when report type switches to 'department'
  useEffect(() => {
    if (reportType === 'department' && departments.length === 0) {
      fetchDepartments();
    }
  }, [reportType]);

  // Load preview on mount and when report type changes
  useEffect(() => {
    // Only load preview if:
    // 1. Report type is 'organization' (no department needed), OR
    // 2. Report type is 'department' AND a department is selected
    if (reportType === 'organization' || (reportType === 'department' && selectedDepartment)) {
      loadReportPreview();
    } else if (reportType === 'department' && !selectedDepartment) {
      // Clear preview and show helpful message when switching to department without selection
      setReportPreview(null);
      setError('Please select a department to view the report preview');
    }
  }, [reportType, selectedDepartment]);

  /**
   * Handle report export
   */
  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      // Validate department selection for department reports
      if (reportType === 'department' && !selectedDepartment) {
        setError('Please select a department before exporting the report');
        return;
      }

      setExporting(true);
      setError(null);

      const { blob, filename } = await apiClient.skills.generateReport({
        reportType,
        departmentId: reportType === 'department' ? selectedDepartment : undefined,
        format
      });

      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err: any) {
      console.error('Export failed:', err);
      setError(err.message || 'Failed to export report');
    } finally {
      setExporting(false);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Skills Gap Analysis Reports</h3>
        <p className="text-sm text-gray-600">Generate comprehensive reports in PDF, Excel, or CSV format</p>
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

      {/* Report Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Report Type</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button
                  variant={reportType === 'organization' ? 'default' : 'outline'}
                  onClick={() => setReportType('organization')}
                  className="w-full"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Organization-Wide
                </Button>
                <Button
                  variant={reportType === 'department' ? 'default' : 'outline'}
                  onClick={() => setReportType('department')}
                  className="w-full"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Department
                </Button>
              </div>
            </div>

            {reportType === 'department' && (
              <div>
                <Label htmlFor="department">Select Department</Label>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  disabled={loadingDepartments}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">-- Select a department --</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {loadingDepartments ? 'Loading departments...' : 'Select a department to generate a department-specific report'}
                </p>
              </div>
            )}

            {/* Export Buttons */}
            <div>
              <Label>Export Format</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <Button
                  onClick={() => handleExport('pdf')}
                  disabled={exporting || loading}
                  variant="outline"
                  className="w-full"
                >
                  {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
                  PDF
                </Button>
                <Button
                  onClick={() => handleExport('excel')}
                  disabled={exporting || loading}
                  variant="outline"
                  className="w-full"
                >
                  {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileSpreadsheet className="w-4 h-4 mr-2" />}
                  Excel
                </Button>
                <Button
                  onClick={() => handleExport('csv')}
                  disabled={exporting || loading}
                  variant="outline"
                  className="w-full"
                >
                  {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
                  CSV
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* Report Preview */}
      {!loading && reportPreview && (
        <>
          {/* Overview Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{reportPreview.totalEmployees}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Assessed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{reportPreview.assessedEmployees}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((reportPreview.assessedEmployees / reportPreview.totalEmployees) * 100)}% coverage
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Critical Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{reportPreview.criticalGapsCount}</div>
                <p className="text-xs text-gray-500 mt-1">Immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Total Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{reportPreview.totalGapsCount}</div>
                <p className="text-xs text-gray-500 mt-1">All severity levels</p>
              </CardContent>
            </Card>
          </div>

          {/* Severity Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Gap Severity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{reportPreview.bySeverity.critical}</div>
                  <p className="text-sm text-gray-600 mt-1">Critical</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{reportPreview.bySeverity.high}</div>
                  <p className="text-sm text-gray-600 mt-1">High</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{reportPreview.bySeverity.medium}</div>
                  <p className="text-sm text-gray-600 mt-1">Medium</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{reportPreview.bySeverity.low}</div>
                  <p className="text-sm text-gray-600 mt-1">Low</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Gaps Preview */}
          {reportPreview.criticalGaps && reportPreview.criticalGaps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Critical Skills Gaps (Top 5)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportPreview.criticalGaps.map((gap, index) => (
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

          {/* Top Recommendations */}
          {reportPreview.topRecommendations && reportPreview.topRecommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Top Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportPreview.topRecommendations.map((rec, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h5 className="font-semibold text-gray-900">{rec.skillName}</h5>
                      <ul className="mt-2 space-y-1">
                        {rec.recommendations.map((recommendation, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State for No Gaps */}
          {reportPreview.totalGapsCount === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <BarChart3 className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">No Skills Gaps Detected!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Your team's skills are well-aligned with organizational requirements.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
