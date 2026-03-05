"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "whud",
    name: "标准版 WHUD",
    nameEn: "Standard WHUD",
    description:
      "全球首款真正可取代传统仪表的WHUD产品，可投射导航、辅助驾驶、城市NOA等关键信息，已成功搭载于多款量产车型。",
    features: ["替代传统仪表", "导航信息投射", "辅助驾驶显示", "已量产落地"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconGradient: "from-cyan-400 to-blue-500",
    number: "01",
  },
  {
    id: "arhud",
    name: "全场景 AR HUD",
    nameEn: "Full-Scene AR HUD",
    description:
      "通过增强现实技术，将导航诱导信息直接投射到路面上，与真实道路融合的虚拟箭头指引车辆前进，提供夜视系统、碰撞预警等服务。",
    features: ["AR导航融合", "夜视系统", "碰撞预警", "车道保持"],
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconGradient: "from-blue-400 to-indigo-500",
    number: "02",
  },
  {
    id: "lightfield",
    name: "光场 AR HUD",
    nameEn: "Light Field AR HUD",
    description:
      "采用光场显示技术，实现虚像从4米到无穷远的连续变焦，三维虚像显示器具备光学纵深感和空间感，真正实现AR融合效果。",
    features: ["光场技术", "连续变焦", "三维显示", "真AR融合"],
    gradient: "from-indigo-500/20 to-purple-500/20",
    iconGradient: "from-indigo-400 to-purple-500",
    number: "03",
  },
  {
    id: "fullwindshield",
    name: "全挡风玻璃显示",
    nameEn: "Full Windshield Display",
    description:
      "全球唯一的全车窗显示解决方案，将整块挡风玻璃变成智能显示屏，曾荣获CES创新大奖，代表未来显示技术的终极形态。",
    features: ["全球唯一方案", "CES创新大奖", "全车窗显示", "终极形态"],
    gradient: "from-purple-500/20 to-pink-500/20",
    iconGradient: "from-purple-400 to-pink-500",
    number: "04",
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Header animation
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
          toggleActions: "play none none reverse",
        },
      }
    );

    // Card animations
    const cards = cardsRef.current?.querySelectorAll(".product-card");
    cards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Feature tags stagger
    cards?.forEach((card) => {
      const tags = card.querySelectorAll(".feature-tag");
      gsap.fromTo(
        tags,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse",
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
      id="products"
      ref={sectionRef}
      className="relative py-32 bg-primary overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] rounded-full bg-accent-blue/5 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20 opacity-0">
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            产品<span className="text-gradient">矩阵</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            从概念到量产，提供全栈HUD解决方案，覆盖标准WHUD到全挡风玻璃显示的完整产品线
          </p>
        </div>

        {/* Product Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card group relative rounded-2xl bg-gradient-to-br ${product.gradient} p-[1px] opacity-0`}
            >
              <div className="relative rounded-2xl bg-primary/90 p-8 lg:p-10 h-full overflow-hidden">
                {/* Number */}
                <span className="absolute top-6 right-8 text-6xl font-bold text-white/[0.03] select-none">
                  {product.number}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.iconGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-white/30 text-sm tracking-wider">
                    {product.nameEn}
                  </p>
                </div>

                <p className="text-white/50 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="feature-tag px-3 py-1 rounded-full text-xs text-white/60 bg-white/5 border border-white/5"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-accent/50">
                  <svg
                    className="w-4 h-4 text-accent transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-t from-accent/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
