import React from "react";

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-mizanDark/60">
      <span className="h-2 w-2 rounded-full bg-mizanTeal animate-pulse" aria-hidden />
      <span>{label}</span>
    </div>
  );
}
