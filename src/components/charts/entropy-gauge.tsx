import React from "react";

interface EntropyGaugeProps {
  value: number;
  max?: number;
  className?: string;
}

export default function EntropyGauge({ value, max = 100, className = "" }: EntropyGaugeProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const rotation = (percentage / 100) * 180 - 90;
  
  return (
    <div className={`w-full h-32 flex items-center justify-center ${className}`}>
      <div className="relative w-32 h-16">
        {/* Gauge background */}
        <svg className="w-full h-full" viewBox="0 0 100 50">
          <path
            d="M 10 40 A 30 30 0 0 1 90 40"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 10 40 A 30 30 0 0 1 90 40"
            stroke={percentage > 70 ? "#ef4444" : percentage > 40 ? "#f59e0b" : "#10b981"}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 1.57} 157`}
          />
        </svg>
        
        {/* Value display */}
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{value}%</div>
            <div className="text-xs text-gray-500">Entropy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
