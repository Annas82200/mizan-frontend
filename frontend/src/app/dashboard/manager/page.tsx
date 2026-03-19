'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Users, Target, BookOpen, Calendar, AlertCircle, TrendingUp, CheckSquare, Clock } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  goalsProgress: number;
  skillsScore: number;
  lastOneOnOne: string | null;
}

interface ManagerMetrics {
  teamSize: number;
  avgGoalProgress: number;
  avgSkillsScore: number;
  pendingApprovals: number;
  upcomingOneOnOnes: number;
  teamMembers: TeamMember[];
  actionItems: Array<{ id: string; title: string; type: string; dueDate: string; priority: string }>;
  teamCultureScore: number;
}

export default function ManagerDashboardPage() {
  const [metrics, setMetrics] = useState<ManagerMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { loadMetrics(); }, []);

  const loadMetrics = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/api/analytics/manager');
      setMetrics(response.data as ManagerMetrics);
    } catch (err) {
      setError('Failed to load manager dashboard');
    } finally {
      setIsLoading(false);
    }
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
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-500 mt-1">Your team&apos;s performance, development, and action items</p>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      {metrics && (
        <>
          {/* Quick Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Team Size', value: metrics.teamSize, icon: Users },
              { label: 'Avg Goal Progress', value: `${metrics.avgGoalProgress}%`, icon: Target },
              { label: 'Pending Approvals', value: metrics.pendingApprovals, icon: CheckSquare },
              { label: 'Upcoming 1:1s', value: metrics.upcomingOneOnOnes, icon: Calendar },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{label}</span>
                  <Icon className="h-4 w-4 text-gray-400" />
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Team Members */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-gray-400" />
                Direct Reports
              </h2>
              <div className="space-y-3">
                {metrics.teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Goals</p>
                        <p className={`text-sm font-medium ${member.goalsProgress >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {member.goalsProgress}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Skills</p>
                        <p className="text-sm font-medium text-gray-700">{member.skillsScore}%</p>
                      </div>
                      {!member.lastOneOnOne && (
                        <Clock className="h-4 w-4 text-yellow-500" title="No recent 1:1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-gray-400" />
                Action Items
              </h2>
              <div className="space-y-2">
                {metrics.actionItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${
                        item.priority === 'high' ? 'bg-red-500' :
                        item.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.type}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Culture Score */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-gray-400" />
              Team Culture Score
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-semibold text-gray-900">{metrics.teamCultureScore}%</div>
              <div className="flex-1">
                <div className="h-3 rounded-full bg-gray-100">
                  <div
                    className={`h-3 rounded-full ${
                      metrics.teamCultureScore >= 80 ? 'bg-green-500' :
                      metrics.teamCultureScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${metrics.teamCultureScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
