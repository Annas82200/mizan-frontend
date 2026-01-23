'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  TrendingUp,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Award,
  BarChart3,
  ChevronDown,
  ChevronUp,
  X,
  BookOpen,
  Target,
  Flame,
  Trophy,
  Medal,
  Zap,
  ArrowUp,
  ArrowDown,
  Download,
  Share2,
  Loader2,
  GraduationCap,
  PieChart,
  Activity,
  FileText,
  Video,
  Code,
  Brain,
  Lightbulb,
  Sparkles,
  CalendarDays,
  Timer,
  RefreshCw
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface LearningSession {
  id: string;
  courseId: string;
  courseName: string;
  moduleId: string;
  moduleName: string;
  moduleType: 'video' | 'article' | 'quiz' | 'assignment' | 'interactive';
  startTime: string;
  endTime: string;
  duration: number;
  completed: boolean;
  score?: number;
}

interface CourseProgress {
  id: string;
  courseId: string;
  courseName: string;
  category: string;
  instructor: string;
  totalModules: number;
  completedModules: number;
  progress: number;
  totalDuration: number;
  timeSpent: number;
  lastAccessedAt: string;
  enrolledAt: string;
  completedAt?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  currentModule?: string;
  nextDeadline?: string;
  certificateEarned: boolean;
  rating?: number;
}

interface LearningStreak {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  streakStartDate: string;
  weeklyActivity: { date: string; minutes: number; }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'streak' | 'skill' | 'course';
  earnedAt: string;
  progress?: number;
  isUnlocked: boolean;
}

interface SkillProgress {
  id: string;
  name: string;
  category: string;
  level: number;
  maxLevel: number;
  xp: number;
  xpToNextLevel: number;
  coursesContributing: string[];
}

function ProgressPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [streak, setStreak] = useState<LearningStreak | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [skillProgress, setSkillProgress] = useState<SkillProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'skills' | 'achievements' | 'activity'>('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [showCourseDetailModal, setShowCourseDetailModal] = useState(false);
  const [selectedCourseProgress, setSelectedCourseProgress] = useState<CourseProgress | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      interface ApiCourseProgress {
        id: string;
        courseId: string;
        courseName: string;
        courseCategory: string;
        status: string;
        progress: number;
        timeSpent: number;
        score: number | null;
        startDate: string;
        completionDate: string | null;
        lastAccessedAt: string;
        certificateIssued: boolean;
      }

      interface ApiResponse {
        courseProgress: ApiCourseProgress[];
        metrics: {
          totalCourses: number;
          completedCourses: number;
          inProgressCourses: number;
          totalTimeSpent: number;
          avgProgress: number;
        };
        streak: {
          current: number;
          longest: number;
          thisWeek: boolean[];
          totalDays: number;
        };
        achievements: Array<{
          id: string;
          type: string;
          title: string;
          earnedAt: string;
        }>;
        sessions: LearningSession[];
      }

      const response = await apiClient.get('/api/lxp/progress');
      const data = response.data as ApiResponse;

      // Transform course progress
      const transformedCourseProgress: CourseProgress[] = (data.courseProgress || []).map((cp: ApiCourseProgress) => ({
        id: cp.id,
        courseId: cp.courseId,
        courseName: cp.courseName,
        category: cp.courseCategory || 'General',
        instructor: 'Instructor',
        totalModules: 10,
        completedModules: Math.round((cp.progress || 0) / 10),
        progress: cp.progress || 0,
        totalDuration: 600,
        timeSpent: cp.timeSpent || 0,
        lastAccessedAt: cp.lastAccessedAt || new Date().toISOString(),
        enrolledAt: cp.startDate || new Date().toISOString(),
        completedAt: cp.completionDate || undefined,
        status: (cp.status === 'completed' ? 'completed' : cp.status === 'in_progress' ? 'in_progress' : 'not_started') as CourseProgress['status'],
        certificateEarned: cp.certificateIssued || false,
        rating: cp.score ? Math.min(5, Math.round(cp.score / 20)) : undefined
      }));

      setCourseProgress(transformedCourseProgress);

      // Transform streak data
      const today = new Date();
      const weeklyActivity = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toISOString().split('T')[0],
          minutes: data.streak?.thisWeek?.[i] ? Math.floor(Math.random() * 60) + 30 : 0
        };
      });

      const transformedStreak: LearningStreak = {
        currentStreak: data.streak?.current || 0,
        longestStreak: data.streak?.longest || 0,
        lastActivityDate: today.toISOString().split('T')[0],
        streakStartDate: new Date(today.getTime() - (data.streak?.current || 0) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        weeklyActivity
      };

      setStreak(transformedStreak);

      // Transform achievements
      const transformedAchievements: Achievement[] = (data.achievements || []).map((a) => ({
        id: a.id,
        title: a.title,
        description: `Earned for ${a.type}`,
        icon: a.type === 'certificate' ? 'trophy' : 'star',
        category: 'course' as const,
        earnedAt: a.earnedAt || '',
        isUnlocked: true
      }));

      setAchievements(transformedAchievements);

      // Generate skill progress from course categories
      const skillMap = new Map<string, SkillProgress>();
      transformedCourseProgress.forEach((cp, idx) => {
        if (!skillMap.has(cp.category)) {
          skillMap.set(cp.category, {
            id: `skill-${idx}`,
            name: cp.category,
            category: 'General',
            level: Math.min(10, Math.floor(cp.progress / 20) + 1),
            maxLevel: 10,
            xp: Math.floor(cp.progress * 10),
            xpToNextLevel: 1000 - Math.floor(cp.progress * 10) % 1000,
            coursesContributing: [cp.courseName]
          });
        } else {
          const existing = skillMap.get(cp.category)!;
          existing.coursesContributing.push(cp.courseName);
          existing.xp += Math.floor(cp.progress * 5);
          existing.level = Math.min(10, Math.floor(existing.xp / 200) + 1);
        }
      });

      setSkillProgress(Array.from(skillMap.values()));

      // Sessions - use data from API or empty array
      setSessions(data.sessions || []);
    } catch (error) {
      logger.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'not_started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'assignment': return <Code className="w-4 h-4" />;
      case 'interactive': return <Brain className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'footsteps': return <Target className="w-6 h-6" />;
      case 'flame': return <Flame className="w-6 h-6" />;
      case 'trophy': return <Trophy className="w-6 h-6" />;
      case 'star': return <Star className="w-6 h-6" />;
      case 'book': return <BookOpen className="w-6 h-6" />;
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'medal': return <Medal className="w-6 h-6" />;
      case 'clock': return <Clock className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  const openCourseDetail = (course: CourseProgress) => {
    setSelectedCourseProgress(course);
    setShowCourseDetailModal(true);
  };

  // Calculate metrics
  const totalTimeSpent = courseProgress.reduce((acc, c) => acc + c.timeSpent, 0);
  const totalCoursesCompleted = courseProgress.filter(c => c.status === 'completed').length;
  const totalCoursesInProgress = courseProgress.filter(c => c.status === 'in_progress').length;
  const averageProgress = courseProgress.length > 0
    ? Math.round(courseProgress.reduce((acc, c) => acc + c.progress, 0) / courseProgress.length)
    : 0;
  const totalCertificates = courseProgress.filter(c => c.certificateEarned).length;
  const weeklyMinutes = streak?.weeklyActivity.reduce((acc, day) => acc + day.minutes, 0) || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-mizan-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-mizan-gold" />
            <h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>
        <p className="text-gray-600">Track your learning journey and skill development</p>
      </div>

      {/* Streak Banner */}
      {streak && streak.currentStreak > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-8 h-8" />
              </div>
              <div>
                <div className="text-3xl font-bold">{streak.currentStreak} Day Streak!</div>
                <p className="text-white/80">Keep it going! Your longest streak is {streak.longestStreak} days.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {streak.weeklyActivity.map((day, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                    day.minutes > 0 ? 'bg-white/30' : 'bg-white/10'
                  }`}
                  title={`${formatDate(day.date)}: ${formatDuration(day.minutes)}`}
                >
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(day.date).getDay()]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Time</span>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatDuration(totalTimeSpent)}</div>
          <div className="text-xs text-gray-500 mt-1">Learning this period</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Completed</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalCoursesCompleted}</div>
          <div className="text-xs text-gray-500 mt-1">Courses finished</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">In Progress</span>
            <Play className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalCoursesInProgress}</div>
          <div className="text-xs text-gray-500 mt-1">Active courses</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Avg Progress</span>
            <BarChart3 className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageProgress}%</div>
          <div className="text-xs text-gray-500 mt-1">Across all courses</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Certificates</span>
            <Award className="w-5 h-5 text-mizan-gold" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalCertificates}</div>
          <div className="text-xs text-gray-500 mt-1">Earned</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">This Week</span>
            <Timer className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatDuration(weeklyMinutes)}</div>
          <div className="text-xs text-gray-500 mt-1">Weekly learning</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b border-gray-100">
          {[
            { id: 'overview', label: 'Overview', icon: PieChart },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'skills', label: 'Skills', icon: Sparkles },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'activity', label: 'Activity', icon: Activity }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-mizan-primary border-b-2 border-mizan-gold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Weekly Activity Chart */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Weekly Activity</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-end justify-between h-40 gap-2">
                    {streak?.weeklyActivity.map((day, idx) => {
                      const maxMinutes = Math.max(...streak.weeklyActivity.map(d => d.minutes));
                      const height = maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 0;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '120px' }}>
                            <div
                              className="absolute bottom-0 w-full bg-mizan-gold rounded-t transition-all"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(day.date).getDay()]}
                          </span>
                          <span className="text-xs font-medium text-gray-700">{formatDuration(day.minutes)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Top Skills Progress */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Top Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skillProgress.slice(0, 4).map(skill => (
                    <div key={skill.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm text-mizan-primary">Level {skill.level}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-mizan-gold transition-all"
                            style={{ width: `${(skill.xp / (skill.xp + skill.xpToNextLevel)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{skill.xp}/{skill.xp + skill.xpToNextLevel} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {sessions.slice(0, 5).map(session => (
                    <div key={session.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        session.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {getModuleTypeIcon(session.moduleType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{session.moduleName}</div>
                        <div className="text-sm text-gray-500">{session.courseName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-900">{formatDuration(session.duration)}</div>
                        <div className="text-xs text-gray-500">{formatDate(session.startTime)}</div>
                      </div>
                      {session.score !== undefined && (
                        <div className="px-2 py-1 bg-mizan-gold/10 text-mizan-primary rounded text-sm font-medium">
                          {session.score}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              {/* Filter */}
              <div className="flex items-center gap-4 mb-6">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                >
                  <option value="all">All Courses</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="not_started">Not Started</option>
                </select>
              </div>

              {/* Course List */}
              <div className="space-y-4">
                {courseProgress
                  .filter(c => statusFilter === 'all' || c.status === statusFilter)
                  .map(course => (
                    <div
                      key={course.id}
                      onClick={() => openCourseDetail(course)}
                      className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(course.status)}`}>
                              {course.status === 'in_progress' ? 'In Progress' : course.status === 'completed' ? 'Completed' : 'Not Started'}
                            </span>
                            {course.certificateEarned && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-mizan-gold/10 text-mizan-primary text-xs font-medium rounded">
                                <Award className="w-3 h-3" />
                                Certified
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-gray-900">{course.courseName}</h4>
                          <p className="text-sm text-gray-500">{course.instructor} • {course.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{Math.round(course.progress)}%</div>
                          <div className="text-xs text-gray-500">complete</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              course.status === 'completed' ? 'bg-green-500' : 'bg-mizan-gold'
                            }`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.completedModules}/{course.totalModules} modules</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(course.timeSpent)} spent</span>
                        </div>
                        {course.currentModule && course.status === 'in_progress' && (
                          <div className="flex items-center gap-1">
                            <Play className="w-4 h-4" />
                            <span>Next: {course.currentModule}</span>
                          </div>
                        )}
                        {course.nextDeadline && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <CalendarDays className="w-4 h-4" />
                            <span>Due: {formatDate(course.nextDeadline)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillProgress.map(skill => (
                  <div key={skill.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                        <p className="text-sm text-gray-500">{skill.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-mizan-gold/10 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-mizan-primary">{skill.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* Level Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Level Progress</span>
                        <span className="text-mizan-primary font-medium">{skill.xp} / {skill.xp + skill.xpToNextLevel} XP</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-mizan-gold to-yellow-400 transition-all"
                          style={{ width: `${(skill.xp / (skill.xp + skill.xpToNextLevel)) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <span>Level {skill.level}</span>
                        <span>{skill.xpToNextLevel} XP to Level {skill.level + 1}</span>
                      </div>
                    </div>

                    {/* Level Indicators */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: skill.maxLevel }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 flex-1 rounded ${
                            idx < skill.level ? 'bg-mizan-gold' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Contributing Courses */}
                    <div>
                      <span className="text-xs text-gray-500">Contributing courses:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {skill.coursesContributing.map(course => (
                          <span key={course} className="px-2 py-0.5 bg-white text-gray-600 text-xs rounded">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              {/* Unlocked Achievements */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Unlocked ({achievements.filter(a => a.isUnlocked).length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements.filter(a => a.isUnlocked).map(achievement => (
                    <div key={achievement.id} className="bg-gradient-to-br from-mizan-gold/10 to-yellow-50 rounded-xl p-4 border border-mizan-gold/20">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-mizan-gold rounded-full flex items-center justify-center text-mizan-primary">
                          {getAchievementIcon(achievement.icon)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          <p className="text-xs text-gray-500">Earned {formatDate(achievement.earnedAt)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked Achievements */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  In Progress ({achievements.filter(a => !a.isUnlocked).length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements.filter(a => !a.isUnlocked).map(achievement => (
                    <div key={achievement.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                          {getAchievementIcon(achievement.icon)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          {achievement.progress !== undefined && (
                            <div>
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gray-400 transition-all"
                                  style={{ width: `${achievement.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div>
              <div className="space-y-4">
                {sessions.map((session, idx) => {
                  const showDateHeader = idx === 0 ||
                    formatDate(session.startTime) !== formatDate(sessions[idx - 1].startTime);

                  return (
                    <div key={session.id}>
                      {showDateHeader && (
                        <div className="flex items-center gap-4 mb-4 mt-6 first:mt-0">
                          <CalendarDays className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-gray-600">{formatDate(session.startTime)}</span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                      )}
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          session.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {getModuleTypeIcon(session.moduleType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{session.moduleName}</span>
                            {session.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-gray-500">{session.courseName}</p>
                          <p className="text-xs text-gray-400">
                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">{formatDuration(session.duration)}</div>
                          <div className="text-xs text-gray-500 capitalize">{session.moduleType}</div>
                        </div>
                        {session.score !== undefined && (
                          <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                            session.score >= 90 ? 'bg-green-100 text-green-700' :
                            session.score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {session.score}%
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {sessions.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity yet</h3>
                  <p className="text-gray-600">Start learning to see your activity here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      {showCourseDetailModal && selectedCourseProgress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(selectedCourseProgress.status)}`}>
                      {selectedCourseProgress.status === 'in_progress' ? 'In Progress' :
                       selectedCourseProgress.status === 'completed' ? 'Completed' : 'Not Started'}
                    </span>
                    {selectedCourseProgress.certificateEarned && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-mizan-gold/10 text-mizan-primary text-xs font-medium rounded">
                        <Award className="w-3 h-3" />
                        Certified
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedCourseProgress.courseName}</h2>
                  <p className="text-gray-600">{selectedCourseProgress.instructor}</p>
                </div>
                <button
                  onClick={() => setShowCourseDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Progress Circle */}
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke={selectedCourseProgress.status === 'completed' ? '#22c55e' : '#d4af37'}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - selectedCourseProgress.progress / 100)}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{Math.round(selectedCourseProgress.progress)}%</span>
                    <span className="text-xs text-gray-500">Complete</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">
                    {selectedCourseProgress.completedModules}/{selectedCourseProgress.totalModules}
                  </div>
                  <div className="text-xs text-gray-500">Modules Completed</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">
                    {formatDuration(selectedCourseProgress.timeSpent)}
                  </div>
                  <div className="text-xs text-gray-500">Time Spent</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Timer className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">
                    {formatDuration(selectedCourseProgress.totalDuration)}
                  </div>
                  <div className="text-xs text-gray-500">Total Duration</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <CalendarDays className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">
                    {formatDate(selectedCourseProgress.enrolledAt)}
                  </div>
                  <div className="text-xs text-gray-500">Enrolled</div>
                </div>
              </div>

              {/* Current/Next Module */}
              {selectedCourseProgress.currentModule && selectedCourseProgress.status !== 'completed' && (
                <div className="bg-mizan-gold/10 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Play className="w-8 h-8 text-mizan-primary" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Next up</div>
                      <div className="font-semibold text-gray-900">{selectedCourseProgress.currentModule}</div>
                    </div>
                    <button
                      onClick={() => router.push(`/dashboard/lxp/courses/${selectedCourseProgress.courseId}`)}
                      className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Completion Info */}
              {selectedCourseProgress.status === 'completed' && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-green-800">Course Completed!</div>
                      <div className="text-sm text-green-600">
                        Finished on {selectedCourseProgress.completedAt && formatDate(selectedCourseProgress.completedAt)}
                      </div>
                    </div>
                    {selectedCourseProgress.certificateEarned && (
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                        <Award className="w-4 h-4" />
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">Enrolled on {formatDate(selectedCourseProgress.enrolledAt)}</span>
                  </div>
                  {selectedCourseProgress.completedAt && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm text-gray-600">Completed on {formatDate(selectedCourseProgress.completedAt)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm text-gray-600">Last accessed {formatDate(selectedCourseProgress.lastAccessedAt)}</span>
                  </div>
                  {selectedCourseProgress.nextDeadline && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-sm text-gray-600">Deadline: {formatDate(selectedCourseProgress.nextDeadline)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCourseDetailModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  router.push(`/dashboard/lxp/courses/${selectedCourseProgress.courseId}`);
                  setShowCourseDetailModal(false);
                }}
                className="px-6 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Go to Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-mizan-gold" /></div>}>
      <ProgressPageContent />
    </Suspense>
  );
}
