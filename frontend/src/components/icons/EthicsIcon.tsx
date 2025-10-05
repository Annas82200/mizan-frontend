import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

export const EthicsIcon: React.FC<IconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L8 14V22C8 32 15 40 24 44C33 40 40 32 40 22V14L24 4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 14L16 20V26C16 31 19 35 24 37C29 35 32 31 32 26V20L24 14Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="26" r="3" fill={color}/>
  </svg>
);
