import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const RolloutIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 24H18M18 24L14 20M18 24L14 28"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 24H32M32 24L28 20M32 24L28 28"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36 24H40M40 24L38 22M40 24L38 26"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="24" r="3" stroke={color} strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="3" stroke={color} strokeWidth="1.5"/>
    <circle cx="40" cy="24" r="3" stroke={color} strokeWidth="1.5"/>
  </svg>
);
