'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Target,
  Search,
  Filter,
  Plus,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  BarChart3,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Crown,
  Zap,
  Brain,
  Shield,
  UserCheck,
  ArrowRight,
  Download,
  Upload,
  Sliders,
  Grid3X3,
  List,
  FileText,
  MessageSquare
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface TalentProfile {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  avatar: string;
  position: string;
  department: string;
  location: string;
  hireDate: string;
  yearsInRole: number;
  manager: string;

  // Assessment scores
  performanceRating: number;
  potentialRating: 'high' | 'medium' | 'low';
  readinessLevel: 'ready_now' | 'ready_1_year' | 'ready_2_years' | 'developing';

  // Competencies
  leadershipScore: number;
  technicalScore: number;
  strategicScore: number;
  interpersonalScore: number;
  innovationScore: number;

  // Risk & engagement
  retentionRisk: 'low' | 'medium' | 'high';
  engagementScore: number;
  flightRisk: number;

  // Development
  developmentProgress: number;
  activeDevelopmentPlans: number;
  completedPrograms: number;

  // Succession
  isSuccessorFor: string[];
  hasSuccessors: boolean;

  // Tags & notes
  tags: string[];
  keyStrengths: string[];
  developmentAreas: string[];
  notes: string;
  lastAssessmentDate: string;
  nextReviewDate: string;
}

interface NineBoxPosition {
  performance: 'low' | 'medium' | 'high';
  potential: 'low' | 'medium' | 'high';
  employees: TalentProfile[];
}

function IdentificationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [profiles, setProfiles] = useState<TalentProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<TalentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [potentialFilter, setPotentialFilter] = useState('all');
  const [readinessFilter, setReadinessFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'ninebox'>('grid');
  const [sortBy, setSortBy] = useState('potential');

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAssessModal, setShowAssessModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<TalentProfile | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [profiles, searchQuery, departmentFilter, potentialFilter, readinessFilter, riskFilter, sortBy]);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      interface ApiProfile {
        id: string;
        employeeId: string;
        name: string;
        email: string;
        role: string;
        department: string;
        potentialRating: string;
        performanceRating: string;
        nineBoxPosition: string;
        readinessLevel: string;
        strengths: string[];
        developmentAreas: string[];
        careerAspirations: string;
      }

      interface ApiResponse {
        profiles: ApiProfile[];
      }

      const response = await apiClient.get('/api/talent/profiles');
      const data = response.data as ApiResponse;

      // Transform API data to match frontend interface
      const transformedProfiles: TalentProfile[] = (data.profiles || []).map((p: ApiProfile) => ({
        id: p.id,
        employeeId: p.employeeId,
        name: p.name,
        email: p.email,
        avatar: '',
        position: p.role,
        department: p.department,
        location: '',
        hireDate: '',
        yearsInRole: 0,
        manager: '',
        performanceRating: p.performanceRating === 'high' ? 4.5 : p.performanceRating === 'medium' ? 3.5 : 2.5,
        potentialRating: (p.potentialRating || 'medium') as TalentProfile['potentialRating'],
        readinessLevel: (p.readinessLevel || 'developing') as TalentProfile['readinessLevel'],
        leadershipScore: 75,
        technicalScore: 75,
        strategicScore: 75,
        interpersonalScore: 75,
        innovationScore: 75,
        retentionRisk: 'low' as const,
        engagementScore: 80,
        flightRisk: 10,
        developmentProgress: p.readinessLevel === 'ready_now' ? 90 : p.readinessLevel === 'ready_1_year' ? 70 : 50,
        activeDevelopmentPlans: 1,
        completedPrograms: 2,
        isSuccessorFor: [],
        hasSuccessors: false,
        tags: p.potentialRating === 'high' ? ['High Potential'] : [],
        keyStrengths: p.strengths || [],
        developmentAreas: p.developmentAreas || [],
        notes: '',
        lastAssessmentDate: new Date().toISOString().split('T')[0],
        nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));

      setProfiles(transformedProfiles);
    } catch (error) {
      logger.error('Error fetching talent profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...profiles];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.position.toLowerCase().includes(query) ||
        p.department.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(p => p.department === departmentFilter);
    }

    if (potentialFilter !== 'all') {
      filtered = filtered.filter(p => p.potentialRating === potentialFilter);
    }

    if (readinessFilter !== 'all') {
      filtered = filtered.filter(p => p.readinessLevel === readinessFilter);
    }

    if (riskFilter !== 'all') {
      filtered = filtered.filter(p => p.retentionRisk === riskFilter);
    }

    // Sort
    switch (sortBy) {
      case 'potential':
        const potentialOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        filtered.sort((a, b) => potentialOrder[b.potentialRating] - potentialOrder[a.potentialRating]);
        break;
      case 'performance':
        filtered.sort((a, b) => b.performanceRating - a.performanceRating);
        break;
      case 'readiness':
        const readinessOrder = { 'ready_now': 4, 'ready_1_year': 3, 'ready_2_years': 2, 'developing': 1 };
        filtered.sort((a, b) => readinessOrder[b.readinessLevel] - readinessOrder[a.readinessLevel]);
        break;
      case 'risk':
        const riskOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        filtered.sort((a, b) => riskOrder[b.retentionRisk] - riskOrder[a.retentionRisk]);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProfiles(filtered);
  };

  const getPotentialColor = (potential: string): string => {
    switch (potential) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReadinessColor = (level: string): string => {
    switch (level) {
      case 'ready_now': return 'bg-green-100 text-green-800';
      case 'ready_1_year': return 'bg-blue-100 text-blue-800';
      case 'ready_2_years': return 'bg-yellow-100 text-yellow-800';
      case 'developing': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReadinessLabel = (level: string): string => {
    switch (level) {
      case 'ready_now': return 'Ready Now';
      case 'ready_1_year': return '1 Year';
      case 'ready_2_years': return '2 Years';
      case 'developing': return 'Developing';
      default: return 'Unknown';
    }
  };

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const openProfileModal = (profile: TalentProfile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const departments = [...new Set(profiles.map(p => p.department))];

  // Nine-box grid calculation
  const getNineBoxData = (): NineBoxPosition[][] => {
    const grid: NineBoxPosition[][] = [
      [
        { performance: 'low', potential: 'high', employees: [] },
        { performance: 'medium', potential: 'high', employees: [] },
        { performance: 'high', potential: 'high', employees: [] }
      ],
      [
        { performance: 'low', potential: 'medium', employees: [] },
        { performance: 'medium', potential: 'medium', employees: [] },
        { performance: 'high', potential: 'medium', employees: [] }
      ],
      [
        { performance: 'low', potential: 'low', employees: [] },
        { performance: 'medium', potential: 'low', employees: [] },
        { performance: 'high', potential: 'low', employees: [] }
      ]
    ];

    filteredProfiles.forEach(profile => {
      const perfLevel = profile.performanceRating >= 4.5 ? 'high' : profile.performanceRating >= 3.5 ? 'medium' : 'low';
      const potLevel = profile.potentialRating;

      const rowIdx = potLevel === 'high' ? 0 : potLevel === 'medium' ? 1 : 2;
      const colIdx = perfLevel === 'low' ? 0 : perfLevel === 'medium' ? 1 : 2;

      grid[rowIdx][colIdx].employees.push(profile);
    });

    return grid;
  };

  // Metrics
  const highPotentials = profiles.filter(p => p.potentialRating === 'high').length;
  const readyNow = profiles.filter(p => p.readinessLevel === 'ready_now').length;
  const atRisk = profiles.filter(p => p.retentionRisk === 'high').length;
  const avgPerformance = profiles.length > 0
    ? (profiles.reduce((acc, p) => acc + p.performanceRating, 0) / profiles.length).toFixed(1)
    : '0';

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
            <Target className="w-8 h-8 text-mizan-gold" />
            <h1 className="text-3xl font-bold text-gray-900">Talent Identification</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5" />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5" />
              Export
            </button>
            <button
              onClick={() => setShowAssessModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg hover:bg-yellow-400 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              New Assessment
            </button>
          </div>
        </div>
        <p className="text-gray-600">Identify and evaluate high-potential employees</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">High Potentials</span>
            <Star className="w-5 h-5 text-mizan-gold" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{highPotentials}</div>
          <div className="text-xs text-green-600 mt-1">{Math.round((highPotentials / profiles.length) * 100)}% of talent pool</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Ready Now</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{readyNow}</div>
          <div className="text-xs text-gray-500 mt-1">For next-level roles</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">At Risk</span>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{atRisk}</div>
          <div className="text-xs text-red-600 mt-1">High retention risk</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Avg Performance</span>
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{avgPerformance}</div>
          <div className="text-xs text-gray-500 mt-1">Out of 5.0</div>
        </div>
      </div>

      {/* Filters & View Toggle */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, role, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
              />
            </div>
          </div>

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
            value={potentialFilter}
            onChange={(e) => setPotentialFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Potentials</option>
            <option value="high">High Potential</option>
            <option value="medium">Medium Potential</option>
            <option value="low">Low Potential</option>
          </select>

          <select
            value={readinessFilter}
            onChange={(e) => setReadinessFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Readiness</option>
            <option value="ready_now">Ready Now</option>
            <option value="ready_1_year">Ready in 1 Year</option>
            <option value="ready_2_years">Ready in 2 Years</option>
            <option value="developing">Developing</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>

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
            <button
              onClick={() => setViewMode('ninebox')}
              className={`p-2 ${viewMode === 'ninebox' ? 'bg-mizan-gold/10 text-mizan-primary' : 'text-gray-400 hover:bg-gray-50'}`}
              title="9-Box Grid"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredProfiles.length}</span> of {profiles.length} profiles
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
        >
          <option value="potential">Sort by Potential</option>
          <option value="performance">Sort by Performance</option>
          <option value="readiness">Sort by Readiness</option>
          <option value="risk">Sort by Risk</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProfiles.map(profile => (
            <div
              key={profile.id}
              onClick={() => openProfileModal(profile)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-mizan-gold/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-mizan-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-500">{profile.position}</p>
                  </div>
                </div>
                {profile.retentionRisk === 'high' && (
                  <span title="High retention risk">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPotentialColor(profile.potentialRating)}`}>
                  {profile.potentialRating.charAt(0).toUpperCase() + profile.potentialRating.slice(1)} Potential
                </span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${getReadinessColor(profile.readinessLevel)}`}>
                  {getReadinessLabel(profile.readinessLevel)}
                </span>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="text-xs text-gray-500">Performance</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{profile.performanceRating}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Engagement</div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-900">{profile.engagementScore}%</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Development Progress</span>
                  <span className="text-mizan-primary font-medium">{profile.developmentProgress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-mizan-gold transition-all"
                    style={{ width: `${profile.developmentProgress}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {profile.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>{profile.department}</span>
                <span className={getRiskColor(profile.retentionRisk)}>
                  {profile.retentionRisk === 'high' ? 'High Risk' :
                   profile.retentionRisk === 'medium' ? 'Medium Risk' : 'Low Risk'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Readiness</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProfiles.map(profile => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-mizan-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{profile.name}</div>
                        <div className="text-sm text-gray-500">{profile.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{profile.department}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getPotentialColor(profile.potentialRating)}`}>
                      {profile.potentialRating.charAt(0).toUpperCase() + profile.potentialRating.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{profile.performanceRating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getReadinessColor(profile.readinessLevel)}`}>
                      {getReadinessLabel(profile.readinessLevel)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {profile.retentionRisk === 'high' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                      <span className={`text-sm ${getRiskColor(profile.retentionRisk)}`}>
                        {profile.retentionRisk.charAt(0).toUpperCase() + profile.retentionRisk.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openProfileModal(profile)}
                      className="text-mizan-primary hover:underline text-sm font-medium"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 9-Box View */}
      {viewMode === 'ninebox' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">9-Box Talent Grid</h3>
          <div className="flex">
            {/* Y-axis label */}
            <div className="flex flex-col justify-around items-center mr-4 text-sm text-gray-500">
              <span className="transform -rotate-90 w-20">High Potential</span>
              <span className="transform -rotate-90 w-20">Med Potential</span>
              <span className="transform -rotate-90 w-20">Low Potential</span>
            </div>

            {/* Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-2">
                {getNineBoxData().map((row, rowIdx) =>
                  row.map((cell, colIdx) => {
                    const bgColor = rowIdx === 0 && colIdx === 2 ? 'bg-green-50 border-green-200' :
                                   rowIdx === 0 || colIdx === 2 ? 'bg-blue-50 border-blue-200' :
                                   rowIdx === 2 && colIdx === 0 ? 'bg-red-50 border-red-200' :
                                   'bg-gray-50 border-gray-200';
                    return (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className={`${bgColor} border-2 rounded-lg p-3 min-h-[120px]`}
                      >
                        <div className="text-xs text-gray-500 mb-2">
                          {cell.employees.length} employee{cell.employees.length !== 1 ? 's' : ''}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {cell.employees.slice(0, 4).map(emp => (
                            <div
                              key={emp.id}
                              onClick={() => openProfileModal(emp)}
                              className="w-8 h-8 bg-mizan-primary rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:ring-2 hover:ring-mizan-gold"
                              title={emp.name}
                            >
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          ))}
                          {cell.employees.length > 4 && (
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold">
                              +{cell.employees.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              {/* X-axis label */}
              <div className="flex justify-around mt-2 text-sm text-gray-500">
                <span>Low Performance</span>
                <span>Med Performance</span>
                <span>High Performance</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Detail Modal */}
      {showProfileModal && selectedProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-mizan-primary rounded-full flex items-center justify-center text-white text-xl font-semibold">
                    {selectedProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedProfile.name}</h2>
                    <p className="text-gray-600">{selectedProfile.position}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPotentialColor(selectedProfile.potentialRating)}`}>
                        {selectedProfile.potentialRating.charAt(0).toUpperCase() + selectedProfile.potentialRating.slice(1)} Potential
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${getReadinessColor(selectedProfile.readinessLevel)}`}>
                        {getReadinessLabel(selectedProfile.readinessLevel)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{selectedProfile.performanceRating}</div>
                  <div className="text-xs text-gray-500">Performance</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{selectedProfile.engagementScore}%</div>
                  <div className="text-xs text-gray-500">Engagement</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{selectedProfile.developmentProgress}%</div>
                  <div className="text-xs text-gray-500">Development</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <AlertTriangle className={`w-6 h-6 mx-auto mb-2 ${getRiskColor(selectedProfile.retentionRisk)}`} />
                  <div className="text-xl font-bold text-gray-900">{selectedProfile.flightRisk}%</div>
                  <div className="text-xs text-gray-500">Flight Risk</div>
                </div>
              </div>

              {/* Competency Scores */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Competency Assessment</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Leadership', score: selectedProfile.leadershipScore },
                    { name: 'Technical', score: selectedProfile.technicalScore },
                    { name: 'Strategic', score: selectedProfile.strategicScore },
                    { name: 'Interpersonal', score: selectedProfile.interpersonalScore },
                    { name: 'Innovation', score: selectedProfile.innovationScore }
                  ].map(comp => (
                    <div key={comp.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{comp.name}</span>
                        <span className="font-medium text-gray-900">{comp.score}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-mizan-gold transition-all"
                          style={{ width: `${comp.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Development Areas */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Key Strengths</h3>
                  <div className="space-y-2">
                    {selectedProfile.keyStrengths.map(strength => (
                      <div key={strength} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Development Areas</h3>
                  <div className="space-y-2">
                    {selectedProfile.developmentAreas.map(area => (
                      <div key={area} className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-700">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Succession Planning */}
              {selectedProfile.isSuccessorFor.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Successor For</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.isSuccessorFor.map(role => (
                      <span key={role} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedProfile.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedProfile.notes}</p>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-500">Department:</span>
                  <span className="ml-2 text-gray-900">{selectedProfile.department}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Location:</span>
                  <span className="ml-2 text-gray-900">{selectedProfile.location}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Manager:</span>
                  <span className="ml-2 text-gray-900">{selectedProfile.manager}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Years in Role:</span>
                  <span className="ml-2 text-gray-900">{selectedProfile.yearsInRole}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Last Assessment:</span>
                  <span className="ml-2 text-gray-900">{new Date(selectedProfile.lastAssessmentDate).toLocaleDateString()}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Next Review:</span>
                  <span className="ml-2 text-gray-900">{new Date(selectedProfile.nextReviewDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedProfile.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-mizan-gold text-mizan-primary rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                  Create Development Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredProfiles.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No profiles found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default function IdentificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-mizan-gold" /></div>}>
      <IdentificationPageContent />
    </Suspense>
  );
}
