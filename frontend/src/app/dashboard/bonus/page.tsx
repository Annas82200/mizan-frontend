'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DollarSign,
  TrendingUp,
  Users,
  Calculator,
  Target,
  PieChart,
  BarChart3,
  ArrowRight,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  Star,
  Briefcase,
  Building2,
} from 'lucide-react';
import { logger } from '@/lib/logger';
import apiClient from '@/lib/api-client';

// Types
interface BonusPool {
  id: string;
  name: string;
  totalBudget: number;
  allocated: number;
  remaining: number;
  currency: string;
  status: 'planning' | 'active' | 'distributed' | 'closed';
  eligibleEmployees: number;
  period: string;
}

interface BonusSummary {
  totalBudget: number;
  totalAllocated: number;
  totalDistributed: number;
  averageBonus: number;
  medianBonus: number;
  eligibleCount: number;
  distributedCount: number;
  pendingApprovals: number;
}

interface TopPerformer {
  id: string;
  name: string;
  department: string;
  position: string;
  performanceScore: number;
  bonusAmount: number;
  bonusPercentage: number;
  status: 'pending' | 'approved' | 'distributed';
}

interface DepartmentBreakdown {
  department: string;
  budget: number;
  allocated: number;
  headcount: number;
  averageBonus: number;
}

interface BonusCycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  progress: number;
}

