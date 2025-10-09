'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface CylinderInfo {
  number: number;
  name: string;
  ethicalPrinciple: string;
  enablingValues: string[];
  limitingValues: string[];
  meaning: string;
  color: string;
}

const cylinders: CylinderInfo[] = [
  {
    number: 1,
    name: 'Safety & Survival',
    ethicalPrinciple: 'Preservation of Life',
    enablingValues: ['Safety', 'Stability', 'Preparedness', 'Wellbeing'],
    limitingValues: ['Fear', 'Neglect', 'Instability', 'Complacency'],
    meaning: 'Basic human needs - physical and psychological safety',
    color: 'from-red-50 to-red-100'
  },
  {
    number: 2,
    name: 'Belonging & Loyalty',
    ethicalPrinciple: 'Human Dignity',
    enablingValues: ['Inclusion', 'Trust', 'Collaboration', 'Compassion'],
    limitingValues: ['Cliquishness', 'Bias', 'Distrust', 'Favoritism'],
    meaning: 'Connection, relationships, and tribal identity',
    color: 'from-orange-50 to-orange-100'
  },
  {
    number: 3,
    name: 'Growth & Achievement',
    ethicalPrinciple: 'Striving with Excellence',
    enablingValues: ['Discipline', 'Learning', 'Ambition', 'Accountability'],
    limitingValues: ['Ego', 'Burnout', 'Competition', 'Arrogance'],
    meaning: 'Personal mastery, performance, and recognition',
    color: 'from-yellow-50 to-yellow-100'
  },
  {
    number: 4,
    name: 'Meaning & Contribution',
    ethicalPrinciple: 'Service',
    enablingValues: ['Purpose', 'Stewardship', 'Empowerment', 'Recognition'],
    limitingValues: ['Apathy', 'Self-interest', 'Cynicism', 'Disconnection'],
    meaning: 'Finding purpose beyond self, contribution to others',
    color: 'from-green-50 to-green-100'
  },
  {
    number: 5,
    name: 'Integrity & Justice',
    ethicalPrinciple: 'Justice and Accountability',
    enablingValues: ['Integrity', 'Fairness', 'Transparency', 'Courage'],
    limitingValues: ['Corruption', 'Inequity', 'Deception', 'Cowardice'],
    meaning: 'Ethical foundation, fairness, and truth',
    color: 'from-blue-50 to-blue-100'
  },
  {
    number: 6,
    name: 'Wisdom & Compassion',
    ethicalPrinciple: 'Mercy & Knowledge',
    enablingValues: ['Wisdom', 'Humility', 'Empathy', 'Balance'],
    limitingValues: ['Rigidity', 'Judgment', 'Indifference', 'Imbalance'],
    meaning: 'Deep understanding, compassion, and nuanced thinking',
    color: 'from-indigo-50 to-indigo-100'
  },
  {
    number: 7,
    name: 'Transcendence & Unity',
    ethicalPrinciple: 'Unity & Stewardship',
    enablingValues: ['Unity', 'Harmony', 'Vision', 'Legacy'],
    limitingValues: ['Division', 'Conflict', 'Short-termism', 'Isolation'],
    meaning: 'Collective consciousness, long-term impact, global stewardship',
    color: 'from-purple-50 to-purple-100'
  }
];

interface FrameworkIntroProps {
  onContinue: () => void;
}

