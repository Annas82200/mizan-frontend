'use client';

import React, { useState, useEffect } from 'react';
import {
  Network,
  Upload,
  FileText,
  AlertCircle,
  Loader2,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  BarChart3,
  Layers,
  Target,
  Download,
  RefreshCw
} from 'lucide-react';
import { TenantSelector } from '@/components/dashboard';

// Helper to format rich text with subtitles
const formatDescription = (text: string) => {
  // Split by ** markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    // Check if this part is a **subtitle**
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2); // Remove ** markers
      return (
        <span key={index} className="block mt-4 mb-2 text-xs font-semibold text-mizan-gold uppercase tracking-wider">
          {content}
        </span>
      );
    }
    // Regular text - split by \n for line breaks
    return part.split('\n').map((line, lineIdx) => (
      line.trim() ? <span key={`${index}-${lineIdx}`} className="block">{line}</span> : null
    ));
  });
};

// Types based on backend structure-agent.ts
interface StructureAnalysisOutput {
  overallScore: number;
  spanAnalysis: {
    average: number;
    distribution: { [span: string]: number };
    outliers: Array<{
      role: string;
      span: number;
      recommendation: string;
    }>;
  };
  layerAnalysis: {
    totalLayers: number;
    averageLayersToBottom: number;
    bottlenecks: Array<{
      layer: number;
      roles: string[];
      issue: string;
    }>;
  };
  strategyAlignment: {
    score: number;
    misalignments: Array<{
      area: string;
      issue: string;
      impact: 'high' | 'medium' | 'low';
    }>;
  };
  recommendations: Array<{
    category: 'span' | 'layers' | 'alignment' | 'efficiency';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    actionItems: string[];
  }>;
}

interface Tenant {
  id: string;
  name: string;
  industry?: string | null;
  plan: string;
  status: string;
  employeeCount?: number | null;
  userCount?: number;
}

type UploadMethod = 'csv' | 'text' | 'api';

