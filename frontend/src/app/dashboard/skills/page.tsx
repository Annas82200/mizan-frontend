'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SkillsIcon } from '@/components/icons';
import { RefreshCw, Building2, ClipboardList, BarChart3, TrendingUp, FileText, Bot, Users, Target } from 'lucide-react';
import { SkillsAnalysisDashboard } from '@/components/skills/SkillsAnalysisDashboard';
import { SkillsBotInterface } from '@/components/skills/bot/SkillsBotInterface';
import { SkillsWorkflowManager } from '@/components/skills/SkillsWorkflowManager';
import { StrategicFrameworkManager } from '@/components/skills/StrategicFrameworkManager';
import { IndividualSkillsAssessment } from '@/components/skills/IndividualSkillsAssessment';
import { SkillsGapAnalysis } from '@/components/skills/SkillsGapAnalysis';
import { SkillsProgressTracking } from '@/components/skills/SkillsProgressTracking';
import { SkillsReporting } from '@/components/skills/SkillsReporting';
import { DepartmentAnalysis } from '@/components/skills/DepartmentAnalysis';
import { OrganizationAnalysis } from '@/components/skills/OrganizationAnalysis';
import { logger } from '@/lib/logger';

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
    const checkAuthentication = async () => {
      try {
        // Step 1: Check mizan_user in localStorage (primary auth indicator)
        const userStr = localStorage.getItem('mizan_user');
        if (!userStr) {
          router.push('/login');
          return;
        }

        // Step 2: Parse user data with error handling
        let user;
        try {
          user = JSON.parse(userStr);
        } catch (parseError) {
          logger.error('Invalid user data in localStorage:', parseError);
          localStorage.removeItem('mizan_user');
          localStorage.removeItem('mizan_auth_token');
          router.push('/login');
          return;
        }

        setUserRole(user.role || 'employee');
        setUserName(user.name || 'User');

        // Step 3: Role-based access control
        const allowedRoles = ['superadmin', 'clientAdmin', 'manager', 'employee'];
        if (!allowedRoles.includes(user.role)) {
          router.push('/dashboard');
          return;
        }

        // Step 4: Verify backend authentication (hybrid auth: httpOnly cookie + Bearer token)
        try {
          const token = localStorage.getItem('mizan_auth_token');
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

          const response = await fetch(`${apiUrl}/api/auth/me`, {
            credentials: 'include', // Send httpOnly cookies
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          });

          if (!response.ok) {
            logger.error('Backend authentication verification failed');
            localStorage.removeItem('mizan_user');
            localStorage.removeItem('mizan_auth_token');
            router.push('/login');
            return;
          }
        } catch (verifyError) {
          logger.error('Backend verification error:', verifyError);
          // Continue anyway - offline support
        }

        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        localStorage.removeItem('mizan_user');
        localStorage.removeItem('mizan_auth_token');
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
      icon: <RefreshCw className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin']
    },
    {
      id: 'framework',
      label: 'Strategic Framework',
      icon: <Building2 className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin']
    },
    {
      id: 'assessment',
      label: 'Skills Assessment',
      icon: <ClipboardList className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin', 'manager', 'employee']
    },
    {
      id: 'department',
      label: 'Department Analysis',
      icon: <Users className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin', 'manager']
    },
    {
      id: 'organization',
      label: 'Organization Analysis',
      icon: <Target className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin']
    },
    {
      id: 'gaps',
      label: 'Gap Analysis',
      icon: <BarChart3 className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin', 'manager', 'employee']
    },
    {
      id: 'progress',
      label: 'Progress Tracking',
      icon: <TrendingUp className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin', 'manager', 'employee']
    },
    {
      id: 'reporting',
      label: 'Reports & Insights',
      icon: <FileText className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin', 'manager']
    },
    {
      id: 'bot',
      label: 'Skills Assistant',
      icon: <Bot className="w-5 h-5" />,
      roles: ['superadmin', 'clientAdmin', 'manager', 'employee']
    }
  ].filter(tab => tab.roles.includes(userRole));

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SkillsAnalysisDashboard userRole={userRole} onNavigateToTab={setActiveTab} />;
      case 'workflow':
        return <SkillsWorkflowManager userRole={userRole} />;
      case 'framework':
        return <StrategicFrameworkManager userRole={userRole} />;
      case 'assessment':
        return <IndividualSkillsAssessment userRole={userRole} />;
      case 'department':
        return <DepartmentAnalysis userRole={userRole} />;
      case 'organization':
        return <OrganizationAnalysis userRole={userRole} />;
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
