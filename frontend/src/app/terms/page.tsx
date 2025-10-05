'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { FileText, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <FileText size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Legal
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
            Terms of Service
          </h1>
          <p className="text-lg text-mizan-secondary">
            Last updated: September 30, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">

            {/* Table of Contents - Sticky Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-mizan-primary">Quick Navigation</h3>
                <nav className="space-y-2">
                  <a href="#section-1" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">1. Acceptance</a>
                  <a href="#section-2" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">2. Service Description</a>
                  <a href="#section-3" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">3. Account Registration</a>
                  <a href="#section-4" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">4. Billing</a>
                  <a href="#section-5" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">5. Data Ownership</a>
                  <a href="#section-6" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">6. Acceptable Use</a>
                  <a href="#section-7" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">7. Intellectual Property</a>
                  <a href="#section-8" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">8. Warranties</a>
                  <a href="#section-9" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">9. Liability</a>
                  <a href="#section-10" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">10. Indemnification</a>
                  <a href="#section-11" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">11. Termination</a>
                  <a href="#section-12" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">12. Changes to Terms</a>
                  <a href="#section-13" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">13. Governing Law</a>
                  <a href="#section-14" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">14. Contact</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">

              <div className="mb-12 p-6 rounded-2xl border bg-red-50 border-red-200">
            <div className="flex items-start space-x-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-red-500" />
              <p className="text-base leading-relaxed text-mizan-secondary">
                <strong className="text-red-600">Legal Review Required:</strong> This is a template. You must have your legal counsel review and customize these terms before publication.
              </p>
            </div>
          </div>

              <div className="space-y-12">
                <div id="section-1">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">1. Acceptance of Terms</h2>
              <p className="text-base leading-relaxed text-mizan-secondary">
                By accessing or using Mizan's platform and services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Service.
              </p>
            </div>

                <div id="section-2">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">2. Service Description</h2>
              <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                Mizan provides an AI-powered platform for organizational analysis, including:
              </p>
              <ul className="space-y-2">
                <li className="text-base text-mizan-secondary">Structure analysis and entropy measurement</li>
                <li className="text-base text-mizan-secondary">Culture assessment using the 7-Cylinder Framework</li>
                <li className="text-base text-mizan-secondary">Skills analysis and capability mapping</li>
                <li className="text-base text-mizan-secondary">Multi-agent AI insights and recommendations</li>
                <li className="text-base text-mizan-secondary">Performance management and development tools</li>
              </ul>
            </div>

                <div id="section-3">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">3. Account Registration</h2>
              <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                To use Mizan, you must:
              </p>
              <ul className="space-y-2">
                <li className="text-base text-mizan-secondary">Provide accurate and complete registration information</li>
                <li className="text-base text-mizan-secondary">Maintain the security of your account credentials</li>
                <li className="text-base text-mizan-secondary">Promptly notify us of any unauthorized account access</li>
                <li className="text-base text-mizan-secondary">Be at least 18 years old or the age of majority in your jurisdiction</li>
                <li className="text-base text-mizan-secondary">Have authority to bind your organization to these Terms</li>
              </ul>
            </div>

                <div id="section-4">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">4. Subscription and Billing</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Subscription Plans</h3>
              <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                Mizan offers multiple subscription tiers (Free, Starter, Growth, Scale, Enterprise). Pricing is per-employee per month, billed annually or monthly as selected.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Payment Terms</h3>
              <ul className="space-y-2 mb-4">
                <li className="text-base text-mizan-secondary">Payment is due at the beginning of each billing cycle</li>
                <li className="text-base text-mizan-secondary">Annual subscriptions are non-refundable after 30 days</li>
                <li className="text-base text-mizan-secondary">We reserve the right to change pricing with 30 days notice</li>
                <li className="text-base text-mizan-secondary">Failure to pay may result in service suspension</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Cancellation</h3>
              <p className="text-base leading-relaxed text-mizan-secondary">
                You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period. No refunds for partial months.
              </p>
            </div>

                <div id="section-5">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">5. Data Ownership and Usage</h2>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Your Data</h3>
              <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                You retain all rights to your organizational data. We do not sell your data. By using the Service, you grant us a limited license to process your data solely to provide the Service.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">AI Training</h3>
              <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                We may use aggregated, anonymized data to improve our AI models. Individual organizational data is never used for training without explicit permission.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Data Export</h3>
              <p className="text-base leading-relaxed text-mizan-secondary">
                You can export your data at any time. Upon account termination, we will provide a 30-day window to export data before deletion.
              </p>
            </div>

                <div id="section-6">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">6. Acceptable Use</h2>
              <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                You agree not to:
              </p>
              <ul className="space-y-2">
                <li className="text-base text-mizan-secondary">Violate any laws or regulations</li>
                <li className="text-base text-mizan-secondary">Upload malicious code or attempt to breach security</li>
                <li className="text-base text-mizan-secondary">Reverse engineer or copy the Service</li>
                <li className="text-base text-mizan-secondary">Share access credentials with unauthorized users</li>
                <li className="text-base text-mizan-secondary">Use the Service for spam or harassment</li>
                <li className="text-base text-mizan-secondary">Scrape or automate access without permission</li>
              </ul>
            </div>

                <div id="section-7">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">7. Intellectual Property</h2>
                  <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                    The Mizan platform, including the 7-Cylinder Framework, AI models, software, and documentation, are protected by copyright, trademark, and other intellectual property laws. We grant you a limited, non-exclusive, non-transferable license to use the Service.
                  </p>
                </div>

                <div id="section-8">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">8. Warranties and Disclaimers</h2>
                  <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                    THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
                  </p>
                  <p className="text-base leading-relaxed text-mizan-secondary">
                    While we strive for accuracy, AI-generated insights are recommendations, not guarantees. You are responsible for decisions made based on Mizan's analysis.
                  </p>
                </div>

                <div id="section-9">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">9. Limitation of Liability</h2>
                  <p className="text-base leading-relaxed text-mizan-secondary">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, MIZAN SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
                  </p>
                  <p className="text-base leading-relaxed mt-4 text-mizan-secondary">
                    Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.
                  </p>
                </div>

                <div id="section-10">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">10. Indemnification</h2>
                  <p className="text-base leading-relaxed text-mizan-secondary">
                    You agree to indemnify and hold Mizan harmless from any claims, damages, or expenses arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.
                  </p>
                </div>

                <div id="section-11">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">11. Termination</h2>
              <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                We may suspend or terminate your account if you violate these Terms. Upon termination:
              </p>
              <ul className="space-y-2">
                <li className="text-base text-mizan-secondary">Your access to the Service ends immediately</li>
                <li className="text-base text-mizan-secondary">You have 30 days to export your data</li>
                <li className="text-base text-mizan-secondary">Fees paid are non-refundable</li>
                <li className="text-base text-mizan-secondary">Provisions regarding data, liability, and disputes survive termination</li>
              </ul>
            </div>

                <div id="section-12">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">12. Changes to Terms</h2>
                  <p className="text-base leading-relaxed text-mizan-secondary">
                    We may modify these Terms at any time. Material changes will be notified via email or the platform. Continued use after changes constitutes acceptance.
                  </p>
                </div>

                <div id="section-13">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">13. Governing Law and Disputes</h2>
                  <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                    These Terms are governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved through binding arbitration in [Your Location], except where prohibited by law.
                  </p>
                </div>

                <div id="section-14">
                  <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">14. Contact</h2>
              <div className="p-6 rounded-2xl border bg-mizan-background border-gray-200">
                <p className="text-base mb-2 text-mizan-primary"><strong>Mizan, Inc.</strong></p>
                <p className="text-base mb-1 text-mizan-secondary">Email: <a href="mailto:legal@mizan.ai" className="text-mizan-gold hover:opacity-60">legal@mizan.ai</a></p>
                <p className="text-base text-mizan-secondary">Address: [Your Company Address]</p>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-8 text-sm mb-6">
            <Link href="/privacy" className="hover:opacity-60 smooth-transition text-mizan-secondary">Privacy</Link>
            <Link href="/terms" className="hover:opacity-60 smooth-transition text-mizan-gold">Terms</Link>
            <Link href="/security" className="hover:opacity-60 smooth-transition text-mizan-secondary">Security</Link>
          </div>
          <p className="text-sm text-center text-mizan-secondary">
            © 2025 Mizan. Aligning structure, culture & skills.
          </p>
        </div>
      </footer>
    </div>
  );
}
