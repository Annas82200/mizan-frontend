'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ClipboardCheck,
  Calendar,
  Users,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  ChevronDown,
  User,
  FileText,
  Loader2
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface Evaluation {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  reviewerId: string;
  reviewerName: string;
  type: 'annual' | 'mid-year' | 'quarterly' | 'probation';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  overallRating?: number;
  dueDate: string;
  completedAt?: string;
  period: string;
}

interface EvaluationMetrics {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
  averageRating: number;
}

/**
 * Performance Evaluations Page
 * Production-ready: Multi-tenant evaluation management
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function EvaluationsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('');
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [metrics, setMetrics] = useState<EvaluationMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

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

        await fetchEvaluations();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchEvaluations = async () => {
    try {
      interface ApiResponse {
        evaluations: BackendEvaluation[];
        metrics: EvaluationMetrics;
      }

      interface BackendEvaluation {
        id: string;
        employeeId: string;
        employeeName?: string;
        employeeEmail?: string;
        reviewerId?: string;
        reviewerName?: string;
        evaluationType?: string;
        status: string;
        overallScore?: number;
        scheduledDate?: string;
        completedAt?: string;
        period?: string;
      }

      const response = await apiClient.get('/api/performance/evaluations');
      const data = response.data as ApiResponse;

      // Transform backend data to match frontend interface
      const transformedEvaluations: Evaluation[] = (data.evaluations || []).map((e: BackendEvaluation) => ({
        id: e.id,
        employeeId: e.employeeId,
        employeeName: e.employeeName || 'Unknown Employee',
        employeeEmail: e.employeeEmail || '',
        reviewerId: e.reviewerId || '',
        reviewerName: e.reviewerName || 'Unknown Reviewer',
        type: (e.evaluationType || 'annual') as Evaluation['type'],
        status: (e.status === 'draft' || e.status === 'scheduled' ? 'pending' : e.status) as Evaluation['status'],
        overallRating: e.overallScore ? parseFloat(e.overallScore.toString()) : undefined,
        dueDate: e.scheduledDate || new Date().toISOString(),
        completedAt: e.completedAt,
        period: e.period || new Date().getFullYear().toString()
      }));

      setEvaluations(transformedEvaluations);
      setMetrics(data.metrics || {
        total: transformedEvaluations.length,
        pending: transformedEvaluations.filter(e => e.status === 'pending').length,
        inProgress: transformedEvaluations.filter(e => e.status === 'in_progress').length,
        completed: transformedEvaluations.filter(e => e.status === 'completed').length,
        overdue: transformedEvaluations.filter(e => e.status === 'overdue').length,
        averageRating: 0
      });
    } catch (err) {
      logger.error('Error fetching evaluations:', err);
      setError('Failed to load evaluations. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 };
      case 'in_progress': return { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock };
      case 'pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock };
      case 'overdue': return { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'annual': return 'Annual Review';
      case 'mid-year': return 'Mid-Year Review';
      case 'quarterly': return 'Quarterly Review';
      case 'probation': return 'Probation Review';
      default: return type;
    }
  };

  const filteredEvaluations = evaluations.filter(eval_ => {
    const matchesSearch = eval_.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          eval_.employeeEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || eval_.status === statusFilter;
    const matchesType = typeFilter === 'all' || eval_.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

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
              <ClipboardCheck className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Performance Evaluations</h1>
                <p className="text-sm text-gray-600">Manage and track employee evaluations</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/performance')}
                className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Performance</span>
              </button>
              {['superadmin', 'clientAdmin', 'manager'].includes(userRole) && (
                <button className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Evaluation</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Metrics Cards */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-mizan-primary">{metrics.total}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{metrics.pending}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.inProgress}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{metrics.completed}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Avg Rating</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-mizan-gold fill-mizan-gold" />
                  <p className="text-2xl font-bold text-mizan-gold">{metrics.averageRating}</p>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by employee name or email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="annual">Annual</option>
                  <option value="mid-year">Mid-Year</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="probation">Probation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Evaluations List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Employee</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Type</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Period</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Reviewer</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Due Date</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-gray-600">Rating</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvaluations.map((evaluation) => {
                    const statusStyle = getStatusColor(evaluation.status);
                    const StatusIcon = statusStyle.icon;
                    return (
                      <tr key={evaluation.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-mizan-gold/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-mizan-gold" />
                            </div>
                            <div>
                              <p className="font-medium text-mizan-primary">{evaluation.employeeName}</p>
                              <p className="text-sm text-gray-500">{evaluation.employeeEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                            {getTypeLabel(evaluation.type)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{evaluation.period}</td>
                        <td className="py-4 px-6 text-gray-600">{evaluation.reviewerName}</td>
                        <td className="py-4 px-6 text-gray-600">
                          {new Date(evaluation.dueDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {evaluation.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {evaluation.overallRating ? (
                            <div className="flex items-center justify-center space-x-1">
                              <Star className="w-4 h-4 text-mizan-gold fill-mizan-gold" />
                              <span className="font-medium">{evaluation.overallRating}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="px-3 py-1 text-mizan-primary hover:bg-mizan-gold/10 rounded-lg transition-colors flex items-center space-x-1 ml-auto">
                            <FileText className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredEvaluations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <ClipboardCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No evaluations found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
