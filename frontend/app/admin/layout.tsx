'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Manage Jobs', href: '/admin/posts' },
    { label: 'Create New Job', href: '/admin/posts/create' },
    { label: 'Categories', href: '/admin/categories' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors flex flex-col">
      {/* Admin Top Header Bar */}
      <header className="sticky top-0 z-50 bg-[var(--bg-card)] border-b border-[var(--border-color)] shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/admin" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo.jpg"
              alt="LearnForRise Logo"
              width={34}
              height={34}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shadow-sm bg-white"
            />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base sm:text-lg text-[var(--text-main)] tracking-tight">
                LearnForRise <span className="text-[#0F9D6E] dark:text-[#10B981]">Admin</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Portal v1.0
              </span>
            </div>
          </Link>

          {/* Quick Actions & Theme */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[#0F9D6E] transition-colors text-[var(--text-muted)] hover:text-[var(--text-main)]"
            >
              <span>View Website</span>
              <span>↗</span>
            </Link>
            <DarkModeToggle />
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="border-t border-[var(--border-color)] bg-[var(--bg-card)]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#0F9D6E] text-white shadow-sm'
                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Admin Body Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-12">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-4 text-center text-xs text-[var(--text-muted)]">
        LearnForRise Admin Portal • Built with Next.js App Router
      </footer>
    </div>
  );
}
