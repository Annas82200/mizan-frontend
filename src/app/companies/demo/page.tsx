"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Upload, Play, BarChart3, Users, Target } from 'lucide-react';

export default function DemoPage() {
  const [analysisStep, setAnalysisStep] = useState('setup'); // setup, upload, analyzing, results
  const [analysisResults, setAnalysisResults] = useState(null);
  const [analysisType, setAnalysisType] = useState('structure');
  const [organizationData, setOrganizationData] = useState({
    orgName: '',
    industry: 'Technology',
    vision: '',
    mission: '',
    strategy: '',
    values: '',
    departments: [],
    employeeResponses: []
  });
  const [csvFile, setCsvFile] = useState(null);

  const handleStartAnalysis = async () => {
    setAnalysisStep('analyzing');
    
    try {
      let endpoint = '';
      let payload = {};
      
      // Use collected organization data or fallback to sample
      const analysisData = {
        email: "demo@example.com",
        orgName: organizationData.orgName || "Demo Organization",
        industry: organizationData.industry,
        vision: organizationData.vision,
        mission: organizationData.mission,
        values: organizationData.values,
        departments: organizationData.departments.length > 0 ? organizationData.departments : [
          { id: "eng", name: "Engineering", headCount: 25, manager: "John Smith" },
          { id: "prod", name: "Product", headCount: 12, manager: "Sarah Johnson" },
          { id: "sales", name: "Sales", headCount: 18, manager: "Mike Chen" }
        ],
        roles: [
          { id: "cto", title: "CTO", department: "eng", level: 1, responsibilities: ["Technical Strategy", "Team Leadership"] },
          { id: "eng_mgr", title: "Engineering Manager", department: "eng", level: 2, responsibilities: ["Team Management", "Technical Oversight"] }
        ],
        employeeResponses: organizationData.employeeResponses,
        csvData: csvFile ? "CSV file uploaded: " + csvFile.name : null
      };

      switch (analysisType) {
        case 'structure':
          endpoint = '/api/entry/analyze-org';
          payload = analysisData;
          break;
        case 'culture':
          endpoint = '/api/entry/analyze-culture';
          payload = { 
            ...analysisData, 
            assessmentData: { 
              departments: analysisData.departments,
              vision: analysisData.vision,
              mission: analysisData.mission,
              values: analysisData.values
            } 
          };
          break;
        case 'skills':
          endpoint = '/api/entry/analyze-skills';
          payload = analysisData;
          break;
        case 'comprehensive':
          endpoint = '/api/entry/analyze-comprehensive';
          payload = { 
            ...analysisData, 
            organizationData: {
              ...analysisData,
              strategicFoundation: {
                vision: analysisData.vision,
                mission: analysisData.mission,
                values: analysisData.values
              }
            }
          };
          break;
      }

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      setAnalysisResults(result);
      setAnalysisStep('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisStep('upload');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Mizan</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/companies" className="text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/companies/about" className="text-slate-600 hover:text-slate-900">About</Link>
            <Link href="/request-demo" className="text-slate-600 hover:text-slate-900">Book Demo</Link>
            <Link href="/companies/pricing" className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-light hover:bg-slate-800 transition-all">View Pricing</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-extralight text-slate-900 mb-8 leading-tight">
            Free Organizational
            <span className="block bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-light mb-12 leading-relaxed">
            Get instant AI-powered insights into your organizational structure. 
            No login required, results in under 60 seconds.
          </p>
        </div>
      </section>

      {/* Analysis Interface */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Setup Phase - Vision/Mission/Values */}
          {analysisStep === 'setup' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-light text-slate-900 mb-4">Organization Setup</h2>
                <p className="text-lg text-slate-600 font-light">
                  Provide your organization's foundational information for comprehensive analysis
                </p>
              </div>

              <div className="space-y-8 max-w-2xl mx-auto">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Organization Name</label>
                    <input
                      type="text"
                      value={organizationData.orgName}
                      onChange={(e) => setOrganizationData({...organizationData, orgName: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your organization name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Industry</label>
                    <select
                      value={organizationData.industry}
                      onChange={(e) => setOrganizationData({...organizationData, industry: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Education">Education</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Vision/Mission/Values */}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-slate-900 text-center">Strategic Foundation</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Vision Statement</label>
                    <textarea
                      value={organizationData.vision}
                      onChange={(e) => setOrganizationData({...organizationData, vision: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                      placeholder="What is your organization's long-term vision?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Mission Statement</label>
                    <textarea
                      value={organizationData.mission}
                      onChange={(e) => setOrganizationData({...organizationData, mission: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                      placeholder="What is your organization's core purpose and mission?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Strategic Objectives</label>
                    <textarea
                      value={organizationData.strategy}
                      onChange={(e) => setOrganizationData({...organizationData, strategy: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      placeholder="What are your key strategic objectives and goals for the next 2-3 years?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Core Values</label>
                    <textarea
                      value={organizationData.values}
                      onChange={(e) => setOrganizationData({...organizationData, values: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                      placeholder="List your organization's core values (one per line or comma-separated)"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => setAnalysisStep('upload')}
                    className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-12 py-4 rounded-2xl font-light tracking-wide hover:from-slate-800 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    Continue to Structure & Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upload Phase - CSV Upload & Employee Survey */}
          {analysisStep === 'upload' && (
            <div className="space-y-8">
              
              {/* CSV Upload Section */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
                <div className="text-center mb-8">
                  <Upload className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-light text-slate-900 mb-4">Upload Organization Chart</h3>
                  <p className="text-slate-600 font-light">
                    Upload your CSV file with organizational structure for detailed analysis
                  </p>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-slate-400 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                    <p className="text-lg text-slate-600 font-light mb-2">
                      {csvFile ? csvFile.name : 'Drop your org chart here or click to browse'}
                    </p>
                    <p className="text-slate-500 font-light text-sm">
                      Supports CSV, Excel formats (Name, Title, Manager, Department)
                    </p>
                  </label>
                </div>
              </div>

              {/* Employee Survey Section */}
              <div className="bg-slate-50 rounded-3xl p-8">
                <div className="text-center mb-8">
                  <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-light text-slate-900 mb-4">Culture Assessment</h3>
                  <p className="text-slate-600 font-light">
                    Employee culture survey - the foundation of our culture analysis
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-slate-600 font-light mb-6">
                    Our AI agents will analyze your organization's values and map them to the Mizan framework automatically.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-medium text-blue-900 mb-2">How It Works</h4>
                    <p className="text-blue-800 text-sm font-light">
                      The culture agent reads your company values and intelligently maps them to our 7-cylinders framework 
                      using advanced semantic analysis. No manual rating required - the AI does the mapping for you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Analysis Type Selection */}
              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-slate-900 mb-4">Choose Analysis Type</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { key: 'structure', name: 'Structure Analysis', desc: 'Org design & hierarchy', icon: Target },
                      { key: 'culture', name: 'Culture Analysis', desc: '7-Cylinders framework', icon: Users },
                      { key: 'skills', name: 'Skills Analysis', desc: 'Gap analysis & training', icon: BarChart3 },
                      { key: 'comprehensive', name: 'Full Analysis', desc: 'All agents working together', icon: Play }
                    ].map((type) => (
                      <button
                        key={type.key}
                        onClick={() => setAnalysisType(type.key)}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          analysisType === type.key 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                          analysisType === type.key ? 'text-blue-600' : 'text-slate-600'
                        }`} />
                        <div className={`font-medium text-sm mb-1 ${
                          analysisType === type.key ? 'text-blue-900' : 'text-slate-900'
                        }`}>
                          {type.name}
                        </div>
                        <div className="text-xs text-slate-600 font-light">{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={handleStartAnalysis}
                    className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-12 py-4 rounded-2xl font-light tracking-wide hover:from-slate-800 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    Run {analysisType === 'comprehensive' ? 'Comprehensive' : analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis
                  </button>
                  <p className="text-sm text-slate-500 mt-4 font-light">
                    AI agents will process your data using the Three-Engine architecture
                  </p>
                </div>
              </div>
            </div>
          )}

          {analysisStep === 'analyzing' && (
            <div className="bg-slate-900 rounded-3xl shadow-xl p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-light text-white mb-6">Analyzing Your Organization</h2>
              <p className="text-xl text-slate-300 font-light mb-8">
                Our Three-Engine AI is processing your organizational data...
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <span className="text-slate-300 font-light">Knowledge Engine</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-slate-300 font-light">Data Engine</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-slate-300 font-light">Reasoning Engine</span>
                </div>
              </div>
            </div>
          )}

          {analysisStep === 'results' && analysisResults && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-light text-slate-900 mb-4">
                    {analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis Complete!
                  </h2>
                  <p className="text-slate-600 font-light">
                    Powered by Mizan's Three-Engine AI Architecture
                  </p>
                </div>

                {/* Structure Analysis Results */}
                {analysisType === 'structure' && analysisResults.success && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-light text-blue-600 mb-2">
                          {analysisResults.analysis.overallScore}
                        </div>
                        <div className="text-slate-600 font-light">Overall Structure Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-light text-amber-500 mb-2">
                          {analysisResults.analysis.spanAnalysis.average.toFixed(1)}
                        </div>
                        <div className="text-slate-600 font-light">Average Span of Control</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-light text-slate-700 mb-2">
                          {analysisResults.analysis.layerAnalysis.totalLayers}
                        </div>
                        <div className="text-slate-600 font-light">Organizational Layers</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8">
                      <h3 className="text-xl font-medium text-slate-900 mb-4">AI Recommendations</h3>
                      <ul className="space-y-3 text-left">
                        {analysisResults.analysis.recommendations.slice(0, 3).map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <Target className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                            <span className="text-slate-700 font-light">{rec.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Culture Analysis Results */}
                {analysisType === 'culture' && analysisResults.success && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-light text-blue-600 mb-2">
                          {analysisResults.analysis.overallScore}
                        </div>
                        <div className="text-slate-600 font-light">Culture Health Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-light text-amber-500 mb-2">
                          {analysisResults.analysis.entropyScore}
                        </div>
                        <div className="text-slate-600 font-light">Entropy Score (Lower is Better)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-light text-slate-700 mb-2">7</div>
                        <div className="text-slate-600 font-light">Cylinders Analyzed</div>
                      </div>
                    </div>

                    {/* 7-Cylinders Visualization */}
                    <div className="bg-slate-900 rounded-2xl p-8">
                      <h3 className="text-xl font-medium text-white mb-6 text-center">7-Cylinders Framework Results</h3>
                      <div className="space-y-3">
                        {Object.entries(analysisResults.analysis.cylinderScores).map(([cylinder, score]) => (
                          <div key={cylinder} className="flex items-center space-x-4">
                            <div className="w-32 text-right">
                              <span className="text-white font-light capitalize">{cylinder}</span>
                            </div>
                            <div className="flex-1 relative">
                              <div className="h-6 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000"
                                  style={{ width: `${score}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-12 text-white font-medium">{score}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Comprehensive Analysis Results */}
                {analysisType === 'comprehensive' && analysisResults.success && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-light text-blue-600 mb-2">
                          {analysisResults.analysis.overallHealthScore}
                        </div>
                        <div className="text-slate-600 font-light">Overall Health</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-light text-green-600 mb-2">
                          {Object.values(analysisResults.analysis.agentPerformance).filter(agent => agent.status === 'success').length}
                        </div>
                        <div className="text-slate-600 font-light">Agents Successful</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-light text-amber-500 mb-2">
                          {analysisResults.analysis.executionTime}ms
                        </div>
                        <div className="text-slate-600 font-light">Analysis Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-light text-slate-700 mb-2">
                          {analysisResults.analysis.prioritizedRecommendations.length}
                        </div>
                        <div className="text-slate-600 font-light">Recommendations</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8">
                      <h3 className="text-xl font-medium text-slate-900 mb-4">Cross-Analysis Insights</h3>
                      <ul className="space-y-3 text-left">
                        {analysisResults.analysis.crossAnalysisInsights.slice(0, 3).map((insight, index) => (
                          <li key={index} className="flex items-start">
                            <BarChart3 className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                            <span className="text-slate-700 font-light">{insight.finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="text-center pt-8 border-t border-slate-200">
                  <p className="text-slate-600 font-light mb-8">
                    This is live AI analysis using our production Three-Engine architecture. 
                    Get full access with detailed reports and ongoing analysis.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/companies/pricing" className="group">
                      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-12 py-4 rounded-2xl font-light tracking-wide hover:from-slate-800 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                        <span className="text-lg">Upgrade to Pro</span>
                      </div>
                    </Link>
                    <button 
                      onClick={() => setAnalysisStep('upload')}
                      className="bg-white text-slate-800 px-12 py-4 rounded-2xl font-light tracking-wide border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
                    >
                      Try Another Analysis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How Analysis Works */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-6">How Our Analysis Works</h2>
            <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto">
              Sophisticated AI analysis using proven organizational development frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-light text-xl">1</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">Upload Data</h3>
              <p className="text-slate-600 font-light">Provide your organizational structure through file upload or manual entry</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-light text-xl">2</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">AI Processing</h3>
              <p className="text-slate-600 font-light">Three-Engine AI analyzes using McKinsey 7S and Galbraith Star frameworks</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-light text-xl">3</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">Generate Insights</h3>
              <p className="text-slate-600 font-light">Receive detailed analysis of span, layers, and strategic alignment</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-light text-xl">4</span>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">Actionable Recommendations</h3>
              <p className="text-slate-600 font-light">Get specific, prioritized recommendations for organizational improvement</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
