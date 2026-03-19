'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';
import { Heart, Trophy, Star, Zap, Send, Award, BarChart3, ChevronRight } from 'lucide-react';

interface RecognitionItem {
  id: string;
  fromUserId: string;
  toUserId: string;
  recognitionType: string;
  companyValue: string | null;
  message: string;
  pointsAwarded: number;
  createdAt: string;
}

export default function EngagementPage() {
  const [feed, setFeed] = useState<RecognitionItem[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRecognizeForm, setShowRecognizeForm] = useState(false);
  const [recognizeForm, setRecognizeForm] = useState({ toUserId: '', message: '', recognitionType: 'kudos', companyValue: '' });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [feedRes, pointsRes] = await Promise.all([
        apiClient.get('/api/engagement/recognition/feed'),
        apiClient.get('/api/engagement/points'),
      ]);
      const feedData = feedRes.data as { feed?: RecognitionItem[] };
      const pointsData = pointsRes.data as { totalPoints?: number };
      setFeed(feedData.feed || []);
      setTotalPoints(pointsData.totalPoints || 0);
    } catch (err) {
      setError('Failed to load engagement data');
    } finally {
      setIsLoading(false);
    }
  };

  const sendRecognition = async () => {
    try {
      await apiClient.post('/api/engagement/recognize', {
        toUserId: recognizeForm.toUserId,
        message: recognizeForm.message,
        recognitionType: recognizeForm.recognitionType,
        companyValue: recognizeForm.companyValue || undefined,
        pointsAwarded: undefined, // Server determines points based on recognition type config
      });
      setShowRecognizeForm(false);
      setRecognizeForm({ toUserId: '', message: '', recognitionType: 'kudos', companyValue: '' });
      loadData();
    } catch (err) {
      setError('Failed to send recognition');
    }
  };

  const typeEmoji: Record<string, string> = {
    kudos: '👏', shoutout: '📣', value_champion: '🏆', team_mvp: '⭐', innovation: '💡',
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" /></div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Heart className="h-6 w-6" /> Engagement
          </h1>
          <p className="text-gray-500 mt-1">Recognition, gamification, and team engagement</p>
        </div>
        <button onClick={() => setShowRecognizeForm(true)} className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          <Send className="h-4 w-4" /> Recognize Someone
        </button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      {/* Points & Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-sm text-gray-500">My Points</span><Star className="h-4 w-4 text-yellow-500" /></div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{totalPoints.toLocaleString()}</p>
        </div>
        {[
          { href: '/dashboard/engagement/challenges', label: 'Challenges', icon: Zap },
          { href: '/dashboard/engagement/leaderboard', label: 'Leaderboard', icon: Trophy },
          { href: '/dashboard/engagement/surveys', label: 'Surveys', icon: BarChart3 },
        ].map(({ href, label, icon: Icon }) => (
          <a key={href} href={href} className="rounded-xl border bg-white p-5 shadow-sm hover:bg-gray-50 flex items-center gap-3">
            <Icon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">{label}</span>
            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
          </a>
        ))}
      </div>

      {/* Recognition Form */}
      {showRecognizeForm && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Send Recognition</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colleague (User ID)</label>
              <input type="text" value={recognizeForm.toUserId} onChange={(e) => setRecognizeForm({...recognizeForm, toUserId: e.target.value})}
                className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Enter colleague user ID" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={recognizeForm.recognitionType} onChange={(e) => setRecognizeForm({...recognizeForm, recognitionType: e.target.value})}
                className="w-full rounded-lg border px-3 py-2 text-sm">
                <option value="kudos">👏 Kudos</option>
                <option value="shoutout">📣 Shoutout</option>
                <option value="value_champion">🏆 Value Champion</option>
                <option value="team_mvp">⭐ Team MVP</option>
                <option value="innovation">💡 Innovation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea value={recognizeForm.message} onChange={(e) => setRecognizeForm({...recognizeForm, message: e.target.value})}
                className="w-full rounded-lg border px-3 py-2 text-sm" rows={3} placeholder="Share what they did and why it matters..." />
            </div>
            <div className="flex gap-2">
              <button onClick={sendRecognition} className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800">Send</button>
              <button onClick={() => setShowRecognizeForm(false)} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Recognition Feed */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-yellow-500" /> Recognition Wall
        </h2>
        {feed.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Be the first to recognize a colleague!</p>
        ) : (
          <div className="space-y-3">
            {feed.map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                <span className="text-2xl">{typeEmoji[item.recognitionType] || '👏'}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{item.message}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {item.companyValue && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{item.companyValue}</span>
                    )}
                    <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                    {item.pointsAwarded > 0 && (
                      <span className="text-xs text-yellow-600">+{item.pointsAwarded} pts</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
