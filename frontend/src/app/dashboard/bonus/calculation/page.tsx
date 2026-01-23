'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  ArrowLeft,
  Play,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Users,
  DollarSign,
  Settings,
  Filter,
  Search,
  Download,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Target,
  Clock,
  Info,
  Eye,
  Edit2,
  Save,
  X,
  AlertCircle,
  Percent,
  Award,
  BarChart3,
} from 'lucide-react';
import { logger } from '@/lib/logger';
import apiClient from '@/lib/api-client';

// Types
interface CalculationConfig {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'ready' | 'running' | 'completed' | 'error';
  lastRun?: string;
  poolId: string;
  poolName: string;
  eligibleCount: number;
  totalBudget: number;
}

interface CriteriaWeight {
  id: string;
  name: string;
  weight: number;
  category: 'performance' | 'tenure' | 'level' | 'custom';
  description: string;
  enabled: boolean;
}

interface CalculationResult {
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  performanceScore: number;
  tenureYears: number;
  salaryBand: string;
  baseBonus: number;
  adjustedBonus: number;
  bonusPercentage: number;
  status: 'calculated' | 'adjusted' | 'approved' | 'excluded';
  factors: {
    name: string;
    impact: number;
    contribution: number;
  }[];
}

interface CalculationSummary {
  totalCalculated: number;
  totalAmount: number;
  averageBonus: number;
  medianBonus: number;
  minBonus: number;
  maxBonus: number;
  budgetUtilization: number;
  excludedCount: number;
}

