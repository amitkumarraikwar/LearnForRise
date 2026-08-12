'use client';

import React from 'react';
import Link from 'next/link';
import { Post, PostCategory, CATEGORIES } from '@/types/post';
import { PostCard } from '../post/PostCard';
import { StaggerList, StaggerItem } from '../animations/StaggerList';
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

interface CategoryGroup {
  category: PostCategory;
  posts: Post[];
}

interface CategoryPreviewProps {
  categoryGroups: CategoryGroup[];
}

export function CategoryPreview({ categoryGroups }: CategoryPreviewProps) {
  if (!categoryGroups || categoryGroups.length === 0) return null;

  return (
    <div className="space-y-16 py-8">
      {categoryGroups.map((group) => {
        if (!group.posts || group.posts.length === 0) return null;

        const info = CATEGORIES.find((c) => c.slug === group.category);
        const categoryName = info ? info.name : group.category;

        return (
          <section key={group.category} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <FadeInOnScroll className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div>
                <h2 className="font-heading font-bold text-xl md:text-2xl text-[var(--text-main)]">
                  {categoryName}
                </h2>
                <p className="text-xs text-[var(--text-muted)] font-normal">
                  {info?.description || `Latest ${categoryName} updates`}
                </p>
              </div>

              <Link
                href={`/${group.category}`}
                className="text-xs md:text-sm font-semibold text-[#0F9D6E] dark:text-[#10B981] hover:underline flex items-center gap-1 group"
              >
                <span>View All</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </FadeInOnScroll>

            <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.posts.slice(0, 3).map((post) => (
                <StaggerItem key={post._id}>
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerList>
          </section>
        );
      })}
    </div>
  );
}
