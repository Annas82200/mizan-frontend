'use client';

import { DashboardLayout } from '@/components/dashboard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
    // ✅ PRODUCTION: Check authentication using user data (Phase 1 Security)
    // Token is in httpOnly cookie, so we check for user data in localStorage
    const checkAuth = () => {
      try {
        // Safe localStorage access (client-side only)
        const userStr = localStorage.getItem('mizan_user');

        if (!userStr) {
          console.warn('[Auth] No valid session found, redirecting to login');
          router.push('/login');
          return;
        }

        // Safe JSON parsing with error handling
        let user;
        try {
          user = JSON.parse(userStr);
        } catch (parseError) {
          console.error('[Auth] Invalid user data in localStorage');
          localStorage.removeItem('mizan_user');
          localStorage.removeItem('mizan_auth_token');
          router.push('/login');
          return;
        }

        // Strict role checking (security requirement)
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
