'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Target,
  Users,
  Calendar,
  Award,
  BarChart3,
  MessageSquare,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

interface PerformanceMetrics {
  overallScore: number;
  goalsProgress: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
  };
  evaluations: {
    upcoming: number;
    overdue: number;
    completed: number;
  };
  meetings: {
    scheduled: number;
    completed: number;
    averageRating: number;
  };
  calibration: {
    status: 'not_started' | 'in_progress' | 'completed';
    lastDate: string | null;
  };
}

interface RecentActivity {
  id: string;
  type: 'goal' | 'evaluation' | 'meeting' | 'calibration';
  title: string;
  description: string;
  timestamp: Date;
  status: string;
}

export default function PerformancePage() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    loadPerformanceData();
  }, [session]);

  const loadPerformanceData = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const [metricsData, activityData] = await Promise.all([
        apiClient.get<PerformanceMetrics>('/api/performance/metrics'),
        apiClient.get<RecentActivity[]>('/api/performance/activity')
      ]);

      setMetrics(metricsData.data);
      setRecentActivity(activityData.data);
    } catch (error) {
      console.error('Error loading performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance Management</h1>
          <p className="text-muted-foreground mt-1">
            Track goals, conduct evaluations, and drive performance excellence
          </p>
        </div>
        <Link href="/dashboard/performance/bot">
          <Button variant="default" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Ask Performance BOT
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.overallScore}/100</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {metrics.goalsProgress.completed} completed goals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.goalsProgress.inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.goalsProgress.total} total goals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Evaluations</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.evaluations.upcoming}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.evaluations.overdue > 0
                ? `${metrics.evaluations.overdue} overdue`
                : 'All on track'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">1:1 Meetings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.meetings.scheduled}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Avg rating: {metrics.meetings.averageRating.toFixed(1)}/5.0
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals Progress</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Goals Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Goals Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="font-semibold text-green-600">
                      {metrics.goalsProgress.completed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <span className="font-semibold text-blue-600">
                      {metrics.goalsProgress.inProgress}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending</span>
                    <span className="font-semibold text-gray-600">
                      {metrics.goalsProgress.pending}
                    </span>
                  </div>
                  <div className="pt-4">
                    <Link href="/dashboard/performance/goals">
                      <Button variant="outline" className="w-full">
                        Manage Goals
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/dashboard/performance/goals">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Target className="h-4 w-4" />
                    Create New Goal
                  </Button>
                </Link>
                <Link href="/dashboard/performance/evaluations">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Award className="h-4 w-4" />
                    Start Evaluation
                  </Button>
                </Link>
                <Link href="/dashboard/performance/meetings">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule 1:1 Meeting
                  </Button>
                </Link>
                <Link href="/dashboard/performance/calibration">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <BarChart3 className="h-4 w-4" />
                    View Calibration
                  </Button>
                </Link>
                <Link href="/dashboard/performance/settings">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Performance Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Goals Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-300"
                    style={{
                      width: `${(metrics.goalsProgress.completed / metrics.goalsProgress.total) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {metrics.goalsProgress.completed}
                    </div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {metrics.goalsProgress.inProgress}
                    </div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">
                      {metrics.goalsProgress.pending}
                    </div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No recent activity
                  </p>
                ) : (
                  recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {activity.type === 'goal' && <Target className="h-5 w-5 text-blue-600" />}
                        {activity.type === 'evaluation' && <Award className="h-5 w-5 text-purple-600" />}
                        {activity.type === 'meeting' && <Users className="h-5 w-5 text-green-600" />}
                        {activity.type === 'calibration' && <BarChart3 className="h-5 w-5 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
