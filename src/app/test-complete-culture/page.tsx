"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function TestCompleteCulturePage() {
  const [step, setStep] = useState('setup'); // setup, results
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const testCultureFlow = async () => {
    setLoading(true);
    setStep('analyzing');
    
    try {
      console.log('🧪 Testing complete culture analysis flow...');
      
      // Sample employee responses
      const sampleData = {
        orgName: 'Demo Organization',
        industry: 'Technology',
        companyValues: ['Innovation', 'Trust', 'Excellence', 'Accountability'],
        companyVision: 'To be the leading technology company that empowers people',
        companyMission: 'Creating innovative solutions that improve lives and drive positive change',
        employeeResponses: [
          {
            personalValues: ['Trust', 'Innovation', 'Learning', 'Accountability', 'Excellence'],
            currentExperience: ['Trust', 'Learning', 'Innovation'],
            desiredExperience: ['Trust', 'Innovation', 'Learning', 'Recognition', 'Autonomy', 'Excellence'],
            recognition: 6,
            engagement: 7
          },
          {
            personalValues: ['Belonging', 'Trust', 'Service', 'Integrity', 'Collaboration'],
            currentExperience: ['Trust', 'Belonging', 'Service'],
            desiredExperience: ['Trust', 'Belonging', 'Service', 'Recognition', 'Growth', 'Innovation'],
            recognition: 5,
            engagement: 6
          },
          {
            personalValues: ['Excellence', 'Achievement', 'Innovation', 'Accountability', 'Learning'],
            currentExperience: ['Excellence', 'Achievement', 'Learning'],
            desiredExperience: ['Excellence', 'Achievement', 'Innovation', 'Recognition', 'Autonomy'],
            recognition: 7,
            engagement: 8
          }
        ]
      };

      console.log('📤 Sending request to culture analysis endpoint...');
      
      const response = await fetch('http://localhost:3001/api/entry/analyze-culture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleData)
      });

      const result = await response.json();
      console.log('📥 Received analysis result:', result);
      
      setAnalysisResults(result);
      setStep('results');
    } catch (error) {
      console.error('❌ Culture analysis test failed:', error);
      alert('Test failed: ' + error.message);
      setStep('setup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-12">
          <Link href="/companies" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
            ← Back to Companies
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Complete Culture Analysis Test</h1>
          <p className="text-xl text-slate-600">Test the full 3-engine agent with employee and organization reports</p>
        </div>

        {step === 'setup' && (
          <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">What This Tests</h2>
              <ul className="space-y-2 text-blue-800">
                <li>✓ 3-Engine AI Agent processing</li>
                <li>✓ Framework mapping of employee responses</li>
                <li>✓ Personal values analysis</li>
                <li>✓ Culture alignment calculations</li>
                <li>✓ Employee report generation</li>
                <li>✓ Admin/organization report generation</li>
                <li>✓ Strategy-culture alignment assessment</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={testCultureFlow}
                disabled={loading}
                className="bg-slate-900 text-white px-12 py-4 rounded-xl text-lg font-medium hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {loading ? 'Running Analysis...' : 'Test Complete Culture Analysis'}
              </button>
            </div>
          </div>
        )}

        {step === 'analyzing' && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <span className="text-white text-2xl">🧠</span>
            </div>
            <h2 className="text-3xl font-light text-slate-900 mb-4">3-Engine AI Processing</h2>
            <p className="text-xl text-slate-600">Analyzing culture data through Knowledge, Data, and Reasoning engines...</p>
          </div>
        )}

        {step === 'results' && analysisResults && (
          <div className="space-y-8">
            
            {/* Overall Results */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-green-900 mb-6">✅ Analysis Complete!</h2>
              
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{analysisResults.analysis.overallScore}</div>
                  <div className="text-slate-600">Overall Culture Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500">{analysisResults.analysis.entropyScore}</div>
                  <div className="text-slate-600">Entropy Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{analysisResults.analysis.valuesAlignment}%</div>
                  <div className="text-slate-600">Values Alignment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{analysisResults.analysis.surveyAnalysis.totalResponses}</div>
                  <div className="text-slate-600">Employee Responses</div>
                </div>
              </div>
            </div>

            {/* Employee Report */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">👤 Employee Report Sample</h3>
              {analysisResults.analysis.reports.employeeReports.length > 0 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Personal Values Analysis:</h4>
                    <p className="text-slate-600">Selected Values: {analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.selectedValues.join(', ')}</p>
                    <p className="text-slate-600 mt-2">Primary Insight: {analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.insights[0]}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Culture Alignment:</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded">
                        <div className="text-2xl font-bold text-blue-600">{analysisResults.analysis.reports.employeeReports[0].cultureAlignment.currentVsPersonal}%</div>
                        <div className="text-xs text-slate-600">Current vs Personal</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded">
                        <div className="text-2xl font-bold text-green-600">{analysisResults.analysis.reports.employeeReports[0].cultureAlignment.desiredVsPersonal}%</div>
                        <div className="text-xs text-slate-600">Desired vs Personal</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded">
                        <div className="text-2xl font-bold text-amber-600">{analysisResults.analysis.reports.employeeReports[0].cultureAlignment.currentVsDesired}%</div>
                        <div className="text-xs text-slate-600">Current vs Desired</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Recognition & Engagement:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-amber-50 rounded">
                        <div className="text-2xl font-bold text-amber-600">{analysisResults.analysis.reports.employeeReports[0].recognitionAnalysis.score}/10</div>
                        <div className="text-xs text-slate-600">Recognition ({analysisResults.analysis.reports.employeeReports[0].recognitionAnalysis.benchmarkComparison})</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-2xl font-bold text-green-600">{analysisResults.analysis.reports.employeeReports[0].engagementAnalysis.score}/10</div>
                        <div className="text-xs text-slate-600">Engagement ({analysisResults.analysis.reports.employeeReports[0].engagementAnalysis.benchmarkComparison})</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Report */}
            <div className="bg-slate-50 border border-slate-300 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">🏢 Organization Report</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Organizational Overview:</h4>
                  <p className="text-slate-600">Total Responses: {analysisResults.analysis.reports.adminReport.organizationalOverview.totalResponses}</p>
                  <p className="text-slate-600">Response Rate: {analysisResults.analysis.reports.adminReport.organizationalOverview.responseRate}</p>
                  <p className="text-slate-600">Analysis Quality: {analysisResults.analysis.reports.adminReport.organizationalOverview.analysisCompleteness}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Culture Health:</h4>
                  <p className="text-slate-600">Overall Health: {analysisResults.analysis.reports.adminReport.cultureHealth.overallHealth}/100</p>
                  <p className="text-slate-600">Entropy Level: {analysisResults.analysis.reports.adminReport.cultureHealth.entropyLevel}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Strategy Alignment:</h4>
                  <p className="text-slate-600">Culture Supports Strategy: {analysisResults.analysis.reports.adminReport.strategyAlignment.cultureSupportsStrategy ? '✅ Yes' : '❌ No'}</p>
                  <p className="text-slate-600">Alignment Score: {analysisResults.analysis.reports.adminReport.strategyAlignment.alignmentScore}%</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setStep('setup');
                  setAnalysisResults(null);
                  localStorage.removeItem('cultureAnalysisResults');
                }}
                className="bg-slate-600 text-white px-8 py-3 rounded-xl hover:bg-slate-700 transition-all"
              >
                Test Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

