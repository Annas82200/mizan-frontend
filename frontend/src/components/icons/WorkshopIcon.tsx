import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const WorkshopIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="8" y="12" width="32" height="24" rx="2" stroke={color} strokeWidth="1.5"/>
    <path
      d="M16 12V8M32 12V8M8 20H40"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="16" cy="28" r="2" fill={color}/>
    <circle cx="24" cy="28" r="2" fill={color}/>
    <circle cx="32" cy="28" r="2" fill={color}/>
  </svg>
);
