'use client';

import React, { useState } from 'react';
import {
  Brain,
  BookOpen,
  Target,
  Zap,
  AlertCircle,
  Upload,
  FileText,
  Database,
  Settings,
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  Trash2,
  Eye
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: 'processing' | 'ready' | 'error';
}

interface EngineConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  providers: string[];
  currentProvider: string;
  temperature: number;
  maxTokens: number;
}

export default function AITrainingPage() {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'config' | 'test'>('knowledge');
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: '7-Cylinder Framework.pdf',
      type: 'pdf',
      size: 2458000,
      uploadedAt: new Date().toISOString(),
      status: 'ready'
    },
    {
      id: '2',
      name: 'Organizational Development Theory.docx',
      type: 'docx',
      size: 1234000,
      uploadedAt: new Date().toISOString(),
      status: 'ready'
    }
  ]);

  const [engineConfigs, setEngineConfigs] = useState<EngineConfig[]>([
    {
      id: 'knowledge',
      name: 'Knowledge Engine',
      description: 'Trained on organizational development theory, 7-Cylinder framework, and HR best practices',
      icon: Brain,
      color: '#CCA404',
      providers: ['OpenAI GPT-4', 'Anthropic Claude', 'Google Gemini'],
      currentProvider: 'OpenAI GPT-4',
      temperature: 0.3,
      maxTokens: 2000
    },
    {
      id: 'data',
      name: 'Data Engine',
      description: 'Processes employee data, survey responses, and organizational metrics with statistical rigor',
      icon: Target,
      color: '#3F3D56',
      providers: ['OpenAI GPT-4', 'Anthropic Claude'],
      currentProvider: 'Anthropic Claude',
      temperature: 0.1,
      maxTokens: 1500
    },
    {
      id: 'reasoning',
      name: 'Reasoning Engine',
      description: 'Generates insights, recommendations, and action plans based on combined knowledge and data',
      icon: Zap,
      color: '#545454',
      providers: ['OpenAI GPT-4', 'Anthropic Claude', 'Google Gemini'],
      currentProvider: 'Anthropic Claude',
      temperature: 0.5,
      maxTokens: 3000
    }
  ]);

  const [testPrompt, setTestPrompt] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      // Simulate upload
      for (const file of Array.from(files)) {
        const newDoc: Document = {
          id: Date.now().toString(),
          name: file.name,
          type: file.name.split('.').pop() || 'unknown',
          size: file.size,
          uploadedAt: new Date().toISOString(),
          status: 'processing'
        };
        setDocuments(prev => [...prev, newDoc]);

        // Simulate processing
        setTimeout(() => {
          setDocuments(prev =>
            prev.map(doc =>
              doc.id === newDoc.id ? { ...doc, status: 'ready' } : doc
            )
          );
        }, 2000);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const handleTestEngine = async () => {
    if (!testPrompt.trim()) return;

    setTesting(true);
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTestResult(
        `**Analysis Result:**\n\nBased on the 7-Cylinder framework, the organization shows strong performance in:\n\n• **Cylinder 5 (Integrity & Justice)**: 85% alignment with stated values\n• **Cylinder 6 (Collaboration & Unity)**: 78% team cohesion score\n• **Cylinder 3 (Growth & Achievement)**: 72% employee development engagement\n\nAreas for improvement:\n\n• **Cylinder 1 (Safety & Survival)**: Only 58% feel psychologically safe\n• **Cylinder 7 (Vision & Purpose)**: 62% understand strategic direction\n\n**Recommendations:**\n1. Implement anonymous feedback channels to increase psychological safety\n2. Conduct quarterly vision workshops to improve strategic alignment\n3. Establish cross-functional collaboration initiatives`
      );
    } catch (err) {
      console.error('Test error:', err);
    } finally {
      setTesting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold text-mizan-primary mb-2">
          AI Training & Configuration
        </h1>
        <p className="text-mizan-secondary">
          Train and configure Mizan's Three-Engine AI Architecture
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 inline-flex">
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-400 ${
            activeTab === 'knowledge'
              ? 'bg-mizan-gold text-white shadow-lg'
              : 'text-mizan-secondary hover:text-mizan-primary'
          }`}
        >
          <BookOpen className="w-5 h-5 inline-block mr-2" />
          Knowledge Base
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-400 ${
            activeTab === 'config'
              ? 'bg-mizan-gold text-white shadow-lg'
              : 'text-mizan-secondary hover:text-mizan-primary'
          }`}
        >
          <Settings className="w-5 h-5 inline-block mr-2" />
          Engine Configuration
        </button>
        <button
          onClick={() => setActiveTab('test')}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-400 ${
            activeTab === 'test'
              ? 'bg-mizan-gold text-white shadow-lg'
              : 'text-mizan-secondary hover:text-mizan-primary'
          }`}
        >
          <Target className="w-5 h-5 inline-block mr-2" />
          Test Engine
        </button>
      </div>

      {/* Knowledge Base Tab */}
      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-mizan-primary mb-4">
              Upload Training Documents
            </h3>
            <p className="text-sm text-mizan-secondary mb-6">
              Upload PDFs, DOCX, or TXT files to enhance the AI's knowledge base
            </p>

            <label className="block">
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.txt,.md"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-mizan-gold hover:bg-mizan-gold/5 transition-all duration-400">
                {uploading ? (
                  <>
                    <Loader2 className="w-12 h-12 text-mizan-gold mx-auto mb-4 animate-spin" />
                    <p className="text-mizan-secondary">Uploading and processing...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-mizan-secondary mx-auto mb-4" />
                    <p className="text-mizan-primary font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-mizan-secondary">
                      PDF, DOCX, TXT, MD (max 10MB per file)
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          {/* Documents List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-mizan-primary mb-4">
              Training Documents ({documents.length})
            </h3>

            {documents.length === 0 ? (
              <div className="text-center py-8 text-mizan-secondary">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-mizan-gold transition-all duration-400"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {getStatusIcon(doc.status)}
                      <FileText className="w-8 h-8 text-mizan-secondary" />
                      <div className="flex-1">
                        <p className="font-medium text-mizan-primary">{doc.name}</p>
                        <p className="text-xs text-mizan-secondary">
                          {formatFileSize(doc.size)} • Uploaded{' '}
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-mizan-secondary hover:text-mizan-primary transition-colors"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 text-mizan-secondary hover:text-mizan-primary transition-colors"
                        title="Download"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Engine Configuration Tab */}
      {activeTab === 'config' && (
        <div className="space-y-6">
          {engineConfigs.map(engine => {
            const IconComponent = engine.icon;
            return (
              <div
                key={engine.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${engine.color}15` }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-mizan-primary">
                      {engine.name}
                    </h3>
                    <p className="text-sm text-mizan-secondary mt-1">{engine.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Provider Selection */}
                  <div>
                    <label className="block text-sm font-medium text-mizan-primary mb-2">
                      AI Provider
                    </label>
                    <select
                      value={engine.currentProvider}
                      onChange={e => {
                        setEngineConfigs(prev =>
                          prev.map(eng =>
                            eng.id === engine.id
                              ? { ...eng, currentProvider: e.target.value }
                              : eng
                          )
                        );
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-mizan-gold focus:ring-2 focus:ring-mizan-gold/20 transition-all"
                    >
                      {engine.providers.map(provider => (
                        <option key={provider} value={provider}>
                          {provider}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Temperature */}
                  <div>
                    <label className="block text-sm font-medium text-mizan-primary mb-2">
                      Temperature: {engine.temperature.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={engine.temperature}
                      onChange={e => {
                        setEngineConfigs(prev =>
                          prev.map(eng =>
                            eng.id === engine.id
                              ? { ...eng, temperature: parseFloat(e.target.value) }
                              : eng
                          )
                        );
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-mizan-secondary mt-1">
                      <span>Precise</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Max Tokens */}
                  <div>
                    <label className="block text-sm font-medium text-mizan-primary mb-2">
                      Max Tokens
                    </label>
                    <input
                      type="number"
                      min="500"
                      max="4000"
                      step="100"
                      value={engine.maxTokens}
                      onChange={e => {
                        setEngineConfigs(prev =>
                          prev.map(eng =>
                            eng.id === engine.id
                              ? { ...eng, maxTokens: parseInt(e.target.value) }
                              : eng
                          )
                        );
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-mizan-gold focus:ring-2 focus:ring-mizan-gold/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <button className="w-full px-6 py-4 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 shadow-lg hover:shadow-xl font-semibold">
            Save Configuration
          </button>
        </div>
      )}

      {/* Test Engine Tab */}
      {activeTab === 'test' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-mizan-primary mb-4">
              Test AI Analysis
            </h3>
            <p className="text-sm text-mizan-secondary mb-6">
              Test the three-engine system with a sample prompt
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-mizan-primary mb-2">
                  Test Prompt
                </label>
                <textarea
                  value={testPrompt}
                  onChange={e => setTestPrompt(e.target.value)}
                  placeholder="Example: Analyze the cultural health of an organization with the following values distribution..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-mizan-gold focus:ring-2 focus:ring-mizan-gold/20 transition-all resize-none"
                />
              </div>

              <button
                onClick={handleTestEngine}
                disabled={testing || !testPrompt.trim()}
                className="w-full px-6 py-4 bg-mizan-gold text-white rounded-xl hover:bg-mizan-gold/90 transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl font-semibold"
              >
                {testing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Running Analysis...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Run Test</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {testResult && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-mizan-primary">Test Result</h3>
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-mizan-secondary bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {testResult}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
