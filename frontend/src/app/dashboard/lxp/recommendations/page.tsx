'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Filter,
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
  TrendingUp,
  Zap,
  Brain,
  Lightbulb,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Loader2,
  GraduationCap,
  Compass,
  Route,
  Briefcase,
  UserCheck,
  Calendar,
  Gift,
  Flame,
  Crown,
  Shield,
  Code,
  Megaphone,
  PieChart,
  Settings,
  Eye,
  EyeOff,
  Heart,
  Share2,
  Plus
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface RecommendedCourse {
  id: string;
  title: string;
  shortDescription: string;
  instructor: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number;
  rating: number;
  totalRatings: number;
  enrollments: number;
  price: number;
  isFree: boolean;
  matchScore: number;
  matchReasons: string[];
  skills: string[];
  tags: string[];
  isTrending: boolean;
  isNew: boolean;
  isSaved: boolean;
  feedbackGiven?: 'liked' | 'disliked';
}

interface SkillGap {
  id: string;
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  gapSize: number;
  priority: 'high' | 'medium' | 'low';
  relatedCourses: string[];
  reason: string;
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  currentRole: string;
  targetRole: string;
  estimatedTime: string;
  requiredSkills: string[];
  coursesRequired: number;
  coursesCompleted: number;
  progress: number;
}

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  relatedCourses: string[];
  status: 'on_track' | 'at_risk' | 'behind' | 'completed';
}

interface RecommendationPreferences {
  focusAreas: string[];
  excludedCategories: string[];
  preferredDuration: 'short' | 'medium' | 'long' | 'any';
  preferredLevel: string[];
  learningStyle: 'video' | 'reading' | 'interactive' | 'mixed';
  weeklyTimeCommitment: number;
}

const defaultPreferences: RecommendationPreferences = {
  focusAreas: ['Leadership', 'Technology', 'Analytics'],
  excludedCategories: [],
  preferredDuration: 'any',
  preferredLevel: ['intermediate', 'advanced'],
  learningStyle: 'mixed',
  weeklyTimeCommitment: 5
};

const categories = [
  'Leadership', 'Technology', 'Analytics', 'Communication',
  'Project Management', 'Soft Skills', 'Finance', 'Marketing'
];

function RecommendationsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [recommendations, setRecommendations] = useState<RecommendedCourse[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [preferences, setPreferences] = useState<RecommendationPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter states
  const [activeTab, setActiveTab] = useState<'for_you' | 'skill_gaps' | 'career_path' | 'goals' | 'trending'>('for_you');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      interface ApiRecommendation {
        id: string;
        title: string;
        description: string;
        category: string;
        level: string;
        duration: number;
        provider: string;
        skills: string[];
        matchScore: number;
        reason: string;
        thumbnailUrl: string;
      }

      interface ApiSkillGap {
        skill: string;
        currentLevel: number;
        targetLevel: number;
        gap: number;
      }

      interface ApiGoal {
        id: string;
        title: string;
        description: string;
        targetDate: string;
        progress: number;
      }

      interface ApiResponse {
        recommendations: ApiRecommendation[];
        skillGaps: ApiSkillGap[];
        careerPaths: CareerPath[];
        goals: ApiGoal[];
      }

      const response = await apiClient.get('/api/lxp/recommendations');
      const data = response.data as ApiResponse;

      // Transform recommendations
      const transformedRecommendations: RecommendedCourse[] = (data.recommendations || []).map((r: ApiRecommendation) => ({
        id: r.id,
        title: r.title,
        shortDescription: r.description?.substring(0, 100) || '',
        instructor: r.provider || 'Internal',
        category: r.category || 'General',
        level: (r.level || 'intermediate') as RecommendedCourse['level'],
        duration: r.duration || 60,
        rating: 4.5,
        totalRatings: 0,
        enrollments: 0,
        price: 0,
        isFree: true,
        matchScore: r.matchScore || 80,
        matchReasons: [r.reason || 'Recommended based on your profile'],
        skills: r.skills || [],
        tags: r.skills || [],
        isTrending: r.matchScore >= 90,
        isNew: false,
        isSaved: false
      }));

      setRecommendations(transformedRecommendations);

      // Transform skill gaps
      const transformedSkillGaps: SkillGap[] = (data.skillGaps || []).map((sg: ApiSkillGap, idx: number) => ({
        id: `gap-${idx}`,
        skillName: sg.skill,
        currentLevel: sg.currentLevel,
        targetLevel: sg.targetLevel,
        gapSize: sg.gap,
        priority: sg.gap >= 2 ? 'high' : sg.gap >= 1 ? 'medium' : 'low' as SkillGap['priority'],
        relatedCourses: transformedRecommendations
          .filter(r => r.skills.some(s => s.toLowerCase().includes(sg.skill.toLowerCase())))
          .map(r => r.id),
        reason: `Identified gap in ${sg.skill}`
      }));

      setSkillGaps(transformedSkillGaps);

      // Career paths - use from API or empty array
      setCareerPaths(data.careerPaths || []);

      // Transform goals
      const transformedGoals: LearningGoal[] = (data.goals || []).map((g: ApiGoal) => ({
        id: g.id,
        title: g.title,
        description: g.description || '',
        targetDate: g.targetDate || new Date().toISOString(),
        progress: g.progress || 0,
        relatedCourses: [],
        status: g.progress >= 100 ? 'completed' : g.progress >= 50 ? 'on_track' : g.progress >= 25 ? 'at_risk' : 'behind' as LearningGoal['status']
      }));

      setGoals(transformedGoals);
    } catch (error) {
      logger.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshRecommendations = async () => {
    setRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulate refreshed recommendations with slightly different scores
      setRecommendations(prev => prev.map(rec => ({
        ...rec,
        matchScore: Math.min(100, rec.matchScore + Math.floor(Math.random() * 5) - 2)
      })).sort((a, b) => b.matchScore - a.matchScore));
    } finally {
      setRefreshing(false);
    }
  };

  const handleFeedback = (courseId: string, feedback: 'liked' | 'disliked') => {
    setRecommendations(prev => prev.map(rec =>
      rec.id === courseId
        ? { ...rec, feedbackGiven: rec.feedbackGiven === feedback ? undefined : feedback }
        : rec
    ));
  };

  const handleSave = (courseId: string) => {
    setRecommendations(prev => prev.map(rec =>
      rec.id === courseId ? { ...rec, isSaved: !rec.isSaved } : rec
    ));
  };

  const handleEnroll = (courseId: string) => {
    router.push(`/dashboard/lxp/courses/${courseId}`);
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'on_track': return 'bg-green-100 text-green-800';
      case 'at_risk': return 'bg-yellow-100 text-yellow-800';
      case 'behind': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const filteredRecommendations = recommendations.filter(rec => {
    if (categoryFilter !== 'all' && rec.category !== categoryFilter) return false;
    if (activeTab === 'trending') return rec.isTrending;
    return true;
  });

  // Stats
  const savedCount = recommendations.filter(r => r.isSaved).length;
  const highMatchCount = recommendations.filter(r => r.matchScore >= 90).length;
  const trendingCount = recommendations.filter(r => r.isTrending).length;
  const highPriorityGaps = skillGaps.filter(g => g.priority === 'high').length;

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
            <Sparkles className="w-8 h-8 text-mizan-gold" />
            <h1 className="text-3xl font-bold text-gray-900">Recommendations</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreferences(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5" />
              Preferences
            </button>
            <button
              onClick={refreshRecommendations}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
        <p className="text-gray-600">Personalized course recommendations based on your goals and skill gaps</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">High Match</span>
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{highMatchCount}</div>
          <div className="text-xs text-gray-500 mt-1">90%+ match score</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Skill Gaps</span>
            <Brain className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{highPriorityGaps}</div>
          <div className="text-xs text-gray-500 mt-1">High priority to address</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Trending</span>
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{trendingCount}</div>
          <div className="text-xs text-gray-500 mt-1">Popular courses now</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Saved</span>
            <Bookmark className="w-5 h-5 text-mizan-gold" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{savedCount}</div>
          <div className="text-xs text-gray-500 mt-1">For later review</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {[
            { id: 'for_you', label: 'For You', icon: Sparkles },
            { id: 'skill_gaps', label: 'Skill Gaps', icon: Brain },
            { id: 'career_path', label: 'Career Path', icon: Route },
            { id: 'goals', label: 'Your Goals', icon: Target },
            { id: 'trending', label: 'Trending', icon: Flame }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
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
          {/* For You / Trending Tab */}
          {(activeTab === 'for_you' || activeTab === 'trending') && (
            <div>
              {/* Category Filter */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-gray-600">Filter by:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      categoryFilter === 'all'
                        ? 'bg-mizan-gold text-mizan-primary'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        categoryFilter === cat
                          ? 'bg-mizan-gold text-mizan-primary'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendations Grid */}
              <div className="space-y-4">
                {filteredRecommendations.map((course, idx) => (
                  <div
                    key={course.id}
                    className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-6">
                      {/* Match Score */}
                      <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${getMatchScoreColor(course.matchScore)}`}>
                        <span className="text-2xl font-bold">{course.matchScore}</span>
                        <span className="text-xs">match</span>
                      </div>

                      {/* Course Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${getLevelColor(course.level)}`}>
                            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          </span>
                          {course.isTrending && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                              <Flame className="w-3 h-3" />
                              Trending
                            </span>
                          )}
                          {course.isNew && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                              New
                            </span>
                          )}
                          {course.isFree && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                              Free
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{course.shortDescription}</p>

                        {/* Match Reasons */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {course.matchReasons.map((reason, idx) => (
                            <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-mizan-gold/10 text-mizan-primary text-xs rounded">
                              <Lightbulb className="w-3 h-3" />
                              {reason}
                            </span>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{course.instructor}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDuration(course.duration)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            {course.rating} ({course.totalRatings.toLocaleString()})
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.enrollments.toLocaleString()} enrolled
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          {!course.isFree && (
                            <span className="text-xl font-bold text-gray-900">${course.price}</span>
                          )}
                          {course.isFree && (
                            <span className="text-xl font-bold text-green-600">Free</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleEnroll(course.id)}
                          className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                        >
                          Enroll Now
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSave(course.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              course.isSaved
                                ? 'bg-mizan-gold/20 text-mizan-primary'
                                : 'hover:bg-gray-200 text-gray-400'
                            }`}
                            title={course.isSaved ? 'Remove from saved' : 'Save for later'}
                          >
                            {course.isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                          </button>
                          <button
                            onClick={() => handleFeedback(course.id, 'liked')}
                            className={`p-2 rounded-lg transition-colors ${
                              course.feedbackGiven === 'liked'
                                ? 'bg-green-100 text-green-600'
                                : 'hover:bg-gray-200 text-gray-400'
                            }`}
                            title="More like this"
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(course.id, 'disliked')}
                            className={`p-2 rounded-lg transition-colors ${
                              course.feedbackGiven === 'disliked'
                                ? 'bg-red-100 text-red-600'
                                : 'hover:bg-gray-200 text-gray-400'
                            }`}
                            title="Less like this"
                          >
                            <ThumbsDown className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Skills you'll gain:</span>
                        {course.skills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-white text-gray-600 text-xs rounded border border-gray-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredRecommendations.length === 0 && (
                <div className="text-center py-12">
                  <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommendations found</h3>
                  <p className="text-gray-600">Try adjusting your filters or preferences</p>
                </div>
              )}
            </div>
          )}

          {/* Skill Gaps Tab */}
          {activeTab === 'skill_gaps' && (
            <div>
              <div className="mb-6">
                <p className="text-gray-600">
                  These skill gaps have been identified based on your career goals and current skill assessments.
                  Addressing high-priority gaps will accelerate your career progression.
                </p>
              </div>

              <div className="space-y-4">
                {skillGaps.map(gap => (
                  <div key={gap.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{gap.skillName}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPriorityColor(gap.priority)}`}>
                            {gap.priority.charAt(0).toUpperCase() + gap.priority.slice(1)} Priority
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{gap.reason}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Gap Size</div>
                        <div className="text-2xl font-bold text-red-600">+{gap.gapSize} levels</div>
                      </div>
                    </div>

                    {/* Level Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Current: Level {gap.currentLevel}</span>
                        <span className="text-mizan-primary font-medium">Target: Level {gap.targetLevel}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-3 flex-1 rounded ${
                              idx < gap.currentLevel
                                ? 'bg-mizan-gold'
                                : idx < gap.targetLevel
                                ? 'bg-gray-300'
                                : 'bg-gray-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Related Courses */}
                    {gap.relatedCourses.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Recommended courses to close this gap:</div>
                        <div className="space-y-2">
                          {gap.relatedCourses.map(courseId => {
                            const course = recommendations.find(r => r.id === courseId);
                            if (!course) return null;
                            return (
                              <div key={courseId} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getMatchScoreColor(course.matchScore)}`}>
                                    <span className="text-sm font-bold">{course.matchScore}</span>
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{course.title}</div>
                                    <div className="text-xs text-gray-500">{course.instructor} • {formatDuration(course.duration)}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleEnroll(course.id)}
                                  className="px-3 py-1.5 bg-mizan-gold text-mizan-primary rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors"
                                >
                                  Enroll
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Path Tab */}
          {activeTab === 'career_path' && (
            <div>
              <div className="mb-6">
                <p className="text-gray-600">
                  Track your progress toward your career goals. These paths are customized based on your current role,
                  skills, and aspirations.
                </p>
              </div>

              <div className="space-y-6">
                {careerPaths.map(path => (
                  <div key={path.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{path.title}</h3>
                        <p className="text-sm text-gray-600">{path.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-mizan-primary">{Math.round(path.progress)}%</div>
                        <div className="text-xs text-gray-500">Complete</div>
                      </div>
                    </div>

                    {/* Journey Visualization */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg">
                        <UserCheck className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">{path.currentRole}</span>
                      </div>
                      <div className="flex-1 relative">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-mizan-gold to-yellow-400 rounded-full transition-all"
                            style={{ width: `${path.progress}%` }}
                          />
                        </div>
                        <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-mizan-gold/20 rounded-lg">
                        <Crown className="w-5 h-5 text-mizan-primary" />
                        <span className="font-medium text-mizan-primary">{path.targetRole}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                        <div className="text-lg font-bold text-gray-900">{path.coursesCompleted}/{path.coursesRequired}</div>
                        <div className="text-xs text-gray-500">Courses Completed</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                        <div className="text-lg font-bold text-gray-900">{path.estimatedTime}</div>
                        <div className="text-xs text-gray-500">Estimated Time</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                        <div className="text-lg font-bold text-gray-900">{path.requiredSkills.length}</div>
                        <div className="text-xs text-gray-500">Skills Required</div>
                      </div>
                    </div>

                    {/* Required Skills */}
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Required skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {path.requiredSkills.map(skill => (
                          <span key={skill} className="px-3 py-1 bg-white text-gray-600 text-sm rounded-full border border-gray-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="flex items-center gap-2 text-mizan-primary font-medium hover:underline">
                        View full career path
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Track progress toward your personal learning goals.
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                  <Plus className="w-5 h-5" />
                  Add Goal
                </button>
              </div>

              <div className="space-y-4">
                {goals.map(goal => (
                  <div key={goal.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(goal.status)}`}>
                            {goal.status === 'on_track' ? 'On Track' :
                             goal.status === 'at_risk' ? 'At Risk' :
                             goal.status === 'behind' ? 'Behind' : 'Completed'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{goal.progress}%</div>
                        <div className="text-xs text-gray-500">Complete</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            goal.status === 'completed' ? 'bg-green-500' :
                            goal.status === 'at_risk' ? 'bg-yellow-500' :
                            goal.status === 'behind' ? 'bg-red-500' :
                            'bg-mizan-gold'
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Target Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Target: {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        <span>{goal.relatedCourses.length} related courses</span>
                      </div>
                    </div>

                    {/* Related Courses */}
                    {goal.relatedCourses.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600 mb-2">Related courses:</div>
                        <div className="flex flex-wrap gap-2">
                          {goal.relatedCourses.map(courseId => {
                            const course = recommendations.find(r => r.id === courseId);
                            if (!course) return null;
                            return (
                              <button
                                key={courseId}
                                onClick={() => handleEnroll(courseId)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-sm hover:border-mizan-gold transition-colors"
                              >
                                <span className="font-medium text-gray-700">{course.title}</span>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {goals.length === 0 && (
                <div className="text-center py-12">
                  <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No learning goals yet</h3>
                  <p className="text-gray-600 mb-4">Set goals to track your learning progress</p>
                  <button className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                    Create Your First Goal
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recommendation Preferences</h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Focus Areas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
                <p className="text-xs text-gray-500 mb-3">Select categories you want to focus on</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setPreferences(prev => ({
                          ...prev,
                          focusAreas: prev.focusAreas.includes(cat)
                            ? prev.focusAreas.filter(c => c !== cat)
                            : [...prev.focusAreas, cat]
                        }));
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        preferences.focusAreas.includes(cat)
                          ? 'bg-mizan-gold text-mizan-primary'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Level</label>
                <p className="text-xs text-gray-500 mb-3">Select difficulty levels that suit you</p>
                <div className="flex flex-wrap gap-2">
                  {['beginner', 'intermediate', 'advanced', 'expert'].map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        setPreferences(prev => ({
                          ...prev,
                          preferredLevel: prev.preferredLevel.includes(level)
                            ? prev.preferredLevel.filter(l => l !== level)
                            : [...prev.preferredLevel, level]
                        }));
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                        preferences.preferredLevel.includes(level)
                          ? 'bg-mizan-gold text-mizan-primary'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Duration Preference</label>
                <select
                  value={preferences.preferredDuration}
                  onChange={(e) => setPreferences(prev => ({ ...prev, preferredDuration: e.target.value as RecommendationPreferences['preferredDuration'] }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                >
                  <option value="any">Any Duration</option>
                  <option value="short">Short (under 2 hours)</option>
                  <option value="medium">Medium (2-8 hours)</option>
                  <option value="long">Long (8+ hours)</option>
                </select>
              </div>

              {/* Learning Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Style</label>
                <select
                  value={preferences.learningStyle}
                  onChange={(e) => setPreferences(prev => ({ ...prev, learningStyle: e.target.value as RecommendationPreferences['learningStyle'] }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                >
                  <option value="mixed">Mixed (All formats)</option>
                  <option value="video">Primarily Video</option>
                  <option value="reading">Primarily Reading</option>
                  <option value="interactive">Primarily Interactive</option>
                </select>
              </div>

              {/* Weekly Time Commitment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weekly Time Commitment: {preferences.weeklyTimeCommitment} hours
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={preferences.weeklyTimeCommitment}
                  onChange={(e) => setPreferences(prev => ({ ...prev, weeklyTimeCommitment: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mizan-gold"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 hour</span>
                  <span>20 hours</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setPreferences(defaultPreferences);
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={() => {
                  setShowPreferences(false);
                  refreshRecommendations();
                }}
                className="px-6 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Save & Refresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-mizan-gold" /></div>}>
      <RecommendationsPageContent />
    </Suspense>
  );
}
