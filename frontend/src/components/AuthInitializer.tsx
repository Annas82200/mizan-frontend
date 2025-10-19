'use client';

import { useEffect } from 'react';
import authService from '@/services/auth.service';

/**
 * AuthInitializer Component
 * Initializes authentication from stored token on app mount
 * Compliant with AGENT_CONTEXT_ULTIMATE.md - Production-ready implementation
 */
export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize auth from stored token on component mount
    authService.initializeAuth();
  }, []);

  return <>{children}</>;
}