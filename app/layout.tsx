import type { Metadata, Viewport } from 'next';
import { Jost, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Primary font: Century Gothic (locally installed on macOS/Windows).
// Jost is loaded from Google Fonts as a near-identical geometric-sans
// fallback for Linux/Android/iOS devices where Century Gothic is not
// present. Jost was designed explicitly as a free alternative to
// Futura / Century Gothic, so the visual character is preserved.
const fallbackSans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans-fallback',
  display: 'swap',
});

// Monospace for labels / meta. JetBrains Mono is a solid editorial
// choice and reliable across platforms.
const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

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
      className={`${fallbackSans.variable} ${monoFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
