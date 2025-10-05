'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { WorkshopIcon, AdvisoryIcon, RolloutIcon, EnablementIcon } from '@/components/icons';

export default function MizanServices() {
  const [activeCase, setActiveCase] = useState(0);

  const services = [
    {
      icon: WorkshopIcon,
      name: "Culture Reset Workshop",
      duration: "2-3 days intensive",
      price: "$15K - $25K",
      description: "Reset misaligned culture through facilitated discovery, values clarification, and behavioral design.",
      outcomes: [
        "Clarified core values & mission alignment",
        "Identified cultural gaps & disconnects",
        "Designed new behavioral norms",
        "Built change roadmap with quick wins"
      ]
    },
    {
      icon: AdvisoryIcon,
      name: "OD Advisory Retainer",
      duration: "Ongoing partnership",
      price: "$5K - $15K/month",
      description: "Embedded organizational design expertise for continuous transformation and strategic workforce planning.",
      outcomes: [
        "Monthly strategic planning sessions",
        "Structural redesign guidance",
        "Change management support",
        "Executive coaching & facilitation"
      ]
    },
    {
      icon: RolloutIcon,
      name: "Platform Rollout",
      duration: "4-12 weeks",
      price: "$25K - $100K",
      description: "End-to-end implementation of Mizan platform including data migration, training, and adoption strategy.",
      outcomes: [
        "Data migration from existing systems",
        "Custom workflow configuration",
        "Train-the-trainer programs",
        "Adoption metrics & success tracking"
      ]
    },
    {
      icon: EnablementIcon,
      name: "Enablement & Training",
      duration: "Customized",
      price: "$10K - $50K",
      description: "Build internal capability through custom playbooks, training programs, and certification pathways.",
      outcomes: [
        "Custom implementation playbooks",
        "Role-based training curriculum",
        "Manager enablement workshops",
        "HR team certification program"
      ]
    }
  ];

  const caseStudies = [
    {
      company: "Global Tech Firm",
      size: "2,500 employees",
      challenge: "Post-merger cultural misalignment causing 40% attrition in acquired team",
      solution: "Culture Reset Workshop + 6-month OD Advisory",
      results: [
        "Attrition reduced to 12% within 6 months",
        "Employee engagement scores up 35%",
        "Cultural entropy score decreased by 60%"
      ]
    },
    {
      company: "Healthcare Provider",
      size: "850 employees",
      challenge: "Siloed departments, unclear decision rights, slow patient care handoffs",
      solution: "Structure Analysis + Platform Rollout + Enablement",
      results: [
        "Patient handoff time reduced 45%",
        "Cross-functional collaboration up 50%",
        "Saved $2M in operational inefficiencies"
      ]
    },
    {
      company: "Financial Services",
      size: "4,200 employees",
      challenge: "Compliance culture blocking innovation, risk-averse behaviors entrenched",
      solution: "Culture Reset + OD Advisory + Platform Implementation",
      results: [
        "Innovation initiatives up 3x",
        "Balanced risk culture established",
        "Time-to-market for products cut 40%"
      ]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "Deep dive into your organization's current state, challenges, and strategic objectives through interviews and data analysis."
    },
    {
      step: "02",
      title: "Design",
      description: "Co-create solutions tailored to your context, culture, and capabilities with our organizational design experts."
    },
    {
      step: "03",
      title: "Deliver",
      description: "Execute the engagement with clear milestones, deliverables, and transparent progress tracking throughout."
    },
    {
      step: "04",
      title: "Sustain",
      description: "Build internal capability and establish systems to ensure changes stick and evolve with your organization."
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navigation activePage="services" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <MessageCircle size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Consulting & Advisory
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl font-semibold mb-8 leading-tight text-mizan-primary">
            From diagnostic<br />to transformation
          </h1>

          <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed mb-12 text-mizan-secondary">
            Expert guidance for organizational change. We help you design, implement, and sustain high-performing cultures.
          </p>

          <button className="group px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2 bg-mizan-gold text-white">
            <span>Schedule Consultation</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 smooth-transition" />
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
              Our services
            </h2>
            <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed text-mizan-secondary">
              Choose the engagement model that fits your transformation timeline and scope
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-10 border border-gray-100 hover-lift"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="inline-flex p-4 rounded-2xl bg-mizan-primary/10">
                      <Icon className="w-10 h-10" color="#3F3D56" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium mb-1 text-mizan-secondary">
                        {service.duration}
                      </div>
                      <div className="text-lg font-bold text-mizan-gold">
                        {service.price}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-3 text-mizan-primary">
                    {service.name}
                  </h3>

                  <p className="text-base leading-relaxed mb-6 text-mizan-secondary">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    <div className="text-sm font-semibold mb-2 text-mizan-primary">
                      Key Outcomes:
                    </div>
                    {service.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle2 size={18} className="text-mizan-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-mizan-secondary">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-8 bg-mizan-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
              How we work
            </h2>
            <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed text-mizan-secondary">
              A proven methodology refined through hundreds of engagements
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -top-8 left-0 text-7xl font-bold opacity-5 text-mizan-primary">
                  {item.step}
                </div>

                <div className="relative bg-white rounded-2xl p-8 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mb-4 border-2 border-mizan-primary text-mizan-primary bg-white">
                    {item.step}
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-mizan-primary">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-mizan-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
              Success stories
            </h2>
            <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed text-mizan-secondary">
              Real transformations from organizations like yours
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, i) => (
              <div
                key={i}
                onClick={() => setActiveCase(i)}
                className={`bg-white rounded-3xl p-10 border-2 smooth-transition cursor-pointer ${
                  activeCase === i ? 'hover-lift' : ''
                }`}
                style={{
                  borderColor: activeCase === i ? '#CCA404' : '#E5E5E5'
                }}
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="text-sm font-semibold mb-2 text-mizan-gold">
                      {study.company}
                    </div>
                    <div className="text-sm mb-4 text-mizan-secondary">
                      {study.size}
                    </div>
                    <div className="text-sm font-semibold mb-2 text-mizan-primary">
                      Challenge:
                    </div>
                    <p className="text-sm leading-relaxed text-mizan-secondary">
                      {study.challenge}
                    </p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold mb-2 text-mizan-primary">
                      Solution:
                    </div>
                    <p className="text-sm leading-relaxed mb-4 text-mizan-secondary">
                      {study.solution}
                    </p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold mb-3 text-mizan-primary">
                      Results:
                    </div>
                    <div className="space-y-2">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-mizan-gold" />
                          <span className="text-sm text-mizan-secondary">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-8 bg-mizan-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-center mb-16 text-mizan-primary">
            Why partner with Mizan?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Evidence-based",
                description: "Grounded in organizational science, ethics frameworks, and proven methodologies—not trendy buzzwords."
              },
              {
                title: "Implementation-focused",
                description: "We don't just deliver recommendations. We roll up our sleeves and help you execute the change."
              },
              {
                title: "Sustainable change",
                description: "Build internal capability so transformations stick. We make ourselves obsolete by design."
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2 border-mizan-primary bg-white">
                  <div className="text-2xl font-bold text-mizan-primary">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-mizan-primary">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-mizan-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 bg-gradient-to-br from-mizan-gold to-mizan-gold-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-8 text-white leading-tight">
            Ready to transform<br />your organization?
          </h2>
          <p className="text-xl mb-12 text-white/90 font-light">
            Schedule a consultation to discuss your challenges and explore how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-10 py-5 text-lg font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center space-x-3 bg-mizan-primary text-white">
              <span>Schedule Consultation</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 smooth-transition" />
            </button>
            <button className="px-10 py-5 text-lg font-semibold rounded-full smooth-transition hover:shadow-lg border-2 border-white text-white bg-transparent">
              Download Service Guide
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
