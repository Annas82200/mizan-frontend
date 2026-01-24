'use client';

import { DashboardLayout } from '@/components/dashboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { logger } from '@/lib/logger';

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verify authentication from localStorage
    // Backend will validate on actual API calls - no network calls needed here
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

        // Step 3: Verify role requirement
        if (user.role !== 'superadmin') {
          logger.warn('[Auth] User is not superadmin, redirecting to appropriate dashboard');
          router.push('/dashboard');
          return;
        }

        // Step 4: User has valid superadmin role in localStorage - trust it
        // Backend will validate on actual API calls
        logger.debug('[Auth] Superadmin authenticated via localStorage');
        setIsAuthenticated(true);

      } catch (error) {
        logger.error('[Auth] Authentication check failed:', error);
        localStorage.removeItem('mizan_user');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mizan-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-mizan-gold mx-auto mb-4" />
          <p className="text-mizan-secondary">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirecting to login
  }

  return (
    <DashboardLayout role="superadmin">
      {children}
    </DashboardLayout>
  );
}
