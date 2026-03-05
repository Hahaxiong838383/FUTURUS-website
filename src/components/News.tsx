"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const newsItems = [
  {
    date: "2025.01",
    category: "产品动态",
    title: "光场AR HUD量产落地，搭载新势力领先品牌",
    summary: "FUTURUS光场ARHUD产品正式在中国某新势力领先品牌上量产落地，标志着光场显示技术从概念走向量产的重要里程碑。",
  },
  {
    date: "2024.09",
    category: "行业展会",
    title: "FUTURUS携创新产品亮相2024法兰克福电动汽车博览会",
    summary: "携光场ARHUD、全场景ARHUD、全场景WHUD、标准版WHUD等多款车载创新产品亮相国际舞台。",
  },
  {
    date: "2024.06",
    category: "市场成就",
    title: "2023年度HUD市场份额报告发布",
    summary: "FUTURUS抢占10.6%国内HUD市场份额，在30万以上区间车型中位居中国市场第一。",
  },
  {
    date: "2024.03",
    category: "技术突破",
    title: "全场景ARHUD HMI系统发布",
    summary: "基于第一性原理重新定义ARHUD产品HMI设计方法，覆盖全部仪表、导航、智能驾驶和车载娱乐场景。",
  },
];

const awards = [
  { year: "2020", name: "CES Innovation Award", detail: "Full-Windshield Display" },
  { year: "2019", name: "CES Asia Award", detail: "Mixed Reality HUD" },
  { year: "2018", name: "CES Innovation Award", detail: "AR HUD" },
  { year: "2016", name: "CES Asia Award", detail: "HUD Technology" },
];

export default function News() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );

    // News cards
    const cards = newsRef.current?.querySelectorAll(".news-card");
    cards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });

    // Awards
    const awardItems = awardsRef.current?.querySelectorAll(".award-item");
    awardItems?.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: awardsRef.current, start: "top 80%" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="news"
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-primary to-[#0a1a30] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 opacity-0">
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            News & Awards
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            新闻<span className="text-gradient">动态</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Cards */}
          <div ref={newsRef} className="lg:col-span-2 space-y-4">
            {newsItems.map((item, i) => (
              <div
                key={i}
                className="news-card group relative p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all duration-500 cursor-pointer opacity-0 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-accent/60 text-sm font-mono">
                      {item.date}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-accent/10 text-accent/70 tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute top-1/2 right-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Awards Sidebar */}
          <div ref={awardsRef}>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                荣誉奖项
              </h3>

              <div className="space-y-4">
                {awards.map((award, i) => (
                  <div
                    key={i}
                    className="award-item group flex items-start gap-4 p-4 rounded-lg hover:bg-white/[0.03] transition-colors duration-300 opacity-0"
                  >
                    <span className="text-accent font-mono text-sm mt-0.5 flex-shrink-0">
                      {award.year}
                    </span>
                    <div>
                      <p className="text-white/80 text-sm font-medium group-hover:text-accent transition-colors duration-300">
                        {award.name}
                      </p>
                      <p className="text-white/30 text-xs mt-0.5">
                        {award.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
