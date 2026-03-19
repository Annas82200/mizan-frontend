/**
 * Theme Engine — Runtime CSS variable injection for white-label branding
 *
 * Fetches tenant branding from the API and injects CSS variables into :root.
 * Cached in localStorage for instant theme application on subsequent loads.
 */

import apiClient from './api-client';

export interface TenantBranding {
  companyName: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  fontFamilySans: string;
  fontFamilyDisplay: string;
  logoUrl: string | null;
  logoDarkUrl: string | null;
  faviconUrl: string | null;
  sidebarLogoUrl: string | null;
  loginBackgroundUrl: string | null;
  customCss: string | null;
  showPoweredBy: boolean;
}

const CACHE_KEY = 'mizan_tenant_branding';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Convert hex color to HSL string for Tailwind CSS variables
 */
function hexToHSL(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return `0 0% ${Math.round(l * 100)}%`;

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
    case g: h = ((b - r) / d + 2) / 6; break;
    case b: h = ((r - g) / d + 4) / 6; break;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Apply branding CSS variables to the document root
 */
export function applyBranding(branding: TenantBranding): void {
  const root = document.documentElement;

  root.style.setProperty('--brand-primary', hexToHSL(branding.primaryColor));
  root.style.setProperty('--brand-secondary', hexToHSL(branding.secondaryColor));
  root.style.setProperty('--brand-accent', hexToHSL(branding.accentColor));
  root.style.setProperty('--brand-background', hexToHSL(branding.backgroundColor));
  root.style.setProperty('--brand-surface', hexToHSL(branding.surfaceColor));
  root.style.setProperty('--brand-text-primary', hexToHSL(branding.textPrimaryColor));
  root.style.setProperty('--brand-text-secondary', hexToHSL(branding.textSecondaryColor));
  root.style.setProperty('--brand-font-sans', `'${branding.fontFamilySans}', system-ui, sans-serif`);
  root.style.setProperty('--brand-font-display', `'${branding.fontFamilyDisplay}', Georgia, serif`);

  // Update favicon
  if (branding.faviconUrl) {
    const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = branding.faviconUrl;
    document.head.appendChild(link);
  }

  // Update document title
  if (branding.companyName) {
    const baseTitle = document.title.replace(/^.* \| /, '');
    document.title = `${branding.companyName} | ${baseTitle}`;
  }

  // Inject custom CSS if provided
  if (branding.customCss) {
    let styleEl = document.getElementById('tenant-custom-css');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'tenant-custom-css';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = branding.customCss;
  }
}

/**
 * Load branding from cache or API
 */
export async function loadBranding(): Promise<TenantBranding | null> {
  // Try cache first for instant rendering
  const cached = getCachedBranding();
  if (cached) {
    applyBranding(cached);
    // Refresh in background
    fetchAndCacheBranding().catch(() => {});
    return cached;
  }

  // Fetch from API
  return fetchAndCacheBranding();
}

/**
 * Fetch branding from API and update cache
 */
async function fetchAndCacheBranding(): Promise<TenantBranding | null> {
  try {
    const response = await apiClient.get('/api/branding');
    const branding = response.data as TenantBranding;

    // Cache in localStorage
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: branding,
      timestamp: Date.now(),
    }));

    applyBranding(branding);
    return branding;
  } catch {
    return null;
  }
}

/**
 * Get cached branding if still valid
 */
function getCachedBranding(): TenantBranding | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed.data as TenantBranding;
  } catch {
    return null;
  }
}

/**
 * Clear cached branding (call after admin updates branding)
 */
export function clearBrandingCache(): void {
  localStorage.removeItem(CACHE_KEY);
}
