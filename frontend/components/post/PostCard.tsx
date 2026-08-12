'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Countdown } from '../ui/Countdown';
import { Post } from '@/types/post';
import { formatDate, isNewPost, getClosestDeadline, getCategoryDisplayName } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  const isNew = isNewPost(post.publishedAt || post.createdAt);
  const closestDeadline = getClosestDeadline(post.importantDates || []);

  return (
    <Link href={`/${post.category}/${post.slug}`} className="block h-full">
      <Card className={`h-full flex flex-col justify-between group ${className || ''}`}>
        <div className="space-y-3">
          {/* Category & Badges Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0F9D6E] dark:text-[#10B981]">
              {getCategoryDisplayName(post.category)}
            </span>

            <div className="flex items-center gap-1.5">
              {post.isTrending && <Badge variant="urgent">Trending</Badge>}
              {isNew && <Badge variant="new">New</Badge>}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-base md:text-lg text-[var(--text-main)] group-hover:text-[#0F9D6E] dark:group-hover:text-[#10B981] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Department / Org */}
          {post.department && (
            <p className="text-xs text-[var(--text-muted)] line-clamp-1">
              <span>{post.department}</span>
              {post.state && <span> • {post.state}</span>}
            </p>
          )}

          {/* Short description */}
          {post.shortDescription && (
            <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
              {post.shortDescription}
            </p>
          )}
        </div>

        {/* Footer info: Total posts, deadline badge & date */}
        <div className="mt-4 pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            {post.totalPosts && (
              <span className="font-medium text-[var(--text-main)] bg-[var(--bg-card-hover)] px-2 py-0.5 rounded-md">
                {post.totalPosts}
              </span>
            )}
            {post.qualification && !post.totalPosts && (
              <span className="font-medium text-[var(--text-main)] bg-[var(--bg-card-hover)] px-2 py-0.5 rounded-md">
                {post.qualification}
              </span>
            )}
          </div>

          <div>
            {closestDeadline ? (
              <Countdown targetDate={closestDeadline.date} label={closestDeadline.label} />
            ) : (
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
