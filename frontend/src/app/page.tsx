'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { StructureIcon, CultureIcon, SkillsIcon, SparkleIcon } from '@/components/icons';
import Navigation from '@/components/Navigation';

export default function MizanHome() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroProgress = Math.min(1, scrollY / 600);
  const heroOpacity = Math.max(0, 1 - scrollY / 400);
  const cylindersReveal = Math.min(1, Math.max(0, (scrollY - 200) / 400));

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navigation */}
      <Navigation activePage="home" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: '80px' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white" />

        {/* Subtle geometric background */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
               style={{
                 background: 'radial-gradient(circle, rgba(63,61,86,0.1) 0%, transparent 70%)',
                 transform: `scale(${0.8 + cylindersReveal * 0.2})`
               }} />
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full blur-3xl"
               style={{
                 background: 'radial-gradient(circle, rgba(84,84,84,0.08) 0%, transparent 70%)',
                 transform: `scale(${0.8 + cylindersReveal * 0.2})`
               }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center py-32"
             style={{ opacity: heroOpacity, transform: `translateY(${heroProgress * 30}px)` }}>

          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <SparkleIcon className="w-4 h-4" color="#3F3D56" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Ethics-Grounded AI Platform
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold mb-8 leading-[1.1] text-mizan-primary">
            Align structure,<br />culture & skills
          </h1>

          <p className="text-xl md:text-2xl mb-4 font-light leading-relaxed text-mizan-secondary">
            on one ethical AI platform
          </p>

          <p className="text-base md:text-lg mb-14 font-normal max-w-2xl mx-auto leading-relaxed text-mizan-secondary/70">
            Transform organizational chaos into measurable alignment<br className="hidden md:block" />
            with our universal 7-level framework
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <button className="group px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 bg-mizan-gold text-white">
              <span>Free Structure Scan</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 smooth-transition" />
            </button>
            <button className="px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-lg border-2 border-mizan-primary text-mizan-primary bg-white">
              Request a Demo
            </button>
          </div>

          <div className="animate-bounce" style={{ opacity: 1 - heroProgress }}>
            <ChevronDown size={28} className="mx-auto text-mizan-secondary" />
          </div>
        </div>

        {/* 7 Cylinders */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
             style={{
               opacity: cylindersReveal,
               transform: `translate(-50%, ${(1 - cylindersReveal) * 40}px) scale(${0.9 + cylindersReveal * 0.1})`
             }}>
          <div className="flex items-end space-x-3">
            {[
              { height: 60, color: '#3F3D56' },
              { height: 80, color: '#3F3D56' },
              { height: 100, color: '#3F3D56' },
              { height: 120, color: '#CCA404' },
              { height: 100, color: '#3F3D56' },
              { height: 80, color: '#3F3D56' },
              { height: 60, color: '#3F3D56' }
            ].map((cylinder, i) => (
              <div
                key={i}
                className="w-10 rounded-t-xl smooth-transition"
                style={{
                  height: `${cylinder.height * cylindersReveal}px`,
                  background: `linear-gradient(180deg, ${cylinder.color} 0%, ${i === 3 ? '#E6B800' : '#545454'} 100%)`,
                  transitionDelay: `${i * 50}ms`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-40 px-8 bg-mizan-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
              What we do
            </h2>
            <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed text-mizan-secondary">
              Three interconnected analyses that reveal the truth about your organization
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: StructureIcon,
                title: "Structure Analysis",
                description: "Map reporting lines, spans of control, and structural entropy. Identify bottlenecks and misalignments before they become crises."
              },
              {
                icon: CultureIcon,
                title: "Culture Analysis",
                description: "Measure actual behaviors against stated values. Surface the invisible forces that shape how work really gets done."
              },
              {
                icon: SkillsIcon,
                title: "Skills Insights",
                description: "Assess capability gaps, growth trajectories, and development needs. Connect individual potential to organizational strategy."
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group bg-white rounded-3xl p-10 hover-lift cursor-pointer border"
                  style={{
                    borderColor: hoveredCard === i ? '#3F3D56' : '#E5E5E5'
                  }}
                >
                  <div className="inline-flex p-4 rounded-2xl mb-6 smooth-transition"
                       style={{
                         background: hoveredCard === i ? 'rgba(63,61,86,0.08)' : 'rgba(63,61,86,0.04)'
                       }}>
                    <Icon className="w-10 h-10" color={hoveredCard === i ? '#3F3D56' : '#545454'} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 leading-tight text-mizan-primary">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed font-normal text-mizan-secondary">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why These Three */}
      <section className="py-40 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-20 text-center text-mizan-primary">
            Why these three?
          </h2>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              {[
                {
                  title: "Structure enables execution",
                  description: "Clear reporting lines and decision rights determine whether strategy can actually be implemented.",
                  symbol: "○"
                },
                {
                  title: "Culture sustains behavior",
                  description: "Values and norms shape daily choices. Without cultural alignment, change initiatives fail.",
                  symbol: "△"
                },
                {
                  title: "Skills drive performance",
                  description: "Individual capabilities compound into organizational competence. Gaps here limit everything else.",
                  symbol: "□"
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0 text-2xl font-light mt-0.5 group-hover:scale-110 smooth-transition text-mizan-primary">
                    {item.symbol}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-mizan-primary">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-mizan-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Framework visualization */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100">
              <h4 className="text-2xl font-semibold mb-8 text-center text-mizan-primary">
                7-Level Ethical Framework
              </h4>
              <div className="space-y-3">
                {[
                  "Safety & Survival",
                  "Belonging & Loyalty",
                  "Growth & Achievement",
                  "Meaning & Contribution",
                  "Integrity & Justice",
                  "Wisdom & Compassion",
                  "Transcendence & Unity"
                ].map((level, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 bg-white rounded-2xl p-5 hover:shadow-md smooth-transition border border-gray-100 group"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm smooth-transition group-hover:scale-110 border-2 bg-white"
                         style={{
                           borderColor: i === 3 ? '#CCA404' : '#3F3D56',
                           color: i === 3 ? '#CCA404' : '#3F3D56'
                         }}>
                      {i + 1}
                    </div>
                    <span className="text-base font-medium text-mizan-primary">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-gradient-to-br from-mizan-gold to-mizan-gold-light">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-8 text-white leading-tight">
            Ready to see your<br />organization clearly?
          </h2>
          <p className="text-xl mb-12 text-white/90 font-light">
            Start with a free structure scan. No credit card required.
          </p>
          <button className="group px-10 py-5 text-lg font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-3 bg-mizan-primary text-white">
            <span>Run a Free Structure Scan</span>
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
