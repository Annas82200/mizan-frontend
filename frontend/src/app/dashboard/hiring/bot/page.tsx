'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bot,
  Send,
  ArrowLeft,
  Loader2,
  User,
  Sparkles,
  FileText,
  Users,
  Briefcase,
  TrendingUp,
  Search,
  ClipboardList,
  MessageSquare,
  Lightbulb,
  Target,
  BarChart3,
  RefreshCw,
  Copy,
  CheckCircle2,
  X,
  ChevronDown,
  Clock,
  Zap
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  sources?: Array<{
    title: string;
    type: 'candidate' | 'job' | 'interview' | 'analytics';
    link: string;
  }>;
}

interface QuickAction {
  icon: React.ElementType;
  label: string;
  prompt: string;
  category: 'candidates' | 'jobs' | 'interviews' | 'analytics';
}

const quickActions: QuickAction[] = [
  {
    icon: Users,
    label: 'Screen top candidates',
    prompt: 'Show me the top 5 candidates for our open positions based on match score and qualifications.',
    category: 'candidates'
  },
  {
    icon: Search,
    label: 'Find candidates by skill',
    prompt: 'Find all candidates who have experience with React and TypeScript.',
    category: 'candidates'
  },
  {
    icon: ClipboardList,
    label: 'Compare candidates',
    prompt: 'Compare the top 3 candidates for the Senior Frontend Engineer position.',
    category: 'candidates'
  },
  {
    icon: Briefcase,
    label: 'Job posting suggestions',
    prompt: 'Suggest improvements for our current job postings to attract more qualified candidates.',
    category: 'jobs'
  },
  {
    icon: FileText,
    label: 'Draft job description',
    prompt: 'Help me draft a job description for a new position.',
    category: 'jobs'
  },
  {
    icon: TrendingUp,
    label: 'Salary benchmarking',
    prompt: 'What are the market salary ranges for our open positions?',
    category: 'jobs'
  },
  {
    icon: MessageSquare,
    label: 'Interview questions',
    prompt: 'Generate interview questions for a technical interview with a frontend engineer candidate.',
    category: 'interviews'
  },
  {
    icon: Target,
    label: 'Interview prep',
    prompt: 'Help me prepare for an upcoming interview. What should I focus on?',
    category: 'interviews'
  },
  {
    icon: BarChart3,
    label: 'Hiring funnel analysis',
    prompt: 'Analyze our current hiring funnel and identify bottlenecks.',
    category: 'analytics'
  },
  {
    icon: Lightbulb,
    label: 'Recruitment insights',
    prompt: 'What insights can you provide about our recent recruitment performance?',
    category: 'analytics'
  }
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  candidates: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  jobs: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  interviews: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  analytics: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
};

