import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us — LearnForRise',
  description: 'Learn about LearnForRise — India\'s premier minimal, clean government job and result information portal.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Image
            src="/logo.jpg"
            alt="LearnForRise Logo"
            width={20}
            height={20}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span>Official Portal Information</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[var(--text-main)] tracking-tight">
          About <span className="text-[#0F9D6E] dark:text-[#10B981]">LearnForRise</span>
        </h1>
        <p className="text-sm sm:text-lg text-[var(--text-muted)] leading-relaxed">
          Transforming how millions of Indian students and aspirants discover government vacancies, exam results, admit cards, and syllabus updates.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-[#0F9D6E] flex items-center justify-center font-bold text-sm">
              01
            </span>
            Our Mission
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            Traditional sarkari result portals are filled with intrusive ads, popups, broken links, and misleading titles. <strong className="text-[var(--text-main)]">LearnForRise</strong> was designed from the ground up to solve this exact problem: providing a minimal, ultra-fast, and trustworthy experience.
          </p>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-heading font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm">
              02
            </span>
            Our Vision
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            To become India's most relied-upon digital information platform for government examinations, recruitment notifications, answer keys, and university admissions—ensuring no candidate misses an opportunity due to cluttered interfaces.
          </p>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 shadow-sm space-y-6">
        <h2 className="font-heading font-bold text-2xl text-[var(--text-main)] text-center">
          Why Aspirants Choose LearnForRise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="space-y-2 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
            <h3 className="font-heading font-bold text-base text-[var(--text-main)]">Zero Popup Ads</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              No full-page redirects or deceptive download buttons. Focus 100% on your preparation.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
            <h3 className="font-heading font-bold text-base text-[var(--text-main)]">100% Verified Links</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Direct access to official government recruitment portals (UPSC, SSC, RRB, Banking, NTA).
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
            <h3 className="font-heading font-bold text-base text-[var(--text-main)]">Lightning Fast Speed</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Built on modern Next.js technology for rapid loading even on low-speed 3G/4G networks.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
            <h3 className="font-heading font-bold text-base text-[var(--text-main)]">Dark Mode Built-in</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Eye-friendly dark theme designed for late-night study sessions and mobile viewing.
            </p>
          </div>
        </div>
      </div>

      {/* Legal & Notice Banner */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed space-y-2">
        <strong className="text-[var(--text-main)] font-semibold block">Important Declaration:</strong>
        <p>
          LearnForRise is an independent news and information portal. We are not affiliated with or endorsed by any government entity. All job notifications, exam dates, and official links are gathered from public domain announcements and official government portals.
        </p>
      </div>
    </div>
  );
}
