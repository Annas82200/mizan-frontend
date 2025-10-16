/**
 * Environment Variable Verification Utility
 * Checks if required environment variables are properly configured
 * Compliant with AGENT_CONTEXT_ULTIMATE.md
 */

export interface EnvCheckResult {
  isConfigured: boolean;
  apiUrl: string | null;
  issues: string[];
  warnings: string[];
}

/**
 * Verify environment variables are properly configured
 */
export function checkEnvironmentVariables(): EnvCheckResult {
  const result: EnvCheckResult = {
    isConfigured: true,
    apiUrl: null,
    issues: [],
    warnings: []
  };

  // Check NEXT_PUBLIC_API_URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    result.isConfigured = false;
    result.issues.push('NEXT_PUBLIC_API_URL is not configured');
    result.warnings.push('Using default localhost:3001 - this will fail in production');
  } else if (apiUrl === 'http://localhost:3001' && typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    result.isConfigured = false;
    result.issues.push('NEXT_PUBLIC_API_URL is set to localhost but running on production domain');
    result.warnings.push('Update NEXT_PUBLIC_API_URL in Vercel environment variables');
  } else {
    result.apiUrl = apiUrl;
  }

  return result;
}

/**
 * Test backend connectivity
 */
export async function testBackendConnectivity(apiUrl: string): Promise<{
  isOnline: boolean;
  responseTime: number | null;
  error: string | null;
}> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    const responseTime = Date.now() - startTime;

    if (response.ok) {
      return {
        isOnline: true,
        responseTime,
        error: null
      };
    } else {
      return {
        isOnline: false,
        responseTime,
        error: `Backend returned ${response.status} ${response.statusText}`
      };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      isOnline: false,
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Display environment configuration status in console
 * NOTE: Only call this manually from browser console for debugging
 * DO NOT call during component render - it will cause errors
 * 
 * Usage: import('/lib/env-check.js').then(m => m.displayEnvStatus())
 */
export function displayEnvStatus(): void {
  if (typeof window === 'undefined') return;

  const envCheck = checkEnvironmentVariables();
  
  console.group('🔍 Mizan Environment Configuration');
  
  if (envCheck.isConfigured) {
    console.log('✅ Configuration: OK');
    console.log('🌐 API URL:', envCheck.apiUrl);
  } else {
    console.error('❌ Configuration: FAILED');
    envCheck.issues.forEach(issue => console.error('  ❌', issue));
    envCheck.warnings.forEach(warning => console.warn('  ⚠️', warning));
  }
  
  console.log('📍 Current Location:', window.location.origin);
  // Note: In production build, NODE_ENV is replaced at build time
  // This is safe because it's a string literal replacement, not runtime access
  console.log('🔧 Environment:', typeof window !== 'undefined' ? 'browser' : 'server');
  
  console.groupEnd();

  // Test connectivity if API URL is configured
  if (envCheck.apiUrl) {
    testBackendConnectivity(envCheck.apiUrl).then(result => {
      console.group('🔌 Backend Connectivity Test');
      
      if (result.isOnline) {
        console.log('✅ Backend: ONLINE');
        console.log('⚡ Response Time:', `${result.responseTime}ms`);
      } else {
        console.error('❌ Backend: OFFLINE');
        console.error('❌ Error:', result.error);
        console.error('💡 Troubleshooting:');
        console.error('  1. Check if backend is deployed and running');
        console.error('  2. Verify NEXT_PUBLIC_API_URL in Vercel settings');
        console.error('  3. Check Railway backend logs for errors');
        console.error('  4. Verify CORS configuration allows your domain');
      }
      
      console.groupEnd();
    });
  }
}

/**
 * Get troubleshooting guide for configuration issues
 */
export function getTroubleshootingGuide(): string {
  return `
🔧 Mizan Platform - Troubleshooting Guide

❌ If you're seeing CORS or connection errors:

1. Verify Vercel Environment Variables:
   - Go to: https://vercel.com/dashboard
   - Select your project (mizan.work)
   - Settings → Environment Variables
   - Add: NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app
   - Redeploy after adding the variable

2. Verify Railway Backend:
   - Go to: https://railway.app/dashboard
   - Check if backend is deployed and running
   - Verify environment variables are set:
     - CLIENT_URL=https://www.mizan.work
     - FRONTEND_URL=https://www.mizan.work
     - JWT_SECRET (should be set)
     - SESSION_SECRET (should be set)

3. Clear Browser Cache:
   - Clear localStorage: localStorage.clear()
   - Clear cookies for mizan.work
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

4. Check Browser Console:
   - Look for specific error messages
   - Check Network tab for failed requests
   - Verify request headers include Authorization token

5. Test Backend Directly:
   - Visit: https://mizan-backend-production.up.railway.app/health
   - Should return: {"status":"healthy",...}

Need help? Check the RAILWAY_ENV_SETUP.md file for detailed setup instructions.
`;
}

