'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, TrendingUp, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { FrameworkIntro } from '@/components/culture/FrameworkIntro';
import { Radar } from 'react-chartjs-2';

// Define types for the new 4-section report structure
interface IdentifiedStrength {
    name: string;
    explanation: string;
    behavioralIndicators: string[];
    cylinderLevel: number;
}

interface EngagementStrategy {
    strength: string;
    engagementAction: string;
    expectedImpact: string;
}

interface ReflectionQuestion {
    question: string;
    purpose: string;
}

interface Report {
    employeeName: string;
    assessmentDate: string;

    // SECTION 1: What Your Values Mean
    personalValues: {
        selected: string[];
        cylinderScores: { [key: string]: number };
        interpretation: string;
    };

    // SECTION 2: How Your Strengths Build Healthy Culture
    strengthsAnalysis: {
        identifiedStrengths: IdentifiedStrength[];
        pathwayToHealth: string;
        keyInsights: string[];
    };

    // SECTION 3: Increase Engagement Using Your Strengths
    engagementStrategy: {
        currentLevel: number;
        strengthsToLeverage: EngagementStrategy[];
        actionableSteps: string[];
        expectedImpact: string;
    };

    // SECTION 4: Customized Reflection Questions
    reflectionQuestions: ReflectionQuestion[];

    generatedAt: string;
}

