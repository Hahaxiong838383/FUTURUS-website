'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Dispatch() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'done'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('submitting');
    setTimeout(() => setState('done'), 700);
  }

  return (
    <section
      id="dispatch"
      className="relative border-t border-charcoal-900/10 bg-cream-50 py-32 md:py-44"
    >
      <div className="mx-auto grid max-w-[1680px] grid-cols-12 gap-6 px-6 md:px-10">
        <div className="col-span-12 md:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
            § Dispatch
          </p>
          <h2 className="mt-8 font-display text-[clamp(2.2rem,5vw,4.25rem)] font-light leading-[0.95] tracking-display-tight">
            One letter,
            <br />
            <span className="italic text-warmgray-600">every other Friday.</span>
          </h2>
          <p className="mt-8 max-w-[42ch] font-sans text-[14px] leading-relaxed text-charcoal-900/70">
            A short field note from the studio &mdash; what we shipped, what we
            abandoned, and a single longform essay worth the read. 2,400 readers.
            No tracking, no affiliate links, no growth funnel.
          </p>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <label
              htmlFor="dispatch-email"
              className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500"
            >
              Electronic address
            </label>
            <div className="group relative flex items-baseline gap-4 border-b border-charcoal-900/25 pb-4 transition-colors duration-500 ease-editorial focus-within:border-charcoal-900">
              <input
                id="dispatch-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="elena.okafor@studio.it"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent font-display text-[clamp(1.25rem,2.2vw,2rem)] font-light tracking-display-tight text-charcoal-900 placeholder:text-charcoal-900/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={state !== 'idle'}
                className="shrink-0 font-sans text-[11px] uppercase tracking-label-wide text-charcoal-900 transition-transform duration-300 active:translate-y-[1px] disabled:opacity-50"
              >
                {state === 'idle' && 'Subscribe ↗'}
                {state === 'submitting' && 'Filing…'}
                {state === 'done' && 'Filed ✓'}
              </button>
            </div>
            <p className="font-sans text-[12px] leading-relaxed text-charcoal-900/55">
              We file to a private list stored in Reykjavík. Unsubscribe is a
              single link at the foot of every letter.
            </p>
          </motion.form>

          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-charcoal-900/10 pt-10 font-sans text-[13px] leading-relaxed text-charcoal-900/75">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
                Enquiries
              </p>
              <a
                href="mailto:studio@futurus.it"
                className="mt-3 inline-block border-b border-charcoal-900/30 pb-[2px] transition-colors duration-300 hover:border-charcoal-900"
              >
                studio@futurus.it
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
                Residency
              </p>
              <a
                href="mailto:residency@futurus.it"
                className="mt-3 inline-block border-b border-charcoal-900/30 pb-[2px] transition-colors duration-300 hover:border-charcoal-900"
              >
                residency@futurus.it
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
