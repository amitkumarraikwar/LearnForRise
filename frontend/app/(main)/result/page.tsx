import React from 'react';
import { Metadata } from 'next';
import { CategoryListingPage } from '@/components/post/CategoryListingPage';

export const metadata: Metadata = {
  title: 'Exam Results 2026',
  description: 'Check government exam results, cut off marks, merit lists, and scorecards.',
};

export default function ResultPage() {
  return <CategoryListingPage category="result" />;
}
