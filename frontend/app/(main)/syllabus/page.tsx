import React from 'react';
import { Metadata } from 'next';
import { CategoryListingPage } from '@/components/post/CategoryListingPage';

export const metadata: Metadata = {
  title: 'Exam Syllabus & Pattern 2026',
  description: 'Download exam-wise syllabus, selection process, and exam pattern PDFs.',
};

export default function SyllabusPage() {
  return <CategoryListingPage category="syllabus" />;
}
