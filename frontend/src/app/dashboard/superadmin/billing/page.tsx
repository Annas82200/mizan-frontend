'use client';

import React from 'react';
import { DollarSign, TrendingUp, Users, AlertCircle } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
          Billing & Revenue
        </h1>
        <p className="text-lg text-mizan-secondary">
          Platform revenue, subscriptions, and financial analytics
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <div className="flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Coming Soon</h2>
            <p className="text-blue-800">
              The Billing & Revenue module is under development. This will include subscription management, revenue analytics, invoicing, and payment processing.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <DollarSign className="w-8 h-8 text-mizan-gold mb-4" />
          <h3 className="text-lg font-semibold mb-2">Revenue Tracking</h3>
          <p className="text-sm text-mizan-secondary">MRR, ARR, and growth metrics</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <Users className="w-8 h-8 text-mizan-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Subscription Management</h3>
          <p className="text-sm text-mizan-secondary">Plans, billing cycles, and upgrades</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <TrendingUp className="w-8 h-8 text-mizan-secondary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Financial Analytics</h3>
          <p className="text-sm text-mizan-secondary">Churn, retention, and forecasting</p>
        </div>
      </div>
    </div>
  );
}
