import React from 'react';
import { Hero } from '@/components/home/Hero';
import { TrendingSection } from '@/components/home/TrendingSection';
import { CategoryPreview } from '@/components/home/CategoryPreview';
import { getTrendingPosts, getPostsByCategory } from '@/lib/api';
import { Post, PostCategory } from '@/types/post';

export const revalidate = 60; // Revalidate homepage every 60s

export default async function HomePage() {
  let trendingPosts: Post[] = [];
  let categoryGroups: { category: PostCategory; posts: Post[] }[] = [];

  try {
    const [trendingRes, categoryRes] = await Promise.all([
      getTrendingPosts(6),
      getPostsByCategory(3),
    ]);

    if (trendingRes.success) trendingPosts = trendingRes.data;
    if (categoryRes.success) categoryGroups = categoryRes.data;
  } catch (error) {
    console.error('Failed to load homepage data:', error);
  }

  return (
    <div className="space-y-12">
      <Hero />
      <TrendingSection posts={trendingPosts} />
      <CategoryPreview categoryGroups={categoryGroups} />
    </div>
  );
}
