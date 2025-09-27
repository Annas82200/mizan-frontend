"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// 7-Cylinder Visual Framework Component
const CylinderFramework = () => {
  const [hoveredCylinder, setHoveredCylinder] = useState<number | null>(null);
  
  const cylinders = [
    {
      level: 1,
      name: "Stability",
      definition: "Creating safety, reliability, and clarity in the workplace",
      ethical: "Do No Harm",
      color: "#E8D4A0"
    },
    {
      level: 2,
      name: "Belonging",
      definition: "Fostering inclusion, empathy, and celebration of diversity",
      ethical: "Honor Dignity",
      color: "#DCC078"
    },
    {
      level: 3,
      name: "Mastery",
      definition: "Developing craftsmanship, learning agility, and mentorship",
      ethical: "Pursue Excellence",
      color: "#CCA404"
    },
    {
      level: 4,
      name: "Autonomy",
      definition: "Enabling ownership, initiative, and adaptability",
      ethical: "Empower Agency",
      color: "#B39003"
    },
    {
      level: 5,
      name: "Purpose",
      definition: "Connecting to contribution, storytelling, and service",
      ethical: "Serve Others",
      color: "#4CB3A9"
    },
    {
      level: 6,
      name: "Evolution",
      definition: "Embracing experimentation, feedback fluency, and resilience",
      ethical: "Transcend Limits",
      color: "#3A9088"
    },
    {
      level: 7,
      name: "Legacy",
      definition: "Building stewardship, systems thinking, and regeneration",
      ethical: "Create Endurance",
      color: "#2C7066"
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12">
      <svg viewBox="0 0 800 600" className="w-full h-auto">
        {/* Background circles for depth */}
        <circle cx="400" cy="500" r="350" fill="#E2E8F0" opacity="0.1" />
        <circle cx="400" cy="500" r="250" fill="#E2E8F0" opacity="0.1" />
        
        {/* Cylinders */}
        {cylinders.map((cylinder, index) => {
          const baseY = 450 - (index * 60);
          const width = 280 - (index * 20);
          const xPos = 400 - width/2;
          const isHovered = hoveredCylinder === cylinder.level;
          
          return (
            <g 
              key={cylinder.level}
              onMouseEnter={() => setHoveredCylinder(cylinder.level)}
              onMouseLeave={() => setHoveredCylinder(null)}
              className="cursor-pointer"
              style={{ transition: 'all 0.3s ease' }}
            >
              {/* Cylinder body */}
              <rect
                x={xPos}
                y={baseY}
                width={width}
                height={50}
                fill={cylinder.color}
                stroke="#3F3D56"
                strokeWidth="2"
                rx="25"
                opacity={isHovered ? 1 : 0.85}
                style={{
                  filter: isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' : 'none',
                  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                  transformOrigin: 'center'
                }}
              />
              
              {/* Level number */}
              <circle
                cx={xPos - 20}
                cy={baseY + 25}
                r="18"
                fill="white"
                stroke={cylinder.color}
                strokeWidth="2"
              />
              <text
                x={xPos - 20}
                y={baseY + 30}
                textAnchor="middle"
                className="text-sm font-bold"
                fill={cylinder.color}
              >
                {cylinder.level}
              </text>
              
              {/* Cylinder name */}
              <text
                x={400}
                y={baseY + 30}
                textAnchor="middle"
                className="text-base font-semibold"
                fill="white"
              >
                {cylinder.name}
              </text>
              
              {/* Hover tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={150}
                    y={baseY - 80}
                    width={500}
                    height={70}
                    fill="white"
                    stroke={cylinder.color}
                    strokeWidth="2"
                    rx="8"
                    style={{
                      filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
                    }}
                  />
                  <text x={160} y={baseY - 55} className="text-xs font-semibold" fill={cylinder.color}>
                    {cylinder.name} - {cylinder.ethical}
                  </text>
                  <text x={160} y={baseY - 35} className="text-xs" fill="#545454" style={{ maxWidth: '480px' }}>
                    {cylinder.definition}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        
        {/* Arrow indicating progression */}
        <defs>
          <marker 
            id="arrowhead" 
            markerWidth="10" 
            markerHeight="7" 
            refX="10" 
            refY="3.5" 
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#4CB3A9" />
          </marker>
        </defs>
        <path
          d="M 100 480 Q 50 300 100 120"
          stroke="#4CB3A9"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          markerEnd="url(#arrowhead)"
          opacity="0.6"
        />
        <text x="40" y="300" className="text-sm" fill="#4CB3A9" transform="rotate(-90 40 300)">
          Evolution Path
        </text>
      </svg>
      
      {/* Legend */}
      <div className="mt-8 text-center text-sm text-[#545454]">
        <p className="mb-2">Each cylinder represents a stage of organizational evolution</p>
        <p>Hover over each level to explore the values and ethical principles</p>
      </div>
    </div>
  );
};

// Employee Report Preview Component
const EmployeeReportPreview = () => (
  <div className="bg-white p-8 rounded-xl shadow-lg">
    <h4 className="text-lg font-semibold text-[#3F3D56] mb-4">Employee Receives:</h4>
    <div className="space-y-4">
      <div className="border-l-4 border-[#CCA404] pl-4">
        <h5 className="font-medium text-[#3F3D56]">Personal Values Alignment</h5>
        <p className="text-sm text-[#545454]">How your values map to the organization</p>
      </div>
      <div className="border-l-4 border-[#4CB3A9] pl-4">
        <h5 className="font-medium text-[#3F3D56]">Current vs Desired Culture</h5>
        <p className="text-sm text-[#545454]">Gap analysis and recommendations</p>
      </div>
      <div className="border-l-4 border-[#545454] pl-4">
        <h5 className="font-medium text-[#3F3D56]">Growth Opportunities</h5>
        <p className="text-sm text-[#545454]">Personalized development paths</p>
      </div>
    </div>
  </div>
);

// Organization Report Preview Component  
const OrgReportPreview = () => (
  <div className="bg-white p-8 rounded-xl shadow-lg">
    <h4 className="text-lg font-semibold text-[#3F3D56] mb-4">Organization Receives:</h4>
    <div className="space-y-4">
      <div className="border-l-4 border-[#CCA404] pl-4">
        <h5 className="font-medium text-[#3F3D56]">Culture Health Score</h5>
        <p className="text-sm text-[#545454]">Overall alignment with strategy</p>
      </div>
      <div className="border-l-4 border-[#4CB3A9] pl-4">
        <h5 className="font-medium text-[#3F3D56]">Values Heat Map</h5>
        <p className="text-sm text-[#545454]">Department and team analysis</p>
      </div>
      <div className="border-l-4 border-[#545454] pl-4">
        <h5 className="font-medium text-[#3F3D56]">Cultural Entropy Report</h5>
        <p className="text-sm text-[#545454]">Dysfunction indicators & solutions</p>
      </div>
    </div>
  </div>
);

export default function CultureAnalysisLanding() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'why' | 'what' | 'how'>('why');
  
  const handleStart = () => {
    router.push('/pro/culture');
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#CCA404]/5 to-[#4CB3A9]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-[#3F3D56] mb-6">
              Culture Analysis That Predicts Success
            </h1>
            
            <p className="text-xl text-[#545454] max-w-3xl mx-auto mb-8">
              Discover if your culture accelerates or hinders your strategy using our 
              proprietary 7-cylinder values framework—the only assessment that measures 
              culture as a strategic asset.
            </p>
            
            <button
              onClick={handleStart}
              className="bg-[#CCA404] text-white px-8 py-4 rounded-lg text-lg font-semibold 
                       hover:bg-[#B39003] transition-colors duration-200
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Begin Culture Assessment →
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why, What, How Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[#E2E8F0] rounded-lg p-1">
              {(['why', 'what', 'how'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-md font-medium capitalize transition-all duration-200
                    ${activeTab === tab 
                      ? 'bg-[#CCA404] text-white shadow-md' 
                      : 'text-[#545454] hover:text-[#3F3D56]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'why' && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-[#3F3D56] text-center mb-8">
                  Why Culture Analysis Matters
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#3F3D56] mb-3">
                        Culture Is Your Competitive Edge
                      </h3>
                      <p className="text-[#545454]">
                        70% of transformations fail due to cultural resistance. Companies with 
                        aligned cultures execute strategies 3x faster and see 89% better performance.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-[#3F3D56] mb-3">
                        Beyond Employee Satisfaction
                      </h3>
                      <p className="text-[#545454]">
                        While others measure happiness, we measure health. Our framework reveals 
                        if your culture actively drives or secretly sabotages your strategic goals.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-[#3F3D56] mb-3">
                        Predictive, Not Reactive
                      </h3>
                      <p className="text-[#545454]">
                        Our AI identifies cultural entropy before it impacts performance, 
                        allowing you to intervene proactively rather than manage crises.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-[#3F3D56] mb-3">
                        Values That Scale
                      </h3>
                      <p className="text-[#545454]">
                        The 7-cylinder framework grows with your organization, providing 
                        a roadmap from startup stability to enterprise legacy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'what' && (
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-[#3F3D56] text-center mb-8">
                  What Is The 7-Cylinder Framework?
                </h2>
                
                <p className="text-lg text-[#545454] text-center mb-12 max-w-3xl mx-auto">
                  Based on 50 years of organizational psychology research, our framework maps 
                  universal human values to organizational evolution stages.
                </p>
                
                <CylinderFramework />
              </div>
            )}

            {activeTab === 'how' && (
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-[#3F3D56] text-center mb-8">
                  How Culture Analysis Works
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {[
                    {
                      step: "1",
                      title: "Define Strategy",
                      description: "Input your organizational strategy and goals"
                    },
                    {
                      step: "2",
                      title: "Employee Assessment",
                      description: "Team members select values across 3 dimensions"
                    },
                    {
                      step: "3",
                      title: "AI Analysis",
                      description: "Multi-agent AI maps values to strategy alignment"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-[#CCA404] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {item.step}
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
                
                <div className="grid md:grid-cols-2 gap-8">
                  <EmployeeReportPreview />
                  <OrgReportPreview />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Accuracy & Methodology */}
      <section className="py-16 bg-[#E2E8F0]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#3F3D56] text-center mb-12">
            Enterprise-Grade Accuracy
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                metric: "94%",
                label: "Prediction Accuracy",
                description: "Culture-performance correlation"
              },
              {
                metric: "4 AI",
                label: "Provider Consensus",
                description: "Multi-model validation"
              },
              {
                metric: "1000+",
                label: "Organizations Analyzed",
                description: "Proven at scale"
              },
              {
                metric: "Zero",
                label: "Assumptions Made",
                description: "100% data-driven"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <p className="text-4xl font-bold text-[#CCA404] mb-2">
                  {item.metric}
                </p>
                <p className="text-lg font-medium text-[#3F3D56] mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-[#545454]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#CCA404]/10 to-[#4CB3A9]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#3F3D56] mb-6">
            Transform Culture from Liability to Asset
          </h2>
          
          <p className="text-xl text-[#545454] mb-8">
            Join leading organizations using culture as their strategic accelerator
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStart}
              className="bg-[#CCA404] text-white px-10 py-5 rounded-lg text-xl font-semibold 
                       hover:bg-[#B39003] transition-all duration-200 
                       shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Start Culture Assessment
            </button>
            
            <button
              onClick={() => router.push('/pro/demo')}
              className="bg-white text-[#3F3D56] border-2 border-[#3F3D56] px-10 py-5 rounded-lg text-xl font-semibold 
                       hover:bg-[#E2E8F0] transition-all duration-200"
            >
              Watch Demo
            </button>
          </div>
          
          <p className="mt-6 text-sm text-[#545454]">
            Pro subscription required • Results in 48 hours • ROI guaranteed
          </p>
        </div>
      </section>
    </div>
  );
}
