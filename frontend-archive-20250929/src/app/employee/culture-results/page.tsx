"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Heart, Target, TrendingUp, ArrowLeft } from 'lucide-react';

export default function CultureResultsPage() {
  const [employeeReport, setEmployeeReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load employee culture report from localStorage or API
    const loadReport = async () => {
      try {
        // Get results from localStorage (stored by survey submission)
        const storedResults = localStorage.getItem('cultureAnalysisResults');
        
        if (storedResults) {
          const analysisData = JSON.parse(storedResults);
          console.log('Loaded analysis data:', analysisData);
          
          if (analysisData.success && analysisData.analysis.reports.employeeReports.length > 0) {
            setEmployeeReport(analysisData.analysis.reports.employeeReports[0]);
            setLoading(false);
            return;
          }
        }
        
        // Fallback to sample report for demo
        const sampleReport = {
          employeeId: 'emp_demo',
          personalValuesAnalysis: {
            selectedValues: ['Trust', 'Innovation', 'Learning', 'Accountability'],
            frameworkMapping: [
              { cylinderName: 'Belonging & Loyalty', matchingValues: ['Trust'], score: 1 },
              { cylinderName: 'Growth & Achievement', matchingValues: ['Learning'], score: 1 },
              { cylinderName: 'Meaning & Contribution', matchingValues: ['Innovation'], score: 1 },
              { cylinderName: 'Integrity & Justice', matchingValues: ['Accountability'], score: 1 }
            ],
            personalityInsights: {
              primaryCylinder: { name: 'Growth & Achievement', ethicalPrinciple: 'Honor & Excellence' },
              insights: [
                'Your strongest affinity is with Growth & Achievement (Honor & Excellence)',
                'You value Learning, Innovation which reflects Growth & Achievement principles',
                'Consider developing Safety & Survival aspects for more balanced growth'
              ]
            }
          },
          cultureAlignment: {
            currentVsPersonal: 65,
            desiredVsPersonal: 85,
            currentVsDesired: 70,
            recommendations: [
              'Seek opportunities to apply your innovation skills more frequently',
              'Request more learning and development opportunities',
              'Consider mentoring others to strengthen trust-building'
            ]
          },
          recognitionAnalysis: {
            score: 6,
            benchmarkComparison: 'Average',
            recommendations: [
              'Discuss recognition preferences with your manager',
              'Participate in peer recognition programs',
              'Document and share your achievements more visibly'
            ]
          },
          engagementAnalysis: {
            score: 7,
            benchmarkComparison: 'Above Average',
            recommendations: [
              'Continue leveraging your high engagement to mentor others',
              'Seek stretch assignments that align with your values',
              'Consider leadership development opportunities'
            ]
          }
        };
        
        setEmployeeReport(sampleReport);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load report:', error);
        setLoading(false);
      }
    };
    
    loadReport();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600 font-light">Generating your personal culture report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/companies" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Your Culture Report</span>
          </Link>
          <Link href="/employee/culture-survey" className="flex items-center text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Survey
          </Link>
        </div>
      </nav>

      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-light text-slate-900 mb-4">Your Personal Culture Analysis</h1>
            <p className="text-xl text-slate-600 font-light">
              Based on your responses to the Mizan 7-cylinders framework survey
            </p>
          </div>

          {/* Personal Values Analysis */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12">
            <div className="flex items-center mb-8">
              <Heart className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-3xl font-light text-slate-900">Your Personal Values</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-medium text-slate-900 mb-6">Selected Values</h3>
                <div className="grid grid-cols-2 gap-3">
                  {employeeReport.personalValuesAnalysis.selectedValues.map((value, index) => (
                    <div key={index} className="bg-blue-50 text-blue-900 px-4 py-2 rounded-xl text-center font-light">
                      {value}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-slate-900 mb-6">Framework Mapping</h3>
                <div className="space-y-4">
                  {employeeReport.personalValuesAnalysis.frameworkMapping
                    .filter(mapping => mapping.score > 0)
                    .map((mapping, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <div className="font-medium text-slate-900">{mapping.cylinderName}</div>
                        <div className="text-sm text-slate-600 font-light">
                          {mapping.matchingValues.join(', ')}
                        </div>
                      </div>
                      <div className="text-2xl font-light text-blue-600">{mapping.score}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Personality Insights */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-medium text-slate-900 mb-6">Personality Insights</h3>
              <div className="bg-slate-900 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="text-2xl font-light text-white mb-2">
                    Primary Cylinder: {employeeReport.personalValuesAnalysis.personalityInsights.primaryCylinder.name}
                  </div>
                  <div className="text-slate-300 font-light">
                    {employeeReport.personalValuesAnalysis.personalityInsights.primaryCylinder.ethicalPrinciple}
                  </div>
                </div>
                <ul className="space-y-3">
                  {employeeReport.personalValuesAnalysis.personalityInsights.insights.map((insight, index) => (
                    <li key={index} className="text-slate-300 font-light leading-relaxed">
                      • {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Culture Alignment Analysis */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12">
            <div className="flex items-center mb-8">
              <Target className="w-8 h-8 text-amber-500 mr-4" />
              <h2 className="text-3xl font-light text-slate-900">Culture Alignment</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-light text-blue-600 mb-2">
                  {employeeReport.cultureAlignment.currentVsPersonal}%
                </div>
                <div className="text-slate-600 font-light">Current vs Personal Values</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-green-600 mb-2">
                  {employeeReport.cultureAlignment.desiredVsPersonal}%
                </div>
                <div className="text-slate-600 font-light">Desired vs Personal Values</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-amber-500 mb-2">
                  {employeeReport.cultureAlignment.currentVsDesired}%
                </div>
                <div className="text-slate-600 font-light">Current vs Desired Experience</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-slate-900 mb-6">Personal Recommendations</h3>
              <ul className="space-y-3">
                {employeeReport.cultureAlignment.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <span className="text-slate-700 font-light leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recognition & Engagement */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Recognition Analysis */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white font-medium text-lg">{employeeReport.recognitionAnalysis.score}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900">Recognition Level</h3>
                  <p className="text-slate-600 font-light">{employeeReport.recognitionAnalysis.benchmarkComparison}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {employeeReport.recognitionAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-slate-700 font-light text-sm">• {rec}</li>
                ))}
              </ul>
            </div>

            {/* Engagement Analysis */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white font-medium text-lg">{employeeReport.engagementAnalysis.score}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900">Engagement Level</h3>
                  <p className="text-slate-600 font-light">{employeeReport.engagementAnalysis.benchmarkComparison}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {employeeReport.engagementAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-slate-700 font-light text-sm">• {rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-slate-900 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-light text-white mb-6">What's Next?</h2>
            <p className="text-xl text-slate-300 font-light mb-8">
              Your personal culture analysis is complete. Work with your manager and HR team 
              to align your development with organizational goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/employee/culture-survey" className="group">
                <div className="bg-white text-slate-900 px-8 py-3 rounded-xl font-light hover:bg-slate-100 transition-all">
                  Retake Survey
                </div>
              </Link>
              <Link href="/companies" className="group">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-light hover:from-amber-600 hover:to-amber-700 transition-all">
                  Learn More About Mizan
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
