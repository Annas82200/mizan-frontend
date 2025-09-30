"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../contexts/auth";

export default function Register() {
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<"individual" | "company">("individual");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    companyName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        companyName: accountType === "company" ? formData.companyName : undefined,
        accountType: accountType,
        role: accountType === "company" ? "clientAdmin" : "employee",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-mizanLight py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-mizanDark">Create Account</h1>
            <p className="text-sm text-mizanDark/70 mt-2">
              Start your journey to organizational excellence
            </p>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-mizanDark mb-4">
                  What type of account would you like to create?
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setAccountType("individual");
                    setStep(2);
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-mizanTeal transition-colors text-left"
                >
                  <h3 className="font-semibold text-mizanDark">Individual Account</h3>
                  <p className="text-sm text-mizanDark/70 mt-1">
                    For consultants, HR leaders, or employees joining an existing organization
                  </p>
                </button>

                <button
                  onClick={() => {
                    setAccountType("company");
                    setStep(2);
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-mizanTeal transition-colors text-left"
                >
                  <h3 className="font-semibold text-mizanDark">Company Account</h3>
                  <p className="text-sm text-mizanDark/70 mt-1">
                    For organizations starting their Mizan journey
                  </p>
                </button>
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/auth/login"
                  className="text-sm text-mizanTeal hover:text-mizanTeal/80"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {accountType === "company" && (
                <div>
                  <label className="block text-sm font-medium text-mizanDark mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mizanTeal focus:border-transparent"
                    placeholder="Acme Corporation"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-mizanDark mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mizanTeal focus:border-transparent"
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mizanDark mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mizanTeal focus:border-transparent"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mizanDark mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mizanTeal focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
                <p className="text-xs text-mizanDark/60 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-mizanDark mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mizanTeal focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-mizanTeal border-gray-300 rounded focus:ring-mizanTeal mt-0.5"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-mizanDark/70">
                  I agree to the{" "}
                  <Link href="/terms" className="text-mizanTeal hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-mizanTeal hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-mizanDark rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-mizanGold text-white rounded-lg hover:bg-mizanGold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          )}
        </div>

        {accountType === "company" && step === 2 && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h3 className="font-semibold text-mizanDark mb-3">What's included:</h3>
            <ul className="space-y-2 text-sm text-mizanDark/70">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-mizanTeal mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                30-day free trial of all Pro features
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-mizanTeal mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free Org Design Analyzer (always free)
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-mizanTeal mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
