'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, BookOpen, Target, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { EmployeeProgressMetrics } from '@/types/skills';

interface SkillsProgressTrackingProps {
  userRole: string;
  employeeId?: string;
}

/**
 * Skills Progress Tracking Component
 * ✅ PRODUCTION-READY: Full API integration for progress tracking
 * Tracks individual skills development progress with real backend data
 */
export const SkillsProgressTracking: React.FC<SkillsProgressTrackingProps> = ({
  userRole,
  employeeId = 'current'
}) => {
  const [progressData, setProgressData] = useState<EmployeeProgressMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch employee progress data from backend
   */
  const fetchProgressData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response: any = await apiClient.skills.getEmployeeProgress(employeeId);

      if (response.success && response.data) {
        setProgressData(response.data);
      } else {
        throw new Error(response.error || 'Failed to load progress data');
      }
    } catch (err: any) {
      console.error('Failed to fetch progress data:', err);
      setError(err.message || 'Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchProgressData();
  }, [employeeId]);

  /**
   * Calculate metrics from progress data
   */
  const calculateMetrics = () => {
    if (!progressData) {
      return {
        averageProgress: 0,
        activeLearningPaths: 0,
        milestonesAchieved: 0
      };
    }

    // Count unique learning paths
    const activeLearningPaths = new Set(
      progressData.skillsProgress
        .filter(p => p.learningPathId)
        .map(p => p.learningPathId)
    ).size;

    return {
      averageProgress: progressData.averageProgress || 0,
      activeLearningPaths,
      milestonesAchieved: progressData.completedMilestones?.length || 0
    };
  };

  const metrics = calculateMetrics();

  /**
   * Get level color for badges
   */
  const getLevelColor = (level: string): string => {
    const colors: Record<string, string> = {
      beginner: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-green-100 text-green-800',
      advanced: 'bg-purple-100 text-purple-800',
      expert: 'bg-yellow-100 text-yellow-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Skills Progress Tracking</h3>
          <p className="text-sm text-gray-600">Monitor your skills development journey</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Skills Progress Tracking</h3>
          <p className="text-sm text-gray-600">Monitor your skills development journey</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-red-900 mb-1">Failed to Load Progress Data</h4>
            <p className="text-sm text-red-800 mb-3">{error}</p>
            <Button onClick={fetchProgressData} size="sm" variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Skills Progress Tracking</h3>
          <p className="text-sm text-gray-600">
            {progressData?.employeeName
              ? `Tracking progress for ${progressData.employeeName}`
              : 'Monitor your skills development journey'}
          </p>
        </div>
        <Button onClick={fetchProgressData} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>Overall Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{metrics.averageProgress}%</div>
            <p className="text-sm text-gray-600">Average completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-green-500" />
              <span>Active Learning</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{metrics.activeLearningPaths}</div>
            <p className="text-sm text-gray-600">Learning paths in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span>Goals Achieved</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{metrics.milestonesAchieved}</div>
            <p className="text-sm text-gray-600">Skills milestones reached</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress */}
      {progressData && progressData.skillsProgress.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Progress ({progressData.totalSkillsTracking} Skills)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {progressData.skillsProgress.map((skill) => (
                <div key={skill.id} className="space-y-3 pb-6 border-b last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{skill.skillName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getLevelColor(skill.currentLevel)}>
                          Current: {skill.currentLevel}
                        </Badge>
                        <span className="text-gray-400">→</span>
                        <Badge variant="outline">
                          Target: {skill.targetLevel}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {skill.progressPercentage}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(skill.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress value={skill.progressPercentage} className="h-2" />
                  </div>

                  {/* Milestones */}
                  {skill.milestones && skill.milestones.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Milestones:</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.milestones.map((milestone, idx) => (
                          <Badge
                            key={idx}
                            variant={milestone.achievedAt ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {milestone.name}
                            {milestone.achievedAt && ' ✓'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">No Progress Data Yet</h4>
            <p className="text-sm text-gray-600 mb-4">
              Start tracking your skills progress to see your development journey
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Milestones */}
      {progressData && progressData.completedMilestones && progressData.completedMilestones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progressData.completedMilestones.slice(0, 5).map((milestone, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Target className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{milestone.name}</h5>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className="text-xs bg-green-100 text-green-800">
                        {milestone.skillName}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(milestone.achievedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
