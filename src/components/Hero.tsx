"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    // Animate title characters
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".char");
      tl.fromTo(
        chars,
        { opacity: 0, y: 80, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
        }
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.1"
    );

    // Continuous scroll indicator animation
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Floating particles
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");
      particles.forEach((p, i) => {
        gsap.to(p, {
          y: `random(-100, 100)`,
          x: `random(-50, 50)`,
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }

    // Parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".hero-bg-layer", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const titleText = "创造人与世界沟通的全新窗口";
  const chars = titleText.split("");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="hero-bg-layer absolute inset-0 bg-gradient-to-br from-primary via-dark-blue to-primary" />

        {/* Animated gradient orbs */}
        <div className="hero-bg-layer absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="hero-bg-layer absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-blue/8 blur-[100px]" />
        <div className="hero-bg-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/3 blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-accent/80 text-sm tracking-wider">
            未来人机交互技术引领者
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          style={{ perspective: "1000px" }}
        >
          <span className="block mb-2 text-lg md:text-2xl font-light text-white/50 tracking-[0.3em]">
            FOR TODAY, TOMORROW AND THE FUTURE
          </span>
          {chars.map((char, i) => (
            <span
              key={i}
              className="char inline-block opacity-0"
              style={{ display: "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 leading-relaxed"
        >
          FUTURUS 专注汽车显示与人机交互技术，以光场AR
          HUD重新定义驾驶体验，让智能驾驶更安全、更智能
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex items-center justify-center gap-4 opacity-0">
          <a
            href="#products"
            className="group relative px-8 py-3.5 bg-gradient-to-r from-accent to-accent-blue text-primary font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)]"
          >
            <span className="relative z-10">探索产品</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </a>
          <a
            href="#technology"
            className="px-8 py-3.5 border border-white/20 text-white rounded-full hover:border-accent/50 hover:text-accent transition-all duration-300"
          >
            了解技术
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-white/30 text-xs tracking-widest">SCROLL</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-accent" />
        </div>
      </div>

      {/* Decorative side elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="w-0.5 h-8 bg-white/10 rounded-full"
            style={{ opacity: 0.3 - i * 0.1 }}
          />
        ))}
      </div>
    </section>
  );
}
