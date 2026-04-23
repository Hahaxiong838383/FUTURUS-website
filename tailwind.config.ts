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
        // Display: commercial `PP Editorial New` wins if the local woff2 is
        // dropped under public/fonts/. Otherwise the CSS variable from
        // next/font/google (Fraunces) takes over — same editorial register.
        display: [
          '"PP Editorial New"',
          'var(--font-display)',
          '"Fraunces"',
          'ui-serif',
          'Georgia',
          'serif',
        ],
        // Sans: commercial `Söhne` wins if present. Otherwise Geist
        // (Söhne-family neo-grotesque) from next/font/google.
        sans: [
          '"Söhne"',
          'var(--font-sans)',
          '"Geist"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          '"Söhne Mono"',
          'var(--font-mono)',
          '"Geist Mono"',
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
