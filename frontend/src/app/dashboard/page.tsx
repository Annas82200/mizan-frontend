'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  Brain,
  TrendingUp,
  Briefcase,
  ArrowRight,
  BarChart3,
  Target,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';

interface DashboardMetrics {
  culture: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    lastAssessment: string;
  };
  structure: {
    efficiency: number;
    spanOfControl: number;
    layers: number;
  };
  skills: {
    coverage: number;
    gaps: number;
    developmentPlans: number;
  };
  performance: {
    overallScore: number;
    goalsOnTrack: number;
    totalGoals: number;
  };
  hiring: {
    openPositions: number;
    timeToFill: number;
    applicants: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');

  useEffect(() => {
    // Check authentication and fetch metrics
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Get user role from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || 'employee');

        // Fetch dashboard metrics from API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/metrics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        }
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const modules = [
    {
      id: 'culture',
      title: 'Culture Analysis',
      description: 'Analyze team dynamics, values alignment, and employee engagement',
      icon: Users,
      href: '/dashboard/culture',
      color: 'bg-purple-500',
      metrics: metrics?.culture ? [
        { label: 'Culture Score', value: `${metrics.culture.score}%` },
        { label: 'Trend', value: metrics.culture.trend },
        { label: 'Last Assessment', value: metrics.culture.lastAssessment }
      ] : [],
      access: ['admin', 'supervisor', 'employee']
    },
    {
      id: 'structure',
      title: 'Structure Analysis',
      description: 'Optimize organizational hierarchy and reporting relationships',
      icon: Building2,
      href: '/dashboard/structure',
      color: 'bg-green-500',
      metrics: metrics?.structure ? [
        { label: 'Efficiency', value: `${metrics.structure.efficiency}%` },
        { label: 'Span of Control', value: metrics.structure.spanOfControl },
        { label: 'Org Layers', value: metrics.structure.layers }
      ] : [],
      access: ['admin', 'supervisor']
    },
    {
      id: 'skills',
      title: 'Skills Analysis',
      description: 'Map competencies, identify gaps, and create development plans',
      icon: Brain,
      href: '/dashboard/skills',
      color: 'bg-red-500',
      metrics: metrics?.skills ? [
        { label: 'Coverage', value: `${metrics.skills.coverage}%` },
        { label: 'Skills Gaps', value: metrics.skills.gaps },
        { label: 'Dev Plans', value: metrics.skills.developmentPlans }
      ] : [],
      access: ['admin', 'supervisor', 'employee']
    },
    {
      id: 'performance',
      title: 'Performance Management',
      description: 'Set goals, track progress, and manage performance evaluations',
      icon: TrendingUp,
      href: '/dashboard/performance',
      color: 'bg-orange-500',
      metrics: metrics?.performance ? [
        { label: 'Overall Score', value: `${metrics.performance.overallScore}%` },
        { label: 'Goals on Track', value: `${metrics.performance.goalsOnTrack}/${metrics.performance.totalGoals}` }
      ] : [],
      access: ['admin', 'supervisor', 'employee']
    },
    {
      id: 'hiring',
      title: 'Hiring & Recruitment',
      description: 'Manage talent acquisition from requisition to onboarding',
      icon: Briefcase,
      href: '/dashboard/hiring',
      color: 'bg-blue-500',
      metrics: metrics?.hiring ? [
        { label: 'Open Positions', value: metrics.hiring.openPositions },
        { label: 'Time to Fill', value: `${metrics.hiring.timeToFill} days` },
        { label: 'Applicants', value: metrics.hiring.applicants }
      ] : [],
      access: ['admin', 'supervisor']
    }
  ];

  const quickActions = [
    {
      title: 'Complete Culture Survey',
      description: 'Share your feedback on organizational culture',
      icon: Target,
      action: () => router.push('/dashboard/culture/survey'),
      access: ['employee', 'supervisor', 'admin']
    },
    {
      title: 'Update Skills Profile',
      description: 'Keep your skills and competencies up to date',
      icon: Lightbulb,
      action: () => router.push('/dashboard/skills/profile'),
      access: ['employee', 'supervisor', 'admin']
    },
    {
      title: 'View Performance Goals',
      description: 'Check progress on your current goals',
      icon: BarChart3,
      action: () => router.push('/dashboard/performance/goals'),
      access: ['employee', 'supervisor', 'admin']
    }
  ];

  // Filter modules based on user role
  const accessibleModules = modules.filter(module =>
    module.access.includes(userRole)
  );

  const accessibleActions = quickActions.filter(action =>
    action.access.includes(userRole)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to Mizan Platform - Your AI-powered organizational analysis hub
        </p>
      </div>

      {/* Quick Actions */}
      {accessibleActions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accessibleActions.map((action, index) => (
              <div
                key={index}
                onClick={action.action}
                className="cursor-pointer"
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gray-100">
                    <action.icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessibleModules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${module.color} bg-opacity-10`}>
                  <module.icon className={`h-6 w-6 ${module.color.replace('bg-', 'text-')}`} />
                </div>
                {module.metrics.length > 0 && (
                  <div className="text-right">
                    <p className="text-2xl font-bold">{module.metrics[0]?.value}</p>
                    <p className="text-xs text-gray-500">{module.metrics[0]?.label}</p>
                  </div>
                )}
              </div>
              <CardTitle className="mt-4">{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {module.metrics.length > 1 && (
                <div className="space-y-2 mb-4">
                  {module.metrics.slice(1).map((metric, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{metric.label}:</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                  ))}
                </div>
              )}
              <Link href={module.href}>
                <Button className="w-full" variant="outline">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role-based message */}
      {userRole === 'admin' && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            <strong>Admin View:</strong> You have access to all modules and organizational insights.
            Visit the <Link href="/dashboard/superadmin" className="underline">Super Admin Dashboard</Link> for advanced features.
          </p>
        </div>
      )}

      {userRole === 'supervisor' && (
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">
            <strong>Supervisor View:</strong> You can manage your team's performance, view department analytics, and access hiring tools.
          </p>
        </div>
      )}

      {userRole === 'employee' && (
        <div className="mt-8 p-4 bg-purple-50 rounded-lg">
          <p className="text-purple-800">
            <strong>Employee View:</strong> Track your performance, update skills, and participate in culture surveys.
          </p>
        </div>
      )}
    </div>
  );
}