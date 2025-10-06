'use client';

import { DashboardLayout } from '@/components/dashboard';

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role="superadmin">
      {children}
    </DashboardLayout>
  );
}
