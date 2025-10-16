'use client';

import { DashboardLayout } from '@/components/dashboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';
import { displayEnvStatus } from '@/lib/env-check';
import { Loader2 } from 'lucide-react';

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Display environment status in console for debugging
    if (process.env.NODE_ENV === 'development') {
      displayEnvStatus();
    }

    // Check authentication
    const checkAuth = async () => {
      try {
        const authenticated = authService.isAuthenticated();
        const user = authService.getCurrentUser();

        if (!authenticated || !user) {
          console.warn('[Auth] No valid session found, redirecting to login');
          router.push('/login');
          return;
        }

        // Verify user has superadmin role
        if (user.role !== 'superadmin') {
          console.warn('[Auth] User is not superadmin, redirecting to appropriate dashboard');
          router.push('/dashboard');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('[Auth] Authentication check failed:', error);
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
