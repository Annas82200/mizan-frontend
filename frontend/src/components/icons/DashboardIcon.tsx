import React from 'react';

interface DashboardIconProps {
  className?: string;
  color?: string;
}

export const DashboardIcon: React.FC<DashboardIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    <rect x="26" y="8" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    <rect x="8" y="26" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    <rect x="26" y="26" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    <circle cx="15" cy="15" r="2" fill={color}/>
    <circle cx="33" cy="33" r="2" fill={color}/>
  </svg>
);
