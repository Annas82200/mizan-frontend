import React, { ReactNode } from "react";

export function DashboardCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-mizanDark/10 p-6 flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-semibold text-mizanDark">{title}</h2>
        {description ? <p className="text-sm text-mizanDark/70">{description}</p> : null}
      </div>
      <div className="text-sm text-mizanDark/80">{children}</div>
    </section>
  );
}
