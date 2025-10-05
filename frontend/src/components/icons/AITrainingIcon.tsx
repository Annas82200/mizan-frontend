import React from 'react';

interface AITrainingIconProps {
  className?: string;
  color?: string;
}

export const AITrainingIcon: React.FC<AITrainingIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Brain/AI representation */}
    <circle cx="24" cy="24" r="14" stroke={color} strokeWidth="1.5"/>
    <path d="M18 20C18 20 20 18 24 18C28 18 30 20 30 20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18 28C18 28 20 30 24 30C28 30 30 28 30 28" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="19" cy="24" r="2" stroke={color} strokeWidth="1"/>
    <circle cx="29" cy="24" r="2" stroke={color} strokeWidth="1"/>
    <path d="M24 18V14M24 34V38" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="24" cy="12" r="1.5" fill={color}/>
    <circle cx="24" cy="36" r="1.5" fill={color}/>
  </svg>
);
