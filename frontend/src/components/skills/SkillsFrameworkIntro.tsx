'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Award, Brain, TrendingUp, Target, Lightbulb, Users, BookOpen } from 'lucide-react';

interface FrameworkInfo {
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  purpose: string;
  keyFeatures: string[];
  example: string;
  color: string;
}

const frameworks: FrameworkInfo[] = [
  {
    name: 'O*NET Skills Taxonomy',
    icon: BookOpen,
    description: 'Comprehensive database from U.S. Department of Labor covering skills across all occupations',
    purpose: 'Standardized skill classification and job requirements',
    keyFeatures: [
      '1,000+ skills mapped to occupations',
      'Technical and soft skills coverage',
      'Industry-standard skill definitions',
      'Transferable skills identification'
    ],
    example: 'Maps "Python programming" to software developer roles with proficiency requirements',
    color: 'from-blue-50 to-blue-100'
  },
  {
    name: "Bloom's Taxonomy",
    icon: Brain,
    description: 'Educational framework measuring cognitive learning levels from basic to advanced',
    purpose: 'Assess skill depth and learning progression',
    keyFeatures: [
      '6 levels: Remember → Understand → Apply → Analyze → Evaluate → Create',
      'Measures skill mastery depth',
      'Guides skill development paths',
      'Training curriculum design'
    ],
    example: 'A junior developer "applies" SQL (level 3), while a senior "creates" complex queries (level 6)',
    color: 'from-purple-50 to-purple-100'
  },
  {
    name: 'Competency Frameworks',
    icon: Target,
    description: 'Structured models defining behaviors and skills needed for job success',
    purpose: 'Link skills to performance and organizational goals',
    keyFeatures: [
      'Technical competencies',
      'Behavioral competencies',
      'Leadership competencies',
      'Domain-specific knowledge'
    ],
    example: 'Defines "Project Management" as technical skill + leadership behavior + domain knowledge',
    color: 'from-green-50 to-green-100'
  },
  {
    name: 'SFIA (Skills Framework for Information Age)',
    icon: Award,
    description: 'Global standard for IT/digital skills with 7 proficiency levels',
    purpose: 'Measure IT professional skills with precision',
    keyFeatures: [
      '7 levels: Follow → Assist → Apply → Enable → Ensure → Initiate → Set Strategy',
      '6 skill categories (Strategy, Development, Delivery, etc.)',
      'Clear progression criteria',
      'Internationally recognized'
    ],
    example: 'A Level 3 developer "applies" coding skills; Level 6 "initiates" architecture decisions',
    color: 'from-indigo-50 to-indigo-100'
  },
  {
    name: 'LinkedIn Skills Genome',
    icon: TrendingUp,
    description: 'Real-time market data on trending skills and hiring demands',
    purpose: 'Align skills with market needs and career opportunities',
    keyFeatures: [
      'Trending skills 2025 (AI, Cloud, Cybersecurity)',
      'Skill adjacencies for career pivots',
      'Industry-specific demand insights',
      'Emerging skills early detection'
    ],
    example: 'Shows "Python" skills are adjacent to "Machine Learning" for career growth',
    color: 'from-amber-50 to-amber-100'
  },
  {
    name: 'Emotional Intelligence (EQ)',
    icon: Users,
    description: 'Framework measuring soft skills critical for leadership and collaboration',
    purpose: 'Assess interpersonal and self-management skills',
    keyFeatures: [
      '5 dimensions: Self-Awareness, Self-Regulation, Motivation, Empathy, Social Skills',
      'Correlates with 58% of job performance',
      'Leadership effectiveness predictor',
      'Team collaboration metrics'
    ],
    example: 'Measures a manager\'s empathy and conflict management skills for team leadership',
    color: 'from-pink-50 to-pink-100'
  },
  {
    name: '70-20-10 Learning Model',
    icon: Lightbulb,
    description: 'Evidence-based model showing how people develop skills most effectively',
    purpose: 'Design optimal skill development strategies',
    keyFeatures: [
      '70% experiential learning (on-the-job practice)',
      '20% social learning (coaching, mentoring)',
      '10% formal training (courses, certifications)',
      'Personalized development plans'
    ],
    example: 'To learn "leadership," recommends: 70% leading projects, 20% executive coaching, 10% courses',
    color: 'from-teal-50 to-teal-100'
  }
];

interface SkillsFrameworkIntroProps {
  onContinue: () => void;
}

