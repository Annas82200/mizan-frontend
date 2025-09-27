"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  Shield, 
  Database,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  RefreshCw,
  Zap,
  Target,
  Brain,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [clients, setClients] = useState([
    { id: 1, name: 'Acme Corp', email: 'admin@acme.com', plan: 'Pro+', status: 'active', employees: 250, lastActive: '2 hours ago', mrr: 2000 },
    { id: 2, name: 'Tech Innovations', email: 'hr@techinnovations.com', plan: 'Pro', status: 'active', employees: 85, lastActive: '1 day ago', mrr: 79 },
    { id: 3, name: 'Global Solutions', email: 'ops@globalsolutions.com', plan: 'Enterprise', status: 'trial', employees: 500, lastActive: '3 hours ago', mrr: 0 },
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalClients: 47,
    activeUsers: 1250,
    totalAnalyses: 8945,
    systemUptime: '99.97%',
    apiCalls: 125000,
    revenue: 45000,
    growthRate: 23.5,
    errorRate: 0.02
  });

  const [frameworkValues] = useState([
    { name: 'Safety & Survival', cylinder: 1, positiveCount: 12, limitingCount: 8 },
    { name: 'Belonging & Loyalty', cylinder: 2, positiveCount: 15, limitingCount: 5 },
    { name: 'Growth & Achievement', cylinder: 3, positiveCount: 18, limitingCount: 7 },
    { name: 'Meaning & Contribution', cylinder: 4, positiveCount: 20, limitingCount: 4 },
    { name: 'Integrity & Justice', cylinder: 5, positiveCount: 16, limitingCount: 6 },
    { name: 'Wisdom & Compassion', cylinder: 6, positiveCount: 14, limitingCount: 9 },
    { name: 'Transcendence & Unity', cylinder: 7, positiveCount: 11, limitingCount: 12 }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'clients', name: 'Clients', icon: Building2 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'framework', name: 'Framework', icon: Target },
    { id: 'agents', name: 'AI Agents', icon: Brain },
    { id: 'services', name: 'Services', icon: Zap },
    { id: 'system', name: 'System', icon: Settings }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Clients</p>
              <p className="text-3xl font-light text-slate-900">{systemMetrics.totalClients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-green-600">+12% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Users</p>
              <p className="text-3xl font-light text-slate-900">{systemMetrics.activeUsers.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-green-600">+8% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Monthly Revenue</p>
              <p className="text-3xl font-light text-slate-900">${systemMetrics.revenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-green-600">+{systemMetrics.growthRate}% growth</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">System Uptime</p>
              <p className="text-3xl font-light text-slate-900">{systemMetrics.systemUptime}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-green-600">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { type: 'client', message: 'New client "Acme Corp" upgraded to Pro+', time: '2 hours ago', icon: Building2, color: 'blue' },
              { type: 'analysis', message: '1,247 culture analyses completed today', time: '4 hours ago', icon: BarChart3, color: 'green' },
              { type: 'system', message: 'AI models updated successfully', time: '6 hours ago', icon: Brain, color: 'purple' },
              { type: 'user', message: '23 new employee surveys submitted', time: '8 hours ago', icon: Users, color: 'amber' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activity.color === 'blue' ? 'bg-blue-100' :
                  activity.color === 'green' ? 'bg-green-100' :
                  activity.color === 'purple' ? 'bg-purple-100' :
                  'bg-amber-100'
                }`}>
                  <activity.icon className={`w-5 h-5 ${
                    activity.color === 'blue' ? 'text-blue-600' :
                    activity.color === 'green' ? 'text-green-600' :
                    activity.color === 'purple' ? 'text-purple-600' :
                    'text-amber-600'
                  }`} />
                </div>
                <div className="flex-grow">
                  <p className="text-sm text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">System Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="flex-grow">
                <p className="text-sm font-medium text-green-900">All Services Operational</p>
                <p className="text-xs text-green-700">Culture, Structure, and Skills analysis running smoothly</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div className="flex-grow">
                <p className="text-sm font-medium text-amber-900">High API Usage</p>
                <p className="text-xs text-amber-700">125K API calls this month (80% of limit)</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <Clock className="w-5 h-5 text-blue-600" />
              <div className="flex-grow">
                <p className="text-sm font-medium text-blue-900">Scheduled Maintenance</p>
                <p className="text-xs text-blue-700">AI model update scheduled for tonight at 2 AM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClientsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-slate-900">Client Management</h2>
          <p className="text-slate-600">Manage client accounts, subscriptions, and access controls</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Plans</option>
                <option>Entry</option>
                <option>Pro</option>
                <option>Pro+</option>
                <option>Enterprise</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-500 hover:text-slate-700">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-700">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Client</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Plan</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Status</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Employees</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">MRR</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Last Active</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-slate-900">{client.name}</div>
                      <div className="text-sm text-slate-500">{client.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      client.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                      client.plan === 'Pro+' ? 'bg-amber-100 text-amber-800' :
                      client.plan === 'Pro' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {client.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      client.status === 'active' ? 'bg-green-100 text-green-800' :
                      client.status === 'trial' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-900">{client.employees}</td>
                  <td className="py-4 px-6 text-slate-900">${client.mrr}</td>
                  <td className="py-4 px-6 text-slate-500 text-sm">{client.lastActive}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-slate-500 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-500 hover:text-amber-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-500 hover:text-red-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFrameworkTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-slate-900">7-Cylinders Framework Management</h2>
          <p className="text-slate-600">Manage values, definitions, and framework updates</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import Values
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Value
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-7 gap-4">
        {frameworkValues.map((cylinder, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-center mb-4">
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-slate-600' :
                index === 1 ? 'bg-slate-500' :
                index === 2 ? 'bg-slate-400' :
                index === 3 ? 'bg-amber-500' :
                index === 4 ? 'bg-amber-400' :
                index === 5 ? 'bg-blue-400' :
                'bg-blue-600'
              }`}>
                {cylinder.cylinder}
              </div>
              <h3 className="font-medium text-slate-900 text-sm leading-tight">{cylinder.name}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-600">Positive:</span>
                <span className="font-medium">{cylinder.positiveCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-orange-600">Limiting:</span>
                <span className="font-medium">{cylinder.limitingCount}</span>
              </div>
              <button className="w-full mt-3 px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                Manage Values
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Framework Updates</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div>
              <p className="font-medium text-blue-900">Version 2.1.0 Available</p>
              <p className="text-sm text-blue-700">Enhanced semantic matching and new value relationships</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-slate-900">AI Agent Management</h2>
          <p className="text-slate-600">Monitor and configure AI agents performance</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retrain Models
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { name: 'Culture Agent', status: 'active', accuracy: 94.2, requests: 1250, lastTrained: '2 days ago', icon: Users, color: 'blue' },
          { name: 'Structure Agent', status: 'active', accuracy: 97.8, requests: 890, lastTrained: '1 day ago', icon: Building2, color: 'green' },
          { name: 'Skills Agent', status: 'active', accuracy: 92.1, requests: 675, lastTrained: '3 days ago', icon: Target, color: 'amber' }
        ].map((agent, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                agent.color === 'blue' ? 'bg-blue-100' :
                agent.color === 'green' ? 'bg-green-100' :
                'bg-amber-100'
              }`}>
                <agent.icon className={`w-6 h-6 ${
                  agent.color === 'blue' ? 'text-blue-600' :
                  agent.color === 'green' ? 'text-green-600' :
                  'text-amber-600'
                }`} />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {agent.status}
              </span>
            </div>
            <h3 className="font-medium text-slate-900 mb-2">{agent.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Accuracy:</span>
                <span className="font-medium">{agent.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Requests:</span>
                <span className="font-medium">{agent.requests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Last Trained:</span>
                <span className="font-medium">{agent.lastTrained}</span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors">
              Configure Agent
            </button>
          </div>
        ))}
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
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="text-lg font-medium text-slate-900">Super Admin</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:text-slate-700">
              <Mail className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-500 hover:text-slate-700">
              <Settings className="w-5 h-5" />
            </button>
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
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'clients' && renderClientsTab()}
          {activeTab === 'framework' && renderFrameworkTab()}
          {activeTab === 'agents' && renderAgentsTab()}
          
          {/* Placeholder tabs */}
          {activeTab === 'users' && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-slate-900 mb-2">User Management</h3>
              <p className="text-slate-600">Manage individual user accounts and permissions</p>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-slate-900 mb-2">Service Configuration</h3>
              <p className="text-slate-600">Configure and manage platform services and integrations</p>
            </div>
          )}
          
          {activeTab === 'system' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-slate-900 mb-2">System Settings</h3>
              <p className="text-slate-600">Platform configuration, logs, and system administration</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}