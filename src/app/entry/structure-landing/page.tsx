"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Custom Mizan Icons as SVG components
const StructureIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="12" r="8" fill="#CCA404"/>
    <circle cx="12" cy="32" r="8" fill="#4CB3A9"/>
    <circle cx="52" cy="32" r="8" fill="#4CB3A9"/>
    <circle cx="22" cy="52" r="8" fill="#545454"/>
    <circle cx="42" cy="52" r="8" fill="#545454"/>
    <path d="M32 20V24M32 24L22 44M32 24L42 44" stroke="#3F3D56" strokeWidth="2"/>
    <path d="M20 32H12M44 32H52" stroke="#3F3D56" strokeWidth="2"/>
  </svg>
);

const AccuracyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" stroke="#CCA404" strokeWidth="2" fill="none"/>
    <path d="M24 4C24 4 24 24 44 24" stroke="#4CB3A9" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="3" fill="#545454"/>
    <text x="24" y="40" textAnchor="middle" fill="#3F3D56" fontSize="10" fontWeight="bold">94%</text>
  </svg>
);

const DeliverableIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="12" width="32" height="28" rx="2" stroke="#545454" strokeWidth="2" fill="none"/>
    <path d="M8 20H40" stroke="#545454" strokeWidth="2"/>
    <rect x="14" y="6" width="20" height="6" rx="1" fill="#CCA404"/>
    <circle cx="16" cy="28" r="2" fill="#4CB3A9"/>
    <circle cx="24" cy="28" r="2" fill="#4CB3A9"/>
    <circle cx="32" cy="28" r="2" fill="#4CB3A9"/>
    <rect x="14" y="34" width="20" height="2" rx="1" fill="#E2E8F0"/>
  </svg>
);

const ProcessIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="12" cy="24" r="8" fill="#CCA404"/>
    <circle cx="24" cy="24" r="8" fill="#4CB3A9"/>
    <circle cx="36" cy="24" r="8" fill="#545454"/>
    <path d="M20 24H28M16 24L8 24M32 24H40" stroke="#3F3D56" strokeWidth="2"/>
    <text x="12" y="28" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">1</text>
    <text x="24" y="28" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">2</text>
    <text x="36" y="28" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">3</text>
  </svg>
);

export default function StructureAnalysisLanding() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    router.push('/entry');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#CCA404]/5 to-[#4CB3A9]/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <StructureIcon />
            </div>
            
            <h1 className="text-5xl font-bold text-[#3F3D56] mb-6">
              Organizational Structure Analysis
            </h1>
            
            <p className="text-xl text-[#545454] max-w-3xl mx-auto mb-8">
              Discover if your organizational structure accelerates or hinders your strategy. 
              Get instant insights on hierarchy health, role clarity, and structural gaps.
            </p>
            
            <button
              onClick={handleStart}
              disabled={isLoading}
              className="bg-[#CCA404] text-white px-8 py-4 rounded-lg text-lg font-semibold 
                       hover:bg-[#B39003] transition-colors duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? 'Loading...' : 'Start Free Analysis →'}
            </button>
            
            <p className="mt-4 text-sm text-[#545454]">
              No login required • 5-minute analysis • Instant results
            </p>
          </motion.div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 bg-[#E2E8F0]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#3F3D56] text-center mb-12">
            What You'll Discover
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Hierarchy Health",
                description: "Understand if your reporting structure enables or blocks decision-making speed",
                insights: ["Span of control analysis", "Decision bottlenecks", "Communication flow patterns"]
              },
              {
                title: "Role Clarity",
                description: "Identify overlaps, gaps, and ambiguities that create confusion and inefficiency",
                insights: ["Responsibility mapping", "Authority alignment", "Skill-role match"]
              },
              {
                title: "Strategic Alignment",
                description: "See if your structure supports your strategic goals or works against them",
                insights: ["Structure-strategy fit", "Capability gaps", "Growth readiness"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-[#3F3D56] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#545454] mb-4">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.insights.map((insight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#CCA404] rounded-full mt-1.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-[#545454]">{insight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#3F3D56] text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ProcessIcon />,
                step: "1",
                title: "Upload Your Org Chart",
                description: "Upload a CSV file or use our visual builder to map your organizational structure"
              },
              {
                icon: <ProcessIcon />,
                step: "2", 
                title: "AI Analysis",
                description: "Our multi-agent AI analyzes your structure using organizational design theories"
              },
              {
                icon: <ProcessIcon />,
                step: "3",
                title: "Instant Insights",
                description: "Receive a comprehensive report with actionable recommendations"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#3F3D56] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#545454]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-16 bg-[#E2E8F0]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#3F3D56] text-center mb-12">
            What You'll Receive
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                {
                  title: "Structural Health Score",
                  description: "Overall assessment of your organizational design effectiveness"
                },
                {
                  title: "Heat Map Visualization", 
                  description: "Visual representation of bottlenecks, gaps, and inefficiencies"
                },
                {
                  title: "Role Clarity Matrix",
                  description: "Detailed analysis of role definitions and overlaps"
                },
                {
                  title: "Improvement Roadmap",
                  description: "Prioritized recommendations for structural optimization"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <DeliverableIcon />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-[#3F3D56] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[#545454]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-xl shadow-xl"
            >
              <img 
                src="/api/placeholder/500/400" 
                alt="Sample Report"
                className="rounded-lg w-full h-auto"
              />
              <p className="text-center mt-4 text-sm text-[#545454]">
                Sample Structure Analysis Report
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Accuracy Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <AccuracyIcon />
          </div>
          
          <h2 className="text-3xl font-bold text-[#3F3D56] mb-6">
            94% Accuracy in Predicting Organizational Performance
          </h2>
          
          <p className="text-lg text-[#545454] mb-8">
            Our Structure Analysis is grounded in 50+ years of organizational design research,
            validated across 1000+ organizations, and powered by multi-provider AI consensus.
          </p>
          
          <div className="grid grid-cols-3 gap-8">
            {[
              { metric: "4 AI Providers", description: "Consensus validation" },
              { metric: "15 OD Theories", description: "Research-backed" },
              { metric: "<5 Minutes", description: "Analysis time" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-[#CCA404] mb-2">
                  {item.metric}
                </p>
                <p className="text-sm text-[#545454]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#CCA404]/10 to-[#4CB3A9]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#3F3D56] mb-6">
            Ready to Optimize Your Structure?
          </h2>
          
          <p className="text-xl text-[#545454] mb-8">
            Join 500+ organizations that have discovered their structural blind spots
          </p>
          
          <button
            onClick={handleStart}
            className="bg-[#CCA404] text-white px-10 py-5 rounded-lg text-xl font-semibold 
                     hover:bg-[#B39003] transition-all duration-200 
                     shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start Your Free Analysis
          </button>
          
          <p className="mt-6 text-sm text-[#545454]">
            No credit card required • Results in 5 minutes • 100% confidential
          </p>
        </div>
      </section>
    </div>
  );
}
