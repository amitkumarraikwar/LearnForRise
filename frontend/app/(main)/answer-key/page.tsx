import React from 'react';
import { Metadata } from 'next';
import { CategoryListingPage } from '@/components/post/CategoryListingPage';

export const metadata: Metadata = {
  title: 'Official Answer Keys 2026',
  description: 'Download official exam answer keys, check solution keys, and raise objections.',
};

export default function AnswerKeyPage() {
  return <CategoryListingPage category="answer-key" />;
}
