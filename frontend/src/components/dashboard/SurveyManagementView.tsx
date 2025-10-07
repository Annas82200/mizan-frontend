'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Users, Link as LinkIcon, Calendar, CheckCircle2, Clock, XCircle, Loader2, Send, Copy, Check } from 'lucide-react';

interface SurveyManagementViewProps {
  tenantId: string;
  tenantName: string;
}

interface SurveyInvitation {
  employeeId: string;
  email: string;
  name?: string;
  surveyLink: string;
  surveyToken: string;
}

interface Campaign {
  campaignId: string;
  campaignName: string;
  invitationsSent: number;
  expiresAt: string;
  invitations: SurveyInvitation[];
}

export function SurveyManagementView({ tenantId, tenantName }: SurveyManagementViewProps) {
  const [campaignName, setCampaignName] = useState(`Culture Survey - ${new Date().toLocaleDateString()}`);
  const [expiryDays, setExpiryDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleDistribute = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/culture-assessment/distribute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
        },
        body: JSON.stringify({
          campaignName,
          expiryDays
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to distribute survey');
      }

      const data = await response.json();
      setCampaign(data);
    } catch (err: any) {
      console.error('Survey distribution error:', err);
      setError(err.message || 'Failed to distribute survey');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (link: string, employeeId: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(employeeId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const copyAllLinks = () => {
    if (!campaign) return;

    const allLinks = campaign.invitations.map(inv =>
      `${inv.name || inv.email}: ${inv.surveyLink}`
    ).join('\n\n');

    navigator.clipboard.writeText(allLinks);
    setCopiedLink('all');
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Mail className="w-6 h-6 text-mizan-gold" />
          <h2 className="text-2xl font-bold text-mizan-primary">Survey Management</h2>
        </div>
        <p className="text-mizan-secondary">
          Distribute culture survey to employees of <span className="font-semibold text-mizan-primary">{tenantName}</span>
        </p>
      </div>

      {/* Survey Configuration */}
      {!campaign && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-mizan-primary mb-4">Survey Configuration</h3>

          <div className="space-y-4">
            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-mizan-primary mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
                placeholder="e.g., Q1 2024 Culture Assessment"
              />
            </div>

            {/* Expiry Days */}
            <div>
              <label className="block text-sm font-medium text-mizan-primary mb-2">
                Survey Expires In (Days)
              </label>
              <input
                type="number"
                value={expiryDays}
                onChange={(e) => setExpiryDays(parseInt(e.target.value))}
                min="1"
                max="90"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900 mb-1">Error</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Distribute Button */}
            <button
              onClick={handleDistribute}
              disabled={loading}
              className="w-full px-6 py-4 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating Survey Links...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Generate Survey Invitations</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Campaign Results */}
      {campaign && (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-green-50 to-mizan-gold/10 rounded-2xl p-6 border-2 border-green-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Survey Links Generated!</h3>
                </div>
                <p className="text-green-700 mb-4">{campaign.campaignName}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-xs text-green-700 mb-1">Invitations Created</p>
                    <p className="text-2xl font-bold text-green-900">{campaign.invitationsSent}</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-xs text-green-700 mb-1">Expires On</p>
                    <p className="text-sm font-bold text-green-900">
                      {new Date(campaign.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900 mb-2 font-medium">📋 Distribution Instructions:</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Copy individual survey links and send them to each employee via email</li>
              <li>• Or click "Copy All Links" and paste into your email distribution system</li>
              <li>• Each link is unique and can only be used once</li>
              <li>• Links expire in {expiryDays} days</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={copyAllLinks}
              className="px-6 py-3 bg-mizan-primary text-white rounded-xl hover:bg-mizan-primary/90 transition-all duration-400 flex items-center space-x-2 font-medium shadow-md"
            >
              {copiedLink === 'all' ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Copied All!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy All Links</span>
                </>
              )}
            </button>
            <button
              onClick={() => setCampaign(null)}
              className="px-6 py-3 border-2 border-mizan-primary text-mizan-primary rounded-xl hover:bg-mizan-primary hover:text-white transition-all duration-400 font-medium"
            >
              Create New Campaign
            </button>
          </div>

          {/* Survey Links Table */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-mizan-primary mb-4">
              Survey Links ({campaign.invitations.length} employees)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-mizan-primary">Employee</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-mizan-primary">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-mizan-primary">Survey Link</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-mizan-primary">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {campaign.invitations.map((invitation) => (
                    <tr key={invitation.employeeId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-mizan-primary font-medium">
                        {invitation.name || 'Unknown'}
                      </td>
                      <td className="py-3 px-4 text-sm text-mizan-secondary">
                        {invitation.email}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <LinkIcon className="w-4 h-4 text-mizan-gold flex-shrink-0" />
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-mizan-secondary font-mono truncate max-w-xs">
                            {invitation.surveyLink}
                          </code>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => copyLink(invitation.surveyLink, invitation.employeeId)}
                          className="px-3 py-1.5 bg-mizan-gold/10 text-mizan-gold rounded-lg hover:bg-mizan-gold hover:text-white transition-all duration-300 text-xs font-medium flex items-center space-x-1 mx-auto"
                        >
                          {copiedLink === invitation.employeeId ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
