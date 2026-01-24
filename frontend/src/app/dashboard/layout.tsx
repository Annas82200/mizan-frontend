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

    const checkAuth = async () => {
      try {
        // Step 1: Check localStorage for user data
        const userStr = localStorage.getItem('mizan_user');
        const token = localStorage.getItem('mizan_auth_token');

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

        // Step 4: If we have a token and user data, trust it (backend will validate on API calls)
        // This prevents unnecessary redirects due to network issues
        if (token && user.id) {
          logger.debug('[Auth] User authenticated via localStorage token');
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // Step 5: If no token but user data exists, try backend verification
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://mizan-backend-production.up.railway.app';
          logger.debug('[Auth] Verifying authentication with backend');

          const response = await fetch(`${apiUrl}/api/auth/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          });

          if (response.ok) {
            logger.debug('[Auth] Backend authentication verified');
            setIsAuthenticated(true);
          } else {
            // Backend rejected - clear data and redirect
            logger.warn('[Auth] Backend rejected authentication');
            localStorage.removeItem('mizan_user');
            localStorage.removeItem('mizan_auth_token');
            router.push('/login');
            return;
          }
        } catch (fetchError) {
          // Network error - trust localStorage if we have valid data
          logger.warn('[Auth] Backend check failed (network), trusting localStorage');
          if (user.id && user.role) {
            setIsAuthenticated(true);
          } else {
            router.push('/login');
            return;
          }
        }

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
