import React from 'react';

// Base icon props interface
interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// People-focused Icons
export const PeopleBalanceIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill={color}/>
    <path d="M8 7C9.1 7 10 7.9 10 9C10 10.1 9.1 11 8 11C6.9 11 6 10.1 6 9C6 7.9 6.9 7 8 7Z" fill={color}/>
    <path d="M16 7C17.1 7 18 7.9 18 9C18 10.1 17.1 11 16 11C14.9 11 14 10.1 14 9C14 7.9 14.9 7 16 7Z" fill={color}/>
    <path d="M12 8L8 12L12 16L16 12L12 8Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M4 18C4 16 6 14 8 14C9 14 9.8 14.3 10.4 14.8" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M20 18C20 16 18 14 16 14C15 14 14.2 14.3 13.6 14.8" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 22C15 22 17 20 17 18C17 16 15 14 12 14C9 14 7 16 7 18C7 20 9 22 12 22Z" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

export const PurposeCompassIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
    <path d="M12 2L13 6L12 8L11 6L12 2Z" fill={color}/>
    <path d="M22 12L18 11L16 12L18 13L22 12Z" fill={color}/>
    <path d="M12 22L11 18L12 16L13 18L12 22Z" fill={color}/>
    <path d="M2 12L6 13L8 12L6 11L2 12Z" fill={color}/>
    <path d="M12 6L15 9L12 12L9 9L12 6Z" stroke={color} strokeWidth="1" fill="none"/>
  </svg>
);

export const PerformanceBalanceIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15 8H21L16 12L18 18L12 15L6 18L8 12L3 8H9L12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M8 20L12 16L16 20" stroke={color} strokeWidth="1.5"/>
    <path d="M6 22H18" stroke={color} strokeWidth="2"/>
    <path d="M9 16L12 13L15 16" stroke={color} strokeWidth="1"/>
  </svg>
);

// Culture & Values Icons
export const CultureTreeIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C8 2 5 5 5 9C5 11 6 12.5 7.5 13.5C6.5 14.5 6 15.7 6 17C6 19.2 7.8 21 10 21H14C16.2 21 18 19.2 18 17C18 15.7 17.5 14.5 16.5 13.5C18 12.5 19 11 19 9C19 5 16 2 12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8Z" fill={color}/>
    <path d="M9 11C9.6 11 10 10.6 10 10C10 9.4 9.6 9 9 9C8.4 9 8 9.4 8 10C8 10.6 8.4 11 9 11Z" fill={color}/>
    <path d="M15 11C15.6 11 16 10.6 16 10C16 9.4 15.6 9 15 9C14.4 9 14 9.4 14 10C14 10.6 14.4 11 15 11Z" fill={color}/>
    <path d="M12 21V13" stroke={color} strokeWidth="1.5"/>
    <path d="M8 18C8.6 18 9 17.6 9 17C9 16.4 8.6 16 8 16C7.4 16 7 16.4 7 17C7 17.6 7.4 18 8 18Z" fill={color}/>
    <path d="M16 18C16.6 18 17 17.6 17 17C17 16.4 16.6 16 16 16C15.4 16 15 16.4 15 17C15 17.6 15.4 18 16 18Z" fill={color}/>
  </svg>
);

export const EthicsScaleIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L12 22" stroke={color} strokeWidth="2"/>
    <path d="M12 6L8 8L8 12L12 10L16 12L16 8L12 6Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="8" cy="10" r="1" fill={color}/>
    <circle cx="16" cy="10" r="1" fill={color}/>
    <path d="M6 8H10" stroke={color} strokeWidth="1"/>
    <path d="M14 8H18" stroke={color} strokeWidth="1"/>
    <path d="M6 12H10" stroke={color} strokeWidth="1"/>
    <path d="M14 12H18" stroke={color} strokeWidth="1"/>
    <path d="M10 20H14" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="4" r="1" fill={color}/>
  </svg>
);

// Structure & Organization Icons
export const OrganizationFlowIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="10" y="2" width="4" height="3" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="3" y="8" width="4" height="3" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="10" y="8" width="4" height="3" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="17" y="8" width="4" height="3" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="3" y="14" width="4" height="3" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="10" y="14" width="4" height="3" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="17" y="14" width="4" height="3" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 5V8" stroke={color} strokeWidth="1.5"/>
    <path d="M12 8L5 8" stroke={color} strokeWidth="1.5"/>
    <path d="M12 8L19 8" stroke={color} strokeWidth="1.5"/>
    <path d="M5 11V14" stroke={color} strokeWidth="1.5"/>
    <path d="M12 11V14" stroke={color} strokeWidth="1.5"/>
    <path d="M19 11V14" stroke={color} strokeWidth="1.5"/>
    <circle cx="12" cy="3.5" r="0.5" fill={color}/>
    <circle cx="5" cy="9.5" r="0.5" fill={color}/>
    <circle cx="12" cy="9.5" r="0.5" fill={color}/>
    <circle cx="19" cy="9.5" r="0.5" fill={color}/>
  </svg>
);

