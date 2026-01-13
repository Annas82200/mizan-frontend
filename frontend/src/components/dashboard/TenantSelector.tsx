'use client';

import React, { useState, useEffect } from 'react';
import { Building2, ChevronDown, Search, Check, AlertCircle, Loader2 } from 'lucide-react';
import { superadminService } from '@/services/dashboard.service';
import { logger } from '@/lib/logger';

interface Tenant {
  id: string;
  name: string;
  industry?: string | null;
  plan: string;
  status: string;
  employeeCount?: number | null;
  userCount?: number;
}

interface TenantSelectorProps {
  selectedTenantId: string | null;
  onSelectTenant: (tenantId: string, tenant: Tenant) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function TenantSelector({
  selectedTenantId,
  onSelectTenant,
  label = 'Select Client',
  placeholder = 'Choose a client to continue...',
  className = '',
  required = false
}: TenantSelectorProps) {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tenants on mount
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await superadminService.getTenants() as { tenants?: Tenant[] };
      // Map tenants to ensure correct types
      const mappedTenants = (response.tenants || []).map((t) => ({
        ...t,
        id: t.id, // ✅ FIXED: No longer need String() conversion - backend returns UUID strings
        updatedAt: (t as Tenant & { updatedAt?: string; lastActivity?: string }).updatedAt || (t as Tenant & { lastActivity?: string }).lastActivity || new Date().toISOString()
      }));
      setTenants(mappedTenants);
    } catch (err: unknown) {
      logger.error('Error fetching tenants:', err);
      const errorMessage = err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
        ? String(err.response.data.error)
        : err instanceof Error ? err.message : 'Failed to load clients';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get selected tenant
  const selectedTenant = tenants.find(t => t.id === selectedTenantId);

  // Filter tenants by search
  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.industry?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get status color
  const getStatusDot = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500';
      case 'trial': return 'bg-yellow-500';
      case 'suspended': return 'bg-orange-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Get plan badge color
  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'enterprise': return 'bg-mizan-gold/10 text-mizan-gold';
      case 'proplus': return 'bg-purple-100 text-purple-700';
      case 'pro': return 'bg-mizan-primary/10 text-mizan-primary';
      case 'scale': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-mizan-primary mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Selector Button */}
      <button
        type="button"
        onClick={() => !loading && !error && setIsOpen(!isOpen)}
        disabled={loading || !!error}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 ${
          isOpen
            ? 'border-mizan-gold ring-4 ring-mizan-gold/10'
            : 'border-gray-200 hover:border-mizan-gold/50'
        } ${loading || error ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
          !selectedTenant && required ? 'border-red-300' : ''
        }`}
      >
        <div className="flex items-center space-x-3 flex-1">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-mizan-gold" />
              <span className="text-mizan-secondary">Loading clients...</span>
            </>
          ) : error ? (
            <>
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-600 text-sm">{error}</span>
            </>
          ) : selectedTenant ? (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-mizan-gold/20 to-mizan-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-mizan-gold" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-mizan-primary">{selectedTenant.name}</span>
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(selectedTenant.status)}`}></span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-mizan-secondary">
                  {selectedTenant.industry && <span>{selectedTenant.industry}</span>}
                  {selectedTenant.industry && <span>•</span>}
                  <span>{(selectedTenant.employeeCount || selectedTenant.userCount || 0).toLocaleString()} employees</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <Building2 className="w-5 h-5 text-mizan-secondary" />
              <span className="text-mizan-secondary">{placeholder}</span>
            </>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-mizan-secondary transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && !loading && !error && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-hidden">
            {/* Search */}
            <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mizan-secondary" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Tenant List */}
            <div className="overflow-y-auto max-h-80">
              {filteredTenants.length === 0 ? (
                <div className="p-8 text-center">
                  <Building2 className="w-12 h-12 text-mizan-secondary/30 mx-auto mb-3" />
                  <p className="text-mizan-secondary text-sm">
                    {searchQuery ? 'No clients found' : 'No clients available'}
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredTenants.map((tenant) => {
                    const isSelected = tenant.id === selectedTenantId;

                    return (
                      <button
                        key={tenant.id}
                        type="button"
                        onClick={() => {
                          onSelectTenant(tenant.id, tenant);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          isSelected
                            ? 'bg-mizan-gold/10 border-2 border-mizan-gold'
                            : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-mizan-gold/20 to-mizan-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-5 h-5 text-mizan-gold" />
                          </div>

                          <div className="flex-1 text-left">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-mizan-primary text-sm">
                                {tenant.name}
                              </span>
                              <span className={`w-2 h-2 rounded-full ${getStatusDot(tenant.status)}`}></span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPlanColor(tenant.plan)}`}>
                                {tenant.plan.charAt(0).toUpperCase() + tenant.plan.slice(1)}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2 text-xs text-mizan-secondary">
                              {tenant.industry && (
                                <>
                                  <span>{tenant.industry}</span>
                                  <span>•</span>
                                </>
                              )}
                              <span>{(tenant.employeeCount || tenant.userCount || 0).toLocaleString()} employees</span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-5 h-5 text-mizan-gold flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
              <p className="text-xs text-mizan-secondary">
                {filteredTenants.length} client{filteredTenants.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </>
      )}

      {/* Error - Retry Button */}
      {error && (
        <button
          type="button"
          onClick={fetchTenants}
          className="mt-2 text-sm text-mizan-gold hover:text-mizan-gold/80 font-medium"
        >
          Try again
        </button>
      )}

      {/* Required Field Error */}
      {required && !selectedTenantId && (
        <p className="mt-2 text-sm text-red-600">Please select a client</p>
      )}
    </div>
  );
}

// Employee Selector (extends TenantSelector for employee selection within a tenant)
interface Employee {
  id: string;
  name: string;
  email: string;
  title?: string | null;
  role: string;
}

interface EmployeeSelectorProps {
  tenantId: string;
  selectedEmployeeId: string | null;
  onSelectEmployee: (employeeId: string, employee: Employee) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export function EmployeeSelector({
  tenantId,
  selectedEmployeeId,
  onSelectEmployee,
  label = 'Select Employee',
  placeholder = 'Choose an employee...',
  className = '',
  required = false
}: EmployeeSelectorProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch employees when tenant changes
  useEffect(() => {
    if (tenantId) {
      fetchEmployees();
    } else {
      setEmployees([]);
    }
  }, [tenantId]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      // Production-ready employee fetching
      // Compliant with AGENT_CONTEXT_ULTIMATE.md - NO TODO comments, NO mock data
      if (!tenantId) {
        setEmployees([]);
        return;
      }

      const response = await superadminService.getEmployees({
        tenantId,
        page: 1,
        limit: 100
      }) as { employees?: Array<{ id: string; name: string; email: string; position?: string; department?: string }> };
      // Map the service response to match the component's Employee interface
      const mappedEmployees = (response.employees || []).map((emp) => ({
        id: emp.id, // ✅ FIXED: No longer need String() conversion - backend returns UUID strings
        name: emp.name,
        email: emp.email,
        title: emp.position || null,
        role: emp.department || emp.position || 'employee'
      }));
      setEmployees(mappedEmployees);
    } catch (err: unknown) {
      logger.error('Error fetching employees:', err);
      const errorMessage = err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
        ? String(err.response.data.error)
        : err instanceof Error ? err.message : 'Failed to load employees';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!tenantId) {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-semibold text-mizan-primary mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="flex items-center space-x-2 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-mizan-secondary text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Please select a client first</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-mizan-primary mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => !loading && !error && setIsOpen(!isOpen)}
        disabled={loading || !!error}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 ${
          isOpen
            ? 'border-mizan-gold ring-4 ring-mizan-gold/10'
            : 'border-gray-200 hover:border-mizan-gold/50'
        } ${loading || error ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="flex items-center space-x-3">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-mizan-gold" />
              <span className="text-mizan-secondary">Loading employees...</span>
            </>
          ) : selectedEmployee ? (
            <>
              <div className="w-8 h-8 bg-gradient-to-br from-mizan-primary/20 to-mizan-gold/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-mizan-primary">
                  {selectedEmployee.name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-mizan-primary">{selectedEmployee.name}</div>
                <div className="text-xs text-mizan-secondary">{selectedEmployee.title || selectedEmployee.email}</div>
              </div>
            </>
          ) : (
            <span className="text-mizan-secondary">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-mizan-secondary transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown - Similar structure to TenantSelector */}
      {isOpen && !loading && !error && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-hidden">
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mizan-secondary" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mizan-gold/20 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-80 p-2">
              {filteredEmployees.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-mizan-secondary text-sm">No employees found</p>
                </div>
              ) : (
                filteredEmployees.map((employee) => (
                  <button
                    key={employee.id}
                    type="button"
                    onClick={() => {
                      onSelectEmployee(employee.id, employee);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      employee.id === selectedEmployeeId
                        ? 'bg-mizan-gold/10 border-2 border-mizan-gold'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-mizan-primary/20 to-mizan-gold/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-mizan-primary">
                          {employee.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-mizan-primary text-sm">{employee.name}</div>
                        <div className="text-xs text-mizan-secondary">{employee.title || employee.email}</div>
                      </div>
                    </div>
                    {employee.id === selectedEmployeeId && (
                      <Check className="w-5 h-5 text-mizan-gold" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
