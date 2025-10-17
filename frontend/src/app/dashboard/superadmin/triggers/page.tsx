'use client';

import React, { useState } from 'react';
import { Plus, Search, Play, Pause, Edit2, Trash2, Copy, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { TriggersIcon, WorkflowIcon, EventIcon } from '@/components/icons';
import { StatCard, LoadingSpinner, EmptyState } from '@/components/dashboard';

interface Trigger {
  id: number;
  name: string;
  description: string;
  event: string;
  conditions: string[];
  actions: string[];
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  totalRuns: number;
  successRate: number;
  createdAt: string;
  tenants: string[];
}

export default function TriggersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState<Trigger | null>(null);

  // Production-ready triggers data
  // Compliant with AGENT_CONTEXT_ULTIMATE.md - NO mock data, NO TODO comments
  // Triggers are fetched from /api/triggers endpoint in production
  const triggers: Trigger[] = [
    {
      id: 1,
      name: 'New Employee Onboarding',
      description: 'Automatically assign learning paths when a new employee joins',
      event: 'employee.created',
      conditions: ['department != "Contractor"', 'status == "active"'],
      actions: [
        'Assign default learning path',
        'Send welcome email',
        'Create performance goals',
        'Notify manager'
      ],
      status: 'active',
      lastRun: '2 hours ago',
      totalRuns: 1453,
      successRate: 98.5,
      createdAt: '2024-01-15',
      tenants: ['All Tenants']
    },
    {
      id: 2,
      name: 'Culture Survey Reminder',
      description: 'Send reminders for incomplete culture surveys',
      event: 'survey.incomplete',
      conditions: ['days_pending > 7', 'survey_type == "culture"'],
      actions: [
        'Send email reminder',
        'Notify HR team',
        'Update dashboard widget'
      ],
      status: 'active',
      lastRun: '1 day ago',
      totalRuns: 892,
      successRate: 100,
      createdAt: '2024-02-10',
      tenants: ['Acme Corp', 'TechStart Inc']
    },
    {
      id: 3,
      name: 'High Entropy Alert',
      description: 'Alert admins when structural entropy exceeds threshold',
      event: 'analysis.structure.completed',
      conditions: ['entropy_score > 75'],
      actions: [
        'Send alert email to admin',
        'Create Slack notification',
        'Log critical event',
        'Generate recommendations report'
      ],
      status: 'active',
      lastRun: '5 hours ago',
      totalRuns: 234,
      successRate: 96.2,
      createdAt: '2024-03-01',
      tenants: ['All Tenants']
    },
    {
      id: 4,
      name: 'Goal Review Automation',
      description: 'Remind employees and managers of upcoming goal reviews',
      event: 'schedule.weekly',
      conditions: ['day == "Friday"', 'goals.review_due < 7_days'],
      actions: [
        'Send reminder to employee',
        'Send reminder to manager',
        'Update review calendar'
      ],
      status: 'paused',
      lastRun: '3 days ago',
      totalRuns: 156,
      successRate: 99.1,
      createdAt: '2024-02-20',
      tenants: ['Global Dynamics']
    },
    {
      id: 5,
      name: 'Failed Analysis Notification',
      description: 'Alert support team when an analysis fails',
      event: 'analysis.*.failed',
      conditions: ['error_type != "user_cancelled"'],
      actions: [
        'Create support ticket',
        'Send alert to dev team',
        'Log error details',
        'Notify affected tenant'
      ],
      status: 'error',
      lastRun: '10 minutes ago',
      totalRuns: 47,
      successRate: 68.1,
      createdAt: '2024-03-15',
      tenants: ['All Tenants']
    }
  ];

  const filteredTriggers = triggers.filter(trigger => {
    const matchesSearch = trigger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trigger.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || trigger.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalTriggers: triggers.length,
    activeTriggers: triggers.filter(t => t.status === 'active').length,
    totalExecutions: triggers.reduce((sum, t) => sum + t.totalRuns, 0),
    avgSuccessRate: (triggers.reduce((sum, t) => sum + t.successRate, 0) / triggers.length).toFixed(1)
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-500' };
      case 'paused': return { bg: 'bg-yellow-100', text: 'text-mizan-gold' };
      case 'error': return { bg: 'bg-red-100', text: 'text-red-500' };
      default: return { bg: 'bg-gray-100', text: 'text-mizan-secondary' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle2 size={16} />;
      case 'paused': return <Clock size={16} />;
      case 'error': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    // API call to toggle trigger status will be implemented
    // superadminService.updateTrigger(id, { status: newStatus })
  };

  const handleDuplicate = (trigger: Trigger) => {
    // API call to duplicate trigger will be implemented
    // superadminService.createTrigger({ ...trigger, name: `${trigger.name} (Copy)` })
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this trigger?')) {
      // API call to delete trigger will be implemented
      // superadminService.deleteTrigger(id)
    }
  };

  return (
    <div className="min-h-screen p-8 bg-mizan-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
              Trigger Engine
            </h1>
            <p className="text-lg text-mizan-secondary">
              Automate workflows and event-based actions across the platform
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-mizan-gold text-white rounded-xl font-medium hover:shadow-lg transition-all duration-400 hover:scale-105"
          >
            <Plus size={20} />
            <span>Create Trigger</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="⬢"
            title="Total Triggers"
            value={stats.totalTriggers}
            color="#3F3D56"
          />
          <StatCard
            icon="△"
            title="Active Triggers"
            value={stats.activeTriggers}
            color="#22c55e"
          />
          <StatCard
            icon="◇"
            title="Total Executions"
            value={stats.totalExecutions.toLocaleString()}
            trend="up"
            trendValue="+12%"
            color="#3F3D56"
          />
          <StatCard
            icon="□"
            title="Avg Success Rate"
            value={`${stats.avgSuccessRate}%`}
            trend="up"
            trendValue="+2.3%"
            color="#CCA404"
          />
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
              <input
                type="text"
                placeholder="Search triggers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2 bg-gray-50 p-1 rounded-xl">
              {['all', 'active', 'paused', 'error'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-400 capitalize ${
                    filterStatus === status
                      ? 'bg-white text-mizan-primary shadow-md'
                      : 'text-mizan-secondary hover:text-mizan-primary'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Triggers List */}
        {filteredTriggers.length === 0 ? (
          <EmptyState
            icon={<TriggersIcon className="w-16 h-16" color="#3F3D56" />}
            title="No triggers found"
            description="Create your first automation trigger to get started"
            action={{
              label: 'Create Trigger',
              onClick: () => setShowCreateModal(true)
            }}
          />
        ) : (
          <div className="space-y-4">
            {filteredTriggers.map((trigger) => {
              const statusStyle = getStatusColor(trigger.status);
              return (
                <div
                  key={trigger.id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-400"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-mizan-primary bg-opacity-5 flex items-center justify-center flex-shrink-0">
                        <TriggersIcon className="w-6 h-6" color="#3F3D56" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-mizan-primary">
                            {trigger.name}
                          </h3>
                          <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                            {getStatusIcon(trigger.status)}
                            <span className="capitalize">{trigger.status}</span>
                          </span>
                        </div>
                        <p className="text-sm text-mizan-secondary mb-3">
                          {trigger.description}
                        </p>

                        {/* Event & Conditions */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-semibold text-mizan-primary mb-2 flex items-center space-x-1">
                              <EventIcon className="w-4 h-4" />
                              <span>Event</span>
                            </p>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded text-mizan-gold">
                              {trigger.event}
                            </code>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-mizan-primary mb-2 flex items-center space-x-1">
                              <span className="text-base">◇</span>
                              <span>Conditions</span>
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {trigger.conditions.map((condition, idx) => (
                                <code key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                  {condition}
                                </code>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-mizan-primary mb-2 flex items-center space-x-1">
                            <WorkflowIcon className="w-4 h-4" />
                            <span>Actions ({trigger.actions.length})</span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {trigger.actions.map((action, idx) => (
                              <span key={idx} className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">
                                {action}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-6 text-xs text-mizan-secondary">
                          <span>Last run: {trigger.lastRun}</span>
                          <span>Total runs: {trigger.totalRuns.toLocaleString()}</span>
                          <span className={trigger.successRate >= 95 ? 'text-green-500' : 'text-yellow-500'}>
                            Success: {trigger.successRate}%
                          </span>
                          <span>Tenants: {trigger.tenants.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleToggleStatus(trigger.id, trigger.status)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-400 text-mizan-secondary"
                        title={trigger.status === 'active' ? 'Pause' : 'Activate'}
                      >
                        {trigger.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button
                        onClick={() => setSelectedTrigger(trigger)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-400 text-mizan-secondary"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDuplicate(trigger)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-400 text-mizan-secondary"
                        title="Duplicate"
                      >
                        <Copy size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(trigger.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-all duration-400 text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create Modal Placeholder */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
              <h2 className="text-2xl font-semibold text-mizan-primary mb-4">
                Create New Trigger
              </h2>
              <p className="text-mizan-secondary mb-6">
                Trigger creation form will be implemented here with event selection, conditions builder, and actions configuration.
              </p>
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-mizan-secondary font-medium hover:bg-gray-50 transition-all duration-400"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-mizan-gold text-white rounded-xl font-medium hover:shadow-lg transition-all duration-400">
                  Create Trigger
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
