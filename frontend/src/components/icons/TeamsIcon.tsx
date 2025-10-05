import React from 'react';

interface TeamsIconProps {
  className?: string;
  color?: string;
}

export const TeamsIcon: React.FC<TeamsIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="16" r="6" stroke={color} strokeWidth="1.5"/>
    <path d="M12 36C12 30.4772 16.4772 26 22 26H26C31.5228 26 36 30.4772 36 36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="18" r="4" stroke={color} strokeWidth="1.5"/>
    <circle cx="36" cy="18" r="4" stroke={color} strokeWidth="1.5"/>
    <path d="M6 36C6 32.6863 8.68629 30 12 30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M42 36C42 32.6863 39.3137 30 36 30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
