'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CATEGORIES, PostCategory } from '@/types/post';
import { cn } from '@/lib/utils';

interface PillTabsProps {
  activeCategory?: PostCategory | 'all';
  className?: string;
}

export function PillTabs({ activeCategory, className }: PillTabsProps) {
  const pathname = usePathname();

  const tabs = [
    { name: 'All Updates', slug: 'all', href: '/' },
    ...CATEGORIES.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      href: `/${cat.slug}`,
    })),
  ];

  return (
    <div className={cn('flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1', className)}>
      {tabs.map((tab) => {
        const isActive =
          activeCategory === tab.slug ||
          (tab.slug === 'all' && pathname === '/') ||
          (tab.slug !== 'all' && pathname.startsWith(`/${tab.slug}`));

        return (
          <Link key={tab.slug} href={tab.href} className="relative shrink-0">
            <span
              className={cn(
                'relative z-10 block px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-colors whitespace-nowrap',
                isActive
                  ? 'text-white font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
              )}
            >
              {tab.name}
            </span>
            {isActive && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-[#0F9D6E] dark:bg-[#10B981] rounded-full shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
