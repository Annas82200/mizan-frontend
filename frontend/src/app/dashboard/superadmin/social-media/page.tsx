'use client';

import { useState, useEffect } from 'react';
import { Loader2, Send, Calendar, BarChart3, FileText, Clock } from 'lucide-react';
import { socialMediaService } from '@/services/dashboard.service';

interface GeneratedContent {
  platform: string;
  content: string;
  hashtags: string[];
  cta: string;
  visualSuggestion?: string;
  schedulingRecommendation?: {
    dayOfWeek: string;
    timeOfDay: string;
  };
}

interface BufferProfile {
  id: string;
  service: string;
  formatted_service: string;
  formatted_username: string;
}

export default function SocialMediaPage() {
  const [platform, setPlatform] = useState<string>('linkedin');
  const [contentPillar, setContentPillar] = useState<string>('framework-education');
  const [topic, setTopic] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Buffer integration state
  const [bufferProfiles, setBufferProfiles] = useState<BufferProfile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const [scheduling, setScheduling] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState<string | null>(null);

  // Weekly batch state
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const [generatingBatch, setGeneratingBatch] = useState(false);
  const [batchContent, setBatchContent] = useState<GeneratedContent[]>([]);

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', description: 'Professional network' },
    { id: 'twitter', name: 'Twitter/X', description: 'Short-form, viral' },
    { id: 'instagram', name: 'Instagram', description: 'Visual storytelling' },
    { id: 'medium', name: 'Medium', description: 'Long-form articles' }
  ];

  const pillars = [
    { id: 'framework-education', name: 'Framework Education', description: 'Teach 7-Cylinder concepts' },
    { id: 'problem-solution', name: 'Problem → Solution', description: 'Show pain points and fixes' },
    { id: 'product-features', name: 'Product Features', description: 'Showcase Mizan capabilities' },
    { id: 'thought-leadership', name: 'Thought Leadership', description: 'Industry insights and trends' },
    { id: 'community', name: 'Community Building', description: 'Engage and connect' }
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setGenerating(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const response = await socialMediaService.generate({
        platform,
        contentPillar,
        topic,
        targetAudience: targetAudience || undefined
      });

      if (response.success) {
        setGeneratedContent(response.data);
      } else {
        setError(response.error || 'Failed to generate content');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateBatch = async () => {
    if (!weekNumber || weekNumber < 1) {
      setError('Please enter a valid week number');
      return;
    }

    setGeneratingBatch(true);
    setError(null);
    setBatchContent([]);

    try {
      const response = await socialMediaService.generateBatch(weekNumber);

      if (response.success) {
        setBatchContent(response.data.content);
      } else {
        setError(response.error || 'Failed to generate batch');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setGeneratingBatch(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Load Buffer profiles on mount
  useEffect(() => {
    loadBufferProfiles();
  }, []);

  const loadBufferProfiles = async () => {
    try {
      const response = await socialMediaService.getBufferProfiles();
      if (response.success) {
        setBufferProfiles(response.data);
      }
    } catch (err: any) {
      console.error('Failed to load Buffer profiles:', err);
    }
  };

  const handleScheduleToBuffer = async () => {
    if (!generatedContent || selectedProfiles.length === 0) {
      setError('Please generate content and select at least one profile');
      return;
    }

    setScheduling(true);
    setError(null);
    setScheduleSuccess(null);

    try {
      const fullContent = `${generatedContent.content}\n\n${generatedContent.hashtags.map(tag => `#${tag}`).join(' ')}`;

      const response = await socialMediaService.scheduleToBuffer({
        content: fullContent,
        profileIds: selectedProfiles,
        scheduledAt: scheduledTime || undefined
      });

      if (response.success) {
        setScheduleSuccess(response.data.message);
        setSelectedProfiles([]);
        setScheduledTime('');
      } else {
        setError(response.error || 'Failed to schedule to Buffer');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setScheduling(false);
    }
  };

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-display font-semibold text-mizan-primary mb-2">
            AI-Powered Content Generator
          </h2>
          <p className="text-mizan-secondary">
            Generate platform-optimized social media content using Mizan&apos;s Three-Engine AI Architecture
          </p>
        </div>

        {/* Single Post Generator */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-display font-semibold text-mizan-primary mb-6 flex items-center space-x-2">
            <FileText size={24} className="text-mizan-gold" />
            <span>Generate Single Post</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-3">
                Platform
              </label>
              <div className="space-y-2">
                {platforms.map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border-2 cursor-pointer smooth-transition ${
                      platform === p.id
                        ? 'border-mizan-gold bg-mizan-gold bg-opacity-5'
                        : 'border-gray-200 hover:border-mizan-gold hover:border-opacity-30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="platform"
                      value={p.id}
                      checked={platform === p.id}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-mizan-primary">{p.name}</div>
                      <div className="text-sm text-mizan-secondary">{p.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Content Pillar Selection */}
            <div>
              <label className="block text-sm font-semibold text-mizan-primary mb-3">
                Content Pillar
              </label>
              <div className="space-y-2">
                {pillars.map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border-2 cursor-pointer smooth-transition ${
                      contentPillar === p.id
                        ? 'border-mizan-gold bg-mizan-gold bg-opacity-5'
                        : 'border-gray-200 hover:border-mizan-gold hover:border-opacity-30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentPillar"
                      value={p.id}
                      checked={contentPillar === p.id}
                      onChange={(e) => setContentPillar(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-semibold text-mizan-primary">{p.name}</div>
                      <div className="text-sm text-mizan-secondary">{p.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-mizan-primary mb-2">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Cylinder 1: Safety & Survival"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none smooth-transition"
            />
          </div>

          {/* Target Audience Input (Optional) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-mizan-primary mb-2">
              Target Audience <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., HR leaders, startup founders"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none smooth-transition"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={generating || !topic.trim()}
            className="w-full bg-mizan-gold text-white px-6 py-4 rounded-lg font-semibold hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed smooth-transition flex items-center justify-center space-x-2"
          >
            {generating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Generating Content...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Generate Content</span>
              </>
            )}
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Generated Content Display */}
          {generatedContent && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-mizan-primary">Generated Content</h4>
                <button
                  onClick={() => copyToClipboard(generatedContent.content)}
                  className="text-sm text-mizan-gold hover:underline"
                >
                  Copy to Clipboard
                </button>
              </div>

              {/* Main Content */}
              <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                <pre className="whitespace-pre-wrap font-sans text-mizan-primary">
                  {generatedContent.content}
                </pre>
              </div>

              {/* Hashtags */}
              <div>
                <h5 className="text-sm font-semibold text-mizan-primary mb-2">Hashtags</h5>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-mizan-gold bg-opacity-10 text-mizan-gold rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div>
                <h5 className="text-sm font-semibold text-mizan-primary mb-2">Call to Action</h5>
                <p className="text-mizan-secondary">{generatedContent.cta}</p>
              </div>

              {/* Visual Suggestion */}
              {generatedContent.visualSuggestion && (
                <div>
                  <h5 className="text-sm font-semibold text-mizan-primary mb-2">Visual Suggestion</h5>
                  <p className="text-mizan-secondary">{generatedContent.visualSuggestion}</p>
                </div>
              )}

              {/* Scheduling Recommendation */}
              {generatedContent.schedulingRecommendation && (
                <div>
                  <h5 className="text-sm font-semibold text-mizan-primary mb-2">Best Time to Post</h5>
                  <p className="text-mizan-secondary">
                    {generatedContent.schedulingRecommendation.dayOfWeek} at{' '}
                    {generatedContent.schedulingRecommendation.timeOfDay}
                  </p>
                </div>
              )}

              {/* Buffer Scheduling */}
              {bufferProfiles.length > 0 && (
                <div className="mt-6 p-4 bg-mizan-gold bg-opacity-5 rounded-lg border-2 border-mizan-gold">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="w-5 h-5 text-mizan-gold" />
                    <h5 className="text-sm font-semibold text-mizan-primary">Schedule to Buffer</h5>
                  </div>

                  {/* Profile Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-mizan-primary mb-2">
                      Select Profiles to Post To:
                    </label>
                    <div className="space-y-2">
                      {bufferProfiles.map((profile) => (
                        <label key={profile.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedProfiles.includes(profile.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProfiles([...selectedProfiles, profile.id]);
                              } else {
                                setSelectedProfiles(selectedProfiles.filter(id => id !== profile.id));
                              }
                            }}
                            className="rounded border-gray-300 text-mizan-gold focus:ring-mizan-gold"
                          />
                          <span className="text-sm text-mizan-secondary">
                            {profile.formatted_service} - {profile.formatted_username}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Time */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-mizan-primary mb-2">
                      Schedule Time (optional - leave blank to add to queue):
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none"
                    />
                  </div>

                  {/* Schedule Button */}
                  <button
                    onClick={handleScheduleToBuffer}
                    disabled={scheduling || selectedProfiles.length === 0}
                    className="w-full bg-mizan-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed smooth-transition flex items-center justify-center space-x-2"
                  >
                    {scheduling ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Scheduling...</span>
                      </>
                    ) : (
                      <>
                        <Calendar size={20} />
                        <span>Schedule to Buffer</span>
                      </>
                    )}
                  </button>

                  {/* Success Message */}
                  {scheduleSuccess && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                      ✓ {scheduleSuccess}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Weekly Batch Generator */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-display font-semibold text-mizan-primary mb-6 flex items-center space-x-2">
            <Calendar size={24} className="text-mizan-gold" />
            <span>Generate Weekly Batch</span>
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-mizan-primary mb-2">
              Week Number
            </label>
            <input
              type="number"
              min="1"
              value={weekNumber}
              onChange={(e) => setWeekNumber(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-mizan-gold focus:outline-none smooth-transition"
            />
            <p className="text-sm text-mizan-secondary mt-2">
              Week 1 = Foundation, Week 2 = Framework Education
            </p>
          </div>

          <button
            onClick={handleGenerateBatch}
            disabled={generatingBatch}
            className="w-full bg-mizan-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed smooth-transition flex items-center justify-center space-x-2"
          >
            {generatingBatch ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Generating Batch...</span>
              </>
            ) : (
              <>
                <Calendar size={20} />
                <span>Generate Week {weekNumber} Content</span>
              </>
            )}
          </button>

          {/* Batch Content Display */}
          {batchContent.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-semibold text-mizan-primary">
                Generated {batchContent.length} Posts
              </h4>

              {batchContent.map((content, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-mizan-gold uppercase">
                      {content.platform}
                    </span>
                    <button
                      onClick={() => copyToClipboard(content.content)}
                      className="text-sm text-mizan-gold hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-mizan-primary text-sm whitespace-pre-wrap">
                    {content.content.substring(0, 200)}...
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {content.hashtags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs text-mizan-gold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
}
