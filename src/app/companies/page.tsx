"use client";

import React from 'react';
import Link from 'next/link';
import { MizanIcons } from '../../components/icons/mizan-custom-icons';

export default function CompaniesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, rgba(76, 179, 169, 0.05) 100%)' }}>
      {/* Navigation - Apple Style */}
      <nav className="backdrop-blur-sm bg-white/80 border-b border-slate-200/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8 drop-shadow-md" />
            <span className="text-xl font-extralight" style={{ color: '#3F3D56' }}>Mizan</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/companies/about" className="font-light hover:opacity-60 transition-opacity" style={{ color: '#545454' }}>About</Link>
            <Link href="/companies/pricing" className="font-light hover:opacity-60 transition-opacity" style={{ color: '#545454' }}>Pricing</Link>
            <Link href="/companies/demo" className="font-light hover:opacity-60 transition-opacity" style={{ color: '#545454' }}>Demo</Link>
            <Link 
              href="/auth/login" 
              className="px-6 py-2 rounded-full font-light text-white hover:opacity-90 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #CCA404 0%, #4CB3A9 100%)' }}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Apple-inspired Hero */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            <img src="/logo.png" alt="Mizan" className="w-20 h-20 mx-auto drop-shadow-xl" />
          </div>
          
          {/* Hero Typography */}
          <div className="mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            <h1 className="text-5xl md:text-6xl font-extralight leading-tight tracking-tight mb-4" style={{ color: '#3F3D56' }}>
              AI-Powered 
            </h1>
            <h1 className="text-5xl md:text-6xl font-extralight leading-tight tracking-tight" 
                style={{ background: 'linear-gradient(135deg, #CCA404 0%, #4CB3A9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Organizational Intelligence
            </h1>
          </div>
          
          <div className="mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed" style={{ color: '#545454' }}>
              Transform your organization with sophisticated AI analysis of culture, 
              structure, and performance using our proprietary frameworks and cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview - Apple Style */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(135deg, rgba(204, 164, 4, 0.03) 0%, rgba(76, 179, 169, 0.03) 100%)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 leading-tight" style={{ color: '#3F3D56' }}>
              Our AI-Powered Services
            </h2>
            <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed" style={{ color: '#545454' }}>
              Comprehensive organizational analysis through three specialized AI agents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_1.0s_forwards]">
            {/* Structure Analysis - FREE */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/80 transition-all duration-500 border border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.02]">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #4CB3A9 0%, #CCA404 100%)' }}>
                  <MizanIcons.Structure className="w-10 h-10" color="white" />
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-medium mb-4" style={{ backgroundColor: '#4CB3A9', color: 'white' }}>
                  FREE FOREVER
                </div>
                <h3 className="text-2xl font-extralight mb-3" style={{ color: '#3F3D56' }}>Structure Analysis</h3>
                <p className="font-light leading-relaxed" style={{ color: '#545454' }}>
                  AI-powered organizational structure assessment and strategic alignment analysis
                </p>
              </div>
              <div className="space-y-4 text-sm font-light" style={{ color: '#545454' }}>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#4CB3A9" />
                  <span>Organizational chart analysis</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#4CB3A9" />
                  <span>Strategic alignment assessment</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#4CB3A9" />
                  <span>Structure optimization recommendations</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#4CB3A9" />
                  <span>Span of control analysis</span>
                </div>
              </div>
            </div>

            {/* Culture Analysis */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/80 transition-all duration-500 border border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.02]">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #CCA404 0%, #4CB3A9 100%)' }}>
                  <MizanIcons.Culture className="w-10 h-10" color="white" />
                </div>
                <h3 className="text-2xl font-extralight mb-3" style={{ color: '#3F3D56' }}>Culture Analysis</h3>
                <p className="font-light leading-relaxed" style={{ color: '#545454' }}>
                  Deep cultural assessment using our proprietary 7-Cylinders Framework
                </p>
              </div>
              <div className="space-y-4 text-sm font-light" style={{ color: '#545454' }}>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#CCA404" />
                  <span>Employee culture surveys</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#CCA404" />
                  <span>Values alignment mapping</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#CCA404" />
                  <span>Culture health metrics</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#CCA404" />
                  <span>Personalized employee insights</span>
                </div>
              </div>
            </div>

            {/* Skills Analysis */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/80 transition-all duration-500 border border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.02]">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #4CB3A9 0%, #CCA404 100%)' }}>
                  <MizanIcons.Skills className="w-10 h-10" color="white" />
                </div>
                <h3 className="text-2xl font-extralight mb-3" style={{ color: '#3F3D56' }}>Skills Analysis</h3>
                <p className="font-light leading-relaxed" style={{ color: '#545454' }}>
                  Strategic skills gap analysis and capability mapping for future readiness
                </p>
              </div>
              <div className="space-y-4 text-sm font-light" style={{ color: '#545454' }}>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#4CB3A9" />
                  <span>Skills gap identification</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#4CB3A9" />
                  <span>Strategic capability mapping</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#4CB3A9" />
                  <span>Future skills forecasting</span>
                </div>
                <div className="flex items-center">
                  <MizanIcons.Success className="w-5 h-5 mr-3 flex-shrink-0" color="#4CB3A9" />
                  <span>Learning and development plans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services in Development */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-slate-900 mb-6">Coming Soon</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced services and modules currently in development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-slate-50 opacity-75">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MizanIcons.Performance className="w-6 h-6" color="white" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Performance Analytics</h3>
              <p className="text-sm text-slate-600">Advanced performance tracking and analytics</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-slate-50 opacity-75">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MizanIcons.Engagement className="w-6 h-6" color="white" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Engagement Monitoring</h3>
              <p className="text-sm text-slate-600">Real-time employee engagement insights</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-slate-50 opacity-75">
              <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MizanIcons.Recognition className="w-6 h-6" color="white" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Recognition Systems</h3>
              <p className="text-sm text-slate-600">AI-powered recognition and rewards</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-slate-50 opacity-75">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MizanIcons.Benchmarking className="w-6 h-6" color="white" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Benchmarking</h3>
              <p className="text-sm text-slate-600">Industry benchmarking and comparisons</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical 3D Cylinders - Correct Framework Orientation */}
      <section className="py-32 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight text-white mb-8">7-Cylinders Framework</h2>
            <p className="text-2xl text-slate-300 font-light max-w-4xl mx-auto leading-relaxed">
              Ethical principles that drive organizational excellence, visualized as vertical cylinders 
              representing the foundational layers of human flourishing.
            </p>
          </div>

          {/* Horizontal Cylinders Stacked Vertically with 3D Effects */}
          <div className="space-y-2 max-w-5xl mx-auto">
            {[
              { name: 'Transcendence & Unity', principle: 'Collective Advancement', score: 86, gradient: 'from-blue-500 to-blue-600' }, // Cylinder 7: Mizan Blue (TOP)
              { name: 'Wisdom & Compassion', principle: 'Honor & Excellence', score: 81, gradient: 'from-amber-300 via-blue-200 to-blue-300' }, // Cylinder 6: Light Gold + Blue
              { name: 'Integrity & Justice', principle: 'Self-Determination', score: 74, gradient: 'from-amber-300 to-amber-400' }, // Cylinder 5: Lighter Mizan Gold
              { name: 'Meaning & Contribution', principle: 'Purposeful Service', score: 88, gradient: 'from-amber-400 to-amber-500' }, // Cylinder 4: Mizan Gold
              { name: 'Growth & Achievement', principle: 'Honor & Excellence', score: 92, gradient: 'from-slate-300 via-amber-200 to-amber-300' }, // Cylinder 3: Light Grey + Gold
              { name: 'Belonging & Loyalty', principle: 'Brotherhood & Trust', score: 78, gradient: 'from-slate-400 to-slate-500' }, // Cylinder 2: Lighter Grey
              { name: 'Safety & Survival', principle: 'Preservation of Life', score: 85, gradient: 'from-slate-600 to-slate-700' } // Cylinder 1: Mizan Grey (BOTTOM)
            ].map((cylinder, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="flex items-center space-x-8 hover:bg-slate-800/20 rounded-xl p-4 transition-all duration-500">
                  
                  {/* Cylinder Name */}
                  <div className="w-48 text-right">
                    <div className="text-white font-medium text-lg leading-tight">{cylinder.name}</div>
                    <div className="text-slate-400 text-sm font-light">{cylinder.principle}</div>
                  </div>
                  
                  {/* Horizontal 3D Cylinder */}
                  <div className="flex-1 relative h-20 flex items-center">
                    <div className="w-full relative">
                      {/* Cylinder Track */}
                      <div className="h-16 bg-slate-800 rounded-full relative overflow-hidden shadow-inner">
                        
                        {/* Actual 3D Cylinder */}
                        <div 
                          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${cylinder.gradient} rounded-full transition-all duration-2000 ease-out shadow-2xl group-hover:shadow-3xl transform group-hover:scale-y-105`}
                          style={{ 
                            width: `${cylinder.score}%`,
                            transform: 'perspective(200px) rotateX(8deg) rotateY(-2deg)'
                          }}
                        >
                          {/* 3D Cylinder Effects */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/20 rounded-full"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30 rounded-b-full"></div>
                          <div className="absolute top-0 left-0 right-0 h-2 bg-white/50 rounded-t-full"></div>
                          
                          {/* Cylinder End Cap with 3D effect */}
                          <div className="absolute right-0 top-0 w-3 h-full bg-gradient-to-r from-transparent via-black/10 to-black/30 rounded-r-full"></div>
                          
                          {/* Surface highlight */}
                          <div className="absolute top-2 left-2 right-6 h-6 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                        </div>
                        
                        {/* Cylinder Glow Effect */}
                        <div 
                          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${cylinder.gradient} rounded-full opacity-30 animate-pulse`}
                          style={{ width: `${Math.min(cylinder.score + 8, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Score */}
                  <div className="w-20 text-white font-medium text-xl">{cylinder.score}%</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-slate-400 font-light">Vertical 7-Cylinders Framework • Higher cylinders = Better organizational health</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-light text-slate-900 mb-12">Choose Your Journey</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Entry', price: 'Free', features: ['Structure Analysis', 'Instant Insights'] },
              { name: 'Pro', price: '$79/mo', features: ['Culture Analysis', 'Skills Analysis', 'Dashboards'] },
              { name: 'Pro+', price: '$8/employee', features: ['Performance Analysis', 'Talent Management'] },
              { name: 'Enterprise', price: 'Custom', features: ['HRIS Integration', 'Consulting Services'] }
            ].map((tier, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                <h3 className="text-xl font-medium mb-2">{tier.name}</h3>
                <div className="text-2xl font-light mb-6">{tier.price}</div>
                <ul className="space-y-2 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/companies/pricing" className="block bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition-all">
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}