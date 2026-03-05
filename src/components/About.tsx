"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "技术专利", labelEn: "Patents" },
  { value: 10, suffix: "%+", label: "国内市场份额", labelEn: "Market Share" },
  { value: 50, suffix: "万+", label: "年产能(台)", labelEn: "Annual Capacity" },
  { value: 4, suffix: "项", label: "CES创新大奖", labelEn: "CES Awards" },
];

const milestones = [
  { year: "2016", event: "公司成立", detail: "北京成立，专注汽车显示技术" },
  { year: "2017", event: "首款产品", detail: "首款HUD原型机研发成功" },
  { year: "2018", event: "CES获奖", detail: "首次获得CES创新大奖" },
  { year: "2020", event: "重庆基地", detail: "智能显示生产基地投产" },
  { year: "2023", event: "市场领先", detail: "高端HUD市场份额中国第一" },
  { year: "2025", event: "光场量产", detail: "光场AR HUD量产落地" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  const startCounting = useCallback(() => {
    if (counted.current) return;
    counted.current = true;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: startCounting,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [startCounting]);

  return (
    <span ref={ref} className="counter-number">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

    // Stats
    const statItems = statsRef.current?.querySelectorAll(".stat-item");
    statItems?.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });

    // Timeline items
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
    timelineItems?.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });

    // Timeline line draw
    gsap.fromTo(
      ".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-primary overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-20 opacity-0">
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            About FUTURUS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            关于<span className="text-gradient">我们</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            FUTURUS 未来黑科技成立于2016年，是一家专注于汽车显示技术及人机交互产品研发的高科技公司。
            创始团队由基础研究科学家、互联网专家和汽车行业工程师组成，在光学研究、汽车工程和项目管理方面拥有丰富经验。
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all duration-500 opacity-0"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/70 text-sm mb-1">{stat.label}</p>
              <p className="text-white/30 text-xs">{stat.labelEn}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <h3 className="text-2xl font-bold text-white text-center mb-16">
            发展<span className="text-gradient">历程</span>
          </h3>

          {/* Center line */}
          <div className="absolute left-1/2 top-20 bottom-0 w-px">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-accent/50 to-accent-blue/50 origin-top" />
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <div
                key={i}
                className={`timeline-item relative flex items-center opacity-0 ${
                  i % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent z-10">
                  <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
                </div>

                {/* Content card */}
                <div
                  className={`w-5/12 p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-accent/20 transition-all duration-300 ${
                    i % 2 === 0 ? "mr-auto text-right pr-12" : "ml-auto text-left pl-12"
                  }`}
                >
                  <span className="text-accent font-mono text-sm">
                    {milestone.year}
                  </span>
                  <h4 className="text-white font-bold text-lg mt-1">
                    {milestone.event}
                  </h4>
                  <p className="text-white/40 text-sm mt-1">
                    {milestone.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
