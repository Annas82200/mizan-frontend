'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Copy, Send, Calendar, Hash, Eye, Trash2, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface GeneratedContent {
  postId: string;
  content: string;
  hashtags: string[];
  cta: string;
  visualSuggestions?: string[];
  characterCount: number;
  platform: string;
}

interface Post {
  id: string;
  platform: string;
  content: string;
  hashtags: string[];
  status: string;
  createdAt: string;
  publishedAt?: string;
  scheduledFor?: string;
}

interface WeekStrategy {
  week: number;
  theme: string;
  contentPillar: string;
  focus: string;
}

export default function SocialMediaPage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [selectedWeek, setSelectedWeek] = useState('1');
  const [weeklyContent, setWeeklyContent] = useState<any[]>([]);
  const [strategy, setStrategy] = useState<WeekStrategy[]>([]);
  
  // Form states
  const [platform, setPlatform] = useState('linkedin');
  const [contentPillar, setContentPillar] = useState('framework-education');
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('HR leaders and business owners');
  const [tone, setTone] = useState('professional');
  const [includeVisuals, setIncludeVisuals] = useState(true);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
    fetchStrategy();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/social-media/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchStrategy = async () => {
    try {
      const response = await fetch('/api/social-media/strategy', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStrategy(data.data.weeks || []);
      }
    } catch (error) {
      console.error('Failed to fetch strategy:', error);
    }
  };

  const generateContent = async () => {
    if (!topic) {
      toast({
        title: 'Error',
        description: 'Please enter a topic for the content',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/social-media/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          platform,
          contentPillar,
          topic,
          targetAudience,
          tone,
          includeVisuals,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setGeneratedContent(data.data);
        await fetchPosts(); // Refresh posts list
        toast({
          title: 'Success',
          description: 'Content generated successfully!',
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to generate content',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateWeeklyBatch = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/social-media/generate-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          week: parseInt(selectedWeek),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setWeeklyContent(data.data.content || []);
        await fetchPosts(); // Refresh posts list
        toast({
          title: 'Success',
          description: `Generated ${data.data.content.length} posts for Week ${selectedWeek}`,
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to generate batch content',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Batch generation error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate batch content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Content copied to clipboard',
    });
  };

  const publishPost = async (postId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/social-media/posts/${postId}/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchPosts();
        toast({
          title: 'Success',
          description: 'Post published to LinkedIn!',
        });
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to publish post',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Publish error:', error);
      toast({
        title: 'Error',
        description: 'Failed to publish post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const response = await fetch(`/api/social-media/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        await fetchPosts();
        toast({
          title: 'Success',
          description: 'Post deleted successfully',
        });
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Media Content Generation</h1>
          <p className="text-gray-600 mt-2">Generate AI-powered content about the Mizan platform</p>
        </div>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Content</TabsTrigger>
          <TabsTrigger value="batch">Weekly Batch</TabsTrigger>
          <TabsTrigger value="posts">Saved Posts</TabsTrigger>
          <TabsTrigger value="strategy">12-Week Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Single Post</CardTitle>
              <CardDescription>Create custom content for social media platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contentPillar">Content Pillar</Label>
                  <Select value={contentPillar} onValueChange={setContentPillar}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="framework-education">Framework Education</SelectItem>
                      <SelectItem value="feature-highlight">Feature Highlight</SelectItem>
                      <SelectItem value="success-story">Success Story</SelectItem>
                      <SelectItem value="industry-insights">Industry Insights</SelectItem>
                      <SelectItem value="platform-benefits">Platform Benefits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Cylinder 1: Safety & Survival - The Foundation of Organizational Culture"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., HR leaders and business owners"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 mt-8">
                  <input
                    type="checkbox"
                    id="visuals"
                    checked={includeVisuals}
                    onChange={(e) => setIncludeVisuals(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="visuals">Include visual suggestions</Label>
                </div>
              </div>

              <Button 
                onClick={generateContent} 
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Content'
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge>{generatedContent.platform}</Badge>
                  <Badge variant="outline">{generatedContent.characterCount} characters</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Content</Label>
                  <div className="relative">
                    <Textarea
                      value={generatedContent.content}
                      readOnly
                      className="min-h-[200px]"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(generatedContent.content)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Hashtags</Label>
                  <div className="flex flex-wrap gap-2">
                    {generatedContent.hashtags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        <Hash className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Call to Action</Label>
                  <p className="text-sm text-gray-600">{generatedContent.cta}</p>
                </div>

                {generatedContent.visualSuggestions && (
                  <div className="space-y-2">
                    <Label>Visual Suggestions</Label>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {generatedContent.visualSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button 
                    onClick={() => publishPost(generatedContent.postId)}
                    disabled={loading}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Publish to LinkedIn
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => copyToClipboard(
                      `${generatedContent.content}\n\n${generatedContent.hashtags.map(tag => `#${tag}`).join(' ')}`
                    )}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy All
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="batch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Weekly Batch</CardTitle>
              <CardDescription>Generate 3 posts for a specific week based on the content strategy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Week</Label>
                <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        Week {i + 1} - {strategy[i]?.theme || 'Loading...'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateWeeklyBatch}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Batch...
                  </>
                ) : (
                  'Generate Weekly Batch'
                )}
              </Button>
            </CardContent>
          </Card>

          {weeklyContent.length > 0 && (
            <div className="space-y-4">
              {weeklyContent.map((post, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{post.day} Post</CardTitle>
                        <Badge className="mt-2">{post.platform}</Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(
                          `${post.content}\n\n${post.hashtags.map((tag: string) => `#${tag}`).join(' ')}`
                        )}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.hashtags.map((tag: string, tagIndex: number) => (
                        <Badge key={tagIndex} variant="secondary">
                          <Hash className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 italic">{post.cta}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Posts</CardTitle>
              <CardDescription>Manage your generated content</CardDescription>
            </CardHeader>
            <CardContent>
              {posts.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No posts yet. Generate your first post!</p>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Badge>{post.platform}</Badge>
                            <Badge variant={
                              post.status === 'published' ? 'default' :
                              post.status === 'scheduled' ? 'secondary' :
                              'outline'
                            }>
                              {post.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">
                            Created: {new Date(post.createdAt).toLocaleDateString()}
                            {post.publishedAt && ` • Published: ${new Date(post.publishedAt).toLocaleDateString()}`}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(post.content)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          {post.status === 'draft' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => publishPost(post.id)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deletePost(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm line-clamp-3">{post.content}</p>
                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>12-Week Content Strategy</CardTitle>
              <CardDescription>Your comprehensive social media content plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategy.map((week) => (
                  <div key={week.week} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Week {week.week}</Badge>
                          <Badge>{week.contentPillar.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
                        </div>
                        <h3 className="font-semibold">{week.theme}</h3>
                        <p className="text-sm text-gray-600">{week.focus}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedWeek(String(week.week));
                          document.querySelector('[value="batch"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                        }}
                      >
                        Generate Batch
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Posting Schedule</AlertTitle>
                <AlertDescription>
                  Posts are scheduled for Monday, Wednesday, and Friday each week.
                  Optimal posting times vary by platform - LinkedIn: 10 AM, Twitter: 12 PM, Facebook: 2 PM, Instagram: 6 PM.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
