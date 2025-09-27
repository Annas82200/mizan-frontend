// client/src/components/icons/index.tsx

import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// Mizan Logo with growth element
export const MizanLogo = ({ size = 48, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    className={className}
    {...props}
  >
    {/* Plant/Growth element */}
    <path d="M32 48 C32 48, 28 36, 28 24" stroke="#545454" strokeWidth="3" strokeLinecap="round"/>
    <path d="M28 28 C28 28, 20 24, 20 20 C20 16, 24 16, 26 18 C28 20, 28 24, 28 28" fill="#CCA404"/>
    <path d="M28 36 C28 36, 36 32, 36 28 C36 24, 32 24, 30 26 C28 28, 28 32, 28 36" fill="#4CB3A9"/>
    <path d="M28 20 C28 20, 36 16, 36 12 C36 8, 32 8, 30 10 C28 12, 28 16, 28 20" fill="#545454"/>
    {/* Scale element */}
    <path d="M16 48 L48 48" stroke="#3F3D56" strokeWidth="2"/>
    <path d="M32 48 L32 52" stroke="#3F3D56" strokeWidth="2"/>
    <path d="M24 48 L24 50" stroke="#3F3D56" strokeWidth="1.5"/>
    <path d="M40 48 L40 50" stroke="#3F3D56" strokeWidth="1.5"/>
  </svg>
);

// Structure Analysis Icon
export const StructureIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <circle cx="12" cy="4" r="2.5" fill="#CCA404"/>
    <circle cx="6" cy="12" r="2.5" fill="#4CB3A9"/>
    <circle cx="18" cy="12" r="2.5" fill="#4CB3A9"/>
    <circle cx="9" cy="20" r="2.5" fill="#545454"/>
    <circle cx="15" cy="20" r="2.5" fill="#545454"/>
    <path d="M12 6.5V9.5M12 9.5L9 17.5M12 9.5L15 17.5" stroke="#3F3D56" strokeWidth="1.5"/>
    <path d="M8.5 12H6M15.5 12H18" stroke="#3F3D56" strokeWidth="1.5"/>
  </svg>
);

// Culture Analysis Icon (7 cylinders abstract)
export const CultureIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <rect x="8" y="18" width="8" height="2" rx="1" fill="#E8D4A0"/>
    <rect x="7" y="16" width="10" height="2" rx="1" fill="#DCC078"/>
    <rect x="6" y="14" width="12" height="2" rx="1" fill="#CCA404"/>
    <rect x="5" y="12" width="14" height="2" rx="1" fill="#B39003"/>
    <rect x="4" y="10" width="16" height="2" rx="1" fill="#4CB3A9"/>
    <rect x="3" y="8" width="18" height="2" rx="1" fill="#3A9088"/>
    <rect x="2" y="6" width="20" height="2" rx="1" fill="#2C7066"/>
  </svg>
);

// Skills Analysis Icon
export const SkillsIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" 
          fill="#CCA404" 
          stroke="#545454" 
          strokeWidth="1.5" 
          strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="white"/>
    <text x="12" y="15" textAnchor="middle" fontSize="6" fill="#545454" fontWeight="bold">S</text>
  </svg>
);

// Dashboard Icon
export const DashboardIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <rect x="3" y="3" width="8" height="8" rx="2" fill="#CCA404"/>
    <rect x="13" y="3" width="8" height="5" rx="2" fill="#4CB3A9"/>
    <rect x="13" y="10" width="8" height="11" rx="2" fill="#545454"/>
    <rect x="3" y="13" width="8" height="8" rx="2" fill="#E2E8F0" stroke="#545454" strokeWidth="1.5"/>
  </svg>
);

