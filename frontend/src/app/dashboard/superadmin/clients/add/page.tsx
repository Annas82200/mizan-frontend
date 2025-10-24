'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Upload, FileText, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Define the type for the form data
interface FormData {
    name: string;
    industry: string;
    employeeCount: number;
    vision: string;
    mission: string;
    strategy: string;
    values: string[];
    structureFile?: File; // CSV file for organizational structure
}

export default function AddClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    industry: '',
    employeeCount: 0,
    vision: '',
    mission: '',
    strategy: '',
    values: [],
  });

  const handleInputChange = (field: keyof FormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleValuesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(',').map(v => v.trim()).filter(v => v);
    setFormData(prev => ({ ...prev, values }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.industry) {
      setError('Company name and industry are required');
      return;
    }

    if (!formData.structureFile) {
      setError('Please upload a structure CSV file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('companyName', formData.name);
      submitData.append('industry', formData.industry);
      submitData.append('vision', formData.vision);
      submitData.append('mission', formData.mission);
      submitData.append('strategy', formData.strategy);

      // Values are already an array in formData
      submitData.append('values', JSON.stringify(formData.values));

      if (formData.structureFile) {
        submitData.append('structureFile', formData.structureFile);
      }

      // ✅ PRODUCTION: Use httpOnly cookies for authentication (Phase 1 Security)
      const response = await fetch(`${apiUrl}/api/superadmin/clients`, {
        method: 'POST',
        credentials: 'include',  // Send httpOnly cookie automatically
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Failed to create client');
      }

      const data = await response.json();
      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/dashboard/superadmin/tenants');
      }, 2000);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create client. Please try again.');
    } finally {
      setLoading(false);
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
            {formData.name} has been added to the platform
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
      <div className="max-w-5xl mx-auto">
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
            Create a new client organization with strategic information and structure
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm space-y-8">

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
                placeholder="Acme Corporation"
                required
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
                required
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

          {/* Vision */}
          <div>
            <label className="block text-sm font-semibold text-mizan-primary mb-2">
              Vision Statement
            </label>
            <textarea
              value={formData.vision}
              onChange={(e) => handleInputChange('vision', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
              placeholder="The long-term vision of the organization..."
            />
          </div>

          {/* Mission */}
          <div>
            <label className="block text-sm font-semibold text-mizan-primary mb-2">
              Mission Statement
            </label>
            <textarea
              value={formData.mission}
              onChange={(e) => handleInputChange('mission', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
              placeholder="The core purpose and reason for existence..."
            />
          </div>

          {/* Strategy */}
          <div>
            <label className="block text-sm font-semibold text-mizan-primary mb-2">
              Strategy
            </label>
            <textarea
              value={formData.strategy}
              onChange={(e) => handleInputChange('strategy', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
              placeholder="Strategic approach and key goals..."
            />
          </div>

          {/* Values */}
          <div>
            <label className="block text-sm font-semibold text-mizan-primary mb-2">
              Core Values
            </label>
            <input
              type="text"
              value={formData.values.join(', ')}
              onChange={handleValuesChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent transition-all duration-400"
              placeholder="Integrity, Innovation, Excellence, Customer-First (comma-separated)"
            />
            <p className="text-xs text-mizan-secondary mt-2">
              Enter values separated by commas
            </p>
          </div>

          {/* CSV Upload */}
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
                required
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
                Columns: Name, Email, Title, Department, Manager Email
              </p>
              <code className="text-xs bg-white px-2 py-1 rounded text-blue-900 block overflow-x-auto">
                Name,Email,Title,Department,Manager Email<br/>
                John Doe,john@company.com,CEO,Executive,<br/>
                Jane Smith,jane@company.com,VP Engineering,Engineering,john@company.com
              </code>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              href="/dashboard/superadmin/tenants"
              className="px-6 py-3 border border-gray-300 text-mizan-secondary rounded-xl hover:bg-gray-50 transition-all duration-400"
            >
              Cancel
            </Link>
            <button
              type="submit"
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
          </div>
        </form>
      </div>
    </div>
  );
}
