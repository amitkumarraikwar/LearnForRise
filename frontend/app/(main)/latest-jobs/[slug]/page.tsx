import React from 'react';
import { Metadata } from 'next';
import { PostDetailPageView } from '@/components/post/PostDetailPageView';
import { getPostBySlug } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getPostBySlug(slug);
    if (res.success && res.data) {
      return {
        title: `${res.data.title} — Notification, Eligibility & Apply Online`,
        description: res.data.shortDescription || res.data.title,
      };
    }
  } catch (e) {
    // fallback
  }
  return {
    title: 'Job Details | LearnForRise',
  };
}

export default async function LatestJobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let initialPost = null;
  try {
    const res = await getPostBySlug(slug);
    if (res.success) initialPost = res.data;
  } catch (e) {
    // Client view will handle fallback/skeleton
  }

  return <PostDetailPageView slug={slug} initialPost={initialPost} />;
}
