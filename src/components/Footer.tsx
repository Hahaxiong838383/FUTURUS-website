"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#060d1a] py-16 opacity-0">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-white font-bold text-lg tracking-wider">
                FUTURUS
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed">
              为今天、明天和未来，<br />创造人与世界沟通的全新窗口。
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white/70 font-semibold text-sm mb-4 tracking-wider">
              产品
            </h4>
            <ul className="space-y-2">
              {["标准版 WHUD", "全场景 AR HUD", "光场 AR HUD", "全挡风玻璃显示"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#products"
                      className="text-white/30 text-sm hover:text-accent transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/70 font-semibold text-sm mb-4 tracking-wider">
              公司
            </h4>
            <ul className="space-y-2">
              {["关于我们", "核心技术", "新闻动态", "加入我们"].map((item) => (
                <li key={item}>
                  <a
                    href="#about"
                    className="text-white/30 text-sm hover:text-accent transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/70 font-semibold text-sm mb-4 tracking-wider">
              联系方式
            </h4>
            <ul className="space-y-2">
              <li className="text-white/30 text-sm">info@futurus.co</li>
              <li className="text-white/30 text-sm">北京 · 重庆 · 上海</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} FUTURUS Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/20 text-xs hover:text-accent transition-colors duration-300">
              隐私政策
            </a>
            <a href="#" className="text-white/20 text-xs hover:text-accent transition-colors duration-300">
              使用条款
            </a>
            <a href="#" className="text-white/20 text-xs hover:text-accent transition-colors duration-300">
              法律声明
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
