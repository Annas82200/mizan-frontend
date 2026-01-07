/**
 * Custom authentication hook using localStorage
 * Matches the existing auth pattern used throughout the app
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/lib/logger';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  tenantId?: string;
}

interface AuthSession {
  user: User | null;
  token: string | null;
  loading: boolean;
}

export function useAuth(): AuthSession {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession>({
    user: null,
    token: null,
    loading: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setSession({ user: null, token: null, loading: false });
      return;
    }

    try {
      // Decode JWT payload to get user info
      const payload = JSON.parse(atob(token.split('.')[1]));

      const user: User = {
        id: payload.userId || payload.id || '',
        email: payload.email || '',
        name: payload.name || payload.email?.split('@')[0] || '',
        role: payload.role || 'employee',
        tenantId: payload.tenantId || ''
      };

      setSession({ user, token, loading: false });
    } catch (error) {
      logger.error('Error decoding token:', error);
      localStorage.removeItem('token');
      setSession({ user: null, token: null, loading: false });
      router.push('/login');
    }
  }, [router]);

  return session;
}
