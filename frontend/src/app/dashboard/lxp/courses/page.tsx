'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Filter,
  Plus,
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
  Edit,
  Trash2,
  Eye,
  Video,
  FileText,
  Code,
  Download,
  Share2,
  Heart,
  BookmarkPlus,
  Loader2,
  GraduationCap,
  Target,
  TrendingUp,
  Calendar,
  Globe,
  Lock,
  Unlock,
  PlayCircle,
  PauseCircle,
  SkipForward,
  List,
  Grid3X3,
  SlidersHorizontal,
  Tag
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface CourseModule {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz' | 'assignment' | 'interactive';
  duration: number;
  isCompleted: boolean;
  isLocked: boolean;
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  instructor: string;
  instructorTitle: string;
  instructorAvatar: string;
  category: string;
  subcategory: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number;
  modules: CourseModule[];
  totalModules: number;
  completedModules: number;
  rating: number;
  totalRatings: number;
  enrollments: number;
  price: number;
  isFree: boolean;
  thumbnail: string;
  tags: string[];
  skills: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  language: string;
  hasSubtitles: boolean;
  subtitleLanguages: string[];
  certificateOffered: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  lastUpdated: string;
  createdAt: string;
  enrollmentStatus: 'not_enrolled' | 'enrolled' | 'in_progress' | 'completed';
  progress: number;
  completionDate?: string;
  certificateId?: string;
}

interface CourseFormData {
  title: string;
  description: string;
  shortDescription: string;
  instructor: string;
  instructorTitle: string;
  category: string;
  subcategory: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number;
  price: number;
  isFree: boolean;
  tags: string;
  skills: string;
  prerequisites: string;
  learningOutcomes: string;
  language: string;
  hasSubtitles: boolean;
  subtitleLanguages: string;
  certificateOffered: boolean;
  isPublished: boolean;
  isFeatured: boolean;
}

const categories = [
  'All Categories',
  'Leadership',
  'Analytics',
  'Soft Skills',
  'Project Management',
  'Finance',
  'Technology',
  'Marketing',
  'Human Resources'
];

const levels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
];

function CoursesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Modal states
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const initialFormData: CourseFormData = {
    title: '',
    description: '',
    shortDescription: '',
    instructor: '',
    instructorTitle: '',
    category: 'Leadership',
    subcategory: '',
    level: 'beginner',
    duration: 0,
    price: 0,
    isFree: false,
    tags: '',
    skills: '',
    prerequisites: '',
    learningOutcomes: '',
    language: 'English',
    hasSubtitles: false,
    subtitleLanguages: '',
    certificateOffered: true,
    isPublished: false,
    isFeatured: false
  };

  const [formData, setFormData] = useState<CourseFormData>(initialFormData);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedStatus, priceFilter, sortBy]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      interface ApiCourse {
        id: string;
        title: string;
        description: string;
        category: string;
        level: string;
        duration: number;
        provider: string;
        format: string;
        skills: string[];
        thumbnailUrl: string;
        status: string;
        enrollmentStatus: string;
        progress: number;
        rating?: number;
        modules?: CourseModule[];
      }

      interface ApiResponse {
        courses: ApiCourse[];
      }

      const response = await apiClient.get('/api/lxp/courses');
      const data = response.data as ApiResponse;

      // Transform API courses to match frontend interface
      const transformedCourses: Course[] = (data.courses || []).map((c: ApiCourse) => ({
        id: c.id,
        title: c.title,
        description: c.description || '',
        shortDescription: c.description?.substring(0, 100) || '',
        instructor: c.provider || 'Internal',
        instructorTitle: 'Instructor',
        instructorAvatar: '',
        category: c.category || 'General',
        subcategory: '',
        level: (c.level || 'beginner') as Course['level'],
        duration: c.duration || 60,
        modules: c.modules || [],
        totalModules: c.modules?.length || 0,
        completedModules: c.modules?.filter(m => m.isCompleted).length || 0,
        rating: c.rating || 4.5,
        totalRatings: 0,
        enrollments: 0,
        price: 0,
        isFree: true,
        thumbnail: c.thumbnailUrl || '',
        tags: c.skills || [],
        skills: c.skills || [],
        prerequisites: [],
        learningOutcomes: [],
        language: 'English',
        hasSubtitles: false,
        subtitleLanguages: [],
        certificateOffered: true,
        isPublished: c.status === 'active',
        isFeatured: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        enrollmentStatus: (c.enrollmentStatus || 'not_enrolled') as Course['enrollmentStatus'],
        progress: c.progress || 0
      }));

      setCourses(transformedCourses);
    } catch (error) {
      logger.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...courses];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query)) ||
        course.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(course => course.enrollmentStatus === selectedStatus);
    }

    // Price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(course => course.isFree);
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(course => !course.isFree);
    }

    // Sorting
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.enrollments - a.enrollments);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'duration_asc':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration_desc':
        filtered.sort((a, b) => b.duration - a.duration);
        break;
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredCourses(filtered);
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
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

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'enrolled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'enrolled': return 'Enrolled';
      default: return 'Not Enrolled';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'article': return <FileText className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'assignment': return <Code className="w-4 h-4" />;
      case 'interactive': return <PlayCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleEnroll = async (courseId: string) => {
    // Simulate enrollment
    setCourses(prev => prev.map(course =>
      course.id === courseId
        ? { ...course, enrollmentStatus: 'enrolled', enrollments: course.enrollments + 1 }
        : course
    ));
  };

  const handleContinueLearning = (courseId: string) => {
    router.push(`/dashboard/lxp/courses/${courseId}`);
  };

  const handleViewCertificate = (certificateId: string) => {
    window.open(`/certificates/${certificateId}`, '_blank');
  };

  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const openCreateModal = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setShowCreateModal(true);
  };

  const openEditModal = (course: Course) => {
    setFormData({
      title: course.title,
      description: course.description,
      shortDescription: course.shortDescription,
      instructor: course.instructor,
      instructorTitle: course.instructorTitle,
      category: course.category,
      subcategory: course.subcategory,
      level: course.level,
      duration: course.duration,
      price: course.price,
      isFree: course.isFree,
      tags: course.tags.join(', '),
      skills: course.skills.join(', '),
      prerequisites: course.prerequisites.join(', '),
      learningOutcomes: course.learningOutcomes.join(', '),
      language: course.language,
      hasSubtitles: course.hasSubtitles,
      subtitleLanguages: course.subtitleLanguages.join(', '),
      certificateOffered: course.certificateOffered,
      isPublished: course.isPublished,
      isFeatured: course.isFeatured
    });
    setSelectedCourse(course);
    setIsEditing(true);
    setShowCreateModal(true);
  };

  const handleSubmitCourse = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isEditing && selectedCourse) {
      setCourses(prev => prev.map(course =>
        course.id === selectedCourse.id
          ? {
              ...course,
              ...formData,
              tags: formData.tags.split(',').map(t => t.trim()),
              skills: formData.skills.split(',').map(s => s.trim()),
              prerequisites: formData.prerequisites.split(',').map(p => p.trim()).filter(Boolean),
              learningOutcomes: formData.learningOutcomes.split(',').map(l => l.trim()),
              subtitleLanguages: formData.subtitleLanguages.split(',').map(s => s.trim()).filter(Boolean),
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : course
      ));
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData,
        instructorAvatar: '/avatars/default.jpg',
        tags: formData.tags.split(',').map(t => t.trim()),
        skills: formData.skills.split(',').map(s => s.trim()),
        prerequisites: formData.prerequisites.split(',').map(p => p.trim()).filter(Boolean),
        learningOutcomes: formData.learningOutcomes.split(',').map(l => l.trim()),
        subtitleLanguages: formData.subtitleLanguages.split(',').map(s => s.trim()).filter(Boolean),
        modules: [],
        totalModules: 0,
        completedModules: 0,
        rating: 0,
        totalRatings: 0,
        enrollments: 0,
        thumbnail: '/courses/default.jpg',
        lastUpdated: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        enrollmentStatus: 'not_enrolled',
        progress: 0
      };
      setCourses(prev => [newCourse, ...prev]);
    }

    setShowCreateModal(false);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  // Calculate metrics
  const totalCourses = courses.length;
  const enrolledCourses = courses.filter(c => c.enrollmentStatus !== 'not_enrolled').length;
  const completedCourses = courses.filter(c => c.enrollmentStatus === 'completed').length;
  const inProgressCourses = courses.filter(c => c.enrollmentStatus === 'in_progress').length;
  const totalLearningHours = courses.reduce((acc, c) => {
    if (c.enrollmentStatus === 'completed') return acc + c.duration;
    if (c.enrollmentStatus === 'in_progress') return acc + (c.duration * c.progress / 100);
    return acc;
  }, 0);

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
            <BookOpen className="w-8 h-8 text-mizan-gold" />
            <h1 className="text-3xl font-bold text-gray-900">Course Catalog</h1>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg hover:bg-yellow-400 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Create Course
          </button>
        </div>
        <p className="text-gray-600">Browse and enroll in courses to enhance your skills</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Courses</span>
            <BookOpen className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalCourses}</div>
          <div className="text-xs text-gray-500 mt-1">Available in catalog</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Enrolled</span>
            <GraduationCap className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{enrolledCourses}</div>
          <div className="text-xs text-gray-500 mt-1">Active enrollments</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">In Progress</span>
            <Play className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{inProgressCourses}</div>
          <div className="text-xs text-gray-500 mt-1">Currently learning</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Completed</span>
            <CheckCircle className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{completedCourses}</div>
          <div className="text-xs text-gray-500 mt-1">Courses finished</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Learning Hours</span>
            <Clock className="w-5 h-5 text-mizan-gold" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatDuration(Math.round(totalLearningHours))}</div>
          <div className="text-xs text-gray-500 mt-1">Total time invested</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, instructors, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            {levels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>

          {/* More Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              showFilters ? 'bg-mizan-gold/10 border-mizan-gold text-mizan-primary' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            More Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-mizan-gold/10 text-mizan-primary' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-mizan-gold/10 text-mizan-primary' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Statuses</option>
                <option value="not_enrolled">Not Enrolled</option>
                <option value="enrolled">Enrolled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Price:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Prices</option>
                <option value="free">Free Only</option>
                <option value="paid">Paid Only</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="featured">Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="duration_asc">Duration (Short to Long)</option>
                <option value="duration_desc">Duration (Long to Short)</option>
                <option value="price_asc">Price (Low to High)</option>
                <option value="price_desc">Price (High to Low)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> of {courses.length} courses
        </p>
      </div>

      {/* Course Grid/List */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => openCourseModal(course)}
            >
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-mizan-primary to-mizan-primary/80">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-mizan-gold/30" />
                </div>
                {course.isFeatured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-mizan-gold text-mizan-primary text-xs font-medium rounded">
                    Featured
                  </div>
                )}
                {course.enrollmentStatus !== 'not_enrolled' && (
                  <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded ${getStatusColor(course.enrollmentStatus)}`}>
                    {getStatusLabel(course.enrollmentStatus)}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(course.level)}`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                  {course.isFree && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      Free
                    </span>
                  )}
                </div>
                {course.progress > 0 && course.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="h-full bg-mizan-gold transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-mizan-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.shortDescription}</p>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.totalModules} modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{course.rating.toFixed(1)}</span>
                    <span className="text-gray-400">({course.totalRatings.toLocaleString()})</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {!course.isFree && (
                    <span className="text-lg font-bold text-gray-900">${course.price}</span>
                  )}
                  {course.isFree && (
                    <span className="text-lg font-bold text-green-600">Free</span>
                  )}

                  {course.enrollmentStatus === 'not_enrolled' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnroll(course.id);
                      }}
                      className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                  {course.enrollmentStatus === 'enrolled' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueLearning(course.id);
                      }}
                      className="px-4 py-2 bg-mizan-primary text-white rounded-lg text-sm font-medium hover:bg-mizan-primary/90 transition-colors"
                    >
                      Start Learning
                    </button>
                  )}
                  {course.enrollmentStatus === 'in_progress' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueLearning(course.id);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Continue ({course.progress}%)
                    </button>
                  )}
                  {course.enrollmentStatus === 'completed' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (course.certificateId) handleViewCertificate(course.certificateId);
                      }}
                      className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      <Award className="w-4 h-4" />
                      Certificate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openCourseModal(course)}
            >
              <div className="flex items-start gap-6">
                {/* Thumbnail */}
                <div className="relative w-48 h-32 bg-gradient-to-br from-mizan-primary to-mizan-primary/80 rounded-lg flex-shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-mizan-gold/30" />
                  </div>
                  {course.isFeatured && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-mizan-gold text-mizan-primary text-xs font-medium rounded">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${getLevelColor(course.level)}`}>
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </span>
                        {course.enrollmentStatus !== 'not_enrolled' && (
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(course.enrollmentStatus)}`}>
                            {getStatusLabel(course.enrollmentStatus)}
                          </span>
                        )}
                        {course.isFree && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Free
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.shortDescription}</p>
                      <p className="text-sm text-gray-500">By {course.instructor} • {course.instructorTitle}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {!course.isFree && (
                        <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                      )}
                      {course.isFree && (
                        <span className="text-2xl font-bold text-green-600">Free</span>
                      )}
                    </div>
                  </div>

                  {/* Meta Row */}
                  <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(course.duration)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.totalModules} modules</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.enrollments.toLocaleString()} enrolled</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating.toFixed(1)} ({course.totalRatings.toLocaleString()} ratings)</span>
                    </div>
                    {course.certificateOffered && (
                      <div className="flex items-center gap-1 text-mizan-gold">
                        <Award className="w-4 h-4" />
                        <span>Certificate</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {course.progress > 0 && course.progress < 100 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-mizan-primary font-medium">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-mizan-gold transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {course.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {course.enrollmentStatus === 'not_enrolled' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnroll(course.id);
                      }}
                      className="px-6 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                  {course.enrollmentStatus === 'enrolled' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueLearning(course.id);
                      }}
                      className="px-6 py-2 bg-mizan-primary text-white rounded-lg font-medium hover:bg-mizan-primary/90 transition-colors"
                    >
                      Start Learning
                    </button>
                  )}
                  {course.enrollmentStatus === 'in_progress' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContinueLearning(course.id);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Continue
                    </button>
                  )}
                  {course.enrollmentStatus === 'completed' && course.certificateId && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCertificate(course.certificateId!);
                      }}
                      className="flex items-center justify-center gap-1 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <Award className="w-4 h-4" />
                      Certificate
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(course);
                    }}
                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Detail Modal */}
      {showCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative h-64 bg-gradient-to-br from-mizan-primary to-mizan-primary/80">
              <button
                onClick={() => setShowCourseModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-24 h-24 text-mizan-gold/20" />
              </div>
              {selectedCourse.isFeatured && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-mizan-gold text-mizan-primary font-medium rounded">
                  Featured Course
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-sm font-medium rounded ${getLevelColor(selectedCourse.level)}`}>
                    {selectedCourse.level.charAt(0).toUpperCase() + selectedCourse.level.slice(1)}
                  </span>
                  <span className="px-2 py-1 bg-white/20 text-white text-sm rounded">
                    {selectedCourse.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-mizan-gold mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">{formatDuration(selectedCourse.duration)}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">{selectedCourse.totalModules}</div>
                  <div className="text-xs text-gray-500">Modules</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">{selectedCourse.enrollments.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Enrolled</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">{selectedCourse.rating.toFixed(1)}</div>
                  <div className="text-xs text-gray-500">{selectedCourse.totalRatings.toLocaleString()} ratings</div>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                <div className="w-12 h-12 bg-mizan-primary rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-mizan-gold" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{selectedCourse.instructor}</div>
                  <div className="text-sm text-gray-600">{selectedCourse.instructorTitle}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">About this course</h3>
                <p className="text-gray-600">{selectedCourse.description}</p>
              </div>

              {/* What you'll learn */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">What you'll learn</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCourse.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Skills you'll gain</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-mizan-gold/10 text-mizan-primary rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {selectedCourse.prerequisites.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Prerequisites</h3>
                  <ul className="space-y-2">
                    {selectedCourse.prerequisites.map((prereq, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-mizan-gold rounded-full" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Course Content */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Course content</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {selectedCourse.modules.map((module, idx) => (
                    <div
                      key={module.id}
                      className={`flex items-center justify-between p-4 ${
                        idx > 0 ? 'border-t border-gray-100' : ''
                      } ${module.isLocked ? 'bg-gray-50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          module.isCompleted ? 'bg-green-100 text-green-600' :
                          module.isLocked ? 'bg-gray-200 text-gray-400' :
                          'bg-mizan-gold/10 text-mizan-primary'
                        }`}>
                          {module.isCompleted ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : module.isLocked ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            getModuleIcon(module.type)
                          )}
                        </div>
                        <div>
                          <div className={`font-medium ${module.isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                            {module.title}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">{module.type} • {formatDuration(module.duration)}</div>
                        </div>
                      </div>
                      {!module.isLocked && !module.isCompleted && (
                        <button className="px-3 py-1 text-sm text-mizan-primary hover:bg-mizan-gold/10 rounded transition-colors">
                          Start
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Course info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Language</span>
                      <span className="text-gray-900">{selectedCourse.language}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Subtitles</span>
                      <span className="text-gray-900">
                        {selectedCourse.hasSubtitles ? selectedCourse.subtitleLanguages.join(', ') : 'None'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Certificate</span>
                      <span className="text-gray-900">{selectedCourse.certificateOffered ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Last updated</span>
                      <span className="text-gray-900">{new Date(selectedCourse.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  {!selectedCourse.isFree && (
                    <div className="text-3xl font-bold text-gray-900">${selectedCourse.price}</div>
                  )}
                  {selectedCourse.isFree && (
                    <div className="text-3xl font-bold text-green-600">Free</div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openEditModal(selectedCourse)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Edit Course
                  </button>
                  {selectedCourse.enrollmentStatus === 'not_enrolled' && (
                    <button
                      onClick={() => {
                        handleEnroll(selectedCourse.id);
                        setShowCourseModal(false);
                      }}
                      className="px-6 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                  {selectedCourse.enrollmentStatus !== 'not_enrolled' && selectedCourse.enrollmentStatus !== 'completed' && (
                    <button
                      onClick={() => {
                        handleContinueLearning(selectedCourse.id);
                        setShowCourseModal(false);
                      }}
                      className="px-6 py-2 bg-mizan-primary text-white rounded-lg font-medium hover:bg-mizan-primary/90 transition-colors"
                    >
                      {selectedCourse.enrollmentStatus === 'enrolled' ? 'Start Learning' : 'Continue Learning'}
                    </button>
                  )}
                  {selectedCourse.enrollmentStatus === 'completed' && selectedCourse.certificateId && (
                    <button
                      onClick={() => handleViewCertificate(selectedCourse.certificateId!)}
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <Award className="w-5 h-5" />
                      View Certificate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Course' : 'Create New Course'}
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title*</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Leadership Excellence: From Manager to Leader"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description*</label>
                    <input
                      type="text"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="Brief description for course cards (max 100 characters)"
                      maxLength={100}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Description*</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="Detailed course description..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name*</label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Dr. Sarah Chen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Title</label>
                    <input
                      type="text"
                      value={formData.instructorTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, instructorTitle: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Executive Leadership Coach"
                    />
                  </div>
                </div>
              </div>

              {/* Classification */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Classification</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      {categories.filter(c => c !== 'All Categories').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                    <input
                      type="text"
                      value={formData.subcategory}
                      onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Executive Leadership"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level*</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as CourseFormData['level'] }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)*</label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., 1200"
                      min={0}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isFree"
                      checked={formData.isFree}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFree: e.target.checked, price: e.target.checked ? 0 : prev.price }))}
                      className="w-4 h-4 text-mizan-gold focus:ring-mizan-gold border-gray-300 rounded"
                    />
                    <label htmlFor="isFree" className="text-sm font-medium text-gray-700">Free Course</label>
                  </div>
                  {!formData.isFree && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                        placeholder="e.g., 299"
                        min={0}
                        step={0.01}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Content Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Content Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., leadership, management, executive"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.skills}
                      onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Strategic Leadership, Team Management"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.prerequisites}
                      onChange={(e) => setFormData(prev => ({ ...prev, prerequisites: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., 3+ years management experience"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Learning Outcomes (comma-separated)</label>
                    <textarea
                      value={formData.learningOutcomes}
                      onChange={(e) => setFormData(prev => ({ ...prev, learningOutcomes: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Develop transformational leadership skills, Master emotional intelligence"
                    />
                  </div>
                </div>
              </div>

              {/* Language & Accessibility */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Language & Accessibility</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <input
                      type="text"
                      value={formData.language}
                      onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="English"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="hasSubtitles"
                      checked={formData.hasSubtitles}
                      onChange={(e) => setFormData(prev => ({ ...prev, hasSubtitles: e.target.checked }))}
                      className="w-4 h-4 text-mizan-gold focus:ring-mizan-gold border-gray-300 rounded"
                    />
                    <label htmlFor="hasSubtitles" className="text-sm font-medium text-gray-700">Has Subtitles</label>
                  </div>
                  {formData.hasSubtitles && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle Languages (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.subtitleLanguages}
                        onChange={(e) => setFormData(prev => ({ ...prev, subtitleLanguages: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                        placeholder="e.g., Spanish, French, German"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="certificateOffered"
                      checked={formData.certificateOffered}
                      onChange={(e) => setFormData(prev => ({ ...prev, certificateOffered: e.target.checked }))}
                      className="w-4 h-4 text-mizan-gold focus:ring-mizan-gold border-gray-300 rounded"
                    />
                    <label htmlFor="certificateOffered" className="text-sm font-medium text-gray-700">Offer Certificate</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                      className="w-4 h-4 text-mizan-gold focus:ring-mizan-gold border-gray-300 rounded"
                    />
                    <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">Published</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-4 h-4 text-mizan-gold focus:ring-mizan-gold border-gray-300 rounded"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitCourse}
                disabled={!formData.title || !formData.description || !formData.instructor}
                className="px-6 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditing ? 'Save Changes' : 'Create Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-mizan-gold" /></div>}>
      <CoursesPageContent />
    </Suspense>
  );
}
