'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkillsAnalysisNarrative } from '@/types/skills';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Target, AlertCircle as AlertCircleIcon } from 'lucide-react';

interface SkillsNarrativeSummaryProps {
  narrative: SkillsAnalysisNarrative;
  overallScore: number;
  strategicAlignment: number;
}

/**
 * Skills Narrative Summary Component
 * Displays AI-generated narrative explanations for skills analysis
 * ✅ PRODUCTION-READY: Shows scoreNarrative, readinessAssessment, readinessStatus, gapAnalysisNarrative
 */
export const SkillsNarrativeSummary: React.FC<SkillsNarrativeSummaryProps> = ({
  narrative,
  overallScore,
  strategicAlignment,
}) => {
  // Determine readiness icon and color
  const getReadinessConfig = () => {
    switch (narrative.readinessStatus) {
      case 'ready':
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          badge: <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ready</Badge>,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        };
      case 'partial':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
          badge: <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Partially Ready</Badge>,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        };
      case 'not_ready':
        return {
          icon: <XCircle className="w-6 h-6 text-red-600" />,
          badge: <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Not Ready</Badge>,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      default:
        return {
          icon: <AlertCircleIcon className="w-6 h-6 text-gray-600" />,
          badge: <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
    }
  };

  const readinessConfig = getReadinessConfig();

  return (
    <div className="space-y-4">
      {/* Score Narrative Card */}
      <Card className="border-2 border-mizan-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-mizan-primary" />
            <CardTitle className="text-lg">Score Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Overall Score:</span>
              <span className="text-2xl font-bold text-mizan-primary">{overallScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Strategic Alignment:</span>
              <span className="text-2xl font-bold text-mizan-gold">{strategicAlignment}%</span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{narrative.scoreNarrative}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Readiness Card */}
      <Card className={`border-2 ${readinessConfig.borderColor}`}>
        <CardHeader className={`pb-3 ${readinessConfig.bgColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-mizan-primary" />
              <CardTitle className="text-lg">Strategic Readiness</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {readinessConfig.icon}
              {readinessConfig.badge}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {narrative.readinessAssessment}
          </p>
        </CardContent>
      </Card>

      {/* Gap Analysis Narrative Card */}
      <Card className="border-2 border-orange-200">
        <CardHeader className="pb-3 bg-orange-50">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-lg">Critical Gap Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {narrative.gapAnalysisNarrative}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
