import React from 'react';

interface SocialMediaIconProps {
  className?: string;
  color?: string;
}

export const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({
  className = "",
  color = "#3F3D56"
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Speech bubble / message icon representing social media */}
    <path
      d="M12 14C12 12.8954 12.8954 12 14 12H34C35.1046 12 36 12.8954 36 14V28C36 29.1046 35.1046 30 34 30H20L12 36V14Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Connection nodes representing network/sharing */}
    <circle cx="20" cy="21" r="1.5" fill={color}/>
    <circle cx="24" cy="21" r="1.5" fill={color}/>
    <circle cx="28" cy="21" r="1.5" fill={color}/>
  </svg>
);
