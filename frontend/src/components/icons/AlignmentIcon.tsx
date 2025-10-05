import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const AlignmentIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="8" y1="12" x2="40" y2="12" stroke={color} strokeWidth="1.5"/>
    <line x1="8" y1="24" x2="40" y2="24" stroke={color} strokeWidth="1.5"/>
    <line x1="8" y1="36" x2="40" y2="36" stroke={color} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
    <circle cx="24" cy="24" r="2" fill={color}/>
    <circle cx="36" cy="36" r="2" fill={color}/>
  </svg>
);
