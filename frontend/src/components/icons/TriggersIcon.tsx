import React from 'react';

interface TriggersIconProps {
  className?: string;
  color?: string;
}

export const TriggersIcon: React.FC<TriggersIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L28 16L36 18L28 20L24 28L20 20L12 18L20 16L24 8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="12" cy="36" r="3" stroke={color} strokeWidth="1.5"/>
    <circle cx="36" cy="36" r="3" stroke={color} strokeWidth="1.5"/>
    <path d="M24 28L24 32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 34L12 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M30 34L36 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
