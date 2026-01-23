'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Video,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Plus,
  Search,
  MapPin,
  MessageSquare,
  FileText,
  Loader2,
  ChevronRight
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface Meeting {
  id: string;
  title: string;
  type: '1on1' | 'team' | 'evaluation' | 'feedback';
  participantId: string;
  participantName: string;
  participantEmail: string;
  organizerId: string;
  organizerName: string;
  scheduledAt: string;
  duration: number; // minutes
  location: 'virtual' | 'in_person';
  meetingLink?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  agenda?: string[];
  outcomes?: string[];
}

interface MeetingMetrics {
  scheduled: number;
  completed: number;
  cancelled: number;
  averageDuration: number;
  thisWeek: number;
  nextWeek: number;
}

/**
 * Performance Meetings Page
 * Production-ready: 1:1 and team meeting management
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function MeetingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [metrics, setMetrics] = useState<MeetingMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');

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
        setUserName(payload.name || 'User');

        await fetchMeetings();
        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchMeetings = async () => {
    try {
      interface BackendMeeting {
        id: string;
        title?: string;
        meetingType?: string;
        employeeId: string;
        employeeName?: string;
        employeeEmail?: string;
        managerId?: string;
        managerName?: string;
        scheduledAt?: string;
        duration?: number;
        location?: string;
        meetingLink?: string;
        status: string;
        notes?: string;
        agenda?: string[];
        outcomes?: string[];
      }

      interface ApiResponse {
        meetings: BackendMeeting[];
        metrics: MeetingMetrics;
      }

      const response = await apiClient.get('/api/performance/meetings');
      const data = response.data as ApiResponse;

      // Transform backend data to match frontend interface
      const transformedMeetings: Meeting[] = (data.meetings || []).map((m: BackendMeeting) => ({
        id: m.id,
        title: m.title || '1:1 Meeting',
        type: (m.meetingType || '1on1') as Meeting['type'],
        participantId: m.employeeId,
        participantName: m.employeeName || 'Unknown',
        participantEmail: m.employeeEmail || '',
        organizerId: m.managerId || '',
        organizerName: m.managerName || 'Unknown Manager',
        scheduledAt: m.scheduledAt || new Date().toISOString(),
        duration: m.duration || 30,
        location: (m.location || 'virtual') as Meeting['location'],
        meetingLink: m.meetingLink,
        status: m.status as Meeting['status'],
        notes: m.notes,
        agenda: m.agenda,
        outcomes: m.outcomes
      }));

      setMeetings(transformedMeetings);
      setMetrics(data.metrics || {
        scheduled: transformedMeetings.filter(m => m.status === 'scheduled').length,
        completed: transformedMeetings.filter(m => m.status === 'completed').length,
        cancelled: transformedMeetings.filter(m => m.status === 'cancelled').length,
        averageDuration: 30,
        thisWeek: 0,
        nextWeek: 0
      });
    } catch (err) {
      logger.error('Error fetching meetings:', err);
      setError('Failed to load meetings. Please try again.');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '1on1': return Users;
      case 'team': return Users;
      case 'evaluation': return FileText;
      case 'feedback': return MessageSquare;
      default: return Calendar;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case '1on1': return '1:1 Meeting';
      case 'team': return 'Team Meeting';
      case 'evaluation': return 'Evaluation';
      case 'feedback': return 'Feedback Session';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return { bg: 'bg-blue-100', text: 'text-blue-700' };
      case 'in_progress': return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
      case 'completed': return { bg: 'bg-green-100', text: 'text-green-700' };
      case 'cancelled': return { bg: 'bg-red-100', text: 'text-red-700' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700' };
    }
  };

  const now = new Date();
  const filteredMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.scheduledAt);
    const isUpcoming = meetingDate >= now || meeting.status === 'scheduled';
    const isPast = meetingDate < now || meeting.status === 'completed';

    const matchesView = view === 'upcoming' ? isUpcoming : isPast;
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          meeting.participantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || meeting.type === typeFilter;

    return matchesView && matchesSearch && matchesType;
  });

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
              <Calendar className="w-8 h-8 text-mizan-gold" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Performance Meetings</h1>
                <p className="text-sm text-gray-600">Schedule and manage 1:1s and team meetings</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard/performance')}
                className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Performance</span>
              </button>
              <button className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Metrics Cards */}
          {metrics && (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-mizan-primary">{metrics.thisWeek}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Next Week</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.nextWeek}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-yellow-600">{metrics.scheduled}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{metrics.completed}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{metrics.cancelled}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold text-mizan-gold">{metrics.averageDuration}m</p>
              </div>
            </div>
          )}

          {/* View Toggle & Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('upcoming')}
                  className={`px-4 py-2 rounded-lg transition-colors ${view === 'upcoming' ? 'bg-white shadow-sm text-mizan-primary' : 'text-gray-600'}`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setView('past')}
                  className={`px-4 py-2 rounded-lg transition-colors ${view === 'past' ? 'bg-white shadow-sm text-mizan-primary' : 'text-gray-600'}`}
                >
                  Past
                </button>
              </div>

              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search meetings..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="1on1">1:1 Meetings</option>
                <option value="team">Team Meetings</option>
                <option value="evaluation">Evaluations</option>
                <option value="feedback">Feedback Sessions</option>
              </select>
            </div>
          </div>

          {/* Meetings List */}
          <div className="space-y-4">
            {filteredMeetings.map((meeting) => {
              const TypeIcon = getTypeIcon(meeting.type);
              const statusStyle = getStatusColor(meeting.status);
              const meetingDate = new Date(meeting.scheduledAt);

              return (
                <div
                  key={meeting.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-mizan-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <TypeIcon className="w-6 h-6 text-mizan-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold text-mizan-primary text-lg">{meeting.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                            {meeting.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          with {meeting.participantName}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{meetingDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{meetingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{meeting.duration} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {meeting.location === 'virtual' ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            <span>{meeting.location === 'virtual' ? 'Virtual' : 'In Person'}</span>
                          </div>
                        </div>

                        {meeting.agenda && meeting.agenda.length > 0 && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs font-medium text-gray-500 mb-2">AGENDA</p>
                            <ul className="space-y-1">
                              {meeting.agenda.map((item, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start space-x-2">
                                  <span className="text-mizan-gold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {meeting.outcomes && meeting.outcomes.length > 0 && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <p className="text-xs font-medium text-green-700 mb-2">OUTCOMES</p>
                            <ul className="space-y-1">
                              {meeting.outcomes.map((item, idx) => (
                                <li key={idx} className="text-sm text-green-700 flex items-start space-x-2">
                                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {meeting.meetingLink && meeting.status === 'scheduled' && (
                        <a
                          href={meeting.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors flex items-center space-x-1"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join</span>
                        </a>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredMeetings.length === 0 && (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No {view} meetings found.</p>
                <button className="mt-4 px-4 py-2 bg-mizan-gold text-white rounded-lg hover:bg-mizan-gold/90 transition-colors">
                  Schedule a Meeting
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
