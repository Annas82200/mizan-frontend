import React from "react";

interface CylinderRadarEnhancedProps {
  data: Array<{
    cylinder: string;
    current: number;
    target: number;
    benchmark: number;
  }>;
  className?: string;
}

export default function CylinderRadarEnhanced({ data, className = "" }: CylinderRadarEnhancedProps) {
  return (
    <div className={`w-full h-64 flex items-center justify-center bg-gray-50 rounded-lg ${className}`}>
      <div className="text-center">
        <div className="text-gray-400 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm text-gray-600">Cylinder Radar Chart</p>
        <p className="text-xs text-gray-400 mt-1">Enhanced visualization coming soon</p>
      </div>
    </div>
  );
}
