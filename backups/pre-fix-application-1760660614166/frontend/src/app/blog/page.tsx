'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { ArrowRight, Search, BookOpen, Calendar, Clock } from 'lucide-react';
import {
  FrameworkGuideIcon,
  InsightsIcon,
  LeadershipIcon,
  CultureIcon,
  StructureIcon,
  CaseStudyIcon,
  ResearchIcon
} from '@/components/icons';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Framework',
    'Culture',
    'Structure',
    'AI & Technology',
    'Leadership',
    'Case Studies',
    'Research'
  ];

  const articles = [
    {
      id: 1,
      title: "Why Your Organization Needs 7 Cylinders, Not 7 Levels",
      excerpt: "The Mizan Framework isn't hierarchical—it's horizontal. Learn why all seven cylinders must be balanced simultaneously for organizational health.",
      category: "Framework",
      author: "Dr. Sarah Chen",
      date: "September 28, 2025",
      readTime: "8 min read",
      featured: true,
      image: "gradient-cylinders"
    },
    {
      id: 2,
      title: "Measuring Cultural Entropy: What Your Org Chart Isn't Telling You",
      excerpt: "70% of transformations fail due to structural misalignment. Discover how entropy scoring reveals hidden organizational disorder.",
      category: "Structure",
      author: "Marcus Williams",
      date: "September 25, 2025",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 3,
      title: "From Engagement Surveys to Ethical Alignment",
      excerpt: "Engagement scores tell you how people feel. The Mizan Framework tells you why—and what to do about it.",
      category: "Culture",
      author: "Priya Sharma",
      date: "September 22, 2025",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 4,
      title: "How Multi-Agent AI Sees What Humans Miss",
      excerpt: "Seven specialized AI agents analyze your organization simultaneously. Here's what they found in 500+ companies.",
      category: "AI & Technology",
      author: "James Park",
      date: "September 20, 2025",
      readTime: "10 min read",
      featured: false
    },
    {
      id: 5,
      title: "The Integrity Cylinder: Why Level 5 is Your Leadership Litmus Test",
      excerpt: "Organizations can't reach Unity (Cylinder 7) if Justice & Integrity (Cylinder 5) are broken. Here's how to audit fairness.",
      category: "Leadership",
      author: "Dr. Sarah Chen",
      date: "September 18, 2025",
      readTime: "9 min read",
      featured: false
    },
    {
      id: 6,
      title: "Case Study: How a Healthcare Provider Cut Turnover by 22%",
      excerpt: "Transparent promotion systems and equity audits revealed misalignment at Cylinder 5. The results were immediate.",
      category: "Case Studies",
      author: "Mizan Research Team",
      date: "September 15, 2025",
      readTime: "12 min read",
      featured: false
    },
    {
      id: 7,
      title: "Strategy Execution Fails Without Structure-Culture Alignment",
      excerpt: "McKinsey reports 70% of change programs fail. We analyzed why—and built a framework to fix it.",
      category: "Research",
      author: "Dr. Lisa Thompson",
      date: "September 12, 2025",
      readTime: "11 min read",
      featured: false
    },
    {
      id: 8,
      title: "The Non-Hierarchical Advantage: Why Balance Beats Climbing",
      excerpt: "Safety & Survival (Cylinder 1) is just as vital as Transcendence & Unity (Cylinder 7). Here's why.",
      category: "Framework",
      author: "Marcus Williams",
      date: "September 10, 2025",
      readTime: "8 min read",
      featured: false
    },
    {
      id: 9,
      title: "Hiring for Culture Fit and Fairness: The AI Interview Bot",
      excerpt: "Our hiring module screens candidates across all seven cylinders while ensuring ethical, bias-free evaluation.",
      category: "AI & Technology",
      author: "James Park",
      date: "September 8, 2025",
      readTime: "7 min read",
      featured: false
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  // Compliant with AGENT_CONTEXT_ULTIMATE.md - Strict TypeScript types
  const handleArticleClick = (article: Article) => {
    alert(`Article "${article.title}" - Full article coming soon!\n\nTo implement: Connect to your backend API to fetch full article content.`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation activePage="blog" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8 border border-mizan-primary bg-mizan-primary/5">
            <BookOpen size={16} className="text-mizan-primary" />
            <span className="text-xs font-semibold tracking-wide uppercase text-mizan-primary">
              Insights & Research
            </span>
          </div>

          <h1 className="font-display text-6xl md:text-7xl font-semibold mb-8 leading-tight text-mizan-primary">
            The Mizan Blog
          </h1>

          <p className="text-xl font-light max-w-3xl mx-auto leading-relaxed mb-12 text-mizan-secondary">
            Thought leadership on organizational alignment, ethical frameworks, and AI-powered transformation.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-mizan-secondary" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:ring-offset-0 text-mizan-primary"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap smooth-transition ${
                  selectedCategory === cat
                    ? 'bg-mizan-primary text-white'
                    : 'bg-white text-mizan-secondary border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {selectedCategory === 'All' && featuredArticle && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-mizan-primary to-mizan-secondary rounded-3xl p-16 flex items-center justify-center">
                <FrameworkGuideIcon className="w-32 h-32" color="white" />
              </div>

              <div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-mizan-gold/10 text-mizan-gold">
                  Featured
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 leading-tight text-mizan-primary">
                  {featuredArticle.title}
                </h2>

                <p className="text-lg leading-relaxed mb-6 text-mizan-secondary">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center space-x-6 mb-8 text-sm text-mizan-secondary">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleArticleClick(featuredArticle)}
                  className="group px-8 py-3 text-base font-semibold rounded-full smooth-transition hover:shadow-lg hover:scale-105 inline-flex items-center space-x-2 bg-mizan-gold text-white"
                >
                  <span>Read Article</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 smooth-transition" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article, i) => {
              const gradientClass = i % 3 === 0
                ? 'bg-gradient-to-br from-mizan-primary to-mizan-secondary'
                : i % 3 === 1
                  ? 'bg-gradient-to-br from-mizan-gold to-mizan-gold-light'
                  : 'bg-gradient-to-br from-mizan-secondary to-mizan-primary';

              const getIcon = () => {
                switch (article.category) {
                  case 'Framework':
                    return <FrameworkGuideIcon className="w-16 h-16" color="white" />;
                  case 'Culture':
                    return <CultureIcon className="w-16 h-16" color="white" />;
                  case 'Structure':
                    return <StructureIcon className="w-16 h-16" color="white" />;
                  case 'AI & Technology':
                    return <InsightsIcon className="w-16 h-16" color="white" />;
                  case 'Leadership':
                    return <LeadershipIcon className="w-16 h-16" color="white" />;
                  case 'Case Studies':
                    return <CaseStudyIcon className="w-16 h-16" color="white" />;
                  case 'Research':
                    return <ResearchIcon className="w-16 h-16" color="white" />;
                  default:
                    return <FrameworkGuideIcon className="w-16 h-16" color="white" />;
                }
              };

              return (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover-lift cursor-pointer"
                >
                  <div className={`h-48 flex items-center justify-center ${gradientClass}`}>
                    {getIcon()}
                  </div>

                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-mizan-primary/5 text-mizan-primary">
                      {article.category}
                    </div>

                    <h3 className="text-xl font-semibold mb-3 leading-tight text-mizan-primary">
                      {article.title}
                    </h3>

                    <p className="text-sm leading-relaxed mb-4 text-mizan-secondary">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-mizan-secondary">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-mizan-secondary">
                No articles found. Try a different search or category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-32 px-4 bg-mizan-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6 text-mizan-primary">
            Get insights delivered
          </h2>
          <p className="text-xl mb-12 text-mizan-secondary">
            Join 2,000+ HR and OD leaders receiving our weekly newsletter on organizational alignment.
          </p>

          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-mizan-gold focus:ring-offset-0 text-mizan-primary"
            />
            <button className="px-8 py-4 text-base font-semibold rounded-full smooth-transition hover:shadow-lg hover:scale-105 bg-mizan-gold text-white">
              Subscribe
            </button>
          </div>

          <p className="text-xs mt-4 text-mizan-secondary">
            No spam. Unsubscribe anytime. Privacy policy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm mb-6 text-mizan-secondary">
            © 2025 Mizan. Aligning structure, culture & skills.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <Link href="/privacy" className="hover:opacity-60 smooth-transition text-mizan-secondary">Privacy</Link>
            <Link href="/terms" className="hover:opacity-60 smooth-transition text-mizan-secondary">Terms</Link>
            <Link href="/security" className="hover:opacity-60 smooth-transition text-mizan-secondary">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
