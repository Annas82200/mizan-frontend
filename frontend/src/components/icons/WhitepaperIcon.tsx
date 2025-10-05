import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const WhitepaperIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="6" width="28" height="36" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M16 14H32M16 20H32M16 26H32M16 32H26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
