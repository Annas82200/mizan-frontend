"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MizanIcons } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  tier?: 'free' | 'pro' | 'enterprise';
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: 'Structure Analysis',
    href: '/entry',
    icon: MizanIcons.Structure,
    tier: 'free'
  },
  {
    label: 'Culture Analysis',
    href: '/pro/culture',
    icon: MizanIcons.Culture,
    tier: 'pro'
  },
  {
    label: 'Skills Analysis',
    href: '/pro/skills',
    icon: MizanIcons.Skills,
    tier: 'pro'
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: MizanIcons.Dashboard,
    tier: 'pro',
    children: [
      { label: 'Overview', href: '/dashboard', icon: MizanIcons.Dashboard },
      { label: 'Reports', href: '/dashboard/reports', icon: MizanIcons.Report },
      { label: 'Insights', href: '/dashboard/insights', icon: MizanIcons.AI },
    ]
  },
  {
    label: 'Actions',
    href: '/actions',
    icon: MizanIcons.Trigger,
    tier: 'pro',
    children: [
      { label: 'Hiring', href: '/modules/hiring', icon: MizanIcons.User },
      { label: 'Learning', href: '/modules/learning', icon: MizanIcons.Learning },
      { label: 'Performance', href: '/modules/performance', icon: MizanIcons.Report },
    ]
  }
];

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const canAccess = (tier?: string) => {
    if (!tier || tier === 'free') return true;
    if (!session) return false;
    // Add your tier checking logic here
    return true;
  };

  return (
    <nav className="bg-white border-b border-mizan-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <MizanIcons.Logo size={40} className="group-hover:scale-105 transition-transform" />
            <span className="text-xl font-semibold text-mizan-gray-900">Mizan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const hasAccess = canAccess(item.tier);
              
              if (item.children) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${isActive(item.href) 
                          ? 'bg-mizan-gold text-white' 
                          : hasAccess
                            ? 'text-mizan-gray-700 hover:bg-mizan-gray-200 hover:text-mizan-gray-900'
                            : 'text-mizan-gray-400 cursor-not-allowed'
                        }`}
                      disabled={!hasAccess}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-mizan-lg border border-mizan-gray-200 overflow-hidden"
                        >
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={`flex items-center space-x-3 px-4 py-3 hover:bg-mizan-gray-100 transition-colors
                                  ${isActive(child.href) ? 'bg-mizan-gold/10 text-mizan-gold' : 'text-mizan-gray-700'}`}
                              >
                                <ChildIcon size={16} />
                                <span className="text-sm">{child.label}</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.label}
                  href={hasAccess ? item.href : '#'}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive(item.href) 
                      ? 'bg-mizan-gold text-white shadow-mizan' 
                      : hasAccess
                        ? 'text-mizan-gray-700 hover:bg-mizan-gray-200 hover:text-mizan-gray-900'
                        : 'text-mizan-gray-400 cursor-not-allowed'
                    }`}
                  onClick={(e) => !hasAccess && e.preventDefault()}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.tier === 'pro' && !session && (
                    <span className="text-xs bg-mizan-gold/20 text-mizan-gold px-2 py-0.5 rounded-full">PRO</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-lg hover:bg-mizan-gray-200 transition-colors">
                  <MizanIcons.Settings size={20} className="text-mizan-gray-700" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-mizan-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {session.user?.name?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-mizan-gray-900">
                    {session.user?.name}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login"
                  className="text-sm font-medium text-mizan-gray-700 hover:text-mizan-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup"
                  className="bg-mizan-gold text-white px-4 py-2 rounded-lg text-sm font-medium 
                           hover:bg-mizan-gold-dark transition-colors shadow-mizan hover:shadow-mizan-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-mizan-gray-200 transition-colors"
          >
            <svg className="w-6 h-6 text-mizan-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-mizan-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const hasAccess = canAccess(item.tier);
                
                return (
                  <Link
                    key={item.label}
                    href={hasAccess ? item.href : '#'}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg
                      ${isActive(item.href) 
                        ? 'bg-mizan-gold text-white' 
                        : hasAccess
                          ? 'text-mizan-gray-700 hover:bg-mizan-gray-100'
                          : 'text-mizan-gray-400'
                      }`}
                    onClick={() => hasAccess && setMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    {item.tier === 'pro' && !session && (
                      <span className="text-xs bg-mizan-gold/20 text-mizan-gold px-2 py-0.5 rounded-full ml-auto">PRO</span>
                    )}
                  </Link>
                );
              })}
              
              {/* Mobile User Section */}
              <div className="pt-4 border-t border-mizan-gray-200">
                {session ? (
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-10 h-10 bg-mizan-gold rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {session.user?.name?.[0] || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-mizan-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-mizan-gray-700">{session.user?.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 px-4">
                    <Link 
                      href="/login"
                      className="block w-full text-center py-2 text-mizan-gray-700 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/signup"
                      className="block w-full text-center bg-mizan-gold text-white py-2 rounded-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
