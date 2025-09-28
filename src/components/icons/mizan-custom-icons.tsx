import React from 'react';

// Custom Mizan Icons - Sophisticated, minimalist design matching platform theme
export const MizanIcons = {
  // Authentication & Security
  Shield: ({ className = "w-6 h-6", color = "#3F3D56" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M9 12L11 14L15 10" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  ),

  Email: ({ className = "w-6 h-6", color = "#545454" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect 
        x="2" 
        y="4" 
        width="20" 
        height="16" 
        rx="3" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <path 
        d="M22 7L12 13L2 7" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  ),

  Lock: ({ className = "w-6 h-6", color = "#545454" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect 
        x="3" 
        y="11" 
        width="18" 
        height="10" 
        rx="2" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <circle 
        cx="12" 
        cy="16" 
        r="1" 
        fill={color} 
      />
      <path 
        d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  ),

  EyeOpen: ({ className = "w-6 h-6", color = "#545454" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        stroke={color} 
        strokeWidth="1.5" 
      />
    </svg>
  ),

  EyeClosed: ({ className = "w-6 h-6", color = "#545454" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 4.028 7.66873 6.21 6.21" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1749 15.0074 10.8016 14.8565C10.4283 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.5717 9.14351 13.1984C8.99262 12.8251 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <line 
        x1="1" 
        y1="1" 
        x2="23" 
        y2="23" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  ),

  // Navigation & Actions
  ArrowRight: ({ className = "w-6 h-6", color = "white" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M5 12H19" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M12 5L19 12L12 19" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  ),

  Success: ({ className = "w-6 h-6", color = "#4CB3A9" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <path 
        d="M8 12L11 15L16 9" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  ),

  Warning: ({ className = "w-6 h-6", color = "#CCA404" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M10.29 3.86L1.82 18C1.64466 18.3024 1.55607 18.6453 1.56331 18.9928C1.57055 19.3403 1.67343 19.6792 1.86177 19.9757C2.05012 20.2723 2.31662 20.5158 2.63159 20.6837C2.94656 20.8517 3.29934 20.9388 3.658 20.938H20.588C20.9467 20.9388 21.2994 20.8517 21.6144 20.6837C21.9294 20.5158 22.1959 20.2723 22.3842 19.9757C22.5726 19.6792 22.6754 19.3403 22.6827 18.9928C22.6899 18.6453 22.6013 18.3024 22.426 18L13.954 3.86C13.7715 3.566 13.5017 3.32624 13.1752 3.16999C12.8486 3.01374 12.4785 2.93652 12.1035 2.93652C11.7285 2.93652 11.3584 3.01374 11.0318 3.16999C10.7953 3.32624 10.4655 3.566 10.29 3.86Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <line 
        x1="12" 
        y1="9" 
        x2="12" 
        y2="13" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <circle 
        cx="12" 
        cy="17" 
        r="1" 
        fill={color} 
      />
    </svg>
  ),

  // Platform Features
  Structure: ({ className = "w-6 h-6", color = "#3F3D56" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect 
        x="3" 
        y="3" 
        width="18" 
        height="4" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <rect 
        x="3" 
        y="10" 
        width="8" 
        height="4" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <rect 
        x="13" 
        y="10" 
        width="8" 
        height="4" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <rect 
        x="3" 
        y="17" 
        width="5" 
        height="4" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <rect 
        x="10" 
        y="17" 
        width="4" 
        height="4" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <rect 
        x="16" 
        y="17" 
        width="5" 
        height="4" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <path 
        d="M12 7V10" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <path 
        d="M7 14V17" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <path 
        d="M17 14V17" 
        stroke={color} 
        strokeWidth="1.5" 
      />
    </svg>
  ),

  Culture: ({ className = "w-6 h-6", color = "#4CB3A9" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="6" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="2" 
        fill={color} 
      />
      <path 
        d="M12 2V6" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M12 18V22" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M22 12H18" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M6 12H2" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  ),

  Skills: ({ className = "w-6 h-6", color = "#CCA404" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2L15.09 8.26L22 9L17 13.74L18.18 20.74L12 17.27L5.82 20.74L7 13.74L2 9L8.91 8.26L12 2Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="3" 
        stroke={color} 
        strokeWidth="1.5" 
      />
    </svg>
  ),

  Dashboard: ({ className = "w-6 h-6", color = "#3F3D56" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect 
        x="3" 
        y="3" 
        width="7" 
        height="9" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <rect 
        x="14" 
        y="3" 
        width="7" 
        height="5" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <rect 
        x="14" 
        y="12" 
        width="7" 
        height="9" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
      <rect 
        x="3" 
        y="16" 
        width="7" 
        height="5" 
        rx="1" 
        stroke={color} 
        strokeWidth="1.5" 
      />
    </svg>
  )
};

export default MizanIcons;
