'use client';

import React, { useState, useEffect } from 'react';
import {
  getWhatsAppShareUrl,
  getTelegramShareUrl,
  getFacebookShareUrl,
  getTwitterShareUrl,
} from '@/lib/utils';
import { Button } from './Button';

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url || '');

  useEffect(() => {
    if (!url && typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const copyToClipboard = () => {
    if (navigator.clipboard && currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className || ''}`}>
      <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
        Share:
      </span>
      <a
        href={getWhatsAppShareUrl(currentUrl, title)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20">
          WhatsApp
        </Button>
      </a>
      <a
        href={getTelegramShareUrl(currentUrl, title)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="bg-sky-500/10 text-sky-600 border-sky-500/20 hover:bg-sky-500/20">
          Telegram
        </Button>
      </a>
      <a
        href={getFacebookShareUrl(currentUrl)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">
          Facebook
        </Button>
      </a>
      <a
        href={getTwitterShareUrl(currentUrl, title)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" size="sm" className="bg-zinc-500/10 text-zinc-600 border-zinc-500/20 hover:bg-zinc-500/20">
          X / Twitter
        </Button>
      </a>
      <Button variant="outline" size="sm" onClick={copyToClipboard}>
        {copied ? 'Copied' : 'Copy Link'}
      </Button>
    </div>
  );
}
