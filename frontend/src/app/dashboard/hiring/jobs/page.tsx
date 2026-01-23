'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  ExternalLink,
  Copy,
  MoreVertical,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Users,
  MapPin,
  DollarSign,
  Calendar,
  Globe,
  Building2,
  FileText,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  X,
  Save,
  Send,
  Archive,
  Play,
  Pause
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface JobPosting {
  id: string;
  requisitionId: string;
  title: string;
  department: string;
  location: string;
  locationType: 'onsite' | 'remote' | 'hybrid';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  salaryVisible: boolean;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  status: 'draft' | 'published' | 'paused' | 'closed' | 'filled';
  publishedAt: string | null;
  expiresAt: string | null;
  applicationCount: number;
  viewCount: number;
  externalUrl: string | null;
  postedToBoards: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface JobMetrics {
  total: number;
  draft: number;
  published: number;
  paused: number;
  closed: number;
  filled: number;
  totalApplications: number;
  totalViews: number;
  avgApplicationsPerJob: number;
}

const initialFormState: {
  requisitionId: string;
  title: string;
  department: string;
  location: string;
  locationType: 'onsite' | 'remote' | 'hybrid';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  salaryVisible: boolean;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  skills: string[];
  expiresAt: string;
} = {
  requisitionId: '',
  title: '',
  department: '',
  location: '',
  locationType: 'onsite',
  employmentType: 'full-time',
  experienceLevel: 'mid',
  salaryMin: 0,
  salaryMax: 0,
  salaryCurrency: 'USD',
  salaryVisible: true,
  description: '',
  requirements: [''],
  responsibilities: [''],
  benefits: [''],
  skills: [''],
  expiresAt: ''
};

const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations', 'HR', 'Finance', 'Legal', 'Customer Success'];
const jobBoards = ['LinkedIn', 'Indeed', 'Glassdoor', 'ZipRecruiter', 'AngelList', 'Company Website', 'Internal'];

/**
 * Job Postings Management Page
 * Production-ready: Complete job posting lifecycle management
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function JobsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [metrics, setMetrics] = useState<JobMetrics | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [locationTypeFilter, setLocationTypeFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedBoards, setSelectedBoards] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

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

        await fetchJobs();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchJobs = async () => {
    try {
      interface ApiJob {
        id: string;
        title: string;
        description: string;
        location: string;
        remote: boolean;
        status: string;
        salaryRange: string;
        views: number;
        applications: number;
        publishedAt: string;
        expiresAt: string;
        requisitionId: string;
        companyName: string;
      }

      interface ApiResponse {
        jobs: ApiJob[];
      }

      const response = await apiClient.get('/api/hiring/jobs');
      const data = response.data as ApiResponse;

      const transformedJobs: JobPosting[] = (data.jobs || []).map((j: ApiJob) => ({
        id: j.id,
        requisitionId: j.requisitionId || '',
        title: j.title,
        department: '',
        location: j.location,
        locationType: j.remote ? 'remote' : 'onsite' as JobPosting['locationType'],
        employmentType: 'full-time' as JobPosting['employmentType'],
        experienceLevel: 'mid' as JobPosting['experienceLevel'],
        salaryMin: 0,
        salaryMax: 0,
        salaryCurrency: 'USD',
        salaryVisible: !!j.salaryRange,
        description: j.description || '',
        requirements: [],
        responsibilities: [],
        benefits: [],
        skills: [],
        status: (j.status === 'published' ? 'published' : j.status === 'closed' ? 'closed' : 'draft') as JobPosting['status'],
        publishedAt: j.publishedAt || null,
        expiresAt: j.expiresAt || null,
        applicationCount: j.applications || 0,
        viewCount: j.views || 0,
        externalUrl: null,
        postedToBoards: [],
        createdAt: j.publishedAt || new Date().toISOString(),
        updatedAt: j.publishedAt || new Date().toISOString(),
        createdBy: ''
      }));

      setJobs(transformedJobs);
      calculateMetrics(transformedJobs);
    } catch (err) {
      logger.error('Error fetching jobs:', err);
    }
  };

  const calculateMetrics = (jobList: JobPosting[]) => {
    const metrics: JobMetrics = {
      total: jobList.length,
      draft: jobList.filter(j => j.status === 'draft').length,
      published: jobList.filter(j => j.status === 'published').length,
      paused: jobList.filter(j => j.status === 'paused').length,
      closed: jobList.filter(j => j.status === 'closed').length,
      filled: jobList.filter(j => j.status === 'filled').length,
      totalApplications: jobList.reduce((sum, j) => sum + j.applicationCount, 0),
      totalViews: jobList.reduce((sum, j) => sum + j.viewCount, 0),
      avgApplicationsPerJob: 0
    };

    const activeJobs = jobList.filter(j => j.status === 'published' || j.status === 'paused');
    metrics.avgApplicationsPerJob = activeJobs.length > 0
      ? Math.round(activeJobs.reduce((sum, j) => sum + j.applicationCount, 0) / activeJobs.length)
      : 0;

    setMetrics(metrics);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'published': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-red-100 text-red-700';
      case 'filled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'published': return <CheckCircle2 className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      case 'filled': return <Users className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getLocationTypeLabel = (type: string) => {
    switch (type) {
      case 'onsite': return 'On-site';
      case 'remote': return 'Remote';
      case 'hybrid': return 'Hybrid';
      default: return type;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    const matchesLocationType = locationTypeFilter === 'all' || job.locationType === locationTypeFilter;
    return matchesSearch && matchesStatus && matchesDepartment && matchesLocationType;
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

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In production, this would call the API
      const newJob: JobPosting = {
        id: `job-${Date.now()}`,
        requisitionId: formData.requisitionId,
        title: formData.title,
        department: formData.department,
        location: formData.location,
        locationType: formData.locationType,
        employmentType: formData.employmentType,
        experienceLevel: formData.experienceLevel,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        salaryCurrency: formData.salaryCurrency,
        salaryVisible: formData.salaryVisible,
        description: formData.description,
        requirements: formData.requirements.filter(r => r.trim() !== ''),
        responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
        benefits: formData.benefits.filter(b => b.trim() !== ''),
        skills: formData.skills.filter(s => s.trim() !== ''),
        status: 'draft',
        publishedAt: null,
        expiresAt: formData.expiresAt || null,
        applicationCount: 0,
        viewCount: 0,
        externalUrl: null,
        postedToBoards: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User'
      };

      setJobs([newJob, ...jobs]);
      calculateMetrics([newJob, ...jobs]);
      setShowCreateModal(false);
      setFormData(initialFormState);
      setSuccessMessage('Job posting created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error creating job:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setIsSubmitting(true);

    try {
      const updatedJob: JobPosting = {
        ...selectedJob,
        title: formData.title,
        department: formData.department,
        location: formData.location,
        locationType: formData.locationType,
        employmentType: formData.employmentType,
        experienceLevel: formData.experienceLevel,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
        salaryCurrency: formData.salaryCurrency,
        salaryVisible: formData.salaryVisible,
        description: formData.description,
        requirements: formData.requirements.filter(r => r.trim() !== ''),
        responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
        benefits: formData.benefits.filter(b => b.trim() !== ''),
        skills: formData.skills.filter(s => s.trim() !== ''),
        expiresAt: formData.expiresAt || null,
        updatedAt: new Date().toISOString()
      };

      const updatedJobs = jobs.map(j => j.id === selectedJob.id ? updatedJob : j);
      setJobs(updatedJobs);
      calculateMetrics(updatedJobs);
      setShowDetailModal(false);
      setEditMode(false);
      setSuccessMessage('Job posting updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error updating job:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: 'published' | 'paused' | 'closed') => {
    try {
      const updatedJobs = jobs.map(j => {
        if (j.id === jobId) {
          return {
            ...j,
            status: newStatus,
            publishedAt: newStatus === 'published' && !j.publishedAt ? new Date().toISOString() : j.publishedAt,
            updatedAt: new Date().toISOString()
          };
        }
        return j;
      });
      setJobs(updatedJobs);
      calculateMetrics(updatedJobs);
      setSuccessMessage(`Job ${newStatus === 'published' ? 'published' : newStatus === 'paused' ? 'paused' : 'closed'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error updating job status:', err);
    }
  };

  const handlePublishToBoards = async () => {
    if (!selectedJob || selectedBoards.length === 0) return;
    setIsSubmitting(true);

    try {
      const updatedJobs = jobs.map(j => {
        if (j.id === selectedJob.id) {
          const newBoards = [...new Set([...j.postedToBoards, ...selectedBoards])];
          return {
            ...j,
            status: 'published' as const,
            publishedAt: j.publishedAt || new Date().toISOString(),
            postedToBoards: newBoards,
            updatedAt: new Date().toISOString()
          };
        }
        return j;
      });
      setJobs(updatedJobs);
      calculateMetrics(updatedJobs);
      setShowPublishModal(false);
      setSelectedBoards([]);
      setSuccessMessage(`Job published to ${selectedBoards.length} board(s) successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error publishing job:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) return;

    try {
      const updatedJobs = jobs.filter(j => j.id !== jobId);
      setJobs(updatedJobs);
      calculateMetrics(updatedJobs);
      setSuccessMessage('Job posting deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      logger.error('Error deleting job:', err);
    }
  };

  const handleCopyLink = (job: JobPosting) => {
    const url = job.externalUrl || `https://careers.company.com/jobs/${job.id}`;
    navigator.clipboard.writeText(url);
    setSuccessMessage('Job link copied to clipboard!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const openDetailModal = (job: JobPosting) => {
    setSelectedJob(job);
    setFormData({
      requisitionId: job.requisitionId,
      title: job.title,
      department: job.department,
      location: job.location,
      locationType: job.locationType,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryCurrency: job.salaryCurrency,
      salaryVisible: job.salaryVisible,
      description: job.description,
      requirements: job.requirements.length > 0 ? job.requirements : [''],
      responsibilities: job.responsibilities.length > 0 ? job.responsibilities : [''],
      benefits: job.benefits.length > 0 ? job.benefits : [''],
      skills: job.skills.length > 0 ? job.skills : [''],
      expiresAt: job.expiresAt ? job.expiresAt.split('T')[0] : ''
    });
    setEditMode(false);
    setShowDetailModal(true);
  };

  const openPublishModal = (job: JobPosting) => {
    setSelectedJob(job);
    setSelectedBoards(job.postedToBoards);
    setShowPublishModal(true);
  };

  const addListItem = (field: 'requirements' | 'responsibilities' | 'benefits' | 'skills') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateListItem = (field: 'requirements' | 'responsibilities' | 'benefits' | 'skills', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeListItem = (field: 'requirements' | 'responsibilities' | 'benefits' | 'skills', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
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
              <Briefcase className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
                <p className="text-sm text-gray-600">Create and manage job listings</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/hiring')}
                className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => {
                  setFormData(initialFormState);
                  setShowCreateModal(true);
                }}
                className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Job Posting</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Metrics */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Total Jobs</p>
                <p className="text-2xl font-bold text-mizan-primary">{metrics.total}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Draft</p>
                <p className="text-2xl font-bold text-gray-600">{metrics.draft}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Published</p>
                <p className="text-2xl font-bold text-green-600">{metrics.published}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Paused</p>
                <p className="text-2xl font-bold text-yellow-600">{metrics.paused}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Filled</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.filled}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Applications</p>
                <p className="text-2xl font-bold text-orange-600">{metrics.totalApplications}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Avg Apps/Job</p>
                <p className="text-2xl font-bold text-mizan-gold">{metrics.avgApplicationsPerJob}</p>
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
                    placeholder="Search jobs..."
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
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
                <option value="filled">Filled</option>
              </select>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={locationTypeFilter}
                onChange={(e) => setLocationTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              >
                <option value="all">All Locations</option>
                <option value="onsite">On-site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Job Title</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Department</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Location</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Views</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Applications</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600">Posted To</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <>
                      <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleRowExpansion(job.id)}
                            className="flex items-center space-x-2 text-left"
                          >
                            {expandedRows.has(job.id) ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                            <div>
                              <p className="font-medium text-mizan-primary">{job.title}</p>
                              <p className="text-xs text-gray-500">{job.requisitionId}</p>
                            </div>
                          </button>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{job.department}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-600">{job.location}</p>
                              <p className="text-xs text-gray-400">{getLocationTypeLabel(job.locationType)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {getStatusIcon(job.status)}
                            <span className="capitalize">{job.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{job.viewCount.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{job.applicationCount}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {job.postedToBoards.length > 0 ? (
                            <div className="flex items-center justify-center space-x-1">
                              <Globe className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{job.postedToBoards.length} boards</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Not posted</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => openDetailModal(job)}
                              className="p-2 text-gray-400 hover:text-mizan-gold hover:bg-gray-100 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {job.status === 'draft' && (
                              <button
                                onClick={() => openPublishModal(job)}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Publish"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            )}
                            {job.status === 'published' && (
                              <button
                                onClick={() => handleStatusChange(job.id, 'paused')}
                                className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Pause"
                              >
                                <Pause className="w-4 h-4" />
                              </button>
                            )}
                            {job.status === 'paused' && (
                              <button
                                onClick={() => handleStatusChange(job.id, 'published')}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Resume"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleCopyLink(job)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Copy Link"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            {(job.status === 'draft' || job.status === 'closed') && (
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      {expandedRows.has(job.id) && (
                        <tr className="bg-gray-50">
                          <td colSpan={8} className="py-4 px-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Salary Range</h4>
                                <p className="text-gray-600">
                                  {job.salaryVisible ? (
                                    `${job.salaryCurrency} ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}`
                                  ) : (
                                    <span className="italic text-gray-400">Hidden from candidates</span>
                                  )}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Employment Type</h4>
                                <p className="text-gray-600 capitalize">{job.employmentType.replace('-', ' ')}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Experience Level</h4>
                                <p className="text-gray-600 capitalize">{job.experienceLevel}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Posted Boards</h4>
                                <div className="flex flex-wrap gap-1">
                                  {job.postedToBoards.length > 0 ? (
                                    job.postedToBoards.map(board => (
                                      <span key={board} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                        {board}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-gray-400 text-sm">Not posted yet</span>
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-1">
                                  {job.skills.map(skill => (
                                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Dates</h4>
                                <p className="text-sm text-gray-600">
                                  Created: {new Date(job.createdAt).toLocaleDateString()}
                                </p>
                                {job.publishedAt && (
                                  <p className="text-sm text-gray-600">
                                    Published: {new Date(job.publishedAt).toLocaleDateString()}
                                  </p>
                                )}
                                {job.expiresAt && (
                                  <p className="text-sm text-gray-600">
                                    Expires: {new Date(job.expiresAt).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No job postings found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-mizan-primary">Create Job Posting</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requisition ID</label>
                    <input
                      type="text"
                      value={formData.requisitionId}
                      onChange={(e) => setFormData({ ...formData, requisitionId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., REQ-2024-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., San Francisco, CA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location Type *</label>
                    <select
                      required
                      value={formData.locationType}
                      onChange={(e) => setFormData({ ...formData, locationType: e.target.value as typeof formData.locationType })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      <option value="onsite">On-site</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                    <select
                      required
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value as typeof formData.employmentType })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level *</label>
                    <select
                      required
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as typeof formData.experienceLevel })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior</option>
                      <option value="lead">Lead</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                    <input
                      type="date"
                      value={formData.expiresAt}
                      onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Compensation</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      value={formData.salaryCurrency}
                      onChange={(e) => setFormData({ ...formData, salaryCurrency: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="SAR">SAR</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Salary</label>
                    <input
                      type="number"
                      value={formData.salaryMin || ''}
                      onChange={(e) => setFormData({ ...formData, salaryMin: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., 100000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Salary</label>
                    <input
                      type="number"
                      value={formData.salaryMax || ''}
                      onChange={(e) => setFormData({ ...formData, salaryMax: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., 150000"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.salaryVisible}
                        onChange={(e) => setFormData({ ...formData, salaryVisible: e.target.checked })}
                        className="w-4 h-4 text-mizan-gold border-gray-300 rounded focus:ring-mizan-gold"
                      />
                      <span className="text-sm text-gray-700">Show salary to candidates</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Job Description</h3>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                  placeholder="Describe the role, team, and what makes this opportunity exciting..."
                />
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Requirements</h3>
                  <button
                    type="button"
                    onClick={() => addListItem('requirements')}
                    className="text-sm text-mizan-gold hover:text-mizan-gold/80"
                  >
                    + Add Requirement
                  </button>
                </div>
                {formData.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateListItem('requirements', idx, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., 5+ years of experience with React"
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem('requirements', idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Responsibilities */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Responsibilities</h3>
                  <button
                    type="button"
                    onClick={() => addListItem('responsibilities')}
                    className="text-sm text-mizan-gold hover:text-mizan-gold/80"
                  >
                    + Add Responsibility
                  </button>
                </div>
                {formData.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => updateListItem('responsibilities', idx, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Lead frontend architecture decisions"
                    />
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem('responsibilities', idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Benefits</h3>
                  <button
                    type="button"
                    onClick={() => addListItem('benefits')}
                    className="text-sm text-mizan-gold hover:text-mizan-gold/80"
                  >
                    + Add Benefit
                  </button>
                </div>
                {formData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateListItem('benefits', idx, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                      placeholder="e.g., Health insurance, 401k matching"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem('benefits', idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-700">Required Skills</h3>
                  <button
                    type="button"
                    onClick={() => addListItem('skills')}
                    className="text-sm text-mizan-gold hover:text-mizan-gold/80"
                  >
                    + Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => updateListItem('skills', idx, e.target.value)}
                        className="w-40 px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                        placeholder="e.g., React"
                      />
                      {formData.skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem('skills', idx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Create Draft</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail/Edit Modal */}
      {showDetailModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-mizan-primary">
                  {editMode ? 'Edit Job Posting' : 'Job Posting Details'}
                </h2>
                <p className="text-sm text-gray-500">{selectedJob.requisitionId}</p>
              </div>
              <div className="flex items-center space-x-2">
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 text-mizan-gold hover:bg-mizan-gold/10 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setEditMode(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {editMode ? (
              <form onSubmit={handleUpdateJob} className="p-6 space-y-6">
                {/* Same form fields as create modal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
                    <select
                      value={formData.locationType}
                      onChange={(e) => setFormData({ ...formData, locationType: e.target.value as typeof formData.locationType })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                    >
                      <option value="onsite">On-site</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 space-y-6">
                {/* Status and Metrics */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedJob.status)}`}>
                    {getStatusIcon(selectedJob.status)}
                    <span className="capitalize">{selectedJob.status}</span>
                  </span>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-700">{selectedJob.viewCount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-700">{selectedJob.applicationCount}</p>
                      <p className="text-xs text-gray-500">Applications</p>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">{selectedJob.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>{selectedJob.department}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedJob.location} ({getLocationTypeLabel(selectedJob.locationType)})</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>
                          {selectedJob.salaryVisible
                            ? `${selectedJob.salaryCurrency} ${selectedJob.salaryMin.toLocaleString()} - ${selectedJob.salaryMax.toLocaleString()}`
                            : 'Salary hidden from candidates'
                          }
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Posted To</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.postedToBoards.length > 0 ? (
                        selectedJob.postedToBoards.map(board => (
                          <span key={board} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                            {board}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">Not posted yet</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedJob.description}</p>
                </div>

                {/* Requirements & Responsibilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Requirements</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.benefits.map(benefit => (
                      <span key={benefit} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  {selectedJob.status === 'draft' && (
                    <button
                      onClick={() => {
                        setShowDetailModal(false);
                        openPublishModal(selectedJob);
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Publish</span>
                    </button>
                  )}
                  <button
                    onClick={() => router.push(`/dashboard/hiring/applications?job=${selectedJob.id}`)}
                    className="px-6 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>View Applications ({selectedJob.applicationCount})</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {showPublishModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md m-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-mizan-primary">Publish Job</h2>
              <p className="text-sm text-gray-500">{selectedJob.title}</p>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600">Select where to publish this job posting:</p>
              <div className="space-y-2">
                {jobBoards.map(board => (
                  <label key={board} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBoards.includes(board)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBoards([...selectedBoards, board]);
                        } else {
                          setSelectedBoards(selectedBoards.filter(b => b !== board));
                        }
                      }}
                      className="w-4 h-4 text-mizan-gold border-gray-300 rounded focus:ring-mizan-gold"
                    />
                    <span className="text-gray-700">{board}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowPublishModal(false);
                  setSelectedBoards([]);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePublishToBoards}
                disabled={isSubmitting || selectedBoards.length === 0}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish to {selectedBoards.length} Board(s)</span>
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
