'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Post } from '@/types/post';
import { getPostBySlug, getRelatedPosts } from '@/lib/api';
import { PostDetail } from './PostDetail';
import { RelatedPosts } from './RelatedPosts';
import { DetailSkeleton } from '../ui/Skeleton';

interface PostDetailPageViewProps {
  slug: string;
  initialPost?: Post | null;
}

export function PostDetailPageView({ slug, initialPost }: PostDetailPageViewProps) {
  const [post, setPost] = useState<Post | null>(initialPost || null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(!initialPost);

  useEffect(() => {
    let isMounted = true;
    async function loadPostData() {
      if (!initialPost) setLoading(true);
      try {
        const [postRes, relatedRes] = await Promise.all([
          getPostBySlug(slug),
          getRelatedPosts(slug),
        ]);

        if (isMounted) {
          if (postRes.success && postRes.data) setPost(postRes.data);
          if (relatedRes.success && relatedRes.data) setRelated(relatedRes.data);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadPostData();
    return () => {
      isMounted = false;
    };
  }, [slug, initialPost]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DetailSkeleton />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-[var(--text-main)]">
          Post Not Found
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          The requested job or notification could not be found or has been removed.
        </p>
      </div>
    );
  }

  // JobPosting Structured Data JSON-LD for SEO
  const jsonLd = post.category === 'latest-jobs' ? {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: post.title,
    description: post.shortDescription || post.title,
    datePosted: post.publishedAt || post.createdAt,
    validThrough: post.importantDates?.[0]?.date,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: post.department || 'Government of India',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: post.state || 'India',
      },
    },
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {jsonLd && (
        <Script
          id="job-posting-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <PostDetail post={post} />
      <RelatedPosts posts={related} />
    </div>
  );
}