export function FrameworkIntro({ onContinue }: FrameworkIntroProps) {
  const [expandedCylinder, setExpandedCylinder] = useState<number | null>(null);

  const toggleCylinder = (num: number) => {
    setExpandedCylinder(expandedCylinder === num ? null : num);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-mizan-gold/10 to-mizan-background rounded-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-mizan-primary mb-4">
          Understanding Your Results
        </h1>
        <p className="text-xl text-mizan-secondary max-w-3xl mx-auto leading-relaxed">
          Before we reveal your personal culture report, let&apos;s explore the <span className="font-semibold text-mizan-gold">Mizan 7-Cylinder Framework</span> –
          the ethical foundation that guides our analysis of organizational culture.
        </p>
      </div>

      {/* What Makes This Different */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-display font-bold text-mizan-primary mb-6">
          Why 7 Cylinders? 🏛️
        </h2>
        <div className="space-y-4 text-mizan-secondary">
          <p className="leading-relaxed">
            Unlike traditional pyramid models that emphasize hierarchy, the Mizan Framework uses <span className="font-semibold text-mizan-primary">7 horizontal cylinders stacked vertically</span>.
            Each cylinder represents a fundamental dimension of human flourishing in organizations.
          </p>
          <p className="leading-relaxed">
            Think of them like the cylinders in an engine – all must be functioning well for optimal performance.
            From <span className="font-semibold">Cylinder 1 (Safety & Survival)</span> at the foundation,
            to <span className="font-semibold">Cylinder 7 (Transcendence & Unity)</span> at the top,
            each builds upon the others while remaining equally important.
          </p>
        </div>
      </div>

      {/* Enabling vs Limiting Values */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-display font-bold text-mizan-primary mb-6">
          Enabling vs. Limiting Values 🎯
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              ✓ Enabling Values
            </h3>
            <p className="text-green-700 leading-relaxed">
              Values that <span className="font-semibold">empower</span>, <span className="font-semibold">unite</span>, and
              help individuals and organizations <span className="font-semibold">thrive</span>. These are the values we want to cultivate.
            </p>
            <p className="text-sm text-green-600 mt-3 italic">
              Examples: Trust, Integrity, Purpose, Wisdom
            </p>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">
              ✗ Limiting Values
            </h3>
            <p className="text-red-700 leading-relaxed">
              Values that <span className="font-semibold">constrain</span>, <span className="font-semibold">divide</span>, or
              create dysfunction. These indicate areas that need attention.
            </p>
            <p className="text-sm text-red-600 mt-3 italic">
              Examples: Fear, Bias, Ego, Division
            </p>
          </div>
        </div>
        <div className="mt-6 bg-mizan-background rounded-lg p-4">
          <p className="text-sm text-mizan-secondary">
            💡 <span className="font-semibold">Important:</span> Your report will show how your personal values align with your company&apos;s culture.
            We focus on <span className="font-semibold text-mizan-gold">alignment and strengths</span>, not gaps or deficiencies.
          </p>
        </div>
      </div>

      {/* The 7 Cylinders */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-display font-bold text-mizan-primary mb-2">
          The 7 Cylinders Explained
        </h2>
        <p className="text-mizan-secondary mb-6">
          Click on each cylinder to learn more. Your results will show which cylinders your values belong to.
        </p>

        <div className="space-y-3">
          {cylinders.map((cylinder) => (
            <div
              key={cylinder.number}
              className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-400 hover:border-mizan-gold"
            >
              {/* Cylinder Header */}
              <button
                onClick={() => toggleCylinder(cylinder.number)}
                className={`w-full p-5 flex items-center justify-between bg-gradient-to-r ${cylinder.color} hover:opacity-90 transition-opacity duration-400`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-mizan-primary shadow-sm">
                    {cylinder.number}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-display font-semibold text-mizan-primary">
                      {cylinder.name}
                    </h3>
                    <p className="text-sm text-mizan-secondary italic">
                      {cylinder.ethicalPrinciple}
                    </p>
                  </div>
                </div>
                {expandedCylinder === cylinder.number ? (
                  <ChevronDown className="w-5 h-5 text-mizan-gold transition-transform duration-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-mizan-secondary transition-transform duration-400" />
                )}
              </button>

              {/* Cylinder Details */}
              {expandedCylinder === cylinder.number && (
                <div className="p-6 bg-white border-t-2 border-gray-100 animate-in slide-in-from-top duration-400">
                  <p className="text-mizan-secondary mb-4 leading-relaxed">
                    {cylinder.meaning}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">
                        ✓ Enabling Values
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cylinder.enablingValues.map((value) => (
                          <span
                            key={value}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-2">
                        ✗ Limiting Values
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cylinder.limitingValues.map((value) => (
                          <span
                            key={value}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
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
      </div>

      {/* What to Expect */}
      <div className="bg-gradient-to-br from-mizan-gold/5 to-mizan-background rounded-2xl p-8">
        <h2 className="text-2xl font-display font-bold text-mizan-primary mb-4">
          What to Expect in Your Report 📊
        </h2>
        <div className="space-y-3 text-mizan-secondary">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Your Values & Cylinders:</span> See which cylinders your personal values belong to
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Culture Alignment:</span> Discover how your values align with your company&apos;s intended culture
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Personalized Recommendations:</span> Actionable suggestions based on YOUR specific values
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">4</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Reflection Questions:</span> Thoughtful prompts to deepen your self-awareness
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="text-center py-8">
        <button
          onClick={onContinue}
          className="group px-10 py-4 bg-mizan-gold text-white text-lg font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-400 inline-flex items-center space-x-2"
        >
          <span>Continue to Your Report</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-400" />
        </button>
        <p className="text-sm text-mizan-secondary mt-4">
          Ready to discover how your values align with your organization?
        </p>
      </div>
    </div>
  );
}
