import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const InsightsIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 32L18 26L24 32L36 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="32" r="2" fill={color}/>
    <circle cx="18" cy="26" r="2" fill={color}/>
    <circle cx="24" cy="32" r="2" fill={color}/>
    <circle cx="36" cy="20" r="2" fill={color}/>
  </svg>
);
