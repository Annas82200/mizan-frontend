import React from 'react';
import Link from 'next/link';
import { ArrowRight, Scale, Target, Users, Brain, BookOpen, Lightbulb, Heart } from 'lucide-react';

export default function AboutPage() {
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
            <Link href="/companies/demo" className="text-slate-600 hover:text-slate-900">Demo</Link>
            <Link href="/request-demo" className="text-slate-600 hover:text-slate-900">Book Demo</Link>
            <Link href="/companies/pricing" className="text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link href="/companies/blog" className="text-slate-600 hover:text-slate-900">Blog</Link>
            <Link href="/auth/login" className="text-slate-600 hover:text-slate-900">Login</Link>
            <Link href="/companies/demo" className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-light hover:bg-slate-800 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <img src="/logo.png" alt="Mizan Logo" className="w-24 h-24 mx-auto mb-8 drop-shadow-xl" />
          <h1 className="text-6xl font-extralight text-slate-900 mb-8 leading-tight tracking-tight">
            The Story Behind
            <span className="block bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Mizan
            </span>
          </h1>
          <p className="text-2xl text-slate-600 font-light max-w-4xl mx-auto leading-relaxed">
            Born from a vision to transform organizational health through 
            AI-powered intelligence grounded in ethical principles.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-light text-slate-900 mb-8">Why Mizan Exists</h2>
              <div className="space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                <p>
                  Organizations worldwide struggle with a fundamental challenge: understanding 
                  the complex interplay between their culture, structure, and strategic goals. 
                  Traditional consulting approaches are expensive, time-consuming, and often 
                  deliver subjective insights that lack scientific rigor.
                </p>
                <p>
                  Mizan was born from the recognition that artificial intelligence, when 
                  grounded in ethical frameworks and human-centered principles, could 
                  democratize access to sophisticated organizational analysis that was 
                  previously available only to Fortune 500 companies.
                </p>
                <p>
                  Our name, "Mizan," means "balance" in Arabic—reflecting our core mission 
                  of helping organizations achieve equilibrium between people, purpose, 
                  and performance through data-driven insights and ethical AI.
                </p>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-3xl p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-white mb-4">Our Mission</h3>
              <p className="text-slate-300 font-light leading-relaxed">
                To democratize organizational intelligence by making sophisticated, 
                ethical analysis accessible to every organization seeking to align 
                their culture, structure, and strategy for sustainable success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Three Analyses */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-slate-900 mb-8">Why Three Analyses?</h2>
            <p className="text-xl text-slate-600 font-light max-w-4xl mx-auto leading-relaxed">
              Organizations are complex systems where culture, structure, and skills 
              form an interconnected triangle of organizational effectiveness.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Culture Analysis</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Culture drives behavior, decision-making, and ultimately performance. 
                Without understanding your cultural foundation through our 7-Cylinders 
                Framework, strategic initiatives often fail because they don't align 
                with how people actually think and work.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Structure Analysis</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Organizational structure determines how work flows, decisions are made, 
                and goals are achieved. A misaligned structure creates bottlenecks, 
                confusion, and inefficiency that no amount of motivation can overcome.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Skills Analysis</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Skills are the engine of execution. Even with great culture and 
                perfect structure, organizations fail without the right capabilities 
                to execute their strategy and adapt to changing market conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Cylinders Framework with Lines and Cards */}
      <section className="py-32 px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-white mb-8">The 7-Cylinders Framework</h2>
            <p className="text-xl text-slate-300 font-light max-w-4xl mx-auto leading-relaxed">
              Our proprietary framework maps human values to seven ethical cylinders, 
              each representing a fundamental aspect of human flourishing in organizations.
            </p>
          </div>

          {/* Interactive Cylinders with Lines and Cards */}
          <div className="space-y-8 max-w-5xl mx-auto">
            {[
              { 
                name: 'Transcendence & Unity', 
                principle: 'Collective Advancement', 
                score: 86, 
                gradient: 'from-blue-500 to-blue-600',
                description: 'Building collective strength through shared vision and coordinated action for the greater good.',
                definition: 'The highest level of human development where individual and collective interests align for sustainable progress.'
              },
              { 
                name: 'Wisdom & Compassion', 
                principle: 'Honor & Excellence', 
                score: 81, 
                gradient: 'from-amber-300 via-blue-200 to-blue-300',
                description: 'Integrating wisdom and compassion in decision-making and leadership.',
                definition: 'Balanced judgment that considers both logical analysis and empathetic understanding of human impact.'
              },
              { 
                name: 'Integrity & Justice', 
                principle: 'Self-Determination', 
                score: 74, 
                gradient: 'from-amber-300 to-amber-400',
                description: 'Empowering individuals to make meaningful choices and take ownership.',
                definition: 'Moral alignment between values, decisions, and actions that promotes fairness and autonomy.'
              },
              { 
                name: 'Meaning & Contribution', 
                principle: 'Purposeful Service', 
                score: 88, 
                gradient: 'from-amber-400 to-amber-500',
                description: 'Connecting work to deeper purpose and contribution beyond self-interest.',
                definition: 'Finding significance through service that creates value for others and society at large.'
              },
              { 
                name: 'Growth & Achievement', 
                principle: 'Honor & Excellence', 
                score: 92, 
                gradient: 'from-slate-300 via-amber-200 to-amber-300',
                description: 'Celebrating accomplishments and personal excellence to fuel motivation.',
                definition: 'Continuous improvement and recognition of progress that builds confidence and capability.'
              },
              { 
                name: 'Belonging & Loyalty', 
                principle: 'Brotherhood & Trust', 
                score: 78, 
                gradient: 'from-slate-400 to-slate-500',
                description: 'Creating bonds of trust and care where every person feels they belong.',
                definition: 'Deep connections based on mutual respect, shared identity, and commitment to each other\'s wellbeing.'
              },
              { 
                name: 'Safety & Survival', 
                principle: 'Preservation of Life', 
                score: 85, 
                gradient: 'from-slate-600 to-slate-700',
                description: 'Protecting life and dignity by ensuring health, stability, and freedom from harm.',
                definition: 'The foundational need for physical and psychological security that enables all higher-level development.'
              }
            ].map((cylinder, index) => (
              <div key={index} className="group relative">
                <div className="flex items-center space-x-8 hover:bg-slate-800/20 rounded-xl p-6 transition-all duration-500">
                  
                  {/* Cylinder Name */}
                  <div className="w-48 text-right">
                    <div className="text-white font-medium text-lg leading-tight">{cylinder.name}</div>
                    <div className="text-slate-400 text-sm font-light">{cylinder.principle}</div>
                  </div>
                  
                  {/* Horizontal 3D Cylinder */}
                  <div className="flex-1 relative h-20 flex items-center">
                    <div className="w-full relative">
                      <div className="h-16 bg-slate-800 rounded-full relative overflow-hidden shadow-inner">
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
                          <div className="absolute right-0 top-0 w-3 h-full bg-gradient-to-r from-transparent via-black/10 to-black/30 rounded-r-full"></div>
                          <div className="absolute top-2 left-2 right-6 h-6 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                        </div>
                        <div
                          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${cylinder.gradient} rounded-full opacity-30 animate-pulse`}
                          style={{ width: `${Math.min(cylinder.score + 8, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Connecting Line */}
                    <div className="absolute right-0 top-1/2 w-16 h-px bg-slate-600 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Score */}
                  <div className="w-20 text-white font-medium text-xl">{cylinder.score}%</div>
                </div>

                {/* Explanation Card */}
                <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 ml-20 w-96 bg-white rounded-xl p-6 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-3 text-lg">{cylinder.name}</h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{cylinder.description}</p>
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-xs text-slate-500 leading-relaxed">{cylinder.definition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Under Development */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-light text-slate-900 mb-8">What's Under Development</h2>
            <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto">
              We're continuously expanding our platform with advanced AI capabilities 
              and deeper organizational insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Advanced Analytics</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Real-time performance monitoring</li>
                <li>• Predictive culture analytics</li>
                <li>• Industry benchmarking</li>
                <li>• Risk assessment algorithms</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-slate-50 rounded-2xl p-8">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Employee Experience</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• AI-powered recognition systems</li>
                <li>• Personalized development paths</li>
                <li>• Engagement optimization</li>
                <li>• Wellbeing monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="text-center">
              <h2 className="text-4xl font-light text-slate-900 mb-8">Our Vision</h2>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                A world where every organization operates with perfect alignment 
                between their values, structure, and capabilities—creating 
                environments where both business success and human flourishing 
                are not just possible, but inevitable.
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-light text-slate-900 mb-8">Our Mission</h2>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                To democratize organizational intelligence through ethical AI, 
                making sophisticated analysis accessible to organizations of all 
                sizes while maintaining unwavering commitment to human-centered 
                principles and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-white mb-8">Learn More About Our Journey</h2>
          <p className="text-xl text-slate-300 font-light mb-12">
            Dive deeper into our research, methodology, and latest developments.
          </p>
          <Link href="/companies/blog" className="group inline-flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-amber-500 text-white px-12 py-4 rounded-2xl font-light tracking-wide hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform group-hover:scale-105 shadow-xl hover:shadow-2xl">
              <span className="text-lg mr-3">Read Our Blog</span>
              <BookOpen className="w-6 h-6" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}