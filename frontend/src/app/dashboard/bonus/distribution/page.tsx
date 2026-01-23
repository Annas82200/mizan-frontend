'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  PieChart,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  DollarSign,
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Edit2,
  MoreVertical,
  ChevronDown,
  AlertTriangle,
  Check,
  X,
  Mail,
  FileText,
  Building2,
  UserCheck,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { logger } from '@/lib/logger';
import apiClient from '@/lib/api-client';

// Types
interface BonusAllocation {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  position: string;
  level: string;
  baseSalary: number;
  bonusAmount: number;
  bonusPercentage: number;
  performanceScore: number;
  status: 'pending' | 'approved' | 'rejected' | 'distributed' | 'on_hold';
  approvedBy?: string;
  approvedAt?: string;
  distributedAt?: string;
  notes?: string;
  adjustmentReason?: string;
  originalAmount?: number;
}

interface DistributionSummary {
  totalAllocations: number;
  totalAmount: number;
  pendingCount: number;
  pendingAmount: number;
  approvedCount: number;
  approvedAmount: number;
  distributedCount: number;
  distributedAmount: number;
  rejectedCount: number;
  onHoldCount: number;
}

interface DepartmentSummary {
  department: string;
  totalEmployees: number;
  totalAmount: number;
  averageBonus: number;
  pendingApprovals: number;
  distributed: number;
}

