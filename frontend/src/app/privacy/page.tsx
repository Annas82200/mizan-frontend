'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <Shield size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Legal
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
            Privacy Policy
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
                  <a href="#section-1" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">1. Information We Collect</a>
                  <a href="#section-2" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">2. How We Use Data</a>
                  <a href="#section-3" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">3. Data Security</a>
                  <a href="#section-4" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">4. Data Sharing</a>
                  <a href="#section-5" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">5. Your Rights</a>
                  <a href="#section-6" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">6. Data Retention</a>
                  <a href="#section-7" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">7. International Transfers</a>
                  <a href="#section-8" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">8. Children's Privacy</a>
                  <a href="#section-9" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">9. Policy Changes</a>
                  <a href="#section-10" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">10. Contact Us</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">

                <div className="mb-12 p-6 rounded-2xl border bg-mizan-background border-gray-200">
                  <p className="text-base leading-relaxed text-mizan-secondary">
                    <strong className="text-mizan-primary">Important:</strong> This privacy policy describes how Mizan collects, uses, and protects your data. By using our service, you agree to the practices described here. This is a template and should be reviewed by your legal counsel before publication.
                  </p>
                </div>

                <div className="space-y-12">
                  <div id="section-1">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">1. Information We Collect</h2>

                    <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Information You Provide</h3>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      When you use Mizan, you provide us with:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="text-base text-mizan-secondary">Account information (name, email, company name, role)</li>
                      <li className="text-base text-mizan-secondary">Organizational data (structure charts, employee information, cultural assessments)</li>
                      <li className="text-base text-mizan-secondary">Payment information (processed securely through Stripe)</li>
                      <li className="text-base text-mizan-secondary">Communications with our support team</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Information We Collect Automatically</h3>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary">Usage data (features used, time spent, interactions)</li>
                      <li className="text-base text-mizan-secondary">Device information (browser type, IP address, operating system)</li>
                      <li className="text-base text-mizan-secondary">Cookies and similar tracking technologies</li>
                    </ul>
                  </div>

                  <div id="section-2">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">2. How We Use Your Information</h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      We use your information to:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary">Provide and improve our AI-powered organizational analysis services</li>
                      <li className="text-base text-mizan-secondary">Generate entropy scores, alignment metrics, and recommendations</li>
                      <li className="text-base text-mizan-secondary">Communicate with you about your account and our services</li>
                      <li className="text-base text-mizan-secondary">Process payments and prevent fraud</li>
                      <li className="text-base text-mizan-secondary">Comply with legal obligations</li>
                      <li className="text-base text-mizan-secondary">Improve our platform through aggregated, anonymized analytics</li>
                    </ul>
                  </div>

                  <div id="section-3">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">3. Data Security</h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      We implement industry-standard security measures to protect your data:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary">End-to-end encryption for data in transit (TLS 1.3)</li>
                      <li className="text-base text-mizan-secondary">Encryption at rest (AES-256)</li>
                      <li className="text-base text-mizan-secondary">SOC 2 Type II certified infrastructure</li>
                      <li className="text-base text-mizan-secondary">Role-based access controls</li>
                      <li className="text-base text-mizan-secondary">Regular security audits and penetration testing</li>
                      <li className="text-base text-mizan-secondary">24/7 monitoring and incident response</li>
                    </ul>
                  </div>

                  <div id="section-4">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">4. Data Sharing and Disclosure</h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      <strong>We never sell your data.</strong> We only share your information in limited circumstances:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>With your consent:</strong> When you explicitly authorize us to share data</li>
                      <li className="text-base text-mizan-secondary"><strong>Service providers:</strong> Third-party vendors who help us operate (e.g., AWS for hosting, Stripe for payments)</li>
                      <li className="text-base text-mizan-secondary"><strong>Legal requirements:</strong> When required by law or to protect rights and safety</li>
                      <li className="text-base text-mizan-secondary"><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    </ul>
                  </div>

                  <div id="section-5">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">5. Your Rights</h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      You have the right to:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>Access:</strong> Request a copy of your personal data</li>
                      <li className="text-base text-mizan-secondary"><strong>Correction:</strong> Update or correct inaccurate information</li>
                      <li className="text-base text-mizan-secondary"><strong>Deletion:</strong> Request deletion of your data (subject to legal obligations)</li>
                      <li className="text-base text-mizan-secondary"><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                      <li className="text-base text-mizan-secondary"><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                      <li className="text-base text-mizan-secondary"><strong>Restriction:</strong> Request limited processing of your data</li>
                    </ul>
                    <p className="text-base leading-relaxed mt-4 text-mizan-secondary">
                      To exercise these rights, contact us at <a href="mailto:privacy@mizan.ai" className="text-mizan-gold hover:opacity-60">privacy@mizan.ai</a>
                    </p>
                  </div>

                  <div id="section-6">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">6. Data Retention</h2>
                    <p className="text-base leading-relaxed text-mizan-secondary">
                      We retain your data for as long as your account is active or as needed to provide services. After account termination, we delete or anonymize your data within 90 days, unless longer retention is required by law.
                    </p>
                  </div>

                  <div id="section-7">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">7. International Data Transfers</h2>
                    <p className="text-base leading-relaxed text-mizan-secondary">
                      Your data may be processed in the United States and other countries where we or our service providers operate. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.
                    </p>
                  </div>

                  <div id="section-8">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">8. Children's Privacy</h2>
                    <p className="text-base leading-relaxed text-mizan-secondary">
                      Mizan is not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from children.
                    </p>
                  </div>

                  <div id="section-9">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">9. Changes to This Policy</h2>
                    <p className="text-base leading-relaxed text-mizan-secondary">
                      We may update this privacy policy from time to time. We will notify you of material changes via email or through the platform. Continued use after changes constitutes acceptance of the updated policy.
                    </p>
                  </div>

                  <div id="section-10">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">10. Contact Us</h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      If you have questions about this privacy policy or our data practices:
                    </p>
                    <div className="p-6 rounded-2xl border bg-mizan-background border-gray-200">
                      <p className="text-base mb-2 text-mizan-primary"><strong>Mizan, Inc.</strong></p>
                      <p className="text-base mb-1 text-mizan-secondary">Email: <a href="mailto:privacy@mizan.ai" className="text-mizan-gold hover:opacity-60">privacy@mizan.ai</a></p>
                      <p className="text-base mb-1 text-mizan-secondary">Data Protection Officer: <a href="mailto:dpo@mizan.ai" className="text-mizan-gold hover:opacity-60">dpo@mizan.ai</a></p>
                      <p className="text-base text-mizan-secondary">Address: [Your Company Address]</p>
                    </div>
                  </div>

                  <div className="mt-12 p-6 rounded-2xl border bg-mizan-gold/5 border-mizan-gold">
                    <p className="text-sm leading-relaxed text-mizan-secondary">
                      <strong className="text-mizan-primary">GDPR & CCPA Compliance:</strong> This policy is designed to comply with the EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). For California residents, please see our <Link href="/ccpa" className="text-mizan-gold hover:opacity-60">CCPA Notice</Link>.
                    </p>
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
            <Link href="/privacy" className="hover:opacity-60 smooth-transition text-mizan-gold">Privacy</Link>
            <Link href="/terms" className="hover:opacity-60 smooth-transition text-mizan-secondary">Terms</Link>
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
