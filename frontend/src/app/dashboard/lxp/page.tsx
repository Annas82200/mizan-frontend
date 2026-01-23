'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Award,
  Clock,
  Target,
  Play,
  CheckCircle2,
  ArrowRight,
  Loader2,
  BarChart3,
  Lightbulb,
  Users,
  Star,
  Calendar
} from 'lucide-react';
import { logger } from '@/lib/logger';
import apiClient from '@/lib/api-client';

interface LXPMetrics {
  totalCourses: number;
  activeLearningPaths: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHoursLearned: number;
  certificatesEarned: number;
  averageCompletion: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface RecommendedCourse {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: string;
  matchScore: number;
  thumbnail: string;
}

interface ActivePath {
  id: string;
  title: string;
  progress: number;
  coursesCompleted: number;
  totalCourses: number;
  nextCourse: string;
}

const moduleLinks = [
  { href: '/dashboard/lxp/learning-paths', icon: Target, label: 'Learning Paths', description: 'Structured skill development journeys' },
  { href: '/dashboard/lxp/courses', icon: BookOpen, label: 'Course Catalog', description: 'Browse and enroll in courses' },
  { href: '/dashboard/lxp/progress', icon: TrendingUp, label: 'My Progress', description: 'Track your learning journey' },
  { href: '/dashboard/lxp/recommendations', icon: Lightbulb, label: 'Recommendations', description: 'AI-powered course suggestions' }
];

/**
 * Learning Experience Platform (LXP) Dashboard
 * Production-ready: Complete learning management system
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function LXPPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('');
  const [metrics, setMetrics] = useState<LXPMetrics | null>(null);
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>([]);
  const [activePaths, setActivePaths] = useState<ActivePath[]>([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role || 'employee');
        setUserName(payload.name || 'Learner');

        await fetchLXPData();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchLXPData = async () => {
    try {
      interface ApiResponse {
        metrics: LXPMetrics;
        activePaths: ActivePath[];
        recommendedCourses: RecommendedCourse[];
      }

      const response = await apiClient.get('/api/lxp/overview');
      const data = response.data as ApiResponse;

      // Set metrics from API
      if (data.metrics) {
        setMetrics(data.metrics);
      }

      // Set recommended courses from API
      if (data.recommendedCourses) {
        setRecommendedCourses(data.recommendedCourses.map(c => ({
          id: c.id,
          title: c.title,
          provider: c.provider || 'Internal',
          duration: c.duration || '1h',
          level: c.level || 'Beginner',
          matchScore: c.matchScore || 80,
          thumbnail: c.thumbnail || ''
        })));
      }

      // Set active paths from API
      if (data.activePaths) {
        setActivePaths(data.activePaths.map(p => ({
          id: p.id,
          title: p.title,
          progress: p.progress || 0,
          coursesCompleted: p.coursesCompleted || 0,
          totalCourses: p.totalCourses || 0,
          nextCourse: p.nextCourse || ''
        })));
      }
    } catch (err) {
      logger.error('Error fetching LXP data:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-mizan-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Experience</h1>
                <p className="text-sm text-gray-600">Grow your skills and advance your career</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/lxp/courses')}
                className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Courses</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-mizan-primary to-mizan-primary/80 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h2>
                <p className="text-white/80 mb-4">You're making great progress. Keep learning!</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{metrics?.weeklyProgress}h / {metrics?.weeklyGoal}h weekly goal</span>
                  </div>
                  <div className="w-32 bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white rounded-full h-2 transition-all"
                      style={{ width: `${((metrics?.weeklyProgress || 0) / (metrics?.weeklyGoal || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Award className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-5 h-5 text-mizan-gold" />
                  <p className="text-xs text-gray-500">Total Courses</p>
                </div>
                <p className="text-2xl font-bold text-mizan-primary">{metrics.totalCourses}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  <p className="text-xs text-gray-500">Learning Paths</p>
                </div>
                <p className="text-2xl font-bold text-purple-600">{metrics.activeLearningPaths}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Play className="w-5 h-5 text-blue-500" />
                  <p className="text-xs text-gray-500">In Progress</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{metrics.inProgressCourses}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{metrics.completedCourses}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <p className="text-xs text-gray-500">Hours Learned</p>
                </div>
                <p className="text-2xl font-bold text-orange-600">{metrics.totalHoursLearned}h</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <p className="text-xs text-gray-500">Certificates</p>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{metrics.certificatesEarned}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-indigo-500" />
                  <p className="text-xs text-gray-500">Avg Completion</p>
                </div>
                <p className="text-2xl font-bold text-indigo-600">{metrics.averageCompletion}%</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                  <p className="text-xs text-gray-500">Weekly Goal</p>
                </div>
                <p className="text-2xl font-bold text-teal-600">{Math.round((metrics.weeklyProgress / metrics.weeklyGoal) * 100)}%</p>
              </div>
            </div>
          )}

          {/* Active Learning Paths */}
          {activePaths.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-mizan-primary">Continue Learning</h2>
                <Link href="/dashboard/lxp/learning-paths" className="text-sm text-mizan-gold hover:underline">
                  View All Paths
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePaths.map((path) => (
                  <div key={path.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-mizan-gold/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-mizan-primary">{path.title}</h3>
                        <p className="text-sm text-gray-500">{path.coursesCompleted} of {path.totalCourses} courses completed</p>
                      </div>
                      <span className="text-lg font-bold text-mizan-gold">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-mizan-gold rounded-full h-2 transition-all"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Next:</span> {path.nextCourse}
                      </p>
                      <button className="px-3 py-1 bg-mizan-gold text-white text-sm rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-1">
                        <Play className="w-3 h-3" />
                        <span>Continue</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Courses */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-mizan-gold" />
                <h2 className="text-lg font-semibold text-mizan-primary">Recommended for You</h2>
              </div>
              <Link href="/dashboard/lxp/recommendations" className="text-sm text-mizan-gold hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-mizan-gold/30 hover:shadow-md transition-all group cursor-pointer">
                  <div className="w-full h-32 bg-gradient-to-br from-mizan-gold/20 to-mizan-primary/20 rounded-lg mb-3 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-mizan-gold/50" />
                  </div>
                  <h3 className="font-semibold text-mizan-primary group-hover:text-mizan-gold transition-colors mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{course.provider}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{course.duration}</span>
                    </div>
                    <span className="px-2 py-1 bg-mizan-gold/10 text-mizan-gold text-xs rounded-full">
                      {course.matchScore}% match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module Links */}
          <div>
            <h2 className="text-lg font-semibold text-mizan-primary mb-4">Learning Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {moduleLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-mizan-gold/30 transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-mizan-gold/10 rounded-xl flex items-center justify-center group-hover:bg-mizan-gold/20 transition-colors">
                          <Icon className="w-6 h-6 text-mizan-gold" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-mizan-primary group-hover:text-mizan-gold transition-colors">
                            {link.label}
                          </h3>
                          <p className="text-sm text-gray-600">{link.description}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-mizan-gold group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
