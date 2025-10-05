import React from 'react';

interface SettingsIconProps {
  className?: string;
  color?: string;
}

export const SettingsIcon: React.FC<SettingsIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="1.5"/>
    <path d="M24 8V12M24 36V40M40 24H36M12 24H8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M35.314 12.686L32.485 15.515M15.515 32.485L12.686 35.314M35.314 35.314L32.485 32.485M15.515 15.515L12.686 12.686" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
