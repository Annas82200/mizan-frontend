'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { Shield, Lock, Eye, Server, Key, FileCheck } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <Shield size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Trust & Security
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 text-mizan-primary">
            Security at Mizan
          </h1>
          <p className="text-lg text-mizan-secondary max-w-2xl mx-auto">
            Your organizational data is highly sensitive. We take security seriously with enterprise-grade protection, compliance certifications, and transparent practices.
          </p>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-lg smooth-transition">
              <Lock size={32} className="text-mizan-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-mizan-primary">Encryption Everywhere</h3>
              <p className="text-base text-mizan-secondary">
                All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your information is protected at every layer.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-lg smooth-transition">
              <Server size={32} className="text-mizan-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-mizan-primary">SOC 2 Type II Certified</h3>
              <p className="text-base text-mizan-secondary">
                Our infrastructure is audited annually against rigorous security, availability, and confidentiality standards.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-lg smooth-transition">
              <Eye size={32} className="text-mizan-gold mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-mizan-primary">24/7 Monitoring</h3>
              <p className="text-base text-mizan-secondary">
                Continuous security monitoring, threat detection, and incident response to protect your data around the clock.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents - Sticky Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-mizan-primary">Quick Navigation</h3>
                <nav className="space-y-2">
                  <a href="#infrastructure" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">Infrastructure Security</a>
                  <a href="#data-protection" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">Data Protection</a>
                  <a href="#access-controls" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">Access Controls</a>
                  <a href="#compliance" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">Compliance</a>
                  <a href="#ai-security" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">AI & Data Privacy</a>
                  <a href="#incident-response" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">Incident Response</a>
                  <a href="#vulnerability" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">Vulnerability Management</a>
                  <a href="#transparency" className="block text-sm text-mizan-secondary hover:text-mizan-gold smooth-transition">Transparency</a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                <div className="space-y-12">

                  <div id="infrastructure">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary flex items-center">
                      <Server size={24} className="mr-2 text-mizan-gold" />
                      Infrastructure Security
                    </h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      Mizan is hosted on enterprise-grade cloud infrastructure with multiple layers of protection:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>Railway & Vercel:</strong> SOC 2 certified platforms with 99.99% uptime SLA</li>
                      <li className="text-base text-mizan-secondary"><strong>AWS-backed database:</strong> PostgreSQL with automated backups and point-in-time recovery</li>
                      <li className="text-base text-mizan-secondary"><strong>DDoS protection:</strong> Cloudflare enterprise protection against attacks</li>
                      <li className="text-base text-mizan-secondary"><strong>Network isolation:</strong> Segmented networks with strict firewall rules</li>
                      <li className="text-base text-mizan-secondary"><strong>Redundancy:</strong> Multi-region failover and automated disaster recovery</li>
                    </ul>
                  </div>

                  <div id="data-protection">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary flex items-center">
                      <Lock size={24} className="mr-2 text-mizan-gold" />
                      Data Protection
                    </h2>

                    <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Encryption</h3>
                    <ul className="space-y-2 mb-4">
                      <li className="text-base text-mizan-secondary"><strong>In transit:</strong> TLS 1.3 with perfect forward secrecy</li>
                      <li className="text-base text-mizan-secondary"><strong>At rest:</strong> AES-256 encryption for all database records and file storage</li>
                      <li className="text-base text-mizan-secondary"><strong>Key management:</strong> Hardware security modules (HSM) for encryption keys</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-3 mt-6 text-mizan-primary">Data Isolation</h3>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>Tenant separation:</strong> Logical data isolation per organization</li>
                      <li className="text-base text-mizan-secondary"><strong>No cross-contamination:</strong> Your data is never mixed with other customers</li>
                      <li className="text-base text-mizan-secondary"><strong>Secure deletion:</strong> Cryptographic erasure when you delete data</li>
                    </ul>
                  </div>

                  <div id="access-controls">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary flex items-center">
                      <Key size={24} className="mr-2 text-mizan-gold" />
                      Access Controls
                    </h2>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>Role-based access control (RBAC):</strong> Granular permissions by user role</li>
                      <li className="text-base text-mizan-secondary"><strong>Multi-factor authentication (MFA):</strong> Available for all accounts</li>
                      <li className="text-base text-mizan-secondary"><strong>SSO integration:</strong> SAML 2.0 support for enterprise customers</li>
                      <li className="text-base text-mizan-secondary"><strong>Session management:</strong> Automatic timeout and secure token handling</li>
                      <li className="text-base text-mizan-secondary"><strong>Audit logs:</strong> Complete trail of all data access and modifications</li>
                      <li className="text-base text-mizan-secondary"><strong>Employee access:</strong> Zero standing access - all access is logged and time-limited</li>
                    </ul>
                  </div>

                  <div id="compliance">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary flex items-center">
                      <FileCheck size={24} className="mr-2 text-mizan-gold" />
                      Compliance & Certifications
                    </h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      We maintain compliance with major security and privacy regulations:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-gray-200 bg-mizan-background">
                        <h4 className="font-semibold mb-2 text-mizan-primary">SOC 2 Type II</h4>
                        <p className="text-sm text-mizan-secondary">Independently audited security controls</p>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-200 bg-mizan-background">
                        <h4 className="font-semibold mb-2 text-mizan-primary">GDPR</h4>
                        <p className="text-sm text-mizan-secondary">EU data protection compliance</p>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-200 bg-mizan-background">
                        <h4 className="font-semibold mb-2 text-mizan-primary">CCPA</h4>
                        <p className="text-sm text-mizan-secondary">California privacy law compliance</p>
                      </div>
                      <div className="p-4 rounded-xl border border-gray-200 bg-mizan-background">
                        <h4 className="font-semibold mb-2 text-mizan-primary">ISO 27001</h4>
                        <p className="text-sm text-mizan-secondary">Information security management (in progress)</p>
                      </div>
                    </div>
                  </div>

                  <div id="ai-security">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">AI & Data Privacy</h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      Mizan uses AI to analyze organizational data. Here's how we protect your privacy:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>No AI training on your data:</strong> Your organizational data is never used to train AI models</li>
                      <li className="text-base text-mizan-secondary"><strong>Ephemeral processing:</strong> AI analysis happens in real-time and is not retained by providers</li>
                      <li className="text-base text-mizan-secondary"><strong>Enterprise AI agreements:</strong> Data processing addendums with OpenAI, Anthropic, Google, Mistral</li>
                      <li className="text-base text-mizan-secondary"><strong>Data minimization:</strong> Only necessary data is sent to AI providers</li>
                      <li className="text-base text-mizan-secondary"><strong>Anonymization:</strong> Personal identifiers are stripped where possible</li>
                    </ul>
                  </div>

                  <div id="incident-response">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">Incident Response</h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      We have a formal incident response plan to handle security events:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>Detection:</strong> 24/7 automated monitoring and alerting</li>
                      <li className="text-base text-mizan-secondary"><strong>Containment:</strong> Immediate isolation of affected systems</li>
                      <li className="text-base text-mizan-secondary"><strong>Investigation:</strong> Root cause analysis and impact assessment</li>
                      <li className="text-base text-mizan-secondary"><strong>Notification:</strong> Timely communication to affected customers</li>
                      <li className="text-base text-mizan-secondary"><strong>Remediation:</strong> Fix vulnerabilities and restore normal operations</li>
                      <li className="text-base text-mizan-secondary"><strong>Post-mortem:</strong> Document lessons learned and improve processes</li>
                    </ul>
                  </div>

                  <div id="vulnerability">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">Vulnerability Management</h2>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>Regular penetration testing:</strong> Annual third-party security assessments</li>
                      <li className="text-base text-mizan-secondary"><strong>Bug bounty program:</strong> Responsible disclosure program (coming soon)</li>
                      <li className="text-base text-mizan-secondary"><strong>Dependency scanning:</strong> Automated checks for vulnerable libraries</li>
                      <li className="text-base text-mizan-secondary"><strong>Patch management:</strong> Critical patches applied within 24 hours</li>
                      <li className="text-base text-mizan-secondary"><strong>Code review:</strong> Security-focused peer review for all changes</li>
                    </ul>
                  </div>

                  <div id="transparency">
                    <h2 className="text-2xl font-semibold mb-4 text-mizan-primary">Transparency</h2>
                    <p className="text-base leading-relaxed mb-4 text-mizan-secondary">
                      We believe in being open about our security practices:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-base text-mizan-secondary"><strong>Security page:</strong> This page is regularly updated with our latest practices</li>
                      <li className="text-base text-mizan-secondary"><strong>Status page:</strong> Real-time platform status and incident history</li>
                      <li className="text-base text-mizan-secondary"><strong>Security questionnaires:</strong> We respond promptly to customer security inquiries</li>
                      <li className="text-base text-mizan-secondary"><strong>Documentation:</strong> Detailed security documentation available to enterprise customers</li>
                    </ul>
                  </div>

                  <div className="mt-12 p-6 rounded-2xl border bg-mizan-gold/5 border-mizan-gold">
                    <h3 className="text-lg font-semibold mb-2 text-mizan-primary">Report a Security Issue</h3>
                    <p className="text-base leading-relaxed mb-3 text-mizan-secondary">
                      If you discover a security vulnerability, please report it responsibly:
                    </p>
                    <p className="text-base text-mizan-secondary">
                      Email: <a href="mailto:security@mizan.ai" className="text-mizan-gold hover:opacity-60 font-semibold">security@mizan.ai</a>
                    </p>
                    <p className="text-sm mt-2 text-mizan-secondary">
                      We commit to acknowledging your report within 24 hours and providing regular updates on our investigation.
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
            <Link href="/privacy" className="hover:opacity-60 smooth-transition text-mizan-secondary">Privacy</Link>
            <Link href="/terms" className="hover:opacity-60 smooth-transition text-mizan-secondary">Terms</Link>
            <Link href="/security" className="hover:opacity-60 smooth-transition text-mizan-gold">Security</Link>
          </div>
          <p className="text-sm text-center text-mizan-secondary">
            © 2025 Mizan. Aligning structure, culture & skills.
          </p>
        </div>
      </footer>
    </div>
  );
}
