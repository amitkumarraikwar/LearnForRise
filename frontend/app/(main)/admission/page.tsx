import React from 'react';
import { Metadata } from 'next';
import { CategoryListingPage } from '@/components/post/CategoryListingPage';

export const metadata: Metadata = {
  title: 'University & College Admissions 2026',
  description: 'Find college admission forms, entrance exam notifications, and counselling updates.',
};

export default function AdmissionPage() {
  return <CategoryListingPage category="admission" />;
}
