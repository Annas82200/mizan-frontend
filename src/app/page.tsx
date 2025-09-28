"use client";

import React from 'react';
import Link from 'next/link';
import { Building2, User } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, rgba(76, 179, 169, 0.05) 100%)' }}>
      {/* Apple-inspired Hero Section */}
      <div className="max-w-6xl mx-auto text-center px-6 py-20 md:py-32">
        
        {/* Logo with subtle animation */}
        <div className="mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <img src="/logo.png" alt="Mizan" className="w-24 h-24 mx-auto drop-shadow-xl" />
        </div>

        {/* Hero Typography - Apple Style */}
        <div className="mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          <h1 className="text-6xl md:text-7xl font-extralight leading-tight tracking-tight mb-6" style={{ color: '#3F3D56' }}>
            Organizational
          </h1>
          <h1 className="text-6xl md:text-7xl font-extralight leading-tight tracking-tight" 
              style={{ background: 'linear-gradient(135deg, #CCA404 0%, #4CB3A9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Intelligence
          </h1>
        </div>

        <div className="mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
          <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed" style={{ color: '#545454' }}>
            AI-powered insights grounded in ethical principles. Transform your organization 
            with unprecedented sophistication.
          </p>
        </div>

        {/* Apple-style Login Button */}
        <div className="mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <Link href="/auth/login" className="inline-block">
            <div className="px-8 py-4 rounded-2xl font-medium text-white transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-2xl"
                 style={{ background: 'linear-gradient(135deg, #3F3D56 0%, #545454 100%)' }}>
              Access Dashboard
            </div>
          </Link>
        </div>
        
        {/* Apple-inspired Card Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto opacity-0 animate-[fadeInUp_0.8s_ease-out_1.0s_forwards]">
          
          {/* Companies Card */}
          <Link href="/companies" className="group block">
            <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-white/20">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background: 'linear-gradient(135deg, rgba(204, 164, 4, 0.05) 0%, rgba(76, 179, 169, 0.05) 100%)' }}></div>
              
              <div className="relative p-10 md:p-12">
                {/* Icon with Mizan colors */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300"
                     style={{ background: 'linear-gradient(135deg, #3F3D56 0%, #545454 100%)' }}>
                  <span className="text-2xl">🏢</span>
                </div>
                
                <h3 className="text-3xl font-light mb-4 tracking-wide" style={{ color: '#3F3D56' }}>
                  Companies
                </h3>
                <p className="text-lg font-light leading-relaxed mb-8" style={{ color: '#545454' }}>
                  Enterprise organizational intelligence platform with comprehensive analytics, 
                  consulting services, and AI-powered insights.
                </p>
                
                {/* Apple-style call to action */}
                <div className="flex items-center justify-center font-medium group-hover:translate-x-1 transition-transform duration-300"
                     style={{ color: '#CCA404' }}>
                  <span className="tracking-wide">Explore Solutions</span>
                  <div className="w-6 h-6 ml-3 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(204, 164, 4, 0.1)' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#CCA404' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Individuals Card - Coming Soon */}
          <div className="group cursor-not-allowed opacity-60">
            <div className="relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
              <div className="relative p-10 md:p-12">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
                     style={{ backgroundColor: 'rgba(84, 84, 84, 0.1)' }}>
                  <span className="text-2xl">👤</span>
                </div>
                
                <h3 className="text-3xl font-light mb-4 tracking-wide" style={{ color: '#545454' }}>
                  Individuals
                </h3>
                <p className="text-lg font-light leading-relaxed mb-8" style={{ color: '#545454' }}>
                  Personal organizational analysis tools for consultants, coaches, 
                  and development professionals.
                </p>
                
                <div className="flex items-center justify-center font-medium" style={{ color: '#545454' }}>
                  <span className="tracking-wide">Coming Soon</span>
                  <div className="w-6 h-6 ml-3 rounded-full flex items-center justify-center"
                       style={{ backgroundColor: 'rgba(204, 164, 4, 0.1)' }}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#CCA404' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}