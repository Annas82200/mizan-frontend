"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Shield, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Determine user role and redirect accordingly
      const email = formData.email.toLowerCase();
      
      if (email === 'superadmin@mizan.com') {
        router.push('/superadmin/dashboard');
      } else if (email.includes('@mizan.com')) {
        router.push('/admin/dashboard');
      } else if (email.includes('employee') || email.includes('emp')) {
        router.push('/employee/dashboard');
      } else {
        router.push('/client/dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Invalid credentials. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'superadmin@mizan.com', password: 'demo123', role: 'Super Admin', description: 'Full platform access and management' },
    { email: 'admin@company.com', password: 'demo123', role: 'Client Admin', description: 'Company dashboard and reports' },
    { email: 'employee@company.com', password: 'demo123', role: 'Employee', description: 'Survey access and personal reports' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Mizan</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/companies" className="text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/auth/register" className="text-slate-600 hover:text-slate-900">Sign Up</Link>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Login Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-extralight text-slate-900 mb-4">Welcome Back</h1>
              <p className="text-slate-600 font-light">
                Sign in to access your organizational intelligence dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{errors.submit}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-slate-600">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Don't have an account?{' '}
                <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
              </p>
            </div>
          </div>

          {/* Right Column - Demo Accounts */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-light text-slate-900 mb-6">Demo Accounts</h2>
            <p className="text-slate-600 font-light mb-8">
              Try different user roles and experiences with these demo accounts:
            </p>

            <div className="space-y-4">
              {demoAccounts.map((account, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
                     onClick={() => {
                       setFormData(prev => ({
                         ...prev,
                         email: account.email,
                         password: account.password
                       }));
                     }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-slate-900">{account.role}</h3>
                      <p className="text-sm text-slate-600">{account.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      index === 0 ? 'bg-red-100 text-red-800' :
                      index === 1 ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {account.role.split(' ')[0]}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Email:</span>
                      <code className="bg-slate-100 px-2 py-1 rounded text-slate-700">{account.email}</code>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Password:</span>
                      <code className="bg-slate-100 px-2 py-1 rounded text-slate-700">{account.password}</code>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-blue-600 text-sm font-medium">Click to auto-fill →</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Demo Mode</h4>
                  <p className="text-sm text-amber-800">
                    These are demo accounts for testing. In production, you'll use your organization's credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}