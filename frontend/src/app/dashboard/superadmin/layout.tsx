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
    // ✅ PRODUCTION: Verify authentication with backend (Phase 1 Security - AGENT_CONTEXT_ULTIMATE.md compliant)
    // Check both localStorage AND backend cookie validity to prevent stale data access
    const checkAuth = async () => {
      try {
        // Step 1: Check localStorage for user data
        const userStr = localStorage.getItem('mizan_user');

        if (!userStr) {
          console.warn('[Auth] No user data in localStorage, redirecting to login');
          router.push('/login');
          return;
        }

        // Step 2: Parse user data with error handling
        let user;
        try {
          user = JSON.parse(userStr);
        } catch (parseError) {
          console.error('[Auth] Invalid user data in localStorage');
          localStorage.removeItem('mizan_user');
          router.push('/login');
          return;
        }

        // Step 3: Verify role requirement
        if (user.role !== 'superadmin') {
          console.warn('[Auth] User is not superadmin, redirecting to appropriate dashboard');
          router.push('/dashboard');
          return;
        }

        // Step 4: CRITICAL - Verify backend authentication (httpOnly cookie validation)
        // This prevents stale localStorage from granting access without valid cookie
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://mizan-backend-production.up.railway.app';
          console.log('[Auth] Verifying authentication with backend:', `${apiUrl}/api/auth/me`);

          const response = await fetch(`${apiUrl}/api/auth/me`, {
            method: 'GET',
            credentials: 'include', // CRITICAL: Send httpOnly cookie
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log('[Auth] Backend verification response status:', response.status);

          if (!response.ok) {
            console.error('[Auth] Backend authentication failed - no valid cookie');
            // Clear stale localStorage data
            localStorage.removeItem('mizan_user');
            router.push('/login');
            return;
          }

          // Backend confirmed authentication is valid
          console.log('[Auth] Backend authentication verified successfully');
          setIsAuthenticated(true);

        } catch (fetchError) {
          console.error('[Auth] Failed to verify authentication with backend:', fetchError);
          // Clear stale data and redirect to login
          localStorage.removeItem('mizan_user');
          router.push('/login');
          return;
        }

      } catch (error) {
        console.error('[Auth] Authentication check failed:', error);
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
