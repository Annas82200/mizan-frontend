'use client';

import React, { useState } from 'react';
import { Shield, Heart, TrendingUp, Lightbulb, Scale, Users, Target, ChevronDown, ChevronUp } from 'lucide-react';

interface Cylinder {
  number: number;
  name: string;
  nameArabic: string;
  icon: React.ReactNode;
  ethicalPrinciple: string;
  enablingValues: string[];
  limitingValues: string[];
  description: string;
  color: string;
}

export default function FrameworkConfigPage() {
  const [expandedCylinder, setExpandedCylinder] = useState<number | null>(7);

  const cylinders: Cylinder[] = [
    {
      number: 7,
      name: 'Vision & Purpose',
      nameArabic: 'الرؤية والهدف',
      icon: <Target className="w-6 h-6" />,
      ethicalPrinciple: 'Universal Benefit (المصلحة العامة)',
      enablingValues: ['Vision', 'Purpose', 'Legacy', 'Transcendence', 'Unity of Purpose'],
      limitingValues: ['Aimlessness', 'Short-termism', 'Selfishness', 'Purposelessness'],
      description: 'The highest level of organizational consciousness - driven by a clear vision that transcends individual gain and serves humanity.',
      color: '#CCA404'
    },
    {
      number: 6,
      name: 'Collaboration & Unity',
      nameArabic: 'التعاون والوحدة',
      icon: <Users className="w-6 h-6" />,
      ethicalPrinciple: 'Collective Good (الخير الجماعي)',
      enablingValues: ['Collaboration', 'Partnership', 'Shared Success', 'Teamwork', 'Community'],
      limitingValues: ['Silos', 'Competition', 'Division', 'Isolation'],
      description: 'Organizations that value collaboration, break down silos, and work together toward shared goals.',
      color: '#3F3D56'
    },
    {
      number: 5,
      name: 'Integrity & Justice',
      nameArabic: 'النزاهة والعدالة',
      icon: <Scale className="w-6 h-6" />,
      ethicalPrinciple: 'Fairness (العدل)',
      enablingValues: ['Integrity', 'Justice', 'Fairness', 'Transparency', 'Honesty', 'Ethical Conduct'],
      limitingValues: ['Corruption', 'Dishonesty', 'Favoritism', 'Injustice', 'Opacity'],
      description: 'Organizations committed to doing what is right, ensuring fairness, and maintaining ethical standards.',
      color: '#545454'
    },
    {
      number: 4,
      name: 'Creativity & Innovation',
      nameArabic: 'الإبداع والابتكار',
      icon: <Lightbulb className="w-6 h-6" />,
      ethicalPrinciple: 'Progress & Discovery (التقدم والاكتشاف)',
      enablingValues: ['Innovation', 'Creativity', 'Experimentation', 'Adaptability', 'Learning'],
      limitingValues: ['Rigidity', 'Stagnation', 'Fear of Failure', 'Closed-mindedness'],
      description: 'Organizations that embrace change, encourage new ideas, and adapt to evolving challenges.',
      color: '#CCA404'
    },
    {
      number: 3,
      name: 'Growth & Achievement',
      nameArabic: 'النمو والإنجاز',
      icon: <TrendingUp className="w-6 h-6" />,
      ethicalPrinciple: 'Striving with Excellence (السعي بالتميز)',
      enablingValues: ['Achievement', 'Excellence', 'Ambition', 'Results', 'Performance'],
      limitingValues: ['Mediocrity', 'Complacency', 'Underperformance', 'Lack of Drive'],
      description: 'Organizations focused on growth, achievement, and delivering results with excellence.',
      color: '#3F3D56'
    },
    {
      number: 2,
      name: 'Belonging & Loyalty',
      nameArabic: 'الانتماء والولاء',
      icon: <Heart className="w-6 h-6" />,
      ethicalPrinciple: 'Human Dignity (الكرامة الإنسانية)',
      enablingValues: ['Belonging', 'Loyalty', 'Trust', 'Connection', 'Respect'],
      limitingValues: ['Exclusion', 'Distrust', 'Disconnection', 'Disrespect'],
      description: 'Organizations where people feel valued, connected, and part of something meaningful.',
      color: '#545454'
    },
    {
      number: 1,
      name: 'Safety & Survival',
      nameArabic: 'الأمان والبقاء',
      icon: <Shield className="w-6 h-6" />,
      ethicalPrinciple: 'Preservation of Life (حفظ النفس)',
      enablingValues: ['Safety', 'Stability', 'Security', 'Wellbeing', 'Preparedness'],
      limitingValues: ['Fear', 'Neglect', 'Instability', 'Danger', 'Chaos'],
      description: 'The foundational level - organizations must ensure physical and psychological safety before higher development.',
      color: '#CCA404'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
          7-Cylinder Framework
        </h1>
        <p className="text-lg text-mizan-secondary">
          Mizan's proprietary values-based cultural assessment system
        </p>
      </div>

      {/* Framework Overview */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-mizan-primary">Framework Overview</h2>
        <p className="text-mizan-secondary mb-4">
          The 7-Cylinder Framework is a progressive model of organizational consciousness. Organizations develop through these cylinders sequentially - each level builds upon the previous one. Cylinder 1 (Safety & Survival) is the foundation, while Cylinder 7 (Vision & Purpose) represents the highest level of organizational maturity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-mizan-background rounded-xl">
            <div className="text-2xl font-bold text-mizan-gold mb-1">Sequential</div>
            <p className="text-sm text-mizan-secondary">
              Organizations must master lower cylinders before advancing to higher ones
            </p>
          </div>
          <div className="p-4 bg-mizan-background rounded-xl">
            <div className="text-2xl font-bold text-mizan-gold mb-1">Values-Based</div>
            <p className="text-sm text-mizan-secondary">
              Each cylinder has enabling values (strengthen culture) and limiting values (weaken culture)
            </p>
          </div>
          <div className="p-4 bg-mizan-background rounded-xl">
            <div className="text-2xl font-bold text-mizan-gold mb-1">Ethical</div>
            <p className="text-sm text-mizan-secondary">
              Each cylinder is grounded in a core ethical principle rooted in Islamic values
            </p>
          </div>
        </div>
      </div>

      {/* Cylinders Display */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold mb-4 text-mizan-primary">The 7 Cylinders</h2>
        {cylinders.map((cylinder) => (
          <div
            key={cylinder.number}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-400"
          >
            {/* Cylinder Header */}
            <button
              onClick={() => setExpandedCylinder(expandedCylinder === cylinder.number ? null : cylinder.number)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-400"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${cylinder.color}15`, color: cylinder.color }}
                >
                  {cylinder.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-mizan-gold/10 text-mizan-gold">
                      Cylinder {cylinder.number}
                    </span>
                    <h3 className="text-lg font-semibold text-mizan-primary">
                      {cylinder.name}
                    </h3>
                    <span className="text-sm text-mizan-secondary" dir="rtl">
                      {cylinder.nameArabic}
                    </span>
                  </div>
                  <p className="text-sm text-mizan-secondary mt-1">
                    {cylinder.ethicalPrinciple}
                  </p>
                </div>
              </div>
              {expandedCylinder === cylinder.number ? (
                <ChevronUp className="w-5 h-5 text-mizan-secondary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-mizan-secondary" />
              )}
            </button>

            {/* Cylinder Details (Expanded) */}
            {expandedCylinder === cylinder.number && (
              <div className="px-6 pb-6 pt-2 space-y-4 border-t border-gray-100">
                <p className="text-mizan-secondary">
                  {cylinder.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Enabling Values */}
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Enabling Values
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cylinder.enablingValues.map((value, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Limiting Values */}
                  <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      Limiting Values
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cylinder.limitingValues.map((value, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">How the Framework is Used</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Culture Analysis:</strong> Measures organizational alignment across all 7 cylinders</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Hiring:</strong> Assesses candidate values alignment with company culture</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Performance:</strong> Evaluates behaviors and achievements through cylinder lens</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Development:</strong> Guides organizational growth and cultural transformation</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
