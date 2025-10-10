'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Send,
  User,
  Bot,
  Loader2,
  CheckCircle2,
  Sparkles,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Lightbulb,
  X
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Suggestion {
  text: string;
  icon?: React.ComponentType<any>;
}

interface ConversationState {
  messages: Message[];
  suggestions: string[];
  currentSection?: string;
  profileCompletion: number;
}

interface ConversationalBOTProps {
  employeeId: string;
  tenantId: string;
  existingProfile?: any;
  onProfileUpdate?: (profileData: any) => void;
  onClose?: () => void;
}

export function ConversationalBOT({
  employeeId,
  tenantId,
  existingProfile,
  onProfileUpdate,
  onClose
}: ConversationalBOTProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [conversationStarted, setConversationStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversationStarted) {
      startConversation();
    }
  }, [conversationStarted]);

  const startConversation = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/profile/start-conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
        },
        body: JSON.stringify({
          employeeId,
          tenantId,
          existingProfile
        })
      });

      if (!response.ok) {
        throw new Error('Failed to start conversation');
      }

      const data = await response.json();

      setMessages([{
        role: 'assistant',
        content: data.conversation?.message || data.message,
        timestamp: new Date()
      }]);
      setSuggestions(data.conversation?.suggestions || data.suggestions || []);
      setProfileCompletion(data.profileStatus?.completionPercentage || existingProfile?.completionPercentage || 0);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm here to help you build your skills profile. Let's start by telling me about your current role and experience.",
        timestamp: new Date()
      }]);
      setSuggestions([
        "I'm a software engineer at a tech company",
        "Let me describe my work experience",
        "I want to add my skills and certifications"
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/profile/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('mizan_auth_token')}`
        },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages.map(m => ({ role: m.role, message: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSuggestions(data.suggestions || []);

      if (data.extractedData) {
        // Profile was updated with extracted data
        const completionPercentage = calculateCompletion(data.extractedData);
        setProfileCompletion(completionPercentage);
        if (onProfileUpdate) {
          onProfileUpdate({
            ...data.extractedData,
            completionPercentage
          });
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Could you try rephrasing that?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const calculateCompletion = (extractedData: any): number => {
    const sections = ['currentExperience', 'education', 'technicalSkills', 'softSkills', 'certifications', 'projects', 'languages'];
    let completed = 0;
    sections.forEach(section => {
      if (extractedData[section] && Array.isArray(extractedData[section]) && extractedData[section].length > 0) {
        completed++;
      }
    });
    return Math.round((completed / sections.length) * 100);
  };

  const getSectionIcon = (section?: string) => {
    switch (section) {
      case 'experience': return Briefcase;
      case 'education': return GraduationCap;
      case 'skills': return Code;
      case 'certifications': return Award;
      case 'projects': return Lightbulb;
      default: return FileText;
    }
  };

  if (!conversationStarted) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-mizan-gold to-mizan-gold/80 rounded-full mb-6 shadow-lg">
            <Bot className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-display font-bold text-mizan-primary mb-4">
            AI-Powered Profile Builder
          </h2>

          <p className="text-lg text-mizan-secondary mb-8 leading-relaxed">
            I'll help you create a comprehensive skills profile through a natural conversation.
            Just tell me about your experience, and I'll structure it professionally.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-blue-200">
              <Briefcase className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-mizan-primary mb-1">Work Experience</h3>
              <p className="text-sm text-mizan-secondary">Current and past roles, responsibilities, achievements</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-purple-200">
              <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-semibold text-mizan-primary mb-1">Education</h3>
              <p className="text-sm text-mizan-secondary">Degrees, institutions, fields of study</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-green-200">
              <Code className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-semibold text-mizan-primary mb-1">Skills & Tools</h3>
              <p className="text-sm text-mizan-secondary">Technical skills, proficiency levels, tools mastered</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-amber-200">
              <Award className="w-6 h-6 text-amber-600 mb-2" />
              <h3 className="font-semibold text-mizan-primary mb-1">Certifications</h3>
              <p className="text-sm text-mizan-secondary">Professional certifications and credentials</p>
            </div>
          </div>

          <button
            onClick={() => setConversationStarted(true)}
            className="px-8 py-4 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2 mx-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Start Building My Profile</span>
          </button>

          {existingProfile && existingProfile.completionPercentage > 0 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-700">
                <CheckCircle2 className="w-4 h-4 inline mr-1" />
                Your profile is {existingProfile.completionPercentage}% complete. Let's continue building it!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col" style={{ height: '600px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-mizan-gold to-mizan-gold/80 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Profile Builder</h3>
              <p className="text-sm text-white/80">Building your skills profile</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Progress */}
            <div className="text-right">
              <p className="text-xs text-white/80 mb-1">Profile Completion</p>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <span className="text-sm font-bold">{profileCompletion}%</span>
              </div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant'
                  ? 'bg-gradient-to-br from-mizan-gold to-mizan-gold/80'
                  : 'bg-mizan-primary'
              }`}
            >
              {message.role === 'assistant' ? (
                <Bot className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                message.role === 'assistant'
                  ? 'bg-white border border-gray-200 text-mizan-primary'
                  : 'bg-mizan-primary text-white'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.role === 'assistant' ? 'text-gray-400' : 'text-white/60'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mizan-gold to-mizan-gold/80 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
              <Loader2 className="w-5 h-5 text-mizan-gold animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && !loading && (
        <div className="px-6 py-3 bg-white border-t border-gray-200">
          <p className="text-xs text-mizan-secondary mb-2 flex items-center">
            <Sparkles className="w-3 h-3 mr-1" />
            Quick suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 3).map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(suggestion)}
                className="px-3 py-1.5 bg-mizan-gold/10 hover:bg-mizan-gold/20 text-mizan-gold text-sm rounded-lg transition-all duration-200 border border-mizan-gold/20"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me about your experience, skills, education..."
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !inputMessage.trim()}
            className="px-6 py-3 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
