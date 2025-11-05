'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import apiClient from '@/lib/api-client';
import {
  Bot,
  Send,
  Upload,
  FileText,
  MessageCircle,
  Lightbulb,
  BookOpen,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface BotMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  resources?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  requiresAction?: boolean;
  actionType?: string;
}

interface SkillsBotInterfaceProps {
  userRole: string;
}

/**
 * Skills BOT Interface Component
 * Interactive BOT system for employees, supervisors, and admins
 * As per AGENT_CONTEXT_ULTIMATE.md Lines 115-137
 */
export const SkillsBotInterface: React.FC<SkillsBotInterfaceProps> = ({ userRole }) => {
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: BotMessage = {
      id: 'welcome',
      type: 'bot',
      content: getWelcomeMessage(),
      timestamp: new Date(),
      suggestions: getWelcomeSuggestions()
    };
    setMessages([welcomeMessage]);
  }, [userRole]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getWelcomeMessage = (): string => {
    switch (userRole) {
      case 'superadmin':
        return "Hello! I'm your Skills Analysis Assistant. I can help you with platform-wide skills analytics, strategic framework development, and organization insights. What would you like to explore today?";
      case 'clientAdmin':
        return "Welcome! I'm here to assist you with your organization's skills assessment and development. I can help you create strategic frameworks, analyze skills gaps, and plan development initiatives. How can I help?";
      case 'manager':
        return "Hi there! I'm your team skills assistant. I can help you understand your team's skills overview, identify development needs, and create learning plans. What would you like to know about your team?";
      case 'employee':
        return "Hello! I'm your personal skills development assistant. I can help you upload your resume, understand your skills gaps, find learning opportunities, and track your progress. Let's start your skills journey!";
      default:
        return "Hello! I'm your Skills Analysis Assistant. How can I help you today?";
    }
  };

  const getWelcomeSuggestions = (): string[] => {
    switch (userRole) {
      case 'superadmin':
        return [
          'Show platform-wide skills analytics',
          'Create new strategic framework',
          'Review organization readiness',
          'Generate skills investment report'
        ];
      case 'clientAdmin':
        return [
          'Run complete skills analysis',
          'Upload employee data',
          'Create skills framework',
          'View gap analysis results'
        ];
      case 'manager':
        return [
          'Show team skills overview',
          'Identify team gaps',
          'Create development plans',
          'Track team progress'
        ];
      case 'employee':
        return [
          'Upload my resume',
          'Complete skills assessment',
          'Find learning opportunities',
          'Track my progress'
        ];
      default:
        return [
          'Get started with skills assessment',
          'Learn about the platform',
          'Contact support'
        ];
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userQuery = inputValue.trim();
    const userMessage: BotMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userQuery,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Real API call to Skills BOT service using apiClient
      const response: any = await apiClient.skills.queryBot(userQuery, { userRole });

      if (response.success && response.response) {
        const botData = response.response;
        const botMessage: BotMessage = {
          id: Date.now().toString(),
          type: 'bot',
          content: botData.answer || "I'm not sure how to respond to that. Could you rephrase your question?",
          timestamp: new Date(),
          suggestions: botData.suggestions || []
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Invalid bot response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: BotMessage = {
        id: Date.now().toString() + '_error',
        type: 'bot',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again or contact support for assistance.",
        timestamp: new Date(),
        suggestions: ['Try rephrasing your question', 'Contact support', 'Browse available resources']
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-mizan-primary rounded-full">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Skills Assistant</h3>
          <p className="text-sm text-gray-600">Your AI-powered skills development companion</p>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="h-96 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Chat with Skills Assistant</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-mizan-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left text-xs p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Resources */}
                  {message.resources && message.resources.length > 0 && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-medium mb-2">Helpful Resources:</p>
                      {message.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          className="block text-xs p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            {resource.type === 'course' && <BookOpen className="w-3 h-3" />}
                            {resource.type === 'article' && <FileText className="w-3 h-3" />}
                            <span>{resource.title}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {/* Action Required */}
                  {message.requiresAction && (
                    <div className="mt-3 p-2 rounded bg-yellow-100 border border-yellow-200">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs text-yellow-800">Action Required</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about skills assessment and development..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="px-3"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                <Upload className="w-3 h-3 mr-1" />
                Upload Resume
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                <FileText className="w-3 h-3 mr-1" />
                Skills Assessment
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                <Lightbulb className="w-3 h-3 mr-1" />
                Learning Tips
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                <BookOpen className="w-3 h-3 mr-1" />
                Learning Paths
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>How to Use Skills Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">For Employees:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Upload your resume for skills extraction</li>
                <li>• Get personalized gap analysis explanations</li>
                <li>• Find learning opportunities and resources</li>
                <li>• Track your skills development progress</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">For Managers & Admins:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Get team skills overview and insights</li>
                <li>• Identify collective development needs</li>
                <li>• Access organization-wide analytics</li>
                <li>• Plan strategic skills investments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
