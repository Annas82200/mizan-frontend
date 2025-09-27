import React from "react";

export function Pill({ children, tone = "teal" }: { children: React.ReactNode; tone?: "teal" | "gold" | "slate" }) {
  const palette: Record<string, string> = {
    teal: "bg-mizanTeal/10 text-mizanTeal border-mizanTeal/30",
    gold: "bg-mizanGold/10 text-mizanGold border-mizanGold/30",
    slate: "bg-mizanDark/5 text-mizanDark border-mizanDark/20",
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${palette[tone]}`}>{children}</span>;
}
