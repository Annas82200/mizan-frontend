import React from 'react';

interface HiringIconProps {
  className?: string;
  color?: string;
}

export const HiringIcon: React.FC<HiringIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Person with plus sign */}
    <circle cx="24" cy="16" r="6" stroke={color} strokeWidth="1.5"/>
    <path d="M14 36C14 30.4772 18.4772 26 24 26C29.5228 26 34 30.4772 34 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="36" cy="12" r="6" stroke={color} strokeWidth="1.5"/>
    <path d="M36 9V15M33 12H39" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
