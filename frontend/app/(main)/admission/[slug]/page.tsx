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
        title: `${res.data.title} — Admission Form & Entrance Exam`,
        description: res.data.shortDescription || res.data.title,
      };
    }
  } catch (e) {}
  return { title: 'Admission Details | LearnForRise' };
}

export default async function AdmissionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let initialPost = null;
  try {
    const res = await getPostBySlug(slug);
    if (res.success) initialPost = res.data;
  } catch (e) {}

  return <PostDetailPageView slug={slug} initialPost={initialPost} />;
}
