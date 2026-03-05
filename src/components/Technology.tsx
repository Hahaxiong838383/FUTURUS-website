"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techAreas = [
  {
    title: "物理与几何光学",
    titleEn: "Physical & Geometric Optics",
    description: "基于第一性原理的光学设计，突破传统HUD的物理极限，实现超大视场角和高画面质量。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "微纳材料与超精密制造",
    titleEn: "Nano Materials & Ultra-Precision",
    description: "自主研发的纳米光学材料和超精密加工技术，保证光学元件的极致精度与一致性。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "自由曲面核心算法",
    titleEn: "Freeform Surface Algorithm",
    description: "独创的自由曲面设计与优化算法，实现复杂光学系统的高效开发和精确控制。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "FUTURUS AR Engine",
    titleEn: "AR Rendering Engine",
    description: "历时5年优化迭代的AR实时渲染引擎AR Kernel，实现虚拟信息与真实世界的完美融合。",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      }
    );

    // Central visual - parallax
    gsap.fromTo(
      visualRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 80%",
        },
      }
    );

    // Parallax movement on scroll
    gsap.to(visualRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Tech cards with stagger
    const cards = cardsContainerRef.current?.querySelectorAll(".tech-card");
    cards?.forEach((card, i) => {
      const direction = i % 2 === 0 ? -60 : 60;
      gsap.fromTo(
        card,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    // Animated connection lines
    const lines = document.querySelectorAll(".tech-line");
    lines.forEach((line) => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line,
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
      id="technology"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-primary via-[#0a1a30] to-primary overflow-hidden"
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Animated gradient lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 opacity-0">
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            Core Technology
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            核心<span className="text-gradient">技术</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            研发创新覆盖光学显示与人机交互技术的全链路，拥有500+项技术专利
          </p>
        </div>

        {/* Central Visual with rotating rings */}
        <div ref={visualRef} className="relative flex justify-center mb-20 opacity-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-accent/10 animate-[spin_20s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent/50" />
            </div>
            {/* Middle ring */}
            <div className="absolute inset-6 rounded-full border border-accent-blue/15 animate-[spin_15s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-accent-blue/50" />
            </div>
            {/* Inner ring */}
            <div className="absolute inset-12 rounded-full border border-accent/20 animate-[spin_10s_linear_infinite]">
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/60" />
            </div>
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent-blue/20 backdrop-blur-xl flex items-center justify-center animate-pulse-glow">
                <span className="text-accent font-bold text-sm tracking-wider">500+</span>
              </div>
            </div>
            {/* Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white/30 text-sm">技术专利</p>
            </div>
          </div>
        </div>

        {/* Tech Cards */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techAreas.map((tech, i) => (
            <div key={i} className="tech-card group opacity-0">
              <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all duration-500 overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    {tech.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                      {tech.title}
                    </h3>
                    <p className="text-white/30 text-xs tracking-wider mb-3">
                      {tech.titleEn}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>

                {/* Connection line decoration */}
                <div className="tech-line absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
