'use client';

import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden border-t border-charcoal-900/10 bg-cream-100 py-40 md:py-56"
    >
      <div className="mx-auto max-w-[1680px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500 md:col-span-2">
            § Studio &nbsp;·&nbsp; 02
          </p>

          <motion.blockquote
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-10"
          >
            <p className="font-display text-[clamp(2rem,5.2vw,5rem)] font-light leading-[1.02] tracking-display-tight text-charcoal-900">
              We do not build for an imagined tomorrow.
              <span className="block text-warmgray-600">
                We build for the ordinary, <span className="italic">serious work</span>
                &nbsp;of the next thirty years &mdash; the quiet engineering that
                outlives a news cycle.
              </span>
            </p>

            <footer className="mt-16 flex flex-col gap-4 border-t border-charcoal-900/10 pt-8 md:flex-row md:items-center md:justify-between md:gap-10">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
                  — A. Marchetti-Sato, founding partner
                </span>
              </div>
              <a
                href="#dispatch"
                className="group inline-flex items-center gap-3 font-sans text-[12px] uppercase tracking-label-wide text-charcoal-900"
              >
                <span className="relative">
                  Read the full charter
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-charcoal-900/25 transition-colors duration-500 group-hover:bg-charcoal-900" />
                </span>
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 9L9 1M9 1H2.5M9 1V7.5" stroke="currentColor" strokeWidth="1" />
                </svg>
              </a>
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
