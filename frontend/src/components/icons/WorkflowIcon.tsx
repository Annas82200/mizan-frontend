import React from 'react';

interface WorkflowIconProps {
  className?: string;
  color?: string;
}

export const WorkflowIcon: React.FC<WorkflowIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="24" r="4" stroke={color} strokeWidth="1.5"/>
    <circle cx="36" cy="12" r="4" stroke={color} strokeWidth="1.5"/>
    <circle cx="36" cy="36" r="4" stroke={color} strokeWidth="1.5"/>
    <path d="M16 24H24M24 24V12M24 24V36M24 12H32M24 36H32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="2" fill={color}/>
  </svg>
);
