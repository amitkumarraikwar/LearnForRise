'use client';

import React from 'react';
import { ImportantLink } from '@/types/post';
import { Button } from '../ui/Button';

interface ImportantLinksProps {
  links: ImportantLink[];
}

export function ImportantLinks({ links }: ImportantLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="font-heading font-bold text-lg text-[var(--text-main)]">
        Important Links
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant={idx === 0 ? 'primary' : 'outline'}
              className="w-full justify-between group"
            >
              <span>{link.label}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </a>
        ))}
      </div>
    </div>
  );
}