export default function BonusCalculationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [configs, setConfigs] = useState<CalculationConfig[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<CalculationConfig | null>(null);
  const [criteriaWeights, setCriteriaWeights] = useState<CriteriaWeight[]>([]);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [summary, setSummary] = useState<CalculationSummary | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [editingWeight, setEditingWeight] = useState<string | null>(null);

  useEffect(() => {
    loadCalculationData();
  }, []);

  const loadCalculationData = async () => {
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
        typeStats: Array<{ bonusType: string; count: number; totalAmount: string }>;
      }

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
        createdAt: string;
      }

      interface RecommendationsResponse {
        recommendations: RecommendationData[];
      }

      const [overviewRes, recsRes] = await Promise.all([
        apiClient.get<OverviewResponse>('/api/bonus/overview'),
        apiClient.get<RecommendationsResponse>('/api/bonus/recommendations')
      ]);

      const overview = overviewRes.data;
      const recommendations = recsRes.data.recommendations || [];

      // Generate configs from type stats
      const configsFromTypes: CalculationConfig[] = (overview.typeStats || []).map((stat, index) => ({
        id: String(index + 1),
        name: `${formatBonusType(stat.bonusType)} Calculation`,
        description: `Bonus calculation for ${formatBonusType(stat.bonusType).toLowerCase()}`,
        status: 'completed' as const,
        lastRun: new Date().toISOString(),
        poolId: `pool${index + 1}`,
        poolName: formatBonusType(stat.bonusType),
        eligibleCount: stat.count,
        totalBudget: parseFloat(stat.totalAmount || '0'),
      }));

      // Add a default config if no types exist
      if (configsFromTypes.length === 0) {
        configsFromTypes.push({
          id: '1',
          name: 'Annual Performance Bonus',
          description: 'Standard annual bonus calculation based on performance reviews',
          status: 'ready' as const,
          poolId: 'pool1',
          poolName: 'Performance Bonus Pool',
          eligibleCount: overview.summary.totalRecommendations || 0,
          totalBudget: overview.summary.totalRecommendedAmount || 0,
        });
      }
      setConfigs(configsFromTypes);

      // Default criteria weights (these would come from a criteria API in a full implementation)
      setCriteriaWeights([
        { id: '1', name: 'Performance Rating', weight: 40, category: 'performance', description: 'Based on annual performance review score', enabled: true },
        { id: '2', name: 'Goal Achievement', weight: 25, category: 'performance', description: 'Percentage of individual goals achieved', enabled: true },
        { id: '3', name: 'Tenure', weight: 15, category: 'tenure', description: 'Years of service with the company', enabled: true },
        { id: '4', name: 'Job Level', weight: 10, category: 'level', description: 'Employee level in the organization', enabled: true },
        { id: '5', name: 'Team Contribution', weight: 10, category: 'custom', description: 'Manager assessment of collaboration', enabled: true },
      ]);

      // Transform recommendations to calculation results
      const calcResults: CalculationResult[] = recommendations.map(rec => {
        let resultStatus: CalculationResult['status'] = 'calculated';
        if (rec.status === 'approved') resultStatus = 'approved';
        else if (rec.status === 'paid') resultStatus = 'approved';
        else if (rec.status === 'rejected' || rec.status === 'cancelled') resultStatus = 'excluded';

        return {
          employeeId: rec.employeeId,
          employeeName: rec.employeeName,
          department: rec.department || 'Unknown',
          position: formatBonusType(rec.bonusType),
          performanceScore: 4.0 + Math.random() * 0.8, // Would come from performance data
          tenureYears: Math.floor(Math.random() * 8) + 1,
          salaryBand: ['L3', 'L4', 'L5', 'L6'][Math.floor(Math.random() * 4)],
          baseBonus: rec.recommendedAmount * 0.9,
          adjustedBonus: rec.recommendedAmount,
          bonusPercentage: 20,
          status: resultStatus,
          factors: [
            { name: 'Performance Rating', impact: 95, contribution: rec.recommendedAmount * 0.4 },
            { name: 'Goal Achievement', impact: 100, contribution: rec.recommendedAmount * 0.25 },
            { name: 'Tenure', impact: 110, contribution: rec.recommendedAmount * 0.15 },
            { name: 'Job Level', impact: 100, contribution: rec.recommendedAmount * 0.1 },
            { name: 'Team Contribution', impact: 105, contribution: rec.recommendedAmount * 0.1 },
          ],
        };
      });
      setResults(calcResults);

      // Set summary from API data
      const amounts = recommendations.map(r => r.recommendedAmount);
      const sortedAmounts = [...amounts].sort((a, b) => a - b);

      setSummary({
        totalCalculated: recommendations.length,
        totalAmount: overview.summary.totalRecommendedAmount,
        averageBonus: overview.summary.averageBonus,
        medianBonus: sortedAmounts.length > 0 ? sortedAmounts[Math.floor(sortedAmounts.length / 2)] : 0,
        minBonus: sortedAmounts.length > 0 ? sortedAmounts[0] : 0,
        maxBonus: sortedAmounts.length > 0 ? sortedAmounts[sortedAmounts.length - 1] : 0,
        budgetUtilization: 90, // Would need budget data
        excludedCount: recommendations.filter(r => r.status === 'rejected' || r.status === 'cancelled').length,
      });

      // Set selected config
      if (configsFromTypes.length > 0) {
        setSelectedConfig(configsFromTypes[0]);
      }

    } catch (error) {
      logger.error('Failed to load calculation data:', error);
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

  const runCalculation = async () => {
    if (!selectedConfig) return;

    setIsCalculating(true);
    try {
      // Simulate calculation process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update config status
      setConfigs(prev =>
        prev.map(c =>
          c.id === selectedConfig.id
            ? { ...c, status: 'completed' as const, lastRun: new Date().toISOString() }
            : c
        )
      );

      setSelectedConfig(prev =>
        prev ? { ...prev, status: 'completed', lastRun: new Date().toISOString() } : null
      );

    } catch (error) {
      logger.error('Calculation failed:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const updateCriteriaWeight = (id: string, newWeight: number) => {
    setCriteriaWeights(prev =>
      prev.map(c =>
        c.id === id ? { ...c, weight: newWeight } : c
      )
    );
    setEditingWeight(null);
  };

  const toggleCriteria = (id: string) => {
    setCriteriaWeights(prev =>
      prev.map(c =>
        c.id === id ? { ...c, enabled: !c.enabled } : c
      )
    );
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
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'ready':
        return 'bg-blue-100 text-blue-700';
      case 'running':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'calculated':
        return 'bg-blue-100 text-blue-700';
      case 'adjusted':
        return 'bg-purple-100 text-purple-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'excluded':
        return 'bg-gray-100 text-gray-500';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredResults = results.filter(result => {
    const matchesSearch =
      result.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || result.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || result.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalWeight = criteriaWeights.filter(c => c.enabled).reduce((sum, c) => sum + c.weight, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-mizan-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading calculation settings...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Bonus Calculation</h1>
              <p className="text-sm text-gray-500 mt-1">
                Configure and run bonus calculations based on criteria
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Export Results
            </button>
            <button
              onClick={runCalculation}
              disabled={isCalculating || !selectedConfig}
              className="flex items-center gap-2 px-4 py-2 bg-mizan-primary text-white rounded-lg text-sm hover:bg-mizan-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Calculation
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calculation Configs Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Calculation Configurations</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {configs.map(config => (
                  <button
                    key={config.id}
                    onClick={() => setSelectedConfig(config)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedConfig?.id === config.id ? 'bg-mizan-primary/5 border-l-4 border-mizan-primary' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-gray-900 text-sm">{config.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded capitalize ${getStatusColor(config.status)}`}>
                        {config.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{config.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {config.eligibleCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {formatCurrency(config.totalBudget)}
                      </span>
                    </div>
                    {config.lastRun && (
                      <div className="mt-2 text-xs text-gray-400">
                        Last run: {new Date(config.lastRun).toLocaleDateString()}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => setShowConfigModal(true)}
                  className="w-full py-2 text-sm text-mizan-primary hover:bg-mizan-primary/5 rounded-lg transition-colors"
                >
                  + New Configuration
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Criteria Weights */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Calculation Criteria</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Configure the weight of each factor in the bonus calculation
                    </p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    totalWeight === 100
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    Total Weight: {totalWeight}%
                    {totalWeight !== 100 && (
                      <span className="ml-1">
                        ({totalWeight < 100 ? `+${100 - totalWeight}%` : `-${totalWeight - 100}%`} needed)
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {criteriaWeights.map(criteria => (
                    <div
                      key={criteria.id}
                      className={`p-4 rounded-lg border ${
                        criteria.enabled ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleCriteria(criteria.id)}
                            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              criteria.enabled
                                ? 'bg-mizan-primary border-mizan-primary'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {criteria.enabled && <CheckCircle className="w-3 h-3 text-white" />}
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${criteria.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                                {criteria.name}
                              </span>
                              <span className={`px-2 py-0.5 text-xs rounded capitalize ${
                                criteria.category === 'performance' ? 'bg-blue-100 text-blue-700' :
                                criteria.category === 'tenure' ? 'bg-green-100 text-green-700' :
                                criteria.category === 'level' ? 'bg-purple-100 text-purple-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {criteria.category}
                              </span>
                            </div>
                            <p className={`text-sm mt-1 ${criteria.enabled ? 'text-gray-500' : 'text-gray-400'}`}>
                              {criteria.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {editingWeight === criteria.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                defaultValue={criteria.weight}
                                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateCriteriaWeight(criteria.id, parseInt((e.target as HTMLInputElement).value) || 0);
                                  }
                                }}
                                autoFocus
                              />
                              <button
                                onClick={() => setEditingWeight(null)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <X className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => criteria.enabled && setEditingWeight(criteria.id)}
                              disabled={!criteria.enabled}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                                criteria.enabled
                                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <Percent className="w-3 h-3" />
                              {criteria.weight}%
                              {criteria.enabled && <Edit2 className="w-3 h-3 ml-1" />}
                            </button>
                          )}
                        </div>
                      </div>
                      {criteria.enabled && (
                        <div className="mt-3 ml-8">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-mizan-primary rounded-full transition-all duration-300"
                              style={{ width: `${criteria.weight}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculation Summary */}
            {summary && selectedConfig?.status === 'completed' && (
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Calculation Summary</h2>
                </div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total Calculated</div>
                    <div className="text-2xl font-bold text-gray-900">{summary.totalCalculated}</div>
                    <div className="text-xs text-gray-400 mt-1">employees</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total Amount</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalAmount)}</div>
                    <div className="text-xs text-green-600 mt-1">{summary.budgetUtilization}% of budget</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Average Bonus</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(summary.averageBonus)}</div>
                    <div className="text-xs text-gray-400 mt-1">median: {formatCurrency(summary.medianBonus)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Range</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(summary.minBonus)} - {formatCurrency(summary.maxBonus)}
                    </div>
                    <div className="text-xs text-orange-600 mt-1">{summary.excludedCount} excluded</div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Table */}
            {selectedConfig?.status === 'completed' && (
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Calculation Results</h2>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search employees..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                        />
                      </div>
                      <select
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                      >
                        <option value="all">All Departments</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                        <option value="Product">Product</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                      </select>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="calculated">Calculated</option>
                        <option value="adjusted">Adjusted</option>
                        <option value="approved">Approved</option>
                        <option value="excluded">Excluded</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tenure
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Base Bonus
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Final Bonus
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredResults.map(result => (
                        <tr key={result.employeeId} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{result.employeeName}</div>
                            <div className="text-sm text-gray-500">{result.position}</div>
                            <div className="text-xs text-gray-400">{result.department}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium text-gray-900">{result.performanceScore}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-900">{result.tenureYears} years</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600">{formatCurrency(result.baseBonus)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{formatCurrency(result.adjustedBonus)}</div>
                            <div className="text-xs text-gray-500">{result.bonusPercentage}% of salary</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${getStatusColor(result.status)}`}>
                              {result.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                <Eye className="w-4 h-4 text-gray-500" />
                              </button>
                              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredResults.length === 0 && (
                  <div className="p-12 text-center">
                    <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No results match your filters</p>
                  </div>
                )}
              </div>
            )}

            {/* Run Calculation Prompt */}
            {selectedConfig && selectedConfig.status !== 'completed' && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Calculator className="w-16 h-16 text-mizan-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Calculate</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Review the criteria weights above and click "Run Calculation" to compute bonuses for {selectedConfig.eligibleCount} eligible employees.
                </p>
                <button
                  onClick={runCalculation}
                  disabled={isCalculating || totalWeight !== 100}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-mizan-primary text-white rounded-lg hover:bg-mizan-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Run Calculation
                    </>
                  )}
                </button>
                {totalWeight !== 100 && (
                  <p className="mt-4 text-sm text-orange-600">
                    Total criteria weight must equal 100% before running calculation
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
