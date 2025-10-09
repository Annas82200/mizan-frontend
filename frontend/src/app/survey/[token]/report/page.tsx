'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, TrendingUp, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { FrameworkIntro } from '@/components/culture/FrameworkIntro';

export default function SurveyReportPage() {
  const params = useParams();
  const token = params.token as string;
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');
  const [showFrameworkIntro, setShowFrameworkIntro] = useState(true);

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
    } catch (err: any) {
      console.error('Report fetch error:', err);
      setError(err.message || 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          <AlertCircle className="w-16 h-16 text-mizan-gold mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-mizan-primary mb-4">
            Your Report is Being Generated
          </h1>
          <p className="text-mizan-secondary mb-6">
            Our AI agents are analyzing your responses and creating personalized insights. This usually takes 1-2 minutes.
          </p>
          <button
            onClick={fetchReport}
            className="w-full px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Check Again</span>
          </button>
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

            {report.overallSummary.keyStrengths && report.overallSummary.keyStrengths.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-mizan-primary mb-3">Your Key Strengths</h3>
                <ul className="space-y-2">
                  {report.overallSummary.keyStrengths.map((strength: string, idx: number) => (
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
                <ul className="space-y-2">
                  {report.overallSummary.developmentAreas.map((area: any, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <TrendingUp className="w-5 h-5 text-mizan-gold flex-shrink-0 mt-0.5" />
                      <span className="text-mizan-secondary">{area.title || area}</span>
                    </li>
                  ))}
                </ul>
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
