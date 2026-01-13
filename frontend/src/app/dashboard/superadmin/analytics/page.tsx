'use client';

import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { APIIcon, PerformanceIcon, AgentIcon } from '@/components/icons';
import { superadminService } from '@/services/dashboard.service';
import { logger } from '@/lib/logger';

interface UsageStats {
  dau: number;
  wau: number;
  mau: number;
  featureAdoption: {
    [key: string]: number;
  };
}

interface ApiStats {
  totalCalls: number;
  avgResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  topEndpoints?: Array<{
    endpoint: string;
    calls: number;
    avgTime: number;
    errors: number;
  }>;
}

interface AgentStat {
  name: string;
  symbol: string;
  usage: number;
  avgTime: number;
  errors: number;
}

interface PerformanceMetric {
  metric: string;
  current: number;
  target: number;
  unit: string;
  status: string;
}

export default function SystemAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [usageStats, setUsageStats] = useState<UsageStats>({
    dau: 0,
    wau: 0,
    mau: 0,
    featureAdoption: {}
  });
  const [apiStats, setApiStats] = useState<ApiStats>({
    totalCalls: 0,
    avgResponseTime: 0,
    p95ResponseTime: 0,
    p99ResponseTime: 0,
    errorRate: 0,
    topEndpoints: []
  });
  const [agentStats, setAgentStats] = useState<AgentStat[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all analytics data in parallel
      const [usage, api, agents, performance] = await Promise.all([
        superadminService.getUsageStats({ timeRange }),
        superadminService.getApiStats({ timeRange }),
        superadminService.getAgentStats({ timeRange }),
        superadminService.getPerformanceMetrics({ timeRange })
      ]);

      // Map service response to component state interfaces
      const usageData = usage as unknown as { activeUsers?: number; totalAnalyses?: number; totalApiCalls?: number; featureAdoption?: Record<string, number> };
      setUsageStats({
        dau: usageData.activeUsers || 0,
        wau: usageData.totalAnalyses || 0,
        mau: usageData.totalApiCalls || 0,
        featureAdoption: usageData.featureAdoption || {}
      });
      const apiData = api as unknown as { totalCalls?: number; avgResponseTime?: number; p95ResponseTime?: number; p99ResponseTime?: number; errorRate?: number; topEndpoints?: Array<{ endpoint: string; calls: number; avgTime: number; errors?: number }> };
      setApiStats({
        totalCalls: apiData.totalCalls || 0,
        avgResponseTime: apiData.avgResponseTime || 0,
        p95ResponseTime: apiData.p95ResponseTime || 0,
        p99ResponseTime: apiData.p99ResponseTime || 0,
        errorRate: apiData.errorRate || 0,
        topEndpoints: (apiData.topEndpoints || []).map(ep => ({ ...ep, errors: ep.errors || 0 }))
      });
      const agentsData = agents as unknown as { agents?: AgentStat[] };
      setAgentStats(agentsData.agents || []);
      const performanceData = performance as unknown as { metrics?: PerformanceMetric[] };
      setPerformanceMetrics(performanceData.metrics || []);
    } catch (err: unknown) {
      logger.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'good': return <CheckCircle2 size={18} className="text-green-500" />;
      case 'warning': return <AlertCircle size={18} className="text-mizan-gold" />;
      case 'error': return <AlertCircle size={18} className="text-red-500" />;
      default: return <Activity size={18} className="text-mizan-secondary" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-mizan-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-mizan-gold mx-auto mb-4" />
          <p className="text-mizan-secondary">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-mizan-background">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-red-900 mb-2">Error Loading Analytics</h2>
                <p className="text-red-800">{error}</p>
                <button
                  onClick={fetchAnalyticsData}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-mizan-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
              System Analytics
            </h1>
            <p className="text-lg text-mizan-secondary">
              Platform performance & usage insights
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex items-center space-x-2 bg-white rounded-xl p-1 border border-gray-200">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-mizan-primary text-white'
                    : 'text-mizan-secondary'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Usage Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-mizan-primary">
            Platform Usage
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Active Users Stats */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Activity size={24} className="text-mizan-primary" />
                <h3 className="text-lg font-semibold text-mizan-primary">Active Users</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">Daily Active Users (DAU)</p>
                  <p className="text-2xl font-bold text-mizan-primary">
                    {usageStats.dau.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">Weekly Active Users (WAU)</p>
                  <p className="text-2xl font-bold text-mizan-primary">
                    {usageStats.wau.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">Monthly Active Users (MAU)</p>
                  <p className="text-2xl font-bold text-mizan-primary">
                    {usageStats.mau.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* API Stats */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <APIIcon className="w-6 h-6" color="#3F3D56" />
                <h3 className="text-lg font-semibold text-mizan-primary">API Performance</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">Total Calls (24h)</p>
                  <p className="text-2xl font-bold text-mizan-primary">
                    {(apiStats.totalCalls / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">Avg Response Time</p>
                  <p className="text-2xl font-bold text-green-500">
                    {apiStats.avgResponseTime}ms
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">Error Rate</p>
                  <p className="text-2xl font-bold text-green-500">
                    {apiStats.errorRate}%
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <PerformanceIcon className="w-6 h-6" color="#3F3D56" />
                <h3 className="text-lg font-semibold text-mizan-primary">System Health</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">P95 Response Time</p>
                  <p className="text-2xl font-bold text-mizan-gold">
                    {apiStats.p95ResponseTime}ms
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">P99 Response Time</p>
                  <p className="text-2xl font-bold text-red-500">
                    {apiStats.p99ResponseTime}ms
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1 text-mizan-secondary">Uptime</p>
                  <p className="text-2xl font-bold text-green-500">
                    99.8%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Adoption */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-6 text-mizan-primary">
              Feature Adoption Rates
            </h3>
            <div className="space-y-4">
              {Object.entries(usageStats.featureAdoption).map(([feature, percentage]) => (
                <div key={feature}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-mizan-primary">
                      {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-sm font-bold text-mizan-gold">
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-mizan-gold to-mizan-gold-light"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-mizan-primary">
            Top API Endpoints
          </h2>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-mizan-background">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Endpoint
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Calls (24h)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Avg Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Error Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {(apiStats.topEndpoints || []).map((endpoint, i) => (
                  <tr key={i} className="border-t border-gray-200">
                    <td className="px-6 py-4">
                      <code className="text-sm font-sans text-mizan-primary">
                        {endpoint.endpoint}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-mizan-primary">
                      {(endpoint.calls / 1000).toFixed(0)}K
                    </td>
                    <td className="px-6 py-4 text-sm text-mizan-secondary">
                      {endpoint.avgTime}ms
                    </td>
                    <td className="px-6 py-4 text-sm text-mizan-secondary">
                      {endpoint.errors}%
                    </td>
                    <td className="px-6 py-4">
                      {endpoint.avgTime < 500 && endpoint.errors < 1 ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-500">
                          Healthy
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-mizan-gold">
                          Monitor
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Agent Analytics */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-mizan-primary">
            AI Agent Performance
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agentStats.map((agent, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-mizan-primary bg-opacity-5">
                      <span className="text-2xl">{agent.symbol}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-mizan-primary">
                      {agent.name}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      agent.errors < 0.3
                        ? 'bg-green-100 text-green-500'
                        : 'bg-yellow-100 text-mizan-gold'
                    }`}
                  >
                    {agent.errors < 0.3 ? 'Healthy' : 'Monitor'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs mb-1 text-mizan-secondary">Usage (24h)</p>
                    <p className="text-lg font-bold text-mizan-primary">
                      {(agent.usage / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs mb-1 text-mizan-secondary">Avg Time</p>
                    <p className="text-lg font-bold text-mizan-primary">
                      {agent.avgTime}s
                    </p>
                  </div>
                  <div>
                    <p className="text-xs mb-1 text-mizan-secondary">Error Rate</p>
                    <p className={`text-lg font-bold ${agent.errors < 0.3 ? 'text-green-500' : 'text-mizan-gold'}`}>
                      {agent.errors}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-mizan-primary">
            System Performance Metrics
          </h2>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="space-y-4">
              {performanceMetrics.map((metric, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(metric.status)}
                    <div>
                      <p className="text-sm font-medium text-mizan-primary">
                        {metric.metric}
                      </p>
                      <p className="text-xs text-mizan-secondary">
                        Target: {metric.target}{metric.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-mizan-primary">
                      {metric.current}{metric.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
