'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

const links = [
  { label: 'Research', href: '#index' },
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#manifesto' },
  { label: 'Dispatch', href: '#dispatch' },
];

export default function Nav() {
  // Page-wide scroll progress, spring-smoothed so the bar moves like a
  // weighted object instead of tracking the scrollbar 1:1.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-6 py-6 md:px-10 md:py-7">
        <a
          href="#"
          className="font-display text-[15px] font-normal tracking-tight text-charcoal-900"
          aria-label="Futurus, return to top"
        >
          Futurus<span className="align-super text-[9px] tracking-wide text-warmgray-500">®</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-sans text-[11px] uppercase tracking-label-wide text-charcoal-900/80 transition-colors duration-500 ease-editorial hover:text-charcoal-900"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-charcoal-900 transition-[width] duration-700 ease-editorial group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <span className="hidden font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500 md:inline">
            Est. MMXXI · 47.71° N
          </span>
          <a
            href="#dispatch"
            className="group inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-label-wide text-charcoal-900"
          >
            <span className="relative">
              Contact
              <span className="absolute -bottom-1 left-0 h-px w-full bg-charcoal-900/30 transition-colors duration-500 group-hover:bg-charcoal-900" />
            </span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 9L9 1M9 1H2.5M9 1V7.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>
        </div>
      </div>

      {/* Global scroll progress — 1px hairline, origin-left scaleX bar.
          Ochre tint matches the site's single accent. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="h-px origin-left bg-ochre/80 mix-blend-multiply"
      />
    </motion.header>
  );
}
