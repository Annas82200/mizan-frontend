'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  GraduationCap,
  Search,
  Filter,
  Plus,
  Target,
  TrendingUp,
  Users,
  Award,
  BarChart3,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Calendar,
  BookOpen,
  Briefcase,
  Star,
  MessageSquare,
  FileText,
  Play,
  PauseCircle,
  RotateCcw,
  ArrowRight,
  Download,
  Settings,
  User,
  Milestone
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface DevelopmentGoal {
  id: string;
  title: string;
  description: string;
  category: 'skill' | 'behavior' | 'knowledge' | 'experience' | 'certification';
  targetDate: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'high' | 'medium' | 'low';
  activities: DevelopmentActivity[];
}

interface DevelopmentActivity {
  id: string;
  title: string;
  type: 'course' | 'mentoring' | 'project' | 'coaching' | 'assignment' | 'reading' | 'certification';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  completedDate?: string;
}

interface DevelopmentPlan {
  id: string;
  employeeId: string;
  employeeName: string;
  employeePosition: string;
  employeeDepartment: string;
  employeeAvatar: string;
  managerName: string;

  planType: 'individual' | 'succession' | 'leadership' | 'skill_gap';
  status: 'draft' | 'active' | 'completed' | 'on_hold';
  createdAt: string;
  updatedAt: string;
  targetRole?: string;

  overallProgress: number;
  goals: DevelopmentGoal[];

  nextMilestone?: string;
  nextMilestoneDate?: string;

  feedback: number;
  checkIns: number;
  lastCheckIn?: string;
}


function DevelopmentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [plans, setPlans] = useState<DevelopmentPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<DevelopmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  // Modal states
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<DevelopmentPlan | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [plans, searchQuery, departmentFilter, statusFilter, typeFilter]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      interface ApiActivity {
        id: string;
        title: string;
        type: string;
        status: string;
        dueDate: string;
        completedDate?: string;
      }

      interface ApiGoal {
        id: string;
        title: string;
        description: string;
        category: string;
        targetDate: string;
        progress: number;
        status: string;
        priority: string;
        activities: ApiActivity[];
      }

      interface ApiPlan {
        id: string;
        employeeId: string;
        employeeName: string;
        employeePosition: string;
        employeeDepartment: string;
        employeeAvatar: string;
        managerName: string;
        planType: string;
        status: string;
        createdAt: string;
        updatedAt: string;
        targetRole?: string;
        overallProgress: number;
        goals: ApiGoal[];
        nextMilestone?: string;
        nextMilestoneDate?: string;
        feedback: number;
        checkIns: number;
        lastCheckIn?: string;
        title?: string;
        currentRole?: string;
        strengths?: string[];
        developmentAreas?: string[];
        activities?: ApiActivity[];
        progress?: number;
      }

      interface ApiResponse {
        plans: ApiPlan[];
      }

      const response = await apiClient.get('/api/talent/development');
      const data = response.data as ApiResponse;

      // Transform API data to match frontend interface
      const transformedPlans: DevelopmentPlan[] = (data.plans || []).map((p: ApiPlan) => ({
        id: p.id,
        employeeId: p.employeeId || '',
        employeeName: p.employeeName || p.title || 'Development Plan',
        employeePosition: p.employeePosition || p.currentRole || '',
        employeeDepartment: p.employeeDepartment || '',
        employeeAvatar: p.employeeAvatar || '',
        managerName: p.managerName || '',
        planType: (p.planType || 'individual') as DevelopmentPlan['planType'],
        status: (p.status || 'active') as DevelopmentPlan['status'],
        createdAt: p.createdAt || new Date().toISOString().split('T')[0],
        updatedAt: p.updatedAt || new Date().toISOString().split('T')[0],
        targetRole: p.targetRole,
        overallProgress: p.overallProgress ?? p.progress ?? 0,
        goals: (p.goals || []).map((g: ApiGoal, gIdx: number) => ({
          id: g.id || `g-${gIdx}`,
          title: g.title || '',
          description: g.description || '',
          category: (g.category || 'skill') as DevelopmentGoal['category'],
          targetDate: g.targetDate || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: g.progress || 0,
          status: (g.status || 'not_started') as DevelopmentGoal['status'],
          priority: (g.priority || 'medium') as DevelopmentGoal['priority'],
          activities: (g.activities || []).map((a: ApiActivity, aIdx: number) => ({
            id: a.id || `a-${aIdx}`,
            title: a.title || '',
            type: (a.type || 'course') as DevelopmentActivity['type'],
            status: (a.status || 'pending') as DevelopmentActivity['status'],
            dueDate: a.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            completedDate: a.completedDate
          }))
        })),
        nextMilestone: p.nextMilestone,
        nextMilestoneDate: p.nextMilestoneDate,
        feedback: p.feedback || 0,
        checkIns: p.checkIns || 0,
        lastCheckIn: p.lastCheckIn
      }));

      setPlans(transformedPlans);
    } catch (error) {
      logger.error('Error fetching development plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...plans];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.employeeName.toLowerCase().includes(query) ||
        p.employeePosition.toLowerCase().includes(query) ||
        p.targetRole?.toLowerCase().includes(query) ||
        p.goals.some(g => g.title.toLowerCase().includes(query))
      );
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(p => p.employeeDepartment === departmentFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.planType === typeFilter);
    }

    setFilteredPlans(filtered);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'not_started': return 'bg-gray-100 text-gray-800';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'individual': return 'Individual Development';
      case 'succession': return 'Succession Planning';
      case 'leadership': return 'Leadership Development';
      case 'skill_gap': return 'Skill Gap';
      default: return type;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'mentoring': return <Users className="w-4 h-4" />;
      case 'project': return <Briefcase className="w-4 h-4" />;
      case 'coaching': return <MessageSquare className="w-4 h-4" />;
      case 'assignment': return <FileText className="w-4 h-4" />;
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'certification': return <Award className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const openPlanModal = (plan: DevelopmentPlan) => {
    setSelectedPlan(plan);
    setShowPlanModal(true);
  };

  const toggleExpand = (planId: string) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const departments = [...new Set(plans.map(p => p.employeeDepartment))];

  // Metrics
  const totalPlans = plans.length;
  const activePlans = plans.filter(p => p.status === 'active').length;
  const avgProgress = plans.length > 0
    ? Math.round(plans.reduce((acc, p) => acc + p.overallProgress, 0) / plans.length)
    : 0;
  const totalGoals = plans.reduce((acc, p) => acc + p.goals.length, 0);
  const completedGoals = plans.reduce((acc, p) =>
    acc + p.goals.filter(g => g.status === 'completed').length, 0
  );

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
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-mizan-gold" />
            <h1 className="text-3xl font-bold text-gray-900">Development Planning</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              Export
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg hover:bg-yellow-400 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Plan
            </button>
          </div>
        </div>
        <p className="text-gray-600">Create and manage personalized development plans</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Plans</span>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalPlans}</div>
          <div className="text-xs text-gray-500 mt-1">{activePlans} active</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Avg Progress</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{avgProgress}%</div>
          <div className="text-xs text-gray-500 mt-1">Across all plans</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Goals</span>
            <Target className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalGoals}</div>
          <div className="text-xs text-green-600 mt-1">{completedGoals} completed</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Check-ins</span>
            <MessageSquare className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {plans.reduce((acc, p) => acc + p.checkIns, 0)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Total conducted</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Feedback</span>
            <Star className="w-5 h-5 text-mizan-gold" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {plans.reduce((acc, p) => acc + p.feedback, 0)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Items received</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee, role, or goal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              />
            </div>
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Types</option>
            <option value="individual">Individual Development</option>
            <option value="succession">Succession Planning</option>
            <option value="leadership">Leadership Development</option>
            <option value="skill_gap">Skill Gap</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredPlans.length}</span> of {plans.length} development plans
        </p>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        {filteredPlans.map(plan => (
          <div
            key={plan.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Plan Header */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(plan.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-mizan-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {plan.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{plan.employeeName}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(plan.status)}`}>
                        {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.employeePosition}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>{plan.employeeDepartment}</span>
                      <span>•</span>
                      <span>{getTypeLabel(plan.planType)}</span>
                      {plan.targetRole && (
                        <>
                          <span>•</span>
                          <span className="text-mizan-primary">Target: {plan.targetRole}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{plan.overallProgress}%</div>
                    <div className="text-xs text-gray-500">Overall Progress</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{plan.goals.length}</div>
                    <div className="text-xs text-gray-500">Goals</div>
                  </div>
                  {expandedPlan === plan.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-mizan-gold transition-all"
                    style={{ width: `${plan.overallProgress}%` }}
                  />
                </div>
              </div>

              {/* Next Milestone */}
              {plan.nextMilestone && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Milestone className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">Next: {plan.nextMilestone}</span>
                  {plan.nextMilestoneDate && (
                    <span className="text-gray-400">
                      (Due {new Date(plan.nextMilestoneDate).toLocaleDateString()})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {expandedPlan === plan.id && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="space-y-4">
                  {plan.goals.map(goal => (
                    <div key={goal.id} className="bg-white rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{goal.title}</h4>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${getGoalStatusColor(goal.status)}`}>
                              {goal.status.replace('_', ' ').charAt(0).toUpperCase() + goal.status.replace('_', ' ').slice(1)}
                            </span>
                            <span className={`text-xs ${getPriorityColor(goal.priority)}`}>
                              {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{goal.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">{goal.progress}%</div>
                          <div className="text-xs text-gray-500">
                            Due {new Date(goal.targetDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Goal Progress */}
                      <div className="mb-3">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              goal.status === 'completed' ? 'bg-green-500' : 'bg-mizan-gold'
                            }`}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Activities */}
                      <div className="space-y-2">
                        {goal.activities.map(activity => (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded ${
                                activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                                activity.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {getActivityIcon(activity.type)}
                              </div>
                              <span className={activity.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700'}>
                                {activity.title}
                              </span>
                              <span className="text-xs text-gray-400 capitalize">({activity.type})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {activity.status === 'completed' ? (
                                <span className="text-xs text-green-600">
                                  Completed {activity.completedDate && new Date(activity.completedDate).toLocaleDateString()}
                                </span>
                              ) : (
                                <span className="text-xs text-gray-500">
                                  Due {new Date(activity.dueDate).toLocaleDateString()}
                                </span>
                              )}
                              {activity.status === 'completed' && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Last check-in: {plan.lastCheckIn ? new Date(plan.lastCheckIn).toLocaleDateString() : 'Never'}</span>
                    <span>•</span>
                    <span>{plan.feedback} feedback items</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Schedule Check-in
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPlanModal(plan);
                      }}
                      className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg hover:bg-yellow-400 transition-colors text-sm font-medium"
                    >
                      View Full Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No development plans found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors"
          >
            Create New Plan
          </button>
        </div>
      )}

      {/* Plan Detail Modal */}
      {showPlanModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-mizan-primary rounded-full flex items-center justify-center text-white text-xl font-semibold">
                    {selectedPlan.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedPlan.employeeName}</h2>
                    <p className="text-gray-600">{selectedPlan.employeePosition}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(selectedPlan.status)}`}>
                        {selectedPlan.status.charAt(0).toUpperCase() + selectedPlan.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">{getTypeLabel(selectedPlan.planType)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Progress Overview */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Overall Progress</span>
                  <span className="text-2xl font-bold text-mizan-primary">{selectedPlan.overallProgress}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-mizan-gold transition-all"
                    style={{ width: `${selectedPlan.overallProgress}%` }}
                  />
                </div>
              </div>

              {/* Target Role */}
              {selectedPlan.targetRole && (
                <div className="mb-6 p-4 bg-mizan-gold/10 rounded-lg">
                  <div className="flex items-center gap-2 text-mizan-primary">
                    <Target className="w-5 h-5" />
                    <span className="font-medium">Target Role: {selectedPlan.targetRole}</span>
                  </div>
                </div>
              )}

              {/* Goals */}
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Development Goals</h3>
                {selectedPlan.goals.map(goal => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{goal.title}</h4>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${getGoalStatusColor(goal.status)}`}>
                            {goal.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{goal.progress}%</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-mizan-gold transition-all"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {goal.activities.map(activity => (
                        <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            {activity.status === 'completed' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : activity.status === 'in_progress' ? (
                              <Play className="w-4 h-4 text-blue-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={`text-sm ${activity.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                              {activity.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {activity.status === 'completed'
                              ? `Completed ${activity.completedDate && new Date(activity.completedDate).toLocaleDateString()}`
                              : `Due ${new Date(activity.dueDate).toLocaleDateString()}`
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Manager:</span>
                  <span className="ml-2 text-gray-900">{selectedPlan.managerName}</span>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-2 text-gray-900">{new Date(selectedPlan.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="ml-2 text-gray-900">{new Date(selectedPlan.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPlanModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                Edit Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DevelopmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-mizan-gold" /></div>}>
      <DevelopmentPageContent />
    </Suspense>
  );
}
