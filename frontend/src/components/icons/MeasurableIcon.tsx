import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const MeasurableIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="36" height="36" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M6 14H42" stroke={color} strokeWidth="1.5"/>
    <path d="M14 6V42" stroke={color} strokeWidth="1.5"/>
    <path d="M18 38L24 24L30 32L36 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="38" r="2" fill={color}/>
    <circle cx="24" cy="24" r="2" fill={color}/>
    <circle cx="30" cy="32" r="2" fill={color}/>
    <circle cx="36" cy="20" r="2" fill={color}/>
  </svg>
);
