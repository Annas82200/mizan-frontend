'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight, Download, FileText, CheckCircle2 } from 'lucide-react';
import {
  WhitepaperIcon,
  FrameworkGuideIcon,
  CaseStudyIcon,
  ImplementationIcon
} from '@/components/icons';

interface Resource {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  pages: string;
  fileSize: string;
  description: string;
  topics: string[];
  featured?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'White Papers', 'Framework Guides', 'Case Studies', 'Implementation'];

  const resources = [
    {
      id: 1,
      title: "The Mizan Platform: Building Thriving Organizations",
      subtitle: "Complete Platform Overview",
      category: "White Papers",
      pages: "24 pages",
      fileSize: "2.8 MB",
      description: "Comprehensive overview of the Mizan AI-powered platform. Learn how seven specialized agents analyze organizational structure, culture, and skills simultaneously using our proprietary 7-Cylinder Ethical Framework. Includes methodology, ROI analysis, and competitive differentiation.",
      topics: [
        "7-Cylinder Non-Hierarchical Framework explained",
        "Multi-agent AI system architecture",
        "Cultural entropy measurement",
        "Strategy-structure-culture alignment",
        "Real-world ROI and business impact"
      ],
      featured: true,
      icon: WhitepaperIcon
    },
    {
      id: 2,
      title: "The 7-Cylinder Ethical Framework",
      subtitle: "Deep Dive into the Model",
      category: "Framework Guides",
      pages: "32 pages",
      fileSize: "3.2 MB",
      description: "Detailed exploration of Mizan's proprietary framework. Understand why cylinders (not levels) represent capacity, how horizontal stacking emphasizes balance over hierarchy, and how each cylinder connects to universal ethical principles.",
      topics: [
        "Why cylinders, not hierarchical levels",
        "Ethical anchors for each cylinder",
        "Positive vs. limiting values at each cylinder",
        "Measurement methodology and validation",
        "Applications across industries"
      ],
      featured: false,
      icon: FrameworkGuideIcon
    },
    {
      id: 3,
      title: "For HR & OD Leaders: Unlocking Organizational Alignment",
      subtitle: "Practical Framework Guide",
      category: "White Papers",
      pages: "18 pages",
      fileSize: "2.1 MB",
      description: "Designed for HR and Organizational Development executives. See how to align culture and structure with strategy, diagnose cultural entropy, and ground HR processes in fairness and integrity using the 7-Cylinder Framework.",
      topics: [
        "Non-hierarchical thinking for HR leaders",
        "Hiring for culture fit and fairness",
        "Measuring leadership holistically",
        "Reducing attrition through alignment",
        "Case studies from tech, healthcare, and finance"
      ],
      featured: false,
      icon: WhitepaperIcon
    },
    {
      id: 4,
      title: "Tech Scale-Up: From Burnout to Balance",
      subtitle: "Real Transformation Story",
      category: "Case Studies",
      pages: "12 pages",
      fileSize: "1.6 MB",
      description: "How a 850-employee tech company used Mizan to diagnose entropy at Cylinder 3 (Growth & Achievement), rebalanced with Cylinder 4 (Meaning & Contribution), and improved retention by 18% and innovation speed by 25%.",
      topics: [
        "Initial diagnosis and entropy scoring",
        "Multi-agent AI analysis findings",
        "Structural redesign recommendations",
        "Implementation timeline and results",
        "Sustained impact over 12 months"
      ],
      featured: false,
      icon: CaseStudyIcon
    },
    {
      id: 5,
      title: "Healthcare Provider: Building Trust Through Transparency",
      subtitle: "Real Transformation Story",
      category: "Case Studies",
      pages: "14 pages",
      fileSize: "1.8 MB",
      description: "A 2,500-employee healthcare system revealed misalignment at Cylinder 5 (Integrity & Justice). Transparent promotion systems and equity audits reduced turnover by 22% and improved patient satisfaction scores.",
      topics: [
        "Culture assessment findings",
        "Fairness and equity gaps identified",
        "Leadership development program design",
        "Policy changes and implementation",
        "Measurable outcomes across 18 months"
      ],
      featured: false,
      icon: CaseStudyIcon
    },
    {
      id: 6,
      title: "Implementation Playbook: Your First 90 Days",
      subtitle: "Step-by-Step Guide",
      category: "Implementation",
      pages: "28 pages",
      fileSize: "2.4 MB",
      description: "Practical roadmap for implementing Mizan in your organization. From CSV upload and data migration to running your first multi-agent analysis and interpreting results. Includes templates, checklists, and common pitfalls.",
      topics: [
        "Pre-implementation checklist",
        "Data preparation and HRIS integration",
        "Running your first analysis",
        "Interpreting entropy scores and dashboards",
        "Change management best practices"
      ],
      featured: false,
      icon: ImplementationIcon
    },
    {
      id: 7,
      title: "Understanding Cylinder 5: The Integrity Test",
      subtitle: "Framework Deep Dive",
      category: "Framework Guides",
      pages: "16 pages",
      fileSize: "1.9 MB",
      description: "Organizations cannot achieve Unity (Cylinder 7) if Justice & Integrity (Cylinder 5) are broken. Learn how to audit transparency, equity, and accountability across pay, promotions, and decision-making.",
      topics: [
        "Why Cylinder 5 is foundational",
        "Conducting fairness audits",
        "Pay equity analysis techniques",
        "Promotion transparency frameworks",
        "Linking integrity to culture and performance"
      ],
      featured: false,
      icon: FrameworkGuideIcon
    },
    {
      id: 8,
      title: "Measuring Cultural Entropy: The Science",
      subtitle: "Research Paper",
      category: "White Papers",
      pages: "22 pages",
      fileSize: "2.5 MB",
      description: "Academic foundation for Mizan's entropy measurement methodology. Explains how structural disorder manifests, how AI agents calculate entropy scores, and validation studies across 500+ organizations.",
      topics: [
        "Theoretical foundations of entropy",
        "Multi-agent scoring algorithms",
        "Validation and reliability testing",
        "Correlation with business outcomes",
        "Comparison to traditional culture surveys"
      ],
      featured: false,
      icon: WhitepaperIcon
    }
  ];

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  const featuredResource = resources.find(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  // Compliant with AGENT_CONTEXT_ULTIMATE.md - Strict TypeScript types
  const handleDownload = (resource: Resource) => {
    // For now, direct users to demo/contact for access
    // In production, this would download from /documents/{resource-id}.pdf
    const confirmed = window.confirm(
      `Access to "${resource.title}"\n\n` +
      `This resource is available to demo participants and customers.\n\n` +
      `Would you like to request access by scheduling a demo?`
    );

    if (confirmed) {
      window.location.href = '/demo';
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation activePage="resources" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <FileText size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Knowledge Library
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl font-semibold mb-8 leading-tight text-mizan-primary">
            Resources & Downloads
          </h1>

          <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed mb-12 text-mizan-secondary">
            White papers, framework guides, case studies, and implementation playbooks. Everything you need to understand and deploy Mizan.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap smooth-transition ${
                  selectedCategory === cat
                    ? 'bg-mizan-primary text-white'
                    : 'bg-white text-mizan-secondary border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      {selectedCategory === 'All' && featuredResource && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden hover-lift">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-12 lg:p-16">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 bg-mizan-gold/10 text-mizan-gold">
                    Featured Resource
                  </div>

                  <h2 className="font-display text-4xl font-semibold mb-4 leading-tight text-mizan-primary">
                    {featuredResource.title}
                  </h2>

                  <p className="text-lg mb-2 text-mizan-gold">
                    {featuredResource.subtitle}
                  </p>

                  <p className="text-base leading-relaxed mb-8 text-mizan-secondary">
                    {featuredResource.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <p className="text-sm font-semibold text-mizan-primary">What's inside:</p>
                    {featuredResource.topics.map((topic, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle2 size={18} className="text-mizan-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-mizan-secondary">{topic}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-6 mb-8 text-sm text-mizan-secondary">
                    <span>{featuredResource.pages}</span>
                    <span>•</span>
                    <span>{featuredResource.fileSize}</span>
                    <span>•</span>
                    <span>PDF</span>
                  </div>

                  <button
                    onClick={() => handleDownload(featuredResource)}
                    className="group px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2 bg-mizan-gold text-white"
                  >
                    <Download size={18} />
                    <span>Download White Paper</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 smooth-transition" />
                  </button>
                </div>

                <div className="flex items-center justify-center p-12 bg-gradient-to-br from-mizan-primary to-mizan-secondary">
                  <WhitepaperIcon className="w-40 h-40" color="white" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularResources.map((resource, i) => {
              const Icon = resource.icon;
              const gradientClass = i % 3 === 0
                ? 'bg-gradient-to-br from-mizan-primary to-mizan-secondary'
                : i % 3 === 1
                  ? 'bg-gradient-to-br from-mizan-gold to-mizan-gold-light'
                  : 'bg-gradient-to-br from-mizan-secondary to-mizan-primary';

              return (
                <div
                  key={resource.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover-lift"
                >
                  <div className={`h-48 flex items-center justify-center ${gradientClass}`}>
                    <Icon className="w-16 h-16" color="white" />
                  </div>

                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-mizan-primary/5 text-mizan-primary">
                      {resource.category}
                    </div>

                    <h3 className="text-xl font-semibold mb-2 leading-tight text-mizan-primary">
                      {resource.title}
                    </h3>

                    <p className="text-sm mb-4 text-mizan-gold">
                      {resource.subtitle}
                    </p>

                    <p className="text-sm leading-relaxed mb-4 text-mizan-secondary">
                      {resource.description}
                    </p>

                    <div className="flex items-center space-x-4 mb-4 text-xs text-mizan-secondary">
                      <span>{resource.pages}</span>
                      <span>•</span>
                      <span>{resource.fileSize}</span>
                    </div>

                    <button
                      onClick={() => handleDownload(resource)}
                      className="w-full px-6 py-3 rounded-full text-sm font-semibold smooth-transition hover:shadow-lg flex items-center justify-center space-x-2 border-2 border-mizan-primary text-mizan-primary bg-white"
                    >
                      <Download size={16} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-mizan-secondary">
                No resources found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-mizan-gold to-mizan-gold-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-8 text-white leading-tight">
            Ready to see Mizan<br />in action?
          </h2>
          <p className="text-xl mb-12 text-white/90 font-light">
            Schedule a personalized demo to see how the 7-Cylinder Framework can transform your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="group px-10 py-5 text-lg font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center space-x-3 bg-mizan-primary text-white"
            >
              <span>Request a Demo</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 smooth-transition" />
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 text-lg font-semibold rounded-full smooth-transition hover:shadow-lg border-2 border-white text-white bg-transparent"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm mb-6 text-mizan-secondary">
            © 2025 Mizan. Aligning structure, culture & skills.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <Link href="/privacy" className="hover:opacity-60 smooth-transition text-mizan-secondary">Privacy</Link>
            <Link href="/terms" className="hover:opacity-60 smooth-transition text-mizan-secondary">Terms</Link>
            <Link href="/security" className="hover:opacity-60 smooth-transition text-mizan-secondary">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
