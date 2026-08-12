import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl">
        404
      </div>
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[var(--text-main)]">
        Page Not Found
      </h1>
      <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
        The page or job notification you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
