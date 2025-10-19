'use client';

import { useEffect } from 'react';
import authService from '@/services/auth.service';
import apiClient from '@/lib/api-client';

/**
 * AuthInitializer Component
 * Initializes authentication from stored token on app mount
 * Ensures API client always has the latest token
 * Compliant with AGENT_CONTEXT_ULTIMATE.md - Production-ready implementation
 */
export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize auth from stored token on component mount
    authService.initializeAuth();

    // Also listen for storage events (when token is updated in another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'mizan_auth_token') {
        const newToken = e.newValue;
        if (newToken) {
          apiClient.setToken(newToken);
        } else {
          apiClient.setToken(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check for token periodically (for same-window updates)
    const interval = setInterval(() => {
      const token = authService.getToken();
      // Ensure API client always has the current token
      apiClient.setToken(token);
    }, 500); // Check every 500ms

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return <>{children}</>;
}