'use client';

import React from 'react';
import { Post } from '@/types/post';
import { PostCard } from './PostCard';
import { StaggerList, StaggerItem } from '../animations/StaggerList';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="space-y-6 pt-8 border-t border-[var(--border-color)]">
      <h3 className="font-heading font-bold text-xl text-[var(--text-main)]">
        Related Updates
      </h3>

      <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <StaggerItem key={post._id}>
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </StaggerList>
    </section>
  );
}
