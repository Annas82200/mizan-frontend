"use client";

import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { 
  Shield, 
  BarChart3, 
  Users, 
  Settings, 
  Brain,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { logout } = useAuth();
  
  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: BarChart3,
      description: 'Stats, client overview, troubleshooting'
    },
    {
      id: 'clients',
      name: 'Clients',
      icon: Users,
      description: 'Client management with tiers'
    },
    {
      id: 'framework',
      name: 'Framework',
      icon: Settings,
      description: 'Manage the Mizan framework'
    },
    {
      id: 'ai-training',
      name: 'AI Training Center',
      icon: Brain,
      description: 'Train and manage AI agents'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-mizan-teal rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="ml-2 text-xl font-bold text-mizan-dark">Mizan</span>
          <span className="ml-4 text-xs text-gray-500 bg-red-100 text-red-800 px-2 py-1 rounded-full">SuperAdmin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-mizan-teal text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs ${isActive ? 'text-mizan-teal-100' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {activeSection.replace('-', ' ')}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {activeSection === 'dashboard' && 'System overview and statistics'}
                  {activeSection === 'clients' && 'Manage client accounts and services'}
                  {activeSection === 'framework' && 'Configure analysis frameworks'}
                  {activeSection === 'ai-training' && 'Train and manage AI agents'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}