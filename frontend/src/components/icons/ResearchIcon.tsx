import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const ResearchIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="1.5"/>
    <path d="M29 29L38 38" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 14V20M20 20H26M20 20L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
