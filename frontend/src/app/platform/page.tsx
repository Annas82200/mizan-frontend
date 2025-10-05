'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Upload, Brain, BarChart3, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { AgentIcon, EntropyIcon, AlignmentIcon } from '@/components/icons';

export default function MizanPlatform() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const agents = [
    { name: "Structure Agent", description: "Analyzes organizational hierarchies, reporting lines, and spans of control", symbol: "○" },
    { name: "Culture Agent", description: "Measures behavioral alignment with stated values and mission", symbol: "△" },
    { name: "Skills Agent", description: "Assesses capability gaps and development trajectories", symbol: "□" },
    { name: "Performance Agent", description: "Tracks outcomes and correlates with structural factors", symbol: "◇" },
    { name: "Engagement Agent", description: "Measures employee sentiment and connection to purpose", symbol: "⬡" },
    { name: "Benchmarking Agent", description: "Compares metrics against industry standards", symbol: "▽" },
    { name: "Recognition Agent", description: "Identifies patterns in acknowledgment and motivation", symbol: "⬢" }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 smooth-transition ${
        scrollY > 20 ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold tracking-tight text-mizan-primary">
              Mizan
            </div>

            <div className="hidden lg:flex items-center space-x-10 text-sm font-medium">
              <a href="/" className="text-mizan-primary hover:opacity-60 smooth-transition">Home</a>
              <a href="/platform" className="text-mizan-gold hover:opacity-60 smooth-transition">Platform</a>
              <a href="#services" className="text-mizan-primary hover:opacity-60 smooth-transition">Services</a>
              <a href="#why" className="text-mizan-primary hover:opacity-60 smooth-transition">Why Mizan</a>
              <a href="#pricing" className="text-mizan-primary hover:opacity-60 smooth-transition">Pricing</a>
              <a href="#blog" className="text-mizan-primary hover:opacity-60 smooth-transition">Blog</a>
              <a href="#resources" className="text-mizan-primary hover:opacity-60 smooth-transition">Resources</a>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <a href="/login" className="text-sm font-medium text-mizan-secondary hover:opacity-60 smooth-transition">Login</a>
              <button className="px-6 py-2.5 text-sm font-semibold rounded-full smooth-transition hover:shadow-lg hover:scale-105 bg-mizan-gold text-white">
                Request a Demo
              </button>
            </div>

            <button
              className="lg:hidden text-mizan-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <Brain size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Multi-Agent AI Platform
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl font-semibold mb-8 leading-tight text-mizan-primary">
            Seven specialized agents.<br />One unified truth.
          </h1>

          <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed mb-12 text-mizan-secondary">
            Our AI agents analyze structure, culture, and skills simultaneously—revealing patterns invisible to traditional assessments.
          </p>

          <button className="group px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2 bg-mizan-gold text-white">
            <span>See It In Action</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 smooth-transition" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl font-semibold text-center mb-20 text-mizan-primary">
            How it works
          </h2>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                icon: <Upload className="w-10 h-10" />,
                title: "Upload Your Data",
                description: "Import org charts, HRIS data, or CSV files. Connect existing systems seamlessly. We handle the complexity."
              },
              {
                step: "02",
                icon: <Brain className="w-10 h-10" />,
                title: "AI Analysis",
                description: "Seven specialized agents analyze your organization against your mission, vision, and strategy. Multi-dimensional insights in minutes."
              },
              {
                step: "03",
                icon: <BarChart3 className="w-10 h-10" />,
                title: "Actionable Insights",
                description: "Role-specific dashboards with clear metrics. See entropy scores, alignment gaps, and prioritized recommendations."
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-8 left-0 text-8xl font-bold opacity-5 text-mizan-primary">
                  {item.step}
                </div>

                <div className="relative bg-white rounded-3xl p-10 border border-gray-100 hover-lift">
                  <div className="inline-flex p-4 rounded-2xl mb-6 bg-mizan-primary/10 text-mizan-primary">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 text-mizan-primary">
                    {item.title}
                  </h3>

                  <p className="text-base leading-relaxed text-mizan-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 7 Agents */}
      <section className="py-32 px-8 bg-mizan-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
              Seven specialized agents
            </h2>
            <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed text-mizan-secondary">
              Each agent is an expert in one domain. Together, they reveal the complete picture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <div
                key={i}
                onClick={() => setActiveAgent(i)}
                className="bg-white rounded-2xl p-8 cursor-pointer smooth-transition border hover-lift"
                style={{
                  borderColor: activeAgent === i ? '#CCA404' : '#E5E5E5',
                  borderWidth: activeAgent === i ? '2px' : '1px'
                }}
              >
                <div className="text-5xl mb-4 font-light text-mizan-primary">
                  {agent.symbol}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-mizan-primary">
                  {agent.name}
                </h3>
                <p className="text-sm leading-relaxed text-mizan-secondary">
                  {agent.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entropy and Alignment */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-8">
              <EntropyIcon className="w-16 h-16" color="#3F3D56" />
              <h3 className="font-display text-4xl font-semibold text-mizan-primary">
                Entropy Measurement
              </h3>
              <p className="text-lg leading-relaxed text-mizan-secondary">
                Organizational entropy measures structural disorder. High entropy means unclear reporting lines, scattered decision rights, and wasted energy. We quantify it.
              </p>
              <div className="space-y-4">
                {[
                  "Span of control violations",
                  "Communication bottlenecks",
                  "Decision latency patterns",
                  "Structural inefficiencies"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 size={20} className="text-mizan-primary" />
                    <span className="text-base text-mizan-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <AlignmentIcon className="w-16 h-16" color="#3F3D56" />
              <h3 className="font-display text-4xl font-semibold text-mizan-primary">
                Alignment Tracking
              </h3>
              <p className="text-lg leading-relaxed text-mizan-secondary">
                Alignment means behavior matches intention. Culture matches values. Skills match strategy. We measure gaps across all seven levels of your organization.
              </p>
              <div className="space-y-4">
                {[
                  "Mission-to-action coherence",
                  "Values-to-behavior gaps",
                  "Strategy-to-capability fit",
                  "Cross-functional harmony"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 size={20} className="text-mizan-primary" />
                    <span className="text-base text-mizan-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Framework */}
      <section className="py-32 px-8 bg-mizan-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl font-semibold mb-6 text-mizan-primary">
              The 7-Level Framework
            </h2>
            <p className="text-xl font-light leading-relaxed text-mizan-secondary">
              Every organization operates across these seven interconnected levels. We analyze all of them.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-12 border border-gray-100">
            <div className="space-y-4">
              {[
                { level: 1, name: "Safety & Survival", desc: "Security, Stability, Preservation of Life" },
                { level: 2, name: "Belonging & Loyalty", desc: "Trust, Community, Family & Brotherhood" },
                { level: 3, name: "Growth & Achievement", desc: "Performance, Motivation, Striving with Excellence" },
                { level: 4, name: "Meaning & Contribution", desc: "Purpose, Legacy, Service" },
                { level: 5, name: "Integrity & Justice", desc: "Ethics, Truth, Justice & Accountability" },
                { level: 6, name: "Wisdom & Compassion", desc: "Leadership, Empathy, Mercy & Knowledge" },
                { level: 7, name: "Transcendence & Unity", desc: "Alignment, Awakening, Unity of Being" }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start space-x-6 p-6 rounded-2xl smooth-transition hover:shadow-md"
                  style={{ background: i === 3 ? 'rgba(204,164,4,0.05)' : 'transparent' }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg smooth-transition group-hover:scale-110 border-2 bg-white"
                       style={{
                         borderColor: i === 3 ? '#CCA404' : '#3F3D56',
                         color: i === 3 ? '#CCA404' : '#3F3D56'
                       }}>
                    {item.level}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2 text-mizan-primary">
                      {item.name}
                    </h4>
                    <p className="text-sm leading-relaxed text-mizan-secondary">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Shield size={64} className="text-mizan-primary mb-8" />
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 text-mizan-primary">
                Enterprise-grade security
              </h2>
              <p className="text-lg leading-relaxed mb-8 text-mizan-secondary">
                Your organizational data is sensitive. We treat it that way. SOC 2 compliant, encrypted at rest and in transit, with granular access controls.
              </p>
              <div className="space-y-4">
                {[
                  "End-to-end encryption",
                  "Role-based access control",
                  "Audit logging",
                  "GDPR and SOC 2 compliant",
                  "Private cloud options"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-mizan-primary" />
                    <span className="text-base text-mizan-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border border-gray-100">
              <div className="space-y-6">
                {[
                  "Data Encryption",
                  "Access Control",
                  "Audit Trails",
                  "Compliance"
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                    <span className="font-medium text-mizan-primary">{item}</span>
                    <Zap size={20} className="text-mizan-gold" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-gradient-to-br from-mizan-gold to-mizan-gold-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-8 text-white leading-tight">
            See your organization<br />through new eyes
          </h2>
          <p className="text-xl mb-12 text-white/90 font-light">
            Start with a free structure analysis. No credit card required.
          </p>
          <button className="group px-10 py-5 text-lg font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-3 bg-mizan-primary text-white">
            <span>Get Started Free</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 smooth-transition" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm mb-6 text-mizan-secondary">
            © 2025 Mizan. Aligning structure, culture & skills.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <a href="#" className="text-mizan-secondary hover:opacity-60 smooth-transition">Privacy</a>
            <a href="#" className="text-mizan-secondary hover:opacity-60 smooth-transition">Terms</a>
            <a href="#" className="text-mizan-secondary hover:opacity-60 smooth-transition">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
