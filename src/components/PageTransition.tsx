"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(overlayRef.current, {
      scaleY: 0,
      duration: 0.8,
      ease: "power4.inOut",
      transformOrigin: "top",
      delay: 0.2,
    });

    tl.set(overlayRef.current, { display: "none" });
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-primary flex items-center justify-center"
    >
      <div className="text-center">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent-blue flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-xl">F</span>
        </div>
        <p className="text-white/40 text-sm tracking-[0.3em]">FUTURUS</p>
      </div>
    </div>
  );
}
