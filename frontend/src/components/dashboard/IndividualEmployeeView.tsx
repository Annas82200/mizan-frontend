'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, TrendingUp, TrendingDown, Minus, Heart, Target, Lightbulb, AlertCircle, Loader2 } from 'lucide-react';

interface IndividualEmployeeViewProps {
  tenantId: string;
  tenantName: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  department?: string;
  role?: string;
  hasCompletedSurvey: boolean;
}

interface EmployeeAnalysis {
  employeeId: string;
  employeeName: string;
  personalValuesInterpretation: {
    strengths: string[];
    limitingFactors: string[];
    meaning: string;
  };
  alignmentAnalysis: {
    personalVsCurrent: {
      gap: number;
      interpretation: string;
      retentionRisk: 'low' | 'medium' | 'high';
    };
    personalVsDesired: {
      gap: number;
      interpretation: string;
      growthOpportunities: string[];
    };
  };
  engagementAnalysis: {
    score: number;
    interpretation: string;
    factors: string[];
  };
  recognitionAnalysis: {
    score: number;
    interpretation: string;
    impact: string;
  };
  recommendations: Array<{
    category: string;
    title: string;
    description: string;
    actionItems: string[];
  }>;
}

export function IndividualEmployeeView({ tenantId, tenantName }: IndividualEmployeeViewProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [analysis, setAnalysis] = useState<EmployeeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, [tenantId]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/culture-assessment/employees?tenantId=${tenantId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load employees');
      }

      const data = await response.json();
      setEmployees(data.employees || []);
    } catch (err: any) {
      console.error('Load employees error:', err);
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const analyzeEmployee = async (employee: Employee) => {
    try {
      setAnalyzing(true);
      setError(null);
      setSelectedEmployee(employee);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyses/culture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
        },
        body: JSON.stringify({
          tenantId,
          targetType: 'individual',
          targetId: employee.id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze employee');
      }

      const analysisData = await response.json();
      setAnalysis(analysisData);
    } catch (err: any) {
      console.error('Employee analysis error:', err);
      setError(err.message || 'Failed to analyze employee');
    } finally {
      setAnalyzing(false);
    }
  };

  const getRetentionRiskColor = (risk: 'low' | 'medium' | 'high') => {
    switch (risk) {
      case 'low': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'medium': return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'high': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-6 h-6 text-mizan-gold" />
          <h2 className="text-2xl font-bold font-display text-mizan-primary">Individual Employee Analysis</h2>
        </div>
        <p className="text-mizan-secondary">
          View detailed culture analysis and personalized recommendations for each employee at <span className="font-semibold text-mizan-primary">{tenantName}</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Employee List */}
        <div className="col-span-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold font-display text-mizan-primary mb-4">Employees</h3>

            {/* Search */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-mizan-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search employees..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
              />
            </div>

            {/* Employee List */}
            {loading ? (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 text-mizan-gold animate-spin mx-auto mb-2" />
                <p className="text-sm text-mizan-secondary">Loading employees...</p>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-mizan-secondary/30 mx-auto mb-2" />
                <p className="text-sm text-mizan-secondary">No employees found</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredEmployees.map((employee) => (
                  <button
                    key={employee.id}
                    onClick={() => analyzeEmployee(employee)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-400 hover:shadow-md ${
                      selectedEmployee?.id === employee.id
                        ? 'bg-mizan-gold/10 border-mizan-gold'
                        : 'bg-white border-gray-200 hover:border-mizan-gold/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-mizan-primary">{employee.name}</p>
                        <p className="text-sm text-mizan-secondary">{employee.email}</p>
                        {employee.department && (
                          <p className="text-xs text-mizan-secondary mt-1">{employee.department}</p>
                        )}
                      </div>
                      {employee.hasCompletedSurvey ? (
                        <span className="flex-shrink-0 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Completed
                        </span>
                      ) : (
                        <span className="flex-shrink-0 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="col-span-8">
          {!selectedEmployee ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
              <Target className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-display text-mizan-primary mb-2">
                Select an Employee
              </h3>
              <p className="text-mizan-secondary">
                Choose an employee from the list to view their individual culture analysis
              </p>
            </div>
          ) : analyzing ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
              <Loader2 className="w-12 h-12 text-mizan-gold animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-display text-mizan-primary mb-2">
                Analyzing {selectedEmployee.name}...
              </h3>
              <p className="text-mizan-secondary">
                Running deep cultural analysis with the Mizan 7-Cylinder Framework
              </p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-display text-mizan-primary mb-2">
                Analysis Error
              </h3>
              <p className="text-mizan-secondary mb-4">{error}</p>
              <button
                onClick={() => selectedEmployee && analyzeEmployee(selectedEmployee)}
                className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 font-medium shadow-md"
              >
                Try Again
              </button>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 rounded-2xl p-6 border border-mizan-gold/20">
                <h3 className="text-2xl font-bold font-display text-mizan-primary mb-1">
                  {analysis.employeeName}
                </h3>
                <p className="text-mizan-secondary">Individual Culture Analysis</p>
              </div>

              {/* Personal Values Interpretation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="w-5 h-5 text-mizan-gold" />
                  <h4 className="text-lg font-semibold font-display text-mizan-primary">Personal Values</h4>
                </div>
                <p className="text-sm text-mizan-secondary mb-4">{analysis.personalValuesInterpretation.meaning}</p>

                {analysis.personalValuesInterpretation.strengths.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-green-700 mb-2">✓ Strengths</p>
                    <ul className="space-y-1">
                      {analysis.personalValuesInterpretation.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-mizan-secondary flex items-start space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.personalValuesInterpretation.limitingFactors.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-orange-700 mb-2">⚠ What Might Be Holding Them Back</p>
                    <ul className="space-y-1">
                      {analysis.personalValuesInterpretation.limitingFactors.map((factor, idx) => (
                        <li key={idx} className="text-sm text-mizan-secondary flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Alignment Analysis */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold font-display text-mizan-primary mb-4">Alignment & Gaps</h4>

                <div className="space-y-4">
                  {/* Personal vs Current */}
                  <div className={`p-4 rounded-xl border-2 ${getRetentionRiskColor(analysis.alignmentAnalysis.personalVsCurrent.retentionRisk).bg} ${getRetentionRiskColor(analysis.alignmentAnalysis.personalVsCurrent.retentionRisk).border}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-mizan-primary text-sm">Personal Values vs Current Experience</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRetentionRiskColor(analysis.alignmentAnalysis.personalVsCurrent.retentionRisk).bg} ${getRetentionRiskColor(analysis.alignmentAnalysis.personalVsCurrent.retentionRisk).text}`}>
                        {analysis.alignmentAnalysis.personalVsCurrent.retentionRisk.toUpperCase()} RETENTION RISK
                      </span>
                    </div>
                    <p className="text-sm text-mizan-secondary">{analysis.alignmentAnalysis.personalVsCurrent.interpretation}</p>
                  </div>

                  {/* Personal vs Desired */}
                  <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                    <p className="font-semibold text-mizan-primary text-sm mb-2">Personal Values vs Desired Future</p>
                    <p className="text-sm text-mizan-secondary mb-3">{analysis.alignmentAnalysis.personalVsDesired.interpretation}</p>
                    {analysis.alignmentAnalysis.personalVsDesired.growthOpportunities.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-blue-700 mb-1">Growth Opportunities:</p>
                        <ul className="space-y-1">
                          {analysis.alignmentAnalysis.personalVsDesired.growthOpportunities.map((opp, idx) => (
                            <li key={idx} className="text-xs text-blue-700">• {opp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Engagement & Recognition */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <p className="text-sm text-mizan-secondary mb-2">Engagement Score</p>
                  <p className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.engagementAnalysis.score)}`}>
                    {analysis.engagementAnalysis.score}/5
                  </p>
                  <p className="text-sm text-mizan-secondary mb-3">{analysis.engagementAnalysis.interpretation}</p>
                  {analysis.engagementAnalysis.factors.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-mizan-primary mb-1">Key Factors:</p>
                      <ul className="space-y-1">
                        {analysis.engagementAnalysis.factors.map((factor, idx) => (
                          <li key={idx} className="text-xs text-mizan-secondary">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <p className="text-sm text-mizan-secondary mb-2">Recognition Score</p>
                  <p className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.recognitionAnalysis.score)}`}>
                    {analysis.recognitionAnalysis.score}/5
                  </p>
                  <p className="text-sm text-mizan-secondary mb-3">{analysis.recognitionAnalysis.interpretation}</p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-purple-700 mb-1">Impact:</p>
                    <p className="text-xs text-purple-700">{analysis.recognitionAnalysis.impact}</p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-mizan-gold" />
                  <h4 className="text-lg font-semibold font-display text-mizan-primary">Personalized Recommendations</h4>
                </div>
                <div className="space-y-4">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start space-x-2 mb-2">
                        <span className="px-2 py-1 bg-mizan-gold/20 text-mizan-gold text-xs font-medium rounded">
                          {rec.category}
                        </span>
                      </div>
                      <h5 className="font-semibold text-mizan-primary mb-2">{rec.title}</h5>
                      <p className="text-sm text-mizan-secondary mb-3">{rec.description}</p>
                      {rec.actionItems.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-mizan-primary mb-1">Action Items:</p>
                          <ul className="space-y-1">
                            {rec.actionItems.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-xs text-mizan-secondary">✓ {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
