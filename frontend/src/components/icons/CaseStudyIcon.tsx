import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const CaseStudyIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="8" width="28" height="32" rx="2" stroke={color} strokeWidth="1.5"/>
    <path d="M16 16H32M16 24H32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="20" cy="32" r="2" fill={color}/>
    <circle cx="28" cy="32" r="2" fill={color}/>
  </svg>
);
