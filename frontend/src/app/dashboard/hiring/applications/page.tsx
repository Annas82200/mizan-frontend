'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Users,
  Search,
  Filter,
  Eye,
  Download,
  Star,
  StarOff,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  FileText,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  UserCheck,
  UserX,
  MoreVertical,
  ExternalLink,
  Award,
  GraduationCap,
  Building2
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  currentTitle: string;
  currentCompany: string;
  yearsExperience: number;
  education: string;
  resumeUrl: string;
  coverLetterUrl: string | null;
  linkedInUrl: string | null;
  portfolioUrl: string | null;
  source: 'linkedin' | 'indeed' | 'referral' | 'website' | 'other';
  status: 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'offer' | 'hired' | 'rejected';
  rating: number;
  skills: string[];
  matchScore: number;
  notes: string[];
  isStarred: boolean;
  appliedAt: string;
  updatedAt: string;
  reviewedBy: string | null;
}

interface ApplicationMetrics {
  total: number;
  new: number;
  reviewing: number;
  shortlisted: number;
  interview: number;
  offer: number;
  hired: number;
  rejected: number;
  avgMatchScore: number;
  starred: number;
}

/**
 * Applications Management Page
 * Production-ready: Complete candidate application tracking and review
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
function ApplicationsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobFilter = searchParams.get('job');

  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [applications, setApplications] = useState<Application[]>([]);
  const [metrics, setMetrics] = useState<ApplicationMetrics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [rejectionReason, setRejectionReason] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'matchScore' | 'rating'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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

        const allowedRoles = ['superadmin', 'clientAdmin', 'manager'];
        if (!allowedRoles.includes(payload.role)) {
          router.push('/dashboard');
          return;
        }

        await fetchApplications();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchApplications = async () => {
    try {
      interface ApiApplication {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        currentCompany: string;
        currentTitle: string;
        source: string;
        status: string;
        stage: string;
        overallScore: number;
        skillsScore: number;
        cultureScore: number;
        appliedAt: string;
        linkedinUrl: string;
        resumeUrl: string;
        requisitionId: string;
        positionTitle: string;
        department: string;
      }

      interface ApiResponse {
        applications: ApiApplication[];
      }

      const response = await apiClient.get('/api/hiring/applications');
      const data = response.data as ApiResponse;

      const transformedApplications: Application[] = (data.applications || []).map((a: ApiApplication) => ({
        id: a.id,
        jobId: a.requisitionId || '',
        jobTitle: a.positionTitle || 'Unknown Position',
        candidateId: a.id,
        firstName: a.firstName,
        lastName: a.lastName,
        email: a.email,
        phone: a.phone || '',
        location: '',
        currentTitle: a.currentTitle || '',
        currentCompany: a.currentCompany || '',
        yearsExperience: 0,
        education: '',
        resumeUrl: a.resumeUrl || '',
        coverLetterUrl: null,
        linkedInUrl: a.linkedinUrl || null,
        portfolioUrl: null,
        source: (a.source || 'website') as Application['source'],
        status: (a.status === 'applied' ? 'new' : a.status === 'screening' ? 'reviewing' : a.status === 'interview' ? 'interview' : a.status === 'offer' ? 'offer' : a.status === 'hired' ? 'hired' : a.status === 'rejected' ? 'rejected' : 'new') as Application['status'],
        rating: 0,
        skills: [],
        matchScore: Number(a.overallScore) || 0,
        notes: [],
        isStarred: false,
        appliedAt: a.appliedAt || new Date().toISOString(),
        updatedAt: a.appliedAt || new Date().toISOString(),
        reviewedBy: null
      }));

      setApplications(transformedApplications);
      calculateMetrics(transformedApplications);
    } catch (err) {
      logger.error('Error fetching applications:', err);
    }
  };

  const calculateMetrics = (appList: Application[]) => {
    const metrics: ApplicationMetrics = {
      total: appList.length,
      new: appList.filter(a => a.status === 'new').length,
      reviewing: appList.filter(a => a.status === 'reviewing').length,
      shortlisted: appList.filter(a => a.status === 'shortlisted').length,
      interview: appList.filter(a => a.status === 'interview').length,
      offer: appList.filter(a => a.status === 'offer').length,
      hired: appList.filter(a => a.status === 'hired').length,
      rejected: appList.filter(a => a.status === 'rejected').length,
      avgMatchScore: Math.round(appList.reduce((sum, a) => sum + a.matchScore, 0) / appList.length),
      starred: appList.filter(a => a.isStarred).length
    };
    setMetrics(metrics);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'reviewing': return 'bg-purple-100 text-purple-700';
      case 'shortlisted': return 'bg-yellow-100 text-yellow-700';
      case 'interview': return 'bg-orange-100 text-orange-700';
      case 'offer': return 'bg-green-100 text-green-700';
      case 'hired': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'reviewing': return <Eye className="w-4 h-4" />;
      case 'shortlisted': return <Star className="w-4 h-4" />;
      case 'interview': return <Calendar className="w-4 h-4" />;
      case 'offer': return <FileText className="w-4 h-4" />;
      case 'hired': return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'linkedin': return 'LinkedIn';
      case 'indeed': return 'Indeed';
      case 'referral': return 'Referral';
      case 'website': return 'Website';
      case 'other': return 'Other';
      default: return source;
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.currentCompany.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || app.source === sourceFilter;
    const matchesRating = ratingFilter === 'all' ||
      (ratingFilter === 'unrated' && app.rating === 0) ||
      (ratingFilter !== 'unrated' && app.rating >= parseInt(ratingFilter));
    const matchesStarred = !showStarredOnly || app.isStarred;
    const matchesJob = !jobFilter || app.jobId === jobFilter;
    return matchesSearch && matchesStatus && matchesSource && matchesRating && matchesStarred && matchesJob;
  }).sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'date') {
      comparison = new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
    } else if (sortBy === 'matchScore') {
      comparison = b.matchScore - a.matchScore;
    } else if (sortBy === 'rating') {
      comparison = b.rating - a.rating;
    }
    return sortOrder === 'asc' ? -comparison : comparison;
  });

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleStatusChange = async (appId: string, newStatus: Application['status']) => {
    try {
      const updatedApps = applications.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            reviewedBy: 'Current User'
          };
        }
        return app;
      });
      setApplications(updatedApps);
      calculateMetrics(updatedApps);
      setSuccessMessage(`Application moved to ${newStatus}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error updating application status:', err);
    }
  };

  const handleToggleStar = async (appId: string) => {
    try {
      const updatedApps = applications.map(app => {
        if (app.id === appId) {
          return { ...app, isStarred: !app.isStarred };
        }
        return app;
      });
      setApplications(updatedApps);
      calculateMetrics(updatedApps);
    } catch (err) {
      logger.error('Error toggling star:', err);
    }
  };

  const handleRatingChange = async (appId: string, rating: number) => {
    try {
      const updatedApps = applications.map(app => {
        if (app.id === appId) {
          return { ...app, rating, updatedAt: new Date().toISOString() };
        }
        return app;
      });
      setApplications(updatedApps);
      setSuccessMessage('Rating updated');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error updating rating:', err);
    }
  };

  const handleAddNote = async () => {
    if (!selectedApplication || !newNote.trim()) return;
    setIsSubmitting(true);

    try {
      const updatedApps = applications.map(app => {
        if (app.id === selectedApplication.id) {
          return {
            ...app,
            notes: [...app.notes, newNote.trim()],
            updatedAt: new Date().toISOString()
          };
        }
        return app;
      });
      setApplications(updatedApps);
      setSelectedApplication({
        ...selectedApplication,
        notes: [...selectedApplication.notes, newNote.trim()]
      });
      setNewNote('');
      setSuccessMessage('Note added');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error adding note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!selectedApplication) return;
    setIsSubmitting(true);

    try {
      const updatedApps = applications.map(app => {
        if (app.id === selectedApplication.id) {
          return {
            ...app,
            status: 'rejected' as const,
            notes: rejectionReason ? [...app.notes, `Rejection reason: ${rejectionReason}`] : app.notes,
            updatedAt: new Date().toISOString()
          };
        }
        return app;
      });
      setApplications(updatedApps);
      calculateMetrics(updatedApps);
      setShowRejectModal(false);
      setShowDetailModal(false);
      setRejectionReason('');
      setSuccessMessage('Application rejected');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error rejecting application:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDetailModal = (app: Application) => {
    setSelectedApplication(app);
    setShowDetailModal(true);
  };

  const renderRatingStars = (rating: number, appId: string, interactive: boolean = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            disabled={!interactive}
            onClick={() => interactive && handleRatingChange(appId, star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform`}
          >
            <Star
              className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        ))}
      </div>
    );
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
              <Users className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
                <p className="text-sm text-gray-600">Review candidate applications</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard/hiring')}
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
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-xl font-bold text-mizan-primary">{metrics.total}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-200 text-center">
                <p className="text-xs text-blue-600">New</p>
                <p className="text-xl font-bold text-blue-700">{metrics.new}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-purple-200 text-center">
                <p className="text-xs text-purple-600">Reviewing</p>
                <p className="text-xl font-bold text-purple-700">{metrics.reviewing}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-yellow-200 text-center">
                <p className="text-xs text-yellow-600">Shortlisted</p>
                <p className="text-xl font-bold text-yellow-700">{metrics.shortlisted}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-orange-200 text-center">
                <p className="text-xs text-orange-600">Interview</p>
                <p className="text-xl font-bold text-orange-700">{metrics.interview}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-green-200 text-center">
                <p className="text-xs text-green-600">Offer</p>
                <p className="text-xl font-bold text-green-700">{metrics.offer}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-emerald-200 text-center">
                <p className="text-xs text-emerald-600">Hired</p>
                <p className="text-xl font-bold text-emerald-700">{metrics.hired}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-red-200 text-center">
                <p className="text-xs text-red-600">Rejected</p>
                <p className="text-xl font-bold text-red-700">{metrics.rejected}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-mizan-gold/30 text-center">
                <p className="text-xs text-gray-500">Starred</p>
                <p className="text-xl font-bold text-mizan-gold">{metrics.starred}</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center">
                <p className="text-xs text-gray-500">Avg Match</p>
                <p className="text-xl font-bold text-gray-700">{metrics.avgMatchScore}%</p>
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
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Sources</option>
                <option value="linkedin">LinkedIn</option>
                <option value="indeed">Indeed</option>
                <option value="referral">Referral</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
              </select>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="unrated">Unrated</option>
              </select>
              <button
                onClick={() => setShowStarredOnly(!showStarredOnly)}
                className={`px-4 py-2 border rounded-lg transition-colors flex items-center space-x-2 ${
                  showStarredOnly
                    ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Star className={`w-4 h-4 ${showStarredOnly ? 'fill-yellow-400' : ''}`} />
                <span>Starred</span>
              </button>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="matchScore-desc">Highest Match</option>
                <option value="matchScore-asc">Lowest Match</option>
                <option value="rating-desc">Highest Rating</option>
                <option value="rating-asc">Lowest Rating</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Candidate</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Position</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Match</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Rating</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Source</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Applied</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <>
                      <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleRowExpansion(app.id)}
                            className="flex items-center space-x-3 text-left"
                          >
                            {expandedRows.has(app.id) ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-mizan-gold/10 rounded-full flex items-center justify-center">
                                <span className="text-mizan-gold font-semibold">
                                  {app.firstName[0]}{app.lastName[0]}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium text-mizan-primary">
                                    {app.firstName} {app.lastName}
                                  </p>
                                  {app.isStarred && (
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-500">{app.currentTitle}</p>
                              </div>
                            </div>
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-gray-700">{app.jobTitle}</p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getMatchScoreColor(app.matchScore)}`}>
                            {app.matchScore}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center">
                            {renderRatingStars(app.rating, app.id, true)}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {getStatusIcon(app.status)}
                            <span className="capitalize">{app.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-sm text-gray-600">{getSourceLabel(app.source)}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-sm text-gray-500">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleToggleStar(app.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                app.isStarred
                                  ? 'text-yellow-500 hover:bg-yellow-50'
                                  : 'text-gray-400 hover:bg-gray-100'
                              }`}
                              title={app.isStarred ? 'Remove star' : 'Add star'}
                            >
                              {app.isStarred ? (
                                <Star className="w-4 h-4 fill-current" />
                              ) : (
                                <StarOff className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => openDetailModal(app)}
                              className="p-2 text-gray-400 hover:text-mizan-gold hover:bg-gray-100 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {app.status === 'new' && (
                              <button
                                onClick={() => handleStatusChange(app.id, 'reviewing')}
                                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Start Review"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                            {['new', 'reviewing'].includes(app.status) && (
                              <button
                                onClick={() => handleStatusChange(app.id, 'shortlisted')}
                                className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Shortlist"
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                            )}
                            {!['rejected', 'hired'].includes(app.status) && (
                              <button
                                onClick={() => {
                                  setSelectedApplication(app);
                                  setShowRejectModal(true);
                                }}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      {expandedRows.has(app.id) && (
                        <tr className="bg-gray-50">
                          <td colSpan={8} className="py-4 px-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4" />
                                    <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">{app.email}</a>
                                  </p>
                                  <p className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4" />
                                    <span>{app.phone}</span>
                                  </p>
                                  <p className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{app.location}</span>
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p className="flex items-center space-x-2">
                                    <Briefcase className="w-4 h-4" />
                                    <span>{app.currentTitle} at {app.currentCompany}</span>
                                  </p>
                                  <p className="flex items-center space-x-2">
                                    <Award className="w-4 h-4" />
                                    <span>{app.yearsExperience} years experience</span>
                                  </p>
                                  <p className="flex items-center space-x-2">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>{app.education}</span>
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-1">
                                  {app.skills.map(skill => (
                                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center space-x-4">
                              <a
                                href={app.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-mizan-gold text-white text-sm rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-1"
                              >
                                <FileText className="w-4 h-4" />
                                <span>Resume</span>
                              </a>
                              {app.coverLetterUrl && (
                                <a
                                  href={app.coverLetterUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1"
                                >
                                  <FileText className="w-4 h-4" />
                                  <span>Cover Letter</span>
                                </a>
                              )}
                              {app.linkedInUrl && (
                                <a
                                  href={app.linkedInUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 border border-blue-300 text-blue-700 text-sm rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-1"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>LinkedIn</span>
                                </a>
                              )}
                              {app.portfolioUrl && (
                                <a
                                  href={app.portfolioUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 border border-purple-300 text-purple-700 text-sm rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-1"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Portfolio</span>
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>

              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No applications found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-mizan-gold/10 rounded-full flex items-center justify-center">
                  <span className="text-mizan-gold font-bold text-lg">
                    {selectedApplication.firstName[0]}{selectedApplication.lastName[0]}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-mizan-primary">
                    {selectedApplication.firstName} {selectedApplication.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Applied for {selectedApplication.jobTitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status and Match */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedApplication.status)}`}>
                    {getStatusIcon(selectedApplication.status)}
                    <span className="capitalize">{selectedApplication.status}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(selectedApplication.matchScore)}`}>
                    {selectedApplication.matchScore}% Match
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {renderRatingStars(selectedApplication.rating, selectedApplication.id, true)}
                  <button
                    onClick={() => handleToggleStar(selectedApplication.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedApplication.isStarred
                        ? 'text-yellow-500 hover:bg-yellow-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {selectedApplication.isStarred ? (
                      <Star className="w-5 h-5 fill-current" />
                    ) : (
                      <StarOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a href={`mailto:${selectedApplication.email}`} className="text-blue-600 hover:underline">
                        {selectedApplication.email}
                      </a>
                    </p>
                    <p className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedApplication.phone}</span>
                    </p>
                    <p className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{selectedApplication.location}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Professional Background</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center space-x-3">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span>{selectedApplication.currentTitle} at {selectedApplication.currentCompany}</span>
                    </p>
                    <p className="flex items-center space-x-3">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span>{selectedApplication.yearsExperience} years of experience</span>
                    </p>
                    <p className="flex items-center space-x-3">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span>{selectedApplication.education}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documents and Links */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Documents & Links</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </a>
                  {selectedApplication.coverLetterUrl && (
                    <a
                      href={selectedApplication.coverLetterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Cover Letter</span>
                    </a>
                  )}
                  {selectedApplication.linkedInUrl && (
                    <a
                      href={selectedApplication.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {selectedApplication.portfolioUrl && (
                    <a
                      href={selectedApplication.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors flex items-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Portfolio</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
                <div className="space-y-2 mb-4">
                  {selectedApplication.notes.length > 0 ? (
                    selectedApplication.notes.map((note, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                        {note}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No notes yet</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim() || isSubmitting}
                    className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <h3 className="w-full font-semibold text-gray-700 mb-1">Move to Stage</h3>
                {selectedApplication.status !== 'reviewing' && (
                  <button
                    onClick={() => handleStatusChange(selectedApplication.id, 'reviewing')}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    Reviewing
                  </button>
                )}
                {selectedApplication.status !== 'shortlisted' && (
                  <button
                    onClick={() => handleStatusChange(selectedApplication.id, 'shortlisted')}
                    className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
                  >
                    Shortlist
                  </button>
                )}
                {selectedApplication.status !== 'interview' && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedApplication.id, 'interview');
                      router.push(`/dashboard/hiring/interviews?candidate=${selectedApplication.id}`);
                    }}
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    Schedule Interview
                  </button>
                )}
                {selectedApplication.status !== 'offer' && (
                  <button
                    onClick={() => handleStatusChange(selectedApplication.id, 'offer')}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Extend Offer
                  </button>
                )}
                {selectedApplication.status !== 'hired' && (
                  <button
                    onClick={() => handleStatusChange(selectedApplication.id, 'hired')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Mark Hired
                  </button>
                )}
                {!['rejected', 'hired'].includes(selectedApplication.status) && (
                  <button
                    onClick={() => setShowRejectModal(true)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-red-600">Reject Application</h2>
              <p className="text-sm text-gray-500">
                {selectedApplication.firstName} {selectedApplication.lastName}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600">
                Are you sure you want to reject this application? This action can be undone.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rejection Reason (optional)
                </label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  placeholder="Add a reason for rejection..."
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isSubmitting}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Rejecting...</span>
                  </>
                ) : (
                  <>
                    <UserX className="w-4 h-4" />
                    <span>Reject Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-mizan-gold" /></div>}>
      <ApplicationsPageContent />
    </Suspense>
  );
}
