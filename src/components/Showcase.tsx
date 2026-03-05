"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    stat: "83.3%",
    description: "用户认为复杂路口导航信息不够明确",
    highlight: "FUTURUS AR HUD 让导航信息与真实道路完美融合",
  },
  {
    stat: "84%",
    description: "用户希望HUD能提升画面清晰度",
    highlight: "光场技术实现4米到无穷远连续变焦",
  },
  {
    stat: "21.48%",
    description: "30万以上车型HUD市场份额",
    highlight: "高端市场中国第一",
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Horizontal scroll-like pinned section
    const section = sectionRef.current;
    if (!section) return;

    // Large text parallax
    gsap.fromTo(
      ".showcase-big-text",
      { x: "10%" },
      {
        x: "-20%",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Cards sequential reveal
    const cards = panelsRef.current?.querySelectorAll(".showcase-card");
    cards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-primary overflow-hidden"
    >
      {/* Large scrolling background text */}
      <div className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
        <span className="showcase-big-text text-[12vw] font-bold text-white/[0.02] tracking-wider">
          FUTURUS — REDEFINE THE FUTURE — FUTURUS — REDEFINE THE FUTURE —
        </span>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div ref={panelsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseItems.map((item, i) => (
            <div
              key={i}
              className="showcase-card group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-accent/20 transition-all duration-700 opacity-0"
            >
              {/* Large stat number */}
              <div className="text-5xl md:text-6xl font-bold text-gradient mb-4">
                {item.stat}
              </div>

              {/* Description */}
              <p className="text-white/40 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Highlight */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-white/70 text-sm font-medium group-hover:text-accent transition-colors duration-300">
                  {item.highlight}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 right-4 w-8 h-px bg-accent/30" />
                <div className="absolute top-4 right-4 w-px h-8 bg-accent/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
