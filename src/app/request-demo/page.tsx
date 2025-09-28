"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    employees: '',
    role: '',
    interest: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send form data to backend first, then redirect to your actual Calendly
    // TODO: Replace 'your-calendly-username' with your actual Calendly username
    window.open('https://calendly.com/your-calendly-username/mizan-demo', '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Mizan</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/companies" className="text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/companies/about" className="text-slate-600 hover:text-slate-900">About</Link>
            <Link href="/companies/demo" className="text-slate-600 hover:text-slate-900">Demo</Link>
            <Link href="/companies/pricing" className="text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link href="/companies/demo" className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-light hover:bg-slate-800 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-extralight text-slate-900 mb-8 leading-tight">
            Book Your
            <span className="block bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Demo
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed mb-8">
            See how Mizan's AI-powered organizational intelligence can transform 
            your company's culture, structure, and performance.
          </p>
        </div>
      </section>

      {/* Demo Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-900 mb-4">What You'll See in Your Demo</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A personalized walkthrough of our platform tailored to your organization's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">Live Analysis Demo</h3>
              <p className="text-slate-600 font-light">
                Watch real-time culture, structure, and skills analysis using your industry data
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">Custom Use Cases</h3>
              <p className="text-slate-600 font-light">
                Explore specific scenarios and challenges relevant to your organization
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">Implementation Plan</h3>
              <p className="text-slate-600 font-light">
                Get a tailored roadmap for deploying Mizan in your organization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Form and Calendly */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Form */}
            <div>
              <h2 className="text-3xl font-light text-slate-900 mb-8">Tell Us About Your Organization</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john.smith@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Company Size</label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Your Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select role</option>
                      <option value="CEO/Founder">CEO/Founder</option>
                      <option value="HR/People Operations">HR/People Operations</option>
                      <option value="Operations">Operations</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Primary Interest</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select primary interest</option>
                    <option value="Culture Analysis">Culture Analysis</option>
                    <option value="Structure Analysis">Structure Analysis</option>
                    <option value="Skills Analysis">Skills Analysis</option>
                    <option value="Complete Platform">Complete Platform</option>
                    <option value="Consulting Services">Consulting Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your specific challenges or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-4 px-8 rounded-xl font-medium hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Schedule Demo
                  <ArrowRight className="w-5 h-5 ml-3" />
                </button>
              </form>
            </div>

            {/* Calendly Embed Preview */}
            <div>
              <h2 className="text-3xl font-light text-slate-900 mb-8">Available Time Slots</h2>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-900 mb-2">30-Minute Demo</h3>
                  <p className="text-slate-600 font-light">
                    Personalized walkthrough with our team
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-slate-500 mr-3" />
                      <span className="text-slate-700">Duration</span>
                    </div>
                    <span className="font-medium text-slate-900">30 minutes</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-slate-500 mr-3" />
                      <span className="text-slate-700">Format</span>
                    </div>
                    <span className="font-medium text-slate-900">Video call</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-slate-500 mr-3" />
                      <span className="text-slate-700">Preparation</span>
                    </div>
                    <span className="font-medium text-slate-900">None required</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-4">
                    Or schedule directly on Calendly
                  </p>
                  <a
                    href="https://calendly.com/your-calendly-username/mizan-demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Open Calendly
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-slate-900 mb-12">What Happens Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Schedule Call</h3>
              <p className="text-slate-600 font-light">
                Pick a time that works for you from our available slots
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Personalized Demo</h3>
              <p className="text-slate-600 font-light">
                See Mizan in action with examples relevant to your industry
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Next Steps</h3>
              <p className="text-slate-600 font-light">
                Get a custom implementation plan and pricing for your organization
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
