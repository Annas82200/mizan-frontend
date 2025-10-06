'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, CheckCircle2, Mail, User, Building, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    companySize: '',
    role: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send data to your backend API
    console.log('Demo request:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navigation activePage="pricing" />

        <section className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle2 size={64} className="mx-auto text-mizan-gold" />
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
              Request Received!
            </h1>

            <p className="text-xl mb-8 text-mizan-secondary">
              Thank you for your interest in Mizan. We'll be in touch within 24 hours to schedule your personalized demo.
            </p>

            <div className="bg-mizan-background rounded-2xl p-8 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-mizan-primary">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-mizan-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-mizan-secondary">Our team will review your request and reach out within 24 hours</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-mizan-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-mizan-secondary">We'll schedule a 45-minute personalized demo at your convenience</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 size={20} className="text-mizan-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-mizan-secondary">You'll see the 7-Cylinder Framework in action with your use case</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-lg border-2 border-mizan-primary text-mizan-primary bg-white">
                Back to Home
              </Link>
              <Link href="/resources" className="group px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center space-x-2 bg-mizan-gold text-white">
                <span>Browse Resources</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 smooth-transition" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation activePage="pricing" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <Calendar size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Schedule Your Demo
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl font-semibold mb-8 leading-tight text-mizan-primary">
            See Mizan in action
          </h1>

          <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed mb-12 text-mizan-secondary">
            Schedule a personalized 45-minute demo. We'll show you how the 7-Cylinder Framework can transform your organization.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Benefits */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-mizan-primary">
                What you'll see in your demo
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-mizan-primary/10">
                    <CheckCircle2 size={20} className="text-mizan-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-mizan-primary">Live Platform Walkthrough</h3>
                    <p className="text-sm text-mizan-secondary">
                      See how our multi-agent AI analyzes structure, culture, and skills in real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-mizan-primary/10">
                    <CheckCircle2 size={20} className="text-mizan-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-mizan-primary">7-Cylinder Framework in Action</h3>
                    <p className="text-sm text-mizan-secondary">
                      Understand how the framework measures alignment across all cylinders of your organization
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-mizan-primary/10">
                    <CheckCircle2 size={20} className="text-mizan-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-mizan-primary">Custom Use Case Discussion</h3>
                    <p className="text-sm text-mizan-secondary">
                      We'll tailor the demo to your specific organizational challenges and goals
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-mizan-primary/10">
                    <CheckCircle2 size={20} className="text-mizan-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-mizan-primary">ROI & Implementation Plan</h3>
                    <p className="text-sm text-mizan-secondary">
                      Get a customized ROI estimate and implementation roadmap for your organization
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-mizan-background rounded-2xl p-6">
                <p className="text-sm text-mizan-secondary mb-4">
                  <span className="font-semibold text-mizan-primary">Trusted by leading organizations:</span>
                </p>
                <p className="text-xs text-mizan-secondary">
                  Join tech companies, healthcare providers, and financial institutions using Mizan to build thriving organizations.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border-2 border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-mizan-primary">Request Your Demo</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                        First Name *
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent text-mizan-primary"
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent text-mizan-primary"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent text-mizan-primary"
                        placeholder="john.doe@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                      Company *
                    </label>
                    <div className="relative">
                      <Building size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent text-mizan-primary"
                        placeholder="Acme Corporation"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                      Company Size *
                    </label>
                    <div className="relative">
                      <Users size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
                      <select
                        name="companySize"
                        required
                        value={formData.companySize}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent text-mizan-primary appearance-none"
                      >
                        <option value="">Select size</option>
                        <option value="1-50">1-50 employees</option>
                        <option value="51-250">51-250 employees</option>
                        <option value="251-1000">251-1,000 employees</option>
                        <option value="1001-5000">1,001-5,000 employees</option>
                        <option value="5000+">5,000+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                      Your Role *
                    </label>
                    <input
                      type="text"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent text-mizan-primary"
                      placeholder="e.g., VP of HR, Chief People Officer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                      What are your main challenges? (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent text-mizan-primary resize-none"
                      placeholder="Tell us about your organizational challenges..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 group px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 bg-mizan-gold text-white"
                >
                  <span>Request Demo</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 smooth-transition" />
                </button>

                <p className="text-xs text-center mt-4 text-mizan-secondary">
                  By submitting this form, you agree to our{' '}
                  <Link href="/privacy" className="text-mizan-primary hover:text-mizan-gold">Privacy Policy</Link>
                  {' '}and{' '}
                  <Link href="/terms" className="text-mizan-primary hover:text-mizan-gold">Terms of Service</Link>
                </p>
              </form>
            </div>
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
            <Link href="/privacy" className="text-mizan-secondary hover:opacity-60 smooth-transition">Privacy</Link>
            <Link href="/terms" className="text-mizan-secondary hover:opacity-60 smooth-transition">Terms</Link>
            <Link href="/security" className="text-mizan-secondary hover:opacity-60 smooth-transition">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
