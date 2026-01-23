import React from 'react';

interface TalentIconProps {
  className?: string;
  color?: string;
}

export const TalentIcon: React.FC<TalentIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Star with person silhouette - representing talent/high performers */}
    <path d="M24 8L27.5 16.5L36 17.5L30 24L31.5 32L24 28L16.5 32L18 24L12 17.5L20.5 16.5L24 8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="24" cy="36" r="4" stroke={color} strokeWidth="1.5"/>
    <path d="M18 44C18 40.5 20.5 38 24 38C27.5 38 30 40.5 30 44" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