export const StrategyAlignmentIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12L12 3L21 12" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 3V21" stroke={color} strokeWidth="1.5"/>
    <circle cx="12" cy="8" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="8" cy="12" r="1.5" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="16" cy="12" r="1.5" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="6" cy="16" r="1" fill={color}/>
    <circle cx="12" cy="16" r="1" fill={color}/>
    <circle cx="18" cy="16" r="1" fill={color}/>
    <path d="M8 12L12 8L16 12" stroke={color} strokeWidth="1"/>
    <path d="M6 16L8 12" stroke={color} strokeWidth="1"/>
    <path d="M18 16L16 12" stroke={color} strokeWidth="1"/>
    <path d="M12 16L12 8" stroke={color} strokeWidth="1"/>
  </svg>
);

// AI & Analysis Icons
export const AIInsightIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 4C12 4 8 8 8 12C8 16 12 20 12 20C12 20 16 16 16 12C16 8 12 4 12 4Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
    <path d="M12 2L13 4L12 6L11 4L12 2Z" fill={color}/>
    <path d="M22 12L20 11L18 12L20 13L22 12Z" fill={color}/>
    <path d="M12 22L11 20L12 18L13 20L12 22Z" fill={color}/>
    <path d="M2 12L4 13L6 12L4 11L2 12Z" fill={color}/>
    <path d="M18.36 5.64L17.66 6.34L16.95 5.64L17.66 4.93L18.36 5.64Z" fill={color}/>
    <path d="M7.05 18.36L6.34 17.66L7.05 16.95L7.76 17.66L7.05 18.36Z" fill={color}/>
  </svg>
);

export const ThreeEngineIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="6" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="6" cy="16" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="18" cy="16" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 10L8 12" stroke={color} strokeWidth="1.5"/>
    <path d="M12 10L16 12" stroke={color} strokeWidth="1.5"/>
    <path d="M10 16L14 16" stroke={color} strokeWidth="1.5"/>
    <circle cx="12" cy="6" r="1" fill={color}/>
    <circle cx="6" cy="16" r="1" fill={color}/>
    <circle cx="18" cy="16" r="1" fill={color}/>
    <text x="12" y="8" textAnchor="middle" fontSize="6" fill={color}>K</text>
    <text x="6" y="18" textAnchor="middle" fontSize="6" fill={color}>D</text>
    <text x="18" y="18" textAnchor="middle" fontSize="6" fill={color}>R</text>
  </svg>
);

// Engagement & Recognition Icons
export const EngagementHeartIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="8" cy="8" r="1" fill={color}/>
    <circle cx="12" cy="10" r="1" fill={color}/>
    <circle cx="16" cy="8" r="1" fill={color}/>
    <path d="M8 12C8 12 10 14 12 14C14 14 16 12 16 12" stroke={color} strokeWidth="1"/>
    <path d="M6 16L12 18L18 16" stroke={color} strokeWidth="1"/>
  </svg>
);

export const RecognitionStarIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15.09 8.26L22 9L17 13.74L18.18 20.02L12 16.77L5.82 20.02L7 13.74L2 9L8.91 8.26L12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
    <path d="M12 6L13 8L12 10L11 8L12 6Z" fill={color}/>
    <path d="M18 12L16 11L14 12L16 13L18 12Z" fill={color}/>
    <path d="M12 18L11 16L12 14L13 16L12 18Z" fill={color}/>
    <path d="M6 12L8 13L10 12L8 11L6 12Z" fill={color}/>
  </svg>
);

// Learning & Development Icons
export const LearningGrowthIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 18V12C3 9 5 7 8 7H16C19 7 21 9 21 12V18" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M8 7V5C8 3 9 2 11 2H13C15 2 16 3 16 5V7" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 10L14 8" stroke={color} strokeWidth="1"/>
    <path d="M12 14L10 16" stroke={color} strokeWidth="1"/>
    <path d="M10 12L8 10" stroke={color} strokeWidth="1"/>
    <path d="M14 12L16 14" stroke={color} strokeWidth="1"/>
    <circle cx="12" cy="4" r="1" fill={color}/>
    <circle cx="6" cy="15" r="1" fill={color}/>
    <circle cx="18" cy="15" r="1" fill={color}/>
    <path d="M3 20H21" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const SkillsMatrixIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M3 9H21" stroke={color} strokeWidth="1"/>
    <path d="M9 3V21" stroke={color} strokeWidth="1"/>
    <path d="M15 3V21" stroke={color} strokeWidth="1"/>
    <path d="M3 15H21" stroke={color} strokeWidth="1"/>
    <circle cx="6" cy="6" r="1" fill={color}/>
    <circle cx="12" cy="6" r="1" fill={color}/>
    <circle cx="18" cy="6" r="1" fill={color}/>
    <circle cx="6" cy="12" r="1.5" fill={color}/>
    <circle cx="12" cy="12" r="1" fill={color}/>
    <circle cx="18" cy="12" r="0.5" fill={color}/>
    <circle cx="6" cy="18" r="0.5" fill={color}/>
    <circle cx="12" cy="18" r="1.5" fill={color}/>
    <circle cx="18" cy="18" r="1" fill={color}/>
  </svg>
);

