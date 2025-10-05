import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const SkillsIcon: React.FC<IconProps> = ({
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
      d="M8 40L24 8L40 40H8Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 32L24 16L32 32"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="20"
      y1="26"
      x2="28"
      y2="26"
      stroke={color}
      strokeWidth="1.5"
    />
  </svg>
);
