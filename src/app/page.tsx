import React from 'react';
import Link from 'next/link';
import { Building2, User } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto text-center px-6 py-12 md:py-20">
        <img src="/logo.png" alt="Mizan" className="w-32 h-32 mx-auto mb-12 drop-shadow-2xl" />
        <div className="mb-8">
          <h1 className="text-7xl font-extralight text-slate-900 leading-relaxed tracking-tight">
            Organizational
          </h1>
          <h1 className="text-7xl font-extralight bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent leading-relaxed tracking-tight">
            Intelligence
          </h1>
        </div>
        <p className="text-2xl text-slate-600 font-light max-w-4xl mx-auto leading-relaxed mb-8">
          AI-powered insights grounded in ethical principles. Transform your organization 
          with unprecedented sophistication.
        </p>
        
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          
          <Link href="/companies" className="group block">
            <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02] border border-slate-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-amber-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-light text-slate-900 mb-4 tracking-wide">Companies</h3>
                <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                  Enterprise organizational intelligence platform with comprehensive analytics, 
                  consulting services, and AI-powered insights.
                </p>
                
                <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  <span className="tracking-wide">Explore Solutions</span>
                  <div className="w-6 h-6 ml-3 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <div className="w-4 h-4 rounded-full bg-blue-600 group-hover:translate-x-0.5 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="group block cursor-not-allowed opacity-60">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl shadow-xl border-2 border-slate-200">
              <div className="relative p-12">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-light text-slate-900 mb-4 tracking-wide">Individuals</h3>
                <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                  Personal organizational analysis tools for consultants, coaches, 
                  and development professionals.
                </p>
                
                <div className="flex items-center justify-center text-slate-600 font-medium">
                  <span className="tracking-wide">Coming Soon</span>
                  <div className="w-6 h-6 ml-3 rounded-full bg-slate-200 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}