"use client";

import React, { useState, useEffect } from 'react';
import { useClients } from '../../../contexts/client-context';
import { 
  Users, 
  Plus, 
  Eye, 
  Settings,
  Building2,
  Mail,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Client {
  id: string;
  name: string;
  email: string;
  plan: string;
  employees: number;
  industry: string;
  status: 'active' | 'inactive' | 'trial';
  createdAt: string;
  lastActive: string;
  mrr: number;
  services?: string[];
}

export default function ClientsPage() {
  const { clients, addClient } = useClients();
  const router = useRouter();
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    plan: 'Pro',
    employees: 0,
    industry: '',
    status: 'active' as const
  });

  const handleAddClient = async () => {
    if (!newClient.name || !newClient.email) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const client: Client = {
        id: Date.now().toString(),
        name: newClient.name,
        email: newClient.email,
        plan: newClient.plan,
        employees: newClient.employees,
        industry: newClient.industry,
        status: newClient.status,
        createdAt: new Date().toISOString(),
        lastActive: 'Just now',
        mrr: newClient.plan === 'Pro+' ? 2000 : newClient.plan === 'Pro' ? 79 : 29,
        services: []
      };

      await addClient(client);
      
      // Reset form
      setNewClient({
        name: '',
        email: '',
        plan: 'Pro',
        employees: 0,
        industry: '',
        status: 'active'
      });
      
      setShowAddClient(false);
      alert('Client added successfully!');
    } catch (error) {
      alert('Failed to add client: ' + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'trial': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Pro+': return 'text-purple-600 bg-purple-100';
      case 'Pro': return 'text-blue-600 bg-blue-100';
      case 'Basic': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage client accounts and their service subscriptions</p>
        </div>
        <button
          onClick={() => setShowAddClient(true)}
          className="flex items-center space-x-2 bg-mizan-teal text-white px-4 py-2 rounded-lg hover:bg-mizan-teal-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Client</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                  placeholder="Enter email address"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                  <select
                    value={newClient.plan}
                    onChange={(e) => setNewClient({...newClient, plan: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Pro+">Pro+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
                  <input
                    type="number"
                    value={newClient.employees}
                    onChange={(e) => setNewClient({...newClient, employees: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <input
                  type="text"
                  value={newClient.industry}
                  onChange={(e) => setNewClient({...newClient, industry: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                  placeholder="Enter industry"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddClient(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="px-4 py-2 bg-mizan-teal text-white rounded-lg hover:bg-mizan-teal-600 transition-colors"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Clients</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(client.plan)}`}>
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.employees.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/superadmin/clients/${client.id}`)}
                        className="text-mizan-teal hover:text-mizan-teal-600 flex items-center"
                        title="View Client"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/superadmin/clients/${client.id}`)}
                        className="text-gray-600 hover:text-gray-900 flex items-center"
                        title="Manage Client"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}