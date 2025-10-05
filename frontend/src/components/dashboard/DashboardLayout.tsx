'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'superadmin' | 'admin' | 'employee';
  userName?: string;
  userEmail?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role,
  userName,
  userEmail,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mizan-background flex">
      {/* Sidebar */}
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Navigation */}
        <TopNavbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userName={userName}
          userEmail={userEmail}
          userRole={role}
        />

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
              <p className="text-xs text-mizan-secondary">
                © 2024 Mizan AI. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <a href="/privacy" className="text-xs text-mizan-secondary hover:text-mizan-gold transition-colors duration-400">
                  Privacy
                </a>
                <a href="/terms" className="text-xs text-mizan-secondary hover:text-mizan-gold transition-colors duration-400">
                  Terms
                </a>
                <a href="#" className="text-xs text-mizan-secondary hover:text-mizan-gold transition-colors duration-400">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
