// User & Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'manager' | 'employee';
  tenantId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Tenant/Client Types
export interface Tenant {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  status: 'active' | 'inactive' | 'trial';
  subscriptionTier: 'basic' | 'professional' | 'enterprise';
  createdAt: string;
  updatedAt: string;
}

// Culture Analysis Types
export interface CultureCylinder {
  name: string;
  level: number;
  score: number;
  enablingValues: string[];
  limitingValues: string[];
}

export interface CultureReport {
  id: string;
  tenantId: string;
  cylinders: CultureCylinder[];
  overallScore: number;
  recommendations: string[];
  createdAt: string;
}

// Skills Analysis Types
export interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface SkillsReport {
  id: string;
  tenantId: string;
  employeeId?: string;
  skillGaps: SkillGap[];
  recommendations: string[];
  createdAt: string;
}

// Performance Types
export interface PerformanceGoal {
  id: string;
  tenantId: string;
  employeeId: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'company';
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  targetDate: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceReview {
  id: string;
  tenantId: string;
  employeeId: string;
  reviewerId: string;
  reviewType: 'annual' | 'quarterly' | 'monthly' | 'probation';
  rating: number;
  strengths: string[];
  areasForImprovement: string[];
  comments: string;
  createdAt: string;
}

// Hiring Types
export interface Requisition {
  id: string;
  tenantId: string;
  title: string;
  department: string;
  status: 'draft' | 'open' | 'filled' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requiredSkills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  tenantId: string;
  requisitionId: string;
  name: string;
  email: string;
  phone?: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  resumeUrl?: string;
  cultureFitScore?: number;
  skillsScore?: number;
  overallScore?: number;
  createdAt: string;
  updatedAt: string;
}

// LXP Types
export interface Course {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  createdAt: string;
}

export interface CourseEnrollment {
  id: string;
  tenantId: string;
  courseId: string;
  employeeId: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
  progress: number;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface LearningPath {
  id: string;
  tenantId: string;
  employeeId: string;
  title: string;
  description: string;
  courses: string[]; // Course IDs
  status: 'active' | 'completed';
  createdAt: string;
}

// Employee Types
export interface Employee {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  department: string;
  position: string;
  managerId?: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'terminated';
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
