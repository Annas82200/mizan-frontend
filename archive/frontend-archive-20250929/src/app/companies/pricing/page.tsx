import React from 'react';
import Link from 'next/link';
import { CheckCircle, X, Star } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Mizan</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/companies" className="text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/companies/about" className="text-slate-600 hover:text-slate-900">About</Link>
            <Link href="/companies/demo" className="text-slate-600 hover:text-slate-900">Demo</Link>
            <Link href="/request-demo" className="text-slate-600 hover:text-slate-900">Book Demo</Link>
            <Link href="/auth/login" className="text-slate-600 hover:text-slate-900">Login</Link>
            <Link href="/companies/demo" className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-light hover:bg-slate-800 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-extralight text-slate-900 mb-8 leading-tight">
            Choose Your
            <span className="block bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Transformation Journey
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            From quick insights to comprehensive organizational transformation. 
            Start free, scale with insights, expand with enterprise power.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Entry (Free) */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-200 p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-slate-900 mb-2">Entry</h3>
                <div className="text-5xl font-extralight text-slate-900 mb-2">Free</div>
                <p className="text-slate-600 font-light">Forever</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Org Design Analyzer</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Instant AI Recommendations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">No Account Required</span>
                </div>
                <div className="flex items-center">
                  <X className="w-5 h-5 text-slate-400 mr-3" />
                  <span className="text-slate-400 font-light">No Storage or Dashboards</span>
                </div>
              </div>
              
              <Link href="/companies/demo" className="block w-full">
                <div className="bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-light text-center hover:bg-slate-200 transition-all">
                  Try Free Analyzer
                </div>
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-200 p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-slate-900 mb-2">Pro</h3>
                <div className="text-5xl font-extralight text-slate-900 mb-2">$79</div>
                <p className="text-slate-600 font-light">per month</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Everything in Entry</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Culture Analysis (7-Cylinders)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Skills Gap Analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Executive Dashboards</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">AI Consultation Service</span>
                </div>
              </div>
              
              <Link href="/payment?plan=pro" className="block w-full">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-6 rounded-xl font-light text-center hover:from-slate-800 hover:to-slate-700 transition-all">
                  Start Pro Plan
                </div>
              </Link>
            </div>

            {/* Pro+ */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-amber-200 p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-slate-900 mb-2">Pro+</h3>
                <div className="text-5xl font-extralight text-slate-900 mb-2">$8</div>
                <p className="text-slate-600 font-light">per employee/month</p>
                <p className="text-xs text-slate-500">(minimum 25 employees)</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Everything in Pro</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Performance Analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Talent Management</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Succession Planning</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700 font-light">Learning Experience Pipeline</span>
                </div>
              </div>
              
              <Link href="/payment?plan=pro-plus" className="block w-full">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-6 rounded-xl font-light text-center hover:from-amber-600 hover:to-amber-700 transition-all">
                  Start Pro+ Plan
                </div>
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-900 rounded-3xl shadow-xl border-2 border-slate-700 p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-white mb-2">Enterprise</h3>
                <div className="text-5xl font-extralight text-white mb-2">Custom</div>
                <p className="text-slate-300 font-light">based on organization size</p>
                <p className="text-xs text-slate-400">(minimum 500 employees)</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-slate-200 font-light">Everything in Pro+</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-slate-200 font-light">Multi-Tenant Setup</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-slate-200 font-light">HRIS Integration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-slate-200 font-light">Dedicated Consulting</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-slate-200 font-light">Custom Workshops</span>
                </div>
              </div>
              
              <Link href="/request-demo" className="block w-full">
                <div className="bg-white text-slate-900 py-3 px-6 rounded-xl font-light text-center hover:bg-slate-100 transition-all">
                  Book Demo
                </div>
              </Link>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-light text-slate-900 mb-8">Why Organizations Choose Mizan</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-light text-blue-600 mb-2">99%</div>
                <div className="text-slate-600 font-light">Cost Reduction vs Traditional Consulting</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-amber-500 mb-2">3x</div>
                <div className="text-slate-600 font-light">Faster Than Manual Analysis</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light text-slate-700 mb-2">24/7</div>
                <div className="text-slate-600 font-light">AI-Powered Insights Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

