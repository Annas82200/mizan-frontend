"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Building2, 
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Settings,
  ArrowRight,
  Activity,
  Star,
  Clock,
  Download
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock admin data - in production this would come from your backend
  const adminData = {
    company: 'Demo Company',
    plan: 'Pro+',
    employees: 125,
    analysesCompleted: 8,
    lastAnalysis: '2 days ago',
    cultureScore: 84,
    structureScore: 92,
    skillsScore: 78,
    engagementScore: 81,
    recognitionScore: 76
  };

  const tabs = [
    { id: 'overview', name: 'Overview', symbol: '📊' },
    { id: 'reports', name: 'Reports', symbol: '📈' },
    { id: 'services', name: 'Services', symbol: '🎯' },
    { id: 'employees', name: 'Employees', symbol: '👥' },
    { id: 'settings', name: 'Settings', symbol: '⚙️' }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-light mb-2">Welcome, {adminData.company}</h1>
        <p className="text-blue-100 mb-6">
          Your organizational intelligence dashboard. Manage analyses, reports, and team insights.
        </p>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">✨</span>
            <span>{adminData.plan} Plan Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">👥</span>
            <span>{adminData.employees} Employees</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-light text-slate-900 mb-1">{adminData.cultureScore}</div>
            <div className="text-sm text-slate-600">Culture Score</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="text-center">
            <div className="text-3xl mb-2">🏗️</div>
            <div className="text-2xl font-light text-slate-900 mb-1">{adminData.structureScore}</div>
            <div className="text-sm text-slate-600">Structure Score</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="text-center">
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-2xl font-light text-slate-900 mb-1">{adminData.skillsScore}</div>
            <div className="text-sm text-slate-600">Skills Score</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="text-center">
            <div className="text-3xl mb-2">💖</div>
            <div className="text-2xl font-light text-slate-900 mb-1">{adminData.engagementScore}</div>
            <div className="text-sm text-slate-600">Engagement</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-light text-slate-900 mb-1">{adminData.recognitionScore}</div>
            <div className="text-sm text-slate-600">Recognition</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <Link href="/companies/demo" className="block p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏗️</span>
                  <div>
                    <p className="font-medium text-blue-900">Run Structure Analysis</p>
                    <p className="text-sm text-blue-700">FREE organizational assessment</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
            </Link>

            <Link href="/employee/culture-onboarding" className="block p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-medium text-purple-900">Send Culture Survey</p>
                    <p className="text-sm text-purple-700">Employee culture assessment</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-600" />
              </div>
            </Link>

            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-medium text-green-900">View Analytics</p>
                  <p className="text-sm text-green-700">Comprehensive org reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-xl">✅</span>
              <div>
                <p className="text-sm font-medium text-slate-900">Culture analysis completed</p>
                <p className="text-xs text-slate-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xl">📈</span>
              <div>
                <p className="text-sm font-medium text-slate-900">Structure analysis updated</p>
                <p className="text-xs text-slate-500">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xl">🎓</span>
              <div>
                <p className="text-sm font-medium text-slate-900">Skills assessment launched</p>
                <p className="text-xs text-slate-500">2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
              <span className="text-xl font-light text-slate-800">Mizan</span>
            </Link>
            <div className="h-6 w-px bg-slate-300"></div>
            <div>
              <h1 className="text-lg font-medium text-slate-900">{adminData.company}</h1>
              <p className="text-sm text-slate-500">Admin Dashboard • {adminData.plan} Plan</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/companies/pricing" className="text-slate-600 hover:text-slate-900">
              Upgrade
            </Link>
            <Link href="/auth/login" className="text-slate-600 hover:text-slate-900">
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-slate-200 h-[calc(100vh-73px)]">
          <div className="p-6">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="text-lg">{tab.symbol}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && renderOverviewTab()}
          
          {/* Placeholder tabs */}
          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-light text-slate-900 mb-2">Analytics Reports</h3>
              <p className="text-slate-600">Access your organizational intelligence reports</p>
              <Link href="/admin/culture-report" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                View Culture Report
              </Link>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-light text-slate-900 mb-2">AI Services</h3>
              <p className="text-slate-600">Launch organizational analysis services</p>
            </div>
          )}
          
          {activeTab === 'employees' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-light text-slate-900 mb-2">Employee Management</h3>
              <p className="text-slate-600">Manage your team and survey deployments</p>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚙️</div>
              <h3 className="text-xl font-light text-slate-900 mb-2">Account Settings</h3>
              <p className="text-slate-600">Manage your account and preferences</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}