export default function StructureAnalysisPage() {
  // State
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [uploadMethod, setUploadMethod] = useState<UploadMethod>('csv');
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<StructureAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.txt')) {
        setError('Please upload a CSV or TXT file');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  // Run analysis
  const handleAnalyze = async () => {
    if (!selectedTenant) {
      setError('Please select a client first');
      return;
    }

    if (uploadMethod === 'csv' && !file) {
      setError('Please upload a file');
      return;
    }

    if (uploadMethod === 'text' && !textInput.trim()) {
      setError('Please enter organization structure data');
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);
      setResults(null);

      // First, upload the structure data
      let structureData: any;

      if (uploadMethod === 'csv' && file) {
        // Upload CSV file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tenantId', selectedTenant.id);

        const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/org-chart`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
          },
          body: formData
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Failed to upload structure data');
        }

        structureData = await uploadResponse.json();
      } else if (uploadMethod === 'text') {
        // Parse text input
        const lines = textInput.trim().split('\n');
        structureData = {
          rawText: textInput,
          parsedData: lines.map(line => {
            const parts = line.split(',').map(p => p.trim());
            return {
              name: parts[0] || '',
              title: parts[1] || '',
              reports_to: parts[2] || null
            };
          })
        };
      }

      // Run analysis
      const analysisResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyses/structure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
        },
        body: JSON.stringify({
          tenantId: selectedTenant.id,
          structureData
        })
      });

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const analysisResults = await analysisResponse.json();
      setResults(analysisResults);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: unknown) {
      console.error('Analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze structure';
      setError(errorMessage);
    } finally {
      setAnalyzing(false);
    }
  };

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get score background
  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-mizan-primary mb-2">Structure Analysis</h1>
        <p className="text-mizan-secondary">
          Analyze organizational structure, span of control, layers, and strategy alignment
        </p>
      </div>

      {/* Tenant Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <TenantSelector
          selectedTenantId={selectedTenant?.id || null}
          onSelectTenant={(id, tenant) => {
            setSelectedTenant(tenant);
            setResults(null);
            setError(null);
          }}
          label="Select Client for Analysis"
          placeholder="Choose a client to analyze their organizational structure..."
          required
        />
      </div>

      {/* Upload Section */}
      {selectedTenant && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-mizan-primary mb-4">Upload Organization Structure</h2>

            {/* Upload Method Selector */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setUploadMethod('csv')}
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  uploadMethod === 'csv'
                    ? 'border-mizan-gold bg-mizan-gold/5 text-mizan-gold'
                    : 'border-gray-200 text-mizan-secondary hover:border-mizan-gold/50'
                }`}
              >
                <Upload className="w-5 h-5 mx-auto mb-2" />
                <span className="block text-sm font-medium">Upload CSV</span>
              </button>

              <button
                onClick={() => setUploadMethod('text')}
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  uploadMethod === 'text'
                    ? 'border-mizan-gold bg-mizan-gold/5 text-mizan-gold'
                    : 'border-gray-200 text-mizan-secondary hover:border-mizan-gold/50'
                }`}
              >
                <FileText className="w-5 h-5 mx-auto mb-2" />
                <span className="block text-sm font-medium">Paste Text</span>
              </button>

              <button
                onClick={() => setUploadMethod('api')}
                className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                  uploadMethod === 'api'
                    ? 'border-mizan-gold bg-mizan-gold/5 text-mizan-gold'
                    : 'border-gray-200 text-mizan-secondary hover:border-mizan-gold/50'
                }`}
              >
                <Network className="w-5 h-5 mx-auto mb-2" />
                <span className="block text-sm font-medium">Use API Data</span>
              </button>
            </div>

            {/* CSV Upload */}
            {uploadMethod === 'csv' && (
              <div>
                <label className="block text-sm font-medium text-mizan-primary mb-2">
                  Organization Chart CSV
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-mizan-gold transition-colors">
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-mizan-secondary" />
                    {file ? (
                      <div>
                        <p className="text-mizan-primary font-medium mb-1">{file.name}</p>
                        <p className="text-sm text-mizan-secondary">
                          {(file.size / 1024).toFixed(2)} KB • Click to change
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-mizan-primary font-medium mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-mizan-secondary">
                          CSV or TXT file (Max 5MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                <p className="mt-2 text-xs text-mizan-secondary">
                  Expected format: Name, Title, Reports To (Manager Name)
                </p>
              </div>
            )}

            {/* Text Input */}
            {uploadMethod === 'text' && (
              <div>
                <label className="block text-sm font-medium text-mizan-primary mb-2">
                  Organization Structure (Text)
                </label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter org structure data, one person per line:&#10;John Doe, CEO,&#10;Jane Smith, CTO, John Doe&#10;Bob Johnson, VP Engineering, Jane Smith"
                  rows={12}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold font-mono text-sm"
                />
                <p className="mt-2 text-xs text-mizan-secondary">
                  Format: Name, Title, Reports To (one person per line)
                </p>
              </div>
            )}

            {/* API Data */}
            {uploadMethod === 'api' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      Using Existing Employee Data
                    </p>
                    <p className="text-sm text-blue-700">
                      The analysis will use the employee hierarchy from the employees uploaded during client creation.
                      Ensure the organizational structure is up to date in the employee management system.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900 mb-1">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Save Success */}
          {saveSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-sm font-medium text-green-900">
                Analysis completed and saved successfully!
              </p>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !selectedTenant || (uploadMethod === 'csv' && !file) || (uploadMethod === 'text' && !textInput.trim())}
            className="w-full px-6 py-4 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl font-semibold"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Structure...</span>
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                <span>Run Structure Analysis</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${getScoreBg(results.overallScore)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-mizan-secondary text-sm font-medium mb-1">Overall Structure Score</p>
                <h2 className={`text-5xl font-bold ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore}/100
                </h2>
              </div>
              <div className="text-right">
                {results.overallScore >= 80 ? (
                  <TrendingUp className="w-12 h-12 text-green-600 mb-2 ml-auto" />
                ) : (
                  <TrendingDown className="w-12 h-12 text-red-600 mb-2 ml-auto" />
                )}
                <p className={`text-sm font-medium ${getScoreColor(results.overallScore)}`}>
                  {results.overallScore >= 80 ? 'Excellent' : results.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Span Analysis */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-mizan-primary">Span of Control</h3>
                <Network className="w-6 h-6 text-mizan-gold" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-mizan-secondary mb-1">Average Span</p>
                  <p className="text-2xl font-bold text-mizan-primary">
                    {results.spanAnalysis.average.toFixed(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-mizan-secondary mb-2">Distribution</p>
                  <div className="space-y-1">
                    {Object.entries(results.spanAnalysis.distribution).map(([span, count]) => (
                      <div key={span} className="flex items-center justify-between text-sm">
                        <span className="text-mizan-secondary">{span} reports</span>
                        <span className="font-medium text-mizan-primary">{count} managers</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Layer Analysis */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-mizan-primary">Organizational Layers</h3>
                <Layers className="w-6 h-6 text-mizan-gold" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-mizan-secondary mb-1">Total Layers</p>
                  <p className="text-2xl font-bold text-mizan-primary">
                    {results.layerAnalysis.totalLayers}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-mizan-secondary mb-1">Avg Layers to Bottom</p>
                  <p className="text-2xl font-bold text-mizan-primary">
                    {results.layerAnalysis.averageLayersToBottom.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Strategy Alignment */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-mizan-primary">Strategy Alignment</h3>
                <Target className="w-6 h-6 text-mizan-gold" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-mizan-secondary mb-1">Alignment Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(results.strategyAlignment.score)}`}>
                    {results.strategyAlignment.score}/100
                  </p>
                </div>
                <div>
                  <p className="text-sm text-mizan-secondary mb-1">Misalignments</p>
                  <p className="text-2xl font-bold text-mizan-primary">
                    {results.strategyAlignment.misalignments.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Span Outliers */}
          {results.spanAnalysis.outliers.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-mizan-primary mb-4">Span of Control Outliers</h3>
              <div className="space-y-3">
                {results.spanAnalysis.outliers.map((outlier, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-mizan-primary mb-1">
                        {outlier.role} - {outlier.span} direct reports
                      </p>
                      <p className="text-sm text-mizan-secondary">{outlier.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layer Bottlenecks */}
          {results.layerAnalysis.bottlenecks.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-mizan-primary mb-4">Layer Bottlenecks</h3>
              <div className="space-y-3">
                {results.layerAnalysis.bottlenecks.map((bottleneck, idx) => (
                  <div key={idx} className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="font-semibold text-mizan-primary mb-2">
                      Layer {bottleneck.layer}
                    </p>
                    <p className="text-sm text-mizan-secondary mb-2">{bottleneck.issue}</p>
                    <div className="flex flex-wrap gap-2">
                      {bottleneck.roles.map((role, roleIdx) => (
                        <span key={roleIdx} className="px-3 py-1 bg-white border border-red-200 rounded-full text-xs font-medium text-red-700">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategy Misalignments */}
          {results.strategyAlignment.misalignments.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-mizan-primary mb-4">Strategy Misalignments</h3>
              <div className="space-y-3">
                {results.strategyAlignment.misalignments.map((misalignment, idx) => (
                  <div key={idx} className="p-4 border-2 rounded-xl" style={{
                    borderColor: misalignment.impact === 'high' ? '#FCA5A5' :
                                misalignment.impact === 'medium' ? '#FCD34D' : '#86EFAC',
                    backgroundColor: misalignment.impact === 'high' ? '#FEF2F2' :
                                    misalignment.impact === 'medium' ? '#FEFCE8' : '#F0FDF4'
                  }}>
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-mizan-primary">{misalignment.area}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(misalignment.impact)}`}>
                        {misalignment.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                    <p className="text-sm text-mizan-secondary">{misalignment.issue}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-mizan-primary mb-4">Recommendations</h3>
            <div className="space-y-4">
              {results.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 border-2 rounded-xl bg-gray-50 border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </span>
                        <span className="px-3 py-1 bg-mizan-primary/10 text-mizan-primary rounded-full text-xs font-medium">
                          {rec.category.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-mizan-primary mb-2">{rec.title}</h4>
                      <div className="text-sm text-mizan-secondary mb-3 leading-relaxed">
                        {formatDescription(rec.description)}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-mizan-primary">Action Items:</p>
                        <ul className="space-y-1">
                          {rec.actionItems.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start space-x-2 text-sm text-mizan-secondary">
                              <CheckCircle2 className="w-4 h-4 text-mizan-gold flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={async () => {
                try {
                  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                  const response = await fetch(`${API_URL}/api/export/structure`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
                    },
                    body: JSON.stringify({
                      analysisData: results,
                      tenantName: selectedTenant?.name || 'Organization'
                    })
                  });

                  if (!response.ok) {
                    throw new Error('Export failed');
                  }

                  const html = await response.text();

                  // Open in new window
                  const newWindow = window.open('', '_blank');
                  if (newWindow) {
                    newWindow.document.write(html);
                    newWindow.document.close();
                  }
                } catch (error) {
                  console.error('Export error:', error);
                  alert('Failed to export results. Please try again.');
                }
              }}
              className="px-6 py-3 border-2 border-mizan-primary text-mizan-primary rounded-xl hover:bg-mizan-primary hover:text-white transition-all duration-400 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Export Results</span>
            </button>

            <button
              onClick={() => {
                setResults(null);
                setFile(null);
                setTextInput('');
              }}
              className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Run New Analysis</span>
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedTenant && !results && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <Network className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mizan-primary mb-2">
            Select a Client to Begin
          </h3>
          <p className="text-mizan-secondary">
            Choose a client from the dropdown above to analyze their organizational structure
          </p>
        </div>
      )}
    </div>
  );
}
