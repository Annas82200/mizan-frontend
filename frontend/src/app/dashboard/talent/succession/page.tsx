'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  GitBranch,
  Search,
  Filter,
  Plus,
  Users,
  Target,
  TrendingUp,
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
  Crown,
  Shield,
  Briefcase,
  Star,
  ArrowRight,
  Download,
  User,
  UserPlus,
  AlertCircle,
  Calendar,
  ChevronRight
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface Successor {
  id: string;
  employeeId: string;
  name: string;
  currentPosition: string;
  department: string;
  readinessLevel: 'ready_now' | 'ready_1_year' | 'ready_2_years' | 'developing';
  performanceRating: number;
  potentialRating: 'high' | 'medium' | 'low';
  developmentProgress: number;
  retentionRisk: 'low' | 'medium' | 'high';
  hasDevelopmentPlan: boolean;
  rank: number;
}

interface CriticalRole {
  id: string;
  title: string;
  department: string;
  level: 'executive' | 'senior' | 'management' | 'key_contributor';
  currentHolder: {
    id: string;
    name: string;
    tenure: number;
    retirementRisk: 'low' | 'medium' | 'high';
    flightRisk: number;
  };
  importance: 'critical' | 'high' | 'medium';
  successors: Successor[];
  benchStrength: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  targetSuccessors: number;
  lastReviewDate: string;
  notes: string;
}

interface SuccessionMetrics {
  totalCriticalRoles: number;
  rolesWithSuccessors: number;
  avgBenchStrength: number;
  readyNowCandidates: number;
  highRiskRoles: number;
  avgSuccessorsPerRole: number;
  successionCoverage: number;
}


function SuccessionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [roles, setRoles] = useState<CriticalRole[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<CriticalRole[]>([]);
  const [metrics, setMetrics] = useState<SuccessionMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  // Modal states
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAddSuccessorModal, setShowAddSuccessorModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<CriticalRole | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [roles, searchQuery, departmentFilter, riskFilter, levelFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      interface ApiSuccessor {
        id: string;
        employeeId: string;
        name: string;
        currentPosition: string;
        department: string;
        readinessLevel: string;
        performanceRating: number;
        potentialRating: string;
        developmentProgress: number;
        retentionRisk: string;
        hasDevelopmentPlan: boolean;
        rank: number;
      }

      interface ApiCriticalRole {
        id: string;
        title: string;
        department: string;
        level: string;
        currentHolder: {
          id: string;
          name: string;
          tenure: number;
          retirementRisk: string;
          flightRisk: number;
        };
        importance: string;
        successors: ApiSuccessor[];
        benchStrength: number;
        riskLevel: string;
        targetSuccessors: number;
        lastReviewDate: string;
        notes: string;
      }

      interface ApiResponse {
        plans: ApiCriticalRole[];
        criticalRoles: ApiCriticalRole[];
        metrics: SuccessionMetrics;
      }

      const response = await apiClient.get('/api/talent/succession');
      const data = response.data as ApiResponse;

      // Transform critical roles data
      const transformedRoles: CriticalRole[] = (data.criticalRoles || data.plans || []).map((r: ApiCriticalRole) => ({
        id: r.id,
        title: r.title,
        department: r.department || '',
        level: (r.level || 'management') as CriticalRole['level'],
        currentHolder: {
          id: r.currentHolder?.id || '',
          name: r.currentHolder?.name || 'Vacant',
          tenure: r.currentHolder?.tenure || 0,
          retirementRisk: (r.currentHolder?.retirementRisk || 'low') as 'low' | 'medium' | 'high',
          flightRisk: r.currentHolder?.flightRisk || 0
        },
        importance: (r.importance || 'medium') as CriticalRole['importance'],
        successors: (r.successors || []).map((s: ApiSuccessor, idx: number) => ({
          id: s.id || `s-${idx}`,
          employeeId: s.employeeId || '',
          name: s.name || '',
          currentPosition: s.currentPosition || '',
          department: s.department || '',
          readinessLevel: (s.readinessLevel || 'developing') as Successor['readinessLevel'],
          performanceRating: s.performanceRating || 3.5,
          potentialRating: (s.potentialRating || 'medium') as Successor['potentialRating'],
          developmentProgress: s.developmentProgress || 50,
          retentionRisk: (s.retentionRisk || 'low') as Successor['retentionRisk'],
          hasDevelopmentPlan: s.hasDevelopmentPlan || false,
          rank: s.rank || idx + 1
        })),
        benchStrength: r.benchStrength || 0,
        riskLevel: (r.riskLevel || 'medium') as CriticalRole['riskLevel'],
        targetSuccessors: r.targetSuccessors || 2,
        lastReviewDate: r.lastReviewDate || new Date().toISOString().split('T')[0],
        notes: r.notes || ''
      }));

      setRoles(transformedRoles);

      // Calculate metrics from data or use provided metrics
      if (data.metrics) {
        setMetrics(data.metrics);
      } else {
        const rolesWithSuccessors = transformedRoles.filter(r => r.successors.length > 0).length;
        const allSuccessors = transformedRoles.flatMap(r => r.successors);
        const readyNow = allSuccessors.filter(s => s.readinessLevel === 'ready_now').length;
        const highRiskCount = transformedRoles.filter(r => r.riskLevel === 'high' || r.riskLevel === 'critical').length;
        const avgBench = transformedRoles.length > 0
          ? transformedRoles.reduce((acc, r) => acc + r.benchStrength, 0) / transformedRoles.length
          : 0;

        setMetrics({
          totalCriticalRoles: transformedRoles.length,
          rolesWithSuccessors,
          avgBenchStrength: avgBench,
          readyNowCandidates: readyNow,
          highRiskRoles: highRiskCount,
          avgSuccessorsPerRole: transformedRoles.length > 0
            ? allSuccessors.length / transformedRoles.length
            : 0,
          successionCoverage: transformedRoles.length > 0
            ? (rolesWithSuccessors / transformedRoles.length) * 100
            : 0
        });
      }
    } catch (error) {
      logger.error('Error fetching succession data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...roles];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.currentHolder.name.toLowerCase().includes(query) ||
        r.successors.some(s => s.name.toLowerCase().includes(query))
      );
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(r => r.department === departmentFilter);
    }

    if (riskFilter !== 'all') {
      filtered = filtered.filter(r => r.riskLevel === riskFilter);
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(r => r.level === levelFilter);
    }

    setFilteredRoles(filtered);
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
      case 'ready_1_year': return '1 Year';
      case 'ready_2_years': return '2 Years';
      case 'developing': return 'Developing';
      default: return 'Unknown';
    }
  };

  const getBenchStrengthColor = (strength: number): string => {
    if (strength >= 70) return 'text-green-600';
    if (strength >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const openRoleModal = (role: CriticalRole) => {
    setSelectedRole(role);
    setShowRoleModal(true);
  };

  const toggleExpand = (roleId: string) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const departments = [...new Set(roles.map(r => r.department))];

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
            <GitBranch className="w-8 h-8 text-mizan-gold" />
            <h1 className="text-3xl font-bold text-gray-900">Succession Planning</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg hover:bg-yellow-400 transition-colors font-medium">
              <Plus className="w-5 h-5" />
              Add Critical Role
            </button>
          </div>
        </div>
        <p className="text-gray-600">Build and manage succession pipelines for critical positions</p>
      </div>

      {/* Alert Banner for Critical Risks */}
      {metrics && metrics.highRiskRoles > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-800">Succession Risk Alert</h3>
              <p className="text-red-600 text-sm">
                {metrics.highRiskRoles} critical role{metrics.highRiskRoles > 1 ? 's' : ''} require{metrics.highRiskRoles === 1 ? 's' : ''} immediate attention
              </p>
            </div>
            <Link
              href="#"
              onClick={() => setRiskFilter('critical')}
              className="ml-auto text-red-600 text-sm font-medium hover:underline"
            >
              View At-Risk Roles
            </Link>
          </div>
        </div>
      )}

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Succession Coverage</span>
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.successionCoverage.toFixed(1)}%</div>
            <div className="text-xs text-gray-500 mt-1">{metrics.rolesWithSuccessors} of {metrics.totalCriticalRoles} roles covered</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Ready Now</span>
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.readyNowCandidates}</div>
            <div className="text-xs text-gray-500 mt-1">Candidates for immediate promotion</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Avg Bench Strength</span>
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.avgBenchStrength.toFixed(0)}%</div>
            <div className="text-xs text-gray-500 mt-1">Across all critical roles</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">High Risk Roles</span>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-600">{metrics.highRiskRoles}</div>
            <div className="text-xs text-gray-500 mt-1">Require immediate attention</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles, holders, or successors..."
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
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Levels</option>
            <option value="executive">Executive</option>
            <option value="senior">Senior Leadership</option>
            <option value="management">Management</option>
            <option value="key_contributor">Key Contributor</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredRoles.length}</span> of {roles.length} critical roles
        </p>
      </div>

      {/* Roles List */}
      <div className="space-y-4">
        {filteredRoles.map(role => (
          <div
            key={role.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Role Header */}
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpand(role.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getRiskColor(role.riskLevel)}`}>
                      {role.riskLevel === 'critical' ? 'Critical Risk' :
                       role.riskLevel === 'high' ? 'High Risk' :
                       role.riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded capitalize">
                      {role.level.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{role.department}</span>
                    <span>•</span>
                    <span>Current: {role.currentHolder.name}</span>
                    <span>•</span>
                    <span>{role.currentHolder.tenure} years tenure</span>
                    {role.currentHolder.retirementRisk === 'high' && (
                      <>
                        <span>•</span>
                        <span className="text-orange-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Retirement risk
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getBenchStrengthColor(role.benchStrength)}`}>
                      {role.benchStrength}%
                    </div>
                    <div className="text-xs text-gray-500">Bench Strength</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-gray-900">
                      {role.successors.length}/{role.targetSuccessors}
                    </div>
                    <div className="text-xs text-gray-500">Successors</div>
                  </div>
                  {expandedRole === role.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Successor Preview */}
              {role.successors.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Successors:</span>
                  <div className="flex items-center -space-x-2">
                    {role.successors.slice(0, 4).map(successor => (
                      <div
                        key={successor.id}
                        className="w-8 h-8 bg-mizan-primary rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                        title={successor.name}
                      >
                        {successor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {role.successors.length > 4 && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold border-2 border-white">
                        +{role.successors.length - 4}
                      </div>
                    )}
                  </div>
                  {role.successors.filter(s => s.readinessLevel === 'ready_now').length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                      {role.successors.filter(s => s.readinessLevel === 'ready_now').length} ready now
                    </span>
                  )}
                </div>
              )}

              {role.successors.length === 0 && (
                <div className="mt-4 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  No successors identified - requires immediate attention
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {expandedRole === role.id && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                {/* Successors */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Succession Pipeline</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRole(role);
                        setShowAddSuccessorModal(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-mizan-primary hover:bg-mizan-gold/10 rounded-lg transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      Add Successor
                    </button>
                  </div>

                  {role.successors.length > 0 ? (
                    <div className="space-y-3">
                      {role.successors.map(successor => (
                        <div key={successor.id} className="bg-white rounded-lg p-4 border border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-mizan-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {successor.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{successor.name}</span>
                                  <span className="text-xs text-gray-400">#{successor.rank}</span>
                                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${getReadinessColor(successor.readinessLevel)}`}>
                                    {getReadinessLabel(successor.readinessLevel)}
                                  </span>
                                  {successor.retentionRisk === 'high' && (
                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                                      <AlertTriangle className="w-3 h-3" />
                                      At Risk
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{successor.currentPosition}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6 text-sm">
                              <div className="text-center">
                                <div className="flex items-center gap-1 text-gray-900">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="font-medium">{successor.performanceRating}</span>
                                </div>
                                <div className="text-xs text-gray-500">Performance</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-gray-900">{successor.developmentProgress}%</div>
                                <div className="text-xs text-gray-500">Dev Progress</div>
                              </div>
                              <div>
                                {successor.hasDevelopmentPlan ? (
                                  <span className="flex items-center gap-1 text-green-600 text-xs">
                                    <CheckCircle className="w-4 h-4" />
                                    Plan Active
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                                    <Clock className="w-4 h-4" />
                                    No Plan
                                  </span>
                                )}
                              </div>
                              <button className="text-mizan-primary hover:underline text-sm">
                                View Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-red-50 rounded-lg p-6 text-center">
                      <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                      <h4 className="font-medium text-red-800 mb-1">No Successors Identified</h4>
                      <p className="text-sm text-red-600 mb-4">
                        This critical role has no succession pipeline. Identify potential successors immediately.
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRole(role);
                          setShowAddSuccessorModal(true);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Identify Successors
                      </button>
                    </div>
                  )}
                </div>

                {/* Notes & Meta */}
                <div className="pt-4 border-t border-gray-200">
                  {role.notes && (
                    <p className="text-sm text-gray-600 mb-3">{role.notes}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Last reviewed: {new Date(role.lastReviewDate).toLocaleDateString()}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openRoleModal(role);
                      }}
                      className="text-mizan-primary font-medium hover:underline"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRoles.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <GitBranch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No roles found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Role Detail Modal */}
      {showRoleModal && selectedRole && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{selectedRole.title}</h2>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getRiskColor(selectedRole.riskLevel)}`}>
                      {selectedRole.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-gray-600">{selectedRole.department} • {selectedRole.level.replace('_', ' ')}</p>
                </div>
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Current Holder */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Current Position Holder</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-mizan-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedRole.currentHolder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{selectedRole.currentHolder.name}</div>
                      <div className="text-sm text-gray-500">{selectedRole.currentHolder.tenure} years in role</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Flight Risk</div>
                      <div className={`font-medium ${selectedRole.currentHolder.flightRisk > 30 ? 'text-red-600' : selectedRole.currentHolder.flightRisk > 15 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {selectedRole.currentHolder.flightRisk}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500">Retirement Risk</div>
                      <div className={`font-medium capitalize ${selectedRole.currentHolder.retirementRisk === 'high' ? 'text-red-600' : selectedRole.currentHolder.retirementRisk === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                        {selectedRole.currentHolder.retirementRisk}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bench Strength */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Bench Strength</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        selectedRole.benchStrength >= 70 ? 'bg-green-500' :
                        selectedRole.benchStrength >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${selectedRole.benchStrength}%` }}
                    />
                  </div>
                  <span className={`text-xl font-bold ${getBenchStrengthColor(selectedRole.benchStrength)}`}>
                    {selectedRole.benchStrength}%
                  </span>
                </div>
              </div>

              {/* Successors */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Succession Pipeline ({selectedRole.successors.length}/{selectedRole.targetSuccessors})
                </h3>
                {selectedRole.successors.length > 0 ? (
                  <div className="space-y-3">
                    {selectedRole.successors.map(successor => (
                      <div key={successor.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{successor.name}</span>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded ${getReadinessColor(successor.readinessLevel)}`}>
                                {getReadinessLabel(successor.readinessLevel)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">{successor.currentPosition}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">{successor.developmentProgress}%</div>
                            <div className="text-xs text-gray-500">Development</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="text-red-600">No successors identified</p>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedRole.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedRole.notes}</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                Edit Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SuccessionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-mizan-gold" /></div>}>
      <SuccessionPageContent />
    </Suspense>
  );
}
