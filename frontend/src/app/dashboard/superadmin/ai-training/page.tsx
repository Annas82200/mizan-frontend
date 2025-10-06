'use client';

import React from 'react';
import { Brain, BookOpen, Target, Zap, AlertCircle } from 'lucide-react';

export default function AITrainingPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
          AI Training & Configuration
        </h1>
        <p className="text-lg text-mizan-secondary">
          Train and configure Mizan's Three-Engine AI Architecture
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
        <div className="flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Coming Soon</h2>
            <p className="text-blue-800 mb-4">
              The AI Training module is currently under development. This will allow you to:
            </p>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Update and refine the 7-Cylinder framework values and definitions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Configure AI model preferences and weightings across the three engines</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Train the AI on custom organizational development models</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Review and approve entropy calculation logic</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Fine-tune culture, structure, and skills analysis parameters</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current AI Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="w-12 h-12 rounded-xl bg-mizan-gold/10 flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-mizan-gold" />
          </div>
          <h3 className="text-lg font-semibold text-mizan-primary mb-2">Knowledge Engine</h3>
          <p className="text-sm text-mizan-secondary">
            Trained on organizational development theory, 7-Cylinder framework, and HR best practices
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="w-12 h-12 rounded-xl bg-mizan-primary/10 flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-mizan-primary" />
          </div>
          <h3 className="text-lg font-semibold text-mizan-primary mb-2">Data Engine</h3>
          <p className="text-sm text-mizan-secondary">
            Processes employee data, survey responses, and organizational metrics with statistical rigor
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="w-12 h-12 rounded-xl bg-mizan-secondary/10 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-mizan-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-mizan-primary mb-2">Reasoning Engine</h3>
          <p className="text-sm text-mizan-secondary">
            Generates insights, recommendations, and action plans based on combined knowledge and data
          </p>
        </div>
      </div>
    </div>
  );
}
