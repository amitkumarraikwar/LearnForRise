import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'LearnForRise — Government Jobs, Results, Admit Cards & Syllabus',
    template: '%s | LearnForRise',
  },
  description:
    'Minimal, premium government job portal for Latest Jobs, Result, Admit Card, Syllabus, Answer Key, and Admission notifications across India. Fast and clutter-free.',
  keywords: [
    'sarkari result',
    'government jobs',
    'latest jobs',
    'admit card',
    'exam result',
    'syllabus',
    'answer key',
    'admission',
    'learnforrise',
  ],
  authors: [{ name: 'LearnForRise Team' }],
  metadataBase: new URL('https://learnforrise.com'),
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'LearnForRise — Government Job & Result Information Portal',
    description: 'Clean, minimal, premium government job portal.',
    url: 'https://learnforrise.com',
    siteName: 'LearnForRise',
    images: [{ url: '/logo.jpg', width: 500, height: 500, alt: 'LearnForRise Logo' }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnForRise',
    description: 'Minimal, premium government job portal.',
    images: ['/logo.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-[#0F9D6E] selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
