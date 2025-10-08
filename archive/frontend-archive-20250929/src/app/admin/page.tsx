"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { 
  Brain, 
  Users, 
  BarChart3, 
  Target, 
  Zap, 
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface DashboardMetrics {
  totalEmployees: number;
  cultureScore: number;
  structureHealth: number;
  skillsCoverage: number;
  engagementScore: number;
  activeRecommendations: number;
  pendingTriggers: number;
}

interface AgentStatus {
  name: string;
  icon: any;
  status: 'healthy' | 'warning' | 'error';
  lastRun: string;
  confidence: number;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      setMetrics({
        totalEmployees: 245,
        cultureScore: 78,
        structureHealth: 82,
        skillsCoverage: 74,
        engagementScore: 81,
        activeRecommendations: 12,
        pendingTriggers: 5
      });

      setAgentStatuses([
        { name: 'Culture Agent', icon: Users, status: 'healthy', lastRun: '2 hours ago', confidence: 0.89 },
        { name: 'Structure Agent', icon: Target, status: 'healthy', lastRun: '4 hours ago', confidence: 0.92 },
        { name: 'Skills Agent', icon: Brain, status: 'warning', lastRun: '1 day ago', confidence: 0.76 },
        { name: 'Performance Agent', icon: BarChart3, status: 'healthy', lastRun: '6 hours ago', confidence: 0.85 },
        { name: 'Engagement Agent', icon: Zap, status: 'healthy', lastRun: '3 hours ago', confidence: 0.88 },
        { name: 'Benchmarking Agent', icon: Shield, status: 'healthy', lastRun: '12 hours ago', confidence: 0.94 }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  const runAgentAnalysis = async (agentType: string) => {
    try {
      // Implement agent analysis trigger
      console.log(`Running ${agentType} analysis...`);
    } catch (error) {
      console.error(`Failed to run ${agentType} analysis:`, error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mizan-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-mizan-dark">Mizan</span>
              <span className="ml-4 text-sm text-gray-500">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <div className="w-8 h-8 bg-mizan-gold rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {user?.name?.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="metric-card">
            <div className="metric-value">{metrics?.totalEmployees}</div>
            <div className="metric-label">Total Employees</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metrics?.cultureScore}%</div>
            <div className="metric-label">Culture Health</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metrics?.structureHealth}%</div>
            <div className="metric-label">Structure Health</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">{metrics?.skillsCoverage}%</div>
            <div className="metric-label">Skills Coverage</div>
          </div>
        </div>

        {/* AI Agents Status */}
        <div className="mizan-card mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-mizan-dark">AI Agents Status</h2>
            <button 
              onClick={() => window.location.href = '/admin/agents'}
              className="text-mizan-teal hover:text-mizan-dark font-medium text-sm flex items-center"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentStatuses.map((agent, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-mizan-teal transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-mizan-teal rounded-lg flex items-center justify-center">
                      <agent.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="ml-2 font-medium text-gray-900">{agent.name}</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    agent.status === 'healthy' ? 'bg-green-500' :
                    agent.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Last Run:</span>
                    <span>{agent.lastRun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence:</span>
                    <span>{Math.round(agent.confidence * 100)}%</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => runAgentAnalysis(agent.name.toLowerCase().replace(' agent', ''))}
                  className="w-full mt-3 px-3 py-1 text-xs bg-mizan-teal text-white rounded hover:bg-mizan-dark transition-colors"
                >
                  Run Analysis
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Recommendations */}
          <div className="mizan-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-mizan-dark">Active Recommendations</h3>
              <span className="mizan-badge-info">{metrics?.activeRecommendations} active</span>
            </div>
            
            <div className="space-y-3">
              {[
                { title: 'Improve Team Collaboration', priority: 'high', agent: 'Culture Agent' },
                { title: 'Optimize Span of Control', priority: 'medium', agent: 'Structure Agent' },
                { title: 'Address Skills Gap in Data Science', priority: 'high', agent: 'Skills Agent' }
              ].map((rec, index) => (
                <div key={index} className={`recommendation-${rec.priority}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">From {rec.agent}</p>
                    </div>
                    <span className={`mizan-badge-${rec.priority === 'high' ? 'error' : rec.priority === 'medium' ? 'warning' : 'success'}`}>
                      {rec.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-mizan-teal hover:text-mizan-dark font-medium text-sm">
              View All Recommendations
            </button>
          </div>

          {/* Pending Triggers */}
          <div className="mizan-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-mizan-dark">Pending Triggers</h3>
              <span className="mizan-badge-warning">{metrics?.pendingTriggers} pending</span>
            </div>
            
            <div className="space-y-3">
              {[
                { action: 'LXP Assignment: Leadership Training', target: '12 employees', urgency: 'immediate' },
                { action: 'Alert: Low Engagement in Engineering', target: 'Engineering Dept', urgency: 'high' },
                { action: 'Intervention: Team Building Session', target: 'Marketing Team', urgency: 'medium' }
              ].map((trigger, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{trigger.action}</h4>
                      <p className="text-sm text-gray-600 mt-1">Target: {trigger.target}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      trigger.urgency === 'immediate' ? 'bg-red-100 text-red-800' :
                      trigger.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trigger.urgency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-mizan-teal hover:text-mizan-dark font-medium text-sm">
              Execute All Triggers
            </button>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Culture Analysis', href: '/admin/culture', icon: Users, color: 'bg-blue-500' },
            { name: 'Structure Review', href: '/admin/structure', icon: Target, color: 'bg-green-500' },
            { name: 'Skills Assessment', href: '/admin/skills', icon: Brain, color: 'bg-purple-500' },
            { name: 'Employee Management', href: '/admin/employees', icon: Users, color: 'bg-orange-500' }
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
