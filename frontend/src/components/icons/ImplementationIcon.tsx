import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const ImplementationIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 24L18 34L40 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="18" cy="34" r="2" fill={color}/>
    <circle cx="40" cy="12" r="2" fill={color}/>
  </svg>
);
