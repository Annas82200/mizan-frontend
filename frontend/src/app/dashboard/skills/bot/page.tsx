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
  Target,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import apiClient from '@/lib/api-client';
import { logger } from '@/lib/logger';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

/**
 * Skills BOT Interface Page
 * Production-ready: AI-powered skills assistant
 * AGENT_CONTEXT_ULTIMATE.md compliant
 */
export default function SkillsBotPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('employee');
  const [userName, setUserName] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: FileText, label: 'Upload Resume', prompt: 'I want to upload my resume for skills extraction' },
    { icon: Target, label: 'Skill Gap Analysis', prompt: 'Analyze my current skill gaps' },
    { icon: TrendingUp, label: 'Career Path', prompt: 'Suggest career development paths based on my skills' },
    { icon: BookOpen, label: 'Learning Resources', prompt: 'Recommend learning resources for my skill gaps' }
  ];

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

        // Initialize with welcome message
        setMessages([{
          id: '1',
          role: 'assistant',
          content: `Hello ${payload.name || 'there'}! I'm your Skills Assistant. I can help you with:\n\n• Uploading and analyzing your resume\n• Identifying your skill gaps\n• Creating personalized learning paths\n• Career development recommendations\n\nHow can I assist you today?`,
          timestamp: new Date(),
          suggestions: ['Upload my resume', 'Show my skill profile', 'What skills should I develop?']
        }]);

        setIsLoading(false);
      } catch (error) {
        logger.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || sending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSending(true);

    try {
      // Call backend Skills BOT API
      const { data } = await apiClient.post<{
        success: boolean;
        response: {
          answer: string;
          intent: string;
          confidence: number;
          suggestions?: string[];
        };
        error?: string;
      }>('/api/skills/bot/query', {
        query: content,
        context: {
          previousMessages: messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content
          }))
        }
      });

      if (!data.success || !data.response) {
        throw new Error(data.error || 'Failed to get response from Skills Assistant');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response.answer,
        timestamp: new Date(),
        suggestions: data.response.suggestions || []
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      logger.error('Error sending message:', error);

      // Show error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists.',
        timestamp: new Date(),
        suggestions: ['Try again', 'View my skills profile', 'Contact support']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setSending(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

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
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mizan-gold/10 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-mizan-gold" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Skills Assistant</h1>
                <p className="text-sm text-gray-600">AI-powered skills guidance</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard/skills')}
              className="px-4 py-2 text-mizan-primary hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Skills</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="px-4 py-2 bg-mizan-gold/10 hover:bg-mizan-gold/20 text-mizan-gold rounded-full text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user' ? 'bg-mizan-primary' : 'bg-mizan-gold/10'}`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-mizan-gold" />
                    )}
                  </div>

                  <div className={`rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-mizan-primary text-white' : 'bg-white border border-gray-200'}`}>
                    <p className={`text-sm whitespace-pre-wrap ${message.role === 'user' ? 'text-white' : 'text-gray-700'}`}>
                      {message.content}
                    </p>

                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">Suggested responses:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestion(suggestion)}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className={`text-xs text-gray-400 mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-mizan-gold/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-mizan-gold" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center space-x-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, career paths, or learning resources..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-mizan-gold focus:border-transparent"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
