"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { 
  User, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface EmployeeDashboardData {
  profile: {
    name: string;
    role: string;
    department: string;
    startDate: string;
  };
  assessments: {
    culture: { completed: boolean; score?: number; lastTaken?: string };
    skills: { completed: boolean; score?: number; lastTaken?: string };
    engagement: { completed: boolean; score?: number; lastTaken?: string };
  };
  recommendations: Array<{
    title: string;
    type: 'learning' | 'development' | 'culture';
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
  }>;
  learningProgress: {
    completedModules: number;
    totalModules: number;
    currentPath: string;
  };
  upcomingEvents: Array<{
    title: string;
    date: string;
    type: 'training' | 'meeting' | 'assessment';
  }>;
}

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<EmployeeDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setDashboardData({
        profile: {
          name: user?.name || 'John Doe',
          role: 'Senior Software Engineer',
          department: 'Engineering',
          startDate: '2022-03-15'
        },
        assessments: {
          culture: { completed: true, score: 78, lastTaken: '2024-01-15' },
          skills: { completed: false },
          engagement: { completed: true, score: 82, lastTaken: '2024-01-20' }
        },
        recommendations: [
          { title: 'Complete Leadership Fundamentals Course', type: 'learning', priority: 'high', dueDate: '2024-02-15' },
          { title: 'Improve Cross-Team Collaboration', type: 'development', priority: 'medium' },
          { title: 'Participate in Culture Building Activities', type: 'culture', priority: 'low' }
        ],
        learningProgress: {
          completedModules: 8,
          totalModules: 12,
          currentPath: 'Technical Leadership Track'
        },
        upcomingEvents: [
          { title: 'Quarterly Skills Assessment', date: '2024-02-10', type: 'assessment' },
          { title: 'Team Building Workshop', date: '2024-02-12', type: 'training' },
          { title: '1:1 with Manager', date: '2024-02-14', type: 'meeting' }
        ]
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  const getAssessmentStatus = (assessment: any) => {
    if (!assessment.completed) {
      return { icon: Clock, color: 'text-yellow-500', text: 'Pending' };
    }
    if (assessment.score && assessment.score >= 80) {
      return { icon: CheckCircle, color: 'text-green-500', text: 'Excellent' };
    }
    if (assessment.score && assessment.score >= 60) {
      return { icon: CheckCircle, color: 'text-blue-500', text: 'Good' };
    }
    return { icon: AlertCircle, color: 'text-orange-500', text: 'Needs Improvement' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mizan-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-mizan-teal rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-mizan-dark">Mizan</span>
              <span className="ml-4 text-sm text-gray-500">Employee Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back, {dashboardData?.profile.name}</span>
              <div className="w-8 h-8 bg-mizan-gold rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {dashboardData?.profile.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Overview */}
        <div className="mizan-card mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-mizan-teal rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-mizan-dark">{dashboardData?.profile.name}</h1>
                <p className="text-gray-600">{dashboardData?.profile.role}</p>
                <p className="text-sm text-gray-500">{dashboardData?.profile.department} • Started {new Date(dashboardData?.profile.startDate || '').toLocaleDateString()}</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '/employee/profile'}
              className="mizan-button-secondary"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Assessment Status */}
        <div className="mizan-card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-mizan-dark">Assessment Status</h2>
            <button 
              onClick={() => window.location.href = '/employee/assessments'}
              className="text-mizan-teal hover:text-mizan-dark font-medium text-sm flex items-center"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(dashboardData?.assessments || {}).map(([key, assessment]) => {
              const status = getAssessmentStatus(assessment);
              const StatusIcon = status.icon;
              
              return (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 capitalize">{key} Assessment</h3>
                    <StatusIcon className={`w-5 h-5 ${status.color}`} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={status.color}>{status.text}</span>
                    </div>
                    {assessment.score && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Score:</span>
                        <span className="font-medium">{assessment.score}%</span>
                      </div>
                    )}
                    {assessment.lastTaken && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Taken:</span>
                        <span>{new Date(assessment.lastTaken).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  {!assessment.completed && (
                    <button 
                      onClick={() => window.location.href = `/employee/survey?type=${key}`}
                      className="w-full mt-3 mizan-button-primary text-sm"
                    >
                      Take Assessment
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Progress & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Learning Progress */}
          <div className="mizan-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-mizan-dark">Learning Progress</h3>
              <BookOpen className="w-5 h-5 text-mizan-teal" />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Current Path:</span>
                <span className="font-medium">{dashboardData?.learningProgress.currentPath}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress:</span>
                <span className="font-medium">
                  {dashboardData?.learningProgress.completedModules} / {dashboardData?.learningProgress.totalModules} modules
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-mizan-teal h-2 rounded-full" 
                  style={{ 
                    width: `${((dashboardData?.learningProgress.completedModules || 0) / (dashboardData?.learningProgress.totalModules || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <button 
              onClick={() => window.location.href = '/employee/learning'}
              className="w-full mizan-button-secondary"
            >
              Continue Learning
            </button>
          </div>

          {/* Recommendations */}
          <div className="mizan-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-mizan-dark">Recommendations</h3>
              <Target className="w-5 h-5 text-mizan-teal" />
            </div>
            
            <div className="space-y-3">
              {dashboardData?.recommendations.slice(0, 3).map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{rec.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.type === 'learning' ? 'bg-blue-100 text-blue-800' :
                      rec.type === 'development' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.type}
                    </span>
                    {rec.dueDate && (
                      <span className="text-xs text-gray-500">
                        Due: {new Date(rec.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => window.location.href = '/employee/recommendations'}
              className="w-full mt-4 text-mizan-teal hover:text-mizan-dark font-medium text-sm"
            >
              View All Recommendations
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mizan-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-mizan-dark">Upcoming Events</h3>
            <Calendar className="w-5 h-5 text-mizan-teal" />
          </div>
          
          <div className="space-y-3">
            {dashboardData?.upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    event.type === 'training' ? 'bg-blue-500' :
                    event.type === 'assessment' ? 'bg-orange-500' :
                    'bg-green-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600 capitalize">{event.type}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => window.location.href = '/employee/calendar'}
            className="w-full mt-4 text-mizan-teal hover:text-mizan-dark font-medium text-sm"
          >
            View Full Calendar
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Take Survey', href: '/employee/survey', icon: Target, color: 'bg-blue-500' },
            { name: 'View Reports', href: '/employee/reports', icon: TrendingUp, color: 'bg-green-500' },
            { name: 'Learning Hub', href: '/employee/learning', icon: BookOpen, color: 'bg-purple-500' },
            { name: 'Achievements', href: '/employee/achievements', icon: Award, color: 'bg-orange-500' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => window.location.href = item.href}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-mizan-teal transition-colors text-left"
            >
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium text-gray-900">{item.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
