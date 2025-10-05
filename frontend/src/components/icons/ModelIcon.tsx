import React from 'react';

interface ModelIconProps {
  className?: string;
  color?: string;
}

export const ModelIcon: React.FC<ModelIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="32" height="24" rx="3" stroke={color} strokeWidth="1.5"/>
    <path d="M16 20H32M16 24H28M16 28H24" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="36" cy="12" r="4" stroke={color} strokeWidth="1.5"/>
    <path d="M34 10L38 14M38 10L34 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
