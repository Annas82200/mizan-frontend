'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Mail, Phone, Building2, Users, Calendar, DollarSign, CheckCircle2, XCircle, Clock, Send } from 'lucide-react';

interface DemoRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string | null;
  employeeCount: number | null;
  industry: string | null;
  interestedIn: string[] | null;
  message: string | null;
  status: 'pending' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  paymentLinkSent: boolean;
  paymentLinkUrl: string | null;
  paymentLinkSentAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function DemoRequestsPage() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchDemoRequests();
  }, [statusFilter]);

  const fetchDemoRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('mizan_auth_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      const url = statusFilter === 'all'
        ? `${apiUrl}/api/demo/requests`
        : `${apiUrl}/api/demo/requests?status=${statusFilter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch demo requests');
      }

      const data = await response.json();
      setRequests(data.data.requests);
    } catch (error: any) {
      console.error('Error fetching demo requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('mizan_auth_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      const response = await fetch(`${apiUrl}/api/demo/requests/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh list
      fetchDemoRequests();
    } catch (error: any) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'contacted': return <Mail size={16} />;
      case 'qualified': return <CheckCircle2 size={16} />;
      case 'converted': return <DollarSign size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendPaymentLink = (request: DemoRequest) => {
    setSelectedRequest(request);
    setShowPaymentModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-mizan-primary">Demo Requests</h1>
            <p className="text-mizan-secondary mt-2">
              Manage and convert demo requests into paying customers
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mizan-secondary">Pending</p>
                <p className="text-2xl font-bold text-mizan-primary mt-1">
                  {requests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <Clock className="text-yellow-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mizan-secondary">Contacted</p>
                <p className="text-2xl font-bold text-mizan-primary mt-1">
                  {requests.filter(r => r.status === 'contacted').length}
                </p>
              </div>
              <Mail className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mizan-secondary">Qualified</p>
                <p className="text-2xl font-bold text-mizan-primary mt-1">
                  {requests.filter(r => r.status === 'qualified').length}
                </p>
              </div>
              <CheckCircle2 className="text-purple-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mizan-secondary">Converted</p>
                <p className="text-2xl font-bold text-mizan-primary mt-1">
                  {requests.filter(r => r.status === 'converted').length}
                </p>
              </div>
              <DollarSign className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-mizan-secondary">Rejected</p>
                <p className="text-2xl font-bold text-mizan-primary mt-1">
                  {requests.filter(r => r.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="text-red-500" size={24} />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex space-x-2">
            {['all', 'pending', 'contacted', 'qualified', 'converted', 'rejected'].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === filter
                    ? 'bg-mizan-gold text-white'
                    : 'bg-gray-100 text-mizan-secondary hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-mizan-gold"></div>
              <p className="text-mizan-secondary mt-4">Loading demo requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center">
              <Mail size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-mizan-secondary">No demo requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-mizan-background border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-mizan-secondary uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-mizan-secondary uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-mizan-secondary uppercase tracking-wider">
                      Employees
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-mizan-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-mizan-secondary uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-mizan-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-mizan-gold/10 p-2 rounded-lg">
                            <Mail size={16} className="text-mizan-gold" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mizan-primary">
                              {request.firstName} {request.lastName}
                            </p>
                            <p className="text-xs text-mizan-secondary">{request.email}</p>
                            {request.phone && (
                              <p className="text-xs text-mizan-secondary">{request.phone}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Building2 size={16} className="text-mizan-secondary" />
                          <span className="text-sm text-mizan-primary">{request.company}</span>
                        </div>
                        {request.industry && (
                          <p className="text-xs text-mizan-secondary mt-1">{request.industry}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Users size={16} className="text-mizan-secondary" />
                          <span className="text-sm text-mizan-primary">
                            {request.employeeCount || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          <span>{request.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-mizan-secondary" />
                          <span className="text-xs text-mizan-secondary">
                            {formatDate(request.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {!request.paymentLinkSent && request.status !== 'converted' && request.status !== 'rejected' && (
                            <button
                              onClick={() => handleSendPaymentLink(request)}
                              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-mizan-gold text-white text-xs font-medium rounded-lg hover:bg-opacity-90 transition-all"
                            >
                              <Send size={14} />
                              <span>Send Payment Link</span>
                            </button>
                          )}
                          {request.paymentLinkSent && (
                            <span className="text-xs text-green-600 font-medium">✓ Link Sent</span>
                          )}
                          <select
                            value={request.status}
                            onChange={(e) => updateStatus(request.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded-lg px-2 py-1 text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-gold"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="converted">Converted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Payment Link Modal - Will implement in Phase 2.3 */}
      {showPaymentModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold text-mizan-primary mb-4">
              Send Payment Link
            </h2>
            <p className="text-mizan-secondary mb-6">
              Payment link modal - Coming in Phase 2.3
            </p>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="px-4 py-2 bg-gray-200 text-mizan-primary rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
