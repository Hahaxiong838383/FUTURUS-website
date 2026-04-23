import type { Metadata, Viewport } from 'next';
import { Fraunces } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

// Display: Fraunces stands in for the licensed PP Editorial New.
// Once the commercial woff2 is purchased, drop the files into
// public/fonts/PPEditorialNew-Regular.woff2 etc. and replace this
// block with a `next/font/local` import. The CSS variable below
// is already referenced from tailwind.config.ts, so the swap is a
// one-file change.
const displayFont = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

// Sans + Mono: Vercel's Geist stands in for Söhne / Söhne Mono — same
// neo-grotesque DNA and optical weight. The commercial Söhne replaces
// either via `next/font/local` without any downstream code change
// (tailwind.config.ts lists "Söhne" first).
const sansFont = GeistSans;
const monoFont = GeistMono;

const SITE_URL = 'https://futurus.studio';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Futurus — Instruments for the Next Century',
    template: '%s · Futurus',
  },
  description:
    'Futurus is an independent research studio working at the seam of computation, hardware, and the built world — quiet instruments for the serious work of the next thirty years.',
  applicationName: 'Futurus',
  keywords: [
    'research studio',
    'edge AI',
    'perception instruments',
    'computational hardware',
    'autonomous systems',
    'low-power observation',
  ],
  authors: [{ name: 'Futurus Studio' }],
  creator: 'Futurus Studio',
  publisher: 'Futurus Studio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Futurus',
    title: 'Futurus — Instruments for the Next Century',
    description:
      'An independent research studio designing computational instruments for perception, navigation, and low-power inference.',
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Futurus — Instruments for the Next Century',
    description:
      'An independent research studio designing computational instruments for perception, navigation, and low-power inference.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#F5F1EC',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
