'use client';

import { useState } from 'react';
import { ArrowRight, Upload, AlertCircle, CheckCircle, Loader2, Building2 } from 'lucide-react';
import Link from 'next/link';
import { StructureIcon } from '@/components/icons';

// Define types for the analysis result
interface Recommendation {
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
}

interface RichAnalysis {
    keyInsights: string[];
    recommendations: Recommendation[];
}

interface AnalysisResult {
    success: boolean;
    data: {
        richAnalysis: RichAnalysis;
        // other properties from the result...
    };
    // other properties...
}

export default function PublicStructureAnalysisPage() {
  // Form data
  const [companyName, setCompanyName] = useState('');
  const [vision, setVision] = useState('');
  const [mission, setMission] = useState('');
  const [strategy, setStrategy] = useState('');
  const [values, setValues] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // UI state
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Company info, Step 2: CSV upload
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type (CSV or TXT)
      if (selectedFile.type === 'text/csv' || selectedFile.type === 'text/plain' || selectedFile.name.endsWith('.csv') || selectedFile.name.endsWith('.txt')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a CSV or TXT file');
        setFile(null);
      }
    }
  };

  const handleNextStep = () => {
    // Validate company info
    if (!companyName.trim()) {
      setError('Company name is required');
      return;
    }
    if (!vision.trim() && !mission.trim() && !strategy.trim()) {
      setError('Please provide at least vision, mission, or strategy');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a file first');
      return;
    }

    setAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('companyName', companyName);
      formData.append('vision', vision);
      formData.append('mission', mission);
      formData.append('strategy', strategy);
      if (values.trim()) {
        formData.append('values', values);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/structure/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during analysis';
      setError(errorMessage);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mizan-background to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-mizan-primary">
            Mizan
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 text-sm font-semibold rounded-full border-2 border-mizan-gold text-mizan-gold hover:bg-mizan-gold hover:text-white transition-all duration-400"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-mizan-gold/10 rounded-full mb-6">
            <StructureIcon className="w-12 h-12 text-mizan-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-mizan-primary mb-6">
            Free Structure Scan
          </h1>
          <p className="text-xl text-mizan-secondary max-w-2xl mx-auto">
            Get AI-powered insights into your organizational structure. Discover bottlenecks,
            alignment issues, and opportunities to optimize.
          </p>
        </div>

        {/* Form Section */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-8">
            <div className="max-w-2xl mx-auto">
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-mizan-gold text-white' : 'bg-gray-200 text-gray-500'} font-bold mr-2`}>
                  1
                </div>
                <div className={`h-1 w-24 ${step >= 2 ? 'bg-mizan-gold' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-mizan-gold text-white' : 'bg-gray-200 text-gray-500'} font-bold ml-2`}>
                  2
                </div>
              </div>

              {/* Step 1: Company Information */}
              {step === 1 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-6 h-6 text-mizan-gold" />
                    <h2 className="text-2xl font-bold text-mizan-primary">
                      Tell Us About Your Company
                    </h2>
                  </div>
                  <p className="text-mizan-secondary mb-8">
                    This information helps our AI analyze how your structure aligns with your strategic goals.
                  </p>

                  <div className="space-y-6">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-semibold text-mizan-primary mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g., Acme Corp"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Vision */}
                    <div>
                      <label className="block text-sm font-semibold text-mizan-primary mb-2">
                        Vision <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                        placeholder="What is your long-term vision?"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Mission */}
                    <div>
                      <label className="block text-sm font-semibold text-mizan-primary mb-2">
                        Mission <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                        placeholder="What is your mission or purpose?"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Strategy */}
                    <div>
                      <label className="block text-sm font-semibold text-mizan-primary mb-2">
                        Strategy <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={strategy}
                        onChange={(e) => setStrategy(e.target.value)}
                        placeholder="What is your strategic plan or approach?"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Values (Optional) */}
                    <div>
                      <label className="block text-sm font-semibold text-mizan-primary mb-2">
                        Core Values <span className="text-mizan-secondary text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={values}
                        onChange={(e) => setValues(e.target.value)}
                        placeholder="e.g., Integrity, Innovation, Collaboration"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none transition-colors"
                      />
                      <p className="text-xs text-mizan-secondary mt-1">Separate with commas</p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mt-6">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {/* Next Button */}
                  <button
                    onClick={handleNextStep}
                    className="w-full mt-8 group px-8 py-4 text-base font-semibold rounded-full transition-all duration-400 flex items-center justify-center space-x-2 bg-mizan-gold text-white hover:shadow-xl hover:scale-105"
                  >
                    <span>Next: Upload Org Chart</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-400" />
                  </button>
                </div>
              )}

              {/* Step 2: CSV Upload */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-mizan-primary mb-4 text-center">
                    Upload Your Org Chart
                  </h2>
                  <p className="text-mizan-secondary mb-8 text-center">
                    Supported formats: CSV or TXT with employee names and reporting relationships
                  </p>

                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-mizan-gold transition-colors duration-400 mb-6">
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer block">
                      <Upload className="w-12 h-12 text-mizan-gold mx-auto mb-4" />
                      {file ? (
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-mizan-primary font-semibold">{file.name}</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-mizan-primary font-semibold mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-mizan-secondary">
                            CSV or TXT file (max 10MB)
                          </p>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {/* Analyze Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={!file || analyzing}
                    className="w-full group px-8 py-4 text-base font-semibold rounded-full transition-all duration-400 flex items-center justify-center space-x-2 bg-mizan-gold text-white hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing with AI...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyze Structure</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-400" />
                      </>
                    )}
                  </button>

                  {/* Back Button */}
                  <button
                    onClick={() => setStep(1)}
                    className="mx-auto block mt-4 text-sm text-mizan-secondary hover:text-mizan-gold transition-colors"
                  >
                    ← Back to company info
                  </button>

                  <p className="text-xs text-mizan-secondary mt-6 text-center">
                    No credit card required. Your data is processed securely and not stored.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && result.data && (
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-mizan-primary mb-2">
                Analysis Complete!
              </h2>
              <p className="text-mizan-secondary">
                Here's your AI-powered organizational structure insights
              </p>
            </div>

            {/* Full AI Analysis Results */}
            {result.data.richAnalysis ? (
              <div className="prose prose-lg max-w-none">
                <div className="bg-mizan-background rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-mizan-primary mb-4">Overall Assessment</h3>
                  <p className="text-mizan-secondary whitespace-pre-wrap">{result.data.richAnalysis.overallAssessment}</p>
                </div>

                {result.data.richAnalysis.keyFindings && result.data.richAnalysis.keyFindings.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-mizan-primary mb-4">Key Findings</h3>
                    <ul className="space-y-2">
                      {result.data.richAnalysis.keyFindings.map((finding: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-mizan-gold mt-1">•</span>
                          <span className="text-mizan-secondary">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.data.richAnalysis.recommendations && result.data.richAnalysis.recommendations.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-mizan-primary mb-4">Recommendations</h3>
                    <div className="space-y-4">
                      {result.data.richAnalysis.recommendations.map((rec: Recommendation, idx: number) => (
                        <div key={idx} className="bg-mizan-gold/5 border-l-4 border-mizan-gold p-4 rounded-r-lg">
                          <p className="font-semibold text-mizan-primary mb-1">{rec.title || `Recommendation ${idx + 1}`}</p>
                          <p className="text-sm text-mizan-secondary">{rec.description || rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Fallback to basic metrics if no rich analysis */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-mizan-background rounded-xl p-6 text-center">
                  <p className="text-sm text-mizan-secondary uppercase tracking-wide mb-2">
                    Entropy Score
                  </p>
                  <p className="text-4xl font-bold text-mizan-primary">
                    {result.data.entropyScore || 'N/A'}
                  </p>
                  <p className="text-xs text-mizan-secondary mt-2">
                    Lower is better
                  </p>
                </div>

                <div className="bg-mizan-background rounded-xl p-6 text-center">
                  <p className="text-sm text-mizan-secondary uppercase tracking-wide mb-2">
                    Bottlenecks Found
                  </p>
                  <p className="text-4xl font-bold text-mizan-primary">
                    {result.data.bottlenecks?.length || 0}
                  </p>
                  <p className="text-xs text-mizan-secondary mt-2">
                    Managers overloaded
                  </p>
                </div>

                <div className="bg-mizan-background rounded-xl p-6 text-center">
                  <p className="text-sm text-mizan-secondary uppercase tracking-wide mb-2">
                    Health Score
                  </p>
                  <p className="text-4xl font-bold text-mizan-primary">
                    {result.data.healthScore || 'N/A'}
                  </p>
                  <p className="text-xs text-mizan-secondary mt-2">
                    Out of 100
                  </p>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="border-t border-gray-200 pt-8 text-center">
              <p className="text-lg text-mizan-secondary mb-6">
                Want the full report with detailed recommendations and tracking?
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-mizan-primary text-white hover:shadow-xl hover:scale-105 transition-all duration-400"
              >
                <span>Sign Up for Full Access</span>
                <ArrowRight size={18} />
              </Link>
              <p className="text-sm text-mizan-secondary mt-4">
                14-day free trial. No credit card required.
              </p>
            </div>

            {/* Try Another */}
            <button
              onClick={() => {
                setResult(null);
                setFile(null);
                setError(null);
                setStep(1);
                setCompanyName('');
                setVision('');
                setMission('');
                setStrategy('');
                setValues('');
              }}
              className="mx-auto block mt-6 text-sm text-mizan-gold hover:underline"
            >
              Analyze another company
            </button>
          </div>
        )}

        {/* How It Works */}
        {!result && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-mizan-primary text-center mb-12">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-mizan-gold text-white rounded-full font-bold mb-4">
                  1
                </div>
                <h4 className="font-semibold text-mizan-primary mb-2">Share Your Strategy</h4>
                <p className="text-sm text-mizan-secondary">
                  Tell us your vision, mission, and strategic goals
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-mizan-gold text-white rounded-full font-bold mb-4">
                  2
                </div>
                <h4 className="font-semibold text-mizan-primary mb-2">Upload Org Chart</h4>
                <p className="text-sm text-mizan-secondary">
                  Simple CSV with employee names and reporting relationships
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-mizan-gold text-white rounded-full font-bold mb-4">
                  3
                </div>
                <h4 className="font-semibold text-mizan-primary mb-2">Get AI Insights</h4>
                <p className="text-sm text-mizan-secondary">
                  Discover how your structure aligns with your strategy
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-mizan-secondary">
          © 2025 Mizan. Aligning structure, culture & skills.
        </div>
      </footer>
    </div>
  );
}
