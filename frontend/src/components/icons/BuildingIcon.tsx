import React from 'react';

interface BuildingIconProps {
  className?: string;
  color?: string;
}

export const BuildingIcon: React.FC<BuildingIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="8" width="28" height="32" rx="2" stroke={color} strokeWidth="1.5"/>
    <rect x="16" y="14" width="4" height="4" stroke={color} strokeWidth="1"/>
    <rect x="28" y="14" width="4" height="4" stroke={color} strokeWidth="1"/>
    <rect x="16" y="22" width="4" height="4" stroke={color} strokeWidth="1"/>
    <rect x="28" y="22" width="4" height="4" stroke={color} strokeWidth="1"/>
    <rect x="16" y="30" width="4" height="4" stroke={color} strokeWidth="1"/>
    <rect x="28" y="30" width="4" height="4" stroke={color} strokeWidth="1"/>
  </svg>
);
