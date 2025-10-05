import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const EntropyIcon: React.FC<IconProps> = ({
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
      d="M8 24H18M30 24H40M24 8V18M24 30V40"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="1.5"/>
    <path
      d="M14 14L18 18M30 18L34 14M34 34L30 30M18 30L14 34"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
