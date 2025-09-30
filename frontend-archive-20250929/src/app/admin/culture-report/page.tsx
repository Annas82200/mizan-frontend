"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Users, AlertTriangle, CheckCircle, TrendingUp, Target } from 'lucide-react';

export default function AdminCultureReportPage() {
  const [adminReport, setAdminReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        // Sample admin report based on aggregated employee responses
        const sampleAdminReport = {
          organizationalOverview: {
            totalResponses: 45,
            responseRate: '85%',
            analysisCompleteness: 'High'
          },
          valuesAlignment: {
            companyValues: ['Innovation', 'Trust', 'Excellence'],
            employeeValues: ['Trust', 'Learning', 'Innovation', 'Accountability', 'Respect'],
            alignmentScore: 78,
            gaps: ['Recognition', 'Autonomy', 'Wellbeing']
          },
          cultureHealth: {
            overallHealth: 74,
            cylinderHealth: {
              'Safety & Survival': { score: 68, status: 'Moderate', trend: 'Stable' },
              'Belonging & Loyalty': { score: 82, status: 'Healthy', trend: 'Improving' },
              'Growth & Achievement': { score: 75, status: 'Healthy', trend: 'Improving' },
              'Meaning & Contribution': { score: 79, status: 'Healthy', trend: 'Stable' },
              'Integrity & Justice': { score: 65, status: 'Needs Attention', trend: 'Declining' },
              'Wisdom & Compassion': { score: 71, status: 'Moderate', trend: 'Stable' },
              'Transcendence & Unity': { score: 77, status: 'Healthy', trend: 'Improving' }
            },
            entropyLevel: 28,
            riskAreas: ['Autonomy', 'Recognition', 'Work-Life Balance']
          },
          strategyAlignment: {
            cultureSupportsStrategy: true,
            alignmentScore: 78,
            recommendations: [
              'Strengthen autonomy practices to support innovation strategy',
              'Improve recognition systems to retain high performers',
              'Address wellbeing concerns to maintain productivity'
            ]
          },
          departmentAnalysis: {
            'Engineering': { score: 79, strengths: ['Innovation', 'Learning'], challenges: ['Recognition'] },
            'Product': { score: 74, strengths: ['Collaboration', 'Purpose'], challenges: ['Autonomy'] },
            'Sales': { score: 71, strengths: ['Achievement', 'Trust'], challenges: ['Wellbeing', 'Recognition'] }
          },
          actionItems: [
            {
              priority: 'High',
              action: 'Implement peer recognition program',
              timeline: '30 days',
              owner: 'HR Leadership',
              expectedImpact: 'Improve recognition scores by 15-20%'
            },
            {
              priority: 'High', 
              action: 'Increase decision-making autonomy',
              timeline: '60 days',
              owner: 'Management Team',
              expectedImpact: 'Improve autonomy scores by 10-15%'
            },
            {
              priority: 'Medium',
              action: 'Launch wellbeing initiatives',
              timeline: '90 days',
              owner: 'People Operations',
              expectedImpact: 'Improve overall culture health by 8-12%'
            }
          ]
        };
        
        setAdminReport(sampleAdminReport);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load admin report:', error);
        setLoading(false);
      }
    };
    
    loadReport();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600 font-light">Generating organizational culture report...</p>
        </div>
      </div>
    );
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'Healthy': return 'text-green-600';
      case 'Moderate': return 'text-amber-500';
      case 'Needs Attention': return 'text-red-500';
      default: return 'text-slate-600';
    }
  };

  const getHealthBg = (status: string) => {
    switch (status) {
      case 'Healthy': return 'bg-green-100';
      case 'Moderate': return 'bg-amber-100';
      case 'Needs Attention': return 'bg-red-100';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/companies" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Admin Culture Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
            <Link href="/companies/demo" className="bg-slate-900 text-white px-6 py-2 rounded-xl font-light">New Analysis</Link>
          </div>
        </div>
      </nav>

      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-light text-slate-900 mb-4">Organizational Culture Analysis</h1>
            <p className="text-xl text-slate-600 font-light">
              Comprehensive insights from {adminReport.organizationalOverview.totalResponses} employee responses
            </p>
          </div>

          {/* Overview Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="text-3xl font-light text-blue-600 mb-2">{adminReport.cultureHealth.overallHealth}</div>
              <div className="text-slate-600 font-light">Overall Culture Health</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="text-3xl font-light text-amber-500 mb-2">{adminReport.cultureHealth.entropyLevel}</div>
              <div className="text-slate-600 font-light">Entropy Score</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="text-3xl font-light text-green-600 mb-2">{adminReport.valuesAlignment.alignmentScore}%</div>
              <div className="text-slate-600 font-light">Values Alignment</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="text-3xl font-light text-slate-700 mb-2">{adminReport.organizationalOverview.responseRate}</div>
              <div className="text-slate-600 font-light">Response Rate</div>
            </div>
          </div>

          {/* 7-Cylinders Health Dashboard */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12">
            <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">7-Cylinders Health Dashboard</h2>
            
            <div className="space-y-4">
              {Object.entries(adminReport.cultureHealth.cylinderHealth).map(([cylinder, data]: [string, any]) => (
                <div key={cylinder} className="flex items-center space-x-6 p-4 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="w-40 text-right">
                    <div className="font-medium text-slate-900">{cylinder}</div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-amber-500 rounded-full transition-all duration-1000"
                        style={{ width: `${data.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-20 text-center">
                    <div className="font-medium text-slate-900">{data.score}</div>
                  </div>
                  <div className="w-32 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getHealthBg(data.status)} ${getHealthColor(data.status)}`}>
                      {data.status}
                    </span>
                  </div>
                  <div className="w-24 text-center">
                    <span className="text-sm text-slate-600 font-light">{data.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Alignment */}
          <div className="bg-slate-900 rounded-3xl p-12">
            <h2 className="text-3xl font-light text-white mb-8 text-center">Strategy Alignment Analysis</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Culture Supports Strategy</h3>
                <div className={`text-6xl font-light mb-4 ${adminReport.strategyAlignment.cultureSupportsStrategy ? 'text-green-400' : 'text-red-400'}`}>
                  {adminReport.strategyAlignment.cultureSupportsStrategy ? '✓' : '✗'}
                </div>
                <p className="text-slate-300 font-light">
                  Alignment Score: {adminReport.strategyAlignment.alignmentScore}%
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-white mb-6">Strategic Recommendations</h3>
                <ul className="space-y-3">
                  {adminReport.strategyAlignment.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-slate-300 font-light leading-relaxed">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12">
            <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">Priority Action Items</h2>
            
            <div className="space-y-6">
              {adminReport.actionItems.map((item: any, index: number) => (
                <div key={index} className="border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                          item.priority === 'High' ? 'bg-red-500' :
                          item.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                        }`}></span>
                        <span className="font-medium text-slate-900">{item.action}</span>
                      </div>
                      <p className="text-slate-600 font-light mb-2">{item.expectedImpact}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500 font-light">{item.timeline}</div>
                      <div className="text-sm text-slate-700 font-medium">{item.owner}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

