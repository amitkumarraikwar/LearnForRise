import React from 'react';
import { Metadata } from 'next';
import { CategoryListingPage } from '@/components/post/CategoryListingPage';

export const metadata: Metadata = {
  title: 'Latest Government Jobs 2026',
  description: 'Find latest sarkari vacancies, central & state government job notifications across India.',
};

export default function LatestJobsPage() {
  return <CategoryListingPage category="latest-jobs" />;
}