// AI Analysis Icon
export const AIAnalysisIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    {/* Brain/Network shape */}
    <circle cx="12" cy="12" r="8" fill="none" stroke="#CCA404" strokeWidth="1.5"/>
    <circle cx="12" cy="8" r="2" fill="#CCA404"/>
    <circle cx="8" cy="14" r="2" fill="#4CB3A9"/>
    <circle cx="16" cy="14" r="2" fill="#4CB3A9"/>
    <path d="M12 8V10M12 10L8 14M12 10L16 14" stroke="#545454" strokeWidth="1.5"/>
    {/* AI sparkles */}
    <path d="M4 4L5 3L6 4L5 5L4 4Z" fill="#CCA404"/>
    <path d="M18 4L19 3L20 4L19 5L18 4Z" fill="#4CB3A9"/>
    <path d="M4 18L5 17L6 18L5 19L4 18Z" fill="#545454"/>
  </svg>
);

// Report Icon
export const ReportIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="#545454" strokeWidth="1.5"/>
    <rect x="8" y="7" width="8" height="1.5" rx="0.75" fill="#CCA404"/>
    <rect x="8" y="10" width="6" height="1.5" rx="0.75" fill="#4CB3A9"/>
    <rect x="8" y="13" width="8" height="1.5" rx="0.75" fill="#545454"/>
    <rect x="8" y="16" width="4" height="1.5" rx="0.75" fill="#E2E8F0"/>
  </svg>
);

// Trigger/Action Icon
export const TriggerIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" 
          fill="none" 
          stroke="#CCA404" 
          strokeWidth="2" 
          strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="2" fill="#4CB3A9"/>
    <path d="M12 12V16" stroke="#545454" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 14L12 16L14 14" stroke="#545454" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Learning/LXP Icon
export const LearningIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <path d="M12 3L2 8L12 13L22 8L12 3Z" fill="#CCA404"/>
    <path d="M5 10V16C5 16 7 19 12 19C17 19 19 16 19 16V10" stroke="#545454" strokeWidth="1.5"/>
    <path d="M22 8V14" stroke="#4CB3A9" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="22" cy="16" r="2" fill="#4CB3A9"/>
  </svg>
);

// Settings/Config Icon
export const SettingsIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="3" fill="#CCA404"/>
    <path d="M12 2V6M12 18V22M22 12H18M6 12H2" stroke="#545454" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 5L16 8M8 16L5 19M19 19L16 16M8 8L5 5" stroke="#4CB3A9" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Success/Check Icon
export const SuccessIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#4CB3A9"/>
    <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Warning Icon
export const WarningIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <path d="M12 2L2 20H22L12 2Z" fill="#CCA404"/>
    <path d="M12 9V13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="16.5" r="1" fill="white"/>
  </svg>
);

// Error Icon
export const ErrorIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#DC2626"/>
    <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// User/Employee Icon
export const UserIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <circle cx="12" cy="8" r="4" fill="#CCA404"/>
    <path d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20" stroke="#545454" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Organization Icon
export const OrganizationIcon = ({ size = 24, className, ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    {...props}
  >
    <rect x="3" y="8" width="18" height="12" rx="2" fill="none" stroke="#545454" strokeWidth="1.5"/>
    <path d="M8 4H16V8H8V4Z" fill="#CCA404"/>
    <rect x="10" y="12" width="4" height="4" rx="1" fill="#4CB3A9"/>
    <rect x="6" y="16" width="2" height="2" fill="#545454"/>
    <rect x="11" y="16" width="2" height="2" fill="#545454"/>
    <rect x="16" y="16" width="2" height="2" fill="#545454"/>
  </svg>
);

// Export all icons
export const MizanIcons = {
  Logo: MizanLogo,
  Structure: StructureIcon,
  Culture: CultureIcon,
  Skills: SkillsIcon,
  Dashboard: DashboardIcon,
  AI: AIAnalysisIcon,
  Report: ReportIcon,
  Trigger: TriggerIcon,
  Learning: LearningIcon,
  Settings: SettingsIcon,
  Success: SuccessIcon,
  Warning: WarningIcon,
  Error: ErrorIcon,
  User: UserIcon,
  Organization: OrganizationIcon,
};
