/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
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
        display: [
          '"Century Gothic"',
          '"ITC Avant Garde Gothic"',
          '"URW Gothic"',
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
          '"Jost"',
          '"Futura"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
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
