'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'new' | 'urgent' | 'category' | 'default' | 'success';
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  const variantStyles = {
    new: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold',
    urgent: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-semibold animate-pulse',
    category: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium',
    success: 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 font-medium',
    default: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs rounded-full transition-colors',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
