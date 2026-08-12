import React from 'react';
import { Metadata } from 'next';
import { CategoryListingPage } from '@/components/post/CategoryListingPage';

export const metadata: Metadata = {
  title: 'Admit Cards 2026',
  description: 'Download sarkari exam admit cards, hall tickets, and check exam dates.',
};

export default function AdmitCardPage() {
  return <CategoryListingPage category="admit-card" />;
}
