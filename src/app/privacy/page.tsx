import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-extralight text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600 mb-8">
            Last updated: December 27, 2024
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as organizational data, 
            employee survey responses, and account information.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to provide our AI-powered organizational analysis services, 
            improve our platform, and communicate with you about your account.
          </p>

          <h2>3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your organizational data, 
            including encryption, secure data transmission, and access controls.
          </p>

          <h2>4. Data Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your organizational data to third parties 
            without your consent, except as described in this policy.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, delete, or export your organizational data. 
            Contact us at privacy@mizan.com for assistance.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@mizan.com.
          </p>
        </div>
      </div>
    </div>
  );
}
