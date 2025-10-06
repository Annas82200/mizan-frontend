'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Loader2,
  BarChart3,
  Download,
  RefreshCw,
  UserPlus,
  FileText
} from 'lucide-react';
import { TenantSelector } from '@/components/dashboard';

interface Requisition {
  id: string;
  title: string;
  department: string;
  status: 'open' | 'in_progress' | 'filled' | 'cancelled';
  candidatesCount: number;
  daysOpen: number;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  stage: 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  cultureFitScore: number;
  skillsMatch: number;
}

interface HiringMetrics {
  timeToHire: number;
  costPerHire: number;
  offerAcceptanceRate: number;
  qualityOfHire: number;
}

interface HiringAnalysisOutput {
  overallHealth: number;
  requisitions: Requisition[];
  candidates: Candidate[];
  metrics: HiringMetrics;
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    actionItems: string[];
  }>;
}

interface Tenant {
  id: string;
  name: string;
}

export default function HiringAnalysisPage() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<HiringAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedTenant) {
      setError('Please select a client first');
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);

      // Mock data for now
      const mockResults: HiringAnalysisOutput = {
        overallHealth: 72,
        requisitions: [
          {
            id: '1',
            title: 'Senior Software Engineer',
            department: 'Engineering',
            status: 'in_progress',
            candidatesCount: 12,
            daysOpen: 25
          }
        ],
        candidates: [
          {
            id: '1',
            name: 'John Smith',
            position: 'Senior Software Engineer',
            stage: 'interview',
            cultureFitScore: 85,
            skillsMatch: 92
          }
        ],
        metrics: {
          timeToHire: 32,
          costPerHire: 5200,
          offerAcceptanceRate: 78,
          qualityOfHire: 82
        },
        recommendations: [
          {
            priority: 'high',
            title: 'Streamline Interview Process',
            description: 'Reduce time-to-hire by optimizing interview stages',
            actionItems: ['Consolidate interview rounds', 'Use AI-powered screening']
          }
        ]
      };

      setResults(mockResults);
    } catch (err: any) {
      console.error('Hiring analysis error:', err);
      setError(err.message || 'Failed to analyze hiring');
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'filled': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'screening': return 'bg-blue-100 text-blue-700';
      case 'interview': return 'bg-purple-100 text-purple-700';
      case 'offer': return 'bg-green-100 text-green-700';
      case 'hired': return 'bg-green-600 text-white';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold text-mizan-primary mb-2">Hiring Management</h1>
        <p className="text-mizan-secondary">
          Manage requisitions, track candidates, and analyze hiring pipeline
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <TenantSelector
          selectedTenantId={selectedTenant?.id || null}
          onSelectTenant={(id, tenant) => {
            setSelectedTenant(tenant);
            setResults(null);
            setError(null);
          }}
          label="Select Client"
          required
        />
      </div>

      {selectedTenant && !results && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900 mb-1">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full px-6 py-4 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl font-semibold"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Hiring Pipeline...</span>
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                <span>Run Hiring Analysis</span>
              </>
            )}
          </button>
        </div>
      )}

      {results && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-mizan-secondary text-sm font-medium mb-1">Hiring Health Score</p>
                <h2 className="text-5xl font-bold text-mizan-primary">{results.overallHealth}/100</h2>
              </div>
              <Briefcase className="w-16 h-16 text-mizan-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-mizan-primary">Time to Hire</h3>
                <Clock className="w-5 h-5 text-mizan-gold" />
              </div>
              <p className="text-3xl font-bold text-mizan-primary">{results.metrics.timeToHire}</p>
              <p className="text-xs text-mizan-secondary">days average</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-mizan-primary">Cost per Hire</h3>
                <FileText className="w-5 h-5 text-mizan-gold" />
              </div>
              <p className="text-3xl font-bold text-mizan-primary">${results.metrics.costPerHire}</p>
              <p className="text-xs text-mizan-secondary">average cost</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-mizan-primary">Offer Acceptance</h3>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{results.metrics.offerAcceptanceRate}%</p>
              <p className="text-xs text-mizan-secondary">acceptance rate</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-mizan-primary">Quality of Hire</h3>
                <Users className="w-5 h-5 text-mizan-primary" />
              </div>
              <p className="text-3xl font-bold text-mizan-primary">{results.metrics.qualityOfHire}%</p>
              <p className="text-xs text-mizan-secondary">performance score</p>
            </div>
          </div>

          {results.requisitions.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-mizan-primary mb-4">Active Requisitions</h3>
              <div className="space-y-3">
                {results.requisitions.map((req) => (
                  <div key={req.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-mizan-primary mb-1">{req.title}</h4>
                      <p className="text-sm text-mizan-secondary">{req.department} • {req.candidatesCount} candidates • {req.daysOpen} days open</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                      {req.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.candidates.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-mizan-primary mb-4">Top Candidates</h3>
              <div className="space-y-3">
                {results.candidates.map((candidate) => (
                  <div key={candidate.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-mizan-primary">{candidate.name}</h4>
                        <p className="text-sm text-mizan-secondary">{candidate.position}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(candidate.stage)}`}>
                        {candidate.stage.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-mizan-secondary mb-1">Culture Fit</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${candidate.cultureFitScore}%` }} />
                          </div>
                          <span className="text-xs font-bold text-green-600">{candidate.cultureFitScore}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-mizan-secondary mb-1">Skills Match</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${candidate.skillsMatch}%` }} />
                          </div>
                          <span className="text-xs font-bold text-blue-600">{candidate.skillsMatch}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(results, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `hiring-analysis-${selectedTenant?.name}-${new Date().toISOString().split('T')[0]}.json`;
                link.click();
              }}
              className="px-6 py-3 border-2 border-mizan-primary text-mizan-primary rounded-xl hover:bg-mizan-primary hover:text-white transition-all duration-400 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Results</span>
            </button>

            <button
              onClick={() => setResults(null)}
              className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Run New Analysis</span>
            </button>
          </div>
        </div>
      )}

      {!selectedTenant && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <Briefcase className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mizan-primary mb-2">
            Select a Client to Begin
          </h3>
          <p className="text-mizan-secondary">
            Choose a client to analyze their hiring pipeline and manage requisitions
          </p>
        </div>
      )}
    </div>
  );
}
