import React from 'react';

interface PerformanceIconProps {
  className?: string;
  color?: string;
}

export const PerformanceIcon: React.FC<PerformanceIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 32L16 24L24 28L32 20L40 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="16" cy="24" r="2" fill={color}/>
    <circle cx="24" cy="28" r="2" fill={color}/>
    <circle cx="32" cy="20" r="2" fill={color}/>
  </svg>
);
