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

interface SuperadminSkillsPageProps {}

/**
 * Superadmin Skills Management Page
 * ✅ PRODUCTION-READY: Complete Skills Analysis Interface with full feature access
 * Three-Engine Architecture + Interactive BOT System
 */
export default function SuperadminSkillsPage({}: SuperadminSkillsPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('superadmin');
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
          console.error('Invalid user data in localStorage:', parseError);
          localStorage.removeItem('mizan_user');
          localStorage.removeItem('mizan_auth_token');
          router.push('/login');
          return;
        }

        setUserRole(user.role || 'superadmin');
        setUserName(user.name || 'Admin');

        // Step 3: Superadmin-only access control
        if (user.role !== 'superadmin') {
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
            console.error('Backend authentication verification failed');
            localStorage.removeItem('mizan_user');
            localStorage.removeItem('mizan_auth_token');
            router.push('/login');
            return;
          }

          // Verify superadmin role from backend
          const data = await response.json();
          if (data.role !== 'superadmin') {
            console.error('User is not a superadmin');
            router.push('/dashboard');
            return;
          }
        } catch (verifyError) {
          console.error('Backend verification error:', verifyError);
          // Continue anyway - offline support
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
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
      description: 'Overview and insights'
    },
    {
      id: 'workflow',
      label: 'Analysis Workflow',
      icon: <span className="text-lg">🔄</span>,
      description: 'Manage analysis workflows'
    },
    {
      id: 'framework',
      label: 'Strategic Framework',
      icon: <span className="text-lg">🏗️</span>,
      description: 'Define skills frameworks'
    },
    {
      id: 'assessment',
      label: 'Skills Assessment',
      icon: <span className="text-lg">📋</span>,
      description: 'Employee skills profiles'
    },
    {
      id: 'gaps',
      label: 'Gap Analysis',
      icon: <span className="text-lg">📊</span>,
      description: 'Identify skills gaps'
    },
    {
      id: 'progress',
      label: 'Progress Tracking',
      icon: <span className="text-lg">📈</span>,
      description: 'Track skill development'
    },
    {
      id: 'reporting',
      label: 'Reports & Insights',
      icon: <span className="text-lg">📑</span>,
      description: 'Generate comprehensive reports'
    },
    {
      id: 'bot',
      label: 'Skills Assistant',
      icon: <span className="text-lg">🤖</span>,
      description: 'AI-powered skills assistant'
    }
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">Skills Management</h1>
                <p className="text-sm text-gray-600">
                  Platform-wide Skills Analysis & Development
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
                title={tab.description}
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
            <p>Superadmin Skills Management - Platform-wide Skills Analysis & Development</p>
            <p className="mt-1">
              Powered by Three-Engine AI Architecture + Interactive BOT System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
