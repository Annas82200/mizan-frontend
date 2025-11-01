'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SkillsIcon } from '@/components/icons';
import { SkillsAnalysisDashboard } from '@/components/skills/SkillsAnalysisDashboard';
import { SkillsBotInterface } from '@/components/skills/bot/SkillsBotInterface';
import { SkillsWorkflowManager } from '@/components/skills/SkillsWorkflowManager';
import { StrategicFrameworkManager } from '@/components/skills/StrategicFrameworkManager';
import { IndividualSkillsAssessment } from '@/components/skills/IndividualSkillsAssessment';
import { SkillsGapAnalysis } from '@/components/skills/SkillsGapAnalysis';
import { SkillsProgressTracking } from '@/components/skills/SkillsProgressTracking';
import { SkillsReporting } from '@/components/skills/SkillsReporting';

interface SkillsAnalysisPageProps {}

/**
 * Skills Analysis Dashboard Page
 * Complete Skills Analysis Interface - AGENT_CONTEXT_ULTIMATE.md Lines 246-251
 * Three-Engine Architecture + Interactive BOT System
 */
export default function SkillsAnalysisPage({}: SkillsAnalysisPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Get user info from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || 'employee');
        setUserName(payload.name || 'User');
        
        // Role-based access control
        const allowedRoles = ['superadmin', 'clientAdmin', 'manager', 'employee'];
        if (!allowedRoles.includes(payload.role)) {
          router.push('/dashboard');
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mizan-primary"></div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <SkillsIcon className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin', 'manager', 'employee']
    },
    {
      id: 'workflow',
      label: 'Analysis Workflow',
      icon: <span className="text-lg">🔄</span>,
      roles: ['superadmin', 'clientAdmin']
    },
    {
      id: 'framework',
      label: 'Strategic Framework',
      icon: <span className="text-lg">🏗️</span>,
      roles: ['superadmin', 'clientAdmin']
    },
    {
      id: 'assessment',
      label: 'Skills Assessment',
      icon: <span className="text-lg">📋</span>,
      roles: ['superadmin', 'clientAdmin', 'manager', 'employee']
    },
    {
      id: 'gaps',
      label: 'Gap Analysis',
      icon: <span className="text-lg">📊</span>,
      roles: ['superadmin', 'clientAdmin', 'manager']
    },
    {
      id: 'progress',
      label: 'Progress Tracking',
      icon: <span className="text-lg">📈</span>,
      roles: ['superadmin', 'clientAdmin', 'manager', 'employee']
    },
    {
      id: 'reporting',
      label: 'Reports & Insights',
      icon: <span className="text-lg">📑</span>,
      roles: ['superadmin', 'clientAdmin', 'manager']
    },
    {
      id: 'bot',
      label: 'Skills Assistant',
      icon: <span className="text-lg">🤖</span>,
      roles: ['superadmin', 'clientAdmin', 'manager', 'employee']
    }
  ].filter(tab => tab.roles.includes(userRole));

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SkillsAnalysisDashboard userRole={userRole} />;
      case 'workflow':
        return <SkillsWorkflowManager userRole={userRole} />;
      case 'framework':
        return <StrategicFrameworkManager userRole={userRole} />;
      case 'assessment':
        return <IndividualSkillsAssessment userRole={userRole} />;
      case 'gaps':
        return <SkillsGapAnalysis userRole={userRole} />;
      case 'progress':
        return <SkillsProgressTracking userRole={userRole} />;
      case 'reporting':
        return <SkillsReporting userRole={userRole} />;
      case 'bot':
        return <SkillsBotInterface userRole={userRole} />;
      default:
        return <SkillsAnalysisDashboard userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <SkillsIcon className="w-8 h-8 text-mizan-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Skills Analysis</h1>
                <p className="text-sm text-gray-600">
                  Strategic Skills Assessment & Development Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-mizan-primary text-mizan-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {renderActiveTab()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Skills Analysis Platform - Strategic Skills Assessment & Development</p>
            <p className="mt-1">
              Powered by Three-Engine AI Architecture + Interactive BOT System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
