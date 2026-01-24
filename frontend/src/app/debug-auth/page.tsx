'use client';

import { useEffect, useState } from 'react';

interface DebugInfo {
  timestamp: string;
  localStorage: {
    mizan_user: string | null;
    mizan_auth_token: string | null;
    parsedUser: Record<string, unknown> | null;
    parseError: string | null;
  };
  userAnalysis: {
    hasUser: boolean;
    hasToken: boolean;
    hasRole: boolean;
    role: string | null;
    hasId: boolean;
    userId: string | null;
  };
  backendCheck: {
    status: number | null;
    ok: boolean;
    response: Record<string, unknown> | null;
    error: string | null;
  };
  environment: {
    apiUrl: string;
    pathname: string;
  };
}

export default function DebugAuthPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDiagnostics = async () => {
      const info: DebugInfo = {
        timestamp: new Date().toISOString(),
        localStorage: {
          mizan_user: null,
          mizan_auth_token: null,
          parsedUser: null,
          parseError: null,
        },
        userAnalysis: {
          hasUser: false,
          hasToken: false,
          hasRole: false,
          role: null,
          hasId: false,
          userId: null,
        },
        backendCheck: {
          status: null,
          ok: false,
          response: null,
          error: null,
        },
        environment: {
          apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://mizan-backend-production.up.railway.app',
          pathname: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        },
      };

      // Step 1: Check localStorage
      try {
        info.localStorage.mizan_user = localStorage.getItem('mizan_user');
        info.localStorage.mizan_auth_token = localStorage.getItem('mizan_auth_token');
        info.userAnalysis.hasUser = !!info.localStorage.mizan_user;
        info.userAnalysis.hasToken = !!info.localStorage.mizan_auth_token;

        if (info.localStorage.mizan_user) {
          try {
            const parsed = JSON.parse(info.localStorage.mizan_user);
            info.localStorage.parsedUser = parsed;
            info.userAnalysis.hasRole = !!parsed.role;
            info.userAnalysis.role = parsed.role || null;
            info.userAnalysis.hasId = !!parsed.id;
            info.userAnalysis.userId = parsed.id || null;
          } catch (e) {
            info.localStorage.parseError = e instanceof Error ? e.message : 'Parse failed';
          }
        }
      } catch (e) {
        info.localStorage.parseError = e instanceof Error ? e.message : 'localStorage access failed';
      }

      // Step 2: Check backend
      try {
        const token = info.localStorage.mizan_auth_token;
        const response = await fetch(`${info.environment.apiUrl}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        info.backendCheck.status = response.status;
        info.backendCheck.ok = response.ok;

        try {
          const data = await response.json();
          info.backendCheck.response = data;
        } catch {
          info.backendCheck.response = { text: await response.text() };
        }
      } catch (e) {
        info.backendCheck.error = e instanceof Error ? e.message : 'Network error';
      }

      setDebugInfo(info);
      setLoading(false);
    };

    runDiagnostics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Auth Debug - Running diagnostics...</h1>
      </div>
    );
  }

  const getStatusColor = (condition: boolean) => condition ? 'text-green-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">🔍 Auth Debug Page</h1>

      <div className="space-y-8">
        {/* Summary */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className={getStatusColor(debugInfo?.userAnalysis.hasUser || false)}>
              {debugInfo?.userAnalysis.hasUser ? '✅' : '❌'} User in localStorage
            </div>
            <div className={getStatusColor(debugInfo?.userAnalysis.hasToken || false)}>
              {debugInfo?.userAnalysis.hasToken ? '✅' : '❌'} Token in localStorage
            </div>
            <div className={getStatusColor(debugInfo?.userAnalysis.hasRole || false)}>
              {debugInfo?.userAnalysis.hasRole ? '✅' : '❌'} Has role: {debugInfo?.userAnalysis.role || 'NONE'}
            </div>
            <div className={getStatusColor(debugInfo?.backendCheck.ok || false)}>
              {debugInfo?.backendCheck.ok ? '✅' : '❌'} Backend /api/auth/me: {debugInfo?.backendCheck.status}
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="bg-yellow-900/50 p-6 rounded-lg border border-yellow-500">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">🔎 Diagnosis</h2>
          {!debugInfo?.userAnalysis.hasUser && (
            <p className="text-red-400 mb-2">
              ❌ PROBLEM: No user data in localStorage. The login did not store user data.
            </p>
          )}
          {debugInfo?.userAnalysis.hasUser && !debugInfo?.userAnalysis.hasRole && (
            <p className="text-red-400 mb-2">
              ❌ PROBLEM: User data exists but has NO ROLE. The backend login response is missing the role field.
            </p>
          )}
          {debugInfo?.userAnalysis.hasUser && debugInfo?.userAnalysis.hasRole && (
            <p className="text-green-400 mb-2">
              ✅ User data looks correct with role: {debugInfo.userAnalysis.role}
            </p>
          )}
          {debugInfo?.localStorage.parseError && (
            <p className="text-red-400 mb-2">
              ❌ PROBLEM: Could not parse user data: {debugInfo.localStorage.parseError}
            </p>
          )}
          {!debugInfo?.backendCheck.ok && debugInfo?.backendCheck.status && (
            <p className="text-yellow-400 mb-2">
              ⚠️ Backend returned status {debugInfo.backendCheck.status}. This is normal if using localStorage-only auth.
            </p>
          )}
          {debugInfo?.backendCheck.error && (
            <p className="text-yellow-400 mb-2">
              ⚠️ Backend check failed: {debugInfo.backendCheck.error}
            </p>
          )}
        </div>

        {/* Raw localStorage */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">localStorage Raw Values</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-400 mb-1">mizan_user:</h3>
              <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm max-h-64">
                {debugInfo?.localStorage.mizan_user || 'NULL'}
              </pre>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-1">mizan_auth_token:</h3>
              <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm">
                {debugInfo?.localStorage.mizan_auth_token
                  ? `${debugInfo.localStorage.mizan_auth_token.substring(0, 50)}...`
                  : 'NULL'}
              </pre>
            </div>
          </div>
        </div>

        {/* Parsed User */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Parsed User Object</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm max-h-64">
            {debugInfo?.localStorage.parsedUser
              ? JSON.stringify(debugInfo.localStorage.parsedUser, null, 2)
              : debugInfo?.localStorage.parseError || 'No user data'}
          </pre>
        </div>

        {/* Backend Response */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Backend /api/auth/me Response</h2>
          <div className="mb-2">
            Status: <span className={getStatusColor(debugInfo?.backendCheck.ok || false)}>
              {debugInfo?.backendCheck.status || 'N/A'}
            </span>
          </div>
          <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm max-h-64">
            {debugInfo?.backendCheck.response
              ? JSON.stringify(debugInfo.backendCheck.response, null, 2)
              : debugInfo?.backendCheck.error || 'No response'}
          </pre>
        </div>

        {/* Environment */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Environment</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(debugInfo?.environment, null, 2)}
          </pre>
        </div>

        {/* Full Debug Object */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Full Debug Object</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm max-h-96">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
