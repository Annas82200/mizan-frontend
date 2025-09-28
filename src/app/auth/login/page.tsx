"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MizanIcons } from '../../../components/icons/mizan-custom-icons';

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
      const password = formData.password;
      
      // Superadmin access - replace with your actual credentials
      if (email === 'anna@mizan.com' && password === 'MizanAdmin2024!') {
        console.log('Superadmin login successful, redirecting to superadmin dashboard');
        router.push('/superadmin/dashboard');
      } else if (email === 'demo@mizan.com' && password === 'demo123') {
        // Demo client access
        router.push('/client/dashboard');
      } else if (email === 'employee@demo.com' && password === 'demo123') {
        // Demo employee access
        router.push('/employee/dashboard');
      } else {
        // Invalid credentials
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setErrors({ submit: 'Invalid credentials. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Secure login - no demo accounts displayed publicly

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
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">
                🔐
              </div>
              <h1 className="text-4xl font-extralight text-slate-900 mb-4">Welcome Back</h1>
              <p className="text-slate-600 font-light">
                Sign in to access your organizational intelligence dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
                  <MizanIcons.Warning className="w-5 h-5 mr-3 flex-shrink-0" color="#dc2626" />
                  <span className="text-red-700 text-sm">{errors.submit}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <MizanIcons.Email className="w-5 h-5" color="#94a3b8" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none transition-all ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#4CB3A9',
                    focusBorderColor: '#4CB3A9'
                  } as any}
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
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <MizanIcons.Lock className="w-5 h-5" color="#94a3b8" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none transition-all ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                  style={{ 
                    '--tw-ring-color': '#4CB3A9',
                    focusBorderColor: '#4CB3A9'
                  } as any}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? 
                      <MizanIcons.EyeClosed className="w-5 h-5" color="#94a3b8" /> : 
                      <MizanIcons.EyeOpen className="w-5 h-5" color="#94a3b8" />
                    }
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
                  className="w-full text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #CCA404 0%, #4CB3A9 100%)' }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <MizanIcons.ArrowRight className="w-5 h-5 ml-2" color="white" />
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

          {/* Right Column - Platform Information */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-light text-slate-900 mb-6">Mizan Platform Access</h2>
            <p className="text-slate-600 font-light mb-8">
              Access your organizational intelligence dashboard with your secure credentials.
            </p>

            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-medium text-blue-900 mb-3">🔐 Secure Access</h3>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Your login credentials provide access to role-specific dashboards with 
                  subscription-based features and organizational intelligence tools.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-medium text-green-900 mb-3">📊 AI-Powered Insights</h3>
                <p className="text-sm text-green-800 leading-relaxed">
                  Access comprehensive analysis of your organization's culture, structure, 
                  skills, engagement, and performance through our advanced AI agents.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="font-medium text-amber-900 mb-3">🎯 Subscription Features</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Features available depend on your subscription tier. Upgrade anytime 
                  to unlock advanced analytics and enterprise capabilities.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 mb-4">
                Need an account?
              </p>
              <Link href="/companies/pricing" className="text-blue-600 hover:text-blue-700 font-medium">
                View Plans & Pricing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}