'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EthicsIcon, MultiAgentIcon, MeasurableIcon, TransparencyIcon } from '@/components/icons';

export default function WhyMizanPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mizan-background font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-display text-mizan-primary">Mizan</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/platform" className="text-mizan-secondary hover:text-mizan-primary smooth-transition">
                Platform
              </Link>
              <Link href="/services" className="text-mizan-secondary hover:text-mizan-primary smooth-transition">
                Services
              </Link>
              <Link href="/why" className="text-mizan-primary font-semibold">
                Why Mizan?
              </Link>
              <Link href="/pricing" className="text-mizan-secondary hover:text-mizan-primary smooth-transition">
                Pricing
              </Link>
              <Link href="/login" className="text-mizan-secondary hover:text-mizan-primary smooth-transition">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-mizan-gold text-white px-6 py-2 rounded-lg hover:bg-mizan-gold-light smooth-transition"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <Link href="/platform" className="block text-mizan-secondary hover:text-mizan-primary smooth-transition">
                Platform
              </Link>
              <Link href="/services" className="block text-mizan-secondary hover:text-mizan-primary smooth-transition">
                Services
              </Link>
              <Link href="/why" className="block text-mizan-primary font-semibold">
                Why Mizan?
              </Link>
              <Link href="/pricing" className="block text-mizan-secondary hover:text-mizan-primary smooth-transition">
                Pricing
              </Link>
              <Link href="/login" className="block text-mizan-secondary hover:text-mizan-primary smooth-transition">
                Login
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center bg-mizan-gold text-white px-6 py-2 rounded-lg hover:bg-mizan-gold-light smooth-transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-display text-mizan-primary mb-6">
            Why Mizan? 🎯
          </h1>
          <p className="text-xl text-mizan-secondary leading-relaxed">
            Because your organization deserves better than surface-level insights and checkbox compliance.
            <br />
            <span className="text-mizan-gold font-semibold">
              We measure what actually matters: human flourishing.
            </span>
          </p>
        </div>
      </section>

      {/* Core Differentiators */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold font-display text-mizan-primary text-center mb-16">
            Four Core Differentiators 🌟
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ethics First */}
            <div className="p-8 border-2 border-mizan-gold rounded-xl hover-lift smooth-transition">
              <EthicsIcon className="w-16 h-16 mb-4 text-mizan-gold" />
              <h3 className="text-2xl font-bold text-mizan-primary mb-4">
                1️⃣ Ethics-First AI
              </h3>
              <p className="text-mizan-secondary leading-relaxed mb-4">
                Our AI isn't just powerful—it's <span className="font-semibold text-mizan-gold">grounded in virtue ethics</span>.
                Every recommendation is filtered through the 7 Cylinders framework to ensure it promotes
                genuine human flourishing, not just efficiency.
              </p>
              <div className="bg-mizan-background p-4 rounded-lg">
                <p className="text-sm text-mizan-secondary italic">
                  "We don't optimize for engagement. We optimize for eudaimonia."
                </p>
              </div>
            </div>

            {/* Multi-Agent Architecture */}
            <div className="p-8 border-2 border-mizan-gold rounded-xl hover-lift smooth-transition">
              <MultiAgentIcon className="w-16 h-16 mb-4 text-mizan-gold" />
              <h3 className="text-2xl font-bold text-mizan-primary mb-4">
                2️⃣ Multi-Agent Architecture
              </h3>
              <p className="text-mizan-secondary leading-relaxed mb-4">
                Unlike single-model systems, we use <span className="font-semibold text-mizan-gold">7 specialized AI agents</span>
                that collaborate to analyze different aspects of your organization. Each agent is an expert
                in its domain, working together like a world-class consulting team.
              </p>
              <div className="bg-mizan-background p-4 rounded-lg">
                <p className="text-sm text-mizan-secondary italic">
                  "One AI for everything is like one doctor for all specialties. We give you the full team."
                </p>
              </div>
            </div>

            {/* Measurable Impact */}
            <div className="p-8 border-2 border-mizan-gold rounded-xl hover-lift smooth-transition">
              <MeasurableIcon className="w-16 h-16 mb-4 text-mizan-gold" />
              <h3 className="text-2xl font-bold text-mizan-primary mb-4">
                3️⃣ Measurable Impact
              </h3>
              <p className="text-mizan-secondary leading-relaxed mb-4">
                We don't just give you reports—we give you <span className="font-semibold text-mizan-gold">actionable metrics</span>
                at all 7 levels of organizational consciousness. Track entropy, alignment, and progress
                across Safety, Belonging, Esteem, Autonomy, Mastery, Purpose, and Transcendence.
              </p>
              <div className="bg-mizan-background p-4 rounded-lg">
                <p className="text-sm text-mizan-secondary italic">
                  "If you can't measure it, you can't improve it. We make flourishing quantifiable."
                </p>
              </div>
            </div>

            {/* Radical Transparency */}
            <div className="p-8 border-2 border-mizan-gold rounded-xl hover-lift smooth-transition">
              <TransparencyIcon className="w-16 h-16 mb-4 text-mizan-gold" />
              <h3 className="text-2xl font-bold text-mizan-primary mb-4">
                4️⃣ Radical Transparency
              </h3>
              <p className="text-mizan-secondary leading-relaxed mb-4">
                Every AI decision is <span className="font-semibold text-mizan-gold">fully explainable</span>.
                No black boxes. No mysterious scores. You see exactly how we arrived at each insight,
                which agents contributed, and what data informed each recommendation.
              </p>
              <div className="bg-mizan-background p-4 rounded-lg">
                <p className="text-sm text-mizan-secondary italic">
                  "Trust requires transparency. We show our work, always."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Level Framework Deep Dive */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold font-display text-mizan-primary text-center mb-6">
            The 7 Levels of Organizational Consciousness 🎚️
          </h2>
          <p className="text-center text-mizan-secondary mb-12 max-w-3xl mx-auto">
            Most HR tools focus on Level 1-3. We measure all seven, because true organizational
            excellence requires addressing every level of human need.
          </p>

          <div className="space-y-6">
            {[
              { level: 1, name: "Safety", emoji: "🛡️", color: "border-red-400", description: "Physical & psychological security, compliance, risk management" },
              { level: 2, name: "Belonging", emoji: "🤝", color: "border-orange-400", description: "Inclusion, relationships, team cohesion, social connection" },
              { level: 3, name: "Esteem", emoji: "🏆", color: "border-yellow-400", description: "Recognition, achievement, performance, competence" },
              { level: 4, name: "Autonomy", emoji: "🦅", color: "border-green-400", description: "Agency, decision-making, empowerment, ownership" },
              { level: 5, name: "Mastery", emoji: "🎯", color: "border-blue-400", description: "Skill development, expertise, continuous learning, growth" },
              { level: 6, name: "Purpose", emoji: "🌟", color: "border-indigo-400", description: "Meaningful work, mission alignment, contribution to society" },
              { level: 7, name: "Transcendence", emoji: "✨", color: "border-purple-400", description: "Self-actualization, wisdom, legacy, systemic impact" }
            ].map((item) => (
              <div
                key={item.level}
                className={`p-6 border-l-4 ${item.color} bg-white rounded-lg hover-lift smooth-transition`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <h3 className="text-xl font-bold text-mizan-primary">
                        Level {item.level}: {item.name}
                      </h3>
                      <p className="text-mizan-secondary">{item.description}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-mizan-gold" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold font-display text-mizan-primary text-center mb-12">
            Mizan vs. Traditional Tools 📊
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-mizan-primary text-white">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Typical HR Tools</th>
                  <th className="p-4 text-center font-semibold">Mizan Platform</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "AI Approach", typical: "Single general-purpose model", mizan: "7 specialized expert agents" },
                  { feature: "Ethical Framework", typical: "Compliance-focused", mizan: "Virtue ethics (7 Cylinders)" },
                  { feature: "Transparency", typical: "Black box algorithms", mizan: "Fully explainable decisions" },
                  { feature: "Scope", typical: "Focuses on 1-3 levels", mizan: "All 7 levels of consciousness" },
                  { feature: "Metrics", typical: "Engagement, productivity", mizan: "Entropy, alignment, flourishing" },
                  { feature: "Recommendations", typical: "Generic best practices", mizan: "Context-aware, ethical guidance" },
                  { feature: "Human Development", typical: "Skills training", mizan: "Holistic growth across all levels" },
                  { feature: "Organizational View", typical: "Departmental silos", mizan: "Systems thinking approach" }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-mizan-background' : 'bg-white'}>
                    <td className="p-4 font-semibold text-mizan-primary">{row.feature}</td>
                    <td className="p-4 text-center text-mizan-secondary">{row.typical}</td>
                    <td className="p-4 text-center text-mizan-gold font-semibold">{row.mizan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Role-Aware Dashboards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold font-display text-mizan-primary text-center mb-6">
            Different Views for Different Roles 👥
          </h2>
          <p className="text-center text-mizan-secondary mb-12 max-w-3xl mx-auto">
            Everyone gets exactly what they need, nothing they don't. Our role-aware dashboards
            ensure insights are relevant and actionable for each stakeholder.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Executives */}
            <div className="p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-mizan-gold smooth-transition">
              <div className="text-4xl mb-4">👔</div>
              <h3 className="text-2xl font-bold text-mizan-primary mb-4">For Executives</h3>
              <ul className="space-y-2 text-mizan-secondary">
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Strategic org-wide metrics across all 7 levels</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Competitive benchmarking and industry trends</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>ROI tracking on culture and development initiatives</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Board-ready reports and executive summaries</span>
                </li>
              </ul>
            </div>

            {/* HR Leaders */}
            <div className="p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-mizan-gold smooth-transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-mizan-primary mb-4">For HR Leaders</h3>
              <ul className="space-y-2 text-mizan-secondary">
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Deep analytics on all 6 modules (Culture, Skills, Performance, etc.)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>AI-powered recommendations for interventions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Workflow automation and compliance tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Detailed agent explanations for every insight</span>
                </li>
              </ul>
            </div>

            {/* Managers */}
            <div className="p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-mizan-gold smooth-transition">
              <div className="text-4xl mb-4">🧭</div>
              <h3 className="text-2xl font-bold text-mizan-primary mb-4">For Managers</h3>
              <ul className="space-y-2 text-mizan-secondary">
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Team-level insights on culture, skills, and performance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>1-on-1 conversation guides based on 7 Cylinders</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Development planning tools for team members</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Real-time feedback and recognition features</span>
                </li>
              </ul>
            </div>

            {/* Employees */}
            <div className="p-8 bg-white rounded-xl border-2 border-gray-200 hover:border-mizan-gold smooth-transition">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-mizan-primary mb-4">For Employees</h3>
              <ul className="space-y-2 text-mizan-secondary">
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Personal growth dashboard across all 7 levels</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>AI-curated learning paths (LXP integration)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Skills gap analysis and development recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-mizan-gold mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>Career pathways aligned with personal values</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final Distinction */}
      <section className="py-16 px-4 bg-gradient-to-br from-mizan-primary to-mizan-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-8">
            The Bottom Line 💡
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-2">Smarter AI</h3>
              <p className="text-white/90">
                Multi-agent architecture beats single-model systems every time
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Deeper Insights</h3>
              <p className="text-white/90">
                7 levels of consciousness, not just surface metrics
              </p>
            </div>
            <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-2">Ethical Foundation</h3>
              <p className="text-white/90">
                Virtue ethics built into every recommendation
              </p>
            </div>
          </div>

          <p className="text-2xl mb-8 font-display">
            We don't just help you manage people.
            <br />
            <span className="text-mizan-gold">We help you build organizations where humans flourish.</span>
          </p>

          <Link
            href="/signup"
            className="inline-flex items-center bg-mizan-gold text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-mizan-gold-light smooth-transition hover-lift"
          >
            Start Building a Better Organization
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mizan-primary text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold font-display mb-4">Mizan</h3>
              <p className="text-white/80">
                AI-powered organizational excellence through the 7 Cylinders framework.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/platform" className="hover:text-mizan-gold smooth-transition">Overview</Link></li>
                <li><Link href="/platform#agents" className="hover:text-mizan-gold smooth-transition">AI Agents</Link></li>
                <li><Link href="/platform#security" className="hover:text-mizan-gold smooth-transition">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/why" className="hover:text-mizan-gold smooth-transition">Why Mizan?</Link></li>
                <li><Link href="/services" className="hover:text-mizan-gold smooth-transition">Services</Link></li>
                <li><Link href="/pricing" className="hover:text-mizan-gold smooth-transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/privacy" className="hover:text-mizan-gold smooth-transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-mizan-gold smooth-transition">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-mizan-gold smooth-transition">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2024 Mizan Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
