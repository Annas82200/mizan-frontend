'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight, Building2, Mail, Eye, EyeOff, User, CheckCircle2, Shield } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the Terms and Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Call the backend API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();

      // Show success message
      setSignupSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login?registered=true';
      }, 2000);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border border-mizan-primary bg-mizan-primary/5">
              <Shield size={16} className="text-mizan-primary" />
              <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
                Secure Sign Up
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-mizan-primary">
              Create your account
            </h1>
            <p className="text-lg text-mizan-secondary">
              Start aligning structure, culture & skills in minutes
            </p>
          </div>

          {/* Success Message */}
          {signupSuccess && (
            <div className="mb-6 p-6 rounded-2xl bg-green-50 border border-green-200 flex items-start space-x-3">
              <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 mb-1">Account created successfully!</p>
                <p className="text-sm text-green-700">Redirecting you to login...</p>
              </div>
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{errors.general}</p>
            </div>
          )}

          {/* Sign Up Form */}
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8">
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-mizan-primary">
                    First Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mizan-secondary" />
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border ${
                        errors.firstName ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold smooth-transition text-mizan-primary`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && <p className="mt-1.5 text-xs text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-mizan-primary">
                    Last Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mizan-secondary" />
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border ${
                        errors.lastName ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold smooth-transition text-mizan-primary`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && <p className="mt-1.5 text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-mizan-primary">
                  Work Email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mizan-secondary" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold smooth-transition text-mizan-primary`}
                    placeholder="john@company.com"
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2 text-mizan-primary">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-mizan-secondary" />
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl border ${
                      errors.company ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold smooth-transition text-mizan-primary`}
                    placeholder="Acme Inc"
                  />
                </div>
                {errors.company && <p className="mt-1.5 text-xs text-red-600">{errors.company}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-mizan-primary">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full pl-4 pr-12 py-3.5 rounded-xl border ${
                      errors.password ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold smooth-transition text-mizan-primary`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-mizan-secondary hover:text-mizan-primary smooth-transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
                <p className="mt-1.5 text-xs text-mizan-secondary">
                  Must be 8+ characters with uppercase, lowercase, and number
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-mizan-primary">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full pl-4 pr-12 py-3.5 rounded-xl border ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold smooth-transition text-mizan-primary`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-mizan-secondary hover:text-mizan-primary smooth-transition"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-mizan-gold focus:ring-mizan-gold focus:ring-offset-0"
                  />
                  <span className="text-sm text-mizan-secondary group-hover:text-mizan-primary smooth-transition">
                    I agree to the <Link href="/terms" className="text-mizan-gold hover:opacity-60">Terms of Service</Link> and <Link href="/privacy" className="text-mizan-gold hover:opacity-60">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreedToTerms && <p className="mt-1.5 text-xs text-red-600 ml-7">{errors.agreedToTerms}</p>}
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSignup}
                disabled={loading || signupSuccess}
                className="w-full px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 bg-mizan-gold text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span>Creating account...</span>
                ) : signupSuccess ? (
                  <span>Success!</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-mizan-secondary">
                  Already have an account?{' '}
                  <Link href="/login" className="text-mizan-gold hover:opacity-60 font-semibold smooth-transition">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-mizan-secondary">
              🔒 Your data is encrypted and secure. We never share your information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
