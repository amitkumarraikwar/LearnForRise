'use client';

import React from 'react';
import { Post } from '@/types/post';
import { PostCard } from '../post/PostCard';
import { StaggerList, StaggerItem } from '../animations/StaggerList';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

interface TrendingSectionProps {
  posts: Post[];
}

export function TrendingSection({ posts }: TrendingSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-12 border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <FadeInOnScroll className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-[var(--text-main)]">
              Trending Now
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)]">
              Most clicked and urgent notifications right now
            </p>
          </div>
        </FadeInOnScroll>

        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerItem key={post._id}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
