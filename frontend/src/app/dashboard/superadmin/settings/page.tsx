'use client';

import React from 'react';
import { Settings, AlertCircle, Shield, Bell, Database, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
          Platform Settings
        </h1>
        <p className="text-lg text-mizan-secondary">
          Configure platform-wide settings and preferences
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <div className="flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Coming Soon</h2>
            <p className="text-blue-800">
              Platform Settings is under development. This will include system configuration, security settings, integrations, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <Shield className="w-8 h-8 text-mizan-gold mb-4" />
          <h3 className="text-lg font-semibold mb-2">Security & Authentication</h3>
          <p className="text-sm text-mizan-secondary">SSO, MFA, and access controls</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <Bell className="w-8 h-8 text-mizan-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <p className="text-sm text-mizan-secondary">Email, SMS, and in-app alerts</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <Database className="w-8 h-8 text-mizan-secondary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Data Management</h3>
          <p className="text-sm text-mizan-secondary">Backups, exports, and retention</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <Key className="w-8 h-8 text-mizan-gold mb-4" />
          <h3 className="text-lg font-semibold mb-2">API Keys & Integrations</h3>
          <p className="text-sm text-mizan-secondary">Third-party integrations and webhooks</p>
        </div>
      </div>
    </div>
  );
}
