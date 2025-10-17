'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, Eye, EyeOff, Shield, CheckCircle2 } from 'lucide-react';
import { SecureIcon } from '@/components/icons';
import { login } from '@/services/auth.service';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Call the backend API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Login failed');
      }

      const data = await response.json();

      // Store both token AND user data (CRITICAL FIX as per AGENT_CONTEXT_ULTIMATE.md)
      localStorage.setItem('mizan_auth_token', data.token);
      localStorage.setItem('mizan_user', JSON.stringify(data.user));

      // Show success message
      setLoginSuccess(true);

      // Redirect based on role after 1 second
      setTimeout(() => {
        // Enhanced role mapping for all possible roles
        const redirectMap: Record<string, string> = {
          'superadmin': '/dashboard/superadmin',
          'clientAdmin': '/dashboard/admin',
          'admin': '/dashboard/admin',
          'employee': '/dashboard/employee',
          'default': '/dashboard'
        };
        
        const redirectPath = redirectMap[data.user.role] || redirectMap.default;
        window.location.href = redirectPath;
      }, 1000);

    } catch (error: unknown) {
      setErrors({ general: error instanceof Error ? error.message : 'Login failed. Please check your credentials.' });
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const securityFeatures = [
    "SOC 2 Type II Certified",
    "End-to-end encryption",
    "SSO/SAML for Enterprise",
    "Multi-factor authentication"
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation activePage="login" />

      {/* Main Content */}
      <section className="min-h-screen flex items-center justify-center px-4 py-32">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Info & Security */}
            <div className="hidden lg:block">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
                <Shield size={16} className="text-mizan-primary" />
                <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
                  Secure Access
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 leading-tight text-mizan-primary">
                Welcome back
              </h1>

              <p className="text-xl font-light leading-relaxed mb-12 text-mizan-secondary">
                Access your Mizan dashboard to view real-time organizational insights, entropy scores, and AI-powered recommendations.
              </p>

              {/* Security Features */}
              <div className="space-y-4 mb-12">
                {securityFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 size={20} className="text-mizan-primary" />
                    <span className="text-sm text-mizan-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Visual Element */}
              <div className="p-12 rounded-3xl flex items-center justify-center bg-gradient-to-br from-mizan-primary to-mizan-secondary">
                <SecureIcon className="w-32 h-32" color="white" />
              </div>
            </div>

            {/* Right: Login Form */}
            <div>
              {!loginSuccess ? (
                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl">
                  <div className="mb-8">
                    <h2 className="text-3xl font-semibold mb-2 text-mizan-primary">
                      Sign in to Mizan
                    </h2>
                    <p className="text-base text-mizan-secondary">
                      Enter your credentials to access your dashboard
                    </p>
                  </div>

                  {errors.general && (
                    <div className="mb-6 p-4 rounded-xl border bg-red-50 border-red-200">
                      <p className="text-sm text-red-600">{errors.general}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:ring-offset-0 text-base text-mizan-primary ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="you@company.com"
                        />
                      </div>
                      {errors.email && <p className="text-xs mt-1 text-red-600">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-mizan-primary">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-12 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:ring-offset-0 text-base text-mizan-primary ${
                            errors.password ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-mizan-secondary"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs mt-1 text-red-600">{errors.password}</p>}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-mizan-gold focus:ring-mizan-gold"
                        />
                        <span className="text-sm text-mizan-secondary">Remember me</span>
                      </label>
                      <Link href="/forgot-password" className="text-sm font-medium hover:opacity-60 smooth-transition text-mizan-gold">
                        Forgot password?
                      </Link>
                    </div>

                    {/* Login Button */}
                    <button
                      onClick={handleLogin}
                      disabled={loading}
                      className="w-full group px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed bg-mizan-gold text-white"
                    >
                      <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                      {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 smooth-transition" />}
                    </button>

                    {/* Divider */}
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-mizan-secondary">Don't have an account?</span>
                      </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                      <Link href="/demo" className="text-sm font-medium hover:opacity-60 smooth-transition text-mizan-primary">
                        Request a demo to get started →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                // Success State
                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-mizan-gold/10">
                    <CheckCircle2 size={40} className="text-mizan-gold" />
                  </div>

                  <h3 className="text-3xl font-semibold mb-4 text-mizan-primary">
                    Welcome back!
                  </h3>

                  <p className="text-lg mb-8 leading-relaxed text-mizan-secondary">
                    Redirecting you to your dashboard...
                  </p>

                  <div className="inline-flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-mizan-gold"></div>
                    <div className="w-2 h-2 rounded-full animate-pulse bg-mizan-gold" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse bg-mizan-gold" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm mb-6 text-mizan-secondary">
            © 2025 Mizan. Aligning structure, culture & skills.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <Link href="/privacy" className="hover:opacity-60 smooth-transition text-mizan-secondary">Privacy</Link>
            <Link href="/terms" className="hover:opacity-60 smooth-transition text-mizan-secondary">Terms</Link>
            <Link href="/security" className="hover:opacity-60 smooth-transition text-mizan-secondary">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
