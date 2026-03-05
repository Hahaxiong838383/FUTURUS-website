"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    city: "北京",
    cityEn: "Beijing",
    type: "总部",
    detail: "研发中心与总部办公室",
  },
  {
    city: "重庆",
    cityEn: "Chongqing",
    type: "生产基地",
    detail: "智能显示技术生产基地",
  },
  {
    city: "上海",
    cityEn: "Shanghai",
    type: "研发中心",
    detail: "光学与算法研发中心",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);

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

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
      }
    );

    const officeItems = officesRef.current?.querySelectorAll(".office-card");
    officeItems?.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: officesRef.current, start: "top 80%" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 bg-primary overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <span className="text-accent text-sm tracking-[0.3em] uppercase mb-4 block">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            联系<span className="text-gradient">我们</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            期待与您共同探索未来显示技术的无限可能
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="opacity-0">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">获取解决方案</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/40 text-sm mb-2 block">姓名</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-accent/50 focus:outline-none transition-colors duration-300"
                      placeholder="您的姓名"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-sm mb-2 block">公司</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-accent/50 focus:outline-none transition-colors duration-300"
                      placeholder="公司名称"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-sm mb-2 block">邮箱</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-accent/50 focus:outline-none transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-sm mb-2 block">需求描述</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-accent/50 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="请描述您的项目需求..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-accent to-accent-blue text-primary font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-500"
                >
                  提交咨询
                </button>
              </form>
            </div>
          </div>

          {/* Offices */}
          <div>
            <div ref={officesRef} className="space-y-4 mb-8">
              {offices.map((office, i) => (
                <div
                  key={i}
                  className="office-card group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all duration-500 opacity-0"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-bold text-lg group-hover:text-accent transition-colors duration-300">
                          {office.city}
                        </h4>
                        <span className="text-white/30 text-sm">{office.cityEn}</span>
                      </div>
                      <p className="text-accent/60 text-sm mb-1">{office.type}</p>
                      <p className="text-white/40 text-sm">{office.detail}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm">info@futurus.co</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-white/60 text-sm">www.futurus.co</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
