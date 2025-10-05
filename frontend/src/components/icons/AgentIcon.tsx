import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const AgentIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="1.5"/>
    <path
      d="M24 8V24L32 32"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="24" r="3" fill={color}/>
  </svg>
);
