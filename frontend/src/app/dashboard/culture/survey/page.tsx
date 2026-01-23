'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ClipboardList,
  Send,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  RefreshCw,
  Mail,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  hasCompletedSurvey: boolean;
}

interface Campaign {
  campaignId: string;
  campaignName: string;
  invitationsSent: number;
  expiresAt: string;
  invitations: Array<{
    employeeId: string;
    email: string;
    name: string;
    surveyLink: string;
  }>;
}

interface CampaignStatus {
  campaignId: string;
  campaignName: string;
  statistics: {
    total: number;
    completed: number;
    pending: number;
    expired: number;
    completionRate: number;
  };
  expiresAt: string;
  invitations: Array<{
    employeeId: string;
    employeeEmail: string;
    status: string;
    sentAt: string;
    completedAt: string | null;
  }>;
}

/**
 * Culture Survey Management Page
 * Production-ready: Multi-tenant survey distribution and tracking
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function CultureSurveyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [distributing, setDistributing] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [campaignName, setCampaignName] = useState('');
  const [expiryDays, setExpiryDays] = useState(30);
  const [expandedCampaign, setExpandedCampaign] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

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
        setUserName(payload.name || 'User');

        // Role-based access control - Survey management requires admin
        const allowedRoles = ['superadmin', 'clientAdmin'];
        if (!allowedRoles.includes(payload.role)) {
          router.push('/dashboard');
          return;
        }

        // Fetch employees
        await fetchEmployees();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchEmployees = async () => {
    try {
      const response = await apiClient.get<{ success: boolean; employees: Employee[] }>('/api/culture-assessment/employees');
      if (response.data.success) {
        setEmployees(response.data.employees);
      }
    } catch (err) {
      logger.error('Error fetching employees:', err);
      setError('Failed to load employees');
    }
  };

  const handleDistributeSurvey = async () => {
    try {
      setDistributing(true);
      setError(null);
      setSuccessMessage(null);

      const response = await apiClient.post<Campaign>('/api/culture-assessment/distribute', {
        campaignName: campaignName || `Culture Survey - ${new Date().toLocaleDateString()}`,
        expiryDays
      });

      setCampaign(response.data);
      setSuccessMessage(`Survey distributed to ${response.data.invitationsSent} employees!`);

      // Refresh employee list
      await fetchEmployees();
    } catch (err: unknown) {
      logger.error('Survey distribution error:', err);
      setError(err instanceof Error ? err.message : 'Failed to distribute survey');
    } finally {
      setDistributing(false);
    }
  };

  const handleRefreshStatus = async (campaignId: string) => {
    try {
      const response = await apiClient.get<CampaignStatus>(`/api/culture-assessment/campaign/${campaignId}/status`);
      setCampaignStatus(response.data);
    } catch (err) {
      logger.error('Error refreshing campaign status:', err);
    }
  };

  const copyToClipboard = async (link: string, employeeId: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(employeeId);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      logger.error('Failed to copy:', err);
    }
  };

  const completedCount = employees.filter(e => e.hasCompletedSurvey).length;
  const pendingCount = employees.filter(e => !e.hasCompletedSurvey).length;
  const completionRate = employees.length > 0 ? Math.round((completedCount / employees.length) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mizan-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <ClipboardList className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Culture Survey Management</h1>
                <p className="text-sm text-gray-600">
                  Distribute and track employee culture assessments
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/culture')}
                className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors"
              >
                Back to Culture
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Employees</p>
                  <p className="text-3xl font-bold text-mizan-primary">{employees.length}</p>
                </div>
                <Users className="w-10 h-10 text-mizan-gold" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{completedCount}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-mizan-gold">{completionRate}%</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-mizan-gold/10 flex items-center justify-center">
                  <span className="text-mizan-gold font-bold">{completionRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900 mb-1">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900 mb-1">Success</p>
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Distribute Survey Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-mizan-primary mb-4">Distribute New Survey</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Q1 2025 Culture Survey"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry (Days)</label>
                <input
                  type="number"
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(parseInt(e.target.value) || 30)}
                  min={7}
                  max={90}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleDistributeSurvey}
              disabled={distributing || employees.length === 0}
              className="w-full px-6 py-4 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl font-semibold"
            >
              {distributing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Distributing Survey...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Distribute Survey to All Employees ({employees.length})</span>
                </>
              )}
            </button>
          </div>

          {/* Latest Campaign Results */}
          {campaign && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedCampaign(!expandedCampaign)}
              >
                <div>
                  <h2 className="text-xl font-semibold text-mizan-primary">{campaign.campaignName}</h2>
                  <p className="text-sm text-gray-600">
                    {campaign.invitationsSent} invitations sent - Expires: {new Date(campaign.expiresAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRefreshStatus(campaign.campaignId);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-5 h-5 text-gray-600" />
                  </button>
                  {expandedCampaign ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </div>

              {expandedCampaign && (
                <div className="mt-6 space-y-3">
                  {campaign.invitations.map((inv) => (
                    <div
                      key={inv.employeeId}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-medium text-mizan-primary">{inv.name}</p>
                        <p className="text-sm text-gray-600">{inv.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(inv.surveyLink, inv.employeeId)}
                          className="p-2 hover:bg-white rounded-lg transition-colors flex items-center space-x-1"
                        >
                          {copiedLink === inv.employeeId ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-600" />
                          )}
                          <span className="text-xs text-gray-600">
                            {copiedLink === inv.employeeId ? 'Copied!' : 'Copy Link'}
                          </span>
                        </button>
                        <a
                          href={inv.surveyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-600" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Employee List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-mizan-primary">Employee Survey Status</h2>
              <button
                onClick={fetchEmployees}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Employee</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Department</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium text-mizan-primary">{employee.name}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{employee.email}</td>
                      <td className="py-3 px-4 text-gray-600">{employee.department}</td>
                      <td className="py-3 px-4 text-center">
                        {employee.hasCompletedSurvey ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {employees.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No employees found. Add employees to distribute surveys.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
