import React from 'react';
import Link from 'next/link';
import { MizanIcons } from '../../../components/icons/mizan-custom-icons';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">
            <MizanIcons.Lock className="w-8 h-8" color="white" />
          </div>
          <h1 className="text-3xl font-extralight text-slate-900 mb-4">Reset Password</h1>
          <p className="text-slate-600 font-light">
            Enter your email to receive password reset instructions
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-amber-500 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-amber-600 transition-all"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
