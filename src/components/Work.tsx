import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Project {
  no: string;
  codename: string;
  kind: string;
  years: string;
  lede: string;
  detail: string;
  image: string;
}

const projects: Project[] = [
  {
    no: '01',
    codename: 'Meridian 02',
    kind: 'Perception Instrument',
    years: '2024 — 2026',
    lede:
      'A self-contained perception module for autonomous ground vehicles. Twelve synchronous cameras, radar, and a 40 TOPS compute island — in a housing the size of a paperback.',
    detail:
      'Deployed with three OEM partners across mining, port logistics, and precision agriculture. 47.2% reduction in perception downtime compared to incumbent stacks.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80',
  },
  {
    no: '02',
    codename: 'Arroyo',
    kind: 'Edge Inference Runtime',
    years: '2023 — ongoing',
    lede:
      'The runtime that sits under Meridian, Vesper, and four customer programs. Deterministic scheduler, typed IPC, and a compiler that takes PyTorch graphs straight to bare metal.',
    detail:
      'Open source in part; the scheduler kernel ships under the Futurus Research License to seventeen institutions.',
    image:
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=2000&q=80',
  },
  {
    no: '03',
    codename: 'Vesper',
    kind: 'Low-Power Observer',
    years: '2025 — 2027',
    lede:
      'A 2.1-watt environmental observer for remote installations — glaciers, sea-floor cables, old-growth forests. It runs for eleven months on a single charge.',
    detail:
      'Currently in field trials with the Nordvest Polar Institute and two national meteorology agencies.',
    image:
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=2000&q=80',
  },
];

interface ProjectRowProps {
  project: Project;
  flip: boolean;
}

function ProjectRow({ project, flip }: ProjectRowProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Image drifts slower than its container — each project reveals like a
  // deep well instead of a flat crop.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.02, 1.08]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-charcoal-900/10 py-20 first:border-t-0 first:pt-0"
    >
      <div
        className={`grid grid-cols-12 gap-6 md:gap-10 ${
          flip ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div className={`col-span-12 md:col-span-7 ${flip ? 'md:col-start-6' : ''}`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-charcoal-900/90 md:aspect-[5/6]">
            <motion.img
              src={project.image}
              alt={`${project.codename} — ${project.kind}`}
              style={{ y: imageY, scale: imageScale }}
              className="absolute inset-0 h-full w-full object-cover opacity-95 will-change-transform"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0)_55%,rgba(20,18,16,0.38)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-label-wide text-cream-100/85">
                {project.codename}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-label-wide text-cream-100/65">
                {project.years}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`col-span-12 flex flex-col justify-between md:col-span-4 ${
            flip ? 'md:col-start-2 md:row-start-1' : 'md:col-start-9'
          }`}
        >
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] uppercase tracking-label-wide text-warmgray-500">
                {project.no}
              </span>
              <span className="h-px flex-1 bg-charcoal-900/15" />
            </div>
            <h3 className="mt-6 font-display text-[clamp(2rem,3.2vw,3.25rem)] font-light leading-[1] tracking-display-tight">
              {project.codename}
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
              {project.kind}
            </p>
            <p className="mt-8 max-w-[42ch] font-sans text-[14px] leading-relaxed text-charcoal-900/80">
              {project.lede}
            </p>
          </div>
          <p className="mt-10 max-w-[40ch] font-sans text-[13px] italic leading-relaxed text-warmgray-600">
            {project.detail}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative bg-cream-50 py-32 md:py-44">
      <div className="mx-auto max-w-[1680px] px-6 md:px-10">
        <div className="mb-24 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-label-wide text-warmgray-500">
              § Work &nbsp;·&nbsp; Selected programs, 2023 — 2026
            </p>
            <h2 className="mt-8 font-display text-[clamp(2.6rem,7vw,6rem)] font-light leading-[0.9] tracking-display-tight">
              Three instruments,
              <br />
              <span className="italic text-warmgray-600">built quietly.</span>
            </h2>
          </div>
          <p className="col-span-12 max-w-[46ch] self-end font-sans text-[14px] leading-relaxed text-charcoal-900/70 md:col-span-5">
            The studio releases one major instrument per year. We prefer a narrow
            catalogue held for a decade over a wide one replaced every quarter.
          </p>
        </div>

        <ul className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectRow key={p.no} project={p} flip={i % 2 === 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
