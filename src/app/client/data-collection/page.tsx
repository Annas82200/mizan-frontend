"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Upload,
  Users, 
  Building2, 
  CheckCircle,
  AlertTriangle,
  Mail,
  FileText,
  Download,
  Send,
  Loader2,
  ArrowRight,
  Target,
  BarChart3,
  Clock,
  Eye
} from 'lucide-react';

export default function ClientDataCollection() {
  const [activeStep, setActiveStep] = useState('survey');
  const [dataCollectionStatus, setDataCollectionStatus] = useState({
    surveys: { sent: 0, completed: 0, total: 0 },
    orgChart: { uploaded: false, employees: 0 },
    profiles: { uploaded: false, processed: 0 }
  });
  
  const [surveySetup, setSurveySetup] = useState({
    employeeEmails: '',
    customMessage: 'Please take a few minutes to complete this important culture survey. Your responses will help us improve our workplace and better understand our organizational culture.',
    sending: false
  });

  const [analysisReadiness, setAnalysisReadiness] = useState({
    culture: false,
    structure: false,
    skills: false,
    engagement: false,
    recognition: false
  });

  // Mock company data - in production, fetch from user's account
  const companyData = {
    name: 'Your Company',
    plan: 'Pro+',
    employees: 125,
    email: 'admin@yourcompany.com'
  };

  const steps = [
    { id: 'survey', name: 'Employee Surveys', emoji: '📋', description: 'Collect culture, engagement & recognition data' },
    { id: 'structure', name: 'Org Chart', emoji: '🏗️', description: 'Upload organizational structure' },
    { id: 'profiles', name: 'Employee Profiles', emoji: '🎓', description: 'Upload skills and experience data' },
    { id: 'analysis', name: 'Run Analysis', emoji: '🎯', description: 'Generate insights from collected data' }
  ];

  useEffect(() => {
    // Update analysis readiness based on collected data
    setAnalysisReadiness({
      culture: dataCollectionStatus.surveys.completed >= 5,
      structure: dataCollectionStatus.orgChart.uploaded,
      skills: dataCollectionStatus.profiles.uploaded,
      engagement: dataCollectionStatus.surveys.completed >= 3,
      recognition: dataCollectionStatus.surveys.completed >= 3
    });
  }, [dataCollectionStatus]);

  const sendCultureSurvey = async () => {
    setSurveySetup({...surveySetup, sending: true});
    
    try {
      const emails = surveySetup.employeeEmails.split('\n').map(email => email.trim()).filter(email => email);
      
      if (emails.length === 0) {
        throw new Error('Please enter at least one employee email');
      }

      // Simulate API call - in production, call your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setDataCollectionStatus(prev => ({
        ...prev,
        surveys: { sent: emails.length, completed: 0, total: emails.length }
      }));

      alert(`Culture survey sent successfully to ${emails.length} employees! They will receive email invitations with personalized survey links.`);
      
    } catch (error) {
      alert('Failed to send survey: ' + error.message);
    } finally {
      setSurveySetup({...surveySetup, sending: false});
    }
  };

  const handleOrgChartUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const lines = csvData.split('\n').filter(line => line.trim());
      const employeeCount = lines.length - 1; // Subtract header row
      
      setDataCollectionStatus(prev => ({
        ...prev,
        orgChart: { uploaded: true, employees: employeeCount }
      }));

      alert(`Organizational chart uploaded successfully! ${employeeCount} employees processed.`);
    };
    reader.readAsText(file);
  };

  const handleProfilesUpload = (files) => {
    const fileCount = files.length;
    
    setDataCollectionStatus(prev => ({
      ...prev,
      profiles: { uploaded: true, processed: fileCount }
    }));

    alert(`${fileCount} employee profiles uploaded successfully!`);
  };

  const runRealAnalysis = async (analysisType) => {
    if (!analysisReadiness[analysisType]) {
      alert(`Cannot run ${analysisType} analysis - insufficient data collected. Please collect the required data first.`);
      return;
    }

    try {
      // In production, call real analysis API with collected data
      console.log(`🚀 Running REAL ${analysisType} analysis with collected data`);
      
      // Simulate real analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      alert(`${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} analysis completed using your collected data! Check the reports section for detailed insights.`);
      
    } catch (error) {
      alert('Analysis failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
              <span className="text-xl font-light text-slate-800">Mizan</span>
            </Link>
            <div className="h-6 w-px bg-slate-300"></div>
            <div>
              <h1 className="text-lg font-medium text-slate-900">{companyData.name}</h1>
              <p className="text-sm text-slate-500">Data Collection Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/client/dashboard" className="text-slate-600 hover:text-slate-900">
              Back to Dashboard
            </Link>
            <Link href="/auth/login" className="text-slate-600 hover:text-slate-900">
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-xl cursor-pointer transition-all ${
                    activeStep === step.id ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{step.emoji}</span>
                  <div>
                    <div className="font-medium">{step.name}</div>
                    <div className="text-xs">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-300 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        
        {/* Employee Survey Step */}
        {activeStep === 'survey' && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">📋</span>
              <h2 className="text-3xl font-light text-slate-900 mb-4">Employee Culture Survey</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Send culture surveys to your employees to collect data for culture, engagement, and recognition analysis.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-6">Survey Distribution</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Employee Email Addresses (one per line)
                    </label>
                    <textarea
                      value={surveySetup.employeeEmails}
                      onChange={(e) => setSurveySetup({...surveySetup, employeeEmails: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                      placeholder="john.smith@company.com&#10;sarah.johnson@company.com&#10;mike.chen@company.com&#10;..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Custom Message</label>
                    <textarea
                      value={surveySetup.customMessage}
                      onChange={(e) => setSurveySetup({...surveySetup, customMessage: e.target.value})}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    />
                  </div>

                  <button
                    onClick={sendCultureSurvey}
                    disabled={surveySetup.sending || !surveySetup.employeeEmails.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {surveySetup.sending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending Surveys...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Culture Surveys
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-medium text-slate-900 mb-6">Survey Progress</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-light text-blue-900">{dataCollectionStatus.surveys.sent}</div>
                      <div className="text-sm text-blue-700">Sent</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-light text-green-900">{dataCollectionStatus.surveys.completed}</div>
                      <div className="text-sm text-green-700">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-xl">
                      <div className="text-2xl font-light text-amber-900">{dataCollectionStatus.surveys.sent - dataCollectionStatus.surveys.completed}</div>
                      <div className="text-sm text-amber-700">Pending</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-3">What This Survey Collects:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Personal values and culture preferences</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Current workplace experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Desired culture improvements</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Recognition levels (Question 4)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Engagement levels (Question 5)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Org Chart Upload Step */}
        {activeStep === 'structure' && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🏗️</span>
              <h2 className="text-3xl font-light text-slate-900 mb-4">Organizational Structure</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Upload your organizational chart to enable structure analysis and strategic alignment assessment.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Upload Organizational Chart</h3>
                  <p className="text-slate-600 mb-4">
                    CSV file with columns: Employee Name, Email, Department, Manager, Role, Level
                  </p>
                  
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleOrgChartUpload(file);
                    }}
                    className="hidden"
                    id="org-chart-upload"
                  />
                  <label
                    htmlFor="org-chart-upload"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors cursor-pointer inline-block"
                  >
                    Choose CSV File
                  </label>
                  
                  <div className="mt-4">
                    <Link href="/templates/org-chart-template.csv" className="text-blue-600 hover:text-blue-700 text-sm">
                      Download CSV Template →
                    </Link>
                  </div>
                </div>

                {dataCollectionStatus.orgChart.uploaded && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="font-medium text-green-900">Org Chart Uploaded Successfully!</h4>
                        <p className="text-sm text-green-700">
                          {dataCollectionStatus.orgChart.employees} employees processed. Structure analysis is now ready.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Employee Profiles Step */}
        {activeStep === 'profiles' && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🎓</span>
              <h2 className="text-3xl font-light text-slate-900 mb-4">Employee Skills & Profiles</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Upload employee resumes, skill profiles, or experience data to enable comprehensive skills gap analysis.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Upload Employee Profiles</h3>
                  <p className="text-slate-600 mb-4">
                    Resumes (PDF), skills data (CSV), or profile information (JSON)
                  </p>
                  
                  <input
                    type="file"
                    accept=".pdf,.csv,.json"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      if (files.length > 0) handleProfilesUpload(files);
                    }}
                    className="hidden"
                    id="profiles-upload"
                  />
                  <label
                    htmlFor="profiles-upload"
                    className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors cursor-pointer inline-block"
                  >
                    Choose Files
                  </label>
                  
                  <div className="mt-4">
                    <Link href="/templates/skills-template.csv" className="text-blue-600 hover:text-blue-700 text-sm">
                      Download Skills Template →
                    </Link>
                  </div>
                </div>

                {dataCollectionStatus.profiles.uploaded && (
                  <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                      <div>
                        <h4 className="font-medium text-purple-900">Profiles Uploaded Successfully!</h4>
                        <p className="text-sm text-purple-700">
                          {dataCollectionStatus.profiles.processed} employee profiles processed. Skills analysis is now ready.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Dashboard */}
        {activeStep === 'analysis' && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🎯</span>
              <h2 className="text-3xl font-light text-slate-900 mb-4">Real Analysis Dashboard</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Run AI analysis using your collected organizational data for genuine insights.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                { id: 'culture', name: 'Culture Analysis', emoji: '🎯', requirement: 'Employee surveys', ready: analysisReadiness.culture },
                { id: 'structure', name: 'Structure Analysis', emoji: '🏗️', requirement: 'Org chart', ready: analysisReadiness.structure },
                { id: 'skills', name: 'Skills Analysis', emoji: '🎓', requirement: 'Employee profiles', ready: analysisReadiness.skills },
                { id: 'engagement', name: 'Engagement Analysis', emoji: '💖', requirement: 'Survey responses', ready: analysisReadiness.engagement },
                { id: 'recognition', name: 'Recognition Analysis', emoji: '🏆', requirement: 'Survey responses', ready: analysisReadiness.recognition }
              ].map((analysis) => (
                <div key={analysis.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="text-center mb-4">
                    <span className="text-4xl block mb-3">{analysis.emoji}</span>
                    <h3 className="font-medium text-slate-900 mb-1">{analysis.name}</h3>
                    <p className="text-xs text-slate-600">{analysis.requirement}</p>
                  </div>
                  
                  <div className={`text-center px-3 py-2 rounded-full text-xs font-medium mb-4 ${
                    analysis.ready ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {analysis.ready ? 'Ready for Real Analysis' : 'Collect Data First'}
                  </div>
                  
                  <button
                    onClick={() => runRealAnalysis(analysis.id)}
                    disabled={!analysis.ready}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      analysis.ready 
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {analysis.ready ? 'Run Analysis' : 'Data Required'}
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-medium text-slate-900 mb-3">🎊 Ready for Real Insights!</h3>
              <p className="text-slate-700 mb-4">
                Once you've collected the required data, you'll have access to genuine AI-powered organizational intelligence 
                based on your actual company information, not sample data.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/client/dashboard" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  View Results in Dashboard
                </Link>
                <button 
                  onClick={() => {
                    const readyAnalyses = Object.entries(analysisReadiness).filter(([_, ready]) => ready);
                    if (readyAnalyses.length > 0) {
                      alert(`${readyAnalyses.length} analyses are ready to run with your collected data!`);
                    } else {
                      alert('Complete data collection steps first to unlock real analysis.');
                    }
                  }}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Check Analysis Readiness
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
