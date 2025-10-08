"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  ArrowLeft, 
  Sparkles, 
  Bell,
  CheckCircle,
  Mail
} from 'lucide-react';

export default function IndividualsPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // TODO: Add to mailing list
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Mizan Logo" 
                className="w-8 h-8 mr-2"
              />
              <span className="text-xl font-bold text-gray-800">Mizan</span>
            </Link>
            <Link href="/" className="flex items-center text-gray-700 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Coming Soon Content */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-500 mr-2 animate-pulse" />
              <span className="text-lg font-semibold text-gray-600">Coming Soon</span>
              <Sparkles className="w-6 h-6 text-yellow-500 ml-2 animate-pulse" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Individual Organizational
            <span className="bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent"> Intelligence</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            We're building something special for individual practitioners, consultants, 
            and organizational development professionals. Get ready for personalized 
            AI-powered insights and tools.
          </p>

          {/* What's Coming */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Coming</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Personal Assessment Tools</h3>
                  <p className="text-gray-600 text-sm">Self-guided organizational health assessments</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Consultant Toolkit</h3>
                  <p className="text-gray-600 text-sm">Professional tools for organizational consultants</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Career Development</h3>
                  <p className="text-gray-600 text-sm">Personal growth recommendations and insights</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Team Dynamics</h3>
                  <p className="text-gray-600 text-sm">Small team and project-based analysis tools</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Signup */}
          {!subscribed ? (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Be the First to Know</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Get notified when we launch individual tools and receive early access to beta features.
              </p>
              <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Notify Me
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
                <h3 className="text-xl font-bold text-green-800">You're All Set!</h3>
              </div>
              <p className="text-green-700 mb-4">
                We'll notify you as soon as individual tools are available.
              </p>
              <p className="text-green-600 text-sm">
                In the meantime, check out our company solutions to see what's possible.
              </p>
            </div>
          )}

          {/* Back to Companies */}
          <div className="mt-8">
            <p className="text-gray-600 mb-4">
              Looking for organizational solutions right now?
            </p>
            <Link href="/companies" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Explore Company Solutions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

