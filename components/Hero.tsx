'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });

  const videoY = useTransform(smooth, [0, 1], ['0%', '14%']);
  const videoScale = useTransform(smooth, [0, 1], [1, 1.09]);
  const maskOpacity = useTransform(smooth, [0, 0.5, 1], [1, 1.15, 1.6]);
  const textY = useTransform(smooth, [0, 1], ['0%', '-28%']);
  const textOpacity = useTransform(smooth, [0, 0.55, 0.85], [1, 0.6, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-cream-100 text-charcoal-900"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 -z-20 h-full w-full will-change-transform"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Layered mask:
          1. Radial ellipse — pushed right (60% x) so the clear video plate
             sits on the right side where the visual focal point is.
          2. Horizontal wash — soft cream on the left third only, gives the
             text column a calm reading surface without a flat scrim.
          3. Vertical wash — subtle top/bottom edge softening. */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: maskOpacity }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 78% 78% at 62% 50%, rgba(245,241,236,0) 0%, rgba(245,241,236,0) 34%, rgba(245,241,236,0.18) 55%, rgba(245,241,236,0.55) 75%, rgba(245,241,236,0.9) 90%, rgba(245,241,236,1) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(245,241,236,0.52) 0%, rgba(245,241,236,0.30) 22%, rgba(245,241,236,0.08) 42%, rgba(245,241,236,0) 60%)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,241,236,0.22)_0%,rgba(245,241,236,0)_22%,rgba(245,241,236,0)_72%,rgba(245,241,236,0.42)_100%)]" />
      </motion.div>

      {/* Top metadata strip — unchanged, sits clear of the content column */}
      <div className="pointer-events-none absolute inset-x-0 top-[84px] z-10 mx-auto flex max-w-[1680px] items-center justify-between px-6 font-mono text-[10px] uppercase tracking-label-wide text-charcoal-900/70 md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          Issue N°07 · Spring 2026
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="hidden md:inline"
        >
          Filed from 47.71° N, 122.32° W
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
          Vol. 001
        </motion.span>
      </div>

      {/* Single-side left column — editorial magazine layout. Title lives in
          the lower-left; the right half of the viewport stays as clean,
          unobstructed video plate. */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative mx-auto flex min-h-[100dvh] max-w-[1680px] flex-col items-start justify-end px-6 pb-32 text-left md:px-10 md:pb-28"
      >
        {/* A thin rule above the title — very editorial, reads as a
            sectional ornament rather than decoration. */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mb-10 flex origin-left items-center gap-5"
        >
          <span className="h-px w-14 bg-charcoal-900/50 md:w-20" />
          <span className="font-mono text-[10px] uppercase tracking-label-wide text-charcoal-900/70">
            § 00 · Foreword
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="max-w-[14ch] font-display text-[clamp(2.8rem,10vw,10.5rem)] font-light leading-[0.92] tracking-display-tight text-charcoal-900"
        >
          <span className="block">Instruments</span>
          <span className="block italic font-light text-charcoal-900/85">
            for the next century.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
          className="mt-10 max-w-[40ch] font-sans text-[12px] leading-relaxed text-charcoal-900/75 md:text-[13px]"
        >
          A research studio at the seam of computation, hardware, and the
          built world — for the serious work of the next thirty years.
        </motion.p>
      </motion.div>

      {/* Scroll cue — bottom-left, aligned with the text column. Horizontal
          hairline replaces the previous centered vertical cue to match the
          new single-side composition. */}
      <motion.a
        href="#index"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 1.25 }}
        className="group absolute bottom-8 left-6 z-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-label-wide text-charcoal-900/70 transition-colors duration-500 hover:text-charcoal-900 md:left-10"
      >
        <motion.span
          animate={{ scaleX: [1, 1.45, 1] }}
          transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
          className="block h-px w-10 origin-left bg-charcoal-900/45"
        />
        Scroll · Index
        <span className="text-ochre">00 — 05</span>
      </motion.a>
    </section>
  );
}
