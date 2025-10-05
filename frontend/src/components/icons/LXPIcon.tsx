import React from 'react';

interface LXPIconProps {
  className?: string;
  color?: string;
}

export const LXPIcon: React.FC<LXPIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Book/Learning with play button */}
    <path d="M12 10H36V38H12V10Z" stroke={color} strokeWidth="1.5"/>
    <path d="M24 10V38" stroke={color} strokeWidth="1.5"/>
    <path d="M12 14H36M12 34H36" stroke={color} strokeWidth="1"/>
    <path d="M20 24L28 20V28L20 24Z" fill={color}/>
  </svg>
);
