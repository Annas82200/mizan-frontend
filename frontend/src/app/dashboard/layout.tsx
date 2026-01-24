'use client';

import { DashboardLayout } from '@/components/dashboard';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { logger } from '@/lib/logger';

type UserRole = 'superadmin' | 'admin' | 'employee';

export default function MainDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('admin');

  useEffect(() => {
    // Skip auth check for superadmin routes - they have their own layout
    if (pathname?.startsWith('/dashboard/superadmin')) {
      setIsAuthenticated(true);
      setUserRole('superadmin');
      setIsLoading(false);
      return;
    }

    const checkAuth = () => {
      try {
        // Step 1: Check localStorage for user data
        const userStr = localStorage.getItem('mizan_user');

        if (!userStr) {
          logger.warn('[Auth] No user data in localStorage, redirecting to login');
          router.push('/login');
          return;
        }

        // Step 2: Parse user data with error handling
        let user;
        try {
          user = JSON.parse(userStr);
        } catch (parseError) {
          logger.error('[Auth] Invalid user data in localStorage');
          localStorage.removeItem('mizan_user');
          router.push('/login');
          return;
        }

        // Step 3: Set user role for sidebar
        const role = user.role as UserRole;
        if (role === 'superadmin' || role === 'admin' || role === 'employee') {
          setUserRole(role);
        } else {
          setUserRole('employee');
        }

        // Step 4: If we have valid user data with a role, trust it
        // The backend will validate on actual API calls
        // This prevents unnecessary redirects due to network issues
        if (user.role) {
          logger.debug('[Auth] User authenticated via localStorage:', user.role);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // No valid role found - redirect to login
        logger.warn('[Auth] No valid role in user data');
        router.push('/login');

      } catch (error) {
        logger.error('[Auth] Authentication check failed:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mizan-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-mizan-gold mx-auto mb-4" />
          <p className="text-mizan-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout role={userRole}>
      {children}
    </DashboardLayout>
  );
}
