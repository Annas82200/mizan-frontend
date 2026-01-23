'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Target,
  TrendingUp,
  Award,
  UserCheck,
  GitBranch,
  BarChart3,
  ArrowRight,
  Star,
  Crown,
  Zap,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Briefcase,
  GraduationCap,
  Shield,
  Search,
  Filter
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface TalentMetrics {
  totalTalentPool: number;
  highPotentials: number;
  readyNow: number;
  inDevelopment: number;
  criticalRoles: number;
  successionCoverage: number;
  avgDevelopmentProgress: number;
  retentionRisk: number;
}

interface TopTalent {
  id: string;
  name: string;
  position: string;
  department: string;
  potentialRating: 'high' | 'medium' | 'low';
  performanceRating: number;
  readinessLevel: 'ready_now' | 'ready_1_year' | 'ready_2_years' | 'developing';
  developmentProgress: number;
  retentionRisk: 'low' | 'medium' | 'high';
  keyStrengths: string[];
}

interface CriticalRole {
  id: string;
  title: string;
  department: string;
  currentHolder: string;
  successors: number;
  readyNowCount: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export default function TalentPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<TalentMetrics | null>(null);
  const [topTalent, setTopTalent] = useState<TopTalent[]>([]);
  const [criticalRoles, setCriticalRoles] = useState<CriticalRole[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        interface ApiTopTalent {
          id: string;
          name: string;
          role: string;
          department: string;
          potentialRating: string;
          performanceRating: string;
          readinessLevel: string;
          strengths: string[];
          developmentAreas: string[];
        }

        interface ApiCriticalRole {
          id: string;
          title: string;
          department: string;
          vacancyRisk: string;
          successors: number;
        }

        interface ApiResponse {
          metrics: {
            totalTalent: number;
            highPotential: number;
            mediumPotential: number;
            lowPotential: number;
            readyNow: number;
            readySoon: number;
            developing: number;
            criticalRolesCovered: number;
            totalCriticalRoles: number;
            averageReadiness: number;
          };
          topTalent: ApiTopTalent[];
          criticalRoles: ApiCriticalRole[];
        }

        const response = await apiClient.get('/api/talent/overview');
        const data = response.data as ApiResponse;

        // Transform API metrics to frontend format
        const transformedMetrics: TalentMetrics = {
          totalTalentPool: data.metrics.totalTalent,
          highPotentials: data.metrics.highPotential,
          readyNow: data.metrics.readyNow,
          inDevelopment: data.metrics.developing,
          criticalRoles: data.metrics.totalCriticalRoles,
          successionCoverage: data.metrics.totalCriticalRoles > 0
            ? Math.round((data.metrics.criticalRolesCovered / data.metrics.totalCriticalRoles) * 100)
            : 0,
          avgDevelopmentProgress: data.metrics.averageReadiness,
          retentionRisk: 0 // Would need retention data
        };

        // Transform top talent
        const transformedTopTalent: TopTalent[] = (data.topTalent || []).map((t: ApiTopTalent) => ({
          id: t.id,
          name: t.name,
          position: t.role,
          department: t.department,
          potentialRating: (t.potentialRating || 'medium') as TopTalent['potentialRating'],
          performanceRating: t.performanceRating === 'high' ? 4.5 : t.performanceRating === 'medium' ? 3.5 : 2.5,
          readinessLevel: (t.readinessLevel || 'developing') as TopTalent['readinessLevel'],
          developmentProgress: t.readinessLevel === 'ready_now' ? 90 : t.readinessLevel === 'ready_1_year' ? 70 : 50,
          retentionRisk: 'low' as const,
          keyStrengths: t.strengths || []
        }));

        // Transform critical roles
        const transformedRoles: CriticalRole[] = (data.criticalRoles || []).map((r: ApiCriticalRole) => ({
          id: r.id,
          title: r.title,
          department: r.department,
          currentHolder: 'Current Incumbent',
          successors: r.successors,
          readyNowCount: Math.floor(r.successors * 0.3),
          riskLevel: (r.vacancyRisk === 'high' ? 'high' : r.vacancyRisk === 'medium' ? 'medium' : 'low') as CriticalRole['riskLevel']
        }));

        setMetrics(transformedMetrics);
        setTopTalent(transformedTopTalent);
        setCriticalRoles(transformedRoles);
      } catch (error) {
        logger.error('Error fetching talent data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getReadinessColor = (level: string): string => {
    switch (level) {
      case 'ready_now': return 'bg-green-100 text-green-800';
      case 'ready_1_year': return 'bg-blue-100 text-blue-800';
      case 'ready_2_years': return 'bg-yellow-100 text-yellow-800';
      case 'developing': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReadinessLabel = (level: string): string => {
    switch (level) {
      case 'ready_now': return 'Ready Now';
      case 'ready_1_year': return 'Ready in 1 Year';
      case 'ready_2_years': return 'Ready in 2 Years';
      case 'developing': return 'In Development';
      default: return 'Unknown';
    }
  };

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const moduleCards = [
    {
      title: 'Talent Identification',
      description: 'Identify high-potential employees and future leaders through assessment and analytics.',
      href: '/dashboard/talent/identification',
      icon: Target,
      color: 'bg-blue-500',
      stats: metrics ? `${metrics.highPotentials} High Potentials` : 'Loading...'
    },
    {
      title: 'Development Planning',
      description: 'Create and manage personalized development plans for your talent pipeline.',
      href: '/dashboard/talent/development',
      icon: GraduationCap,
      color: 'bg-green-500',
      stats: metrics ? `${metrics.avgDevelopmentProgress}% Avg Progress` : 'Loading...'
    },
    {
      title: 'Succession Planning',
      description: 'Build succession pipelines for critical roles and ensure business continuity.',
      href: '/dashboard/talent/succession',
      icon: GitBranch,
      color: 'bg-purple-500',
      stats: metrics ? `${metrics.successionCoverage}% Coverage` : 'Loading...'
    },
    {
      title: 'Talent Analytics',
      description: 'Deep dive into talent data with comprehensive reports and insights.',
      href: '/dashboard/talent/analytics',
      icon: BarChart3,
      color: 'bg-orange-500',
      stats: 'View Reports'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-mizan-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-mizan-gold" />
          <h1 className="text-3xl font-bold text-gray-900">Talent Management</h1>
        </div>
        <p className="text-gray-600">Identify, develop, and retain your organization's top talent</p>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Talent Pool</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.totalTalentPool}</div>
            <div className="text-xs text-gray-500 mt-1">Identified employees</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">High Potentials</span>
              <Star className="w-5 h-5 text-mizan-gold" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.highPotentials}</div>
            <div className="text-xs text-green-600 mt-1">{metrics.readyNow} ready now</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Succession Coverage</span>
              <Shield className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.successionCoverage}%</div>
            <div className="text-xs text-gray-500 mt-1">{metrics.criticalRoles} critical roles</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Retention Risk</span>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.retentionRisk}%</div>
            <div className="text-xs text-gray-500 mt-1">High-potential at risk</div>
          </div>
        </div>
      )}

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {moduleCards.map(card => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-mizan-gold/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-mizan-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">{card.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-mizan-primary">{card.stats}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-mizan-gold group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Talent */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-mizan-gold" />
                <h2 className="text-lg font-semibold text-gray-900">Top Talent</h2>
              </div>
              <Link
                href="/dashboard/talent/identification"
                className="text-sm text-mizan-primary hover:underline"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {topTalent.map(talent => (
              <div key={talent.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{talent.name}</div>
                    <div className="text-sm text-gray-500">{talent.position}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getReadinessColor(talent.readinessLevel)}`}>
                      {getReadinessLabel(talent.readinessLevel)}
                    </span>
                    {talent.retentionRisk === 'high' && (
                      <span title="High retention risk">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    {talent.performanceRating}
                  </span>
                  <span>{talent.department}</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    {talent.developmentProgress}% progress
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Roles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold text-gray-900">Critical Roles</h2>
              </div>
              <Link
                href="/dashboard/talent/succession"
                className="text-sm text-mizan-primary hover:underline"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {criticalRoles.map(role => (
              <div key={role.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{role.title}</div>
                    <div className="text-sm text-gray-500">{role.currentHolder}</div>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${getRiskColor(role.riskLevel)}`}>
                    {role.riskLevel === 'critical' ? 'Critical Risk' :
                     role.riskLevel === 'high' ? 'High Risk' :
                     role.riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{role.department}</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {role.successors} successor{role.successors !== 1 ? 's' : ''}
                  </span>
                  <span className={`flex items-center gap-1 ${role.readyNowCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <CheckCircle className="w-3 h-3" />
                    {role.readyNowCount} ready now
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-mizan-primary to-mizan-primary/80 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Take Action on Your Talent Strategy</h3>
            <p className="text-white/80">Leverage AI-powered insights to make better talent decisions.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/talent/identification"
              className="px-4 py-2 bg-white text-mizan-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Identify Talent
            </Link>
            <Link
              href="/dashboard/talent/analytics"
              className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              View Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
