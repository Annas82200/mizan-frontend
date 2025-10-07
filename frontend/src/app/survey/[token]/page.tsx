'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Heart, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { MIZAN_VALUES_POOL, ALL_VALUES } from '@/lib/mizan-values';

interface SurveyData {
  personalValues: string[];
  currentExperience: string[];
  desiredExperience: string[];
  engagement: number;
  recognition: number;
}

export default function SurveyPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validToken, setValidToken] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [surveyData, setSurveyData] = useState<SurveyData>({
    personalValues: [],
    currentExperience: [],
    desiredExperience: [],
    engagement: 3,
    recognition: 3
  });

  // Validate token on mount
  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      setLoading(true);
      // TODO: Add token validation endpoint
      // For now, just check if token exists
      if (token && token.length > 0) {
        setValidToken(true);
      } else {
        setError('Invalid survey link');
      }
    } catch (err) {
      setError('Failed to validate survey link');
    } finally {
      setLoading(false);
    }
  };

  const toggleValue = (field: keyof Pick<SurveyData, 'personalValues' | 'currentExperience' | 'desiredExperience'>, value: string) => {
    setSurveyData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/culture-assessment/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          surveyToken: token,
          personalValues: surveyData.personalValues,
          currentExperience: surveyData.currentExperience,
          desiredExperience: surveyData.desiredExperience,
          engagement: surveyData.engagement,
          recognition: surveyData.recognition
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit survey');
      }

      setSubmitted(true);

      // Redirect to report page after 3 seconds
      setTimeout(() => {
        window.location.href = `/survey/${token}/report`;
      }, 3000);
    } catch (err: any) {
      console.error('Survey submission error:', err);
      setError(err.message || 'Failed to submit survey');
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return surveyData.personalValues.length === 10;
      case 2:
        return surveyData.currentExperience.length === 10;
      case 3:
        return surveyData.desiredExperience.length === 10;
      default:
        return true;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-mizan-gold animate-spin mx-auto mb-4" />
          <p className="text-mizan-secondary">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (!validToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-mizan-primary mb-2">Invalid Survey Link</h1>
          <p className="text-mizan-secondary">{error || 'This survey link is invalid or has expired.'}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-mizan-primary mb-2">Thank You!</h1>
          <p className="text-mizan-secondary mb-4">
            Your responses have been submitted successfully. Your insights will help build a healthier, more productive culture.
          </p>
          <div className="bg-mizan-gold/10 rounded-xl p-4 border border-mizan-gold/20">
            <p className="text-sm text-mizan-primary">
              Your individual analysis and personalized recommendations will be available soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-mizan-gold mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-mizan-primary mb-2">Mizan Culture Survey</h1>
          <p className="text-mizan-secondary">
            Help us understand your values and experience to build a better workplace
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-mizan-primary">Step {step} of 5</span>
            <span className="text-sm text-mizan-secondary">{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-mizan-gold h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Survey Content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Step 1: Personal Values */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-display text-mizan-primary mb-2">Your Personal Values</h2>
                <p className="text-mizan-secondary">
                  Select exactly 10 values that are most important to you personally. These reflect who you are and what matters to you.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ALL_VALUES.map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      if (surveyData.personalValues.includes(value) || surveyData.personalValues.length < 10) {
                        toggleValue('personalValues', value);
                      }
                    }}
                    disabled={!surveyData.personalValues.includes(value) && surveyData.personalValues.length >= 10}
                    className={`px-4 py-3 rounded-xl border-2 transition-all duration-400 text-sm font-medium ${
                      surveyData.personalValues.includes(value)
                        ? 'bg-mizan-gold/10 border-mizan-gold text-mizan-gold'
                        : surveyData.personalValues.length >= 10
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-mizan-secondary hover:border-mizan-gold/50 hover:bg-mizan-gold/5'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Selected: {surveyData.personalValues.length}/10 values</strong>
                  {surveyData.personalValues.length !== 10 && (
                    <span className="text-blue-700 ml-2">
                      ({10 - surveyData.personalValues.length} more needed)
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Current Experience */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-display text-mizan-primary mb-2">How Do You Experience the Company Today?</h2>
                <p className="text-mizan-secondary">
                  Select exactly 10 values that best describe your actual experience working here right now.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ALL_VALUES.map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      if (surveyData.currentExperience.includes(value) || surveyData.currentExperience.length < 10) {
                        toggleValue('currentExperience', value);
                      }
                    }}
                    disabled={!surveyData.currentExperience.includes(value) && surveyData.currentExperience.length >= 10}
                    className={`px-4 py-3 rounded-xl border-2 transition-all duration-400 text-sm font-medium ${
                      surveyData.currentExperience.includes(value)
                        ? 'bg-mizan-gold/10 border-mizan-gold text-mizan-gold'
                        : surveyData.currentExperience.length >= 10
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-mizan-secondary hover:border-mizan-gold/50 hover:bg-mizan-gold/5'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Selected: {surveyData.currentExperience.length}/10 values</strong>
                  {surveyData.currentExperience.length !== 10 && (
                    <span className="text-blue-700 ml-2">
                      ({10 - surveyData.currentExperience.length} more needed)
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Desired Future */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-display text-mizan-primary mb-2">How Do You Want to Experience the Company in the Future?</h2>
                <p className="text-mizan-secondary">
                  Select exactly 10 values that represent your ideal workplace culture.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ALL_VALUES.map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      if (surveyData.desiredExperience.includes(value) || surveyData.desiredExperience.length < 10) {
                        toggleValue('desiredExperience', value);
                      }
                    }}
                    disabled={!surveyData.desiredExperience.includes(value) && surveyData.desiredExperience.length >= 10}
                    className={`px-4 py-3 rounded-xl border-2 transition-all duration-400 text-sm font-medium ${
                      surveyData.desiredExperience.includes(value)
                        ? 'bg-mizan-gold/10 border-mizan-gold text-mizan-gold'
                        : surveyData.desiredExperience.length >= 10
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 text-mizan-secondary hover:border-mizan-gold/50 hover:bg-mizan-gold/5'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  <strong>Selected: {surveyData.desiredExperience.length}/10 values</strong>
                  {surveyData.desiredExperience.length !== 10 && (
                    <span className="text-blue-700 ml-2">
                      ({10 - surveyData.desiredExperience.length} more needed)
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Engagement */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-mizan-primary mb-2">How Engaged Are You?</h2>
                <p className="text-mizan-secondary">
                  Rate your overall engagement with your work and the organization.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-mizan-secondary">Not Engaged</span>
                  <span className="text-3xl font-bold text-mizan-gold">{surveyData.engagement}</span>
                  <span className="text-sm text-mizan-secondary">Highly Engaged</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={surveyData.engagement}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, engagement: parseInt(e.target.value) }))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-mizan-secondary">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Recognition */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-mizan-primary mb-2">How Recognized Do You Feel?</h2>
                <p className="text-mizan-secondary">
                  Rate how valued and recognized you feel for your contributions.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-mizan-secondary">Not Recognized</span>
                  <span className="text-3xl font-bold text-mizan-gold">{surveyData.recognition}</span>
                  <span className="text-sm text-mizan-secondary">Highly Recognized</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={surveyData.recognition}
                  onChange={(e) => setSurveyData(prev => ({ ...prev, recognition: parseInt(e.target.value) }))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-mizan-secondary">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-900">{error}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border-2 border-mizan-primary text-mizan-primary rounded-xl hover:bg-mizan-primary hover:text-white transition-all duration-400 font-medium"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Survey</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
