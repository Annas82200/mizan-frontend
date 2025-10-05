import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const CultureIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="1.5"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke={color} strokeWidth="1.5"/>
    <line x1="6" y1="24" x2="42" y2="24" stroke={color} strokeWidth="1.5"/>
  </svg>
);
