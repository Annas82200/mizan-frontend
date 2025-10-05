'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function MizanPricing() {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const tiers = [
    {
      name: "Free",
      subtitle: "Structure Scan",
      isFree: true,
      description: "See your organizational structure clearly",
      employees: "Unlimited",
      features: [
        { text: "Structure analysis", included: true },
        { text: "Single CSV upload", included: true },
        { text: "Entropy score report (PDF)", included: true },
        { text: "7-level framework visualization", included: true },
        { text: "Basic org chart", included: true },
        { text: "Culture analysis", included: false },
        { text: "Skills analysis", included: false },
        { text: "Performance management", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Automated modules", included: false },
        { text: "HRIS integrations", included: false }
      ],
      cta: "Start Free Scan",
      highlighted: false
    },
    {
      name: "Starter",
      subtitle: "Pilot teams",
      monthlyPrice: 8,
      annualPrice: 6.66,
      description: "Culture + skills analysis for small teams",
      employees: "50-250 employees",
      minAnnual: "~$4K",
      features: [
        { text: "Everything in Free", included: true },
        { text: "Culture analysis (engagement + recognition)", included: true },
        { text: "Skills analysis & capability mapping", included: true },
        { text: "Unified dashboard (3 analyses)", included: true },
        { text: "Email reports", included: true },
        { text: "Standard support", included: true },
        { text: "Multi-agent AI insights", included: true },
        { text: "Performance management", included: false },
        { text: "Advanced analytics", included: false },
        { text: "API access", included: false },
        { text: "Automated modules", included: false }
      ],
      cta: "Start 14-Day Trial",
      highlighted: false
    },
    {
      name: "Growth",
      subtitle: "Scaling organizations",
      monthlyPrice: 15,
      annualPrice: 12.50,
      description: "Performance management + advanced analytics",
      employees: "250-1,000 employees",
      minAnnual: "~$37.5K",
      features: [
        { text: "Everything in Starter", included: true },
        { text: "Advanced analytics & benchmarking", included: true },
        { text: "Performance management (reviews, goals, 1:1s)", included: true },
        { text: "Basic LXP (course assignments & tracking)", included: true },
        { text: "Custom reports + dashboards", included: true },
        { text: "API access", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced LXP", included: false },
        { text: "Hiring & talent modules", included: false },
        { text: "Workflow automation", included: false },
        { text: "HRIS integrations", included: false }
      ],
      cta: "Request Demo",
      highlighted: true
    },
    {
      name: "Scale",
      subtitle: "Enterprise automation",
      monthlyPrice: 24,
      annualPrice: 20,
      description: "Full automation suite + all modules",
      employees: "1,000-5,000 employees",
      minAnnual: "~$240K",
      features: [
        { text: "Everything in Growth", included: true },
        { text: "Advanced LXP (AI-powered learning paths)", included: true },
        { text: "Hiring module (AI interview bot)", included: true },
        { text: "Talent management & succession planning", included: true },
        { text: "Reward & bonus automation", included: true },
        { text: "Workflow automation (trigger engine)", included: true },
        { text: "All 7 AI agents fully unlocked", included: true },
        { text: "Dedicated customer success manager", included: true },
        { text: "HRIS integrations", included: false },
        { text: "SSO/SAML", included: false },
        { text: "Private cloud", included: false }
      ],
      cta: "Request Demo",
      highlighted: false
    },
    {
      name: "Enterprise",
      subtitle: "Custom solution",
      monthlyPrice: null,
      annualPrice: null,
      description: "Tailored for complex global organizations",
      employees: "5,000+ employees",
      features: [
        { text: "Everything in Scale", included: true },
        { text: "HRIS integrations (BambooHR, Workday, SAP)", included: true },
        { text: "SSO/SAML authentication", included: true },
        { text: "Private cloud deployment", included: true },
        { text: "White-label reports", included: true },
        { text: "Custom AI models", included: true },
        { text: "24/7 support + SLA", included: true },
        { text: "Onsite training", included: true },
        { text: "Dedicated implementation team", included: true },
        { text: "Custom integrations", included: true },
        { text: "Multi-region support", included: true }
      ],
      cta: "Talk to Sales",
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: "How does per-employee pricing work?",
      answer: "You pay based on the number of employees in your organization. For example, if you have 100 employees on the Starter plan, you'd pay $8 × 100 = $800/month (or $666/month if paid annually). There are no hidden fees."
    },
    {
      question: "What happens after the free Structure Scan?",
      answer: "The Structure Scan is completely free forever—no credit card required. When you're ready to add culture analysis, skills insights, and more features, you can upgrade to Starter or any paid plan."
    },
    {
      question: "Can I switch plans as we grow?",
      answer: "Absolutely. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle, and we'll prorate any differences."
    },
    {
      question: "What's included in implementation?",
      answer: "All paid plans include onboarding support. For Scale and Enterprise, we provide dedicated implementation teams, data migration assistance, and training. Implementation fees vary based on complexity—contact sales for details."
    },
    {
      question: "Do you offer non-profit or education discounts?",
      answer: "Yes! We offer 30% discounts for qualified non-profit organizations and educational institutions. Contact our sales team with proof of status to learn more."
    },
    {
      question: "How secure is my organizational data?",
      answer: "We're SOC 2 Type II compliant with end-to-end encryption, role-based access controls, and regular security audits. Your data is yours—we never sell or share it. Enterprise plans include private cloud options."
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <Navigation activePage="pricing" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <Sparkles size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Start Free • Scale Smart
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl font-semibold mb-8 leading-tight text-mizan-primary">
            Transparent pricing.<br />Clear value.
          </h1>

          <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed mb-12 text-mizan-secondary">
            Start with a free Structure Scan. Add features as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center space-x-4 p-2 bg-gray-100 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold smooth-transition ${
                billingCycle === 'monthly' ? 'bg-white shadow-sm text-mizan-primary' : 'text-mizan-secondary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-semibold smooth-transition ${
                billingCycle === 'annual' ? 'bg-white shadow-sm text-mizan-primary' : 'text-mizan-secondary'
              }`}
            >
              Annual
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-mizan-gold text-white">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-3xl p-8 border-2 smooth-transition ${
                  tier.highlighted ? 'hover-lift' : ''
                }`}
                style={{
                  borderColor: tier.highlighted ? '#CCA404' : '#E5E5E5',
                  transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-mizan-gold text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-mizan-primary">
                    {tier.name}
                  </h3>
                  <p className="text-sm mb-6 text-mizan-secondary">
                    {tier.subtitle}
                  </p>

                  <div className="mb-4">
                    {tier.isFree ? (
                      <span className="text-5xl font-bold text-mizan-primary">
                        Free
                      </span>
                    ) : tier.monthlyPrice ? (
                      <>
                        <span className="text-4xl font-bold text-mizan-primary">
                          ${billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice}
                        </span>
                        <span className="text-lg text-mizan-secondary">/employee/mo</span>
                        {tier.minAnnual && billingCycle === 'annual' && (
                          <p className="text-sm mt-2 text-mizan-secondary">
                            {tier.minAnnual} minimum annual
                          </p>
                        )}
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-mizan-primary">
                        Custom
                      </span>
                    )}
                  </div>

                  <p className="text-xs mb-3 font-medium text-mizan-secondary opacity-80">
                    {tier.employees}
                  </p>

                  <p className="text-sm leading-relaxed text-mizan-secondary">
                    {tier.description}
                  </p>
                </div>

                <button
                  className="w-full px-6 py-3 rounded-full text-sm font-semibold smooth-transition hover:shadow-lg hover:scale-105 mb-8"
                  style={{
                    background: tier.highlighted ? '#CCA404' : 'white',
                    color: tier.highlighted ? 'white' : '#3F3D56',
                    border: tier.highlighted ? 'none' : '2px solid #3F3D56'
                  }}
                >
                  {tier.cta}
                </button>

                <div className="space-y-3">
                  {tier.features.slice(0, 7).map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check size={18} className="text-mizan-primary flex-shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 bg-gray-200" />
                      )}
                      <span className={`text-sm text-mizan-secondary ${feature.included ? '' : 'opacity-50'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8 text-mizan-primary">
            More than you'd expect.<br />Less than you'd pay separately.
          </h2>
          <p className="text-xl font-light leading-relaxed mb-12 text-mizan-secondary">
            Mizan combines Culture Amp, Lattice, ChartHop, an LXP, and full talent suite—at a fraction of the combined cost.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                stat: "60%",
                label: "Less expensive",
                description: "Than buying Culture Amp + Lattice + ChartHop separately"
              },
              {
                stat: "7 Agents",
                label: "Working 24/7",
                description: "Multi-agent AI analyzing structure, culture, skills, and more"
              },
              {
                stat: "Full Suite",
                label: "Hire to retire",
                description: "Performance, LXP, hiring, talent, succession—all included"
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold mb-2 text-mizan-gold">
                  {item.stat}
                </div>
                <div className="text-lg font-semibold mb-2 text-mizan-primary">
                  {item.label}
                </div>
                <p className="text-sm leading-relaxed text-mizan-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-8 bg-mizan-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center mb-16 text-mizan-primary">
            Frequently asked questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border rounded-2xl overflow-hidden bg-white border-gray-200">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 smooth-transition"
                >
                  <span className="text-lg font-semibold pr-4 text-mizan-primary">
                    {faq.question}
                  </span>
                  <HelpCircle
                    size={20}
                    className={`flex-shrink-0 smooth-transition text-mizan-secondary ${expandedFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-base leading-relaxed text-mizan-secondary">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-gradient-to-br from-mizan-gold to-mizan-gold-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-8 text-white leading-tight">
            Ready to get started?
          </h2>
          <p className="text-xl mb-12 text-white/90 font-light">
            Start with a free Structure Scan. No credit card required. See your org clearly in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-10 py-5 text-lg font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center space-x-3 bg-mizan-primary text-white">
              <span>Start Free Scan</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 smooth-transition" />
            </button>
            <button className="px-10 py-5 text-lg font-semibold rounded-full smooth-transition hover:shadow-lg border-2 border-white text-white bg-transparent">
              Talk to Sales
            </button>
          </div>
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
