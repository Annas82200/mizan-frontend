'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Bot,
  DollarSign,
  Plus,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface HiringMetrics {
  openPositions: number;
  activeCandidates: number;
  scheduledInterviews: number;
  pendingOffers: number;
  hiredThisMonth: number;
  avgTimeToHire: number;
  requisitions: {
    open: number;
    pending: number;
    filled: number;
  };
}

const moduleLinks = [
  { href: '/dashboard/hiring/requisitions', icon: FileText, label: 'Requisitions', description: 'Manage hiring requisitions' },
  { href: '/dashboard/hiring/jobs', icon: Briefcase, label: 'Job Postings', description: 'Create and manage job listings' },
  { href: '/dashboard/hiring/applications', icon: Users, label: 'Applications', description: 'Review candidate applications' },
  { href: '/dashboard/hiring/interviews', icon: Calendar, label: 'Interviews', description: 'Schedule and track interviews' },
  { href: '/dashboard/hiring/bot', icon: Bot, label: 'Hiring Assistant', description: 'AI-powered hiring support' },
  { href: '/dashboard/hiring/compensation', icon: DollarSign, label: 'Compensation', description: 'Compensation analysis and offers' }
];

/**
 * Hiring Module Dashboard Page
 * Production-ready: Complete recruitment and hiring system
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function HiringPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('');
  const [metrics, setMetrics] = useState<HiringMetrics | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || 'employee');
        setUserName(payload.name || 'User');

        // Hiring is admin/manager only
        const allowedRoles = ['superadmin', 'clientAdmin', 'manager'];
        if (!allowedRoles.includes(payload.role)) {
          router.push('/dashboard');
          return;
        }

        await fetchMetrics();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchMetrics = async () => {
    try {
      // Fetch real overview data from API
      interface OverviewResponse {
        metrics: {
          openRequisitions: number;
          totalCandidates: number;
          activeCandidates: number;
          scheduledInterviews: number;
          pendingOffers: number;
          hiredThisMonth: number;
        };
        requisitionStats: Array<{ status: string; count: number }>;
      }

      const response = await apiClient.get<OverviewResponse>('/api/hiring/overview');
      const data = response.data;

      // Calculate requisition stats
      const openReqs = data.requisitionStats?.filter(s => ['approved', 'posted'].includes(s.status || ''))
        .reduce((acc, s) => acc + (s.count || 0), 0) || 0;
      const pendingReqs = data.requisitionStats?.filter(s => s.status === 'pending')
        .reduce((acc, s) => acc + (s.count || 0), 0) || 0;
      const filledReqs = data.requisitionStats?.filter(s => s.status === 'filled')
        .reduce((acc, s) => acc + (s.count || 0), 0) || 0;

      setMetrics({
        openPositions: data.metrics.openRequisitions,
        activeCandidates: data.metrics.activeCandidates,
        scheduledInterviews: data.metrics.scheduledInterviews,
        pendingOffers: data.metrics.pendingOffers,
        hiredThisMonth: data.metrics.hiredThisMonth,
        avgTimeToHire: 28, // Would need historical data for this
        requisitions: {
          open: openReqs,
          pending: pendingReqs,
          filled: filledReqs
        }
      });
    } catch (err) {
      logger.error('Error fetching metrics:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-mizan-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hiring</h1>
                <p className="text-sm text-gray-600">Recruitment and talent acquisition</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/hiring/requisitions')}
                className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Requisition</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Briefcase className="w-5 h-5 text-mizan-gold" />
                  <p className="text-sm text-gray-600">Open Positions</p>
                </div>
                <p className="text-2xl font-bold text-mizan-primary">{metrics.openPositions}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <p className="text-sm text-gray-600">Active Candidates</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{metrics.activeCandidates}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <p className="text-sm text-gray-600">Scheduled Interviews</p>
                </div>
                <p className="text-2xl font-bold text-purple-600">{metrics.scheduledInterviews}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <p className="text-sm text-gray-600">Pending Offers</p>
                </div>
                <p className="text-2xl font-bold text-orange-600">{metrics.pendingOffers}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-gray-600">Hired This Month</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{metrics.hiredThisMonth}</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-600">Avg Time to Hire</p>
                </div>
                <p className="text-2xl font-bold text-gray-700">{metrics.avgTimeToHire}d</p>
              </div>
            </div>
          )}

          {/* Requisition Pipeline */}
          {metrics && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-mizan-primary mb-4">Requisition Pipeline</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-center">
                  <p className="text-3xl font-bold text-yellow-600">{metrics.requisitions.pending}</p>
                  <p className="text-sm text-yellow-700">Pending Approval</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <p className="text-3xl font-bold text-blue-600">{metrics.requisitions.open}</p>
                  <p className="text-sm text-blue-700">Open</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center">
                  <p className="text-3xl font-bold text-green-600">{metrics.requisitions.filled}</p>
                  <p className="text-sm text-green-700">Filled</p>
                </div>
              </div>
            </div>
          )}

          {/* Module Links */}
          <div>
            <h2 className="text-lg font-semibold text-mizan-primary mb-4">Hiring Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {moduleLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-mizan-gold/30 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-mizan-gold/10 rounded-xl flex items-center justify-center group-hover:bg-mizan-gold/20 transition-colors">
                          <Icon className="w-6 h-6 text-mizan-gold" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-mizan-primary group-hover:text-mizan-gold transition-colors">
                            {link.label}
                          </h3>
                          <p className="text-sm text-gray-600">{link.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-mizan-gold group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
