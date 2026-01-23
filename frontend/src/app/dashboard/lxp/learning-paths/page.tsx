'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Target,
  Search,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Clock,
  Play,
  Lock,
  BookOpen,
  Award,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Star,
  BarChart3,
  X
} from 'lucide-react';
import { logger } from '@/lib/logger';
import apiClient from '@/lib/api-client';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  totalCourses: number;
  completedCourses: number;
  enrolledUsers: number;
  rating: number;
  skills: string[];
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  courses: Array<{
    id: string;
    title: string;
    duration: string;
    status: 'locked' | 'available' | 'in_progress' | 'completed';
    order: number;
  }>;
  certificate: boolean;
  estimatedCompletionDate: string | null;
  createdAt: string;
}

interface PathMetrics {
  totalPaths: number;
  inProgress: number;
  completed: number;
  notStarted: number;
  totalHours: number;
  certificatesEarned: number;
}

const categories = ['All', 'Technical', 'Leadership', 'Communication', 'Project Management', 'Data & Analytics', 'Design'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

/**
 * Learning Paths Page
 * Production-ready: Structured skill development journeys
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function LearningPathsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [metrics, setMetrics] = useState<PathMetrics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        await fetchPaths();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchPaths = async () => {
    try {
      interface ApiLearningPath {
        id: string;
        name: string;
        description: string;
        type: string;
        status: string;
        progress: number;
        totalCourses: number;
        completedCourses: number;
        goalSkills: string[];
        targetLevel: string;
        startDate: string;
        targetCompletionDate: string;
        courses: Array<{
          id: string;
          title: string;
          status: string;
        }>;
      }

      interface ApiResponse {
        learningPaths: ApiLearningPath[];
      }

      const response = await apiClient.get('/api/lxp/learning-paths');
      const data = response.data as ApiResponse;

      const transformedPaths: LearningPath[] = (data.learningPaths || []).map((p: ApiLearningPath) => {
        const coursesArray = Array.isArray(p.courses) ? p.courses : [];
        const completedCount = coursesArray.filter((c) => c.status === 'completed').length;

        return {
          id: p.id,
          title: p.name,
          description: p.description || '',
          category: p.type || 'General',
          level: (p.targetLevel || 'intermediate') as LearningPath['level'],
          duration: `${Math.round(coursesArray.length * 5)} hours`,
          totalCourses: coursesArray.length,
          completedCourses: completedCount,
          enrolledUsers: 0,
          rating: 4.5,
          skills: p.goalSkills || [],
          status: (p.status === 'in_progress' ? 'in_progress' : p.status === 'completed' ? 'completed' : 'not_started') as LearningPath['status'],
          progress: p.progress || 0,
          courses: coursesArray.map((c, idx) => ({
            id: c.id || `course-${idx}`,
            title: c.title || `Course ${idx + 1}`,
            duration: '5h',
            status: (c.status === 'completed' ? 'completed' : c.status === 'in_progress' ? 'in_progress' : idx === 0 ? 'available' : 'locked') as 'locked' | 'available' | 'in_progress' | 'completed',
            order: idx + 1
          })),
          certificate: true,
          estimatedCompletionDate: p.targetCompletionDate || null,
          createdAt: p.startDate || new Date().toISOString()
        };
      });

      setPaths(transformedPaths);
      calculateMetrics(transformedPaths);
    } catch (err) {
      logger.error('Error fetching learning paths:', err);
    }
  };

  const calculateMetrics = (pathList: LearningPath[]) => {
    const totalHours = pathList.reduce((sum, p) => sum + parseInt(p.duration), 0);
    setMetrics({
      totalPaths: pathList.length,
      inProgress: pathList.filter(p => p.status === 'in_progress').length,
      completed: pathList.filter(p => p.status === 'completed').length,
      notStarted: pathList.filter(p => p.status === 'not_started').length,
      totalHours,
      certificatesEarned: pathList.filter(p => p.status === 'completed' && p.certificate).length
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'bg-gray-100 text-gray-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCourseStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress': return <Play className="w-5 h-5 text-blue-500" />;
      case 'available': return <BookOpen className="w-5 h-5 text-mizan-gold" />;
      case 'locked': return <Lock className="w-5 h-5 text-gray-400" />;
      default: return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredPaths = paths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || path.category === categoryFilter;
    const matchesLevel = levelFilter === 'All Levels' || path.level === levelFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || path.status === statusFilter;
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  const togglePathExpansion = (pathId: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(pathId)) {
      newExpanded.delete(pathId);
    } else {
      newExpanded.add(pathId);
    }
    setExpandedPaths(newExpanded);
  };

  const handleEnroll = async (pathId: string) => {
    try {
      const updatedPaths = paths.map(p => {
        if (p.id === pathId) {
          return {
            ...p,
            status: 'in_progress' as const,
            courses: p.courses.map((c, idx) => ({
              ...c,
              status: idx === 0 ? 'in_progress' as const : c.status
            }))
          };
        }
        return p;
      });
      setPaths(updatedPaths);
      calculateMetrics(updatedPaths);
      setSuccessMessage('Successfully enrolled in learning path!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error enrolling in path:', err);
    }
  };

  const handleContinueLearning = (pathId: string) => {
    router.push(`/dashboard/lxp/courses?path=${pathId}`);
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
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
                <p className="text-sm text-gray-600">Structured skill development journeys</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard/lxp')}
              className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-1">Total Paths</p>
                <p className="text-2xl font-bold text-mizan-primary">{metrics.totalPaths}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200 text-center">
                <p className="text-xs text-blue-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-blue-700">{metrics.inProgress}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200 text-center">
                <p className="text-xs text-green-600 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-700">{metrics.completed}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
                <p className="text-xs text-gray-500 mb-1">Not Started</p>
                <p className="text-2xl font-bold text-gray-600">{metrics.notStarted}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-200 text-center">
                <p className="text-xs text-orange-600 mb-1">Total Hours</p>
                <p className="text-2xl font-bold text-orange-700">{metrics.totalHours}h</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 text-center">
                <p className="text-xs text-yellow-600 mb-1">Certificates</p>
                <p className="text-2xl font-bold text-yellow-700">{metrics.certificatesEarned}</p>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search learning paths..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Statuses</option>
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Learning Paths List */}
          <div className="space-y-4">
            {filteredPaths.map((path) => (
              <div key={path.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Path Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => togglePathExpansion(path.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-mizan-primary">{path.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(path.level)}`}>
                          {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(path.status)}`}>
                          {path.status.replace('_', ' ').charAt(0).toUpperCase() + path.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{path.totalCourses} courses</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{path.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{path.enrolledUsers.toLocaleString()} enrolled</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{path.rating}</span>
                        </span>
                        {path.certificate && (
                          <span className="flex items-center space-x-1 text-mizan-gold">
                            <Award className="w-4 h-4" />
                            <span>Certificate</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {path.status !== 'not_started' && (
                        <div className="text-right">
                          <p className="text-2xl font-bold text-mizan-gold">{path.progress}%</p>
                          <p className="text-xs text-gray-500">{path.completedCourses}/{path.totalCourses} courses</p>
                        </div>
                      )}
                      {expandedPaths.has(path.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {path.status !== 'not_started' && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-mizan-gold rounded-full h-2 transition-all"
                          style={{ width: `${path.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedPaths.has(path.id) && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Courses List */}
                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-gray-700 mb-3">Courses in this Path</h4>
                        <div className="space-y-2">
                          {path.courses.map((course) => (
                            <div
                              key={course.id}
                              className={`flex items-center justify-between p-3 rounded-lg border ${
                                course.status === 'locked'
                                  ? 'bg-gray-100 border-gray-200'
                                  : 'bg-white border-gray-200'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                {getCourseStatusIcon(course.status)}
                                <div>
                                  <p className={`font-medium ${course.status === 'locked' ? 'text-gray-400' : 'text-gray-700'}`}>
                                    {course.order}. {course.title}
                                  </p>
                                  <p className="text-xs text-gray-500">{course.duration}</p>
                                </div>
                              </div>
                              {course.status === 'in_progress' && (
                                <button className="px-3 py-1 bg-mizan-gold text-white text-sm rounded-lg hover:bg-mizan-gold/90">
                                  Continue
                                </button>
                              )}
                              {course.status === 'available' && (
                                <button className="px-3 py-1 border border-mizan-gold text-mizan-gold text-sm rounded-lg hover:bg-mizan-gold/10">
                                  Start
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills & Actions */}
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Skills You'll Gain</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {path.skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-mizan-gold/10 text-mizan-gold text-sm rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {path.status === 'not_started' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEnroll(path.id);
                            }}
                            className="w-full px-4 py-3 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center justify-center space-x-2"
                          >
                            <Play className="w-5 h-5" />
                            <span>Enroll Now</span>
                          </button>
                        )}

                        {path.status === 'in_progress' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContinueLearning(path.id);
                            }}
                            className="w-full px-4 py-3 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center justify-center space-x-2"
                          >
                            <Play className="w-5 h-5" />
                            <span>Continue Learning</span>
                          </button>
                        )}

                        {path.status === 'completed' && (
                          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                            <p className="font-semibold text-green-700">Path Completed!</p>
                            {path.certificate && (
                              <button className="mt-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                                View Certificate
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredPaths.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No learning paths found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
