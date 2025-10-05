import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const LeadershipIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="16" r="6" stroke={color} strokeWidth="1.5"/>
    <path d="M12 36C12 30 16 26 24 26C32 26 36 30 36 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 20L24 32M20 28H28" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