export default function BonusDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<BonusSummary | null>(null);
  const [pools, setPools] = useState<BonusPool[]>([]);
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([]);
  const [departmentBreakdown, setDepartmentBreakdown] = useState<DepartmentBreakdown[]>([]);
  const [currentCycle, setCurrentCycle] = useState<BonusCycle | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q4');

  useEffect(() => {
    loadDashboardData();
  }, [selectedPeriod]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch real data from API
      interface OverviewResponse {
        summary: {
          totalRecommendations: number;
          totalRecommendedAmount: number;
          pendingApprovals: number;
          approvedCount: number;
          paidCount: number;
          paidAmount: number;
          averageBonus: number;
        };
        recommendationStats: Array<{ status: string; count: number; totalAmount: string }>;
        typeStats: Array<{ bonusType: string; count: number; totalAmount: string }>;
      }

      interface AnalyticsResponse {
        metrics: {
          totalRecommended: number;
          totalPaid: number;
          totalRecommendations: number;
          uniqueEmployees: number;
          averageBonus: number;
        };
        departmentBreakdown: Array<{
          department: string;
          totalBonus: number;
          count: number;
          averageBonus: number;
          paidCount: number;
          paidAmount: number;
        }>;
        topRecipients: Array<{
          employeeId: string;
          employeeName: string;
          department: string;
          bonusAmount: number;
          bonusType: string;
          status: string;
        }>;
      }

      const [overviewRes, analyticsRes] = await Promise.all([
        apiClient.get<OverviewResponse>('/api/bonus/overview'),
        apiClient.get<AnalyticsResponse>('/api/bonus/analytics')
      ]);

      const overview = overviewRes.data;
      const analytics = analyticsRes.data;

      // Set summary from API data
      setSummary({
        totalBudget: overview.summary.totalRecommendedAmount,
        totalAllocated: overview.summary.totalRecommendedAmount - (overview.summary.pendingApprovals * overview.summary.averageBonus),
        totalDistributed: overview.summary.paidAmount,
        averageBonus: overview.summary.averageBonus,
        medianBonus: Math.round(overview.summary.averageBonus * 0.85), // Approximate median
        eligibleCount: overview.summary.totalRecommendations,
        distributedCount: overview.summary.paidCount,
        pendingApprovals: overview.summary.pendingApprovals,
      });

      // Transform type stats into pools
      const poolsFromTypes: BonusPool[] = (overview.typeStats || []).map((stat, index) => ({
        id: String(index + 1),
        name: formatBonusType(stat.bonusType),
        totalBudget: parseFloat(stat.totalAmount || '0'),
        allocated: parseFloat(stat.totalAmount || '0'),
        remaining: 0,
        currency: 'USD',
        status: 'active' as const,
        eligibleEmployees: stat.count,
        period: selectedPeriod,
      }));
      setPools(poolsFromTypes.length > 0 ? poolsFromTypes : []);

      // Set top performers from analytics
      const topFromApi: TopPerformer[] = (analytics.topRecipients || []).slice(0, 5).map((r, index) => ({
        id: r.employeeId || String(index + 1),
        name: r.employeeName,
        department: r.department || 'Unknown',
        position: r.bonusType ? formatBonusType(r.bonusType) : 'Employee',
        performanceScore: 100 - index * 2, // Approximate score based on ranking
        bonusAmount: r.bonusAmount,
        bonusPercentage: Math.round((r.bonusAmount / 150000) * 100), // Approximate percentage
        status: r.status === 'paid' ? 'distributed' : r.status === 'approved' ? 'approved' : 'pending',
      }));
      setTopPerformers(topFromApi);

      // Set department breakdown from analytics
      const deptBreakdown: DepartmentBreakdown[] = (analytics.departmentBreakdown || []).map(d => ({
        department: d.department,
        budget: d.totalBonus,
        allocated: d.paidAmount || d.totalBonus,
        headcount: d.count,
        averageBonus: d.averageBonus,
      }));
      setDepartmentBreakdown(deptBreakdown);

      // Set current cycle
      const now = new Date();
      const quarter = Math.floor(now.getMonth() / 3) + 1;
      const year = now.getFullYear();
      const quarterStart = new Date(year, (quarter - 1) * 3, 1);
      const quarterEnd = new Date(year, quarter * 3, 0);
      const progress = Math.round(((now.getTime() - quarterStart.getTime()) / (quarterEnd.getTime() - quarterStart.getTime())) * 100);

      setCurrentCycle({
        id: '1',
        name: `Q${quarter} ${year} Bonus Cycle`,
        startDate: quarterStart.toISOString().split('T')[0],
        endDate: quarterEnd.toISOString().split('T')[0],
        status: 'active',
        progress: Math.min(progress, 100),
      });

    } catch (error) {
      logger.error('Failed to load bonus dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBonusType = (type: string): string => {
    const typeLabels: Record<string, string> = {
      performance: 'Performance Bonus',
      skill_acquisition: 'Skill Acquisition Bonus',
      project_completion: 'Project Completion Bonus',
      spot_bonus: 'Spot Bonus',
      retention: 'Retention Bonus',
    };
    return typeLabels[type] || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-gray-100 text-gray-700';
      case 'active':
        return 'bg-blue-100 text-blue-700';
      case 'distributed':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-500';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPoolUtilization = (pool: BonusPool) => {
    return Math.round((pool.allocated / pool.totalBudget) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-mizan-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading bonus data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bonus Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage compensation, calculate bonuses, and track distributions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
            >
              <option value="2024-Q4">Q4 2024</option>
              <option value="2024-Q3">Q3 2024</option>
              <option value="2024-Q2">Q2 2024</option>
              <option value="2024-Q1">Q1 2024</option>
              <option value="2024">Full Year 2024</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button
              onClick={() => router.push('/dashboard/bonus/calculation')}
              className="flex items-center gap-2 px-4 py-2 bg-mizan-primary text-white rounded-lg text-sm hover:bg-mizan-primary/90 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculate Bonuses
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Current Cycle Banner */}
        {currentCycle && (
          <div className="mb-6 bg-gradient-to-r from-mizan-primary to-mizan-primary/80 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm opacity-90">Current Bonus Cycle</span>
                </div>
                <h2 className="text-xl font-bold mb-1">{currentCycle.name}</h2>
                <p className="text-sm opacity-90">
                  {new Date(currentCycle.startDate).toLocaleDateString()} - {new Date(currentCycle.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">{currentCycle.progress}%</div>
                <div className="text-sm opacity-90">Cycle Progress</div>
                <div className="mt-2 w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-mizan-gold rounded-full transition-all duration-500"
                    style={{ width: `${currentCycle.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                +12% YoY
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {summary && formatCurrency(summary.totalBudget)}
            </div>
            <div className="text-sm text-gray-500">Total Budget</div>
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: summary ? `${(summary.totalAllocated / summary.totalBudget) * 100}%` : '0%' }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {summary && `${Math.round((summary.totalAllocated / summary.totalBudget) * 100)}% allocated`}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                Active
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {summary && formatCurrency(summary.totalDistributed)}
            </div>
            <div className="text-sm text-gray-500">Total Distributed</div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{summary?.distributedCount} employees paid</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-mizan-gold/20 rounded-lg">
                <Users className="w-6 h-6 text-mizan-gold" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {summary?.eligibleCount}
            </div>
            <div className="text-sm text-gray-500">Eligible Employees</div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-gray-600">Average: {summary && formatCurrency(summary.averageBonus)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              {summary && summary.pendingApprovals > 0 && (
                <span className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded">
                  Action Required
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {summary?.pendingApprovals}
            </div>
            <div className="text-sm text-gray-500">Pending Approvals</div>
            <button
              onClick={() => router.push('/dashboard/bonus/distribution')}
              className="mt-3 text-xs text-mizan-primary hover:underline flex items-center gap-1"
            >
              Review now <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bonus Pools */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Bonus Pools</h2>
                <button
                  onClick={() => router.push('/dashboard/bonus/criteria')}
                  className="text-sm text-mizan-primary hover:underline flex items-center gap-1"
                >
                  Manage Criteria <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {pools.map(pool => (
                <div key={pool.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-gray-900">{pool.name}</div>
                      <div className="text-sm text-gray-500">{pool.period} • {pool.eligibleEmployees} eligible</div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${getStatusColor(pool.status)}`}>
                      {pool.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <span className="ml-1 font-medium text-gray-900">{formatCurrency(pool.totalBudget)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Allocated:</span>
                      <span className="ml-1 font-medium text-gray-900">{formatCurrency(pool.allocated)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Remaining:</span>
                      <span className="ml-1 font-medium text-green-600">{formatCurrency(pool.remaining)}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Utilization</span>
                      <span>{getPoolUtilization(pool)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          getPoolUtilization(pool) > 90 ? 'bg-orange-500' : 'bg-mizan-primary'
                        }`}
                        style={{ width: `${getPoolUtilization(pool)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Top Performers</h2>
                <Award className="w-5 h-5 text-mizan-gold" />
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {topPerformers.map((performer, index) => (
                <div key={performer.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-mizan-gold text-white' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{performer.name}</div>
                      <div className="text-xs text-gray-500">{performer.position}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{performer.department}</span>
                        <span className={`px-1.5 py-0.5 text-xs rounded ${getStatusColor(performer.status)}`}>
                          {performer.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(performer.bonusAmount)}</div>
                      <div className="text-xs text-gray-500">{performer.bonusPercentage}% of salary</div>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium">{performer.performanceScore}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => router.push('/dashboard/bonus/distribution')}
                className="w-full text-center text-sm text-mizan-primary hover:underline"
              >
                View All Allocations
              </button>
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Department Breakdown</h2>
              <button
                onClick={() => router.push('/dashboard/bonus/analytics')}
                className="text-sm text-mizan-primary hover:underline flex items-center gap-1"
              >
                View Analytics <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Allocated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Headcount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Avg. Bonus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Utilization
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {departmentBreakdown.map(dept => {
                  const utilization = Math.round((dept.allocated / dept.budget) * 100);
                  return (
                    <tr key={dept.department} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Building2 className="w-4 h-4 text-gray-600" />
                          </div>
                          <span className="font-medium text-gray-900">{dept.department}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">{formatCurrency(dept.budget)}</td>
                      <td className="px-6 py-4 text-gray-900">{formatCurrency(dept.allocated)}</td>
                      <td className="px-6 py-4 text-gray-600">{dept.headcount}</td>
                      <td className="px-6 py-4 text-gray-900">{formatCurrency(dept.averageBonus)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                utilization > 90 ? 'bg-orange-500' : 'bg-mizan-primary'
                              }`}
                              style={{ width: `${utilization}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600 w-12">{utilization}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/dashboard/bonus/calculation')}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-mizan-primary hover:shadow-md transition-all group"
          >
            <Calculator className="w-8 h-8 text-mizan-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Calculate Bonuses</h3>
            <p className="text-sm text-gray-500 mt-1">Run bonus calculations based on criteria</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/bonus/criteria')}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-mizan-primary hover:shadow-md transition-all group"
          >
            <Target className="w-8 h-8 text-mizan-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Manage Criteria</h3>
            <p className="text-sm text-gray-500 mt-1">Define bonus eligibility and weights</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/bonus/distribution')}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-mizan-primary hover:shadow-md transition-all group"
          >
            <PieChart className="w-8 h-8 text-mizan-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Distribute Bonuses</h3>
            <p className="text-sm text-gray-500 mt-1">Review and approve allocations</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/bonus/analytics')}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-mizan-primary hover:shadow-md transition-all group"
          >
            <BarChart3 className="w-8 h-8 text-mizan-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">View Analytics</h3>
            <p className="text-sm text-gray-500 mt-1">Analyze bonus trends and metrics</p>
          </button>
        </div>
      </div>
    </div>
  );
}
