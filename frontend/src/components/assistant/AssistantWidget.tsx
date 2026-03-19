'use client';

import { useState, useRef, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { MessageCircle, X, Send, Loader2, Bot, User, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestedActions?: Array<{ id: string; label: string; type: string }>;
}

interface AssistantWidgetProps {
  userRole?: string;
}

export default function AssistantWidget({ userRole = 'employee' }: AssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/api/assistant/message', {
        message: userMessage.content,
        conversationId,
      });

      const data = response.data;
      setConversationId(data.conversationId);

      const assistantMessage: Message = {
        id: data.messageId,
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
        suggestedActions: data.suggestedActions,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Assistant error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickAction = (action: { id: string; label: string; type: string }) => {
    if (action.type === 'navigate') {
      // Navigation actions are handled by the parent app
      window.dispatchEvent(new CustomEvent('assistant:navigate', { detail: action }));
    } else {
      setInput(action.label);
      sendMessage();
    }
  };

  const INITIAL_SUGGESTIONS = [
    'What are my pending goals?',
    'Recommend a course for me',
    'Show my skills profile',
    'What is our PTO policy?',
  ];

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105"
          style={{ backgroundColor: 'hsl(var(--brand-accent, 48 100% 40%))' }}
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: 'hsl(var(--brand-primary, 240 5% 33%))' }}
          >
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <span className="text-sm font-medium text-white">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <Bot className="mx-auto mb-2 h-10 w-10 text-gray-300" />
                  <p className="text-sm text-gray-500">
                    Hi! I can help with skills, performance, learning, hiring, and more.
                  </p>
                </div>
                <div className="space-y-2">
                  {INITIAL_SUGGESTIONS.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(suggestion); }}
                      className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <span>{suggestion}</span>
                      <ChevronRight className="h-3 w-3 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === 'user' ? 'bg-gray-200' : ''
                  }`}
                    style={msg.role === 'assistant' ? { backgroundColor: 'hsl(var(--brand-accent, 48 100% 40%) / 0.15)' } : {}}
                  >
                    {msg.role === 'user' ? (
                      <User className="h-3.5 w-3.5 text-gray-600" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" style={{ color: 'hsl(var(--brand-accent, 48 100% 40%))' }} />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-3.5 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-gray-100 text-gray-800'
                        : 'border bg-white text-gray-700'
                    }`}>
                      {msg.content}
                    </div>
                    {/* Suggested actions */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => handleQuickAction(action)}
                            className="rounded-full border px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="mb-3 flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border bg-white px-3.5 py-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-400">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t px-3 py-2">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 rounded-full border px-4 py-2 text-sm outline-none focus:border-gray-400"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors disabled:opacity-40"
                style={{ backgroundColor: 'hsl(var(--brand-accent, 48 100% 40%))' }}
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
