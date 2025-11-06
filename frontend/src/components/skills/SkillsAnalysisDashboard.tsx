'use client';

import React, { useState, useEffect } from 'react';
import { SkillsIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import apiClient from '@/lib/api-client';
import {
  TrendingUp,
  Users,
  Target,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Bot,
  BarChart3,
  FileText,
  UserCheck,
  RefreshCw
} from 'lucide-react';

interface SkillsAnalysisDashboardProps {
  userRole: string;
  tenantId?: string | null;
  onNavigateToTab?: (tabId: string) => void;
}

interface DashboardStats {
  totalEmployees: number;
  completedAssessments: number;
  criticalGaps: number;
  activeLearningPaths: number;
  strategicReadiness: number;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    status: string;
  }>;
  skillCategories: Array<{
    category: string;
    score: number;
    gapCount: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

/**
 * Skills Analysis Dashboard Component
 * Main dashboard for Skills Analysis module
 * Role-based content display
 */
export const SkillsAnalysisDashboard: React.FC<SkillsAnalysisDashboardProps> = ({ userRole, tenantId, onNavigateToTab }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, [tenantId]);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use apiClient to fetch real dashboard stats (pass tenantId for superadmin)
      const response: any = await apiClient.skills.getDashboardStats(tenantId || undefined);

      if (response.success && response.stats) {
        const backendStats = response.stats;

        // Map backend stats to frontend DashboardStats interface
        const mappedStats: DashboardStats = {
          totalEmployees: backendStats.overview.totalEmployees || 0,
          completedAssessments: backendStats.overview.totalAssessments || 0,
          criticalGaps: backendStats.gaps.critical || 0,
          activeLearningPaths: 0, // Will be calculated from LXP module later
          strategicReadiness: 75, // Default until we calculate from assessments
          recentActivities: backendStats.recentAssessments.map((assessment: any, index: number) => ({
            id: assessment.id || `activity-${index}`,
            type: 'assessment',
            description: `Skills assessment completed - Score: ${assessment.overallScore || 'N/A'}`,
            timestamp: new Date(assessment.createdAt).toLocaleDateString(),
            status: 'completed'
          })),
          skillCategories: Object.entries(backendStats.distribution.byCategory || {}).map(([category, data]: [string, any]) => ({
            category,
            score: data.averageScore || 0, // Real average score from skills levels
            gapCount: data.gapCount || 0, // Real gap count from skills_gaps table
            trend: 'stable' as const // TODO: Calculate trend from historical data
          }))
        };

        setStats(mappedStats);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Dashboard API error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');

      // Provide minimal fallback for UX
      const fallbackStats: DashboardStats = {
        totalEmployees: 0,
        completedAssessments: 0,
        criticalGaps: 0,
        activeLearningPaths: 0,
        strategicReadiness: 0,
        recentActivities: [],
        skillCategories: []
      };
      setStats(fallbackStats);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mizan-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchDashboardStats} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (!stats) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'active':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-mizan-primary to-mizan-gold rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Skills Analysis Dashboard</h2>
            <p className="text-white/90">
              Strategic Skills Assessment & Development Platform
            </p>
            <p className="text-sm text-white/80 mt-1">
              {userRole === 'superadmin' && 'Platform-wide skills analytics and management'}
              {userRole === 'clientAdmin' && 'Organization skills assessment and development'}
              {userRole === 'manager' && 'Team skills overview and development planning'}
              {userRole === 'employee' && 'Personal skills assessment and growth tracking'}
            </p>
          </div>
          <div className="hidden md:block">
            <SkillsIcon className="w-24 h-24 text-white/20" />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.completedAssessments / stats.totalEmployees) * 100).toFixed(1)}% assessed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Assessments</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedAssessments}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.completedAssessments / stats.totalEmployees) * 100).toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>

        <div
          className="cursor-pointer"
          onClick={() => onNavigateToTab?.('gaps')}
        >
          <Card
            className={`transition-all hover:shadow-md ${
              stats.criticalGaps > 0 ? 'border-red-500 bg-red-50' : ''
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Gaps</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${stats.criticalGaps > 0 ? 'text-red-500' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.criticalGaps}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stats.criticalGaps > 0 ? (
                  <>
                    Require immediate attention
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </>
                ) : (
                  'No critical gaps found'
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learning Paths</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLearningPaths}</div>
            <p className="text-xs text-muted-foreground">
              Skills development in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Readiness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Strategic Skills Readiness</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Readiness Score</span>
              <span className="text-2xl font-bold text-mizan-primary">{stats.strategicReadiness}%</span>
            </div>
            <Progress value={stats.strategicReadiness} className="h-3" />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Current capability to execute strategy</span>
              <Badge variant={stats.strategicReadiness >= 80 ? 'default' : stats.strategicReadiness >= 60 ? 'secondary' : 'destructive'}>
                {stats.strategicReadiness >= 80 ? 'Ready' : stats.strategicReadiness >= 60 ? 'Partially Ready' : 'Not Ready'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Skill Categories Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.skillCategories.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold">{category.score}%</span>
                      {getTrendIcon(category.trend)}
                    </div>
                  </div>
                  <Progress value={category.score} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{category.gapCount} gaps identified</span>
                    <Badge variant={category.score >= 80 ? 'default' : category.score >= 60 ? 'secondary' : 'destructive'}>
                      {category.score >= 80 ? 'Strong' : category.score >= 60 ? 'Developing' : 'Needs Focus'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(userRole === 'superadmin' || userRole === 'clientAdmin') && (
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => onNavigateToTab?.('framework')}
              >
                <Target className="h-6 w-6 text-blue-600" />
                <span>Create Framework</span>
              </Button>
            )}

            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigateToTab?.('gaps')}
            >
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <span>View Gap Analysis</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => onNavigateToTab?.('bot')}
            >
              <Bot className="h-6 w-6 text-purple-600" />
              <span>Skills Assistant</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
