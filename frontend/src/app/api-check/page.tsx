'use client';

export default function ApiCheckPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-4">API Configuration Check</h1>
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-lg mb-2">
          <strong>NEXT_PUBLIC_API_URL:</strong>
        </p>
        <p className="font-mono bg-white p-3 rounded border">
          {apiUrl}
        </p>
        <p className="mt-4 text-sm text-gray-600">
          This should be: <strong>https://mizan-backend-production.up.railway.app</strong>
        </p>
        {apiUrl === 'http://localhost:3001' && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>⚠️ Error:</strong> Environment variable not set in Vercel!
            <br />
            Go to Vercel → Settings → Environment Variables and add:
            <br />
            <code className="bg-white px-2 py-1 rounded mt-2 inline-block">
              NEXT_PUBLIC_API_URL=https://mizan-backend-production.up.railway.app
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
