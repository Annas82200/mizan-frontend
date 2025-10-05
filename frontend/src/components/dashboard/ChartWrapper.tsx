import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
  actions?: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  children,
  loading = false,
  error,
  actions
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-mizan-primary">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-mizan-secondary mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-16">
          <LoadingSpinner size="lg" text="Loading chart data..." />
        </div>
      ) : error ? (
        <div className="py-16 text-center">
          <p className="text-red-500 mb-2">⚠️ Error loading chart</p>
          <p className="text-sm text-mizan-secondary">{error}</p>
        </div>
      ) : (
        <div className="w-full">
          {children}
        </div>
      )}
    </div>
  );
};
