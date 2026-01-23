'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Target,
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Settings,
  Percent,
  Users,
  DollarSign,
  Calendar,
  ChevronDown,
  ChevronRight,
  Info,
  Copy,
  Archive,
  Eye,
  EyeOff,
  GripVertical,
  Layers,
  Scale,
  Award,
  Clock,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { logger } from '@/lib/logger';
import apiClient from '@/lib/api-client';

// Types
interface BonusCriteria {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'tenure' | 'level' | 'attendance' | 'goals' | 'custom';
  type: 'percentage' | 'fixed' | 'multiplier' | 'threshold';
  weight: number;
  enabled: boolean;
  conditions: CriteriaCondition[];
  applicablePools: string[];
  createdAt: string;
  updatedAt: string;
}

interface CriteriaCondition {
  id: string;
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'between' | 'in';
  value: string | number | number[] | string[];
  bonusImpact: number;
}

interface BonusPool {
  id: string;
  name: string;
  budget: number;
}

interface CriteriaTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultWeight: number;
  conditions: Partial<CriteriaCondition>[];
}

export default function BonusCriteriaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [criteria, setCriteria] = useState<BonusCriteria[]>([]);
  const [pools, setPools] = useState<BonusPool[]>([]);
  const [templates, setTemplates] = useState<CriteriaTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState<BonusCriteria | null>(null);
  const [expandedCriteria, setExpandedCriteria] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'performance' as BonusCriteria['category'],
    type: 'percentage' as BonusCriteria['type'],
    weight: 10,
    enabled: true,
    applicablePools: [] as string[],
  });
  const [formConditions, setFormConditions] = useState<Partial<CriteriaCondition>[]>([]);

  useEffect(() => {
    loadCriteriaData();
  }, []);

  const loadCriteriaData = async () => {
    setIsLoading(true);
    try {
      // Fetch bonus type stats to provide context for criteria
      interface OverviewResponse {
        summary: {
          totalRecommendations: number;
          totalRecommendedAmount: number;
          averageBonus: number;
        };
        typeStats: Array<{ bonusType: string; count: number; totalAmount: string }>;
      }

      const overviewRes = await apiClient.get<OverviewResponse>('/api/bonus/overview');
      const overview = overviewRes.data;

      // Generate pools from bonus types in the system
      const poolsFromTypes: BonusPool[] = (overview.typeStats || []).map((stat, index) => ({
        id: `pool${index + 1}`,
        name: formatBonusType(stat.bonusType),
        budget: parseFloat(stat.totalAmount || '0'),
      }));

      // Add default pools if none exist
      if (poolsFromTypes.length === 0) {
        poolsFromTypes.push(
          { id: 'pool1', name: 'Annual Performance Bonus', budget: overview.summary.totalRecommendedAmount || 0 },
          { id: 'pool2', name: 'Spot Bonus Reserve', budget: 0 }
        );
      }
      setPools(poolsFromTypes);

      // Set standard criteria (would come from a criteria table in full implementation)
      setCriteria([
        {
          id: '1',
          name: 'Performance Rating',
          description: 'Bonus multiplier based on annual performance review score',
          category: 'performance',
          type: 'multiplier',
          weight: 40,
          enabled: true,
          conditions: [
            { id: 'c1', field: 'performanceScore', operator: 'greater_than', value: 4.5, bonusImpact: 150 },
            { id: 'c2', field: 'performanceScore', operator: 'between', value: [4.0, 4.5], bonusImpact: 125 },
            { id: 'c3', field: 'performanceScore', operator: 'between', value: [3.5, 4.0], bonusImpact: 100 },
            { id: 'c4', field: 'performanceScore', operator: 'between', value: [3.0, 3.5], bonusImpact: 75 },
            { id: 'c5', field: 'performanceScore', operator: 'less_than', value: 3.0, bonusImpact: 0 },
          ],
          applicablePools: poolsFromTypes.slice(0, 2).map(p => p.id),
          createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Goal Achievement',
          description: 'Percentage of individual and team goals achieved',
          category: 'goals',
          type: 'percentage',
          weight: 25,
          enabled: true,
          conditions: [
            { id: 'c6', field: 'goalCompletion', operator: 'greater_than', value: 100, bonusImpact: 120 },
            { id: 'c7', field: 'goalCompletion', operator: 'between', value: [90, 100], bonusImpact: 100 },
            { id: 'c8', field: 'goalCompletion', operator: 'between', value: [75, 90], bonusImpact: 80 },
            { id: 'c9', field: 'goalCompletion', operator: 'less_than', value: 75, bonusImpact: 50 },
          ],
          applicablePools: [poolsFromTypes[0]?.id || 'pool1'],
          createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Tenure Bonus',
          description: 'Additional bonus based on years of service',
          category: 'tenure',
          type: 'fixed',
          weight: 15,
          enabled: true,
          conditions: [
            { id: 'c10', field: 'tenureYears', operator: 'greater_than', value: 10, bonusImpact: 5000 },
            { id: 'c11', field: 'tenureYears', operator: 'between', value: [5, 10], bonusImpact: 3000 },
            { id: 'c12', field: 'tenureYears', operator: 'between', value: [2, 5], bonusImpact: 1500 },
            { id: 'c13', field: 'tenureYears', operator: 'less_than', value: 2, bonusImpact: 500 },
          ],
          applicablePools: poolsFromTypes.map(p => p.id),
          createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Job Level Multiplier',
          description: 'Bonus factor based on employee level in hierarchy',
          category: 'level',
          type: 'multiplier',
          weight: 10,
          enabled: true,
          conditions: [
            { id: 'c14', field: 'jobLevel', operator: 'equals', value: 'L6', bonusImpact: 150 },
            { id: 'c15', field: 'jobLevel', operator: 'equals', value: 'L5', bonusImpact: 125 },
            { id: 'c16', field: 'jobLevel', operator: 'equals', value: 'L4', bonusImpact: 100 },
            { id: 'c17', field: 'jobLevel', operator: 'equals', value: 'L3', bonusImpact: 80 },
            { id: 'c18', field: 'jobLevel', operator: 'in', value: ['L1', 'L2'], bonusImpact: 60 },
          ],
          applicablePools: poolsFromTypes.slice(0, 2).map(p => p.id),
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          name: 'Team Contribution',
          description: 'Manager assessment of team collaboration and contribution',
          category: 'custom',
          type: 'multiplier',
          weight: 10,
          enabled: true,
          conditions: [
            { id: 'c22', field: 'teamScore', operator: 'greater_than', value: 4, bonusImpact: 120 },
            { id: 'c23', field: 'teamScore', operator: 'between', value: [3, 4], bonusImpact: 100 },
            { id: 'c24', field: 'teamScore', operator: 'less_than', value: 3, bonusImpact: 80 },
          ],
          applicablePools: [poolsFromTypes[0]?.id || 'pool1'],
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      // Standard templates
      setTemplates([
        {
          id: 't1',
          name: 'Performance-Based',
          description: 'Standard performance rating bonus',
          category: 'performance',
          defaultWeight: 30,
          conditions: [
            { field: 'performanceScore', operator: 'greater_than', value: 4.5, bonusImpact: 150 },
            { field: 'performanceScore', operator: 'between', value: [3.5, 4.5], bonusImpact: 100 },
            { field: 'performanceScore', operator: 'less_than', value: 3.5, bonusImpact: 50 },
          ],
        },
        {
          id: 't2',
          name: 'Tenure-Based',
          description: 'Loyalty bonus based on years of service',
          category: 'tenure',
          defaultWeight: 15,
          conditions: [
            { field: 'tenureYears', operator: 'greater_than', value: 5, bonusImpact: 3000 },
            { field: 'tenureYears', operator: 'between', value: [2, 5], bonusImpact: 1500 },
            { field: 'tenureYears', operator: 'less_than', value: 2, bonusImpact: 500 },
          ],
        },
        {
          id: 't3',
          name: 'Goal Achievement',
          description: 'OKR/goal completion bonus',
          category: 'goals',
          defaultWeight: 25,
          conditions: [
            { field: 'goalCompletion', operator: 'greater_than', value: 100, bonusImpact: 120 },
            { field: 'goalCompletion', operator: 'between', value: [80, 100], bonusImpact: 100 },
            { field: 'goalCompletion', operator: 'less_than', value: 80, bonusImpact: 60 },
          ],
        },
      ]);

    } catch (error) {
      logger.error('Failed to load criteria data:', error);
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance':
        return <Award className="w-4 h-4" />;
      case 'tenure':
        return <Clock className="w-4 h-4" />;
      case 'level':
        return <Briefcase className="w-4 h-4" />;
      case 'attendance':
        return <Calendar className="w-4 h-4" />;
      case 'goals':
        return <Target className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance':
        return 'bg-blue-100 text-blue-700';
      case 'tenure':
        return 'bg-green-100 text-green-700';
      case 'level':
        return 'bg-purple-100 text-purple-700';
      case 'attendance':
        return 'bg-orange-100 text-orange-700';
      case 'goals':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'Percentage';
      case 'fixed':
        return 'Fixed Amount';
      case 'multiplier':
        return 'Multiplier';
      case 'threshold':
        return 'Threshold';
      default:
        return type;
    }
  };

  const getOperatorLabel = (operator: string) => {
    switch (operator) {
      case 'equals':
        return '=';
      case 'greater_than':
        return '>';
      case 'less_than':
        return '<';
      case 'between':
        return 'between';
      case 'in':
        return 'in';
      default:
        return operator;
    }
  };

  const formatConditionValue = (value: string | number | number[] | string[]) => {
    if (Array.isArray(value)) {
      return value.join(' - ');
    }
    return String(value);
  };

  const toggleCriteriaEnabled = (id: string) => {
    setCriteria(prev =>
      prev.map(c =>
        c.id === id ? { ...c, enabled: !c.enabled } : c
      )
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedCriteria(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const deleteCriteria = (id: string) => {
    if (confirm('Are you sure you want to delete this criteria?')) {
      setCriteria(prev => prev.filter(c => c.id !== id));
    }
  };

  const duplicateCriteria = (criteriaItem: BonusCriteria) => {
    const newCriteria: BonusCriteria = {
      ...criteriaItem,
      id: `copy-${Date.now()}`,
      name: `${criteriaItem.name} (Copy)`,
      enabled: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCriteria(prev => [...prev, newCriteria]);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'performance',
      type: 'percentage',
      weight: 10,
      enabled: true,
      applicablePools: [],
    });
    setFormConditions([]);
    setEditingCriteria(null);
  };

  const handleSaveCriteria = () => {
    if (!formData.name) return;

    const newCriteria: BonusCriteria = {
      id: editingCriteria?.id || `new-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      type: formData.type,
      weight: formData.weight,
      enabled: formData.enabled,
      conditions: formConditions.map((c, i) => ({
        id: `cond-${Date.now()}-${i}`,
        field: c.field || '',
        operator: c.operator || 'equals',
        value: c.value || '',
        bonusImpact: c.bonusImpact || 0,
      })) as CriteriaCondition[],
      applicablePools: formData.applicablePools,
      createdAt: editingCriteria?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingCriteria) {
      setCriteria(prev =>
        prev.map(c => c.id === editingCriteria.id ? newCriteria : c)
      );
    } else {
      setCriteria(prev => [...prev, newCriteria]);
    }

    setShowCreateModal(false);
    resetForm();
  };

  const openEditModal = (criteriaItem: BonusCriteria) => {
    setEditingCriteria(criteriaItem);
    setFormData({
      name: criteriaItem.name,
      description: criteriaItem.description,
      category: criteriaItem.category,
      type: criteriaItem.type,
      weight: criteriaItem.weight,
      enabled: criteriaItem.enabled,
      applicablePools: criteriaItem.applicablePools,
    });
    setFormConditions(criteriaItem.conditions);
    setShowCreateModal(true);
  };

  const addCondition = () => {
    setFormConditions(prev => [
      ...prev,
      { field: '', operator: 'equals', value: '', bonusImpact: 100 },
    ]);
  };

  const removeCondition = (index: number) => {
    setFormConditions(prev => prev.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, updates: Partial<CriteriaCondition>) => {
    setFormConditions(prev =>
      prev.map((c, i) => i === index ? { ...c, ...updates } : c)
    );
  };

  const filteredCriteria = criteria.filter(
    c => selectedCategory === 'all' || c.category === selectedCategory
  );

  const totalWeight = criteria.filter(c => c.enabled).reduce((sum, c) => sum + c.weight, 0);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'performance', label: 'Performance' },
    { id: 'goals', label: 'Goals' },
    { id: 'tenure', label: 'Tenure' },
    { id: 'level', label: 'Level' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'custom', label: 'Custom' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-mizan-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading criteria...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Bonus Criteria</h1>
              <p className="text-sm text-gray-500 mt-1">
                Define and manage bonus eligibility criteria and weights
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
              totalWeight === 100
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-700'
            }`}>
              <Scale className="w-4 h-4 inline mr-2" />
              Total Weight: {totalWeight}%
              {totalWeight !== 100 && (
                <span className="ml-1 text-xs">
                  (should be 100%)
                </span>
              )}
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-mizan-primary text-white rounded-lg text-sm hover:bg-mizan-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Criteria
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-mizan-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Criteria List */}
        <div className="space-y-4">
          {filteredCriteria.map(criteriaItem => (
            <div
              key={criteriaItem.id}
              className={`bg-white rounded-xl border ${
                criteriaItem.enabled ? 'border-gray-200' : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <button
                      onClick={() => toggleCriteriaEnabled(criteriaItem.id)}
                      className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        criteriaItem.enabled
                          ? 'bg-mizan-primary border-mizan-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {criteriaItem.enabled && <CheckCircle className="w-3 h-3 text-white" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{criteriaItem.name}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded flex items-center gap-1 ${getCategoryColor(criteriaItem.category)}`}>
                          {getCategoryIcon(criteriaItem.category)}
                          {criteriaItem.category}
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
                          {getTypeLabel(criteriaItem.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{criteriaItem.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Percent className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{criteriaItem.weight}%</span>
                          <span className="text-gray-500">weight</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{criteriaItem.conditions.length} conditions</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{criteriaItem.applicablePools.length} pools</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleExpanded(criteriaItem.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {expandedCriteria.includes(criteriaItem.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={() => openEditModal(criteriaItem)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => duplicateCriteria(criteriaItem)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => deleteCriteria(criteriaItem.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedCriteria.includes(criteriaItem.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Conditions */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Conditions</h4>
                        <div className="space-y-2">
                          {criteriaItem.conditions.map(condition => (
                            <div
                              key={condition.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-gray-600">{condition.field}</span>
                                <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 font-mono text-xs">
                                  {getOperatorLabel(condition.operator)}
                                </span>
                                <span className="font-medium text-gray-900">
                                  {formatConditionValue(condition.value)}
                                </span>
                              </div>
                              <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                                condition.bonusImpact > 100
                                  ? 'bg-green-100 text-green-700'
                                  : condition.bonusImpact < 100
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {criteriaItem.type === 'fixed'
                                  ? `$${condition.bonusImpact.toLocaleString()}`
                                  : `${condition.bonusImpact}%`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Applicable Pools */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Applicable Pools</h4>
                        <div className="space-y-2">
                          {criteriaItem.applicablePools.length > 0 ? (
                            criteriaItem.applicablePools.map(poolId => {
                              const pool = pools.find(p => p.id === poolId);
                              return pool ? (
                                <div
                                  key={poolId}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <span className="text-sm text-gray-900">{pool.name}</span>
                                  <span className="text-sm text-gray-500">
                                    ${(pool.budget / 1000000).toFixed(1)}M
                                  </span>
                                </div>
                              ) : null;
                            })
                          ) : (
                            <p className="text-sm text-gray-500 italic">No pools assigned</p>
                          )}
                        </div>
                        <div className="mt-4 text-xs text-gray-400">
                          Last updated: {new Date(criteriaItem.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Weight Bar */}
              {criteriaItem.enabled && (
                <div className="px-4 pb-4">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-mizan-primary rounded-full transition-all duration-300"
                      style={{ width: `${criteriaItem.weight}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCriteria.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No criteria found</h3>
            <p className="text-gray-500 mb-4">
              {selectedCategory === 'all'
                ? 'Get started by creating your first bonus criteria'
                : `No criteria in the "${selectedCategory}" category`}
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-mizan-primary text-white rounded-lg hover:bg-mizan-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Criteria
            </button>
          </div>
        )}

        {/* Templates Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => {
                  setFormData({
                    name: template.name,
                    description: template.description,
                    category: template.category as BonusCriteria['category'],
                    type: 'multiplier',
                    weight: template.defaultWeight,
                    enabled: true,
                    applicablePools: [],
                  });
                  setFormConditions(template.conditions);
                  setShowCreateModal(true);
                }}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-mizan-primary hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${getCategoryColor(template.category)}`}>
                    {getCategoryIcon(template.category)}
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-mizan-primary transition-colors">
                    {template.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-3">{template.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{template.conditions.length} conditions</span>
                  <span>{template.defaultWeight}% default weight</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingCriteria ? 'Edit Criteria' : 'Add New Criteria'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                    placeholder="e.g., Performance Rating Bonus"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                    rows={2}
                    placeholder="Describe what this criteria measures..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as BonusCriteria['category'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                    >
                      <option value="performance">Performance</option>
                      <option value="goals">Goals</option>
                      <option value="tenure">Tenure</option>
                      <option value="level">Level</option>
                      <option value="attendance">Attendance</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as BonusCriteria['type'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-primary focus:border-transparent"
                    >
                      <option value="multiplier">Multiplier (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                      <option value="percentage">Percentage</option>
                      <option value="threshold">Threshold</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight: {formData.weight}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Conditions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Conditions</label>
                  <button
                    onClick={addCondition}
                    className="text-sm text-mizan-primary hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Condition
                  </button>
                </div>
                <div className="space-y-3">
                  {formConditions.map((condition, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="text"
                        value={condition.field || ''}
                        onChange={(e) => updateCondition(index, { field: e.target.value })}
                        placeholder="Field name"
                        className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded"
                      />
                      <select
                        value={condition.operator || 'equals'}
                        onChange={(e) => updateCondition(index, { operator: e.target.value as CriteriaCondition['operator'] })}
                        className="px-2 py-1.5 text-sm border border-gray-300 rounded"
                      >
                        <option value="equals">=</option>
                        <option value="greater_than">&gt;</option>
                        <option value="less_than">&lt;</option>
                        <option value="between">between</option>
                        <option value="in">in</option>
                      </select>
                      <input
                        type="text"
                        value={String(condition.value || '')}
                        onChange={(e) => updateCondition(index, { value: e.target.value })}
                        placeholder="Value"
                        className="w-24 px-2 py-1.5 text-sm border border-gray-300 rounded"
                      />
                      <input
                        type="number"
                        value={condition.bonusImpact || 0}
                        onChange={(e) => updateCondition(index, { bonusImpact: parseInt(e.target.value) || 0 })}
                        placeholder="Impact"
                        className="w-20 px-2 py-1.5 text-sm border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => removeCondition(index)}
                        className="p-1.5 hover:bg-red-100 rounded"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  {formConditions.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No conditions defined. Add conditions to specify how this criteria affects bonuses.
                    </p>
                  )}
                </div>
              </div>

              {/* Applicable Pools */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Applicable Bonus Pools</label>
                <div className="space-y-2">
                  {pools.map(pool => (
                    <label
                      key={pool.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={formData.applicablePools.includes(pool.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              applicablePools: [...formData.applicablePools, pool.id],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              applicablePools: formData.applicablePools.filter(id => id !== pool.id),
                            });
                          }
                        }}
                        className="w-4 h-4 text-mizan-primary rounded"
                      />
                      <span className="flex-1 text-sm text-gray-900">{pool.name}</span>
                      <span className="text-sm text-gray-500">${(pool.budget / 1000).toLocaleString()}k</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCriteria}
                disabled={!formData.name}
                className="px-4 py-2 bg-mizan-primary text-white rounded-lg text-sm hover:bg-mizan-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingCriteria ? 'Update Criteria' : 'Create Criteria'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
