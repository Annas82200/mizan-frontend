"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DashboardCard } from "../../components/dashboard-card";
import { LoadingState } from "../../components/loading-state";
import { Pill } from "../../components/pill";

type TenantSummary = { id: string; name: string; plan: string; status: string };

type AdminOverview = {
  tenant: {
    id: string;
    name: string;
    plan: string;
    status: string;
    valuesFramework: Array<{
      cylinder: number;
      name: string;
      definition: string;
      ethicalPrinciple: string;
      enablingValues: Array<{ name: string; definition: string }>;
      limitingValues: Array<{ name: string; definition: string }>;
    }>;
  };
  latestSnapshot: { overallHealthScore: number; createdAt: string; highlights: string[] } | null;
  snapshots: Array<{ id: string; createdAt: string; overallHealthScore: number; trend: string }>;
  assessments: Array<{ id: string; type: string; score: number; summary: string; createdAt: string; triadConfidence: number }>;
  triggers: Array<{ module: string; reason: string; priority: string; actions: Array<{ id: string; title: string; description: string; effort: string }> }>;
  admins: Array<{ id: string; name: string; email: string }>;
  employees: Array<{ id: string; name: string; email: string }>;
};

type ArchitectRun = {
  architect: any;
  snapshot: any;
  triggers: AdminOverview["triggers"];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export default function AdminDashboard() {
  const [tenantList, setTenantList] = useState<TenantSummary[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState<ArchitectRun | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTenants() {
      try {
        const data = await fetch(`${API_BASE}/api/admin/tenants`).then((res) => res.json());
        setTenantList(data.tenants);
        setSelectedTenant(data.tenants[0]?.id ?? null);
      } catch (err) {
        console.error(err);
        setError("Unable to load client tenants");
      }
    }
    loadTenants();
  }, []);

  useEffect(() => {
    if (!selectedTenant) return;
    let cancelled = false;
    async function loadOverview() {
      setLoading(true);
      try {
        const data = await fetch(`${API_BASE}/api/admin/${selectedTenant}/overview`).then((res) => res.json());
        if (!cancelled) {
          setOverview(data);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadOverview();
    return () => {
      cancelled = true;
    };
  }, [selectedTenant]);

  async function runAnalyses() {
    if (!selectedTenant) return;
    setRunning(true);
    try {
      const payload = {
        orgText: "CEO\n  COO\n    Head of Science\n      Lab Lead\n  CPO\n    Design Director",
        companyValues: ["Purpose", "Evolution", "Belonging"],
        employeeValues: ["Belonging", "Mastery", "Autonomy"],
        targetSkills: ["communication", "bioinformatics", "systems thinking"],
        engagementSurvey: { belonging: 0.62, recognition: 0.48, growth: 0.71 },
      };
      const result = await fetch(`${API_BASE}/api/admin/${selectedTenant}/run-analyses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then((res) => res.json());
      setLastRun(result);
      const refreshed = await fetch(`${API_BASE}/api/admin/${selectedTenant}/overview`).then((res) => res.json());
      setOverview(refreshed);
    } finally {
      setRunning(false);
    }
  }

  const latestScore = useMemo(() => {
    if (!overview?.latestSnapshot) return null;
    return Math.round(overview.latestSnapshot.overallHealthScore * 100);
  }, [overview]);

  if (error) {
    return (
      <main className="min-h-screen bg-mizanLight">
        <div className="max-w-6xl mx-auto py-10 px-6">
          <p className="text-mizanDark">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mizanLight">
      <div className="max-w-6xl mx-auto py-10 px-6 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-mizanDark">Client Admin Control</h1>
            <p className="text-sm text-mizanDark/70">Run analyses, steward the 7-cylinder values map and launch interventions.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tenantList.map((tenant) => (
              <button
                key={tenant.id}
                onClick={() => setSelectedTenant(tenant.id)}
                className={`px-3 py-2 rounded-lg border text-sm transition ${
                  selectedTenant === tenant.id ? "border-mizanTeal bg-mizanTeal/10" : "border-mizanDark/10 hover:border-mizanTeal/40"
                }`}
              >
                <div className="font-medium text-mizanDark">{tenant.name}</div>
                <div className="text-xs text-mizanDark/60">{tenant.plan} · {tenant.status}</div>
              </button>
            ))}
          </div>
        </header>

        {loading || !overview ? (
          <LoadingState label="Loading dashboard" />
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-mizanTeal">{latestScore ?? "--"}%</div>
                <div className="text-sm text-mizanDark/70">
                  <div>Overall health</div>
                  <div>Last run {overview.latestSnapshot ? new Date(overview.latestSnapshot.createdAt).toLocaleDateString() : "n/a"}</div>
                </div>
              </div>
              <button
                onClick={runAnalyses}
                disabled={running}
                className="px-4 py-2 rounded-lg bg-mizanTeal text-white hover:bg-mizanTeal/90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {running ? "Running Architect AI..." : "Run full analysis"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DashboardCard title="Recent Highlights" description="Signals surfaced by Architect AI and tri-engine synthesis.">
                {overview.latestSnapshot ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {overview.latestSnapshot.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-mizanDark/60">No snapshot available yet.</p>
                )}
              </DashboardCard>

              <DashboardCard
                title="7-Cylinder Values Map"
                description="Definitions, principles and polarity values stewarded by this tenant."
              >
                <ul className="space-y-3">
                  {overview.tenant.valuesFramework.map((cylinder) => (
                    <li key={cylinder.cylinder} className="border border-mizanDark/10 rounded-lg p-3 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-sm">
                        <span className="font-semibold text-mizanDark">
                          Cylinder {cylinder.cylinder} · {cylinder.name}
                        </span>
                        <span className="text-xs text-mizanDark/60">Ethic: {cylinder.ethicalPrinciple}</span>
                      </div>
                      <p className="text-sm text-mizanDark/70">{cylinder.definition}</p>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-mizanTeal/80">Enabling Values</h4>
                          <ul className="mt-1 space-y-1 text-xs text-mizanDark/70">
                            {cylinder.enablingValues.map((value) => (
                              <li key={value.name}>
                                <span className="font-medium text-mizanDark">{value.name}:</span> {value.definition}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-mizanDark/60">Limiting Values</h4>
                          <ul className="mt-1 space-y-1 text-xs text-mizanDark/60">
                            {cylinder.limitingValues.map((value) => (
                              <li key={value.name}>
                                <span className="font-medium text-mizanDark">{value.name}:</span> {value.definition}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </DashboardCard>

              <DashboardCard title="Intervention Queue" description="Triggered action modules mapped from the tri-engine.">
                {overview.triggers.length === 0 ? (
                  <p className="text-sm text-mizanDark/60">No active triggers.</p>
                ) : (
                  <ul className="space-y-2">
                    {overview.triggers.map((trigger, idx) => (
                      <li key={idx} className="border border-mizanDark/10 rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-mizanDark">{trigger.reason}</span>
                          <Pill tone={trigger.priority === "high" ? "teal" : "slate"}>{trigger.priority}</Pill>
                        </div>
                        <ul className="mt-2 space-y-1">
                          {trigger.actions.map((action) => (
                            <li key={action.id} className="text-xs text-mizanDark/70">
                              {action.title} · {action.effort} effort
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </DashboardCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DashboardCard title="Assessment History" description="Latest scores per module with tri-engine confidence.">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-mizanDark/60">
                        <th className="py-1 pr-4">Type</th>
                        <th className="py-1 pr-4">Score</th>
                        <th className="py-1 pr-4">Confidence</th>
                        <th className="py-1 pr-4">Summary</th>
                      </tr>
                    </thead>
                    <tbody className="text-mizanDark/80">
                      {overview.assessments.slice(0, 6).map((assessment) => (
                        <tr key={assessment.id} className="border-t border-mizanDark/10">
                          <td className="py-1 pr-4 capitalize">{assessment.type}</td>
                          <td className="py-1 pr-4">{Math.round(assessment.score * 100)}%</td>
                          <td className="py-1 pr-4">{Math.round(assessment.triadConfidence * 100)}%</td>
                          <td className="py-1 pr-4 w-60">{assessment.summary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DashboardCard>

              <DashboardCard title="Latest Architect Run" description="Knowledge/Data/Reasoning outputs from the most recent execution.">
                {lastRun ? (
                  <div className="space-y-3 text-sm text-mizanDark/70">
                    <div>
                      <h3 className="font-semibold text-mizanDark">Structure Synthesis</h3>
                      <p>{lastRun.architect.structure.triad.synthesis}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-mizanDark">Culture Synthesis</h3>
                      <p>{lastRun.architect.culture.triad.synthesis}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-mizanDark">Skills Synthesis</h3>
                      <p>{lastRun.architect.skills.triad.synthesis}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-mizanDark/60">Run Architect AI to capture synthesis notes.</p>
                )}
              </DashboardCard>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
