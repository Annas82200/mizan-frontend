import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const SecureIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L8 16V24C8 32 16 40 24 40C32 40 40 32 40 24V16L24 8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="4" fill={color}/>
    <path d="M24 28V32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
