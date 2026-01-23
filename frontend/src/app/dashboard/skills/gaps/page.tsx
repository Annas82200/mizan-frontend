'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Target,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  Search,
  Filter,
  Loader2,
  ChevronRight,
  Users,
  Building2,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface SkillGap {
  id: string;
  skillName: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  gapSize: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  affectedEmployees: number;
  affectedDepartments: string[];
  recommendedActions: string[];
  estimatedTimeToClose: string;
}

interface GapMetrics {
  totalGaps: number;
  criticalGaps: number;
  highGaps: number;
  mediumGaps: number;
  lowGaps: number;
  averageGapSize: number;
}

/**
 * Skills Gap Analysis Page
 * Production-ready: Organization-wide skills gap identification
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function SkillsGapsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [gaps, setGaps] = useState<SkillGap[]>([]);
  const [metrics, setMetrics] = useState<GapMetrics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

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

        // Gap analysis is admin/manager only
        const allowedRoles = ['superadmin', 'clientAdmin', 'manager'];
        if (!allowedRoles.includes(payload.role)) {
          router.push('/dashboard/skills');
          return;
        }

        await fetchGaps();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchGaps = async () => {
    try {
      // Fetch real gaps from API
      interface ApiGap {
        id?: string;
        skillName: string;
        category?: string;
        currentLevel: number;
        requiredLevel: number;
        gap: number;
        priority?: string;
        employeeCount?: number;
        departments?: string[];
      }

      interface GapsResponse {
        gaps: ApiGap[];
        summary?: {
          totalGaps: number;
          criticalCount: number;
          highCount: number;
          mediumCount: number;
          lowCount: number;
        };
      }

      const response = await apiClient.get<GapsResponse>('/api/skills/gaps');
      const data = response.data;

      // Transform API response to SkillGap format
      const transformedGaps: SkillGap[] = (data.gaps || []).map((g, index) => {
        const gapSize = g.gap || (g.requiredLevel - g.currentLevel);
        let priority: 'critical' | 'high' | 'medium' | 'low' = 'medium';
        if (gapSize > 1.5) priority = 'critical';
        else if (gapSize > 1.0) priority = 'high';
        else if (gapSize > 0.5) priority = 'medium';
        else priority = 'low';

        return {
          id: g.id || String(index + 1),
          skillName: g.skillName,
          category: g.category || 'Technical',
          currentLevel: g.currentLevel,
          requiredLevel: g.requiredLevel,
          gapSize: gapSize,
          priority: priority,
          affectedEmployees: g.employeeCount || 1,
          affectedDepartments: g.departments || ['Unknown'],
          recommendedActions: [
            `Training program for ${g.skillName}`,
            'Mentorship pairing',
            'Online courses'
          ],
          estimatedTimeToClose: `${Math.ceil(gapSize * 3)} months`
        };
      });

      setGaps(transformedGaps);

      // Calculate metrics from actual data
      const criticalGaps = transformedGaps.filter(g => g.priority === 'critical').length;
      const highGaps = transformedGaps.filter(g => g.priority === 'high').length;
      const mediumGaps = transformedGaps.filter(g => g.priority === 'medium').length;
      const lowGaps = transformedGaps.filter(g => g.priority === 'low').length;
      const avgGapSize = transformedGaps.length > 0
        ? transformedGaps.reduce((sum, g) => sum + g.gapSize, 0) / transformedGaps.length
        : 0;

      setMetrics({
        totalGaps: transformedGaps.length,
        criticalGaps,
        highGaps,
        mediumGaps,
        lowGaps,
        averageGapSize: Math.round(avgGapSize * 10) / 10
      });
    } catch (err) {
      logger.error('Error fetching gaps:', err);
      setGaps([]);
      setMetrics({
        totalGaps: 0,
        criticalGaps: 0,
        highGaps: 0,
        mediumGaps: 0,
        lowGaps: 0,
        averageGapSize: 0
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
      case 'high': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' };
      case 'medium': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'low': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const categories = [...new Set(gaps.map(g => g.category))];

  const filteredGaps = gaps.filter(gap => {
    const matchesSearch = gap.skillName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || gap.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || gap.category === categoryFilter;
    return matchesSearch && matchesPriority && matchesCategory;
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
              <Target className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Skills Gap Analysis</h1>
                <p className="text-sm text-gray-600">Identify and address organizational skill gaps</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard/skills')}
              className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Skills</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Total Gaps</p>
                <p className="text-2xl font-bold text-mizan-primary">{metrics.totalGaps}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-red-200">
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">{metrics.criticalGaps}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-200">
                <p className="text-sm text-gray-600">High</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.highGaps}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
                <p className="text-sm text-gray-600">Medium</p>
                <p className="text-2xl font-bold text-yellow-600">{metrics.mediumGaps}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
                <p className="text-sm text-gray-600">Low</p>
                <p className="text-2xl font-bold text-green-600">{metrics.lowGaps}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Avg Gap Size</p>
                <p className="text-2xl font-bold text-mizan-gold">{metrics.averageGapSize.toFixed(1)}</p>
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
                  placeholder="Search skills..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
                />
              </div>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gaps List */}
          <div className="space-y-4">
            {filteredGaps.map((gap) => {
              const priorityStyle = getPriorityColor(gap.priority);

              return (
                <div
                  key={gap.id}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 ${priorityStyle.border} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-mizan-gold/10 rounded-xl flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-mizan-gold" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-mizan-primary text-lg">{gap.skillName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.text}`}>
                            {gap.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{gap.category}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">-{gap.gapSize.toFixed(1)}</p>
                      <p className="text-xs text-gray-500">Gap Size</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Current Level</p>
                      <p className="text-lg font-bold text-orange-600">{gap.currentLevel.toFixed(1)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Required Level</p>
                      <p className="text-lg font-bold text-green-600">{gap.requiredLevel.toFixed(1)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Affected</p>
                        <p className="text-lg font-bold text-mizan-primary">{gap.affectedEmployees}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Time to Close</p>
                      <p className="text-sm font-bold text-mizan-gold">{gap.estimatedTimeToClose}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">AFFECTED DEPARTMENTS</p>
                      <div className="flex flex-wrap gap-2">
                        {gap.affectedDepartments.map((dept, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center space-x-1">
                            <Building2 className="w-3 h-3" />
                            <span>{dept}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-2">RECOMMENDED ACTIONS</p>
                      <div className="space-y-1">
                        {gap.recommendedActions.map((action, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                            <BookOpen className="w-4 h-4 text-mizan-gold" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredGaps.length === 0 && (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <p className="text-gray-500">No skill gaps found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
