'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Paintbrush, Upload, Eye, Save, Globe, Type, Palette } from 'lucide-react';

interface BrandingConfig {
  companyName: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  fontFamilySans: string;
  fontFamilyDisplay: string;
  logoUrl: string | null;
  logoDarkUrl: string | null;
  faviconUrl: string | null;
  sidebarLogoUrl: string | null;
  loginBackgroundUrl: string | null;
  customCss: string | null;
  showPoweredBy: boolean;
}

export default function BrandingSettingsPage() {
  const [branding, setBranding] = useState<BrandingConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadBranding();
  }, []);

  const loadBranding = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/api/branding');
      setBranding(response.data as BrandingConfig);
    } catch (err) {
      setError('Failed to load branding configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const saveBranding = async () => {
    if (!branding) return;
    setIsSaving(true);
    setSuccessMsg('');
    try {
      const response = await apiClient.put('/api/branding', branding as unknown as Record<string, unknown>);
      setBranding(response.data as BrandingConfig);
      setSuccessMsg('Branding saved successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('Failed to save branding');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof BrandingConfig, value: string | boolean) => {
    if (!branding) return;
    setBranding({ ...branding, [field]: value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Paintbrush className="h-6 w-6" />
            Brand Settings
          </h1>
          <p className="text-gray-500 mt-1">Customize the platform appearance for your organization</p>
        </div>
        <button
          onClick={saveBranding}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
      {successMsg && <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">{successMsg}</div>}

      {branding && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Company Info */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-gray-400" />
              Company Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={branding.companyName || ''}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input
                  type="text"
                  value={branding.logoUrl || ''}
                  onChange={(e) => updateField('logoUrl', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Favicon URL</label>
                <input
                  type="text"
                  value={branding.faviconUrl || ''}
                  onChange={(e) => updateField('faviconUrl', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={branding.showPoweredBy}
                  onChange={(e) => updateField('showPoweredBy', e.target.checked)}
                  className="rounded"
                />
                <label className="text-sm text-gray-600">Show &quot;Powered by&quot; badge</label>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-gray-400" />
              Brand Colors
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'primaryColor', label: 'Primary' },
                { key: 'secondaryColor', label: 'Secondary' },
                { key: 'accentColor', label: 'Accent' },
                { key: 'backgroundColor', label: 'Background' },
                { key: 'textPrimaryColor', label: 'Text Primary' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={branding[key as keyof BrandingConfig] as string}
                      onChange={(e) => updateField(key as keyof BrandingConfig, e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded border"
                    />
                    <input
                      type="text"
                      value={branding[key as keyof BrandingConfig] as string}
                      onChange={(e) => updateField(key as keyof BrandingConfig, e.target.value)}
                      className="flex-1 rounded-lg border px-3 py-2 text-sm font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Type className="h-5 w-5 text-gray-400" />
              Typography
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Font</label>
                <select
                  value={branding.fontFamilySans}
                  onChange={(e) => updateField('fontFamilySans', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Source Sans Pro">Source Sans Pro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Font</label>
                <select
                  value={branding.fontFamilyDisplay}
                  onChange={(e) => updateField('fontFamilyDisplay', e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                >
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Merriweather">Merriweather</option>
                  <option value="Lora">Lora</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Montserrat">Montserrat</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-gray-400" />
              Live Preview
            </h2>
            <div
              className="rounded-lg p-4"
              style={{ backgroundColor: branding.backgroundColor }}
            >
              <div className="rounded-lg p-4" style={{ backgroundColor: '#fff' }}>
                <h3 style={{ color: branding.textPrimaryColor, fontFamily: branding.fontFamilyDisplay }} className="text-lg font-semibold">
                  {branding.companyName || 'Your Company'}
                </h3>
                <p style={{ color: branding.textPrimaryColor, fontFamily: branding.fontFamilySans }} className="text-sm mt-1">
                  This is how your platform will look with these brand settings.
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    className="rounded-lg px-3 py-1.5 text-xs text-white"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="rounded-lg px-3 py-1.5 text-xs text-white"
                    style={{ backgroundColor: branding.accentColor }}
                  >
                    Accent Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