// Wellness & Safety Icons
export const WellbeingBalanceIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 3C12 3 15 6 15 9C15 12 12 15 12 15C12 15 9 12 9 9C9 6 12 3 12 3Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="9" r="2" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="12" cy="9" r="0.5" fill={color}/>
    <path d="M6 15C6 15 8 17 10 17C12 17 14 15 14 15" stroke={color} strokeWidth="1"/>
    <path d="M18 15C18 15 16 17 14 17C12 17 10 15 10 15" stroke={color} strokeWidth="1"/>
    <circle cx="7" cy="16" r="1" fill={color}/>
    <circle cx="17" cy="16" r="1" fill={color}/>
    <path d="M12 18V21" stroke={color} strokeWidth="1.5"/>
    <path d="M10 21H14" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const SafetyShieldIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 6V12C4 16.5 7 20.26 12 22C17 20.26 20 16.5 20 12V6L12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="8" r="1" fill={color}/>
    <path d="M8 6L12 4L16 6" stroke={color} strokeWidth="1"/>
    <circle cx="8" cy="16" r="0.5" fill={color}/>
    <circle cx="16" cy="16" r="0.5" fill={color}/>
    <circle cx="12" cy="18" r="0.5" fill={color}/>
  </svg>
);

// Unity & Transcendence Icons
export const UnityCircleIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1" fill="none"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
    <path d="M12 3L13 5L12 7L11 5L12 3Z" fill={color}/>
    <path d="M21 12L19 11L17 12L19 13L21 12Z" fill={color}/>
    <path d="M12 21L11 19L12 17L13 19L12 21Z" fill={color}/>
    <path d="M3 12L5 13L7 12L5 11L3 12Z" fill={color}/>
    <path d="M18.36 5.64L17.66 6.34L16.95 5.64L17.66 4.93L18.36 5.64Z" fill={color}/>
    <path d="M7.05 18.36L6.34 17.66L7.05 16.95L7.76 17.66L7.05 18.36Z" fill={color}/>
    <path d="M18.36 18.36L17.66 17.66L18.36 16.95L19.07 17.66L18.36 18.36Z" fill={color}/>
    <path d="M7.05 5.64L7.76 6.34L7.05 7.05L6.34 6.34L7.05 5.64Z" fill={color}/>
  </svg>
);

export const StewardshipIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2C8 2 5 5 5 9C5 13 8 16 12 20C16 16 19 13 19 9C19 5 16 2 12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="9" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="9" r="1" fill={color}/>
    <path d="M9 9L12 6L15 9" stroke={color} strokeWidth="1"/>
    <path d="M12 12V16" stroke={color} strokeWidth="1.5"/>
    <path d="M8 14L12 16L16 14" stroke={color} strokeWidth="1"/>
    <circle cx="8" cy="14" r="0.5" fill={color}/>
    <circle cx="16" cy="14" r="0.5" fill={color}/>
    <path d="M12 20V22" stroke={color} strokeWidth="1.5"/>
    <path d="M10 22H14" stroke={color} strokeWidth="1.5"/>
  </svg>
);

// Export all icons as a collection
export const MizanIcons = {
  // Core Balance Icons
  PeopleBalance: PeopleBalanceIcon,
  PurposeCompass: PurposeCompassIcon,
  PerformanceBalance: PerformanceBalanceIcon,
  
  // Culture & Values
  CultureTree: CultureTreeIcon,
  EthicsScale: EthicsScaleIcon,
  
  // Structure & Organization
  OrganizationFlow: OrganizationFlowIcon,
  StrategyAlignment: StrategyAlignmentIcon,
  
  // AI & Analysis
  AIInsight: AIInsightIcon,
  ThreeEngine: ThreeEngineIcon,
  
  // Engagement & Recognition
  EngagementHeart: EngagementHeartIcon,
  RecognitionStar: RecognitionStarIcon,
  
  // Learning & Development
  LearningGrowth: LearningGrowthIcon,
  SkillsMatrix: SkillsMatrixIcon,
  
  // Wellness & Safety
  WellbeingBalance: WellbeingBalanceIcon,
  SafetyShield: SafetyShieldIcon,
  
  // Unity & Transcendence
  UnityCircle: UnityCircleIcon,
  Stewardship: StewardshipIcon
};

export default MizanIcons;
