'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, X, Mail, Phone, MapPin, Calendar, Plus, AlertCircle, Loader2, ExternalLink, Users, DollarSign, Activity } from 'lucide-react';
import { BuildingIcon } from '@/components/icons';
import Link from 'next/link';
import { superadminService } from '@/services/dashboard.service';
import { logger } from '@/lib/logger';

// Backend database structure
interface Tenant {
  id: string; // UUID from database
  name: string;
  domain?: string | null;
  plan: string; // free, pro, proplus, enterprise
  status: string; // active, suspended, cancelled
  industry?: string | null;
  employeeCount?: number | null;
  vision?: string | null;
  mission?: string | null;
  strategy?: string | null;
  values?: string[] | null;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  primaryContact?: string | null;
  createdAt: string;
  updatedAt: string;
  userCount?: number; // Added by backend
}

interface ApiResponse {
  tenants: Tenant[];
  total: number;
}

export default function TenantManagement() {
  // State
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch tenants from API
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await superadminService.getTenants() as unknown as ApiResponse;
      // Map tenants to include required fields
      const mappedTenants = (response.tenants || []).map((t) => ({
        ...t,
        id: t.id, // ✅ FIXED: No longer need String() conversion - backend returns UUID strings
        updatedAt: t.updatedAt || new Date().toISOString(),
        employeeCount: t.employeeCount || t.userCount || null
      }));
      setTenants(mappedTenants);
    } catch (err: unknown) {
      logger.error('Error fetching tenants:', err);
      const errorMessage = err && typeof err === 'object' && 'response' in err 
        ? (err as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to load tenants'
        : err instanceof Error 
        ? err.message 
        : 'Failed to load tenants';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Filter tenants
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.industry?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.primaryContact?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === 'all' || tenant.plan === filterPlan;
    const matchesStatus = filterStatus === 'all' || tenant.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return { bg: 'bg-green-100', color: 'text-green-700', dot: 'bg-green-500' };
      case 'trial': return { bg: 'bg-yellow-100', color: 'text-yellow-700', dot: 'bg-yellow-500' };
      case 'suspended': return { bg: 'bg-orange-100', color: 'text-orange-700', dot: 'bg-orange-500' };
      case 'cancelled':
      case 'churned': return { bg: 'bg-red-100', color: 'text-red-700', dot: 'bg-red-500' };
      default: return { bg: 'bg-gray-100', color: 'text-gray-700', dot: 'bg-gray-500' };
    }
  };

  const getPlanColor = (plan: string) => {
    switch(plan.toLowerCase()) {
      case 'enterprise': return 'text-mizan-gold font-semibold';
      case 'proplus': return 'text-purple-600 font-semibold';
      case 'pro': return 'text-mizan-primary font-semibold';
      case 'scale': return 'text-blue-600 font-semibold';
      case 'growth': return 'text-green-600 font-medium';
      case 'starter': return 'text-mizan-secondary';
      default: return 'text-gray-600';
    }
  };

  const getPlanDisplayName = (plan: string) => {
    return plan.charAt(0).toUpperCase() + plan.slice(1).replace('proplus', 'Pro Plus');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 30) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Industry', 'Plan', 'Employees', 'Status', 'Created', 'Contact'].join(','),
      ...filteredTenants.map(t => [
        t.name,
        t.industry || 'N/A',
        getPlanDisplayName(t.plan),
        t.employeeCount || t.userCount || 0,
        t.status,
        formatDate(t.createdAt),
        t.primaryContact || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mizan-tenants-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-mizan-gold mx-auto mb-4" />
          <p className="text-mizan-secondary text-lg">Loading tenants...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mizan-primary mb-2">Error Loading Tenants</h3>
          <p className="text-mizan-secondary mb-6">{error}</p>
          <button
            onClick={fetchTenants}
            className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (tenants.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <BuildingIcon className="w-20 h-20 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-mizan-primary mb-2">No Clients Yet</h3>
          <p className="text-mizan-secondary mb-6">
            Start by adding your first client to the Mizan platform.
          </p>
          <Link
            href="/dashboard/superadmin/clients/add"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Add First Client</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mizan-primary mb-2">Tenant Management</h1>
          <p className="text-mizan-secondary">
            Manage all {tenants.length} organization{tenants.length !== 1 ? 's' : ''} on the platform
          </p>
        </div>
        <Link
          href="/dashboard/superadmin/clients/add"
          className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Add New Client</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-mizan-secondary text-sm">Total Clients</span>
            <BuildingIcon className="w-5 h-5 text-mizan-gold" />
          </div>
          <p className="text-3xl font-bold text-mizan-primary">{tenants.length}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-mizan-secondary text-sm">Active</span>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {tenants.filter(t => t.status === 'active').length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-mizan-secondary text-sm">Total Employees</span>
            <Users className="w-5 h-5 text-mizan-primary" />
          </div>
          <p className="text-3xl font-bold text-mizan-primary">
            {tenants.reduce((sum, t) => sum + (t.employeeCount || t.userCount || 0), 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-mizan-secondary text-sm">Enterprise</span>
            <DollarSign className="w-5 h-5 text-mizan-gold" />
          </div>
          <p className="text-3xl font-bold text-mizan-gold">
            {tenants.filter(t => t.plan === 'enterprise').length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mizan-secondary" />
            <input
              type="text"
              placeholder="Search by name, industry, or contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold transition-all"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-mizan-gold transition-all duration-400 flex items-center space-x-2 text-mizan-primary font-medium"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {(filterPlan !== 'all' || filterStatus !== 'all') && (
              <span className="bg-mizan-gold text-white text-xs px-2 py-1 rounded-full">
                {(filterPlan !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-mizan-primary transition-all duration-400 flex items-center space-x-2 text-mizan-primary font-medium"
          >
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-mizan-primary mb-2">Plan</label>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="starter">Starter</option>
                <option value="growth">Growth</option>
                <option value="pro">Pro</option>
                <option value="proplus">Pro Plus</option>
                <option value="scale">Scale</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-mizan-primary mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="suspended">Suspended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-mizan-secondary">
          Showing <span className="font-semibold text-mizan-primary">{filteredTenants.length}</span> of <span className="font-semibold text-mizan-primary">{tenants.length}</span> client{tenants.length !== 1 ? 's' : ''}
        </p>
        {(searchQuery || filterPlan !== 'all' || filterStatus !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterPlan('all');
              setFilterStatus('all');
            }}
            className="text-mizan-gold hover:text-mizan-gold/80 text-sm font-medium flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Tenant Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTenants.map((tenant) => {
          const statusColors = getStatusColor(tenant.status);

          return (
            <div
              key={tenant.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-400 cursor-pointer"
              onClick={() => setSelectedTenant(selectedTenant?.id === tenant.id ? null : tenant)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-mizan-gold/20 to-mizan-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BuildingIcon className="w-6 h-6 text-mizan-gold" />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-mizan-primary">{tenant.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.color} flex items-center space-x-1`}>
                        <span className={`w-2 h-2 rounded-full ${statusColors.dot}`}></span>
                        <span>{tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}</span>
                      </span>
                      <span className={`text-sm ${getPlanColor(tenant.plan)}`}>
                        {getPlanDisplayName(tenant.plan)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      {tenant.industry && (
                        <div className="flex items-center space-x-2 text-mizan-secondary">
                          <BuildingIcon className="w-4 h-4" />
                          <span>{tenant.industry}</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-2 text-mizan-secondary">
                        <Users className="w-4 h-4" />
                        <span>{(tenant.employeeCount || tenant.userCount || 0).toLocaleString()} employees</span>
                      </div>

                      <div className="flex items-center space-x-2 text-mizan-secondary">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDate(tenant.createdAt)}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-mizan-secondary">
                        <Activity className="w-4 h-4" />
                        <span>Updated {getRelativeTime(tenant.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expand/Collapse Icon */}
                <button
                  className="text-mizan-secondary hover:text-mizan-primary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTenant(selectedTenant?.id === tenant.id ? null : tenant);
                  }}
                >
                  {selectedTenant?.id === tenant.id ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <ExternalLink className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Expanded Details */}
              {selectedTenant?.id === tenant.id && (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    {tenant.primaryContact && (
                      <div>
                        <h4 className="text-sm font-semibold text-mizan-primary mb-2">Primary Contact</h4>
                        <div className="flex items-center space-x-2 text-mizan-secondary">
                          <Mail className="w-4 h-4" />
                          <span>{tenant.primaryContact}</span>
                        </div>
                      </div>
                    )}

                    {/* Domain */}
                    {tenant.domain && (
                      <div>
                        <h4 className="text-sm font-semibold text-mizan-primary mb-2">Domain</h4>
                        <p className="text-mizan-secondary">{tenant.domain}</p>
                      </div>
                    )}

                    {/* Vision */}
                    {tenant.vision && (
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-mizan-primary mb-2">Vision</h4>
                        <p className="text-mizan-secondary">{tenant.vision}</p>
                      </div>
                    )}

                    {/* Mission */}
                    {tenant.mission && (
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-mizan-primary mb-2">Mission</h4>
                        <p className="text-mizan-secondary">{tenant.mission}</p>
                      </div>
                    )}

                    {/* Strategy */}
                    {tenant.strategy && (
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-mizan-primary mb-2">Strategy</h4>
                        <p className="text-mizan-secondary">{tenant.strategy}</p>
                      </div>
                    )}

                    {/* Values */}
                    {tenant.values && tenant.values.length > 0 && (
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-mizan-primary mb-2">Company Values</h4>
                        <div className="flex flex-wrap gap-2">
                          {tenant.values.map((value, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-mizan-gold/10 text-mizan-gold rounded-full text-sm"
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Link
                      href={`/dashboard/superadmin/structure?tenantId=${tenant.id}`}
                      className="px-4 py-2 bg-mizan-primary text-white rounded-lg hover:bg-mizan-primary/90 transition-all text-sm font-medium"
                    >
                      View Structure Analysis
                    </Link>
                    <Link
                      href={`/dashboard/superadmin/culture?tenantId=${tenant.id}`}
                      className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-all text-sm font-medium"
                    >
                      View Culture Analysis
                    </Link>
                    <Link
                      href={`/dashboard/superadmin/structure?tenantId=${tenant.id}`}
                      className="px-4 py-2 border-2 border-mizan-primary text-mizan-primary rounded-lg hover:bg-mizan-primary hover:text-white transition-all text-sm font-medium"
                    >
                      View Structure Analysis
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTenants.length === 0 && tenants.length > 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-mizan-secondary/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mizan-primary mb-2">No clients found</h3>
          <p className="text-mizan-secondary mb-4">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterPlan('all');
              setFilterStatus('all');
            }}
            className="text-mizan-gold hover:text-mizan-gold/80 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
