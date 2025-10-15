'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserCheck, Upload, FileText, CheckCircle } from 'lucide-react';

interface IndividualSkillsAssessmentProps {
  userRole: string;
}

/**
 * Individual Skills Assessment Component
 * For employees to complete skills assessments
 */
export const IndividualSkillsAssessment: React.FC<IndividualSkillsAssessmentProps> = ({ userRole }) => {
  const [assessmentStatus, setAssessmentStatus] = useState<'not-started' | 'in-progress' | 'completed'>('not-started');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Skills Assessment</h3>
        <p className="text-sm text-gray-600">Complete your personal skills assessment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Resume Upload</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Upload your resume for automatic skills extraction
            </p>
            <Button className="w-full">
              Upload Resume
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Manual Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Complete skills assessment manually
            </p>
            <Button variant="outline" className="w-full">
              Start Assessment
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5" />
              <span>Assessment Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Progress</span>
                <span className="text-sm font-medium">0%</span>
              </div>
              <Progress value={0} className="h-2" />
              <Badge variant="outline">Not Started</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