export function SkillsFrameworkIntro({ onContinue }: SkillsFrameworkIntroProps) {
  const [expandedFramework, setExpandedFramework] = useState<string | null>(null);

  const toggleFramework = (name: string) => {
    setExpandedFramework(expandedFramework === name ? null : name);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-mizan-gold/10 to-mizan-background rounded-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-mizan-primary mb-4">
          Understanding Your Skills Analysis
        </h1>
        <p className="text-xl text-mizan-secondary max-w-3xl mx-auto leading-relaxed">
          Before we show your skills analysis results, let&apos;s explore the <span className="font-semibold text-mizan-gold">7 AI-powered frameworks</span> we use to analyze your skills with precision and provide actionable recommendations.
        </p>
      </div>

      {/* Why Multiple Frameworks */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-display font-bold text-mizan-primary mb-6">
          Why 7 Frameworks? 🎯
        </h2>
        <div className="space-y-4 text-mizan-secondary">
          <p className="leading-relaxed">
            Unlike traditional single-framework approaches, Mizan uses <span className="font-semibold text-mizan-primary">7 complementary AI frameworks</span> to create a complete picture of your skills landscape.
          </p>
          <p className="leading-relaxed">
            Each framework brings unique strengths:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Classification & Standards
              </h3>
              <p className="text-sm text-blue-700">O*NET and SFIA provide standardized skill definitions and industry benchmarks</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Depth & Mastery
              </h3>
              <p className="text-sm text-purple-700">Bloom&apos;s Taxonomy measures how deeply you understand each skill</p>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
              <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Market Relevance
              </h3>
              <p className="text-sm text-amber-700">LinkedIn Skills Genome shows which skills are trending and in-demand</p>
            </div>

            <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-4">
              <h3 className="font-semibold text-pink-800 mb-2 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Soft Skills & EQ
              </h3>
              <p className="text-sm text-pink-700">EQ Framework measures critical interpersonal and leadership abilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-mizan-gold/5 to-mizan-background rounded-2xl p-8">
        <h2 className="text-2xl font-display font-bold text-mizan-primary mb-6">
          How Our AI Analyzes Your Skills 🤖
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-mizan-primary mb-1">Multi-AI Consensus</h3>
              <p className="text-mizan-secondary">We use 4 AI models (GPT-4o, Claude, Gemini, Mistral) to analyze your skills from different perspectives, then synthesize their insights</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-mizan-primary mb-1">Three-Engine Architecture</h3>
              <p className="text-mizan-secondary">Knowledge Engine (frameworks) + Data Engine (your profile) + Reasoning Engine (strategic recommendations)</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-mizan-primary mb-1">7-Framework Analysis</h3>
              <p className="text-mizan-secondary">Each skill is evaluated through all 7 frameworks to measure proficiency, market demand, learning gaps, and strategic alignment</p>
            </div>
          </div>
        </div>
      </div>

      {/* The 7 Frameworks */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-display font-bold text-mizan-primary mb-2">
          The 7 Frameworks Explained
        </h2>
        <p className="text-mizan-secondary mb-6">
          Click on each framework to learn more about how it contributes to your skills analysis.
        </p>

        <div className="space-y-3">
          {frameworks.map((framework) => {
            const Icon = framework.icon;
            return (
              <div
                key={framework.name}
                className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-400 hover:border-mizan-gold"
              >
                {/* Framework Header */}
                <button
                  onClick={() => toggleFramework(framework.name)}
                  className={`w-full p-5 flex items-center justify-between bg-gradient-to-r ${framework.color} hover:opacity-90 transition-opacity duration-400`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-mizan-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-display font-semibold text-mizan-primary">
                        {framework.name}
                      </h3>
                      <p className="text-sm text-mizan-secondary">
                        {framework.purpose}
                      </p>
                    </div>
                  </div>
                  {expandedFramework === framework.name ? (
                    <ChevronDown className="w-5 h-5 text-mizan-gold transition-transform duration-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-mizan-secondary transition-transform duration-400" />
                  )}
                </button>

                {/* Framework Details */}
                {expandedFramework === framework.name && (
                  <div className="p-6 bg-white border-t-2 border-gray-100 animate-in slide-in-from-top duration-400">
                    <p className="text-mizan-secondary mb-4 leading-relaxed">
                      {framework.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-mizan-primary uppercase tracking-wide mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {framework.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-mizan-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-mizan-gold mt-2 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-mizan-background rounded-lg p-4">
                      <p className="text-xs font-semibold text-mizan-primary uppercase tracking-wide mb-2">
                        Example Application
                      </p>
                      <p className="text-sm text-mizan-secondary italic">
                        {framework.example}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* What to Expect */}
      <div className="bg-gradient-to-br from-mizan-primary/5 to-mizan-gold/5 rounded-2xl p-8 border border-mizan-gold/20">
        <h2 className="text-2xl font-display font-bold text-mizan-primary mb-4">
          What to Expect in Your Analysis 📊
        </h2>
        <div className="space-y-3 text-mizan-secondary">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Skills Coverage Score:</span> Overall percentage of skills you have vs. what your strategy requires
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Critical Skill Gaps:</span> High-priority skills missing or underleveled, categorized by urgency
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Underutilized Skills:</span> Skills you have but aren&apos;t fully using – reallocation opportunities
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">4</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Personalized Recommendations:</span> Training, hiring, and development plans based on 70-20-10 model
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-mizan-gold flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">5</span>
            </div>
            <p>
              <span className="font-semibold text-mizan-primary">Strategic Alignment:</span> How well your current skills support your organizational strategy
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
          <span>Continue to Your Analysis</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-400" />
        </button>
        <p className="text-sm text-mizan-secondary mt-4">
          Ready to discover your skills gaps and opportunities?
        </p>
      </div>
    </div>
  );
}
