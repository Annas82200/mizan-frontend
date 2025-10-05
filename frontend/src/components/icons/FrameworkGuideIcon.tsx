import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const FrameworkGuideIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="32" height="3" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <rect x="8" y="16" width="32" height="3" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <rect x="8" y="22" width="32" height="3" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <rect x="8" y="28" width="32" height="3" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <rect x="8" y="34" width="32" height="3" rx="1.5" stroke={color} strokeWidth="1.5"/>
  </svg>
);
