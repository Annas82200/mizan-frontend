'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Target,
  TrendingUp,
  Building2,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Compass,
  Shield,
  Zap,
  Users,
  Award,
  FileText
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface StrategicSkillsAssessment {
  overallReadiness: 'ready' | 'partially-ready' | 'not-ready';
  strategicAlignment: number;
  criticalGaps: Array<{
    skill: string;
    currentLevel: number;
    requiredLevel: number;
    impact: 'critical' | 'high' | 'medium';
  }>;
  strengthAreas: Array<{
    skill: string;
    level: number;
    strategicValue: string;
  }>;
  investmentPriorities: Array<{
    area: string;
    investment: string;
    roi: string;
    timeline: string;
  }>;
  timeToReadiness: string;
  riskFactors: Array<{
    risk: string;
    severity: 'high' | 'medium' | 'low';
    mitigation: string;
  }>;
  recommendations: string[];
}

/**
 * Strategic Skills Assessment Page
 * Production-ready: Organization-wide strategic capability assessment
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function StrategicSkillsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [assessment, setAssessment] = useState<StrategicSkillsAssessment | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || 'employee');

        // Strategic assessment is admin only
        const allowedRoles = ['superadmin', 'clientAdmin'];
        if (!allowedRoles.includes(payload.role)) {
          router.push('/dashboard/skills');
          return;
        }

        await fetchAssessment();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchAssessment = async () => {
    try {
      // Fetch real organization analysis from API
      interface OrgAnalysisResponse {
        organizationName?: string;
        totalEmployees?: number;
        skillCoverage?: number;
        averageLevel?: number;
        gapsIdentified?: number;
        criticalGaps?: Array<{
          skillName: string;
          currentLevel: number;
          requiredLevel: number;
          gap: number;
        }>;
        departmentBreakdown?: Array<{
          department: string;
          employeeCount: number;
          averageLevel: number;
          coverage: number;
        }>;
        topSkills?: Array<{
          name: string;
          averageLevel: number;
          employeesWithSkill: number;
        }>;
      }

      const response = await apiClient.get<OrgAnalysisResponse>('/api/skills/organization/analysis');
      const data = response.data;

      // Transform API response to StrategicSkillsAssessment format
      const skillCoverage = data.skillCoverage ?? 50;
      const readiness: 'ready' | 'partially-ready' | 'not-ready' =
        skillCoverage >= 80 ? 'ready' : skillCoverage >= 50 ? 'partially-ready' : 'not-ready';

      const criticalGaps = (data.criticalGaps || []).slice(0, 5).map(g => ({
        skill: g.skillName,
        currentLevel: g.currentLevel,
        requiredLevel: g.requiredLevel,
        impact: (g.gap > 1.5 ? 'critical' : g.gap > 1 ? 'high' : 'medium') as 'critical' | 'high' | 'medium'
      }));

      const strengthAreas = (data.topSkills || []).slice(0, 5).map(s => ({
        skill: s.name,
        level: s.averageLevel,
        strategicValue: s.averageLevel >= 4 ? 'Core Competency' : 'Growth Area'
      }));

      const transformedAssessment: StrategicSkillsAssessment = {
        overallReadiness: readiness,
        strategicAlignment: skillCoverage,
        criticalGaps: criticalGaps.length > 0 ? criticalGaps : [
          { skill: 'No critical gaps identified', currentLevel: 3, requiredLevel: 3, impact: 'medium' }
        ],
        strengthAreas: strengthAreas.length > 0 ? strengthAreas : [
          { skill: 'Data pending', level: 0, strategicValue: 'Run skills assessment' }
        ],
        investmentPriorities: criticalGaps.slice(0, 3).map(g => ({
          area: `${g.skill} Training Program`,
          investment: `$${Math.round((g.requiredLevel - g.currentLevel) * 15000).toLocaleString()}`,
          roi: `${Math.round((g.requiredLevel / g.currentLevel) * 100)}%`,
          timeline: `${Math.round((g.requiredLevel - g.currentLevel) * 3)} months`
        })),
        timeToReadiness: `${Math.max(6, 24 - Math.round(skillCoverage / 5))} months`,
        riskFactors: [
          { risk: 'Skill gaps may impact project delivery', severity: criticalGaps.length > 2 ? 'high' : 'medium', mitigation: 'Prioritize training for critical skills' },
          { risk: 'Training investment required', severity: 'medium', mitigation: 'Focus on highest-ROI areas first' }
        ],
        recommendations: criticalGaps.slice(0, 3).map(g => `Address ${g.skill} gap through targeted training`)
      };

      setAssessment(transformedAssessment);
    } catch (err) {
      logger.error('Error fetching assessment:', err);
      // Set empty assessment on error
      setAssessment({
        overallReadiness: 'not-ready',
        strategicAlignment: 0,
        criticalGaps: [],
        strengthAreas: [],
        investmentPriorities: [],
        timeToReadiness: 'Unknown',
        riskFactors: [],
        recommendations: ['Run organization skills analysis to generate insights']
      });
    }
  };

  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case 'ready': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
      case 'partially-ready': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
      case 'not-ready': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-mizan-gold" />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No assessment data available</p>
      </div>
    );
  }

  const readinessStyle = getReadinessColor(assessment.overallReadiness);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Compass className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Strategic Skills Assessment</h1>
                <p className="text-sm text-gray-600">Can we achieve our strategy with current skills?</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard/skills')}
              className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Skills</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Overall Readiness */}
          <div className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${readinessStyle.border}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Strategic Readiness</p>
                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-2 rounded-full text-lg font-bold ${readinessStyle.bg} ${readinessStyle.text}`}>
                    {assessment.overallReadiness.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="text-4xl font-bold text-mizan-primary">{assessment.strategicAlignment}%</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Estimated time to full readiness: {assessment.timeToReadiness}</p>
              </div>
              <Target className={`w-20 h-20 ${readinessStyle.text}`} />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-gray-600">Critical Gaps</p>
              </div>
              <p className="text-3xl font-bold text-red-600">
                {assessment.criticalGaps.filter(g => g.impact === 'critical').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-green-500" />
                <p className="text-sm text-gray-600">Strength Areas</p>
              </div>
              <p className="text-3xl font-bold text-green-600">{assessment.strengthAreas.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-orange-500" />
                <p className="text-sm text-gray-600">Risk Factors</p>
              </div>
              <p className="text-3xl font-bold text-orange-600">{assessment.riskFactors.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-mizan-gold" />
                <p className="text-sm text-gray-600">Investment Priorities</p>
              </div>
              <p className="text-3xl font-bold text-mizan-gold">{assessment.investmentPriorities.length}</p>
            </div>
          </div>

          {/* Critical Gaps & Strengths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Critical Gaps */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200">
              <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Critical Skill Gaps</span>
              </h3>
              <div className="space-y-4">
                {assessment.criticalGaps.map((gap, idx) => (
                  <div key={idx} className="p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-red-900">{gap.skill}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(gap.impact)}`}>
                        {gap.impact.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-red-600">Current: {gap.currentLevel}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-green-600">Required: {gap.requiredLevel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200">
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Strategic Strengths</span>
              </h3>
              <div className="space-y-4">
                {assessment.strengthAreas.map((strength, idx) => (
                  <div key={idx} className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-green-900">{strength.skill}</span>
                      <span className="font-bold text-green-700">Level {strength.level}</span>
                    </div>
                    <p className="text-sm text-green-600">{strength.strategicValue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Investment Priorities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-mizan-primary mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Investment Priorities</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Initiative</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Investment</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Expected ROI</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {assessment.investmentPriorities.map((priority, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-mizan-primary">{priority.area}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{priority.investment}</td>
                      <td className="py-3 px-4 text-right font-bold text-green-600">{priority.roi}</td>
                      <td className="py-3 px-4 text-right text-gray-500">{priority.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Risk Factors & Mitigations</span>
            </h3>
            <div className="space-y-4">
              {assessment.riskFactors.map((risk, idx) => (
                <div key={idx} className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-orange-900">{risk.risk}</span>
                    <span className={`text-sm font-bold ${getSeverityColor(risk.severity)}`}>
                      {risk.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-orange-700">
                    <strong>Mitigation:</strong> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-mizan-primary to-mizan-primary/80 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Strategic Recommendations</span>
            </h3>
            <div className="space-y-3">
              {assessment.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
                  <span className="w-6 h-6 bg-white text-mizan-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p>{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
