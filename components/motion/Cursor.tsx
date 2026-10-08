"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// A soft follower that expands into a label over anything marked data-cursor="View".
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let active: string | null = null;

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const text = target?.dataset.cursor ?? null;
      if (text !== active) {
        active = text;
        if (text && label.current) label.current.textContent = text;
        gsap.to(el, { autoAlpha: text ? 1 : 0, scale: text ? 1 : 0.3, duration: 0.4, ease: "expo.out", overwrite: "auto" });
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] flex h-24 w-24 items-center justify-center rounded-full bg-gold text-sm font-medium text-midnight opacity-0 shadow-[0_10px_40px_rgba(198,163,110,0.4)]"
    >
      <span ref={label}>View</span>
    </div>
  );
}
