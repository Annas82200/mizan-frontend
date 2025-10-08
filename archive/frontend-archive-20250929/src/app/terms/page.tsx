import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Mizan</span>
          </Link>
          <Link href="/auth/login" className="text-slate-600 hover:text-slate-900">
            Back to Login
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extralight text-slate-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-8">
            Last updated: December 27, 2024
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Mizan platform, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations.
          </p>

          <h2>2. Service Description</h2>
          <p>
            Mizan provides AI-powered organizational intelligence analysis, including culture assessment, 
            structure analysis, skills evaluation, engagement monitoring, and recognition analysis.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their account credentials 
            and for all activities that occur under their account.
          </p>

          <h2>4. Data Privacy</h2>
          <p>
            We are committed to protecting your organizational data. Please refer to our Privacy Policy 
            for detailed information about how we collect, use, and protect your information.
          </p>

          <h2>5. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at legal@mizan.com.
          </p>
        </div>
      </div>
    </div>
  );
}
