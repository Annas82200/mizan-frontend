'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  BarChart3,
  Search,
  Filter,
  Download,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  Award,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Crown,
  Shield,
  Briefcase,
  Star,
  PieChart,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Eye,
  Zap,
  Brain,
  GitBranch,
  GraduationCap,
  Activity
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface TalentMetric {
  label: string;
  value: number;
  previousValue: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  format: 'number' | 'percentage' | 'currency';
}

interface DepartmentBreakdown {
  department: string;
  totalTalent: number;
  highPotentials: number;
  readyNow: number;
  inDevelopment: number;
  atRisk: number;
  successionCoverage: number;
}

interface TrendDataPoint {
  month: string;
  highPotentials: number;
  readyNow: number;
  atRisk: number;
  successionCoverage: number;
}

interface TopInsight {
  id: string;
  type: 'warning' | 'opportunity' | 'achievement' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  link?: string;
}


function AnalyticsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [metrics, setMetrics] = useState<TalentMetric[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentBreakdown[]>([]);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
  const [insights, setInsights] = useState<TopInsight[]>([]);
  const [nineBoxDistribution, setNineBoxDistribution] = useState<number[][]>([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('6m');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      interface ApiResponse {
        metrics: TalentMetric[];
        departmentBreakdown: DepartmentBreakdown[];
        trendData: TrendDataPoint[];
        insights: TopInsight[];
        nineBoxDistribution: number[][];
        totalTalentPool?: number;
        highPotentials?: number;
        readyNow?: number;
        atRisk?: number;
        successionCoverage?: number;
        avgDevelopmentProgress?: number;
        avgBenchStrength?: number;
      }

      const response = await apiClient.get('/api/talent/analytics');
      const data = response.data as ApiResponse;

      // Set metrics - use provided or calculate from summary data
      if (data.metrics && data.metrics.length > 0) {
        setMetrics(data.metrics);
      } else {
        // Build metrics from summary data if available
        const calculatedMetrics: TalentMetric[] = [
          { label: 'Total Talent Pool', value: data.totalTalentPool || 0, previousValue: 0, change: 0, changeType: 'neutral', format: 'number' },
          { label: 'High Potentials', value: data.highPotentials || 0, previousValue: 0, change: 0, changeType: 'neutral', format: 'number' },
          { label: 'Ready Now', value: data.readyNow || 0, previousValue: 0, change: 0, changeType: 'neutral', format: 'number' },
          { label: 'Succession Coverage', value: data.successionCoverage || 0, previousValue: 0, change: 0, changeType: 'neutral', format: 'percentage' },
          { label: 'Avg Development Progress', value: data.avgDevelopmentProgress || 0, previousValue: 0, change: 0, changeType: 'neutral', format: 'percentage' },
          { label: 'At Risk', value: data.atRisk || 0, previousValue: 0, change: 0, changeType: 'neutral', format: 'number' },
          { label: 'Avg Bench Strength', value: data.avgBenchStrength || 0, previousValue: 0, change: 0, changeType: 'neutral', format: 'percentage' },
        ];
        setMetrics(calculatedMetrics);
      }

      setDepartmentData(data.departmentBreakdown || []);
      setTrendData(data.trendData || []);
      setInsights(data.insights || []);
      setNineBoxDistribution(data.nineBoxDistribution || [[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    } catch (error) {
      logger.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatMetricValue = (metric: TalentMetric): string => {
    if (metric.format === 'percentage') {
      return `${metric.value}%`;
    }
    if (metric.format === 'currency') {
      return `$${metric.value.toLocaleString()}`;
    }
    return metric.value.toLocaleString();
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'opportunity': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'achievement': return <Award className="w-5 h-5 text-green-500" />;
      case 'recommendation': return <Brain className="w-5 h-5 text-purple-500" />;
      default: return <Eye className="w-5 h-5 text-gray-500" />;
    }
  };

  const getInsightBgColor = (type: string): string => {
    switch (type) {
      case 'warning': return 'bg-orange-50 border-orange-200';
      case 'opportunity': return 'bg-blue-50 border-blue-200';
      case 'achievement': return 'bg-green-50 border-green-200';
      case 'recommendation': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate max values for charts
  const maxTrendValue = Math.max(
    ...trendData.flatMap(d => [d.highPotentials, d.readyNow, d.atRisk])
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
            <BarChart3 className="w-8 h-8 text-mizan-gold" />
            <h1 className="text-3xl font-bold text-gray-900">Talent Analytics</h1>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
            >
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="12m">Last 12 Months</option>
              <option value="all">All Time</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
        <p className="text-gray-600">Comprehensive insights into your talent pipeline and succession health</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.slice(0, 8).map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">{metric.label}</span>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' :
                metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.change > 0 ? <ArrowUp className="w-3 h-3" /> : metric.change < 0 ? <ArrowDown className="w-3 h-3" /> : null}
                {Math.abs(metric.change).toFixed(1)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatMetricValue(metric)}</div>
            <div className="text-xs text-gray-500 mt-1">vs {metric.previousValue}{metric.format === 'percentage' ? '%' : ''} last period</div>
          </div>
        ))}
      </div>

      {/* Top Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Key Insights & Recommendations</h2>
          <span className="text-sm text-gray-500">{insights.filter(i => i.actionable).length} actionable items</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map(insight => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${getInsightBgColor(insight.type)} ${insight.link ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
              onClick={() => insight.link && router.push(insight.link)}
            >
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getImpactColor(insight.impact)}`}>
                      {insight.impact}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                  {insight.link && (
                    <div className="mt-2 flex items-center gap-1 text-sm text-mizan-primary font-medium">
                      Take Action
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Talent Pipeline Trends</h3>
          <div className="h-64">
            <div className="flex items-end justify-between h-52 gap-4 px-4">
              {trendData.map((point, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-1" style={{ height: '200px' }}>
                    <div className="flex-1 flex items-end gap-1">
                      <div
                        className="flex-1 bg-green-400 rounded-t transition-all"
                        style={{ height: `${(point.highPotentials / maxTrendValue) * 100}%` }}
                        title={`High Potentials: ${point.highPotentials}`}
                      />
                      <div
                        className="flex-1 bg-blue-400 rounded-t transition-all"
                        style={{ height: `${(point.readyNow / maxTrendValue) * 100}%` }}
                        title={`Ready Now: ${point.readyNow}`}
                      />
                      <div
                        className="flex-1 bg-red-400 rounded-t transition-all"
                        style={{ height: `${(point.atRisk / maxTrendValue) * 100}%` }}
                        title={`At Risk: ${point.atRisk}`}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{point.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded" />
                <span className="text-xs text-gray-600">High Potentials</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded" />
                <span className="text-xs text-gray-600">Ready Now</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded" />
                <span className="text-xs text-gray-600">At Risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* 9-Box Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">9-Box Talent Distribution</h3>
          <div className="flex">
            <div className="flex flex-col justify-around items-center mr-2 text-xs text-gray-500">
              <span>High</span>
              <span>Med</span>
              <span>Low</span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-2">
                {nineBoxDistribution.map((row: number[], rowIdx: number) =>
                  row.map((count: number, colIdx: number) => {
                    const bgColor = rowIdx === 0 && colIdx === 2 ? 'bg-green-100' :
                                   rowIdx === 0 || colIdx === 2 ? 'bg-green-50' :
                                   rowIdx === 2 && colIdx === 0 ? 'bg-red-100' :
                                   rowIdx === 2 || colIdx === 0 ? 'bg-yellow-50' :
                                   'bg-gray-50';
                    return (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className={`${bgColor} rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow`}
                      >
                        <div className="text-2xl font-bold text-gray-900">{count}</div>
                        <div className="text-xs text-gray-500">
                          {Math.round((count / 71) * 100)}%
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="flex justify-around mt-2 text-xs text-gray-500">
                <span>Low</span>
                <span>Med</span>
                <span>High</span>
              </div>
              <div className="text-center text-xs text-gray-500 mt-1">Performance</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              <strong>Stars (High/High):</strong> 15 employees (21.1%) | <strong>At Risk:</strong> 8 employees (11.3%)
            </div>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Department Breakdown</h3>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Departments</option>
            {departmentData.map(d => (
              <option key={d.department} value={d.department}>{d.department}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Department</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Total Talent</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">High Potentials</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Ready Now</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">In Development</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">At Risk</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Succession Coverage</th>
              </tr>
            </thead>
            <tbody>
              {departmentData
                .filter(d => selectedDepartment === 'all' || d.department === selectedDepartment)
                .map(dept => (
                <tr key={dept.department} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{dept.department}</td>
                  <td className="text-center py-3 px-4">{dept.totalTalent}</td>
                  <td className="text-center py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                      {dept.highPotentials}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {dept.readyNow}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4">{dept.inDevelopment}</td>
                  <td className="text-center py-3 px-4">
                    {dept.atRisk > 0 ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                        {dept.atRisk}
                      </span>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            dept.successionCoverage >= 80 ? 'bg-green-500' :
                            dept.successionCoverage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${dept.successionCoverage}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${
                        dept.successionCoverage >= 80 ? 'text-green-600' :
                        dept.successionCoverage >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {dept.successionCoverage}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/talent/identification"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-mizan-gold/30 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 group-hover:text-mizan-primary transition-colors">
                Talent Identification
              </h4>
              <p className="text-sm text-gray-500">View all profiles</p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/talent/development"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-mizan-gold/30 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 group-hover:text-mizan-primary transition-colors">
                Development Plans
              </h4>
              <p className="text-sm text-gray-500">Manage plans</p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/talent/succession"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-mizan-gold/30 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 group-hover:text-mizan-primary transition-colors">
                Succession Planning
              </h4>
              <p className="text-sm text-gray-500">Review pipelines</p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/talent"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-mizan-gold/30 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-mizan-gold/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-mizan-primary" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 group-hover:text-mizan-primary transition-colors">
                Talent Overview
              </h4>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-mizan-gold" /></div>}>
      <AnalyticsPageContent />
    </Suspense>
  );
}
