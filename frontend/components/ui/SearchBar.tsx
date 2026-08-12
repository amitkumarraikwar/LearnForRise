'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  defaultValue?: string;
}

export function SearchBar({
  placeholder = 'Search jobs, results, admit cards...',
  className,
  size = 'md',
  defaultValue = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const sizeClasses = {
    sm: 'py-2 pl-9 pr-4 text-xs rounded-xl',
    md: 'py-2.5 pl-10 pr-4 text-sm rounded-xl',
    lg: 'py-3.5 pl-12 pr-4 text-base rounded-2xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4 left-3',
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  return (
    <form onSubmit={handleSearch} className={cn('relative w-full flex items-center', className)}>
      <svg
        className={cn(
          'absolute top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none transition-colors shrink-0',
          iconSizes[size]
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#0F9D6E] dark:focus:border-[#10B981] focus:ring-1 focus:ring-[#0F9D6E] transition-all shadow-sm',
          sizeClasses[size]
        )}
      />
    </form>
  );
}
