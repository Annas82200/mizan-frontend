import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = '#3F3D56',
  loading = false
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 transition-all hover:shadow-lg">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 w-8 bg-gray-200 rounded-lg mb-4" />
          <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
          <div className="h-8 w-32 bg-gray-200 rounded" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{icon}</span>
            {trend && trendValue && (
              <span
                className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
                  trend === 'up'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{trendValue}</span>
              </span>
            )}
          </div>
          <p className="text-sm mb-1 text-mizan-secondary">{title}</p>
          <p className="text-3xl font-bold" style={{ color }}>{value}</p>
        </>
      )}
    </div>
  );
};
