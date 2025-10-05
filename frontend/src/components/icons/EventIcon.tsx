import React from 'react';

interface EventIconProps {
  className?: string;
  color?: string;
}

export const EventIcon: React.FC<EventIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L28 20H40L30 27L34 39L24 32L14 39L18 27L8 20H20L24 8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="3" fill={color}/>
  </svg>
);
