"use client";

import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Play, 
  Pause, 
  Settings, 
  BarChart3, 
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap
} from 'lucide-react';

interface AIAgent {
  id: string;
  name: string;
  type: 'knowledge' | 'data' | 'reasoning';
  status: 'active' | 'training' | 'idle' | 'error';
  lastTrained: string;
  performance: {
    accuracy: number;
    speed: number;
    reliability: number;
  };
  trainingData: {
    totalSamples: number;
    lastUpdate: string;
    quality: 'high' | 'medium' | 'low';
  };
}

interface TrainingSession {
  id: string;
  agentId: string;
  agentName: string;
  type: 'culture' | 'structure' | 'skills' | 'engagement' | 'recognition';
  status: 'running' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  endTime?: string;
  results?: {
    accuracy: number;
    loss: number;
    epochs: number;
  };
}

export default function AITrainingPage() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingConfig, setTrainingConfig] = useState({
    type: 'culture' as const,
    epochs: 100,
    learningRate: 0.001,
    batchSize: 32
  });

  useEffect(() => {
    loadAgents();
    loadTrainingSessions();
  }, []);

  const loadAgents = async () => {
    try {
      // Load agents from localStorage or API
      const agentsData = localStorage.getItem('aiAgents');
      if (agentsData) {
        setAgents(JSON.parse(agentsData));
      } else {
        // Default agents
        const defaultAgents: AIAgent[] = [
          {
            id: '1',
            name: 'Knowledge Engine',
            type: 'knowledge',
            status: 'active',
            lastTrained: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            performance: { accuracy: 94, speed: 87, reliability: 96 },
            trainingData: { totalSamples: 15420, lastUpdate: new Date().toISOString(), quality: 'high' }
          },
          {
            id: '2',
            name: 'Data Engine',
            type: 'data',
            status: 'active',
            lastTrained: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            performance: { accuracy: 91, speed: 92, reliability: 94 },
            trainingData: { totalSamples: 12850, lastUpdate: new Date().toISOString(), quality: 'high' }
          },
          {
            id: '3',
            name: 'Reasoning Engine',
            type: 'reasoning',
            status: 'training',
            lastTrained: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            performance: { accuracy: 88, speed: 85, reliability: 90 },
            trainingData: { totalSamples: 9650, lastUpdate: new Date().toISOString(), quality: 'medium' }
          }
        ];
        
        setAgents(defaultAgents);
        localStorage.setItem('aiAgents', JSON.stringify(defaultAgents));
      }
    } catch (error) {
      console.error('Failed to load agents:', error);
    }
  };

  const loadTrainingSessions = async () => {
    try {
      const sessionsData = localStorage.getItem('trainingSessions');
      if (sessionsData) {
        setTrainingSessions(JSON.parse(sessionsData));
      } else {
        // Default training sessions
        const defaultSessions: TrainingSession[] = [
          {
            id: '1',
            agentId: '1',
            agentName: 'Knowledge Engine',
            type: 'culture',
            status: 'completed',
            progress: 100,
            startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            results: { accuracy: 94, loss: 0.12, epochs: 100 }
          },
          {
            id: '2',
            agentId: '3',
            agentName: 'Reasoning Engine',
            type: 'structure',
            status: 'running',
            progress: 65,
            startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString()
          }
        ];
        
        setTrainingSessions(defaultSessions);
        localStorage.setItem('trainingSessions', JSON.stringify(defaultSessions));
      }
    } catch (error) {
      console.error('Failed to load training sessions:', error);
    }
  };

  const startTraining = async () => {
    if (!selectedAgent) return;

    const newSession: TrainingSession = {
      id: Date.now().toString(),
      agentId: selectedAgent.id,
      agentName: selectedAgent.name,
      type: trainingConfig.type,
      status: 'running',
      progress: 0,
      startTime: new Date().toISOString()
    };

    const updatedSessions = [...trainingSessions, newSession];
    setTrainingSessions(updatedSessions);
    localStorage.setItem('trainingSessions', JSON.stringify(updatedSessions));

    // Update agent status
    const updatedAgents = agents.map(agent => 
      agent.id === selectedAgent.id ? { ...agent, status: 'training' as const } : agent
    );
    setAgents(updatedAgents);
    localStorage.setItem('aiAgents', JSON.stringify(updatedAgents));

    setShowTrainingModal(false);
    alert(`Training started for ${selectedAgent.name} on ${trainingConfig.type} analysis`);

    // Simulate training progress
    simulateTraining(newSession.id);
  };

  const simulateTraining = (sessionId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Complete training
        const updatedSessions = trainingSessions.map(session => 
          session.id === sessionId 
            ? { 
                ...session, 
                status: 'completed' as const, 
                progress: 100, 
                endTime: new Date().toISOString(),
                results: { 
                  accuracy: 90 + Math.random() * 10, 
                  loss: 0.1 + Math.random() * 0.2, 
                  epochs: trainingConfig.epochs 
                }
              }
            : session
        );
        setTrainingSessions(updatedSessions);
        localStorage.setItem('trainingSessions', JSON.stringify(updatedSessions));

        // Update agent status
        const session = updatedSessions.find(s => s.id === sessionId);
        if (session) {
          const updatedAgents = agents.map(agent => 
            agent.id === session.agentId ? { ...agent, status: 'active' as const } : agent
          );
          setAgents(updatedAgents);
          localStorage.setItem('aiAgents', JSON.stringify(updatedAgents));
        }
      } else {
        const updatedSessions = trainingSessions.map(session => 
          session.id === sessionId ? { ...session, progress } : session
        );
        setTrainingSessions(updatedSessions);
        localStorage.setItem('trainingSessions', JSON.stringify(updatedSessions));
      }
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'completed': return 'text-green-600 bg-green-100';
      case 'training': case 'running': return 'text-blue-600 bg-blue-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'error': case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'knowledge': return <Brain className="w-5 h-5" />;
      case 'data': return <BarChart3 className="w-5 h-5" />;
      case 'reasoning': return <Target className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Training Center</h1>
          <p className="text-gray-600 mt-1">Train and manage AI agents for different analysis types</p>
        </div>
        <button
          onClick={() => setShowTrainingModal(true)}
          className="flex items-center space-x-2 bg-mizan-teal text-white px-4 py-2 rounded-lg hover:bg-mizan-teal-600 transition-colors"
        >
          <Play className="w-4 h-4" />
          <span>Start Training</span>
        </button>
      </div>

      {/* AI Agents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">AI Agents</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-mizan-teal-100 rounded-lg text-mizan-teal">
                      {getTypeIcon(agent.type)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{agent.type} Engine</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Accuracy:</span>
                      <span className="font-medium">{agent.performance.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${agent.performance.accuracy}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Speed:</span>
                      <span className="font-medium">{agent.performance.speed}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${agent.performance.speed}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Reliability:</span>
                      <span className="font-medium">{agent.performance.reliability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${agent.performance.reliability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Training Data:</span>
                      <span className="font-medium">{agent.trainingData.totalSamples.toLocaleString()} samples</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Last Trained:</span>
                      <span className="font-medium">{new Date(agent.lastTrained).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowTrainingModal(true);
                  }}
                  className="w-full mt-4 bg-mizan-teal text-white py-2 px-4 rounded-lg hover:bg-mizan-teal-600 transition-colors"
                  disabled={agent.status === 'training'}
                >
                  {agent.status === 'training' ? 'Training...' : 'Train Agent'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Sessions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Training Sessions</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {trainingSessions.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Play className="w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">{session.agentName}</h3>
                      <p className="text-sm text-gray-600 capitalize">{session.type} Analysis Training</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </div>

                {session.status === 'running' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress:</span>
                      <span className="font-medium">{Math.round(session.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${session.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {session.status === 'completed' && session.results && (
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{session.results.accuracy.toFixed(1)}%</div>
                      <div className="text-xs text-gray-600">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{session.results.loss.toFixed(3)}</div>
                      <div className="text-xs text-gray-600">Loss</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{session.results.epochs}</div>
                      <div className="text-xs text-gray-600">Epochs</div>
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Started:</span>
                    <span>{new Date(session.startTime).toLocaleString()}</span>
                  </div>
                  {session.endTime && (
                    <div className="flex justify-between mt-1">
                      <span>Completed:</span>
                      <span>{new Date(session.endTime).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Start Training Session</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agent</label>
                <select
                  value={selectedAgent?.id || ''}
                  onChange={(e) => {
                    const agent = agents.find(a => a.id === e.target.value);
                    setSelectedAgent(agent || null);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                >
                  <option value="">Select an agent</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Analysis Type</label>
                <select
                  value={trainingConfig.type}
                  onChange={(e) => setTrainingConfig({...trainingConfig, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                >
                  <option value="culture">Culture Analysis</option>
                  <option value="structure">Structure Analysis</option>
                  <option value="skills">Skills Analysis</option>
                  <option value="engagement">Engagement Analysis</option>
                  <option value="recognition">Recognition Analysis</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Epochs</label>
                  <input
                    type="number"
                    value={trainingConfig.epochs}
                    onChange={(e) => setTrainingConfig({...trainingConfig, epochs: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Learning Rate</label>
                  <input
                    type="number"
                    step="0.001"
                    value={trainingConfig.learningRate}
                    onChange={(e) => setTrainingConfig({...trainingConfig, learningRate: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mizan-teal focus:border-mizan-teal"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTrainingModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={startTraining}
                disabled={!selectedAgent}
                className="px-4 py-2 bg-mizan-teal text-white rounded-lg hover:bg-mizan-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Training
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
