'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BookOpen, Target } from 'lucide-react';

interface SkillsProgressTrackingProps {
  userRole: string;
}

/**
 * Skills Progress Tracking Component
 * Tracks individual and team skills development progress
 */
export const SkillsProgressTracking: React.FC<SkillsProgressTrackingProps> = ({ userRole }) => {
  const [progressData] = useState([
    {
      skill: 'Python Programming',
      currentProgress: 75,
      targetLevel: 'Advanced',
      learningPath: 'Data Science Track'
    },
    {
      skill: 'Project Management',
      currentProgress: 60,
      targetLevel: 'Intermediate',
      learningPath: 'Leadership Development'
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Skills Progress Tracking</h3>
        <p className="text-sm text-gray-600">Monitor your skills development journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>Overall Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">68%</div>
            <p className="text-sm text-gray-600">Average completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-green-500" />
              <span>Active Learning</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">3</div>
            <p className="text-sm text-gray-600">Learning paths in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span>Goals Achieved</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">12</div>
            <p className="text-sm text-gray-600">Skills milestones reached</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {progressData.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{item.skill}</h4>
                  <Badge variant="outline">{item.targetLevel}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{item.currentProgress}%</span>
                  </div>
                  <Progress value={item.currentProgress} className="h-2" />
                </div>
                <p className="text-sm text-gray-600">
                  Learning Path: {item.learningPath}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
