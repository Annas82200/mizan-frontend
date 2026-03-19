'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Rocket, ClipboardList, Users, Calendar, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface OnboardingAssignment {
  id: string;
  employeeId: string;
  status: string;
  startDate: string;
  completionPercentage: number;
}

interface OnboardingMetrics {
  activeOnboardings: number;
  avgCompletionRate: number;
  overdue: number;
  mentorMatchRate: number;
  assignments: OnboardingAssignment[];
}

export default function OnboardingPage() {
  const [metrics, setMetrics] = useState<OnboardingMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/api/onboarding/assignments');
      const assignments = (response.data as { assignments?: OnboardingAssignment[] }).assignments || [];
      const active = assignments.filter((a: OnboardingAssignment) => a.status === 'in_progress');
      const overdue = assignments.filter((a: OnboardingAssignment) => a.status === 'overdue');
      const avgCompletion = active.length > 0
        ? Math.round(active.reduce((sum: number, a: OnboardingAssignment) => sum + a.completionPercentage, 0) / active.length)
        : 0;

      // Fetch mentor match data
      let mentorRate = 0;
      try {
        const mentorRes = await apiClient.get('/api/onboarding/mentors');
        const mentors = (mentorRes.data as { mentors?: Array<{ status: string }> })?.mentors || [];
        const matched = mentors.filter((m: { status: string }) => m.status === 'active' || m.status === 'accepted');
        mentorRate = assignments.length > 0 ? Math.round((matched.length / assignments.length) * 100) : 0;
      } catch { /* mentor endpoint optional */ }

      setMetrics({
        activeOnboardings: active.length,
        avgCompletionRate: avgCompletion,
        overdue: overdue.length,
        mentorMatchRate: mentorRate,
        assignments,
      });
    } catch (err) {
      setError('Failed to load onboarding data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" /></div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Rocket className="h-6 w-6" /> Onboarding
        </h1>
        <p className="text-gray-500 mt-1">Manage new hire onboarding workflows and track progress</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      {metrics && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Active Onboardings</span><Users className="h-4 w-4 text-gray-400" /></div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{metrics.activeOnboardings}</p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Avg Completion</span><CheckCircle className="h-4 w-4 text-gray-400" /></div>
              <p className="mt-2 text-2xl font-semibold text-green-600">{metrics.avgCompletionRate}%</p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Overdue</span><AlertCircle className="h-4 w-4 text-gray-400" /></div>
              <p className={`mt-2 text-2xl font-semibold ${metrics.overdue > 0 ? 'text-red-600' : 'text-gray-900'}`}>{metrics.overdue}</p>
            </div>
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-sm text-gray-500">Mentor Match Rate</span><Users className="h-4 w-4 text-gray-400" /></div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{metrics.mentorMatchRate}%</p>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: '/dashboard/onboarding/workflows', label: 'Manage Workflows', desc: 'Create and edit onboarding templates', icon: ClipboardList },
              { href: '/dashboard/onboarding/checklist', label: 'Checklists', desc: 'View and track onboarding tasks', icon: CheckCircle },
              { href: '/dashboard/onboarding/mentors', label: 'Mentor Matching', desc: 'AI-powered mentor-mentee pairing', icon: Users },
            ].map(({ href, label, desc, icon: Icon }) => (
              <a key={href} href={href} className="rounded-xl border bg-white p-5 shadow-sm hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{label}</h3>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>
            ))}
          </div>

          {/* Active Onboardings List */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium mb-4">Active Onboardings</h2>
            {metrics.assignments.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No active onboardings. Start by creating a workflow.</p>
            ) : (
              <div className="space-y-3">
                {metrics.assignments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Employee {a.employeeId.substring(0, 8)}</p>
                      <p className="text-xs text-gray-500">Started {new Date(a.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24">
                        <div className="h-2 rounded-full bg-gray-200">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: `${a.completionPercentage}%` }} />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{a.completionPercentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
