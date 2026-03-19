'use client';

import { useState, useEffect } from 'react';
import { loadBranding, TenantBranding } from '@/lib/theme-engine';

/**
 * Hook for accessing tenant branding in components
 *
 * Usage:
 *   const { branding, isLoading } = useTenantBranding();
 *   if (branding?.logoUrl) { ... }
 */
export function useTenantBranding() {
  const [branding, setBranding] = useState<TenantBranding | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBranding()
      .then(setBranding)
      .finally(() => setIsLoading(false));
  }, []);

  return { branding, isLoading };
}
