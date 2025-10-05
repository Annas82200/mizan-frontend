import React from 'react';

interface FrameworkIconProps {
  className?: string;
  color?: string;
}

// 7 horizontal cylinders stacked vertically
export const FrameworkIcon: React.FC<FrameworkIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 7 horizontal cylinders */}
    <rect x="10" y="8" width="28" height="3" rx="1.5" stroke={color} strokeWidth="1"/>
    <rect x="10" y="13" width="28" height="3" rx="1.5" stroke={color} strokeWidth="1"/>
    <rect x="10" y="18" width="28" height="3" rx="1.5" stroke={color} strokeWidth="1"/>
    <rect x="10" y="23" width="28" height="3" rx="1.5" stroke={color} strokeWidth="1"/>
    <rect x="10" y="28" width="28" height="3" rx="1.5" stroke={color} strokeWidth="1"/>
    <rect x="10" y="33" width="28" height="3" rx="1.5" stroke={color} strokeWidth="1"/>
    <rect x="10" y="38" width="28" height="3" rx="1.5" stroke={color} strokeWidth="1"/>
    {/* Accent dots */}
    <circle cx="14" cy="9.5" r="0.8" fill={color}/>
    <circle cx="34" cy="24.5" r="0.8" fill={color}/>
    <circle cx="14" cy="39.5" r="0.8" fill={color}/>
  </svg>
);
