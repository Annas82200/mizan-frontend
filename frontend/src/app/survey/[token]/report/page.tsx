'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, TrendingUp, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { FrameworkIntro } from '@/components/culture/FrameworkIntro';
import { Radar } from 'react-chartjs-2';

// Define types for the report data
interface DevelopmentArea {
    area: string;
    description: string;
}

interface Report {
    employeeName: string;
    overallSummary: {
        strengths: string[];
        developmentAreas: DevelopmentArea[];
        nextSteps?: string[];
    };
    cylinderScores: {
        [key: string]: number;
    };
    personalValues?: {
        interpretation: string;
    };
    alignment?: {
        personalVsCurrent: number;
    };
    engagement?: {
        interpretation?: string;
        analysis?: string;
    };
    recognition?: {
        interpretation?: string;
        analysis?: string;
    };
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

        {/* Overall Summary */}
        {report.overallSummary && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-mizan-primary mb-6">Overall Summary</h2>

            {report.overallSummary.strengths && report.overallSummary.strengths.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-mizan-primary mb-3">Your Key Strengths</h3>
                <ul className="space-y-2">
                  {report.overallSummary.strengths.map((strength: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-mizan-secondary">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.overallSummary.developmentAreas && report.overallSummary.developmentAreas.length > 0 && (
              <div>
                <h3 className="font-semibold text-mizan-primary mb-3">Development Opportunities</h3>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4 text-mizan-secondary">Areas for Development</h3>
                  <ul className="space-y-4">
                    {report.overallSummary.developmentAreas.map((area, idx) => (
                      <li key={idx}>
                        <p className="font-semibold">{area.area}</p>
                        <p className="text-gray-600">{area.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Personal Values */}
        {report.personalValues && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-mizan-primary mb-6">Your Personal Values</h2>
            <div className="prose prose-mizan max-w-none">
              <p className="text-mizan-secondary mb-4">{report.personalValues.interpretation}</p>
            </div>
          </div>
        )}

        {/* Alignment */}
        {report.alignment && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-mizan-primary mb-6">Values Alignment</h2>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-mizan-secondary">Alignment Score</span>
                <span className="text-2xl font-bold text-mizan-primary">{report.alignment.personalVsCurrent}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-mizan-gold rounded-full transition-all duration-500"
                  style={{ width: `${report.alignment.personalVsCurrent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Engagement & Recognition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {report.engagement && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-mizan-primary mb-4">Engagement Insights</h3>
              <p className="text-mizan-secondary">{report.engagement.interpretation || report.engagement.analysis}</p>
            </div>
          )}

          {report.recognition && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-mizan-primary mb-4">Recognition Insights</h3>
              <p className="text-mizan-secondary">{report.recognition.interpretation || report.recognition.analysis}</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        {report.overallSummary?.nextSteps && (
          <div className="bg-mizan-primary text-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
            <ul className="space-y-3">
              {report.overallSummary.nextSteps.map((step: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-mizan-gold rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
