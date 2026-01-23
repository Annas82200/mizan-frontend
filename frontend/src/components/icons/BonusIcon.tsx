import React from 'react';

interface BonusIconProps {
  className?: string;
  color?: string;
}

export const BonusIcon: React.FC<BonusIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Dollar sign with upward arrow - representing bonus/compensation */}
    <circle cx="24" cy="24" r="16" stroke={color} strokeWidth="1.5"/>
    <path d="M24 14V34" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 18C20 16.5 21.5 15 24 15C26.5 15 28 16.5 28 18C28 19.5 26.5 20.5 24 20.5C21.5 20.5 20 21.5 20 23C20 24.5 21.5 26 24 26C26.5 26 28 24.5 28 23" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M32 28L36 32L40 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 32V24" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
