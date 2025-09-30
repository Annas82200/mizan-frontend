import React from "react";

interface ValueComparisonProps {
  data: Array<{
    value: string;
    personal: number;
    company: number;
    desired: number;
  }>;
  className?: string;
}

export default function ValueComparison({ data, className = "" }: ValueComparisonProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-4">
        {data.slice(0, 5).map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.value}</span>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Personal: {item.personal}%</span>
                <span>Company: {item.company}%</span>
                <span>Desired: {item.desired}%</span>
              </div>
            </div>
            
            <div className="space-y-1">
              {/* Personal bar */}
              <div className="flex items-center gap-2">
                <div className="w-16 text-xs text-gray-500">Personal</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.personal}%` }}
                  />
                </div>
              </div>
              
              {/* Company bar */}
              <div className="flex items-center gap-2">
                <div className="w-16 text-xs text-gray-500">Company</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.company}%` }}
                  />
                </div>
              </div>
              
              {/* Desired bar */}
              <div className="flex items-center gap-2">
                <div className="w-16 text-xs text-gray-500">Desired</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.desired}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
