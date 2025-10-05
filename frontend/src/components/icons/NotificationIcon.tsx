import React from 'react';

interface NotificationIconProps {
  className?: string;
  color?: string;
  hasNotifications?: boolean;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  className = "",
  color = "#3F3D56",
  hasNotifications = false
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8C19.5817 8 16 11.5817 16 16V24L12 28V32H36V28L32 24V16C32 11.5817 28.4183 8 24 8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 32V34C21 35.6569 22.3431 37 24 37C25.6569 37 27 35.6569 27 34V32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    {hasNotifications && (
      <circle cx="34" cy="14" r="4" fill="#CCA404"/>
    )}
  </svg>
);
