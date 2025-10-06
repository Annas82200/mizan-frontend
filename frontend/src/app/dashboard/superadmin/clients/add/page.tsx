'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Upload, FileText, Building2, Target, Lightbulb, TrendingUp, Heart, Users, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  // Step 1: Company Info
  companyName: string;
  industry: string;

  // Step 2: Vision
  vision: string;

  // Step 3: Mission
  mission: string;

  // Step 4: Strategy
  strategy: string;

  // Step 5: Values
  values: string[];

  // Step 6: Structure CSV
  structureFile: File | null;
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
    vision: '',
    mission: '',
    strategy: '',
    values: [''],
    structureFile: null,
  });

  const steps = [
    { number: 1, title: 'Company Info', icon: <Building2 className="w-5 h-5" />, description: 'Name and industry' },
    { number: 2, title: 'Vision', icon: <Target className="w-5 h-5" />, description: 'Long-term vision' },
    { number: 3, title: 'Mission', icon: <Lightbulb className="w-5 h-5" />, description: 'Core purpose' },
    { number: 4, title: 'Strategy', icon: <TrendingUp className="w-5 h-5" />, description: 'Strategic goals' },
    { number: 5, title: 'Values', icon: <Heart className="w-5 h-5" />, description: 'Core values' },
    { number: 6, title: 'Structure', icon: <Users className="w-5 h-5" />, description: 'Upload CSV' },
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const addValue = () => {
    setFormData(prev => ({
      ...prev,
      values: [...prev.values, '']
    }));
  };

  const updateValue = (index: number, value: string) => {
    const newValues = [...formData.values];
    newValues[index] = value;
    setFormData(prev => ({ ...prev, values: newValues }));
  };

  const removeValue = (index: number) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        return;
      }
      setFormData(prev => ({ ...prev, structureFile: file }));
      setError('');
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.companyName || !formData.industry) {
          setError('Company name and industry are required');
          return false;
        }
        break;
      case 2:
        if (!formData.vision) {
          setError('Vision statement is required');
          return false;
        }
        break;
      case 3:
        if (!formData.mission) {
          setError('Mission statement is required');
          return false;
        }
        break;
      case 4:
        if (!formData.strategy) {
          setError('Strategy is required');
          return false;
        }
        break;
      case 5:
        const filledValues = formData.values.filter(v => v.trim());
        if (filledValues.length === 0) {
          setError('At least one value is required');
          return false;
        }
        break;
      case 6:
        if (!formData.structureFile) {
          setError('Please upload a structure CSV file');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('companyName', formData.companyName);
      submitData.append('industry', formData.industry);
      submitData.append('vision', formData.vision);
      submitData.append('mission', formData.mission);
      submitData.append('strategy', formData.strategy);
      submitData.append('values', JSON.stringify(formData.values.filter(v => v.trim())));

      if (formData.structureFile) {
        submitData.append('structureFile', formData.structureFile);
      }

      const response = await fetch(`${apiUrl}/api/superadmin/clients`, {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create client');
      }

      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/dashboard/superadmin/tenants');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to create client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
                placeholder="e.g., Acme Corporation"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-2">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
              >
                <option value="">Select industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Education">Education</option>
                <option value="Consulting">Consulting</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-2">
                Vision Statement *
              </label>
              <p className="text-sm text-mizan-secondary mb-3">
                The long-term vision of the organization - where it aspires to be
              </p>
              <textarea
                value={formData.vision}
                onChange={(e) => handleInputChange('vision', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
                placeholder="e.g., To be the world's leading provider of sustainable technology solutions that empower businesses to thrive while protecting our planet..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-2">
                Mission Statement *
              </label>
              <p className="text-sm text-mizan-secondary mb-3">
                The core purpose and reason for existence - what the organization does and why
              </p>
              <textarea
                value={formData.mission}
                onChange={(e) => handleInputChange('mission', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
                placeholder="e.g., Our mission is to deliver innovative technology solutions that help businesses operate more efficiently, sustainably, and ethically..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-2">
                Strategy *
              </label>
              <p className="text-sm text-mizan-secondary mb-3">
                The strategic approach and key goals for achieving the vision
              </p>
              <textarea
                value={formData.strategy}
                onChange={(e) => handleInputChange('strategy', e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
                placeholder="e.g., Focus on three strategic pillars: 1) Product Innovation - Develop cutting-edge solutions, 2) Customer Success - Build lasting partnerships, 3) Sustainable Growth - Expand responsibly..."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="block text-sm font-semibold text-mizan-primary">
                    Core Values *
                  </label>
                  <p className="text-sm text-mizan-secondary">
                    The fundamental beliefs that guide behavior and decisions
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addValue}
                  className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-all duration-400 text-sm font-medium"
                >
                  + Add Value
                </button>
              </div>

              <div className="space-y-3">
                {formData.values.map((value, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => updateValue(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
                      placeholder="e.g., Integrity, Innovation, Customer-First, Excellence"
                    />
                    {formData.values.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeValue(index)}
                        className="px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-400"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-2">
                Organizational Structure (CSV) *
              </label>
              <p className="text-sm text-mizan-secondary mb-4">
                Upload a CSV file with employee data and reporting structure
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-mizan-gold transition-all duration-400">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csvUpload"
                />
                <label
                  htmlFor="csvUpload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="w-12 h-12 text-mizan-gold mb-4" />
                  {formData.structureFile ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-mizan-primary">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">{formData.structureFile.name}</span>
                      </div>
                      <p className="text-sm text-mizan-secondary">
                        {(formData.structureFile.size / 1024).toFixed(2)} KB
                      </p>
                      <button
                        type="button"
                        className="text-sm text-mizan-gold hover:underline"
                      >
                        Change file
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-mizan-primary font-medium mb-1">
                        Click to upload CSV file
                      </p>
                      <p className="text-sm text-mizan-secondary">
                        or drag and drop
                      </p>
                    </div>
                  )}
                </label>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm font-semibold text-blue-900 mb-2">CSV Format:</p>
                <p className="text-xs text-blue-800 mb-2">
                  The CSV should include columns: Name, Email, Title, Department, Manager Email
                </p>
                <code className="text-xs bg-white px-2 py-1 rounded text-blue-900 block">
                  Name,Email,Title,Department,Manager Email<br/>
                  John Doe,john@company.com,CEO,Executive,<br/>
                  Jane Smith,jane@company.com,VP Engineering,Engineering,john@company.com
                </code>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen p-8 bg-mizan-background flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 text-center max-w-md border border-gray-200 shadow-xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-mizan-primary mb-3">
            Client Created Successfully!
          </h2>
          <p className="text-mizan-secondary mb-6">
            {formData.companyName} has been added to the platform
          </p>
          <p className="text-sm text-mizan-secondary">
            Redirecting to tenant management...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-mizan-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/superadmin/tenants"
            className="inline-flex items-center text-mizan-secondary hover:text-mizan-primary transition-colors duration-400 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tenants
          </Link>
          <h1 className="font-display text-4xl font-semibold text-mizan-primary mb-2">
            Add New Client
          </h1>
          <p className="text-lg text-mizan-secondary">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 ${
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-mizan-gold text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <p className="text-xs font-medium text-mizan-secondary mt-2 text-center">
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 bg-gray-200 rounded">
                    <div
                      className="h-full bg-mizan-gold rounded transition-all duration-400"
                      style={{ width: currentStep > step.number ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-6">
          <h2 className="text-2xl font-semibold text-mizan-primary mb-6">
            {steps[currentStep - 1].description}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 text-mizan-secondary rounded-xl hover:bg-gray-50 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center space-x-2 shadow-lg"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Create Client</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
