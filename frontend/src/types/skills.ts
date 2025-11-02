/**
 * TypeScript Interfaces for Skills Module
 * ✅ PRODUCTION-READY: Comprehensive type definitions
 */

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Skill Types
export interface Skill {
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface DetailedSkill extends Skill {
  id?: string;
  proficiency?: number;
  lastAssessed?: string;
  certifications?: string[];
}

// Framework Types
export interface FrameworkSkill {
  id: string;
  name: string;
  category: string;
  level: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
}

export interface FrameworkPriority {
  skillId: string;
  priority: number;
  rationale: string;
}

export interface Framework {
  id: string;
  tenantId: string;
  frameworkName: string;
  industry: string;
  strategicSkills: FrameworkSkill[];
  technicalSkills: FrameworkSkill[];
  softSkills: FrameworkSkill[];
  prioritization: FrameworkPriority[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Employee Skills Types
export interface EmployeeSkillsProfile {
  employeeId: string;
  employeeName?: string;
  skills: Skill[];
  assessmentDate?: string;
  completionPercentage: number;
  profileSource: 'resume' | 'manual' | 'assessment' | 'csv';
}

export interface EmployeeSkillsResponse {
  success: boolean;
  data?: {
    employeeId: string;
    skills: Skill[];
    profile?: EmployeeSkillsProfile;
  };
  error?: string;
}

// Gap Analysis Types
export interface SkillGap {
  id: string;
  skillName: string;
  category: string;
  requiredLevel: string;
  currentLevel: string;
  gapSeverity: 'critical' | 'high' | 'medium' | 'low';
  affectedEmployees: number;
  recommendations: string[];
  estimatedTrainingTime?: string;
}

export interface EmployeeGapAnalysis {
  employeeId: string;
  employeeName: string;
  overallGapScore: number;
  criticalGaps: SkillGap[];
  gaps: SkillGap[];
  strengths: Skill[];
  recommendations: string[];
}

export interface OrganizationGaps {
  totalEmployees: number;
  assessedEmployees: number;
  criticalGaps: SkillGap[];
  allGaps: SkillGap[];
  byDepartment: {
    departmentId: string;
    departmentName: string;
    gapCount: number;
    criticalGapCount: number;
  }[];
  bySeverity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

// Resume Upload Types
export interface ResumeUploadResponse {
  success: boolean;
  data?: {
    extractedSkills: Skill[];
    resumeText?: string;
    confidence: number;
  };
  error?: string;
}

// Workflow Types
export interface WorkflowSession {
  id: string;
  sessionName: string;
  frameworkId: string;
  status: 'collecting' | 'analyzing' | 'completed' | 'failed';
  progress: number;
  startedAt: string;
  completedAt?: string;
  results?: {
    employeesAnalyzed: number;
    gapsIdentified: number;
    recommendationsGenerated: number;
  };
}

// Dashboard Stats Types
export interface SkillsDashboardStats {
  totalEmployees: number;
  assessmentsCompleted: number;
  criticalGaps: number;
  learningPathsActive: number;
  recentActivities: {
    id: string;
    type: 'assessment' | 'gap_identified' | 'skill_updated' | 'framework_created';
    description: string;
    timestamp: string;
    employeeName?: string;
  }[];
  skillCategories: {
    category: string;
    employeeCount: number;
    averageLevel: number;
  }[];
}

// Form Types
export interface CreateFrameworkData {
  industry: string;
  strategy: string;
  organizationName: string;
}

export interface UpdateFrameworkData {
  frameworkName?: string;
  industry?: string;
  strategicSkills?: FrameworkSkill[];
  technicalSkills?: FrameworkSkill[];
  softSkills?: FrameworkSkill[];
  prioritization?: FrameworkPriority[];
}

// Filter Types
export interface GapFilters {
  severity?: 'critical' | 'high' | 'medium' | 'low';
  category?: string;
  departmentId?: string;
  employeeId?: string;
  searchTerm?: string;
}

export interface SkillsFilters {
  level?: string;
  category?: string;
  searchTerm?: string;
}
