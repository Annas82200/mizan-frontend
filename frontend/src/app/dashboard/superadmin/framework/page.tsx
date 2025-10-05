'use client';

import React, { useState } from 'react';
import { Save, RotateCcw, Download, Upload, Check, AlertCircle } from 'lucide-react';
import {
  FrameworkIcon,
  StructureIcon,
  CultureIcon,
  SkillsIcon,
  PerformanceIcon,
  HiringIcon,
  LXPIcon
} from '@/components/icons';

interface CylinderConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  weight: number;
  thresholds: {
    excellent: number;
    good: number;
    fair: number;
  };
  features: {
    id: string;
    name: string;
    enabled: boolean;
  }[];
}

export default function FrameworkConfigPage() {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [selectedCylinder, setSelectedCylinder] = useState<string | null>('structure');

  const [cylinders, setCylinders] = useState<CylinderConfig[]>([
    {
      id: 'structure',
      name: 'Structure',
      icon: <StructureIcon className="w-6 h-6" />,
      enabled: true,
      weight: 15,
      thresholds: { excellent: 85, good: 70, fair: 50 },
      features: [
        { id: 'entropy-analysis', name: 'Entropy Analysis', enabled: true },
        { id: 'org-chart', name: 'Org Chart Visualization', enabled: true },
        { id: 'span-control', name: 'Span of Control Analysis', enabled: true },
        { id: 'reporting-chains', name: 'Reporting Chain Optimization', enabled: false }
      ]
    },
    {
      id: 'culture',
      name: 'Culture',
      icon: <CultureIcon className="w-6 h-6" />,
      enabled: true,
      weight: 15,
      thresholds: { excellent: 85, good: 70, fair: 50 },
      features: [
        { id: 'surveys', name: 'Culture Surveys', enabled: true },
        { id: 'alignment', name: 'Values Alignment Assessment', enabled: true },
        { id: 'sentiment', name: 'Sentiment Analysis', enabled: true },
        { id: 'pulse', name: 'Weekly Pulse Checks', enabled: false }
      ]
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <SkillsIcon className="w-6 h-6" />,
      enabled: true,
      weight: 15,
      thresholds: { excellent: 85, good: 70, fair: 50 },
      features: [
        { id: 'skills-matrix', name: 'Skills Matrix', enabled: true },
        { id: 'gap-analysis', name: 'Capability Gap Analysis', enabled: true },
        { id: 'skills-mapping', name: 'Skills Mapping', enabled: true },
        { id: 'competency', name: 'Competency Framework', enabled: true }
      ]
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: <PerformanceIcon className="w-6 h-6" />,
      enabled: true,
      weight: 15,
      thresholds: { excellent: 85, good: 70, fair: 50 },
      features: [
        { id: 'reviews', name: '360° Reviews', enabled: true },
        { id: 'goals', name: 'Goal Management (OKRs)', enabled: true },
        { id: 'feedback', name: 'Continuous Feedback', enabled: true },
        { id: 'calibration', name: 'Performance Calibration', enabled: false }
      ]
    },
    {
      id: 'hiring',
      name: 'Hiring',
      icon: <HiringIcon className="w-6 h-6" />,
      enabled: true,
      weight: 10,
      thresholds: { excellent: 85, good: 70, fair: 50 },
      features: [
        { id: 'requisitions', name: 'Requisition Management', enabled: true },
        { id: 'candidates', name: 'Candidate Pipeline', enabled: true },
        { id: 'interviews', name: 'Interview Scheduling', enabled: true },
        { id: 'ai-screening', name: 'AI-Powered Screening', enabled: false }
      ]
    },
    {
      id: 'lxp',
      name: 'Learning (LXP)',
      icon: <LXPIcon className="w-6 h-6" />,
      enabled: true,
      weight: 15,
      thresholds: { excellent: 85, good: 70, fair: 50 },
      features: [
        { id: 'courses', name: 'Course Library', enabled: true },
        { id: 'paths', name: 'Learning Paths', enabled: true },
        { id: 'recommendations', name: 'AI Recommendations', enabled: true },
        { id: 'certifications', name: 'Certifications', enabled: false }
      ]
    },
    {
      id: 'engagement',
      name: 'Engagement',
      icon: <span className="text-2xl">◉</span>,
      enabled: true,
      weight: 15,
      thresholds: { excellent: 85, good: 70, fair: 50 },
      features: [
        { id: 'surveys', name: 'Engagement Surveys', enabled: true },
        { id: 'recognition', name: 'Recognition & Rewards', enabled: true },
        { id: 'wellbeing', name: 'Wellbeing Programs', enabled: true },
        { id: 'initiatives', name: 'Employee Initiatives', enabled: false }
      ]
    }
  ]);

  const selectedCylinderData = cylinders.find(c => c.id === selectedCylinder);
  const totalWeight = cylinders.reduce((sum, c) => sum + c.weight, 0);

  const handleWeightChange = (id: string, newWeight: number) => {
    setCylinders(prev => prev.map(c =>
      c.id === id ? { ...c, weight: Math.max(0, Math.min(100, newWeight)) } : c
    ));
  };

  const handleThresholdChange = (id: string, type: 'excellent' | 'good' | 'fair', value: number) => {
    setCylinders(prev => prev.map(c =>
      c.id === id
        ? { ...c, thresholds: { ...c.thresholds, [type]: Math.max(0, Math.min(100, value)) } }
        : c
    ));
  };

  const handleFeatureToggle = (cylinderId: string, featureId: string) => {
    setCylinders(prev => prev.map(c =>
      c.id === cylinderId
        ? {
            ...c,
            features: c.features.map(f =>
              f.id === featureId ? { ...f, enabled: !f.enabled } : f
            )
          }
        : c
    ));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    // API call to save configuration
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1500);
  };

  const handleReset = () => {
    if (confirm('Reset to default configuration? This will undo all custom changes.')) {
      // Reset logic will be implemented via API
      setSaveStatus('idle');
    }
  };

  const handleExport = () => {
    const config = JSON.stringify(cylinders, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mizan-framework-config.json';
    a.click();
  };

  return (
    <div className="min-h-screen p-8 bg-mizan-background">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
              Framework Configuration
            </h1>
            <p className="text-lg text-mizan-secondary">
              Configure the 7-Cylinder Mizan Framework for all tenants
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl text-mizan-secondary font-medium hover:bg-gray-50 transition-all duration-400"
            >
              <Download size={18} />
              <span>Export</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl text-mizan-secondary font-medium hover:bg-gray-50 transition-all duration-400"
            >
              <RotateCcw size={18} />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-400 hover:shadow-lg ${
                saveStatus === 'saved'
                  ? 'bg-green-500 text-white'
                  : 'bg-mizan-gold text-white hover:scale-105'
              }`}
            >
              {saveStatus === 'saving' && <span className="animate-spin">⭘</span>}
              {saveStatus === 'saved' && <Check size={18} />}
              {(saveStatus === 'idle' || saveStatus === 'error') && <Save size={18} />}
              <span>
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
              </span>
            </button>
          </div>
        </div>

        {/* Weight Warning */}
        {totalWeight !== 100 && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start space-x-3">
            <AlertCircle size={20} className="text-mizan-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-mizan-primary">
                Weight Distribution Warning
              </p>
              <p className="text-sm text-mizan-secondary mt-1">
                Total weight is {totalWeight}%. It should equal 100% for accurate scoring.
              </p>
            </div>
          </div>
        )}

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Cylinder List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-mizan-primary mb-4">
                7 Cylinders
              </h2>

              <div className="space-y-2">
                {cylinders.map((cylinder) => (
                  <button
                    key={cylinder.id}
                    onClick={() => setSelectedCylinder(cylinder.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-400 ${
                      selectedCylinder === cylinder.id
                        ? 'bg-mizan-primary text-white shadow-lg'
                        : 'hover:bg-gray-50 text-mizan-secondary'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={selectedCylinder === cylinder.id ? 'text-white' : 'text-mizan-primary'}>
                        {cylinder.icon}
                      </div>
                      <span className="font-medium">{cylinder.name}</span>
                    </div>
                    <span className={`text-sm ${selectedCylinder === cylinder.id ? 'text-white' : 'text-mizan-gold'}`}>
                      {cylinder.weight}%
                    </span>
                  </button>
                ))}
              </div>

              {/* Total Weight */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-mizan-primary">Total Weight</span>
                  <span className={`text-2xl font-bold ${
                    totalWeight === 100 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {totalWeight}%
                  </span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      totalWeight === 100 ? 'bg-green-500' : totalWeight < 100 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(totalWeight, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Cylinder Configuration */}
          <div className="lg:col-span-2">
            {selectedCylinderData && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                {/* Cylinder Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-mizan-primary bg-opacity-5 flex items-center justify-center text-mizan-primary">
                      {selectedCylinderData.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-mizan-primary">
                        {selectedCylinderData.name} Cylinder
                      </h2>
                      <p className="text-sm text-mizan-secondary mt-1">
                        Configure settings and features for this cylinder
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weight Configuration */}
                <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                  <label className="block text-sm font-semibold text-mizan-primary mb-4">
                    Weight Allocation (%)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedCylinderData.weight}
                      onChange={(e) => handleWeightChange(selectedCylinderData.id, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #CCA404 0%, #CCA404 ${selectedCylinderData.weight}%, #e5e5e5 ${selectedCylinderData.weight}%, #e5e5e5 100%)`
                      }}
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={selectedCylinderData.weight}
                      onChange={(e) => handleWeightChange(selectedCylinderData.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-center font-semibold text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-primary"
                    />
                    <span className="text-mizan-secondary">%</span>
                  </div>
                </div>

                {/* Thresholds */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-mizan-primary mb-4">
                    Score Thresholds
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-mizan-secondary mb-2">
                        Excellent (&gt;)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={selectedCylinderData.thresholds.excellent}
                        onChange={(e) => handleThresholdChange(selectedCylinderData.id, 'excellent', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-mizan-secondary mb-2">
                        Good (&gt;)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={selectedCylinderData.thresholds.good}
                        onChange={(e) => handleThresholdChange(selectedCylinderData.id, 'good', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-mizan-secondary mb-2">
                        Fair (&gt;)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={selectedCylinderData.thresholds.fair}
                        onChange={(e) => handleThresholdChange(selectedCylinderData.id, 'fair', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-medium text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-mizan-primary mb-4">
                    Features & Capabilities
                  </h3>
                  <div className="space-y-3">
                    {selectedCylinderData.features.map((feature) => (
                      <div
                        key={feature.id}
                        onClick={() => handleFeatureToggle(selectedCylinderData.id, feature.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-400 ${
                          feature.enabled
                            ? 'border-mizan-gold bg-yellow-50'
                            : 'border-gray-200 hover:border-mizan-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-400 ${
                              feature.enabled
                                ? 'border-mizan-gold bg-mizan-gold'
                                : 'border-gray-300'
                            }`}>
                              {feature.enabled && <Check size={16} className="text-white" />}
                            </div>
                            <span className={`font-medium ${
                              feature.enabled ? 'text-mizan-primary' : 'text-mizan-secondary'
                            }`}>
                              {feature.name}
                            </span>
                          </div>
                          {!feature.enabled && (
                            <span className="text-xs text-mizan-secondary bg-gray-100 px-3 py-1 rounded-full">
                              Disabled
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #CCA404;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #CCA404;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