export default function BonusDistributionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allocations, setAllocations] = useState<BonusAllocation[]>([]);
  const [summary, setSummary] = useState<DistributionSummary | null>(null);
  const [departmentSummaries, setDepartmentSummaries] = useState<DepartmentSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAllocations, setSelectedAllocations] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'department'>('list');
  const [showDetailsModal, setShowDetailsModal] = useState<BonusAllocation | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);

  useEffect(() => {
    loadDistributionData();
  }, []);

  const loadDistributionData = async () => {
    setIsLoading(true);
    try {
      // Fetch real data from API
      interface RecommendationData {
        id: string;
        employeeId: string;
        employeeName: string;
        employeeEmail: string;
        department: string;
        bonusType: string;
        recommendedAmount: number;
        currency: string;
        rationale: string;
        status: string;
        triggerSource: string;
        approvedBy?: string;
        approvedAt?: string;
        rejectionReason?: string;
        createdAt: string;
      }

      interface RecommendationsResponse {
        recommendations: RecommendationData[];
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
      }

      const [recsRes, analyticsRes] = await Promise.all([
        apiClient.get<RecommendationsResponse>('/api/bonus/recommendations'),
        apiClient.get<AnalyticsResponse>('/api/bonus/analytics')
      ]);

      const recommendations = recsRes.data.recommendations || [];
      const analytics = analyticsRes.data;

      // Transform recommendations to allocations
      const transformedAllocations: BonusAllocation[] = recommendations.map(rec => {
        // Map API status to UI status
        let uiStatus: BonusAllocation['status'] = 'pending';
        if (rec.status === 'approved') uiStatus = 'approved';
        else if (rec.status === 'paid') uiStatus = 'distributed';
        else if (rec.status === 'rejected') uiStatus = 'rejected';
        else if (rec.status === 'cancelled') uiStatus = 'on_hold';
        else if (rec.status === 'recommended') uiStatus = 'pending';

        return {
          id: rec.id,
          employeeId: rec.employeeId,
          employeeName: rec.employeeName,
          email: rec.employeeEmail,
          department: rec.department || 'Unknown',
          position: formatBonusType(rec.bonusType),
          level: 'L4', // Default level
          baseSalary: rec.recommendedAmount * 5, // Approximate
          bonusAmount: rec.recommendedAmount,
          bonusPercentage: 20, // Approximate
          performanceScore: 4.0, // Default score
          status: uiStatus,
          approvedBy: rec.approvedBy,
          approvedAt: rec.approvedAt,
          notes: rec.rejectionReason || rec.rationale,
        };
      });

      setAllocations(transformedAllocations);

      // Calculate summary from actual data
      const pendingRecs = recommendations.filter(r => r.status === 'recommended');
      const approvedRecs = recommendations.filter(r => r.status === 'approved');
      const paidRecs = recommendations.filter(r => r.status === 'paid');
      const rejectedRecs = recommendations.filter(r => r.status === 'rejected');
      const cancelledRecs = recommendations.filter(r => r.status === 'cancelled');

      setSummary({
        totalAllocations: recommendations.length,
        totalAmount: recommendations.reduce((sum, r) => sum + r.recommendedAmount, 0),
        pendingCount: pendingRecs.length,
        pendingAmount: pendingRecs.reduce((sum, r) => sum + r.recommendedAmount, 0),
        approvedCount: approvedRecs.length,
        approvedAmount: approvedRecs.reduce((sum, r) => sum + r.recommendedAmount, 0),
        distributedCount: paidRecs.length,
        distributedAmount: paidRecs.reduce((sum, r) => sum + r.recommendedAmount, 0),
        rejectedCount: rejectedRecs.length,
        onHoldCount: cancelledRecs.length,
      });

      // Set department summaries from analytics
      const deptSummaries: DepartmentSummary[] = (analytics.departmentBreakdown || []).map(d => ({
        department: d.department,
        totalEmployees: d.count,
        totalAmount: d.totalBonus,
        averageBonus: d.averageBonus,
        pendingApprovals: Math.max(0, d.count - d.paidCount),
        distributed: d.paidCount,
      }));
      setDepartmentSummaries(deptSummaries);

    } catch (error) {
      logger.error('Failed to load distribution data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBonusType = (type: string): string => {
    const typeLabels: Record<string, string> = {
      performance: 'Performance Bonus',
      skill_acquisition: 'Skill Acquisition',
      project_completion: 'Project Completion',
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-blue-100 text-blue-700';
      case 'distributed':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'on_hold':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'distributed':
        return <Send className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'on_hold':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleSelectAll = () => {
    if (selectedAllocations.length === filteredAllocations.length) {
      setSelectedAllocations([]);
    } else {
      setSelectedAllocations(filteredAllocations.map(a => a.id));
    }
  };

  const handleSelectAllocation = (id: string) => {
    setSelectedAllocations(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    setAllocations(prev =>
      prev.map(a =>
        selectedAllocations.includes(a.id) && a.status === 'pending'
          ? { ...a, status: 'approved' as const, approvedBy: 'Current User', approvedAt: new Date().toISOString() }
          : a
      )
    );
    setSelectedAllocations([]);
    setShowBulkActions(false);
  };

  const handleBulkDistribute = () => {
    setAllocations(prev =>
      prev.map(a =>
        selectedAllocations.includes(a.id) && a.status === 'approved'
          ? { ...a, status: 'distributed' as const, distributedAt: new Date().toISOString() }
          : a
      )
    );
    setSelectedAllocations([]);
    setShowBulkActions(false);
  };

  const handleApproveAllocation = async (id: string) => {
    try {
      await apiClient.put(`/api/bonus/recommendations/${id}/status`, { status: 'approved' });
      setAllocations(prev =>
        prev.map(a =>
          a.id === id
            ? { ...a, status: 'approved' as const, approvedBy: 'Current User', approvedAt: new Date().toISOString() }
            : a
        )
      );
    } catch (error) {
      logger.error('Failed to approve allocation:', error);
    }
  };

  const handleRejectAllocation = async (id: string) => {
    try {
      await apiClient.put(`/api/bonus/recommendations/${id}/status`, { status: 'rejected' });
      setAllocations(prev =>
        prev.map(a =>
          a.id === id
            ? { ...a, status: 'rejected' as const }
            : a
        )
      );
    } catch (error) {
      logger.error('Failed to reject allocation:', error);
    }
  };

  const handleDistributeAllocation = async (id: string) => {
    try {
      // Create a payout for the approved recommendation
      await apiClient.post('/api/bonus/payouts', { recommendationId: id });
      setAllocations(prev =>
        prev.map(a =>
          a.id === id && a.status === 'approved'
            ? { ...a, status: 'distributed' as const, distributedAt: new Date().toISOString() }
            : a
        )
      );
    } catch (error) {
      logger.error('Failed to distribute allocation:', error);
    }
  };

  const filteredAllocations = allocations.filter(allocation => {
    const matchesSearch =
      allocation.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || allocation.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || allocation.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const departments = [...new Set(allocations.map(a => a.department))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-mizan-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading distribution data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard/bonus')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bonus Distribution</h1>
              <p className="text-sm text-gray-500 mt-1">
                Review, approve, and distribute bonus allocations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-mizan-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('department')}
                className={`px-3 py-2 text-sm ${viewMode === 'department' ? 'bg-mizan-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                By Department
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => {
                const approvedAllocations = allocations.filter(a => a.status === 'approved');
                if (approvedAllocations.length > 0) {
                  setSelectedAllocations(approvedAllocations.map(a => a.id));
                  handleBulkDistribute();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-mizan-primary text-white rounded-lg text-sm hover:bg-mizan-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              Distribute All Approved
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Budget</span>
              <DollarSign className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{summary && formatCurrency(summary.totalAmount)}</div>
            <div className="text-xs text-gray-500 mt-1">{summary?.totalAllocations} allocations</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-yellow-200 bg-yellow-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-yellow-700">Pending</span>
              <Clock className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-yellow-700">{summary?.pendingCount}</div>
            <div className="text-xs text-yellow-600 mt-1">{summary && formatCurrency(summary.pendingAmount)}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-700">Approved</span>
              <CheckCircle className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-700">{summary?.approvedCount}</div>
            <div className="text-xs text-blue-600 mt-1">{summary && formatCurrency(summary.approvedAmount)}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-green-200 bg-green-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-green-700">Distributed</span>
              <Send className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-700">{summary?.distributedCount}</div>
            <div className="text-xs text-green-600 mt-1">{summary && formatCurrency(summary.distributedAmount)}</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">On Hold / Rejected</span>
              <AlertTriangle className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-700">{(summary?.onHoldCount || 0) + (summary?.rejectedCount || 0)}</div>
            <div className="text-xs text-gray-500 mt-1">Requires attention</div>
          </div>
        </div>

        {viewMode === 'department' ? (
          /* Department View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departmentSummaries.map(dept => (
              <div key={dept.department} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-mizan-primary/10 rounded-lg">
                      <Building2 className="w-5 h-5 text-mizan-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{dept.department}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{dept.totalEmployees} employees</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Amount</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(dept.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Average Bonus</span>
                    <span className="text-gray-900">{formatCurrency(dept.averageBonus)}</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-yellow-600">Pending Approvals</span>
                    <span className="font-medium text-yellow-600">{dept.pendingApprovals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600">Distributed</span>
                    <span className="font-medium text-green-600">{dept.distributed}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Distribution Progress</span>
                    <span>{Math.round((dept.distributed / dept.totalEmployees) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(dept.distributed / dept.totalEmployees) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFilterDepartment(dept.department);
                    setViewMode('list');
                  }}
                  className="mt-4 w-full py-2 text-sm text-mizan-primary hover:bg-mizan-primary/5 rounded-lg transition-colors"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                  />
                </div>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="distributed">Distributed</option>
                  <option value="rejected">Rejected</option>
                  <option value="on_hold">On Hold</option>
                </select>
                {selectedAllocations.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{selectedAllocations.length} selected</span>
                    <button
                      onClick={handleBulkApprove}
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                    >
                      Approve Selected
                    </button>
                    <button
                      onClick={handleBulkDistribute}
                      className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                    >
                      Distribute Selected
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Allocations Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedAllocations.length === filteredAllocations.length && filteredAllocations.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-mizan-primary rounded"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Bonus Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAllocations.map(allocation => (
                    <tr key={allocation.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedAllocations.includes(allocation.id)}
                          onChange={() => handleSelectAllocation(allocation.id)}
                          className="w-4 h-4 text-mizan-primary rounded"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-mizan-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-mizan-primary">
                              {allocation.employeeName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{allocation.employeeName}</div>
                            <div className="text-sm text-gray-500">{allocation.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-gray-900">{allocation.department}</div>
                        <div className="text-sm text-gray-500">Level {allocation.level}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{allocation.performanceScore}</span>
                          {allocation.performanceScore >= 4.5 ? (
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                          ) : allocation.performanceScore >= 4.0 ? (
                            <Minus className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-gray-900">{formatCurrency(allocation.bonusAmount)}</div>
                        <div className="text-sm text-gray-500">{allocation.bonusPercentage}% of salary</div>
                        {allocation.originalAmount && allocation.originalAmount !== allocation.bonusAmount && (
                          <div className="text-xs text-orange-600 mt-1">
                            Adjusted from {formatCurrency(allocation.originalAmount)}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(allocation.status)}`}>
                          {getStatusIcon(allocation.status)}
                          <span className="capitalize">{allocation.status.replace('_', ' ')}</span>
                        </span>
                        {allocation.approvedAt && (
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(allocation.approvedAt).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setShowDetailsModal(allocation)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                          {allocation.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveAllocation(allocation.id)}
                                className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <Check className="w-4 h-4 text-green-600" />
                              </button>
                              <button
                                onClick={() => handleRejectAllocation(allocation.id)}
                                className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <X className="w-4 h-4 text-red-600" />
                              </button>
                            </>
                          )}
                          {allocation.status === 'approved' && (
                            <button
                              onClick={() => handleDistributeAllocation(allocation.id)}
                              className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Distribute"
                            >
                              <Send className="w-4 h-4 text-blue-600" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredAllocations.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No allocations match your filters</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Allocation Details</h2>
                <button
                  onClick={() => setShowDetailsModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-mizan-primary/10 flex items-center justify-center">
                  <span className="text-xl font-medium text-mizan-primary">
                    {showDetailsModal.employeeName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{showDetailsModal.employeeName}</h3>
                  <p className="text-gray-500">{showDetailsModal.position}</p>
                  <p className="text-sm text-gray-400">{showDetailsModal.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Department</div>
                  <div className="font-medium text-gray-900">{showDetailsModal.department}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Level</div>
                  <div className="font-medium text-gray-900">{showDetailsModal.level}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Base Salary</div>
                  <div className="font-medium text-gray-900">{formatCurrency(showDetailsModal.baseSalary)}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Performance Score</div>
                  <div className="font-medium text-gray-900">{showDetailsModal.performanceScore}</div>
                </div>
              </div>

              <div className="p-4 bg-mizan-primary/5 rounded-lg border border-mizan-primary/20">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Bonus Amount</div>
                    <div className="text-2xl font-bold text-mizan-primary">{formatCurrency(showDetailsModal.bonusAmount)}</div>
                    <div className="text-sm text-gray-500">{showDetailsModal.bonusPercentage}% of salary</div>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(showDetailsModal.status)}`}>
                    {showDetailsModal.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {showDetailsModal.adjustmentReason && (
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-sm font-medium text-orange-700">Adjustment Reason</div>
                  <div className="text-sm text-orange-600">{showDetailsModal.adjustmentReason}</div>
                </div>
              )}

              {showDetailsModal.notes && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">Notes</div>
                  <div className="text-sm text-gray-600">{showDetailsModal.notes}</div>
                </div>
              )}

              {showDetailsModal.approvedBy && (
                <div className="text-sm text-gray-500">
                  Approved by {showDetailsModal.approvedBy} on {new Date(showDetailsModal.approvedAt!).toLocaleDateString()}
                </div>
              )}

              {showDetailsModal.distributedAt && (
                <div className="text-sm text-green-600">
                  Distributed on {new Date(showDetailsModal.distributedAt).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailsModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {showDetailsModal.status === 'pending' && (
                <button
                  onClick={() => {
                    handleApproveAllocation(showDetailsModal.id);
                    setShowDetailsModal(null);
                  }}
                  className="px-4 py-2 bg-mizan-primary text-white rounded-lg text-sm hover:bg-mizan-primary/90 transition-colors"
                >
                  Approve
                </button>
              )}
              {showDetailsModal.status === 'approved' && (
                <button
                  onClick={() => {
                    handleDistributeAllocation(showDetailsModal.id);
                    setShowDetailsModal(null);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  Distribute Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
