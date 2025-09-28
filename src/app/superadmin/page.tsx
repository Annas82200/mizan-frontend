"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { 
  Shield, 
  Database, 
  Settings, 
  Users, 
  BarChart3, 
  Brain,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Globe,
  Zap,
  Target
} from 'lucide-react';

interface SuperAdminMetrics {
  totalTenants: number;
  totalUsers: number;
  totalAnalyses: number;
  systemHealth: number;
  aiProviderStatus: {
    openai: 'healthy' | 'warning' | 'error';
    anthropic: 'healthy' | 'warning' | 'error';
    gemini: 'healthy' | 'warning' | 'error';
  };
  recentActivity: Array<{
    tenant: string;
    action: string;
    timestamp: string;
    status: 'success' | 'warning' | 'error';
  }>;
}

interface TenantOverview {
  id: string;
  name: string;
  employees: number;
  tier: 'basic' | 'premium' | 'enterprise';
  lastActivity: string;
  health: number;
  status: 'active' | 'inactive' | 'trial';
}

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<SuperAdminMetrics | null>(null);
  const [tenants, setTenants] = useState<TenantOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'overview' | 'tenants' | 'ai' | 'training'>('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setMetrics({
        totalTenants: 47,
        totalUsers: 12450,
        totalAnalyses: 8920,
        systemHealth: 96,
        aiProviderStatus: {
          openai: 'healthy',
          anthropic: 'healthy',
          gemini: 'warning'
        },
        recentActivity: [
          { tenant: 'TechCorp Inc', action: 'Culture Analysis Completed', timestamp: '2 minutes ago', status: 'success' },
          { tenant: 'StartupXYZ', action: 'New User Registration', timestamp: '5 minutes ago', status: 'success' },
          { tenant: 'Enterprise Ltd', action: 'Skills Assessment Failed', timestamp: '12 minutes ago', status: 'error' },
          { tenant: 'MidSize Co', action: 'Structure Analysis Started', timestamp: '18 minutes ago', status: 'success' }
        ]
      });

      setTenants([
        { id: '1', name: 'TechCorp Inc', employees: 1250, tier: 'enterprise', lastActivity: '2 hours ago', health: 94, status: 'active' },
        { id: '2', name: 'StartupXYZ', employees: 45, tier: 'basic', lastActivity: '5 minutes ago', health: 87, status: 'active' },
        { id: '3', name: 'Enterprise Ltd', employees: 2100, tier: 'premium', lastActivity: '1 day ago', health: 78, status: 'active' },
        { id: '4', name: 'MidSize Co', employees: 320, tier: 'premium', lastActivity: '3 hours ago', health: 91, status: 'active' },
        { id: '5', name: 'NewCorp Trial', employees: 25, tier: 'basic', lastActivity: '1 week ago', health: 65, status: 'trial' }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': case 'active': case 'success': return 'text-green-500';
      case 'warning': case 'trial': return 'text-yellow-500';
      case 'error': case 'inactive': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'healthy': case 'active': case 'success': return 'bg-green-100';
      case 'warning': case 'trial': return 'bg-yellow-100';
      case 'error': case 'inactive': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mizan-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SuperAdmin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-mizan-teal rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-mizan-dark">Mizan</span>
              <span className="ml-4 text-sm text-gray-500 bg-red-100 text-red-800 px-2 py-1 rounded-full">SuperAdmin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {user?.name?.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'tenants', name: 'Tenants', icon: Users },
                { id: 'ai', name: 'AI Providers', icon: Brain },
                { id: 'training', name: 'Training', icon: Target }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id as any)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedView === tab.id
                      ? 'border-mizan-teal text-mizan-teal'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedView === 'overview' && (
          <>
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="metric-card">
                <div className="metric-value">{metrics?.totalTenants}</div>
                <div className="metric-label">Active Tenants</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{metrics?.totalUsers.toLocaleString()}</div>
                <div className="metric-label">Total Users</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{metrics?.totalAnalyses.toLocaleString()}</div>
                <div className="metric-label">Analyses Run</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{metrics?.systemHealth}%</div>
                <div className="metric-label">System Health</div>
              </div>
            </div>

            {/* AI Provider Status */}
            <div className="mizan-card mb-8">
              <h2 className="text-xl font-semibold text-mizan-dark mb-6">AI Provider Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(metrics?.aiProviderStatus || {}).map(([provider, status]) => (
                  <div key={provider} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Brain className="w-5 h-5 text-mizan-teal mr-2" />
                        <span className="font-medium capitalize">{provider}</span>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'healthy' ? 'bg-green-500' :
                        status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <div className="mt-2">
                      <span className={`text-sm ${getStatusColor(status)} capitalize`}>
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mizan-card">
              <h2 className="text-xl font-semibold text-mizan-dark mb-6">Recent Activity</h2>
              <div className="space-y-3">
                {metrics?.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <span className="font-medium text-gray-900">{activity.tenant}</span>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Tenants Tab */}
        {selectedView === 'tenants' && (
          <div className="mizan-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-mizan-dark">Tenant Management</h2>
              <button className="mizan-button-primary">
                Add New Tenant
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employees
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Health
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tenants.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{tenant.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tenant.employees.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          tenant.tier === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                          tenant.tier === 'premium' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {tenant.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-mizan-teal h-2 rounded-full" 
                              style={{ width: `${tenant.health}%` }}
                            ></div>
                          </div>
                          <span>{tenant.health}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBg(tenant.status)} ${getStatusColor(tenant.status)}`}>
                          {tenant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tenant.lastActivity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-mizan-teal hover:text-mizan-dark mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Settings
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Providers Tab */}
        {selectedView === 'ai' && (
          <div className="space-y-6">
            <div className="mizan-card">
              <h2 className="text-xl font-semibold text-mizan-dark mb-6">AI Provider Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'OpenAI', status: 'healthy', usage: '85%', cost: '$2,450' },
                  { name: 'Anthropic', status: 'healthy', usage: '72%', cost: '$1,890' },
                  { name: 'Google Gemini', status: 'warning', usage: '45%', cost: '$890' },
                  { name: 'Mistral', status: 'healthy', usage: '23%', cost: '$340' }
                ].map((provider, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      <div className={`w-3 h-3 rounded-full ${
                        provider.status === 'healthy' ? 'bg-green-500' :
                        provider.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Usage:</span>
                        <span className="text-sm font-medium">{provider.usage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Monthly Cost:</span>
                        <span className="text-sm font-medium">{provider.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`text-sm font-medium ${getStatusColor(provider.status)} capitalize`}>
                          {provider.status}
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-4 mizan-button-secondary text-sm">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Training Tab */}
        {selectedView === 'training' && (
          <div className="space-y-6">
            <div className="mizan-card">
              <h2 className="text-xl font-semibold text-mizan-dark mb-6">AI Training & Frameworks</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Framework Management</h3>
                  {[
                    'Culture Assessment Framework',
                    'Skills Taxonomy Framework',
                    'Performance Evaluation Framework',
                    'Engagement Measurement Framework'
                  ].map((framework, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-900">{framework}</span>
                      <button className="text-mizan-teal hover:text-mizan-dark text-sm">
                        Edit
                      </button>
                    </div>
                  ))}
                  <button className="w-full mizan-button-primary">
                    Upload New Framework
                  </button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Recent Training Activities</h3>
                  {[
                    { action: 'Culture Framework Updated', time: '2 hours ago', user: 'SuperAdmin' },
                    { action: 'Skills Taxonomy Reviewed', time: '1 day ago', user: 'SuperAdmin' },
                    { action: 'New Values Added', time: '3 days ago', user: 'SuperAdmin' },
                    { action: 'Threshold Adjusted', time: '1 week ago', user: 'SuperAdmin' }
                  ].map((activity, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-medium text-gray-900">{activity.action}</span>
                          <p className="text-xs text-gray-500">by {activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
