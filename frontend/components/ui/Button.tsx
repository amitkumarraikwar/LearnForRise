'use client';

import React, { useRef } from 'react';
import { animate } from 'animejs';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, onClick, ...props }, ref) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = btnRef.current;
      if (target) {
        animate(target, {
          scale: [0.96, 1],
          duration: 250,
          ease: 'easeOutQuad',
        });
      }
      if (onClick) onClick(e);
    };

    const variantStyles = {
      primary:
        'bg-[#0F9D6E] dark:bg-[#10B981] text-white hover:bg-[#0D8960] dark:hover:bg-[#059669] shadow-sm active:scale-[0.98]',
      secondary:
        'bg-[#F5A623] text-zinc-950 font-medium hover:bg-[#DE931D] shadow-sm active:scale-[0.98]',
      outline:
        'border border-[var(--border-color)] bg-transparent text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] active:scale-[0.98]',
      ghost:
        'bg-transparent text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] active:scale-[0.98]',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
      md: 'px-4 py-2 text-sm font-medium rounded-xl gap-2',
      lg: 'px-6 py-3 text-base font-semibold rounded-xl gap-2.5',
    };

    return (
      <button
        ref={(node) => {
          btnRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F9D6E] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
