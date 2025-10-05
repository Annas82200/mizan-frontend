import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const MultiAgentIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="12" r="6" stroke={color} strokeWidth="1.5"/>
    <circle cx="12" cy="28" r="5" stroke={color} strokeWidth="1.5"/>
    <circle cx="36" cy="28" r="5" stroke={color} strokeWidth="1.5"/>
    <circle cx="24" cy="38" r="4" stroke={color} strokeWidth="1.5"/>
    <path d="M24 18V34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 16L14 26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M28 16L34 26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 32L21 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M33 32L27 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
