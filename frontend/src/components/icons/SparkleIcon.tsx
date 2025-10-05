import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const SparkleIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
