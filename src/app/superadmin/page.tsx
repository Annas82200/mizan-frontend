"use client";

import React from 'react';
import { useRouter } from 'next/navigation';


export default function SuperAdminPage() {
  const router = useRouter();

  // Redirect to dashboard by default
  React.useEffect(() => {
    router.push('/superadmin/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mizan-teal mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
