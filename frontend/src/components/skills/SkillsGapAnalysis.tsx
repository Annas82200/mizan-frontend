'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp, Target } from 'lucide-react';

interface SkillsGapAnalysisProps {
  userRole: string;
}

/**
 * Skills Gap Analysis Component
 * Displays skills gaps and recommendations
 */
export const SkillsGapAnalysis: React.FC<SkillsGapAnalysisProps> = ({ userRole }) => {
  const [gaps] = useState([
    {
      skill: 'Python Programming',
      currentLevel: 'Intermediate',
      requiredLevel: 'Advanced',
      gap: 'High',
      priority: 'Critical'
    },
    {
      skill: 'Data Analytics',
      currentLevel: 'Beginner',
      requiredLevel: 'Intermediate',
      gap: 'Medium',
      priority: 'High'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Skills Gap Analysis</h3>
        <p className="text-sm text-gray-600">Identify and prioritize skills development needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Critical Gaps</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">2</div>
            <p className="text-sm text-gray-600">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-yellow-500" />
              <span>Development Areas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">5</div>
            <p className="text-sm text-gray-600">Skills to develop</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-500" />
              <span>Strategic Alignment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">75%</div>
            <p className="text-sm text-gray-600">Skills-strategy match</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gaps.map((gap, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{gap.skill}</h4>
                  <p className="text-sm text-gray-600">
                    Current: {gap.currentLevel} → Required: {gap.requiredLevel}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={gap.gap === 'High' ? 'destructive' : 'secondary'}>
                    {gap.gap} Gap
                  </Badge>
                  <Badge variant={gap.priority === 'Critical' ? 'destructive' : 'secondary'}>
                    {gap.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
