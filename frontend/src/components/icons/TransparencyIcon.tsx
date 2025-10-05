import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const TransparencyIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="1.5"/>
    <path d="M24 6V42" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M6 24H42" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 12L36 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M36 12L12 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
