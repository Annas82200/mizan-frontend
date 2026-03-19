'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Blocks, ToggleLeft, ToggleRight, Settings, ChevronRight } from 'lucide-react';

interface ModuleConfig {
  id: string;
  moduleId: string;
  isEnabled: boolean;
  isConfigured: boolean;
  customLabel: string | null;
  displayOrder: number;
  settings: Record<string, unknown>;
}

const MODULE_INFO: Record<string, { label: string; description: string; icon: string }> = {
  structure: { label: 'Org Structure', description: 'Organizational structure analysis and reporting lines', icon: '🏗️' },
  culture: { label: 'Culture', description: '7-Cylinder culture assessment and values alignment', icon: '🎯' },
  skills: { label: 'Skills', description: 'Competency mapping, gap analysis, and benchmarking', icon: '⚡' },
  performance: { label: 'Performance', description: 'Goals, evaluations, 360 feedback, and calibration', icon: '📊' },
  hiring: { label: 'Hiring', description: 'Requisitions, candidate pipeline, and interview scheduling', icon: '👥' },
  onboarding: { label: 'Onboarding', description: 'Workflows, checklists, mentor matching, and 30/60/90 plans', icon: '🚀' },
  lxp: { label: 'Learning (LXP)', description: 'AI-generated courses, learning paths, and certifications', icon: '📚' },
  talent: { label: 'Talent', description: 'Succession planning, development plans, and 9-box grid', icon: '⭐' },
  bonus: { label: 'Bonus', description: 'Compensation cycles, criteria-based calculations, and distribution', icon: '💰' },
  engagement: { label: 'Engagement', description: 'Pulse surveys, recognition, gamification, and challenges', icon: '🎮' },
};

export default function ModuleSettingsPage() {
  const [modules, setModules] = useState<ModuleConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { loadModules(); }, []);

  const loadModules = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/api/modules');
      setModules((response.data as { modules: ModuleConfig[] }).modules);
    } catch (err) {
      setError('Failed to load module configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModule = async (moduleId: string, isEnabled: boolean) => {
    try {
      await apiClient.patch(`/api/modules/${moduleId}/toggle`, { isEnabled });
      setModules(prev => prev.map(m => m.moduleId === moduleId ? { ...m, isEnabled } : m));
    } catch (err) {
      setError('Failed to toggle module');
    }
  };

  const allModuleIds = Object.keys(MODULE_INFO);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Blocks className="h-6 w-6" />
          Module Configuration
        </h1>
        <p className="text-gray-500 mt-1">Enable, disable, and configure platform modules for your organization</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      <div className="space-y-3">
        {allModuleIds.map((moduleId) => {
          const info = MODULE_INFO[moduleId];
          const config = modules.find(m => m.moduleId === moduleId);
          const isEnabled = config?.isEnabled ?? false;

          return (
            <div key={moduleId} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {config?.customLabel || info.label}
                    </h3>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {config?.isConfigured && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">Configured</span>
                  )}
                  <button
                    onClick={() => toggleModule(moduleId, !isEnabled)}
                    className="flex items-center"
                  >
                    {isEnabled ? (
                      <ToggleRight className="h-8 w-8 text-green-500" />
                    ) : (
                      <ToggleLeft className="h-8 w-8 text-gray-300" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
