"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Heart, Target, Star, TrendingUp, Clock } from 'lucide-react';

export default function CultureOnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/companies" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Mizan Culture Assessment</span>
          </Link>
          <Link href="/companies" className="text-slate-600 hover:text-slate-900 font-light">
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Users className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-6xl font-extralight text-slate-900 mb-8 leading-tight">
              Culture Assessment
            </h1>
            <p className="text-2xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
              Help us understand your workplace experience through our 7-cylinders framework. 
              Your insights contribute to creating a healthier organizational culture.
            </p>
          </div>

          {/* What to Expect */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12 mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-8 text-center">What to Expect</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Personal Values Discovery</h3>
                    <p className="text-slate-600 font-light">Identify the values that guide your decisions and define who you are</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Current Workplace Reality</h3>
                    <p className="text-slate-600 font-light">Reflect on which values you actually experience in your current work environment</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Ideal Culture Vision</h3>
                    <p className="text-slate-600 font-light">Envision the workplace culture that would help you flourish and do your best work</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Recognition Assessment</h3>
                    <p className="text-slate-600 font-light">Share how valued and appreciated you feel for your contributions and efforts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Engagement Evaluation</h3>
                    <p className="text-slate-600 font-light">Assess your current level of motivation and connection to your work</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-2">Time Commitment</h3>
                    <p className="text-slate-600 font-light">Approximately 5-7 minutes to complete all questions thoughtfully</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Cylinders Framework Preview */}
          <div className="bg-slate-900 rounded-3xl p-12 mb-12">
            <h2 className="text-3xl font-light text-white mb-8 text-center">The 7-Cylinders Framework</h2>
            <p className="text-xl text-slate-300 font-light text-center mb-12 max-w-3xl mx-auto">
              Your responses will be analyzed through our proprietary framework, which examines 
              organizational culture through seven ethical cylinders grounded in human flourishing.
            </p>
            
            {/* Vertical Cylinders - Website Style */}
            <div className="flex justify-center items-end space-x-3 h-64">
              {[
                { name: 'Transcendence & Unity', principle: 'Collective Advancement', score: 86, gradient: 'from-blue-500 to-blue-600' },
                { name: 'Wisdom & Compassion', principle: 'Honor & Excellence', score: 81, gradient: 'from-amber-300 via-blue-200 to-blue-300' },
                { name: 'Integrity & Justice', principle: 'Self-Determination', score: 74, gradient: 'from-amber-300 to-amber-400' },
                { name: 'Meaning & Contribution', principle: 'Purposeful Service', score: 88, gradient: 'from-amber-400 to-amber-500' },
                { name: 'Growth & Achievement', principle: 'Honor & Excellence', score: 92, gradient: 'from-slate-300 via-amber-200 to-amber-300' },
                { name: 'Belonging & Loyalty', principle: 'Brotherhood & Trust', score: 78, gradient: 'from-slate-400 to-slate-500' },
                { name: 'Safety & Survival', principle: 'Preservation of Life', score: 85, gradient: 'from-slate-600 to-slate-700' }
              ].map((cylinder, index) => (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div 
                      className={`w-12 bg-gradient-to-b ${cylinder.gradient} rounded-xl shadow-xl`}
                      style={{ height: `${(cylinder.score / 100) * 200}px` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 rounded-xl"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b-xl"></div>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 rounded-t-xl"></div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs">
                    <div className="text-white font-medium">{cylinder.name.split(' ')[0]}</div>
                    <div className="text-slate-400 font-light">{cylinder.score}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy & Confidentiality */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12">
            <h3 className="text-xl font-medium text-slate-900 mb-4 text-center">Your Privacy Matters</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-green-600 font-medium mb-2">✓ Anonymous</div>
                <p className="text-slate-600 font-light text-sm">Your individual responses are anonymized in organizational reports</p>
              </div>
              <div>
                <div className="text-blue-600 font-medium mb-2">✓ Confidential</div>
                <p className="text-slate-600 font-light text-sm">Only you and authorized HR personnel can access your personal report</p>
              </div>
              <div>
                <div className="text-purple-600 font-medium mb-2">✓ Purposeful</div>
                <p className="text-slate-600 font-light text-sm">Results help improve culture for everyone while supporting your growth</p>
              </div>
            </div>
          </div>

          {/* Start Survey */}
          <div className="text-center">
            <Link href="/employee/culture-survey" className="group">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-16 py-6 rounded-3xl font-light tracking-wide hover:from-slate-800 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl inline-block">
                <div className="flex items-center justify-center">
                  <span className="text-xl">Begin Culture Assessment</span>
                  <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-slate-300 font-light text-sm mt-2">5-7 minutes • 5 questions</div>
              </div>
            </Link>
            
            <p className="text-slate-500 font-light mt-6">
              Ready to discover insights about your workplace culture and personal values alignment?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
