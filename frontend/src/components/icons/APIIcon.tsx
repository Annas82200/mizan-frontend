import React from 'react';

interface APIIconProps {
  className?: string;
  color?: string;
}

export const APIIcon: React.FC<APIIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="32" height="24" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M16 20H32M16 28H24" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="28" cy="28" r="2" fill={color}/>
  </svg>
);
