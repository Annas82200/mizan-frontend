'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { superadminService } from '@/services/dashboard.service';
import { LoadingSpinner } from '@/components/dashboard';

interface FormData {
  // Company Information
  companyName: string;
  industry: string;
  website: string;
  location: string;
  companySize: string;

  // Subscription
  plan: string;
  billingCycle: string;
  employees: number;

  // Primary Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactTitle: string;

  // Framework Configuration
  cylinders: {
    structure: boolean;
    culture: boolean;
    skills: boolean;
    performance: boolean;
    hiring: boolean;
    learning: boolean;
    engagement: boolean;
  };

  // Settings
  startDate: string;
  notes: string;
}

export default function AddClientPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    website: '',
    location: '',
    companySize: '',
    plan: 'growth',
    billingCycle: 'monthly',
    employees: 0,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactTitle: '',
    cylinders: {
      structure: true,
      culture: true,
      skills: true,
      performance: true,
      hiring: true,
      learning: true,
      engagement: true,
    },
    startDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const steps = [
    { number: 1, title: 'Company Info', description: 'Basic company details' },
    { number: 2, title: 'Subscription', description: 'Plan and billing' },
    { number: 3, title: 'Contact', description: 'Primary contact person' },
    { number: 4, title: 'Framework', description: '7-Cylinder configuration' },
    { number: 5, title: 'Review', description: 'Confirm and create' },
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleCylinderToggle = (cylinder: keyof typeof formData.cylinders) => {
    setFormData(prev => ({
      ...prev,
      cylinders: {
        ...prev.cylinders,
        [cylinder]: !prev.cylinders[cylinder],
      },
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.companyName || !formData.industry || !formData.location) {
          setError('Please fill in all required company fields');
          return false;
        }
        break;
      case 2:
        if (!formData.plan || formData.employees <= 0) {
          setError('Please select a plan and enter employee count');
          return false;
        }
        break;
      case 3:
        if (!formData.contactName || !formData.contactEmail || !formData.contactPhone) {
          setError('Please fill in all contact fields');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
          setError('Please enter a valid email address');
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      await superadminService.createTenant(formData);
      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard/superadmin/tenants');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create tenant. Please try again.');
      setLoading(false);
    }
  };

  const getPlanPrice = (plan: string, cycle: string) => {
    const prices: Record<string, { monthly: number; annual: number }> = {
      starter: { monthly: 833, annual: 8000 },
      growth: { monthly: 5625, annual: 54000 },
      scale: { monthly: 20000, annual: 192000 },
      enterprise: { monthly: 49000, annual: 470000 },
    };

    return prices[plan]?.[cycle as 'monthly' | 'annual'] || 0;
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-mizan-background">
        <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-display font-semibold mb-4 text-mizan-primary">
            Client Created!
          </h2>
          <p className="text-mizan-secondary mb-8">
            {formData.companyName} has been successfully added to the platform.
          </p>
          <div className="animate-pulse text-sm text-mizan-gold">
            Redirecting to tenant list...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-mizan-background">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/superadmin/tenants"
            className="inline-flex items-center space-x-2 text-mizan-secondary hover:text-mizan-gold transition-colors duration-400 mb-4"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Tenants</span>
          </Link>
          <h1 className="font-display text-4xl font-semibold text-mizan-primary mb-2">
            Add New Client
          </h1>
          <p className="text-lg text-mizan-secondary">
            Onboard a new organization to the Mizan platform
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-500 ${
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-mizan-gold text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-mizan-secondary'
                    }`}
                  >
                    {currentStep > step.number ? <Check size={20} /> : step.number}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-mizan-primary' : 'text-mizan-secondary'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-mizan-secondary hidden md:block">
                      {step.description}
                    </p>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 transition-all duration-500 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 animate-shake">
            <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Form Steps */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-mizan-primary mb-6">Company Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                    placeholder="Acme Corporation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                    placeholder="https://acme.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                    placeholder="San Francisco, CA"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Company Size
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                  >
                    <option value="">Select size</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Subscription */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-mizan-primary mb-6">Subscription Details</h2>

              <div>
                <label className="block text-sm font-medium text-mizan-primary mb-4">
                  Select Plan *
                </label>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['starter', 'growth', 'scale', 'enterprise'].map((plan) => (
                    <button
                      key={plan}
                      onClick={() => handleInputChange('plan', plan)}
                      className={`p-6 border-2 rounded-2xl transition-all duration-400 text-left ${
                        formData.plan === plan
                          ? 'border-mizan-gold bg-yellow-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-mizan-primary'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-mizan-primary capitalize mb-2">
                        {plan}
                      </h3>
                      <p className="text-2xl font-bold text-mizan-gold mb-1">
                        ${(getPlanPrice(plan, formData.billingCycle) / 1000).toFixed(1)}K
                      </p>
                      <p className="text-xs text-mizan-secondary">
                        per {formData.billingCycle === 'monthly' ? 'month' : 'year'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Billing Cycle
                  </label>
                  <div className="flex items-center space-x-4 bg-gray-50 p-1 rounded-xl">
                    <button
                      onClick={() => handleInputChange('billingCycle', 'monthly')}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-400 ${
                        formData.billingCycle === 'monthly'
                          ? 'bg-white text-mizan-primary shadow-md'
                          : 'text-mizan-secondary'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => handleInputChange('billingCycle', 'annual')}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-400 ${
                        formData.billingCycle === 'annual'
                          ? 'bg-white text-mizan-primary shadow-md'
                          : 'text-mizan-secondary'
                      }`}
                    >
                      Annual (Save 20%)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Number of Employees *
                  </label>
                  <input
                    type="number"
                    value={formData.employees || ''}
                    onChange={(e) => handleInputChange('employees', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                    placeholder="150"
                    min="1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-mizan-primary mb-6">Primary Contact</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                    placeholder="Sarah Johnson"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.contactTitle}
                    onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                    placeholder="HR Director"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                    placeholder="sarah@acme.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-mizan-primary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Framework Configuration */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-mizan-primary mb-2">7-Cylinder Framework</h2>
              <p className="text-mizan-secondary mb-6">
                Select which cylinders this client will have access to. All are enabled by default.
              </p>

              <div className="space-y-3">
                {Object.entries(formData.cylinders).map(([key, enabled]) => (
                  <div
                    key={key}
                    className={`p-5 border-2 rounded-2xl transition-all duration-400 cursor-pointer ${
                      enabled
                        ? 'border-mizan-gold bg-yellow-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                    onClick={() => handleCylinderToggle(key as keyof typeof formData.cylinders)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          enabled ? 'bg-mizan-gold' : 'bg-gray-300'
                        }`}>
                          <span className="text-white text-lg font-bold">
                            {key.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-mizan-primary capitalize">
                            {key} Cylinder
                          </h3>
                          <p className="text-sm text-mizan-secondary">
                            {key === 'structure' && 'Organizational structure and entropy analysis'}
                            {key === 'culture' && 'Culture assessment and alignment'}
                            {key === 'skills' && 'Skills mapping and capability gaps'}
                            {key === 'performance' && 'Performance management and reviews'}
                            {key === 'hiring' && 'Recruitment and talent acquisition'}
                            {key === 'learning' && 'Learning paths and development'}
                            {key === 'engagement' && 'Employee engagement and satisfaction'}
                          </p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${
                        enabled
                          ? 'border-mizan-gold bg-mizan-gold'
                          : 'border-gray-300'
                      }`}>
                        {enabled && <Check size={16} className="text-white" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-mizan-primary mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-primary text-mizan-primary"
                  placeholder="Any additional notes or special requirements..."
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-mizan-primary mb-6">Review & Confirm</h2>

              <div className="space-y-6">
                {/* Company Info */}
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-semibold text-mizan-primary mb-4 flex items-center space-x-2">
                    <span className="text-lg">⬢</span>
                    <span>Company Information</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-mizan-secondary">Company Name</p>
                      <p className="font-medium text-mizan-primary">{formData.companyName}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Industry</p>
                      <p className="font-medium text-mizan-primary">{formData.industry}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Location</p>
                      <p className="font-medium text-mizan-primary">{formData.location}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Website</p>
                      <p className="font-medium text-mizan-primary">{formData.website || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Subscription */}
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-semibold text-mizan-primary mb-4 flex items-center space-x-2">
                    <span className="text-lg">△</span>
                    <span>Subscription</span>
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-mizan-secondary">Plan</p>
                      <p className="font-medium text-mizan-primary capitalize">{formData.plan}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Billing</p>
                      <p className="font-medium text-mizan-primary capitalize">{formData.billingCycle}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Price</p>
                      <p className="font-medium text-mizan-gold">
                        ${(getPlanPrice(formData.plan, formData.billingCycle) / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Employees</p>
                      <p className="font-medium text-mizan-primary">{formData.employees}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Start Date</p>
                      <p className="font-medium text-mizan-primary">{formData.startDate}</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-semibold text-mizan-primary mb-4 flex items-center space-x-2">
                    <span className="text-lg">◉</span>
                    <span>Primary Contact</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-mizan-secondary">Name</p>
                      <p className="font-medium text-mizan-primary">{formData.contactName}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Title</p>
                      <p className="font-medium text-mizan-primary">{formData.contactTitle || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Email</p>
                      <p className="font-medium text-mizan-primary">{formData.contactEmail}</p>
                    </div>
                    <div>
                      <p className="text-mizan-secondary">Phone</p>
                      <p className="font-medium text-mizan-primary">{formData.contactPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Framework */}
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-semibold text-mizan-primary mb-4 flex items-center space-x-2">
                    <span className="text-lg">◇</span>
                    <span>Enabled Cylinders</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(formData.cylinders)
                      .filter(([_, enabled]) => enabled)
                      .map(([key]) => (
                        <span
                          key={key}
                          className="px-4 py-2 bg-mizan-gold text-white rounded-full text-sm font-medium capitalize"
                        >
                          {key}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-xl text-mizan-secondary font-medium hover:bg-gray-50 transition-all duration-400 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-mizan-primary text-white rounded-xl font-medium hover:shadow-lg transition-all duration-400 hover:scale-105"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-mizan-gold text-white rounded-xl font-medium hover:shadow-lg transition-all duration-400 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Creating Client...</span>
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    <span>Create Client</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5ms ease-in-out;
        }
      `}</style>
    </div>
  );
}
