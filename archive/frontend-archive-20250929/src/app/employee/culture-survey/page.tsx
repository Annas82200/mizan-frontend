"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Users, Heart, Target, Star, TrendingUp } from 'lucide-react';

export default function CultureSurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({
    personalValues: [],
    currentExperience: [],
    desiredCulture: [],
    recognition: 5,
    engagement: 5
  });
  const [frameworkValues, setFrameworkValues] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Load framework values dynamically
  useEffect(() => {
    const loadFrameworkValues = async () => {
      try {
        const response = await fetch('/mizan-framework-updated.json');
        if (!response.ok) throw new Error('Framework file not found');
        
        const framework = await response.json();
        
        // Extract ALL values (positive AND limiting)
        const allValues = framework.flatMap(cylinder => [
          ...cylinder.positiveValues.map(value => ({
            name: value.name,
            definition: value.definition,
            cylinder: cylinder.name,
            type: 'enabling'
          })),
          ...cylinder.limitingValues.map(value => ({
            name: value.name,
            definition: value.definition,
            cylinder: cylinder.name,
            type: 'limiting'
          }))
        ]);
        
        const uniqueValues = allValues.filter((value, index, self) => 
          index === self.findIndex(v => v.name === value.name)
        ).sort((a, b) => a.name.localeCompare(b.name));
        
        setFrameworkValues(uniqueValues);
      } catch (error) {
        console.error('Failed to load framework:', error);
      }
    };
    
    loadFrameworkValues();
  }, []);

  const questions = [
    {
      id: 'personalValues',
      title: 'Which values guide your life and work decisions?',
      subtitle: 'Choose up to 10 values that truly resonate with who you are',
      type: 'multiselect',
      maxSelections: 10,
      icon: Heart
    },
    {
      id: 'currentExperience',
      title: 'Which values do you actually experience in your workplace today?',
      subtitle: 'Select up to 10 values that reflect your current reality at work',
      type: 'multiselect',
      maxSelections: 10,
      icon: Users
    },
    {
      id: 'desiredCulture',
      title: 'Which values would create your ideal workplace culture?',
      subtitle: 'Choose up to 10 values that would make you thrive at work',
      type: 'multiselect',
      maxSelections: 10,
      icon: Target
    },
    {
      id: 'recognition',
      title: 'How valued and appreciated do you feel for your contributions?',
      subtitle: 'Rate how well your work and efforts are recognized',
      type: 'slider',
      min: 1,
      max: 10,
      icon: Star
    },
    {
      id: 'engagement',
      title: 'How energized and motivated do you feel about your work?',
      subtitle: 'Rate your current level of enthusiasm and connection to your role',
      type: 'slider',
      min: 1,
      max: 10,
      icon: TrendingUp
    }
  ];

  const handleValueToggle = (questionId, valueName) => {
    const currentSelections = responses[questionId] || [];
    const question = questions.find(q => q.id === questionId);
    
    if (currentSelections.includes(valueName)) {
      setResponses({
        ...responses,
        [questionId]: currentSelections.filter(v => v !== valueName)
      });
    } else if (currentSelections.length < question.maxSelections) {
      setResponses({
        ...responses,
        [questionId]: [...currentSelections, valueName]
      });
    }
  };

  const handleSliderChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: parseInt(value)
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      console.log('Submitting survey responses:', responses);
      
      const payload = {
        orgName: 'Demo Organization',
        industry: 'Technology',
        companyValues: ['Innovation', 'Trust', 'Excellence'],
        companyVision: 'To be the leading technology company',
        companyMission: 'Empowering people through technology',
        companyStrategy: 'Build innovative products that transform industries',
        employeeResponses: [responses]
      };
      
      console.log('Sending payload:', payload);
      
      const response = await fetch('http://localhost:3001/api/entry/analyze-culture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log('Analysis result:', result);
      
      if (result.success) {
        setAnalysisResults(result);
        setShowResults(true);
        console.log('✅ Analysis completed successfully');
      } else {
        console.error('Analysis failed:', result);
        alert('Analysis failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Survey submission failed:', error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = currentQ.type === 'multiselect' 
    ? responses[currentQ.id]?.length > 0 
    : responses[currentQ.id] !== undefined;

  // Show results if analysis is complete
  if (showResults && analysisResults) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="bg-white border-b border-slate-200 px-6 py-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/companies" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Mizan" className="w-10 h-10" />
              <div>
                <div className="text-2xl font-light text-slate-800">Mizan</div>
                <div className="text-sm text-slate-600 font-light">Culture Analysis Results</div>
              </div>
            </Link>
          </div>
        </nav>

        <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-extralight text-slate-900 mb-6">Your Culture Analysis</h1>
              <p className="text-2xl text-slate-600 font-light">3-Engine AI Analysis Complete</p>
            </div>

            {/* Overall Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-light text-blue-600 mb-2">{analysisResults.analysis.overallScore}</div>
                <div className="text-slate-600 font-light">Overall Culture Score</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-light text-amber-500 mb-2">{analysisResults.analysis.entropyScore}</div>
                <div className="text-slate-600 font-light">Entropy Score</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-light text-green-600 mb-2">{analysisResults.analysis.valuesAlignment}%</div>
                <div className="text-slate-600 font-light">Values Alignment</div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
                <div className="text-4xl font-light text-purple-600 mb-2">{analysisResults.analysis.surveyAnalysis.totalResponses}</div>
                <div className="text-slate-600 font-light">Responses Analyzed</div>
              </div>
            </div>

            {/* Employee Report with Detailed Explanations */}
            {analysisResults.analysis.reports.employeeReports.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-12 mb-8">
                <h2 className="text-3xl font-extralight text-slate-900 mb-12 text-center">Your Personal Culture Analysis</h2>
                
                <div className="space-y-12">
                  
                  {/* Personal Values Section with Detailed Framework Analysis */}
                  <div className="bg-white rounded-xl p-8">
                    <h3 className="text-2xl font-light text-slate-900 mb-6">Your Personal Values Profile</h3>
                    <div className="space-y-6">
                      <p className="text-lg text-slate-700 leading-relaxed">
                        You selected these values as most important to you: <strong>{analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.selectedValues.join(', ')}</strong>
                      </p>
                      
                      {/* Detailed Insights with Enhanced Framework Analysis */}
                      {analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.insights && 
                       analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.insights.map((insight, index) => (
                        <div key={index} className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg p-6 border-l-4 border-blue-500">
                          <h4 className="font-semibold text-slate-900 mb-3 text-lg">{insight.title}</h4>
                          <p className="text-slate-700 leading-relaxed mb-4">{insight.content}</p>
                          
                          {/* Enhanced psychological and work insights */}
                          {insight.psychologicalProfile && (
                            <div className="mb-4 p-4 bg-white/50 rounded-lg">
                              <h5 className="font-medium text-slate-900 mb-2">Psychological Profile</h5>
                              <p className="text-slate-700 text-sm leading-relaxed">{insight.psychologicalProfile}</p>
                            </div>
                          )}
                          
                          {insight.workStyleInsights && (
                            <div className="mb-4 p-4 bg-white/50 rounded-lg">
                              <h5 className="font-medium text-slate-900 mb-2">Work Style Insights</h5>
                              <p className="text-slate-700 text-sm leading-relaxed">{insight.workStyleInsights}</p>
                            </div>
                          )}
                          
                          {insight.decisionMakingStyle && (
                            <div className="mb-4 p-4 bg-white/50 rounded-lg">
                              <h5 className="font-medium text-slate-900 mb-2">Decision-Making Style</h5>
                              <p className="text-slate-700 text-sm leading-relaxed">{insight.decisionMakingStyle}</p>
                            </div>
                          )}
                          
                          {/* Individual value meanings */}
                          {insight.selectedValues && insight.selectedValues.length > 0 && (
                            <div className="mt-4">
                              <h5 className="font-medium text-slate-900 mb-3">Your Core Values Explained</h5>
                              <div className="space-y-3">
                                {insight.selectedValues.map((value, valueIndex) => (
                                  <div key={valueIndex} className="bg-white/70 rounded-lg p-4">
                                    <h6 className="font-medium text-slate-900 mb-2">{value.name} ({value.type === 'enabling' ? 'Enabling' : 'Limiting'})</h6>
                                    <p className="text-slate-700 text-sm leading-relaxed mb-2">{value.definition}</p>
                                    {value.personalMeaning && (
                                      <p className="text-slate-600 text-sm italic">{value.personalMeaning}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Enhanced Individual Value Explanations */}
                      {analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.valueExplanations && 
                       analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.valueExplanations.length > 0 && (
                        <div className="mt-8">
                          <h4 className="text-xl font-medium text-slate-900 mb-6">Deep Dive: Your Values in Action</h4>
                          <div className="space-y-6">
                            {analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.valueExplanations.map((explanation, index) => (
                              <div key={index} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                                <h5 className="font-semibold text-slate-900 mb-3 text-lg">{explanation.title}</h5>
                                <p className="text-slate-700 leading-relaxed mb-4">{explanation.content}</p>
                                
                                {/* Personal Meaning */}
                                {explanation.personalMeaning && (
                                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                    <h6 className="font-medium text-slate-900 mb-2">What This Means for You</h6>
                                    <p className="text-slate-700 text-sm leading-relaxed">{explanation.personalMeaning}</p>
                                  </div>
                                )}
                                
                                {/* Workplace Implications */}
                                {explanation.workplaceImplications && (
                                  <div className="mb-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                                    <h6 className="font-medium text-slate-900 mb-2">Workplace Implications</h6>
                                    <p className="text-slate-700 text-sm leading-relaxed">{explanation.workplaceImplications}</p>
                                  </div>
                                )}
                                
                                {/* Behavioral Indicators */}
                                {explanation.behavioralIndicators && explanation.behavioralIndicators.length > 0 && (
                                  <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                                    <h6 className="font-medium text-slate-900 mb-3">How This Shows Up in Your Behavior</h6>
                                    <ul className="space-y-1">
                                      {explanation.behavioralIndicators.map((indicator, indicatorIndex) => (
                                        <li key={indicatorIndex} className="text-slate-700 text-sm flex items-start">
                                          <span className="text-amber-500 mr-2 mt-1">•</span>
                                          <span>{indicator}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cylinder Profile Visualization */}
                      {analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.cylinderProfile && (
                        <div className="mt-8">
                          <h4 className="text-xl font-medium text-slate-900 mb-4">Your Ethical Framework Profile</h4>
                          <div className="space-y-3">
                            {analysisResults.analysis.reports.employeeReports[0].personalValuesAnalysis.cylinderProfile
                              .filter(cylinder => cylinder.score > 0)
                              .map((cylinder, index) => (
                                <div key={index} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4">
                                  <div className="flex-1">
                                    <div className="font-medium text-slate-900">{cylinder.name}</div>
                                    <div className="text-sm text-slate-600">{cylinder.ethicalPrinciple}</div>
                                    <div className="text-xs text-slate-500 mt-1">{cylinder.definition}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">{cylinder.percentage}%</div>
                                    <div className="text-xs text-slate-500">{cylinder.score} values</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Culture Alignment with Explanations */}
                  <div className="bg-white rounded-xl p-8">
                    <h3 className="text-2xl font-light text-slate-900 mb-6">How Well Your Values Align</h3>
                    
                    <div className="space-y-8">
                      <div className="border border-slate-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-medium text-slate-900">Current Workplace vs Your Values</h4>
                          <div className="text-4xl font-bold text-blue-600">{analysisResults.analysis.reports.employeeReports[0].cultureAlignment.currentVsPersonal}%</div>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          This shows how much your current workplace experience aligns with your personal values. 
                          {analysisResults.analysis.reports.employeeReports[0].cultureAlignment.currentVsPersonal >= 70 
                            ? ' You have strong alignment - your workplace reflects many of your core values.'
                            : analysisResults.analysis.reports.employeeReports[0].cultureAlignment.currentVsPersonal >= 50
                            ? ' You have moderate alignment - some of your values are reflected in your workplace.'
                            : ' You have low alignment - your workplace may not reflect many of your important values.'}
                        </p>
                      </div>

                      <div className="border border-slate-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-medium text-slate-900">Your Ideal Culture vs Your Values</h4>
                          <div className="text-4xl font-bold text-green-600">{analysisResults.analysis.reports.employeeReports[0].cultureAlignment.desiredVsPersonal}%</div>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          This measures how well your ideal workplace culture would align with your personal values.
                          {analysisResults.analysis.reports.employeeReports[0].cultureAlignment.desiredVsPersonal >= 80 
                            ? ' Excellent alignment - you have a clear vision of a culture that would support your values.'
                            : ' This suggests you may want to refine your vision of an ideal workplace culture.'}
                        </p>
                      </div>

                      <div className="border border-slate-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-medium text-slate-900">Current Reality vs Your Ideal</h4>
                          <div className="text-4xl font-bold text-amber-600">{analysisResults.analysis.reports.employeeReports[0].cultureAlignment.currentVsDesired}%</div>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          This shows the gap between your current workplace experience and your ideal culture.
                          {analysisResults.analysis.reports.employeeReports[0].cultureAlignment.currentVsDesired >= 70 
                            ? ' Small gap - your current workplace is relatively close to your ideal.'
                            : analysisResults.analysis.reports.employeeReports[0].cultureAlignment.currentVsDesired >= 50
                            ? ' Moderate gap - there are opportunities to improve your workplace culture.'
                            : ' Significant gap - there may be substantial opportunities for cultural improvement.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Engagement Analysis Only (No Recognition for Employee) */}
                  <div className="bg-white rounded-xl p-8">
                    <h3 className="text-2xl font-light text-slate-900 mb-6">Your Engagement Level</h3>
                    <div className="border border-slate-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-medium text-slate-900">Work Engagement</h4>
                        <div className="text-5xl font-bold text-green-600">{analysisResults.analysis.reports.employeeReports[0].engagementAnalysis.score}/10</div>
                      </div>
                      <p className="text-slate-700 leading-relaxed mb-4">
                        Your engagement level is <strong>{analysisResults.analysis.reports.employeeReports[0].engagementAnalysis.benchmarkComparison.toLowerCase()}</strong>.
                        {analysisResults.analysis.reports.employeeReports[0].engagementAnalysis.score >= 8 
                          ? ' You feel highly energized and motivated by your work, which is excellent for both your wellbeing and performance.'
                          : analysisResults.analysis.reports.employeeReports[0].engagementAnalysis.score >= 6
                          ? ' You have a healthy level of motivation, with room to grow in areas that could increase your energy and connection to work.'
                          : ' You may benefit from exploring ways to increase your connection and motivation at work.'}
                      </p>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-medium text-green-900 mb-2">What This Means</h4>
                        <p className="text-green-800 leading-relaxed">
                          Engagement reflects how energized, motivated, and connected you feel to your work. Higher engagement 
                          is associated with better performance, job satisfaction, and overall wellbeing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Organization Report - FOR TESTING ONLY, REMOVE IN PRODUCTION */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
                <h2 className="text-2xl font-light text-slate-900 mb-6">Admin Insights (Testing Only - Remove in Production)</h2>
                <div className="space-y-6">
                  
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-medium text-slate-900 mb-4">Current Experience Analysis</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>What employees currently experience:</strong> Based on survey responses, employees are experiencing 
                      values like Trust and Learning most frequently in the workplace.
                    </p>
                    <p className="text-slate-700">
                      <strong>Culture Health Score:</strong> {analysisResults.analysis.reports.adminReport.cultureHealth.overallHealth}/100 - 
                      This reflects how healthy the current culture is based on employee responses.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-medium text-slate-900 mb-4">Intended Culture vs Current</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Company Values (Intended):</strong> Innovation, Trust, Excellence - These are mapped to the Mizan framework 
                      to understand which cylinders the company wants to emphasize.
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Current Culture Gap:</strong> The gap between intended company values and what employees actually experience.
                    </p>
                    <p className="text-slate-700">
                      <strong>Entropy Level:</strong> {analysisResults.analysis.reports.adminReport.cultureHealth.entropyLevel} - 
                      This measures cultural chaos/inconsistency. Lower is better.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-medium text-slate-900 mb-4">Desired Culture vs Intended</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Employee Desired Culture:</strong> What employees want to experience (their ideal workplace).
                    </p>
                    <p className="text-slate-700">
                      <strong>Gap Analysis:</strong> The difference between what the company intends (values) and what employees 
                      actually want to experience. This helps identify if company values align with employee aspirations.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-6">
                    <h3 className="font-medium text-slate-900 mb-4">Strategy Alignment</h3>
                    <p className="text-slate-700">
                      <strong>Culture Supports Strategy:</strong> {analysisResults.analysis.reports.adminReport.strategyAlignment.cultureSupportsStrategy ? 'Yes' : 'Needs Work'} - 
                      Based on whether the current culture can effectively support the company's strategic objectives.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => {
                  setShowResults(false);
                  setAnalysisResults(null);
                  setCurrentQuestion(0);
                  setResponses({
                    personalValues: [],
                    currentExperience: [],
                    desiredCulture: [],
                    recognition: 5,
                    engagement: 5
                  });
                }}
                className="bg-slate-600 text-white px-8 py-3 rounded-xl hover:bg-slate-700 transition-all mr-4"
              >
                Take Survey Again
              </button>
              <Link href="/companies" className="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-all">
                Back to Companies
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      {/* Clean Website Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200/50 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/companies" className="flex items-center space-x-4">
            <img src="/logo.png" alt="Mizan" className="w-12 h-12" />
            <div>
              <div className="text-3xl font-extralight text-slate-800">Mizan</div>
              <div className="text-slate-600 font-light tracking-wide">Culture Assessment</div>
            </div>
          </Link>
          <div className="text-slate-600 font-light text-xl">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </nav>

      {/* Minimal Progress Indicator */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentQuestion
                    ? 'bg-blue-500 scale-125'
                    : index < currentQuestion
                    ? 'bg-green-500'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
          <div className="w-full max-w-2xl mx-auto bg-slate-200 rounded-full h-0.5">
            <div 
              className="bg-gradient-to-r from-blue-600 to-amber-500 h-0.5 rounded-full transition-all duration-700"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Survey Content */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Question Header - No Generic Icons */}
          <div className="text-center mb-16">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mb-12 rounded-full"></div>
            <h1 className="text-6xl font-extralight text-slate-900 mb-8 leading-tight max-w-5xl mx-auto">{currentQ.title}</h1>
            <p className="text-2xl text-slate-600 font-light max-w-4xl mx-auto leading-relaxed">{currentQ.subtitle}</p>
          </div>

          {/* Question Content */}
          {currentQ.type === 'multiselect' ? (
            <div className="space-y-12">
              <div className="text-center">
                <div className="inline-flex items-center bg-slate-100 rounded-full px-6 py-3">
                  <span className="text-slate-700 font-medium text-lg">
                    {responses[currentQ.id]?.length || 0} / {currentQ.maxSelections} selected
                  </span>
                </div>
              </div>

              {/* Mixed Values Pool - Website Style */}
              <div className="bg-white border border-slate-200 rounded-lg p-8 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto">
                  {frameworkValues.map((value, index) => {
                    const isSelected = responses[currentQ.id]?.includes(value.name);
                    const canSelect = responses[currentQ.id]?.length < currentQ.maxSelections;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleValueToggle(currentQ.id, value.name)}
                        disabled={!isSelected && !canSelect}
                        className={`p-4 border rounded-lg text-center transition-all duration-300 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md'
                            : canSelect
                            ? 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm'
                            : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="font-medium text-sm mb-2">{value.name}</div>
                        <div className="text-xs font-light text-slate-600 leading-tight">{value.definition}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            // Slider Questions - Website Style
            <div className="bg-white rounded-2xl border border-slate-200 p-12 max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="text-8xl font-extralight text-slate-900 mb-4">
                  {responses[currentQ.id] || 5}
                </div>
                <div className="text-2xl text-slate-600 font-light">
                  {responses[currentQ.id] <= 3 ? 'Low' : 
                   responses[currentQ.id] <= 6 ? 'Moderate' : 
                   responses[currentQ.id] <= 8 ? 'High' : 'Very High'}
                </div>
              </div>

              <div className="space-y-8">
                <input
                  type="range"
                  min={currentQ.min}
                  max={currentQ.max}
                  value={responses[currentQ.id] || 5}
                  onChange={(e) => handleSliderChange(currentQ.id, e.target.value)}
                  className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-lg text-slate-500 font-light">
                  <span>Very Low (1)</span>
                  <span>Moderate (5)</span>
                  <span>Very High (10)</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8 border-t border-slate-200 max-w-4xl mx-auto">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`flex items-center px-8 py-4 rounded-xl font-light transition-all ${
                currentQuestion === 0
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="flex space-x-3">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentQuestion
                      ? 'bg-blue-500'
                      : index < currentQuestion
                      ? 'bg-green-500'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceed || submitting}
                className={`flex items-center px-8 py-4 rounded-xl font-light transition-all ${
                  canProceed && !submitting
                    ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 shadow-xl'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {submitting ? 'Analyzing...' : 'Complete Assessment'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={!canProceed}
                className={`flex items-center px-8 py-4 rounded-xl font-light transition-all ${
                  canProceed
                    ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 shadow-xl'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Next Question
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}