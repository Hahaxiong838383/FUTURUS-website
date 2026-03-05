"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "产品", href: "#products" },
  { label: "技术", href: "#technology" },
  { label: "关于我们", href: "#about" },
  { label: "新闻", href: "#news" },
  { label: "联系我们", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animation
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );
    tl.fromTo(
      ".nav-item",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      "-=0.3"
    );

    // Scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-xl shadow-lg shadow-black/20 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center gap-3 opacity-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-blue flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-blue opacity-50 blur-md" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-wider">
                FUTURUS
              </span>
              <p className="text-accent/60 text-[10px] tracking-[0.2em] leading-none">
                未来黑科技
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div
            ref={menuItemsRef}
            className="hidden lg:flex items-center gap-8"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`nav-item text-sm tracking-wide transition-all duration-300 animated-underline opacity-0 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-accent"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="nav-item opacity-0 px-5 py-2 rounded-full border border-accent/50 text-accent text-sm hover:bg-accent hover:text-primary transition-all duration-300"
            >
              获取方案
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="mobile-nav-item text-2xl text-white/80 hover:text-accent transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
