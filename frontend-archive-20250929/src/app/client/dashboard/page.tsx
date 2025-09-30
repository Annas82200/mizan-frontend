"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Upload,
  Plus,
  Eye,
  FileText,
  Zap,
  Brain,
  Search,
  Calendar,
  Star,
  Award,
  Activity,
  PieChart,
  ArrowRight,
  Database,
  Send
} from 'lucide-react';

// Mock user subscription data
const mockUser = {
  company: 'Acme Corporation',
  email: 'admin@acme.com',
  plan: 'Pro+',
  employees: 250,
  features: {
    structureAnalysis: true,
    cultureAnalysis: true,
    skillsAnalysis: true,
    employeeSurveys: true,
    advancedReports: true,
    customReports: true,
    apiAccess: false,
    whiteLabeling: false,
    dedicatedSupport: true
  }
};

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [recentAnalyses, setRecentAnalyses] = useState([
    { id: 1, type: 'Culture', date: '2024-12-15', status: 'completed', score: 84, department: 'Engineering' },
    { id: 2, type: 'Structure', date: '2024-12-14', status: 'completed', score: 92, department: 'All' },
    { id: 3, type: 'Skills', date: '2024-12-13', status: 'in_progress', score: null, department: 'Product' },
  ]);

  const [metrics, setMetrics] = useState({
    totalEmployees: 250,
    surveysCompleted: 187,
    cultureScore: 84,
    structureScore: 92,
    skillsReadiness: 78,
    engagementRate: 89
  });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'data-collection', name: 'Data Collection', icon: Database },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'services', name: 'Services', icon: Zap },
    { id: 'employees', name: 'Employees', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const getFeatureStatus = (featureName: keyof typeof mockUser.features) => {
    return mockUser.features[featureName];
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-amber-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-light mb-2">Welcome back, {mockUser.company}</h1>
        <p className="text-blue-100 mb-6">
          Your organizational intelligence dashboard is ready. Here's what's happening with your team.
        </p>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{mockUser.plan} Plan Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>{mockUser.employees} Employees</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-light text-slate-900">{metrics.surveysCompleted}/{metrics.totalEmployees}</span>
          </div>
          <h3 className="font-medium text-slate-900 mb-1">Survey Completion</h3>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{Math.round((metrics.surveysCompleted / metrics.totalEmployees) * 100)}% completion rate</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-light text-slate-900">{metrics.cultureScore}</span>
          </div>
          <h3 className="font-medium text-slate-900 mb-1">Culture Score</h3>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Above industry average</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-2xl font-light text-slate-900">{metrics.structureScore}</span>
          </div>
          <h3 className="font-medium text-slate-900 mb-1">Structure Score</h3>
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Excellent alignment</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-light text-slate-900">{metrics.skillsReadiness}%</span>
          </div>
          <h3 className="font-medium text-slate-900 mb-1">Skills Readiness</h3>
          <div className="flex items-center text-sm text-amber-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>Improvement opportunities</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-slate-900">Recent Analyses</h3>
            <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    analysis.type === 'Culture' ? 'bg-blue-100' :
                    analysis.type === 'Structure' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    {analysis.type === 'Culture' ? <Users className="w-5 h-5 text-blue-600" /> :
                     analysis.type === 'Structure' ? <Building2 className="w-5 h-5 text-green-600" /> :
                     <Target className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{analysis.type} Analysis</p>
                    <p className="text-sm text-slate-500">{analysis.department} • {analysis.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {analysis.status === 'completed' && analysis.score && (
                    <span className="text-lg font-medium text-slate-900">{analysis.score}</span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    analysis.status === 'completed' ? 'bg-green-100 text-green-800' :
                    analysis.status === 'in_progress' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {analysis.status === 'completed' ? 'Completed' :
                     analysis.status === 'in_progress' ? 'In Progress' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {getFeatureStatus('employeeSurveys') && (
              <Link href="/employee/culture-onboarding" className="group">
                <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <Users className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-slate-900 mb-1">Send Survey</p>
                  <p className="text-sm text-slate-600">Employee culture assessment</p>
                </div>
              </Link>
            )}
            
            {getFeatureStatus('structureAnalysis') && (
              <Link href="/companies/demo" className="group">
                <div className="p-4 border border-slate-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all">
                  <Building2 className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-slate-900 mb-1">Structure Analysis</p>
                  <p className="text-sm text-slate-600">Analyze org structure</p>
                </div>
              </Link>
            )}

            {getFeatureStatus('advancedReports') && (
              <div className="p-4 border border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
                <p className="font-medium text-slate-900 mb-1">View Reports</p>
                <p className="text-sm text-slate-600">Detailed analytics</p>
              </div>
            )}

            <div className="p-4 border border-slate-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all cursor-pointer">
              <Settings className="w-8 h-8 text-amber-600 mb-3" />
              <p className="font-medium text-slate-900 mb-1">Settings</p>
              <p className="text-sm text-slate-600">Configure platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-slate-900">Reports & Analytics</h2>
          <p className="text-slate-600">Access your organizational intelligence reports</p>
        </div>
        {getFeatureStatus('customReports') && (
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Custom Report
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {getFeatureStatus('cultureAnalysis') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Available</span>
            </div>
            <h3 className="font-medium text-slate-900 mb-2">Culture Analysis Report</h3>
            <p className="text-sm text-slate-600 mb-4">Comprehensive culture assessment with personalized insights</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-light text-slate-900">84</span>
              <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Report
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {getFeatureStatus('structureAnalysis') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Available</span>
            </div>
            <h3 className="font-medium text-slate-900 mb-2">Structure Analysis Report</h3>
            <p className="text-sm text-slate-600 mb-4">Strategic alignment and organizational structure assessment</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-light text-slate-900">92</span>
              <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                View Report
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {getFeatureStatus('skillsAnalysis') && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">In Progress</span>
            </div>
            <h3 className="font-medium text-slate-900 mb-2">Skills Gap Analysis</h3>
            <p className="text-sm text-slate-600 mb-4">Strategic skills assessment and future readiness</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-light text-slate-900">78%</span>
              <button className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Report
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {!getFeatureStatus('advancedReports') && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-amber-900 mb-2">Upgrade for Advanced Reports</h3>
              <p className="text-amber-800 mb-4">
                Get access to custom dashboards, trend analysis, and executive summaries with Pro+ or Enterprise plans.
              </p>
              <Link href="/companies/pricing" className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors">
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderServicesTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-slate-900 mb-2">Available Services</h2>
        <p className="text-slate-600">Services included in your {mockUser.plan} plan</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Available Services */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-900 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Active Services
          </h3>

          {getFeatureStatus('structureAnalysis') && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-green-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Structure Analysis</h4>
                    <p className="text-sm text-slate-600">Organizational alignment assessment</p>
                  </div>
                </div>
                <Link href="/companies/demo" className="text-green-600 hover:text-green-700 font-medium text-sm">
                  Launch →
                </Link>
              </div>
            </div>
          )}

          {getFeatureStatus('cultureAnalysis') && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Culture Analysis</h4>
                    <p className="text-sm text-slate-600">7-cylinders framework assessment</p>
                  </div>
                </div>
                <Link href="/employee/culture-onboarding" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Launch →
                </Link>
              </div>
            </div>
          )}

          {getFeatureStatus('skillsAnalysis') && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-purple-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Skills Analysis</h4>
                    <p className="text-sm text-slate-600">Strategic capability mapping</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Launch →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Upgrade Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-900 flex items-center">
            <Star className="w-5 h-5 text-amber-600 mr-2" />
            Upgrade Options
          </h3>

          {!getFeatureStatus('apiAccess') && (
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">API Access</h4>
                    <p className="text-sm text-slate-600">Integrate with your systems</p>
                  </div>
                </div>
                <span className="text-amber-600 font-medium text-sm">Enterprise</span>
              </div>
            </div>
          )}

          {!getFeatureStatus('whiteLabeling') && (
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">White Labeling</h4>
                    <p className="text-sm text-slate-600">Custom branding options</p>
                  </div>
                </div>
                <span className="text-amber-600 font-medium text-sm">Enterprise</span>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-medium text-slate-900 mb-2">Ready to Upgrade?</h4>
            <p className="text-sm text-slate-600 mb-4">
              Unlock advanced features and get dedicated support with Enterprise plan.
            </p>
            <Link href="/companies/pricing" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataCollectionTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-slate-900">Data Collection Center</h2>
          <p className="text-slate-600">Collect real organizational data for genuine AI analysis</p>
        </div>
        <Link href="/client/data-collection" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center">
          <Database className="w-4 h-4 mr-2" />
          Manage Data Collection
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Employee Surveys */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="text-center mb-4">
            <span className="text-4xl block mb-3">📋</span>
            <h3 className="font-medium text-slate-900 mb-2">Employee Surveys</h3>
            <p className="text-sm text-slate-600">Culture, engagement & recognition data</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Surveys Sent:</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Completed:</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Response Rate:</span>
              <span className="font-medium">0%</span>
            </div>
          </div>
          
          <Link href="/client/data-collection" className="block mt-4">
            <button className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition-colors flex items-center justify-center">
              <Send className="w-4 h-4 mr-2" />
              Send Surveys
            </button>
          </Link>
        </div>

        {/* Org Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="text-center mb-4">
            <span className="text-4xl block mb-3">🏗️</span>
            <h3 className="font-medium text-slate-900 mb-2">Organizational Chart</h3>
            <p className="text-sm text-slate-600">Structure analysis data</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
              Not Uploaded
            </div>
            <p className="text-xs text-slate-500 mb-4">Upload CSV with org structure</p>
          </div>
          
          <Link href="/client/data-collection" className="block">
            <button className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center justify-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload CSV
            </button>
          </Link>
        </div>

        {/* Employee Profiles */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="text-center mb-4">
            <span className="text-4xl block mb-3">🎓</span>
            <h3 className="font-medium text-slate-900 mb-2">Employee Profiles</h3>
            <p className="text-sm text-slate-600">Skills analysis data</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
              Not Uploaded
            </div>
            <p className="text-xs text-slate-500 mb-4">Upload resumes or skills data</p>
          </div>
          
          <Link href="/client/data-collection" className="block">
            <button className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-lg font-medium hover:bg-purple-200 transition-colors flex items-center justify-center">
              <FileText className="w-4 h-4 mr-2" />
              Upload Profiles
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-medium text-amber-900 mb-3">🚀 Unlock Real Organizational Intelligence</h3>
        <p className="text-amber-800 mb-4">
          Transform your analysis from demo data to genuine insights by collecting actual organizational information. 
          Each data source unlocks deeper AI-powered analysis capabilities.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="/client/data-collection" className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors">
            Start Data Collection
          </Link>
          <Link href="/companies/demo" className="text-amber-700 hover:text-amber-800 font-medium">
            View Demo Analysis →
          </Link>
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
              <h1 className="text-lg font-medium text-slate-900">{mockUser.company}</h1>
              <p className="text-sm text-slate-500">{mockUser.plan} Plan</p>
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
          {activeTab === 'data-collection' && renderDataCollectionTab()}
          {activeTab === 'reports' && renderReportsTab()}
          {activeTab === 'services' && renderServicesTab()}
          
          {/* Placeholder tabs */}
          {activeTab === 'employees' && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-slate-900 mb-2">Employee Management</h3>
              <p className="text-slate-600">Manage your team and survey deployments</p>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-slate-900 mb-2">Account Settings</h3>
              <p className="text-slate-600">Manage your account and preferences</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
