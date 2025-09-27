"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  BarChart3, 
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Award,
  Activity,
  Heart,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Calendar,
  MessageCircle,
  Bell,
  User,
  Eye,
  Download
} from 'lucide-react';

// Mock employee data based on company subscription
const mockEmployee = {
  name: 'Sarah Johnson',
  role: 'Senior Product Manager',
  department: 'Product',
  company: 'Acme Corporation',
  email: 'sarah.johnson@acme.com',
  companyPlan: 'Pro+',
  personalValues: ['Innovation', 'Collaboration', 'Growth', 'Integrity'],
  cultureScore: 87,
  engagementScore: 92,
  recognitionScore: 76,
  hasCompletedSurvey: true,
  availableServices: {
    cultureSurvey: true,
    personalReports: true,
    teamInsights: true,
    developmentPlan: true,
    performanceTracking: false, // Only available in Enterprise
    mentorshipMatching: false   // Only available in Enterprise
  }
};

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'survey', message: 'New culture survey available', time: '2 hours ago', read: false },
    { id: 2, type: 'report', message: 'Your personal culture report is ready', time: '1 day ago', read: false },
    { id: 3, type: 'recognition', message: 'You received recognition from your manager', time: '3 days ago', read: true }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'surveys', name: 'Surveys', icon: Users },
    { id: 'reports', name: 'My Reports', icon: BookOpen },
    { id: 'development', name: 'Development', icon: TrendingUp },
    { id: 'recognition', name: 'Recognition', icon: Award }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-light mb-2">Hello, {mockEmployee.name.split(' ')[0]}! 👋</h1>
            <p className="text-blue-100 mb-4">
              Welcome to your personal organizational intelligence dashboard.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{mockEmployee.role}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{mockEmployee.department} Team</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light">87</div>
            <div className="text-sm text-blue-100">Culture Alignment</div>
          </div>
        </div>
      </div>

      {/* Personal Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-light text-slate-900">{mockEmployee.cultureScore}</span>
          </div>
          <h3 className="font-medium text-slate-900 mb-1">Culture Alignment</h3>
          <p className="text-sm text-slate-600 mb-2">Your values match with company culture</p>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Strong alignment</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-light text-slate-900">{mockEmployee.engagementScore}</span>
          </div>
          <h3 className="font-medium text-slate-900 mb-1">Engagement Score</h3>
          <p className="text-sm text-slate-600 mb-2">Your workplace satisfaction level</p>
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Highly engaged</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-2xl font-light text-slate-900">{mockEmployee.recognitionScore}</span>
          </div>
          <h3 className="font-medium text-slate-900 mb-1">Recognition Index</h3>
          <p className="text-sm text-slate-600 mb-2">How valued you feel at work</p>
          <div className="flex items-center text-sm text-amber-600">
            <Activity className="w-4 h-4 mr-1" />
            <span>Room for growth</span>
          </div>
        </div>
      </div>

      {/* Personal Values & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Your Core Values</h3>
          <div className="grid grid-cols-2 gap-3">
            {mockEmployee.personalValues.map((value, index) => (
              <div key={index} className={`p-4 rounded-xl text-center ${
                index === 0 ? 'bg-blue-50 border border-blue-200' :
                index === 1 ? 'bg-green-50 border border-green-200' :
                index === 2 ? 'bg-purple-50 border border-purple-200' :
                'bg-amber-50 border border-amber-200'
              }`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  index === 0 ? 'bg-blue-100' :
                  index === 1 ? 'bg-green-100' :
                  index === 2 ? 'bg-purple-100' :
                  'bg-amber-100'
                }`}>
                  {index === 0 ? <Lightbulb className="w-4 h-4 text-blue-600" /> :
                   index === 1 ? <Users className="w-4 h-4 text-green-600" /> :
                   index === 2 ? <TrendingUp className="w-4 h-4 text-purple-600" /> :
                   <Award className="w-4 h-4 text-amber-600" />}
                </div>
                <p className="font-medium text-slate-900 text-sm">{value}</p>
              </div>
            ))}
          </div>
          <Link href="/employee/culture-results" className="block mt-4 text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
            View Detailed Analysis →
          </Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-medium text-slate-900 mb-6">Available Actions</h3>
          <div className="space-y-4">
            {mockEmployee.availableServices.cultureSurvey && (
              <Link href="/employee/culture-survey" className="group block">
                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Culture Survey</p>
                      <p className="text-sm text-blue-700">Share your workplace experience</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )}

            {mockEmployee.availableServices.personalReports && (
              <div className="group block">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-900">Personal Reports</p>
                      <p className="text-sm text-green-700">View your analysis results</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}

            {mockEmployee.availableServices.developmentPlan && (
              <div className="group block">
                <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-purple-900">Development Plan</p>
                      <p className="text-sm text-purple-700">Personalized growth recommendations</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enterprise Features Preview */}
      {!mockEmployee.availableServices.performanceTracking && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-amber-900 mb-2">Unlock More Features</h3>
              <p className="text-amber-800 mb-4">
                Your company can unlock performance tracking, mentorship matching, and personalized development paths with Enterprise features.
              </p>
              <button className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center">
                Learn More About Enterprise Features
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSurveysTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-slate-900 mb-2">Culture Surveys</h2>
        <p className="text-slate-600">Participate in organizational culture assessments</p>
      </div>

      {mockEmployee.hasCompletedSurvey ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-1">Survey Completed!</h3>
              <p className="text-green-700">Thank you for participating in our culture assessment. Your responses help improve our workplace.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <Link href="/employee/culture-results" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
              View My Results
            </Link>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Download Report
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Culture Survey Available</h3>
              <p className="text-blue-700">Help us understand your experience and improve our workplace culture.</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/employee/culture-survey" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors inline-flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Start Survey
            </Link>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Survey Information</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="font-medium text-slate-900">Estimated Time</p>
              <p className="text-sm text-slate-600">10-15 minutes to complete</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Eye className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="font-medium text-slate-900">Privacy</p>
              <p className="text-sm text-slate-600">Your individual responses are confidential and only aggregated insights are shared</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Target className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="font-medium text-slate-900">Purpose</p>
              <p className="text-sm text-slate-600">Help leadership understand team culture and identify improvement opportunities</p>
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
              <h1 className="text-lg font-medium text-slate-900">{mockEmployee.name}</h1>
              <p className="text-sm text-slate-500">{mockEmployee.company} • {mockEmployee.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:text-slate-700 relative">
              <Bell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
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
          {activeTab === 'surveys' && renderSurveysTab()}
          
          {/* Placeholder tabs */}
          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-slate-900 mb-2">Personal Reports</h3>
              <p className="text-slate-600">View your culture analysis and development insights</p>
              <Link href="/employee/culture-results" className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                View Culture Report
              </Link>
            </div>
          )}
          
          {activeTab === 'development' && (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-slate-900 mb-2">Development Plan</h3>
              <p className="text-slate-600">Personalized growth recommendations based on your profile</p>
            </div>
          )}
          
          {activeTab === 'recognition' && (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-slate-900 mb-2">Recognition & Feedback</h3>
              <p className="text-slate-600">Track recognition received and give feedback to colleagues</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}