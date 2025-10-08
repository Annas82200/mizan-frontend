'use client';

import { useState } from 'react';
import { ArrowRight, Upload, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { StructureIcon } from '@/components/icons';

export default function PublicStructureAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/structure/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
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
            Analyze your organizational structure instantly. Upload your org chart and discover hidden bottlenecks,
            spans of control issues, and structural inefficiencies.
          </p>
        </div>

        {/* Upload Section */}
        {!result && (
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-8">
            <div className="max-w-xl mx-auto">
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
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Structure</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-400" />
                  </>
                )}
              </button>

              <p className="text-xs text-mizan-secondary mt-4 text-center">
                No credit card required. Your data is processed securely and not stored.
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-mizan-primary mb-2">
                Analysis Complete!
              </h2>
              <p className="text-mizan-secondary">
                Here's a preview of your organizational structure insights
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-mizan-background rounded-xl p-6 text-center">
                <p className="text-sm text-mizan-secondary uppercase tracking-wide mb-2">
                  Entropy Score
                </p>
                <p className="text-4xl font-bold text-mizan-primary">
                  {result.data?.entropyScore || 'N/A'}
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
                  {result.data?.bottlenecks?.length || 0}
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
                  {result.data?.healthScore || 'N/A'}
                </p>
                <p className="text-xs text-mizan-secondary mt-2">
                  Out of 100
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="border-t border-gray-200 pt-8 text-center">
              <p className="text-lg text-mizan-secondary mb-6">
                Want the full report with detailed recommendations?
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
              }}
              className="mx-auto block mt-6 text-sm text-mizan-gold hover:underline"
            >
              Analyze another file
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
                <h4 className="font-semibold text-mizan-primary mb-2">Upload Your Org Chart</h4>
                <p className="text-sm text-mizan-secondary">
                  Simple CSV or TXT file with employee names and who reports to whom
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-mizan-gold text-white rounded-full font-bold mb-4">
                  2
                </div>
                <h4 className="font-semibold text-mizan-primary mb-2">AI Analyzes Structure</h4>
                <p className="text-sm text-mizan-secondary">
                  Our AI examines spans of control, layers, and reporting relationships
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-mizan-gold text-white rounded-full font-bold mb-4">
                  3
                </div>
                <h4 className="font-semibold text-mizan-primary mb-2">Get Instant Insights</h4>
                <p className="text-sm text-mizan-secondary">
                  Discover bottlenecks, inefficiencies, and opportunities to optimize
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
