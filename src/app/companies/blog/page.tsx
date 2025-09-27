"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock, Eye, BookOpen, Lightbulb, Zap, Users, Target, Brain } from 'lucide-react';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind the 7-Cylinders Framework",
      excerpt: "Discover how our proprietary ethical framework maps human values to organizational excellence through seven fundamental principles.",
      content: "Our 7-Cylinders Framework represents years of research into organizational psychology, ethical philosophy, and cultural anthropology. Each cylinder represents a fundamental aspect of human flourishing...",
      author: "Mizan Research Team",
      date: "December 15, 2024",
      readTime: "8 min read",
      views: "1.2K",
      category: "Framework",
      featured: true,
      image: "/blog/cylinders-research.jpg"
    },
    {
      id: 2,
      title: "Building the Three-Engine AI Architecture",
      excerpt: "How we designed our Knowledge, Data, and Reasoning engines to work together for unprecedented organizational analysis.",
      content: "Traditional AI approaches often fail in organizational contexts because they lack the nuanced understanding required for human-centered analysis. Our Three-Engine Architecture addresses this by combining...",
      author: "Engineering Team",
      date: "December 10, 2024",
      readTime: "12 min read",
      views: "2.1K",
      category: "Technology",
      featured: true,
      image: "/blog/ai-architecture.jpg"
    },
    {
      id: 3,
      title: "Why Structure Analysis is Free Forever",
      excerpt: "Our commitment to democratizing organizational intelligence starts with making structural analysis accessible to every organization.",
      content: "We believe that every organization, regardless of size or budget, deserves access to sophisticated structural analysis. That's why our Structure Analysis will always be free...",
      author: "Mizan Leadership",
      date: "December 8, 2024",
      readTime: "6 min read",
      views: "3.4K",
      category: "Company",
      featured: false,
      image: "/blog/free-structure.jpg"
    },
    {
      id: 4,
      title: "The Future of Culture Analysis: Beyond Surveys",
      excerpt: "Traditional culture surveys capture just 20% of organizational culture. Here's how AI is changing the game.",
      content: "Most culture surveys rely on static questions that capture only surface-level insights. Our AI-powered culture analysis goes deeper by understanding the semantic relationships between values...",
      author: "Dr. Sarah Chen, Culture Research Lead",
      date: "December 5, 2024",
      readTime: "10 min read",
      views: "1.8K",
      category: "Research",
      featured: false,
      image: "/blog/culture-future.jpg"
    },
    {
      id: 5,
      title: "Skills Gap Analysis in the AI Era",
      excerpt: "How organizations can prepare their workforce for an AI-driven future through strategic capability mapping.",
      content: "The rapid advancement of AI is creating unprecedented skills gaps across industries. Our Skills Analysis agent helps organizations identify these gaps early and develop strategic responses...",
      author: "Skills Intelligence Team",
      date: "December 1, 2024",
      readTime: "9 min read",
      views: "2.7K",
      category: "Insights",
      featured: false,
      image: "/blog/skills-ai.jpg"
    },
    {
      id: 6,
      title: "Platform Update: Enhanced Employee Survey Experience",
      excerpt: "Major improvements to our culture survey interface based on user feedback and usability research.",
      content: "We've completely redesigned our employee survey experience to feel more like a conversation than a questionnaire. Key improvements include dynamic value pools, better question wording, and real-time progress indicators...",
      author: "Product Team",
      date: "November 28, 2024",
      readTime: "5 min read",
      views: "956",
      category: "Product Updates",
      featured: false,
      image: "/blog/survey-update.jpg"
    },
    {
      id: 7,
      title: "The Ethics of AI in Organizational Analysis",
      excerpt: "How we ensure our AI systems remain grounded in human-centered principles and ethical decision-making.",
      content: "As AI becomes more powerful in analyzing human behavior and organizational dynamics, ethical considerations become paramount. Our approach to ethical AI includes transparent algorithms, bias detection, and human oversight...",
      author: "Ethics Committee",
      date: "November 25, 2024",
      readTime: "11 min read",
      views: "1.5K",
      category: "Ethics",
      featured: false,
      image: "/blog/ai-ethics.jpg"
    },
    {
      id: 8,
      title: "Coming Soon: Performance Analytics Module",
      excerpt: "Sneak peek at our upcoming performance analytics capabilities that will complete the organizational intelligence triangle.",
      content: "We're excited to share a preview of our Performance Analytics module, which will complete our organizational intelligence platform. This module will provide real-time performance tracking, predictive analytics, and automated insights...",
      author: "Development Team",
      date: "November 20, 2024",
      readTime: "7 min read",
      views: "2.3K",
      category: "Coming Soon",
      featured: false,
      image: "/blog/performance-preview.jpg"
    }
  ];

  const categories = [
    "All",
    "Framework",
    "Technology", 
    "Research",
    "Product Updates",
    "Company",
    "Ethics",
    "Coming Soon"
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mizan" className="w-8 h-8" />
            <span className="text-xl font-light text-slate-800">Mizan</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/companies" className="text-slate-600 hover:text-slate-900">Home</Link>
            <Link href="/companies/about" className="text-slate-600 hover:text-slate-900">About</Link>
            <Link href="/companies/demo" className="text-slate-600 hover:text-slate-900">Demo</Link>
            <Link href="/request-demo" className="text-slate-600 hover:text-slate-900">Book Demo</Link>
            <Link href="/companies/pricing" className="text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link href="/companies/demo" className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-light hover:bg-slate-800 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-extralight text-slate-900 mb-8 leading-tight">
            Mizan
            <span className="block bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            Deep dives into organizational intelligence, AI research, platform updates, 
            and the science behind building thriving workplace cultures.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-12">
              <Zap className="w-6 h-6 text-amber-500 mr-3" />
              <h2 className="text-3xl font-light text-slate-900">Featured Articles</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-amber-100 flex items-center justify-center">
                      {post.category === 'Framework' && <Target className="w-16 h-16 text-blue-600" />}
                      {post.category === 'Technology' && <Brain className="w-16 h-16 text-purple-600" />}
                      {post.category === 'Company' && <Users className="w-16 h-16 text-green-600" />}
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-light text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-slate-600 font-light leading-relaxed mb-6">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-500">
                          <User className="w-4 h-4 mr-2" />
                          <span className="mr-4">{post.author}</span>
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="mr-4">{post.date}</span>
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{post.readTime}</span>
                        </div>
                        
                        <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-700 font-medium mr-4">Filter by category:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <BookOpen className="w-6 h-6 text-slate-600 mr-3" />
            <h2 className="text-3xl font-light text-slate-900">
              {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 h-full flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center">
                    {post.category === 'Framework' && <Target className="w-12 h-12 text-blue-600" />}
                    {post.category === 'Technology' && <Brain className="w-12 h-12 text-purple-600" />}
                    {post.category === 'Research' && <Lightbulb className="w-12 h-12 text-amber-600" />}
                    {post.category === 'Product Updates' && <Zap className="w-12 h-12 text-green-600" />}
                    {post.category === 'Company' && <Users className="w-12 h-12 text-indigo-600" />}
                    {post.category === 'Ethics' && <User className="w-12 h-12 text-rose-600" />}
                    {post.category === 'Coming Soon' && <Clock className="w-12 h-12 text-teal-600" />}
                    {post.category === 'Insights' && <Eye className="w-12 h-12 text-orange-600" />}
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.category === 'Framework' ? 'bg-blue-100 text-blue-800' :
                        post.category === 'Technology' ? 'bg-purple-100 text-purple-800' :
                        post.category === 'Research' ? 'bg-amber-100 text-amber-800' :
                        post.category === 'Product Updates' ? 'bg-green-100 text-green-800' :
                        post.category === 'Company' ? 'bg-indigo-100 text-indigo-800' :
                        post.category === 'Ethics' ? 'bg-rose-100 text-rose-800' :
                        post.category === 'Coming Soon' ? 'bg-teal-100 text-teal-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {post.category}
                      </span>
                      <div className="flex items-center text-slate-400 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        {post.views}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-medium text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 font-light text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center">
                        <span className="mr-3">{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-white mb-4">Stay Updated</h2>
          <p className="text-slate-300 font-light mb-8 max-w-2xl mx-auto">
            Get the latest insights on organizational intelligence, AI research, 
            and platform updates delivered directly to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-amber-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-amber-600 transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-slate-400 mt-4">
            No spam, unsubscribe at any time. Read our privacy policy.
          </p>
        </div>
      </section>

    </div>
  );
}