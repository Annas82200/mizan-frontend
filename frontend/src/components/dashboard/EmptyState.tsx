import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4 opacity-50">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-mizan-primary">
        {title}
      </h3>
      <p className="text-mizan-secondary text-center mb-6 max-w-md">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-mizan-primary text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
