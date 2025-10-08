"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Building2, 
  Users, 
  CheckCircle, 
  XCircle, 
  Loader2,
  ArrowRight,
  Activity
} from 'lucide-react';

interface TestResult {
  service: string;
  status: 'pending' | 'success' | 'error';
  response?: any;
  error?: string;
  duration?: number;
}

export default function TestAllServicesPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const testServices = async () => {
    setIsRunning(true);
    setResults([]);

    const services = [
      {
        name: 'Culture Analysis',
        endpoint: '/api/entry/analyze-culture',
        payload: {
          orgName: 'Test Company',
          industry: 'Technology',
          companyValues: ['Innovation', 'Collaboration', 'Excellence', 'Growth', 'Trust'],
          companyVision: 'To transform how organizations operate through AI-powered insights',
          companyMission: 'Empowering organizations with ethical AI-driven organizational intelligence',
          companyStrategy: 'Build innovative software products that transform how businesses operate and scale globally',
          employeeResponses: [
            {
              personalValues: ['Innovation', 'Collaboration', 'Growth'],
              currentExperience: ['Collaboration', 'Excellence', 'Trust'],
              desiredCulture: ['Innovation', 'Growth', 'Excellence'],
              recognition: 7,
              engagement: 8
            }
          ]
        }
      },
      {
        name: 'Structure Analysis',
        endpoint: '/api/entry/analyze-org',
        payload: {
          orgName: 'Test Company',
          industry: 'Technology',
          strategy: 'Build innovative software products that transform how businesses operate and scale globally',
          vision: 'To transform how organizations operate through AI-powered insights',
          mission: 'Empowering organizations with ethical AI-driven organizational intelligence',
          values: ['Innovation', 'Collaboration', 'Excellence'],
          departments: [
            { id: 'eng', name: 'Engineering', headCount: 25, manager: 'John Smith' },
            { id: 'prod', name: 'Product', headCount: 12, manager: 'Sarah Johnson' },
            { id: 'sales', name: 'Sales', headCount: 18, manager: 'Mike Chen' }
          ],
          roles: [
            { id: 'cto', title: 'CTO', department: 'eng', level: 1, responsibilities: ['Technical Strategy', 'Team Leadership'] },
            { id: 'eng_mgr', title: 'Engineering Manager', department: 'eng', level: 2, responsibilities: ['Team Management', 'Technical Oversight'] },
            { id: 'prod_mgr', title: 'Product Manager', department: 'prod', level: 2, responsibilities: ['Product Strategy', 'Feature Planning'] }
          ]
        }
        },
        {
          name: 'Engagement Analysis',
          endpoint: '/api/entry/analyze-engagement',
          payload: {
            orgName: 'Test Company',
            industry: 'Technology',
            departments: [
              { id: 'eng', name: 'Engineering', headCount: 50, manager: 'Alice Smith' },
              { id: 'prod', name: 'Product', headCount: 20, manager: 'Bob Johnson' },
              { id: 'sales', name: 'Sales', headCount: 30, manager: 'Charlie Brown' }
            ],
            roles: [
              { id: 'dev', title: 'Software Engineer', department: 'eng', level: 3 },
              { id: 'pm', title: 'Product Manager', department: 'prod', level: 4 },
              { id: 'qa', title: 'QA Engineer', department: 'eng', level: 2 }
            ],
            employeeResponses: [
              {
                employeeId: 'emp1',
                satisfaction: 8,
                motivation: 7,
                workLifeBalance: 6,
                careerDevelopment: 7,
                recognition: 5
              }
            ],
            engagementSurveys: [
              {
                employeeId: 'emp1',
                overallSatisfaction: 8,
                motivation: 7,
                retention: 9,
                advocacy: 8,
                managerRelationship: 8,
                workload: 6,
                compensation: 7
              }
            ],
            performanceMetrics: [
              {
                employeeId: 'emp1',
                productivity: 85,
                quality: 90,
                innovation: 80,
                collaboration: 88
              }
            ]
          }
        },
        {
          name: 'Skills Analysis',
          endpoint: '/api/entry/analyze-skills',
        payload: {
          orgName: 'Test Company',
          industry: 'Technology',
          strategy: 'Build innovative software products that transform how businesses operate and scale globally',
          vision: 'To transform how organizations operate through AI-powered insights',
          mission: 'Empowering organizations with ethical AI-driven organizational intelligence',
          values: ['Innovation', 'Collaboration', 'Excellence'],
          departments: [
            { id: 'eng', name: 'Engineering', headCount: 25, manager: 'John Smith' },
            { id: 'prod', name: 'Product', headCount: 12, manager: 'Sarah Johnson' },
            { id: 'sales', name: 'Sales', headCount: 18, manager: 'Mike Chen' }
          ],
          roles: [
            { id: 'cto', title: 'CTO', department: 'eng', level: 1, responsibilities: ['Technical Strategy', 'Team Leadership'] },
            { id: 'eng_mgr', title: 'Engineering Manager', department: 'eng', level: 2, responsibilities: ['Team Management', 'Technical Oversight'] },
            { id: 'prod_mgr', title: 'Product Manager', department: 'prod', level: 2, responsibilities: ['Product Strategy', 'Feature Planning'] }
          ],
          employeeProfiles: [
            {
              name: 'John Smith',
              role: 'CTO',
              skills: [
                { name: 'Software Architecture', level: 'expert' },
                { name: 'Team Leadership', level: 'advanced' },
                { name: 'Strategic Planning', level: 'advanced' }
              ]
            },
            {
              name: 'Sarah Johnson',
              role: 'Product Manager',
              skills: [
                { name: 'Product Strategy', level: 'advanced' },
                { name: 'User Research', level: 'intermediate' },
                { name: 'Data Analysis', level: 'intermediate' }
              ]
            },
            {
              name: 'Mike Chen',
              role: 'Sales Manager',
              skills: [
                { name: 'Sales Strategy', level: 'advanced' },
                { name: 'Client Relations', level: 'expert' },
                { name: 'Market Analysis', level: 'intermediate' }
              ]
            }
          ]
        }
      }
    ];

    for (const service of services) {
      const startTime = Date.now();
      
      // Add pending result
      setResults(prev => [...prev, {
        service: service.name,
        status: 'pending'
      }]);

      try {
        const response = await fetch(service.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(service.payload)
        });

        const duration = Date.now() - startTime;

        if (response.ok) {
          const data = await response.json();
          setResults(prev => prev.map(r => 
            r.service === service.name 
              ? { ...r, status: 'success', response: data, duration }
              : r
          ));
        } else {
          const errorText = await response.text();
          setResults(prev => prev.map(r => 
            r.service === service.name 
              ? { ...r, status: 'error', error: `HTTP ${response.status}: ${errorText}`, duration }
              : r
          ));
        }
      } catch (error) {
        const duration = Date.now() - startTime;
        setResults(prev => prev.map(r => 
          r.service === service.name 
            ? { ...r, status: 'error', error: error instanceof Error ? error.message : 'Unknown error', duration }
            : r
        ));
      }

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Testing...</Badge>;
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'Culture Analysis':
        return <Brain className="w-6 h-6" />;
      case 'Structure Analysis':
        return <Building2 className="w-6 h-6" />;
      case 'Skills Analysis':
        return <Users className="w-6 h-6" />;
      default:
        return <Activity className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-slate-900 mb-4">
            Mizan Platform Service Testing
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto">
            Comprehensive testing of all three AI analysis services on the deployed platform
          </p>
        </div>

        <div className="text-center mb-8">
          <Button 
            onClick={testServices} 
            disabled={isRunning}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Testing Services...
              </>
            ) : (
              <>
                <Activity className="w-5 h-5 mr-2" />
                Test All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6">
          {results.map((result, index) => (
            <Card key={index} className="border border-slate-200 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    {getServiceIcon(result.service)}
                    <CardTitle className="text-xl font-medium text-slate-900">
                      {result.service}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-3">
                    {result.duration && (
                      <span className="text-sm text-slate-500">
                        {result.duration}ms
                      </span>
                    )}
                    {getStatusBadge(result.status)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {result.status === 'success' && result.response && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">✅ Analysis Completed Successfully</h4>
                      <div className="text-sm text-green-800 space-y-1">
                        <p><strong>Organization:</strong> {result.response.analysis?.organizationName || 'N/A'}</p>
                        <p><strong>Analysis Date:</strong> {result.response.analysis?.analysisDate ? new Date(result.response.analysis.analysisDate).toLocaleString() : 'N/A'}</p>
                        <p><strong>Execution Time:</strong> {result.response.analysis?.executionTime || 'N/A'}ms</p>
                        {result.response.analysis?.overallScore && (
                          <p><strong>Overall Score:</strong> {result.response.analysis.overallScore}/100</p>
                        )}
                      </div>
                    </div>
                    
                    {result.service === 'Culture Analysis' && result.response.analysis?.valueMapping && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">📊 Value Mapping Results</h4>
                        <div className="text-sm text-blue-800">
                          <p><strong>Mapping Rate:</strong> {result.response.analysis.valueMapping.summary?.mappingRate || 0}%</p>
                          <p><strong>Mapped Values:</strong> {result.response.analysis.valueMapping.summary?.mapped || 0}</p>
                          <p><strong>Unmapped Values:</strong> {result.response.analysis.valueMapping.summary?.unmapped || 0}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {result.status === 'error' && result.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">❌ Error Occurred</h4>
                    <p className="text-sm text-red-800">{result.error}</p>
                  </div>
                )}
                
                {result.status === 'pending' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span className="text-sm text-blue-800">Testing service...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {results.length > 0 && (
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-slate-900 mb-4">Test Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.filter(r => r.status === 'success').length}
                  </div>
                  <div className="text-sm text-slate-600">Successful</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {results.filter(r => r.status === 'error').length}
                  </div>
                  <div className="text-sm text-slate-600">Failed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {results.filter(r => r.status === 'pending').length}
                  </div>
                  <div className="text-sm text-slate-600">Pending</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
