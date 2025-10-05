'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activePage?: string;
}

export default function Navigation({ activePage = '' }: NavigationProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (page: string) => activePage === page;

  return (
    <nav className={`fixed top-0 w-full z-50 smooth-transition ${
      scrollY > 20 ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-mizan-primary">
            Mizan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10 text-sm font-medium">
            <Link
              href="/"
              className="hover:opacity-60 smooth-transition"
              style={{ color: isActive('home') ? '#CCA404' : '#3F3D56' }}
            >
              Home
            </Link>
            <Link
              href="/platform"
              className="hover:opacity-60 smooth-transition"
              style={{ color: isActive('platform') ? '#CCA404' : '#3F3D56' }}
            >
              Platform
            </Link>
            <Link
              href="/services"
              className="hover:opacity-60 smooth-transition"
              style={{ color: isActive('services') ? '#CCA404' : '#3F3D56' }}
            >
              Services
            </Link>
            <Link
              href="/why"
              className="hover:opacity-60 smooth-transition"
              style={{ color: isActive('why') ? '#CCA404' : '#3F3D56' }}
            >
              Why Mizan
            </Link>
            <Link
              href="/pricing"
              className="hover:opacity-60 smooth-transition"
              style={{ color: isActive('pricing') ? '#CCA404' : '#3F3D56' }}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="hover:opacity-60 smooth-transition"
              style={{ color: isActive('blog') ? '#CCA404' : '#3F3D56' }}
            >
              Blog
            </Link>
            <Link
              href="/resources"
              className="hover:opacity-60 smooth-transition"
              style={{ color: isActive('resources') ? '#CCA404' : '#3F3D56' }}
            >
              Resources
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/login" className="text-sm font-medium hover:opacity-60 smooth-transition text-mizan-secondary">
              Login
            </Link>
            <Link
              href="/demo"
              className="px-6 py-2.5 text-sm font-semibold rounded-full smooth-transition hover:shadow-lg hover:scale-105 bg-mizan-gold text-white"
            >
              Request a Demo
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-mizan-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 space-y-5 border-t border-gray-100 pt-6">
            <Link href="/" className="block text-base font-medium text-mizan-primary">Home</Link>
            <Link href="/platform" className="block text-base font-medium text-mizan-primary">Platform</Link>
            <Link href="/services" className="block text-base font-medium text-mizan-primary">Services</Link>
            <Link href="/why" className="block text-base font-medium text-mizan-primary">Why Mizan</Link>
            <Link href="/pricing" className="block text-base font-medium text-mizan-primary">Pricing</Link>
            <Link href="/blog" className="block text-base font-medium text-mizan-primary">Blog</Link>
            <Link href="/resources" className="block text-base font-medium text-mizan-primary">Resources</Link>
            <Link href="/login" className="block text-base font-medium text-mizan-secondary">Login</Link>
            <Link
              href="/demo"
              className="block w-full px-6 py-3 text-sm font-semibold rounded-full text-center bg-mizan-gold text-white"
            >
              Request a Demo
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
