'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Activity, ArrowRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';

// Import shared components
import { StatCard } from '@/components/dashboard/StatCard';

export default function SuperadminHome() {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data - replace with API calls
  const stats = {
    totalTenants: 247,
    totalUsers: 8453,
    monthlyRevenue: 124500,
    platformHealth: 98.7
  };

  const tenants = [
    {
      id: 1,
      name: 'Acme Corporation',
      plan: 'Enterprise',
      employees: 2450,
      mrr: 49000,
      status: 'Active',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'TechStart Inc',
      plan: 'Growth',
      employees: 680,
      mrr: 8500,
      status: 'Active',
      lastActive: '5 hours ago'
    },
    {
      id: 3,
      name: 'Global Dynamics',
      plan: 'Scale',
      employees: 3200,
      mrr: 64000,
      status: 'Active',
      lastActive: '1 day ago'
    },
    {
      id: 4,
      name: 'Innovation Labs',
      plan: 'Starter',
      employees: 125,
      mrr: 833,
      status: 'Trial',
      lastActive: '3 hours ago'
    },
    {
      id: 5,
      name: 'Retail Solutions',
      plan: 'Growth',
      employees: 450,
      mrr: 5625,
      status: 'Active',
      lastActive: '6 hours ago'
    }
  ];

  const revenueData = [
    { month: 'Jan', mrr: 95000, arr: 1140000 },
    { month: 'Feb', mrr: 102000, arr: 1224000 },
    { month: 'Mar', mrr: 108500, arr: 1302000 },
    { month: 'Apr', mrr: 115000, arr: 1380000 },
    { month: 'May', mrr: 119800, arr: 1437600 },
    { month: 'Jun', mrr: 124500, arr: 1494000 }
  ];

  const activities = [
    {
      id: 1,
      type: 'signup',
      text: 'New tenant signed up: Innovation Labs',
      time: '15 minutes ago',
      icon: '◉'
    },
    {
      id: 2,
      type: 'upgrade',
      text: 'TechStart Inc upgraded from Starter to Growth',
      time: '2 hours ago',
      icon: '△'
    },
    {
      id: 3,
      type: 'support',
      text: 'Support ticket opened by Acme Corporation',
      time: '4 hours ago',
      icon: '□'
    },
    {
      id: 4,
      type: 'alert',
      text: 'High API usage detected for Global Dynamics',
      time: '6 hours ago',
      icon: '◇'
    },
    {
      id: 5,
      type: 'signup',
      text: 'New tenant signed up: Retail Solutions',
      time: '1 day ago',
      icon: '◉'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return { bg: 'rgba(34,197,94,0.1)', color: '#22c55e' };
      case 'Trial': return { bg: 'rgba(204,164,4,0.1)', color: '#CCA404' };
      case 'Churned': return { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' };
      default: return { bg: 'rgba(63,61,86,0.1)', color: '#3F3D56' };
    }
  };

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'Enterprise': return '#CCA404';
      case 'Scale': return '#3F3D56';
      case 'Growth': return '#545454';
      default: return '#545454';
    }
  };

  return (
    <div className="min-h-screen p-8 bg-mizan-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
              Platform Overview
            </h1>
            <p className="text-lg text-mizan-secondary">
              Real-time insights across all tenants
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex items-center space-x-2 bg-white rounded-xl p-1 border border-gray-200">
            {['7d', '30d', '90d', '1y'].map((range) => (
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

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon="⬢"
            title="Total Tenants"
            value={stats.totalTenants.toLocaleString()}
            trend="up"
            trendValue="+18%"
            color="#3F3D56"
          />
          <StatCard
            icon="◉"
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            trend="up"
            trendValue="+24%"
            color="#3F3D56"
          />
          <StatCard
            icon="△"
            title="Monthly Revenue"
            value={`$${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
            trend="up"
            trendValue="+12%"
            color="#CCA404"
          />
          <StatCard
            icon="□"
            title="Platform Health"
            value={`${stats.platformHealth}%`}
            trend="up"
            trendValue="+0.3%"
            color="#22c55e"
          />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tenant Overview Table (2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-mizan-primary">
                    Tenant Overview
                  </h3>
                  <p className="text-sm mt-1 text-mizan-secondary">
                    {tenants.length} active tenants
                  </p>
                </div>
                <Link
                  href="/dashboard/superadmin/tenants"
                  className="text-sm font-medium flex items-center space-x-1 text-mizan-gold hover:opacity-60 transition-opacity"
                >
                  <span>View All</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-mizan-background">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                        Plan
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                        Employees
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                        MRR
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.map((tenant) => {
                      const statusStyle = getStatusColor(tenant.status);
                      return (
                        <tr
                          key={tenant.id}
                          className="border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => alert(`View ${tenant.name} details`)}
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-mizan-primary">
                                {tenant.name}
                              </p>
                              <p className="text-xs text-mizan-secondary">
                                Last active {tenant.lastActive}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="text-xs font-semibold"
                              style={{ color: getPlanColor(tenant.plan) }}
                            >
                              {tenant.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-mizan-secondary">
                            {tenant.employees.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-mizan-primary">
                            ${(tenant.mrr / 1000).toFixed(1)}K
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{ background: statusStyle.bg, color: statusStyle.color }}
                            >
                              {tenant.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Feed (1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-mizan-primary">
                  Recent Activity
                </h3>
                <p className="text-sm mt-1 text-mizan-secondary">
                  Platform events
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-mizan-primary bg-opacity-5">
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-mizan-primary">
                          {activity.text}
                        </p>
                        <p className="text-xs mt-1 text-mizan-secondary">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 text-center">
                <Link
                  href="/dashboard/superadmin/activity"
                  className="text-sm font-medium text-mizan-gold"
                >
                  View All Activity
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-mizan-primary">
                Revenue Growth
              </h3>
              <p className="text-sm mt-1 text-mizan-secondary">
                Monthly recurring revenue over time
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-mizan-primary bg-mizan-primary text-white">
                MRR
              </button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-mizan-secondary">
                ARR
              </button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-mizan-secondary">
                Churn
              </button>
            </div>
          </div>

          {/* Simple bar chart visualization */}
          <div className="space-y-4">
            {revenueData.map((data, i) => {
              const maxMrr = Math.max(...revenueData.map(d => d.mrr));
              const percentage = (data.mrr / maxMrr) * 100;

              return (
                <div key={i} className="flex items-center space-x-4">
                  <span className="text-xs font-medium w-8 text-mizan-secondary">
                    {data.month}
                  </span>
                  <div className="flex-1 h-12 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full rounded-lg transition-all duration-500 bg-gradient-to-r from-mizan-gold to-mizan-gold-light"
                      style={{ width: `${percentage}%` }}
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold"
                      style={{ color: percentage > 50 ? 'white' : '#3F3D56' }}
                    >
                      ${(data.mrr / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs mb-1 text-mizan-secondary">Current MRR</p>
              <p className="text-2xl font-bold text-mizan-primary">
                ${(stats.monthlyRevenue / 1000).toFixed(0)}K
              </p>
            </div>
            <div>
              <p className="text-xs mb-1 text-mizan-secondary">Annual Run Rate</p>
              <p className="text-2xl font-bold text-mizan-primary">
                ${((stats.monthlyRevenue * 12) / 1000).toFixed(0)}K
              </p>
            </div>
            <div>
              <p className="text-xs mb-1 text-mizan-secondary">Growth Rate</p>
              <p className="text-2xl font-bold text-green-500">
                +12%
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/superadmin/clients"
            className="bg-white rounded-2xl p-6 border border-gray-200 text-left hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">◉</div>
            <h4 className="text-lg font-semibold mb-2 text-mizan-primary">
              Add New Tenant
            </h4>
            <p className="text-sm text-mizan-secondary">
              Manually onboard a new organization
            </p>
          </Link>

          <Link
            href="/dashboard/superadmin/analytics"
            className="bg-white rounded-2xl p-6 border border-gray-200 text-left hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">△</div>
            <h4 className="text-lg font-semibold mb-2 text-mizan-primary">
              System Analytics
            </h4>
            <p className="text-sm text-mizan-secondary">
              Deep dive into platform metrics
            </p>
          </Link>

          <Link
            href="/dashboard/superadmin/billing"
            className="bg-white rounded-2xl p-6 border border-gray-200 text-left hover:shadow-lg transition-all"
          >
            <div className="text-3xl mb-3">□</div>
            <h4 className="text-lg font-semibold mb-2 text-mizan-primary">
              Billing & Revenue
            </h4>
            <p className="text-sm text-mizan-secondary">
              Invoices, payments, and forecasts
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
