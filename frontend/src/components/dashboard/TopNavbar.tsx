'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, LogOut, User, X } from 'lucide-react';
import { NotificationIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning';
}

interface TopNavbarProps {
  onMenuClick: () => void;
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onMenuClick,
  userName = 'Admin User',
  userEmail = 'admin@mizan.ai',
  userRole = 'superadmin',
}) => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock notifications - replace with API call
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New tenant signed up',
      message: 'Innovation Labs started a trial',
      time: '15 minutes ago',
      read: false,
      type: 'success',
    },
    {
      id: 2,
      title: 'System update',
      message: 'Platform maintenance scheduled',
      time: '2 hours ago',
      read: false,
      type: 'warning',
    },
    {
      id: 3,
      title: 'Report ready',
      message: 'Monthly analytics report available',
      time: '1 day ago',
      read: true,
      type: 'info',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem('token');
    // Redirect to login
    router.push('/login');
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-500';
      case 'warning': return 'bg-yellow-100 text-mizan-gold';
      default: return 'bg-blue-100 text-blue-500';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'superadmin': return 'Platform Administrator';
      case 'admin': return 'Organization Admin';
      case 'employee': return 'Team Member';
      default: return role;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left: Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-400"
        >
          <Menu size={24} className="text-mizan-primary" />
        </button>

        {/* Center: Page title (can be customized per page) */}
        <div className="flex-1 lg:flex-none">
          <h2 className="text-lg font-semibold text-mizan-primary hidden lg:block">
            {/* This can be dynamic based on route */}
          </h2>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-400"
            >
              <NotificationIcon
                className="w-6 h-6"
                color="#3F3D56"
                hasNotifications={unreadCount > 0}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-mizan-gold text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slideDown">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-mizan-primary">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X size={16} className="text-mizan-secondary" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-sm text-mizan-secondary">No notifications</p>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-400 ${
                          !notif.read ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            !notif.read ? 'bg-mizan-gold animate-pulse' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-mizan-primary mb-1">
                              {notif.title}
                            </p>
                            <p className="text-xs text-mizan-secondary mb-2">
                              {notif.message}
                            </p>
                            <p className="text-xs text-mizan-secondary opacity-60">
                              {notif.time}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getNotificationColor(notif.type)}`}>
                            {notif.type}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 border-t border-gray-200 text-center">
                  <button className="text-xs font-medium text-mizan-gold hover:opacity-60 transition-opacity duration-400">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 pr-4 rounded-xl hover:bg-gray-100 transition-all duration-400 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mizan-primary to-mizan-gold flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition-shadow duration-400">
                {userName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-mizan-primary">{userName}</p>
                <p className="text-xs text-mizan-secondary">{getRoleDisplayName(userRole)}</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slideDown">
                <div className="p-6 bg-gradient-to-br from-mizan-primary to-mizan-gold text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{userName}</p>
                      <p className="text-sm opacity-90">{userEmail}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                        {getRoleDisplayName(userRole)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      router.push(`/dashboard/${userRole}/profile`);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all duration-400 text-mizan-secondary"
                  >
                    <User size={18} />
                    <span className="text-sm font-medium">My Profile</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-400 text-red-500"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 400ms ease-out;
        }
      `}</style>
    </header>
  );
};