export default function SurveyReportPage() {
  const params = useParams();
  const token = params.token as string;
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');
  const [showFrameworkIntro, setShowFrameworkIntro] = useState(true);
  const [pollingAttempts, setPollingAttempts] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/culture-assessment/report/survey/${token}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to load report');
      }

      const data = await response.json();
      setReport(data.report);
      setStatus(data.status);

      // If report is ready, stop polling
      if (data.status === 'completed' && data.report) {
        return true; // Signal that polling should stop
      }
      return false;
    } catch (err: unknown) {
      console.error('Report fetch error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load report';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Auto-polling effect with progress tracking
  useEffect(() => {
    let pollingInterval: NodeJS.Timeout | null = null;
    let timerInterval: NodeJS.Timeout | null = null;
    let isPolling = true;

    const startPolling = async () => {
      // Initial fetch
      const reportReady = await fetchReport();
      if (reportReady) {
        isPolling = false;
        return;
      }

      // Start progress timer (update every second)
      timerInterval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

      // Poll every 10 seconds for up to 5 minutes (30 attempts)
      pollingInterval = setInterval(async () => {
        if (!isPolling) {
          if (pollingInterval) clearInterval(pollingInterval);
          if (timerInterval) clearInterval(timerInterval);
          return;
        }

        setPollingAttempts(prev => {
          const newAttempts = prev + 1;

          // Stop after 30 attempts (5 minutes)
          if (newAttempts >= 30) {
            isPolling = false;
            if (pollingInterval) clearInterval(pollingInterval);
            if (timerInterval) clearInterval(timerInterval);
            setError('Report generation is taking longer than expected. Please contact support.');
          }

          return newAttempts;
        });

        const reportReady = await fetchReport();
        if (reportReady) {
          isPolling = false;
          if (pollingInterval) clearInterval(pollingInterval);
          if (timerInterval) clearInterval(timerInterval);
        }
      }, 10000); // Poll every 10 seconds
    };

    startPolling();

    // Cleanup on unmount
    return () => {
      isPolling = false;
      if (pollingInterval) clearInterval(pollingInterval);
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-mizan-gold animate-spin mx-auto mb-4" />
          <p className="text-mizan-secondary">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  if (error || status === 'pending') {
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          {error ? (
            <>
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-mizan-primary mb-4">
                Unable to Load Report
              </h1>
              <p className="text-mizan-secondary mb-6">{error}</p>
              <button
                onClick={fetchReport}
                className="w-full px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </>
          ) : (
            <>
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Loader2 className="w-16 h-16 text-mizan-gold animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-mizan-primary mb-4">
                Generating Your Personalized Report
              </h1>
              <p className="text-mizan-secondary mb-2">
                Our AI agents are analyzing your responses using the Mizan 7-Cylinder Framework to create personalized insights.
              </p>
              <p className="text-sm text-mizan-secondary/70 mb-6">
                This typically takes 2-3 minutes. We'll automatically update when ready.
              </p>

              {/* Progress Indicator */}
              <div className="bg-mizan-primary/5 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-mizan-primary">Processing...</span>
                  <span className="text-sm font-mono text-mizan-gold">{formatTime(elapsedSeconds)}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-mizan-gold to-mizan-primary rounded-full transition-all duration-1000 animate-pulse"
                    style={{ width: `${Math.min((elapsedSeconds / 180) * 100, 95)}%` }}
                  />
                </div>
                <p className="text-xs text-mizan-secondary/60 mt-2">
                  Poll attempt {pollingAttempts} of 30
                </p>
              </div>

              <button
                onClick={fetchReport}
                disabled={loading}
                className="w-full px-6 py-3 bg-mizan-primary/10 text-mizan-primary rounded-xl hover:bg-mizan-primary/20 transition-all duration-400 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                <span>Check Now</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-mizan-primary mb-4">
            Report Not Found
          </h1>
          <p className="text-mizan-secondary">
            {error || 'Unable to load your culture analysis report.'}
          </p>
        </div>
      </div>
    );
  }

  // Show framework intro before the report
  if (showFrameworkIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 p-4 md:p-8">
        <FrameworkIntro onContinue={() => setShowFrameworkIntro(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-mizan-gold/20">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold text-mizan-primary">Your Culture Analysis Report</h1>
          </div>
          <p className="text-mizan-secondary">
            Personalized insights based on your values, experiences, and aspirations.
          </p>
        </div>

        {/* SECTION 1: What Your Values Mean */}
        {report.personalValues && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-mizan-primary mb-6">
              1. What Your Values Mean
            </h2>
            <div className="prose prose-mizan max-w-none">
              <p className="text-mizan-secondary leading-relaxed whitespace-pre-line">
                {report.personalValues.interpretation}
              </p>
            </div>
          </div>
        )}

        {/* SECTION 2: How Your Strengths Build Healthy Culture */}
        {report.strengthsAnalysis && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-mizan-primary mb-6">
              2. How Your Strengths Build Healthy Culture
            </h2>

            {/* Key Insights */}
            {report.strengthsAnalysis.keyInsights && report.strengthsAnalysis.keyInsights.length > 0 && (
              <div className="mb-8 p-6 bg-mizan-gold/10 rounded-xl border-l-4 border-mizan-gold">
                <h3 className="font-semibold text-mizan-primary mb-3">Key Insights</h3>
                <ul className="space-y-2">
                  {report.strengthsAnalysis.keyInsights.map((insight: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-mizan-gold flex-shrink-0 mt-0.5" />
                      <span className="text-mizan-secondary">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Identified Strengths with Detailed Explanations */}
            {report.strengthsAnalysis.identifiedStrengths && report.strengthsAnalysis.identifiedStrengths.length > 0 && (
              <div className="space-y-6 mb-8">
                <h3 className="font-semibold text-mizan-primary text-lg">Your Identified Strengths</h3>
                {report.strengthsAnalysis.identifiedStrengths.map((strength, idx) => (
                  <div key={idx} className="p-6 bg-mizan-primary/5 rounded-xl">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-mizan-gold rounded-full flex items-center justify-center text-white font-bold">
                        {strength.cylinderLevel}
                      </div>
                      <h4 className="text-xl font-semibold text-mizan-primary">{strength.name}</h4>
                    </div>
                    <p className="text-mizan-secondary mb-4 leading-relaxed">{strength.explanation}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-mizan-primary">Behavioral Indicators:</span>
                      {strength.behavioralIndicators.map((indicator, i) => (
                        <span key={i} className="px-3 py-1 bg-white rounded-full text-sm text-mizan-secondary border border-mizan-primary/20">
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pathway to Cultural Health */}
            {report.strengthsAnalysis.pathwayToHealth && (
              <div className="p-6 bg-gradient-to-r from-mizan-primary/5 to-mizan-gold/5 rounded-xl">
                <h3 className="font-semibold text-mizan-primary mb-3 text-lg">Your Pathway to Cultural Health</h3>
                <p className="text-mizan-secondary leading-relaxed whitespace-pre-line">
                  {report.strengthsAnalysis.pathwayToHealth}
                </p>
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: Increase Engagement Using Your Strengths */}
        {report.engagementStrategy && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-mizan-primary mb-6">
              3. Increase Engagement Using Your Strengths
            </h2>

            {/* Current Engagement Level */}
            <div className="mb-8 p-6 bg-mizan-primary/5 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-mizan-primary">Current Engagement Level</span>
                <span className="text-3xl font-bold text-mizan-gold">{report.engagementStrategy.currentLevel}/5</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-mizan-gold to-mizan-primary rounded-full transition-all duration-500"
                  style={{ width: `${(report.engagementStrategy.currentLevel / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Strengths to Leverage */}
            {report.engagementStrategy.strengthsToLeverage && report.engagementStrategy.strengthsToLeverage.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-mizan-primary mb-4 text-lg">How to Leverage Your Strengths</h3>
                <div className="space-y-4">
                  {report.engagementStrategy.strengthsToLeverage.map((strategy, idx) => (
                    <div key={idx} className="p-5 border border-mizan-primary/20 rounded-xl hover:border-mizan-gold transition-colors">
                      <h4 className="font-semibold text-mizan-primary mb-2">{strategy.strength}</h4>
                      <p className="text-mizan-secondary mb-3"><strong>Action:</strong> {strategy.engagementAction}</p>
                      <p className="text-sm text-mizan-secondary/80 italic">
                        <strong>Expected Impact:</strong> {strategy.expectedImpact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actionable Steps */}
            {report.engagementStrategy.actionableSteps && report.engagementStrategy.actionableSteps.length > 0 && (
              <div className="p-6 bg-mizan-gold/10 rounded-xl">
                <h3 className="font-semibold text-mizan-primary mb-4 text-lg">Your Action Plan</h3>
                <ul className="space-y-3">
                  {report.engagementStrategy.actionableSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-mizan-gold rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-mizan-secondary">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: Customized Reflection Questions */}
        {report.reflectionQuestions && report.reflectionQuestions.length > 0 && (
          <div className="bg-gradient-to-br from-mizan-primary to-mizan-primary/90 text-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">4. Reflection Questions for Your Growth</h2>
            <p className="mb-6 text-white/90">
              These personalized questions are designed to deepen your self-awareness and guide your development journey.
            </p>
            <div className="space-y-6">
              {report.reflectionQuestions.map((item, idx) => (
                <div key={idx} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="text-lg font-medium mb-2">{item.question}</p>
                  <p className="text-sm text-white/80 italic">{item.purpose}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
