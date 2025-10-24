'use client';

import { useEffect } from 'react';
import authService from '@/services/auth.service';

/**
 * AuthInitializer Component
 * ✅ PRODUCTION: Phase 1 Security - httpOnly cookies for authentication
 * No token initialization needed - browser automatically sends httpOnly cookies
 * Compliant with AGENT_CONTEXT_ULTIMATE.md - Production-ready implementation
 */
export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ✅ PRODUCTION: Initialize auth (no-op, token is in httpOnly cookie)
    authService.initializeAuth();

    // Listen for storage events (when user data is updated in another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mizan_user') {
        // User data changed in another tab - could trigger re-fetch if needed
        // For now, just acknowledge the change
        console.log('User data updated in another tab');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return <>{children}</>;
}