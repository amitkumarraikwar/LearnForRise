'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SearchBar } from '../ui/SearchBar';
import { CounterAnimation } from '../animations/CounterAnimation';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

// Dynamic import for Three.js hero background (SSR disabled for performance)
const HeroBackground = dynamic(
  () => import('../animations/HeroBackground'),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28">
      {/* 3D Background */}
      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Main Headline */}
        <FadeInOnScroll delay={0.2}>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[var(--text-main)] tracking-tight leading-[1.15]">
            Simplify Your Search for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#0F9D6E] via-emerald-400 to-amber-400 bg-clip-text text-transparent">
              Government Jobs & Results
            </span>
          </h1>
        </FadeInOnScroll>

        {/* Subtext */}
        <FadeInOnScroll delay={0.3}>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
            Get instant, clutter-free access to latest sarkari vacancies, exam results, admit cards, syllabus, and university admissions. Zero popups, pure information.
          </p>
        </FadeInOnScroll>

        {/* Search Bar CTA */}
        <FadeInOnScroll delay={0.4}>
          <div className="max-w-xl mx-auto pt-2">
            <SearchBar size="lg" placeholder="Type job title, department or exam (e.g. UPSC, SSC CGL)..." />
          </div>
        </FadeInOnScroll>

        {/* Quick Tag Pills */}
        <FadeInOnScroll delay={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--text-muted)] pt-2">
            <span className="font-medium">Popular Searches:</span>
            <a href="/search?q=SSC" className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#0F9D6E] transition-colors">
              SSC CGL 2026
            </a>
            <a href="/search?q=Railway" className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#0F9D6E] transition-colors">
              Railway RRB
            </a>
            <a href="/search?q=UPSC" className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#0F9D6E] transition-colors">
              UPSC IAS
            </a>
            <a href="/search?q=Police" className="px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#0F9D6E] transition-colors">
              Police Bharti
            </a>
          </div>
        </FadeInOnScroll>

        {/* Counter Stats Section */}
        <FadeInOnScroll delay={0.6}>
          <div className="grid grid-cols-3 max-w-2xl mx-auto pt-10 border-t border-[var(--border-color)]/60 gap-4">
            <div className="space-y-1">
              <div className="font-heading font-extrabold text-xl sm:text-3xl text-[var(--text-main)]">
                <CounterAnimation value={50000} suffix="+" />
              </div>
              <p className="text-xs text-[var(--text-muted)] font-medium">Daily Aspirants</p>
            </div>

            <div className="space-y-1 border-x border-[var(--border-color)]/60">
              <div className="font-heading font-extrabold text-xl sm:text-3xl text-[#0F9D6E] dark:text-[#10B981]">
                <CounterAnimation value={1000} suffix="+" />
              </div>
              <p className="text-xs text-[var(--text-muted)] font-medium">Verified Updates</p>
            </div>

            <div className="space-y-1">
              <div className="font-heading font-extrabold text-xl sm:text-3xl text-[var(--text-main)]">
                <CounterAnimation value={100} suffix="%" />
              </div>
              <p className="text-xs text-[var(--text-muted)] font-medium">Clutter Free</p>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
