import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF7F2',
          100: '#F5F1EC',
          200: '#EDE6DC',
        },
        charcoal: {
          900: '#1A1A1A',
          800: '#232322',
          700: '#2E2D2B',
        },
        warmgray: {
          400: '#B5AEA3',
          500: '#8B847A',
          600: '#6E675E',
        },
        ochre: {
          DEFAULT: '#7A6448',
          muted: '#9C8668',
        },
      },
      fontFamily: {
        // Century Gothic is present on macOS and Windows out of the box.
        // Jost (loaded via next/font/google) is the universal fallback —
        // it was designed explicitly as a free, metric-compatible
        // alternative to Futura / Century Gothic. URW Gothic and ITC
        // Avant Garde Gothic cover other systems.
        display: [
          '"Century Gothic"',
          '"ITC Avant Garde Gothic"',
          '"URW Gothic"',
          'var(--font-sans-fallback)',
          '"Jost"',
          '"Futura"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        sans: [
          '"Century Gothic"',
          '"ITC Avant Garde Gothic"',
          '"URW Gothic"',
          'var(--font-sans-fallback)',
          '"Jost"',
          '"Futura"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono)',
          '"JetBrains Mono"',
          'ui-monospace',
          'monospace',
        ],
      },
      letterSpacing: {
        'display-tight': '-0.04em',
        'label-wide': '0.18em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