/**
 * AI Hiring Assistant Page
 * Production-ready: AI-powered hiring support and recommendations
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function HiringBotPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

        // Add welcome message
        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: `Hello! I'm your AI Hiring Assistant. I can help you with:

• **Candidate Screening** - Find and compare top candidates
• **Job Postings** - Draft and optimize job descriptions
• **Interview Prep** - Generate questions and preparation tips
• **Analytics** - Analyze your hiring funnel and metrics

How can I assist you today?`,
          timestamp: new Date(),
          suggestions: [
            'Show me top candidates',
            'Help draft a job posting',
            'Generate interview questions',
            'Analyze hiring metrics'
          ]
        }]);

        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  const simulateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI response based on user message
    const lowerMessage = userMessage.toLowerCase();

    let response: Partial<Message> = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      timestamp: new Date()
    };

    if (lowerMessage.includes('top candidate') || lowerMessage.includes('best candidate')) {
      response.content = `Based on our current applicant pool, here are the top candidates:

**1. Alex Johnson** - Senior Frontend Engineer
- Match Score: 92%
- Experience: 6 years with React, TypeScript, Next.js
- Status: Shortlisted
- Strengths: Strong technical background, excellent portfolio

**2. Sarah Williams** - Senior Frontend Engineer
- Match Score: 88%
- Experience: 8 years, currently at FinTech Solutions
- Status: Interview scheduled
- Strengths: Referral candidate, diverse experience

**3. Emily Rodriguez** - Senior Frontend Engineer
- Match Score: 82%
- Experience: 5 years full-stack development
- Status: Under review
- Strengths: Problem solver, diverse skill set

Would you like me to provide more details on any of these candidates or schedule interviews?`;
      response.suggestions = [
        'Compare these candidates in detail',
        'Schedule interviews with top 2',
        'Show their resumes',
        'Check interview availability'
      ];
      response.sources = [
        { title: 'Alex Johnson Application', type: 'candidate', link: '/dashboard/hiring/applications?id=app-001' },
        { title: 'Sarah Williams Application', type: 'candidate', link: '/dashboard/hiring/applications?id=app-002' },
        { title: 'Emily Rodriguez Application', type: 'candidate', link: '/dashboard/hiring/applications?id=app-004' }
      ];
    } else if (lowerMessage.includes('interview question')) {
      response.content = `Here are recommended interview questions for a **Technical Frontend Engineer Interview**:

**Technical Questions:**
1. "Walk me through how you would architect a large-scale React application. What patterns would you use for state management?"

2. "How do you approach performance optimization in React? Can you give an example of a performance issue you solved?"

3. "Explain the difference between SSR and SSG in Next.js. When would you use each?"

4. "How do you handle error boundaries and error handling in React applications?"

**Behavioral Questions:**
5. "Tell me about a time you had to refactor legacy code. How did you approach it?"

6. "Describe a situation where you had to push back on a design or product decision. How did you handle it?"

7. "How do you stay current with frontend technologies?"

**Culture Fit:**
8. "What kind of engineering culture brings out your best work?"

9. "How do you approach code reviews - both giving and receiving feedback?"

Would you like me to generate more specific questions or provide scoring rubrics?`;
      response.suggestions = [
        'Create scoring rubric',
        'Add more behavioral questions',
        'Questions for junior candidates',
        'Culture fit assessment questions'
      ];
    } else if (lowerMessage.includes('job posting') || lowerMessage.includes('job description')) {
      response.content = `I can help you create or optimize job postings. Here are some suggestions:

**Current Job Posting Analysis:**
Your "Senior Frontend Engineer" posting could be improved:

**Recommendations:**
1. ✅ **Add specific tech stack** - List React, TypeScript, Next.js explicitly
2. ⚠️ **Salary transparency** - Consider showing salary range (increases applications by 30%)
3. ✅ **Remote options** - Clearly state hybrid/remote policy
4. ⚠️ **Requirements vs nice-to-have** - Separate must-haves from preferred qualifications
5. ✅ **Benefits highlight** - Move benefits higher in the posting

**Sample Optimized Opening:**
> "Join our engineering team building the next generation of [product]. As a Senior Frontend Engineer, you'll lead architectural decisions, mentor developers, and shape our technical direction. We offer competitive salary ($150k-$200k), remote flexibility, and a culture that values work-life balance."

Would you like me to rewrite the full job description or help create a new one?`;
      response.suggestions = [
        'Rewrite full job description',
        'Create new job posting',
        'Optimize current postings',
        'A/B test job titles'
      ];
      response.sources = [
        { title: 'Senior Frontend Engineer Posting', type: 'job', link: '/dashboard/hiring/jobs?id=job-001' }
      ];
    } else if (lowerMessage.includes('funnel') || lowerMessage.includes('analytics') || lowerMessage.includes('metrics')) {
      response.content = `**Hiring Funnel Analysis - Last 30 Days**

📊 **Pipeline Overview:**
| Stage | Count | Conversion |
|-------|-------|------------|
| Applied | 156 | - |
| Screened | 89 | 57% |
| Interviewed | 34 | 38% |
| Offer Extended | 8 | 24% |
| Hired | 5 | 63% |

**Key Insights:**
1. 🔴 **Bottleneck Identified**: Phone screen to interview conversion (38%) is below industry average (45%)
   - *Recommendation*: Review screening criteria or add preliminary technical assessment

2. 🟢 **Strong Offer Acceptance**: 63% acceptance rate is above average
   - Our compensation packages are competitive

3. 🟡 **Time-to-Hire**: Average 28 days
   - Industry average is 23 days for tech roles
   - *Recommendation*: Streamline interview scheduling

**Top Performing Sources:**
1. LinkedIn (42% of hires)
2. Referrals (28% of hires) - highest quality
3. Indeed (18% of hires)

Would you like detailed recommendations for improving any specific stage?`;
      response.suggestions = [
        'How to improve screening conversion',
        'Optimize time-to-hire',
        'Source quality comparison',
        'Weekly recruitment report'
      ];
      response.sources = [
        { title: 'Hiring Analytics Dashboard', type: 'analytics', link: '/dashboard/hiring?tab=analytics' }
      ];
    } else if (lowerMessage.includes('salary') || lowerMessage.includes('compensation') || lowerMessage.includes('benchmark')) {
      response.content = `**Salary Benchmarking Analysis**

Based on current market data for your locations:

**Senior Frontend Engineer** (San Francisco, Hybrid)
| Percentile | Salary Range |
|------------|-------------|
| 25th | $140,000 |
| 50th (Median) | $165,000 |
| 75th | $190,000 |
| 90th | $220,000 |

Your current range: **$150,000 - $200,000** ✅
*Analysis: Competitive - aligns with 50th-85th percentile*

**Product Manager** (New York, On-site)
| Percentile | Salary Range |
|------------|-------------|
| 25th | $125,000 |
| 50th (Median) | $145,000 |
| 75th | $170,000 |
| 90th | $195,000 |

Your current range: **$120,000 - $160,000** ⚠️
*Analysis: Slightly below market - consider increasing minimum*

**Recommendations:**
1. Increase Product Manager minimum to $130,000
2. Add signing bonuses for hard-to-fill roles
3. Highlight equity compensation in offers

Would you like me to generate offer letters or compensation packages?`;
      response.suggestions = [
        'Generate offer letter template',
        'Compare with competitor salaries',
        'Total compensation analysis',
        'Equity package calculator'
      ];
    } else if (lowerMessage.includes('compare') && lowerMessage.includes('candidate')) {
      response.content = `**Candidate Comparison - Senior Frontend Engineer**

| Criteria | Alex Johnson | Sarah Williams | Emily Rodriguez |
|----------|-------------|----------------|-----------------|
| **Match Score** | 92% ⭐ | 88% | 82% |
| **Experience** | 6 years | 8 years ⭐ | 5 years |
| **React Proficiency** | Expert | Expert | Advanced |
| **TypeScript** | Expert ⭐ | Advanced | Advanced |
| **Leadership** | Some | Significant ⭐ | Limited |
| **Salary Expectation** | $175K | $185K | $155K ⭐ |
| **Availability** | 2 weeks | 4 weeks | Immediate ⭐ |
| **Culture Fit** | Strong | Strong | Good |

**Recommendation:**
🏆 **Alex Johnson** is the strongest overall candidate with the highest match score and excellent technical skills. However, **Sarah Williams** brings more leadership experience which could be valuable for team growth.

**Trade-off Analysis:**
- If immediate start is critical → Emily Rodriguez
- If leadership is priority → Sarah Williams
- If pure technical excellence → Alex Johnson

Would you like to proceed with any of these candidates?`;
      response.suggestions = [
        'Schedule final interviews',
        'Prepare offer for Alex',
        'Request additional references',
        'Technical deep-dive comparison'
      ];
    } else {
      response.content = `I understand you're asking about "${userMessage}". Let me help you with that.

As your AI Hiring Assistant, I can provide insights on:

• **Candidate Analysis** - Screen, compare, and evaluate applicants
• **Job Optimization** - Improve job postings and descriptions
• **Interview Support** - Generate questions and preparation guides
• **Data Insights** - Analyze hiring metrics and trends
• **Compensation** - Salary benchmarking and offer guidance

Could you provide more details about what you'd like to accomplish? I can give you more specific recommendations.`;
      response.suggestions = [
        'Show active candidates',
        'Review job postings',
        'Prepare for interviews',
        'View hiring analytics'
      ];
    }

    return response as Message;
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowQuickActions(false);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      const response = await simulateAIResponse(messageText);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      logger.error('Error getting AI response:', error);
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.prompt);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearConversation = () => {
    setMessages([{
      id: 'welcome-new',
      role: 'assistant',
      content: `Conversation cleared. How can I help you with hiring today?`,
      timestamp: new Date(),
      suggestions: [
        'Show me top candidates',
        'Help draft a job posting',
        'Generate interview questions',
        'Analyze hiring metrics'
      ]
    }]);
    setShowQuickActions(true);
  };

  const filteredQuickActions = selectedCategory === 'all'
    ? quickActions
    : quickActions.filter(a => a.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-mizan-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-mizan-gold to-mizan-gold/80 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hiring Assistant</h1>
                <p className="text-xs text-gray-500">AI-powered recruitment support</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={clearConversation}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">New Chat</span>
              </button>
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
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-3xl ${message.role === 'user' ? 'order-2' : ''}`}>
                  <div className="flex items-start space-x-3">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-mizan-gold to-mizan-gold/80 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div
                        className={`inline-block p-4 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-mizan-gold text-white rounded-br-md'
                            : 'bg-white border border-gray-200 rounded-tl-md'
                        }`}
                      >
                        <div
                          className={`prose prose-sm max-w-none ${message.role === 'user' ? 'text-white' : 'text-gray-700'}`}
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          {message.content.split('\n').map((line, i) => {
                            // Simple markdown-like formatting
                            let formattedLine = line
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');
                            return <p key={i} dangerouslySetInnerHTML={{ __html: formattedLine || '&nbsp;' }} />;
                          })}
                        </div>
                      </div>

                      {/* Copy button for assistant messages */}
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className="mt-2 text-xs text-gray-400 hover:text-gray-600 flex items-center space-x-1"
                        >
                          {copiedId === message.id ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Sources */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.sources.map((source, idx) => (
                            <a
                              key={idx}
                              href={source.link}
                              className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-600 transition-colors"
                            >
                              {source.type === 'candidate' && <Users className="w-3 h-3" />}
                              {source.type === 'job' && <Briefcase className="w-3 h-3" />}
                              {source.type === 'interview' && <MessageSquare className="w-3 h-3" />}
                              {source.type === 'analytics' && <BarChart3 className="w-3 h-3" />}
                              <span>{source.title}</span>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-3 py-2 bg-mizan-gold/10 hover:bg-mizan-gold/20 text-mizan-gold text-sm rounded-lg transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-gray-400 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-mizan-gold to-mizan-gold/80 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Actions */}
        {showQuickActions && messages.length <= 1 && (
          <div className="px-4 pb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Quick Actions</h3>
                <div className="flex items-center space-x-2">
                  {['all', 'candidates', 'jobs', 'interviews', 'analytics'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        selectedCategory === cat
                          ? 'bg-mizan-gold text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {filteredQuickActions.map((action, idx) => {
                  const colors = categoryColors[action.category];
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action)}
                      className={`p-3 rounded-lg border ${colors.border} ${colors.bg} hover:opacity-80 transition-opacity text-left`}
                    >
                      <Icon className={`w-5 h-5 ${colors.text} mb-2`} />
                      <p className={`text-xs font-medium ${colors.text}`}>{action.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-4"
            >
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about candidates, jobs, interviews, or hiring metrics..."
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mizan-gold/20 focus:border-mizan-gold"
                  disabled={isTyping}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setShowQuickActions(!showQuickActions)}
                    className="p-1 text-gray-400 hover:text-mizan-gold"
                    title="Quick Actions"
                  >
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="p-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-2">
              AI responses are generated based on your hiring data. Always verify critical information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
