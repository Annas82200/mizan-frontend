'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building2, Users, Calendar, DollarSign, CheckCircle2, XCircle, Clock, Send, Copy, Check, X } from 'lucide-react';

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

  // Payment modal state
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'scale'>('starter');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [employeeCount, setEmployeeCount] = useState<number>(50);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState(false);
  const [copied, setCopied] = useState(false);

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
    setEmployeeCount(request.employeeCount || 50);
    setGeneratedUrl(null);
    setCopied(false);
    setShowPaymentModal(true);
  };

  const PRICING_CONFIG = {
    starter: {
      monthly: 8.00,
      annual: 6.66,
      minEmployees: 50,
      maxEmployees: 250
    },
    growth: {
      monthly: 15.00,
      annual: 12.50,
      minEmployees: 251,
      maxEmployees: 1000
    },
    scale: {
      monthly: 24.00,
      annual: 20.00,
      minEmployees: 1001,
      maxEmployees: 10000
    }
  };

  const calculatePrice = () => {
    const plan = PRICING_CONFIG[selectedPlan];
    const pricePerEmployee = billingPeriod === 'annual' ? plan.annual : plan.monthly;
    const monthlyTotal = pricePerEmployee * employeeCount;
    const yearlyTotal = monthlyTotal * 12;
    const savings = billingPeriod === 'annual' ? ((plan.monthly - plan.annual) * employeeCount * 12) : 0;

    return {
      pricePerEmployee,
      monthlyTotal,
      yearlyTotal,
      savings,
      billedNow: billingPeriod === 'annual' ? yearlyTotal : monthlyTotal
    };
  };

  const generatePaymentLink = async () => {
    if (!selectedRequest) return;

    try {
      setGeneratingLink(true);
      const token = localStorage.getItem('mizan_auth_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      const response = await fetch(`${apiUrl}/api/payment/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          demoRequestId: selectedRequest.id,
          plan: selectedPlan,
          billingPeriod: billingPeriod,
          employeeCount: employeeCount
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate payment link');
      }

      const data = await response.json();
      setGeneratedUrl(data.data.url);

      // Refresh the demo requests list to show updated payment link status
      fetchDemoRequests();
    } catch (error: any) {
      console.error('Error generating payment link:', error);
      alert('Failed to generate payment link. Please try again.');
    } finally {
      setGeneratingLink(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setGeneratedUrl(null);
    setCopied(false);
  };

  return (
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

      {/* Payment Link Modal */}
      {showPaymentModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold text-mizan-primary">Generate Payment Link</h2>
                <p className="text-sm text-mizan-secondary mt-1">
                  {selectedRequest.firstName} {selectedRequest.lastName} • {selectedRequest.company}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X size={24} className="text-mizan-secondary" />
              </button>
            </div>

            <div className="p-8">
              {!generatedUrl ? (
                <>
                  {/* Plan Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-mizan-primary mb-4">
                      Select Plan
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {(['starter', 'growth', 'scale'] as const).map((plan) => (
                        <button
                          key={plan}
                          onClick={() => setSelectedPlan(plan)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            selectedPlan === plan
                              ? 'border-mizan-gold bg-mizan-gold/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h3 className="text-lg font-bold text-mizan-primary capitalize">
                            {plan}
                          </h3>
                          <p className="text-xs text-mizan-secondary mt-1">
                            {PRICING_CONFIG[plan].minEmployees.toLocaleString()}-
                            {PRICING_CONFIG[plan].maxEmployees.toLocaleString()} employees
                          </p>
                          <p className="text-2xl font-bold text-mizan-gold mt-2">
                            ${PRICING_CONFIG[plan][billingPeriod].toFixed(2)}
                          </p>
                          <p className="text-xs text-mizan-secondary">per employee/month</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Billing Period Toggle */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-mizan-primary mb-4">
                      Billing Period
                    </label>
                    <div className="flex items-center space-x-4 bg-mizan-background p-1 rounded-xl inline-flex">
                      <button
                        onClick={() => setBillingPeriod('monthly')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                          billingPeriod === 'monthly'
                            ? 'bg-white text-mizan-primary shadow-sm'
                            : 'text-mizan-secondary hover:text-mizan-primary'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setBillingPeriod('annual')}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                          billingPeriod === 'annual'
                            ? 'bg-white text-mizan-primary shadow-sm'
                            : 'text-mizan-secondary hover:text-mizan-primary'
                        }`}
                      >
                        Annual
                        <span className="ml-2 text-xs text-green-600 font-semibold">Save 17%</span>
                      </button>
                    </div>
                  </div>

                  {/* Employee Count */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-mizan-primary mb-4">
                      Number of Employees
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(Math.max(1, parseInt(e.target.value) || 0))}
                        min={PRICING_CONFIG[selectedPlan].minEmployees}
                        max={PRICING_CONFIG[selectedPlan].maxEmployees}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-gold"
                      />
                      <div className="text-sm text-mizan-secondary">
                        Min: {PRICING_CONFIG[selectedPlan].minEmployees} • Max: {PRICING_CONFIG[selectedPlan].maxEmployees}
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-gradient-to-br from-mizan-primary to-mizan-gold/80 rounded-xl p-6 text-white mb-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm opacity-90">Price per Employee</p>
                        <p className="text-3xl font-bold">${calculatePrice().pricePerEmployee.toFixed(2)}/mo</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-90">Total Employees</p>
                        <p className="text-3xl font-bold">{employeeCount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm opacity-90">Monthly Total</span>
                        <span className="text-lg font-semibold">${calculatePrice().monthlyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mo</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm opacity-90">Yearly Total</span>
                        <span className="text-lg font-semibold">${calculatePrice().yearlyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/year</span>
                      </div>
                      {billingPeriod === 'annual' && calculatePrice().savings > 0 && (
                        <div className="flex items-center justify-between bg-green-500/20 rounded-lg px-3 py-2 mt-3">
                          <span className="text-sm font-semibold">Annual Savings</span>
                          <span className="text-lg font-bold">${calculatePrice().savings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      )}
                      <div className="border-t border-white/20 pt-4 mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-semibold">Billed {billingPeriod === 'annual' ? 'Annually' : 'Monthly'}</span>
                          <span className="text-2xl font-bold">${calculatePrice().billedNow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <p className="text-xs opacity-75 mt-2">Includes 14-day free trial</p>
                      </div>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generatePaymentLink}
                    disabled={generatingLink}
                    className="w-full bg-mizan-gold text-white py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {generatingLink ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Generating Link...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Generate Payment Link</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-mizan-primary mb-2">
                      Payment Link Generated!
                    </h3>
                    <p className="text-mizan-secondary">
                      Share this link with {selectedRequest.firstName} to complete the purchase
                    </p>
                  </div>

                  {/* Generated URL */}
                  <div className="bg-mizan-background rounded-xl p-6 mb-6">
                    <label className="block text-sm font-semibold text-mizan-primary mb-3">
                      Payment Link
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={generatedUrl}
                        readOnly
                        className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-mizan-primary"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="px-6 py-3 bg-mizan-gold text-white rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center space-x-2"
                      >
                        {copied ? (
                          <>
                            <Check size={18} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={18} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <h4 className="text-sm font-semibold text-blue-900 mb-3">Next Steps:</h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-0.5">1.</span>
                        <span>Send this payment link to {selectedRequest.email}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-0.5">2.</span>
                        <span>Customer will complete payment via Stripe Checkout</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-0.5">3.</span>
                        <span>Tenant account will be automatically created after payment</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-0.5">4.</span>
                        <span>Customer receives welcome email with login credentials</span>
                      </li>
                    </ul>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="w-full bg-mizan-primary text-white py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-all"
                  >
                    Done
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
