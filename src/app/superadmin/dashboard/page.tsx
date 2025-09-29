"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useClients } from '../../../contexts/client-context';
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
  MoreHorizontal,
  Loader2,
  ArrowRight
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { clients, addClient, updateClient, deleteClient } = useClients();

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
    { name: 'Safety & Survival', cylinder: 1, positiveCount: 5, limitingCount: 5 },
    { name: 'Belonging & Loyalty', cylinder: 2, positiveCount: 5, limitingCount: 5 },
    { name: 'Growth & Achievement', cylinder: 3, positiveCount: 5, limitingCount: 5 },
    { name: 'Meaning & Contribution', cylinder: 4, positiveCount: 5, limitingCount: 5 },
    { name: 'Integrity & Justice', cylinder: 5, positiveCount: 5, limitingCount: 5 },
    { name: 'Wisdom & Compassion', cylinder: 6, positiveCount: 5, limitingCount: 5 },
    { name: 'Transcendence & Unity', cylinder: 7, positiveCount: 5, limitingCount: 5 }
  ]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [serviceResults, setServiceResults] = useState({});
  const [testingInProgress, setTestingInProgress] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [showValueManager, setShowValueManager] = useState(null);
  const [showImportValues, setShowImportValues] = useState(false);
  const [showAddValue, setShowAddValue] = useState(false);
  
  // Framework Management Functions - Real Backend Integration
  const importValues = async (file) => {
    try {
      const formData = new FormData();
      formData.append('valuesFile', file);
      
      const response = await fetch('https://mizan-backend-production.up.railway.app/api/framework/import-values', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`✅ Successfully imported ${result.importedCount} values to the framework!`);
        setShowImportValues(false);
      } else {
        throw new Error('Import failed');
      }
    } catch (error) {
      alert('❌ Failed to import values. Please check the file format.');
    }
  };
  
  const addNewValue = async (valueName, valueDefinition, cylinder) => {
    try {
      const response = await fetch('https://mizan-backend-production.up.railway.app/api/framework/add-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: valueName, definition: valueDefinition, cylinder })
      });
      
      if (response.ok) {
        alert(`✅ Value "${valueName}" added successfully to ${cylinder}!`);
        setShowAddValue(false);
      } else {
        throw new Error('Add value failed');
      }
    } catch (error) {
      alert('❌ Failed to add value. Please try again.');
    }
  };
  
  const updateFramework = async () => {
    try {
      const response = await fetch('https://mizan-backend-production.up.railway.app/api/framework/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        alert('✅ Framework updated successfully! New definitions and relationships loaded.');
      } else {
        throw new Error('Framework update failed');
      }
    } catch (error) {
      alert('❌ Framework update failed. Please try again later.');
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'clients', name: 'Clients', icon: Building2 },
    { id: 'demo', name: 'Demo Services', icon: Zap },
    { id: 'data', name: 'Real Data', icon: Database },
    { id: 'framework', name: 'Framework', icon: Target },
    { id: 'agents', name: 'AI Agents', icon: Brain },
    { id: 'users', name: 'Users', icon: Users },
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

  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    plan: 'pro',
    employees: '',
    industry: 'Technology',
    strategy: '',
    vision: '',
    mission: '',
    values: '',
    departments: '',
    roles: ''
  });

  const handleAddClient = async () => {
    try {
      const apiUrl = 'https://mizan-backend-production.up.railway.app';
      console.log('👤 Creating client:', newClient.name, 'at:', apiUrl);
      console.log('📋 Client data:', newClient);
      
      const response = await fetch(`${apiUrl}/api/superadmin/clients`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newClient)
      });

      console.log('📡 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create client: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Client created successfully:', data.client);
      
      // Use the context method to properly persist the client
      await addClient({
        name: data.client.name,
        email: data.client.email,
        plan: data.client.plan,
        employees: data.client.employees,
        industry: newClient.industry,
        strategy: newClient.strategy,
        vision: newClient.vision,
        mission: newClient.mission,
        values: newClient.values,
        departments: newClient.departments,
        roles: newClient.roles
      });
      
      setNewClient({ 
        name: '', 
        email: '', 
        plan: 'pro', 
        employees: '', 
        industry: 'Technology',
        strategy: '',
        vision: '',
        mission: '',
        values: '',
        departments: '',
        roles: ''
      });
      setShowAddClient(false);
      
      // Show success feedback
      alert('✅ Client created successfully and will persist after refresh!');
    } catch (error) {
      console.error('Failed to create client:', error);
      console.error('Failed to create client:', error.message);
    }
  };

  const renderClientsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-slate-900">Client Management</h2>
          <p className="text-slate-600">Manage client accounts, subscriptions, and access controls</p>
        </div>
        <button 
          onClick={() => setShowAddClient(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-light text-slate-900 mb-6">Add New Client - Complete Setup</h3>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-lg font-medium text-slate-900 mb-4">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Acme Corporation"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Admin Email</label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="admin@acme.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Plan</label>
                    <select
                      value={newClient.plan}
                      onChange={(e) => setNewClient({...newClient, plan: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="entry">Entry (Free)</option>
                      <option value="pro">Pro ($79/month)</option>
                      <option value="pro-plus">Pro+ ($8/employee)</option>
                      <option value="enterprise">Enterprise (Custom)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Employees</label>
                    <input
                      type="number"
                      value={newClient.employees}
                      onChange={(e) => setNewClient({...newClient, employees: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Industry</label>
                    <select
                      value={newClient.industry}
                      onChange={(e) => setNewClient({...newClient, industry: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Strategic Information */}
              <div className="border-b border-slate-200 pb-6">
                <h4 className="text-lg font-medium text-slate-900 mb-4">Strategic Foundation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Vision Statement</label>
                    <textarea
                      value={newClient.vision}
                      onChange={(e) => setNewClient({...newClient, vision: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="To be the leading innovator in our industry..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Mission Statement</label>
                    <textarea
                      value={newClient.mission}
                      onChange={(e) => setNewClient({...newClient, mission: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                      placeholder="Empower businesses with cutting-edge technology..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Strategic Objectives</label>
                    <textarea
                      value={newClient.strategy}
                      onChange={(e) => setNewClient({...newClient, strategy: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Build innovative software products and scale globally..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Company Values (comma-separated)</label>
                    <input
                      type="text"
                      value={newClient.values}
                      onChange={(e) => setNewClient({...newClient, values: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Innovation, Collaboration, Excellence, Integrity"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Setup Option */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-blue-900">Quick Demo Setup</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setNewClient({
                        ...newClient,
                        strategy: "Build innovative software products that transform how businesses operate and scale globally",
                        vision: "To be the leading innovator in our industry with cutting-edge technology solutions",
                        mission: "Empower businesses with advanced technology and exceptional service",
                        values: "Innovation, Collaboration, Excellence, Integrity, Growth"
                      });
                    }}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Use Demo Data
                  </button>
                </div>
                <p className="text-sm text-blue-800">
                  Click "Use Demo Data" to populate strategic information with sample data for quick testing.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleAddClient}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Create Client
              </button>
              <button
                onClick={() => setShowAddClient(false)}
                className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
              <button 
                onClick={() => console.log('Filter functionality would be implemented here')}
                className="p-2 text-slate-500 hover:text-slate-700"
              >
                <Filter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => console.log('Download Reports:\n\nAvailable downloads:\n- Client list (CSV)\n- Revenue report (PDF)\n- Usage analytics (Excel)\n- Analysis summary (PDF)')}
                className="p-2 text-slate-500 hover:text-slate-700"
              >
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
                      <button 
                        onClick={() => console.log(`View Client: ${client.name}\n\nDetails:\n- Plan: ${client.plan}\n- Employees: ${client.employees}\n- MRR: $${client.mrr}\n- Status: ${client.status}\n- Last Active: ${client.lastActive}\n\nThis would open detailed client dashboard.`)}
                        className="p-1 text-slate-500 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => console.log(`Edit Client: ${client.name}\n\nThis would open a form to edit:\n- Company details\n- Subscription plan\n- Contact information\n- Access permissions`)}
                        className="p-1 text-slate-500 hover:text-amber-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => console.log(`Client Actions: ${client.name}\n\nAvailable actions:\n- Suspend account\n- Reset password\n- View analysis history\n- Download reports\n- Send survey invitations`)}
                        className="p-1 text-slate-500 hover:text-red-600"
                      >
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
          <button 
            onClick={() => setShowImportValues(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Values
          </button>
          <button 
            onClick={() => setShowAddValue(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
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
              <button 
                onClick={() => setShowValueManager(cylinder)}
                className="w-full mt-3 px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
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
            <button 
              onClick={() => console.log('Framework Update:\n\nThis would update the framework to version 2.1.0 with:\n- Enhanced semantic matching\n- New value relationships\n- Improved analysis algorithms\n\nUpdate requires system maintenance window.')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
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
        <button 
          onClick={() => console.log('Model Retraining:\n\nThis would initiate retraining of all AI models with:\n- Latest organizational data\n- Updated framework definitions\n- Enhanced analysis algorithms\n\nEstimated time: 2-4 hours\nDowntime required: 30 minutes')}
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center"
        >
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
            <button 
              onClick={() => console.log(`Configure ${agent.name}:\n\nCurrent Status: ${agent.status}\nAccuracy: ${agent.accuracy}%\nRequests: ${agent.requests}\n\nConfiguration Options:\n- Adjust accuracy threshold\n- Set request limits\n- Update training parameters\n- Configure response format`)}
              className="w-full mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
            >
              Configure Agent
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const runServiceDemo = async (service, clientData = null) => {
    setTestingInProgress(true);
    const startTime = performance.now();
    
    try {
      let endpoint = '';
      let payload = {};
      
      // Use selected client data or default demo data
      const testClient = clientData || selectedClient || {
        name: "Demo Client Corp",
        industry: "Technology",
        employees: 50,
        strategy: "Build innovative software products that transform how businesses operate and scale globally",
        vision: "To be the leading innovator in our industry",
        mission: "Empower businesses with cutting-edge technology",
        values: ["Innovation", "Collaboration", "Excellence", "Integrity"]
      };

      // Convert values string to array if needed
      const valuesArray = Array.isArray(testClient.values) 
        ? testClient.values 
        : (testClient.values || "Innovation, Collaboration, Excellence, Integrity").split(',').map(v => v.trim());

      // Generate departments and roles based on employee count
      const employeeCount = parseInt(testClient.employees) || 50;
      const departments = [
        { id: "eng", name: "Engineering", headCount: Math.round(employeeCount * 0.4), manager: "Engineering Manager" },
        { id: "prod", name: "Product", headCount: Math.round(employeeCount * 0.3), manager: "Product Manager" },
        { id: "ops", name: "Operations", headCount: Math.round(employeeCount * 0.3), manager: "Operations Manager" }
      ];

      const roles = [
        { id: "senior_eng", title: "Senior Engineer", department: "eng", level: 4, responsibilities: ["Technical Leadership", "Architecture"] },
        { id: "product_mgr", title: "Product Manager", department: "prod", level: 4, responsibilities: ["Product Strategy", "Roadmap"] },
        { id: "ops_specialist", title: "Operations Specialist", department: "ops", level: 3, responsibilities: ["Operations", "Support"] }
      ];

      // If we have a specific client selected, use the client-specific analysis endpoint
      if (selectedClient && selectedClient.id) {
        console.log('🎯 Running analysis for specific client:', selectedClient.name);
        
        const apiUrl = 'https://mizan-backend-production.up.railway.app';
        const response = await fetch(`${apiUrl}/api/superadmin/clients/${selectedClient.id}/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            analysisType: service,
            clientData: selectedClient
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Client analysis failed: ${errorText}`);
        }

        const data = await response.json();
        const endTime = performance.now();
        
        setServiceResults(prev => ({
          ...prev,
          [service]: {
            status: 'success',
            data: data.result,
            duration: endTime - startTime,
            timestamp: new Date().toISOString(),
            clientSpecific: true,
            clientName: selectedClient.name
          }
        }));
        
        setTestingInProgress(false);
        return;
      }

      // Prepare analysis payload with client data
      const basePayload = {
        orgName: testClient.name,
        industry: testClient.industry,
        strategy: testClient.strategy,
        vision: testClient.vision,
        mission: testClient.mission,
        values: valuesArray,
        departments: departments,
        roles: roles
      };

      if (service === 'culture') {
        endpoint = '/api/entry/analyze-culture';
        payload = {
          ...basePayload,
          companyValues: valuesArray,
          companyVision: testClient.vision,
          companyMission: testClient.mission,
          companyStrategy: testClient.strategy,
          employeeResponses: [
            {
              employeeId: "emp1",
              personalValues: valuesArray.slice(0, 3),
              currentExperience: valuesArray.slice(0, 2).concat(["Communication"]),
              desiredCulture: valuesArray.slice(0, 3).concat(["Growth"]),
              recognition: 7,
              engagement: 8
            },
            {
              employeeId: "emp2", 
              personalValues: valuesArray.slice(1, 4),
              currentExperience: valuesArray.slice(1, 3).concat(["Trust"]),
              desiredCulture: valuesArray.slice(0, 3),
              recognition: 6,
              engagement: 7
            }
          ]
        };
      } else if (service === 'structure') {
        endpoint = '/api/entry/analyze-org';
        payload = basePayload;
      } else if (service === 'skills') {
        endpoint = '/api/entry/analyze-skills';
        payload = {
          ...basePayload,
          employeeProfiles: [
            { name: "Senior Engineer", role: "Senior Engineer", skills: [{ name: "JavaScript", level: "expert" }, { name: "Python", level: "advanced" }] },
            { name: "Product Manager", role: "Product Manager", skills: [{ name: "Product Strategy", level: "expert" }, { name: "Market Research", level: "advanced" }] },
            { name: "Operations Specialist", role: "Operations Specialist", skills: [{ name: "Process Management", level: "expert" }, { name: "Analytics", level: "intermediate" }] }
          ]
        };
      } else if (service === 'engagement') {
        endpoint = '/api/entry/analyze-engagement';
        payload = {
          ...basePayload,
          companyVision: testClient.vision,
          companyMission: testClient.mission,
          companyStrategy: testClient.strategy,
          companyValues: valuesArray,
          employeeResponses: [
            {
              employeeId: "emp1",
              engagement: 8,
              recognition: 7,
              personalValues: valuesArray.slice(0, 3),
              currentExperience: valuesArray.slice(0, 2),
              desiredCulture: valuesArray.slice(0, 3)
            },
            {
              employeeId: "emp2",
              engagement: 6,
              recognition: 5,
              personalValues: valuesArray.slice(1, 4),
              currentExperience: valuesArray.slice(1, 3),
              desiredCulture: valuesArray.slice(0, 3)
            }
          ]
        };
      } else if (service === 'recognition') {
        endpoint = '/api/entry/analyze-recognition';
        payload = {
          ...basePayload,
          companyVision: testClient.vision,
          companyMission: testClient.mission,
          companyStrategy: testClient.strategy,
          companyValues: valuesArray,
          employeeResponses: [
            {
              employeeId: "emp1",
              recognition: 7,
              engagement: 8,
              personalValues: valuesArray.slice(0, 3),
              currentExperience: valuesArray.slice(0, 2),
              desiredCulture: valuesArray.slice(0, 3)
            },
            {
              employeeId: "emp2",
              recognition: 5,
              engagement: 6,
              personalValues: valuesArray.slice(1, 4),
              currentExperience: valuesArray.slice(1, 3),
              desiredCulture: valuesArray.slice(0, 3)
            }
          ]
        };
      }

      console.log('🔗 Testing service:', service, 'at endpoint:', endpoint);
      console.log('📋 Payload:', JSON.stringify(payload, null, 2));
      const apiUrl = 'https://mizan-backend-production.up.railway.app';
      console.log('🌐 API URL:', apiUrl + endpoint);
      
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('📡 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Service response received:', service, data.success ? 'Success' : 'Failed');
      const endTime = performance.now();
      
      setServiceResults(prev => ({
        ...prev,
        [service]: {
          status: 'success',
          data: data,
          duration: endTime - startTime,
          timestamp: new Date().toISOString()
        }
      }));
      
    } catch (error) {
      const endTime = performance.now();
      console.error('❌ Service test failed:', service, error.message);
      setServiceResults(prev => ({
        ...prev,
        [service]: {
          status: 'error',
          error: error.message,
          duration: endTime - startTime,
          timestamp: new Date().toISOString()
        }
      }));
    }
    
    setTestingInProgress(false);
  };

  const runAllServices = async () => {
    console.log('🚀 Starting comprehensive service testing...');
    await runServiceDemo('culture');
    await runServiceDemo('structure');
    await runServiceDemo('skills');
    await runServiceDemo('engagement');
    await runServiceDemo('recognition');
    console.log('✅ All services tested');
  };

  const renderDemoServicesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-slate-900">Demo All Services</h2>
          <p className="text-slate-600">Test all AI analysis services for client demonstrations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={runAllServices}
            disabled={testingInProgress}
            className="bg-green-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
          >
            {testingInProgress ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Run All Services
              </>
            )}
          </button>
          {selectedClient && (
            <button
              onClick={() => runServiceDemo('culture', selectedClient)}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Demo for {selectedClient.name}
            </button>
          )}
        </div>
      </div>

      {/* Client Selection for Demo */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Select Client for Demo</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                selectedClient?.id === client.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <h4 className="font-medium text-slate-900">{client.name}</h4>
              <p className="text-sm text-slate-600">{client.plan} Plan • {client.employees} employees</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Testing Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'culture', name: 'Culture Analysis', symbol: '🎯', color: 'blue', description: '7-cylinders framework analysis' },
          { id: 'structure', name: 'Structure Analysis', symbol: '🏗️', color: 'green', description: 'Organizational alignment assessment' },
          { id: 'skills', name: 'Skills Analysis', symbol: '🎓', color: 'purple', description: 'Strategic capability mapping' },
          { id: 'engagement', name: 'Engagement Analysis', symbol: '💖', color: 'pink', description: 'Employee engagement insights' },
          { id: 'recognition', name: 'Recognition Analysis', symbol: '🏆', color: 'amber', description: 'Recognition system effectiveness' }
        ].map((service) => {
          const result = serviceResults[service.id];
          return (
            <div key={service.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  service.color === 'blue' ? 'bg-blue-100' :
                  service.color === 'green' ? 'bg-green-100' :
                  service.color === 'purple' ? 'bg-purple-100' :
                  service.color === 'pink' ? 'bg-pink-100' :
                  'bg-amber-100'
                }`}>
                  {service.symbol}
                </div>
                {result && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    result.status === 'success' ? 'bg-green-100 text-green-800' :
                    result.status === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {result.status === 'success' ? 'Success' : result.status === 'error' ? 'Error' : 'Running'}
                  </span>
                )}
              </div>
              
              <h3 className="font-medium text-slate-900 mb-2">{service.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{service.description}</p>
              
              {result && (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-medium">{result.duration?.toFixed(0)}ms</span>
                  </div>
                  {result.status === 'success' && result.data && (
                    <div className="bg-green-50 border border-green-200 rounded p-3 mt-3">
                      <p className="text-green-800 text-xs mb-2">
                        {service.id === 'culture' && result.data.analysis?.reports?.adminReport?.cultureHealth?.overallStatus}
                        {service.id === 'structure' && result.data.analysis?.executiveSummary?.slice(0, 100)}
                        {service.id === 'skills' && result.data.analysis?.executiveSummary?.slice(0, 100)}
                        {service.id === 'engagement' && result.data.analysis?.executiveSummary?.slice(0, 100)}
                        {service.id === 'recognition' && result.data.analysis?.executiveSummary?.slice(0, 100)}
                      </p>
                      <button
                        onClick={() => {
                          setViewingReport(service.id);
                          setReportData(result.data);
                        }}
                        className="text-green-700 hover:text-green-800 text-xs font-medium underline"
                      >
                        View Full Report →
                      </button>
                    </div>
                  )}
                  {result.status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
                      <p className="text-red-800 text-xs">{result.error}</p>
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={() => runServiceDemo(service.id, selectedClient)}
                disabled={testingInProgress}
                className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                  service.color === 'blue' ? 'bg-blue-100 hover:bg-blue-200 text-blue-700' :
                  service.color === 'green' ? 'bg-green-100 hover:bg-green-200 text-green-700' :
                  service.color === 'purple' ? 'bg-purple-100 hover:bg-purple-200 text-purple-700' :
                  service.color === 'pink' ? 'bg-pink-100 hover:bg-pink-200 text-pink-700' :
                  'bg-amber-100 hover:bg-amber-200 text-amber-700'
                }`}
              >
                {testingInProgress ? 'Testing...' : 'Test Service'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Results Summary */}
      {Object.keys(serviceResults).length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Testing Results Summary</h3>
          <div className="space-y-3">
            {Object.entries(serviceResults).map(([service, result]) => (
              <div key={service} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    result.status === 'success' ? 'bg-green-500' :
                    result.status === 'error' ? 'bg-red-500' :
                    'bg-amber-500'
                  }`}></div>
                  <span className="font-medium capitalize">{service} Analysis</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span>{result.duration?.toFixed(0)}ms</span>
                  <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderRealDataTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-slate-900">Real Data Collection & Analysis</h2>
          <p className="text-slate-600">Collect actual organizational data for genuine AI insights</p>
        </div>
        <Link href="/superadmin/data-management" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center">
          <Database className="w-4 h-4 mr-2" />
          Manage Data Collection
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Demo vs Real Analysis</h3>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <h4 className="font-medium text-amber-900 mb-2">🧪 Demo Analysis (Current)</h4>
              <p className="text-sm text-amber-800">
                Uses sample data to test endpoints and demonstrate functionality. 
                Good for showing prospects how the platform works.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <h4 className="font-medium text-green-900 mb-2">🎯 Real Analysis (Enhanced)</h4>
              <p className="text-sm text-green-800">
                Uses actual employee surveys, org charts, and profiles. 
                Provides genuine organizational intelligence and insights.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Data Collection Requirements</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-xl">📋</span>
              <div>
                <p className="font-medium text-slate-900">Employee Surveys</p>
                <p className="text-sm text-slate-600">Culture, engagement, and recognition data</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-xl">🏗️</span>
              <div>
                <p className="font-medium text-slate-900">Organizational Chart</p>
                <p className="text-sm text-slate-600">CSV with departments, roles, reporting lines</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-xl">🎓</span>
              <div>
                <p className="font-medium text-slate-900">Employee Profiles</p>
                <p className="text-sm text-slate-600">Resumes, skills data, experience profiles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-medium text-slate-900 mb-3">🚀 Real vs Demo Analysis</h3>
        <p className="text-slate-700">
          <strong>Demo Analysis:</strong> Uses sample data for testing and prospect demonstrations.<br/>
          <strong>Real Analysis:</strong> Uses collected organizational data for genuine insights.
          <br/><br/>
          Use "Manage Data Collection" above to transition from demo to real analysis.
        </p>
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
            <button 
              onClick={() => console.log('System Notifications:\n\nRecent notifications:\n- 3 new client registrations\n- AI model training completed\n- System update available\n- 2 support tickets pending')}
              className="p-2 text-slate-500 hover:text-slate-700"
            >
              <Mail className="w-5 h-5" />
            </button>
            <button 
              onClick={() => console.log('System Settings:\n\nQuick access to:\n- Environment configuration\n- Security settings\n- API rate limits\n- Backup management\n- Maintenance mode')}
              className="p-2 text-slate-500 hover:text-slate-700"
            >
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
          {activeTab === 'demo' && renderDemoServicesTab()}
          {activeTab === 'data' && renderRealDataTab()}
          {activeTab === 'framework' && renderFrameworkTab()}
          {activeTab === 'agents' && renderAgentsTab()}
          
          {/* Placeholder tabs */}
          {activeTab === 'users' && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">👥</span>
              <h3 className="text-xl font-light text-slate-900 mb-2">User Management</h3>
              <p className="text-slate-600">Manage individual user accounts and permissions</p>
            </div>
          )}
          
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light text-slate-900 mb-2">System Administration</h2>
                <p className="text-slate-600">Platform configuration, monitoring, and maintenance</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl block mb-2">🔧</span>
                    <h3 className="font-medium text-slate-900">Configuration</h3>
                  </div>
                  <button 
                    onClick={() => console.log('System Configuration:\n\n- Environment variables\n- Database settings\n- API configurations\n- Security policies\n- Rate limiting')}
                    className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200"
                  >
                    Manage Config
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl block mb-2">📊</span>
                    <h3 className="font-medium text-slate-900">Monitoring</h3>
                  </div>
                  <button 
                    onClick={() => console.log('System Monitoring:\n\n- Server performance\n- API response times\n- Error rates\n- Database performance\n- User activity')}
                    className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200"
                  >
                    View Metrics
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="text-center mb-4">
                    <span className="text-3xl block mb-2">🔒</span>
                    <h3 className="font-medium text-slate-900">Security</h3>
                  </div>
                  <button 
                    onClick={() => console.log('Security Management:\n\n- Access logs\n- Failed login attempts\n- API key management\n- User permissions\n- Audit trails')}
                    className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200"
                  >
                    Security Panel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Report Viewing Modal */}
      {viewingReport && reportData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-2xl font-light text-slate-900 capitalize">{viewingReport} Analysis Report</h3>
              <button
                onClick={() => {
                  setViewingReport(null);
                  setReportData(null);
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {viewingReport === 'culture' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-3">Culture Health Overview</h4>
                    <p className="text-blue-800">{reportData.analysis?.reports?.adminReport?.cultureHealth?.overallStatus}</p>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-light text-blue-900">{reportData.analysis?.reports?.adminReport?.cultureHealth?.alignmentScore || 'N/A'}</div>
                        <div className="text-sm text-blue-700">Alignment Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-blue-900">{reportData.analysis?.reports?.adminReport?.cultureHealth?.entropyScore || 'N/A'}</div>
                        <div className="text-sm text-blue-700">Entropy Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-light text-blue-900">{reportData.analysis?.reports?.adminReport?.cultureHealth?.healthScore || 'N/A'}</div>
                        <div className="text-sm text-blue-700">Health Score</div>
                      </div>
                    </div>
                  </div>
                  
                  {reportData.analysis?.engagementInsights && (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                      <h4 className="font-semibold text-purple-900 mb-3">📊 Engagement Integration</h4>
                      <p className="text-purple-800 mb-3">
                        Average Engagement: {reportData.analysis.engagementInsights.organizationLevel?.averageEngagement}/10
                      </p>
                      <p className="text-purple-800 mb-3">
                        Average Recognition: {reportData.analysis.engagementInsights.organizationLevel?.averageRecognition}/10
                      </p>
                      <div className="text-sm text-purple-700">
                        {reportData.analysis.engagementInsights.organizationLevel?.insights?.map((insight, index) => (
                          <p key={index} className="mb-2">• {insight}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {viewingReport === 'structure' && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Structure Assessment</h4>
                    <p className="text-green-800 mb-4">{reportData.analysis?.executiveSummary}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-light text-green-900">{reportData.analysis?.overallScore || 'N/A'}</div>
                        <div className="text-sm text-green-700">Overall Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-green-900">{reportData.analysis?.strategicAlignmentScore || 'N/A'}</div>
                        <div className="text-sm text-green-700">Strategic Alignment</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewingReport === 'skills' && (
                <div className="space-y-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h4 className="font-semibold text-purple-900 mb-3">Skills Gap Analysis</h4>
                    <p className="text-purple-800 mb-4">{reportData.analysis?.executiveSummary}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-light text-purple-900">{reportData.analysis?.overallScore || 'N/A'}</div>
                        <div className="text-sm text-purple-700">Readiness Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-purple-900">{reportData.analysis?.gapAnalysis?.criticalGaps?.length || 0}</div>
                        <div className="text-sm text-purple-700">Critical Gaps</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewingReport === 'engagement' && (
                <div className="space-y-6">
                  <div className="bg-pink-50 border border-pink-200 rounded-xl p-6">
                    <h4 className="font-semibold text-pink-900 mb-3">Engagement Analysis</h4>
                    <p className="text-pink-800 mb-4">{reportData.analysis?.executiveSummary}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-2xl font-light text-pink-900">{reportData.analysis?.overallEngagementScore || 'N/A'}</div>
                        <div className="text-sm text-pink-700">Overall Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-pink-900">{reportData.analysis?.engagementMetrics?.satisfaction || 'N/A'}</div>
                        <div className="text-sm text-pink-700">Satisfaction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-pink-900">{reportData.analysis?.engagementMetrics?.retention || 'N/A'}%</div>
                        <div className="text-sm text-pink-700">Retention Risk</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {viewingReport === 'recognition' && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h4 className="font-semibold text-amber-900 mb-3">Recognition Analysis</h4>
                    <p className="text-amber-800 mb-4">{reportData.analysis?.executiveSummary}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-2xl font-light text-amber-900">{reportData.analysis?.overallRecognitionScore || 'N/A'}</div>
                        <div className="text-sm text-amber-700">Overall Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-amber-900">{reportData.analysis?.recognitionMetrics?.averageRecognition || 'N/A'}</div>
                        <div className="text-sm text-amber-700">Avg Recognition</div>
                      </div>
                      <div>
                        <div className="text-2xl font-light text-amber-900">{reportData.analysis?.riskAssessment?.lowRecognitionEmployees || 0}</div>
                        <div className="text-sm text-amber-700">At Risk</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-slate-50 rounded-xl p-6">
                <pre className="text-xs text-slate-600 overflow-auto max-h-60">
                  {JSON.stringify(reportData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Value Management Modal */}
      {showValueManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-2xl font-light text-slate-900">Manage Values: {showValueManager.name}</h3>
              <button onClick={() => setShowValueManager(null)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-900 mb-4 flex items-center">
                    <span className="text-lg mr-2">✅</span>
                    Positive Values ({showValueManager.positiveCount})
                  </h4>
                  <div className="space-y-2">
                    {['Safety', 'Stability', 'Wellbeing', 'Preparedness', 'Reliability'].map((value, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">{value}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-red-900 mb-4 flex items-center">
                    <span className="text-lg mr-2">⚠️</span>
                    Limiting Values ({showValueManager.limitingCount})
                  </h4>
                  <div className="space-y-2">
                    {['Fear', 'Scarcity Mindset', 'Anxiety', 'Neglect of Safety', 'Rigidity'].map((value, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="font-medium">{value}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                  Add New Value
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">
                  Import from CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Values Modal */}
      {showImportValues && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-medium text-slate-900">Import Values</h3>
              <button onClick={() => setShowImportValues(false)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                <span className="text-4xl block mb-4">📁</span>
                <p className="text-slate-600 mb-4">Upload CSV file with values</p>
                <input type="file" accept=".csv" className="hidden" id="import-values" />
                <label htmlFor="import-values" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 cursor-pointer">
                  Choose File
                </label>
              </div>
              <div className="mt-4 flex space-x-3">
                <button 
                  onClick={() => {
                    const fileInput = document.getElementById('import-values') as HTMLInputElement;
                    if (fileInput?.files?.[0]) {
                      importValues(fileInput.files[0]);
                    } else {
                      alert('Please select a CSV file first');
                    }
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700"
                >
                  Import
                </button>
                <button 
                  onClick={() => setShowImportValues(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Value Modal */}
      {showAddValue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-medium text-slate-900">Add New Value</h3>
              <button onClick={() => setShowAddValue(false)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Value Name</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Innovation" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Definition</label>
                <textarea className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20" placeholder="The ability to create new ideas and solutions..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Cylinder</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>1 - Safety & Survival</option>
                  <option>2 - Belonging & Loyalty</option>
                  <option>3 - Growth & Achievement</option>
                  <option>4 - Meaning & Contribution</option>
                  <option>5 - Integrity & Justice</option>
                  <option>6 - Wisdom & Compassion</option>
                  <option>7 - Transcendence & Unity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Type</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Positive Value (Enabling)</option>
                  <option>Limiting Value (Cautionary)</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    console.log('Value added successfully to framework!');
                    setShowAddValue(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700"
                >
                  Add Value
                </button>
                <button 
                  onClick={() => setShowAddValue(false)}
                  className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}