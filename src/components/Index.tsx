import { motion } from 'framer-motion';

const entries = [
  {
    no: '00',
    title: 'Foreword',
    meta: 'Studio',
    body:
      'We build small, serious tools. The studio has ten people, three sites, and an allergy to hype cycles.',
  },
  {
    no: '01',
    title: 'Instruments',
    meta: 'Hardware · Edge AI',
    body:
      'Meridian, Arroyo, Vesper — three product lines for perception, navigation, and low-power inference in the field.',
  },
  {
    no: '02',
    title: 'Foundations',
    meta: 'Systems · Simulation',
    body:
      'Internal runtimes for deterministic robotics, a physics-accurate sim stack, and the data plane that holds it all together.',
  },
  {
    no: '03',
    title: 'Field Notes',
    meta: 'Writing · Research',
    body:
      'We publish long, unhurried pieces on the working engineering of deep technology — one essay per fortnight.',
  },
  {
    no: '04',
    title: 'Residency',
    meta: 'People · Hiring',
    body:
      'A two-year program for engineers and researchers between posts. Four seats open each spring, reviewed in public.',
  },
];

export default function Index() {
  return (
    <section id="index" className="relative border-t border-charcoal-900/10 bg-cream-100 py-32 md:py-40">
      <div className="mx-auto max-w-[1680px] px-6 md:px-10">
        <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[26ch]">
            <p className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
              § Index
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.95] tracking-display-tight">
              Five chapters, <span className="italic text-warmgray-600">one studio.</span>
            </h2>
          </div>
          <p className="max-w-[40ch] font-sans text-[14px] leading-relaxed text-charcoal-900/70">
            The site is organised as a slow journal. Each chapter is a
            self-contained read; together they describe how the studio works,
            what it has shipped, and what it is building next.
          </p>
        </div>

        <ul className="divide-y divide-charcoal-900/10 border-y border-charcoal-900/10">
          {entries.map((entry, i) => (
            <motion.li
              key={entry.no}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.06,
              }}
              className="group grid grid-cols-12 items-baseline gap-6 py-8 md:py-10"
            >
              <span className="col-span-2 font-mono text-[12px] uppercase tracking-label-wide text-warmgray-500 md:col-span-1">
                {entry.no}
              </span>
              <div className="col-span-10 md:col-span-4">
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-tight tracking-display-tight">
                  {entry.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
                  {entry.meta}
                </p>
              </div>
              <p className="col-span-12 max-w-[58ch] font-sans text-[14px] leading-relaxed text-charcoal-900/75 md:col-span-6 md:col-start-7">
                {entry.body}
              </p>
              <span className="col-span-12 mt-4 h-px w-0 bg-charcoal-900/40 transition-[width] duration-[1200ms] ease-editorial group-hover:w-full md:hidden" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
