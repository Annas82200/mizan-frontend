'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, X, Mail, Phone, MapPin, Calendar, Plus } from 'lucide-react';
import { BuildingIcon } from '@/components/icons';
import Link from 'next/link';

interface Admin {
  name: string;
  role: string;
}

interface BillingRecord {
  date: string;
  amount: number;
  status: string;
}

interface Tenant {
  id: number;
  name: string;
  industry: string;
  plan: string;
  employees: number;
  mrr: number;
  status: string;
  joinedDate: string;
  lastActive: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  apiCalls: number;
  storageUsed: string;
  admins: Admin[];
  billingHistory: BillingRecord[];
}

export default function TenantManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock tenant data
  const allTenants: Tenant[] = [
    {
      id: 1,
      name: 'Acme Corporation',
      industry: 'Technology',
      plan: 'Enterprise',
      employees: 2450,
      mrr: 49000,
      status: 'Active',
      joinedDate: '2024-01-15',
      lastActive: '2 hours ago',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah.j@acmecorp.com',
      contactPhone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      apiCalls: 245000,
      storageUsed: '15.3 GB',
      admins: [
        { name: 'Sarah Johnson', role: 'Primary Admin' },
        { name: 'Mike Chen', role: 'Admin' }
      ],
      billingHistory: [
        { date: '2024-06-01', amount: 49000, status: 'Paid' },
        { date: '2024-05-01', amount: 49000, status: 'Paid' },
        { date: '2024-04-01', amount: 49000, status: 'Paid' }
      ]
    },
    {
      id: 2,
      name: 'TechStart Inc',
      industry: 'Startup',
      plan: 'Growth',
      employees: 680,
      mrr: 8500,
      status: 'Active',
      joinedDate: '2024-03-20',
      lastActive: '5 hours ago',
      contactName: 'David Lee',
      contactEmail: 'david@techstart.io',
      contactPhone: '+1 (555) 234-5678',
      location: 'Austin, TX',
      apiCalls: 85000,
      storageUsed: '4.2 GB',
      admins: [
        { name: 'David Lee', role: 'Primary Admin' }
      ],
      billingHistory: [
        { date: '2024-06-01', amount: 8500, status: 'Paid' },
        { date: '2024-05-01', amount: 8500, status: 'Paid' }
      ]
    },
    {
      id: 3,
      name: 'Global Dynamics',
      industry: 'Finance',
      plan: 'Scale',
      employees: 3200,
      mrr: 64000,
      status: 'Active',
      joinedDate: '2023-11-10',
      lastActive: '1 day ago',
      contactName: 'Emily Rodriguez',
      contactEmail: 'e.rodriguez@globaldynamics.com',
      contactPhone: '+1 (555) 345-6789',
      location: 'New York, NY',
      apiCalls: 380000,
      storageUsed: '22.8 GB',
      admins: [
        { name: 'Emily Rodriguez', role: 'Primary Admin' },
        { name: 'James Wilson', role: 'Admin' },
        { name: 'Lisa Chen', role: 'Admin' }
      ],
      billingHistory: [
        { date: '2024-06-01', amount: 64000, status: 'Paid' },
        { date: '2024-05-01', amount: 64000, status: 'Paid' },
        { date: '2024-04-01', amount: 64000, status: 'Paid' }
      ]
    },
    {
      id: 4,
      name: 'Innovation Labs',
      industry: 'Research',
      plan: 'Starter',
      employees: 125,
      mrr: 833,
      status: 'Trial',
      joinedDate: '2024-05-28',
      lastActive: '3 hours ago',
      contactName: 'Alex Kumar',
      contactEmail: 'alex@innovationlabs.ai',
      contactPhone: '+1 (555) 456-7890',
      location: 'Boston, MA',
      apiCalls: 12000,
      storageUsed: '0.8 GB',
      admins: [
        { name: 'Alex Kumar', role: 'Primary Admin' }
      ],
      billingHistory: []
    },
    {
      id: 5,
      name: 'Retail Solutions',
      industry: 'Retail',
      plan: 'Growth',
      employees: 450,
      mrr: 5625,
      status: 'Active',
      joinedDate: '2024-02-14',
      lastActive: '6 hours ago',
      contactName: 'Maria Garcia',
      contactEmail: 'maria@retailsolutions.com',
      contactPhone: '+1 (555) 567-8901',
      location: 'Chicago, IL',
      apiCalls: 65000,
      storageUsed: '3.1 GB',
      admins: [
        { name: 'Maria Garcia', role: 'Primary Admin' },
        { name: 'Tom Anderson', role: 'Admin' }
      ],
      billingHistory: [
        { date: '2024-06-01', amount: 5625, status: 'Paid' },
        { date: '2024-05-01', amount: 5625, status: 'Paid' }
      ]
    }
  ];

  // Filter tenants
  const filteredTenants = allTenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === 'all' || tenant.plan === filterPlan;
    const matchesStatus = filterStatus === 'all' || tenant.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return { bg: 'bg-green-100', color: 'text-green-500' };
      case 'Trial': return { bg: 'bg-yellow-100', color: 'text-mizan-gold' };
      case 'Churned': return { bg: 'bg-red-100', color: 'text-red-500' };
      default: return { bg: 'bg-gray-100', color: 'text-mizan-primary' };
    }
  };

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'Enterprise': return 'text-mizan-gold';
      case 'Scale': return 'text-mizan-primary';
      default: return 'text-mizan-secondary';
    }
  };

  const handleExport = () => {
    const csv = [
      'Company,Plan,Employees,MRR,Status,Joined',
      ...filteredTenants.map(t =>
        `"${t.name}","${t.plan}",${t.employees},${t.mrr},"${t.status}","${t.joinedDate}"`
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mizan-tenants.csv';
    a.click();
  };

  return (
    <div className="min-h-screen p-8 bg-mizan-background">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold mb-2 text-mizan-primary">
              Tenant Management
            </h1>
            <p className="text-lg text-mizan-secondary">
              Manage all {allTenants.length} organizations on the platform
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

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
              <input
                type="text"
                placeholder="Search companies or contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-primary"
              />
            </div>

            {/* Filter button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 text-mizan-primary transition-all hover:bg-gray-50"
            >
              <Filter size={16} />
              <span className="text-sm font-medium">Filters</span>
            </button>

            {/* Export button */}
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 text-mizan-primary transition-all hover:bg-gray-50"
            >
              <Download size={16} />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>

          {/* Filters dropdown */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold mb-2 block text-mizan-primary">
                  Plan
                </label>
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-primary"
                >
                  <option value="all">All Plans</option>
                  <option value="Free">Free</option>
                  <option value="Starter">Starter</option>
                  <option value="Growth">Growth</option>
                  <option value="Scale">Scale</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold mb-2 block text-mizan-primary">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-mizan-primary focus:outline-none focus:ring-2 focus:ring-mizan-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Trial">Trial</option>
                  <option value="Churned">Churned</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tenants Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-mizan-background">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Plan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Employees
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    MRR
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-mizan-primary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant) => {
                  const statusStyle = getStatusColor(tenant.status);
                  return (
                    <tr
                      key={tenant.id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-mizan-primary bg-opacity-5">
                            <BuildingIcon className="w-5 h-5" color="#3F3D56" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mizan-primary">
                              {tenant.name}
                            </p>
                            <p className="text-xs text-mizan-secondary">
                              {tenant.contactName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold ${getPlanColor(tenant.plan)}`}>
                          {tenant.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-mizan-secondary">
                        {tenant.employees.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-mizan-primary">
                        ${(tenant.mrr / 1000).toFixed(1)}K
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.color}`}>
                          {tenant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-mizan-secondary">
                        {tenant.lastActive}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedTenant(tenant)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-mizan-gold text-white transition-all hover:shadow-md hover:bg-opacity-90"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tenant Detail Modal */}
        {selectedTenant && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between rounded-t-3xl">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-mizan-primary bg-opacity-5">
                    <BuildingIcon className="w-8 h-8" color="#3F3D56" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-mizan-primary">
                      {selectedTenant.name}
                    </h2>
                    <p className="text-sm text-mizan-secondary">
                      {selectedTenant.industry} • Joined {selectedTenant.joinedDate}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTenant(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-mizan-secondary"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-xs mb-1 text-mizan-secondary">Plan</p>
                    <p className={`text-lg font-bold ${getPlanColor(selectedTenant.plan)}`}>
                      {selectedTenant.plan}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs mb-1 text-mizan-secondary">Employees</p>
                    <p className="text-lg font-bold text-mizan-primary">
                      {selectedTenant.employees.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs mb-1 text-mizan-secondary">MRR</p>
                    <p className="text-lg font-bold text-mizan-gold">
                      ${(selectedTenant.mrr / 1000).toFixed(1)}K
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs mb-1 text-mizan-secondary">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTenant.status).bg} ${getStatusColor(selectedTenant.status).color}`}>
                      {selectedTenant.status}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-mizan-primary">
                    Primary Contact
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail size={18} className="text-mizan-secondary" />
                      <span className="text-sm text-mizan-secondary">
                        {selectedTenant.contactEmail}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={18} className="text-mizan-secondary" />
                      <span className="text-sm text-mizan-secondary">
                        {selectedTenant.contactPhone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin size={18} className="text-mizan-secondary" />
                      <span className="text-sm text-mizan-secondary">
                        {selectedTenant.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar size={18} className="text-mizan-secondary" />
                      <span className="text-sm text-mizan-secondary">
                        Last active {selectedTenant.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Usage Metrics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-mizan-primary">
                    Usage Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs mb-1 text-mizan-secondary">API Calls (30d)</p>
                      <p className="text-2xl font-bold text-mizan-primary">
                        {selectedTenant.apiCalls.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-xs mb-1 text-mizan-secondary">Storage Used</p>
                      <p className="text-2xl font-bold text-mizan-primary">
                        {selectedTenant.storageUsed}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Admins */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-mizan-primary">
                    Admin Users
                  </h3>
                  <div className="space-y-3">
                    {selectedTenant.admins.map((admin, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-mizan-primary">
                            <span className="text-white text-sm font-semibold">
                              {admin.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mizan-primary">
                              {admin.name}
                            </p>
                            <p className="text-xs text-mizan-secondary">
                              {admin.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Billing History */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-mizan-primary">
                    Billing History
                  </h3>
                  {selectedTenant.billingHistory.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTenant.billingHistory.map((bill, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                          <div>
                            <p className="text-sm font-medium text-mizan-primary">
                              ${bill.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-mizan-secondary">
                              {bill.date}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-500">
                            {bill.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-center py-8 text-mizan-secondary">
                      No billing history yet (Trial account)
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    className="px-4 py-3 rounded-xl text-sm font-medium border border-mizan-primary text-mizan-primary transition-all hover:shadow-md"
                    onClick={() => alert('Edit plan')}
                  >
                    Edit Plan
                  </button>
                  <button
                    className="px-4 py-3 rounded-xl text-sm font-medium border border-mizan-primary text-mizan-primary transition-all hover:shadow-md"
                    onClick={() => alert('View logs')}
                  >
                    Activity Logs
                  </button>
                  <button
                    className="px-4 py-3 rounded-xl text-sm font-medium border border-red-500 text-red-500 transition-all hover:shadow-md"
                    onClick={() => alert('Suspend account')}
                  >
                    Suspend
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
