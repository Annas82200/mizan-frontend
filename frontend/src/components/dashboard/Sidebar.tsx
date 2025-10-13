'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  DashboardIcon,
  BuildingIcon,
  APIIcon,
  TriggersIcon,
  FrameworkIcon,
  AITrainingIcon,
  StructureIcon,
  CultureIcon,
  SkillsIcon,
  PerformanceIcon,
  HiringIcon,
  LXPIcon,
  TeamsIcon,
  SettingsIcon,
  SocialMediaIcon,
} from '@/components/icons';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

interface SidebarProps {
  role: 'superadmin' | 'admin' | 'employee';
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['modules']);

  const toggleSection = (label: string) => {
    setExpandedSections(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  // Role-based navigation
  const navigationConfig: Record<typeof role, NavItem[]> = {
    superadmin: [
      {
        label: 'Overview',
        href: '/dashboard/superadmin',
        icon: <DashboardIcon className="w-5 h-5" />,
      },
      {
        label: 'Tenants',
        href: '/dashboard/superadmin/tenants',
        icon: <BuildingIcon className="w-5 h-5" />,
      },
      {
        label: 'Demo Requests',
        href: '/dashboard/superadmin/demo-requests',
        icon: <BuildingIcon className="w-5 h-5" />,
      },
      {
        label: 'System Analytics',
        href: '/dashboard/superadmin/analytics',
        icon: <APIIcon className="w-5 h-5" />,
      },
      {
        label: 'Trigger Engine',
        href: '/dashboard/superadmin/triggers',
        icon: <TriggersIcon className="w-5 h-5" />,
      },
      {
        label: 'Framework Config',
        href: '/dashboard/superadmin/framework',
        icon: <FrameworkIcon className="w-5 h-5" />,
      },
      {
        label: 'AI Training',
        href: '/dashboard/superadmin/ai-training',
        icon: <AITrainingIcon className="w-5 h-5" />,
      },
      {
        label: 'Modules',
        href: '#',
        icon: <FrameworkIcon className="w-5 h-5" />,
        children: [
          {
            label: 'Structure',
            href: '/dashboard/superadmin/structure',
            icon: <StructureIcon className="w-4 h-4" />,
          },
          {
            label: 'Culture',
            href: '/dashboard/superadmin/culture',
            icon: <CultureIcon className="w-4 h-4" />,
          },
          {
            label: 'Performance',
            href: '/dashboard/superadmin/performance',
            icon: <PerformanceIcon className="w-4 h-4" />,
          },
        ],
      },
      {
        label: 'Billing & Revenue',
        href: '/dashboard/superadmin/billing',
        icon: <span className="text-lg">◇</span>,
      },
      {
        label: 'Settings',
        href: '/dashboard/superadmin/settings',
        icon: <SettingsIcon className="w-5 h-5" />,
      },
    ],
    admin: [
      {
        label: 'Dashboard',
        href: '/dashboard/admin',
        icon: <DashboardIcon className="w-5 h-5" />,
      },
      {
        label: 'Structure',
        href: '/dashboard/admin/structure',
        icon: <StructureIcon className="w-5 h-5" />,
      },
      {
        label: 'Culture',
        href: '/dashboard/admin/culture',
        icon: <CultureIcon className="w-5 h-5" />,
      },
      {
        label: 'Team',
        href: '/dashboard/admin/team',
        icon: <TeamsIcon className="w-5 h-5" />,
      },
      {
        label: 'Settings',
        href: '/dashboard/admin/settings',
        icon: <SettingsIcon className="w-5 h-5" />,
      },
    ],
    employee: [
      {
        label: 'Dashboard',
        href: '/dashboard/employee',
        icon: <DashboardIcon className="w-5 h-5" />,
      },
      {
        label: 'My Profile',
        href: '/dashboard/employee/profile',
        icon: <span className="text-lg">◉</span>,
      },
      {
        label: 'My Growth',
        href: '/dashboard/employee/growth',
        icon: <SkillsIcon className="w-5 h-5" />,
      },
      {
        label: 'Performance',
        href: '/dashboard/employee/performance',
        icon: <PerformanceIcon className="w-5 h-5" />,
      },
      {
        label: 'My Team',
        href: '/dashboard/employee/team',
        icon: <TeamsIcon className="w-5 h-5" />,
      },
    ],
  };

  const navigation = navigationConfig[role];

  const renderNavItem = (item: NavItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.label);
    const active = isActive(item.href);

    if (hasChildren) {
      return (
        <div key={item.label} className="space-y-1">
          <button
            onClick={() => toggleSection(item.label)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-400 group ${
              active ? 'bg-mizan-primary text-white' : 'text-mizan-secondary hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={active ? 'text-white' : 'text-mizan-primary'}>
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown size={16} className="transition-transform duration-400" />
            ) : (
              <ChevronRight size={16} className="transition-transform duration-400" />
            )}
          </button>

          {isExpanded && (
            <div className="pl-4 space-y-1 animate-fadeIn">
              {item.children?.map(child => renderNavItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={onClose}
        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-400 group ${
          active
            ? 'bg-mizan-primary text-white shadow-lg'
            : 'text-mizan-secondary hover:bg-gray-50 hover:translate-x-1'
        } ${depth > 0 ? 'ml-4' : ''}`}
      >
        <div className={active ? 'text-white' : 'text-mizan-primary'}>
          {item.icon}
        </div>
        <span className="text-sm font-medium">{item.label}</span>
        {active && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-mizan-gold animate-pulse" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-400"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:sticky lg:top-0 w-72 overflow-y-auto`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CCA404 #f5f5f5',
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <FrameworkIcon className="w-10 h-10 transition-transform duration-400 group-hover:scale-110" color="#3F3D56" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-mizan-gold rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-mizan-primary">
                Mizan
              </h1>
              <p className="text-xs text-mizan-gold uppercase tracking-wider">
                {role === 'superadmin' ? 'Platform Admin' : role === 'admin' ? 'Admin Portal' : 'Employee Portal'}
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map(item => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 mt-auto">
          <div className="bg-gradient-to-br from-mizan-primary to-mizan-gold p-4 rounded-2xl text-white">
            <p className="text-xs font-semibold mb-1">Need Help?</p>
            <p className="text-xs opacity-90 mb-3">Contact support for assistance</p>
            <button className="w-full bg-white text-mizan-primary text-xs font-medium py-2 px-3 rounded-lg hover:shadow-lg transition-all duration-400">
              Get Support
            </button>
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 400ms ease-out;
        }
      `}</style>
    </>
  );
};
