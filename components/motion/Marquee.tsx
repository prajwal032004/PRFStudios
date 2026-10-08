"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Endless ticker whose speed and direction react to scroll velocity.
export default function Marquee({
  items,
  speed = 40,
  className = "",
  separator = "✦",
}: {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: speed, repeat: -1 });
      let direction = 1;
      const st = ScrollTrigger.create({
        onUpdate(self) {
          if (self.direction !== direction) direction = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to(loop, { timeScale: direction * (1 + boost), duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.3, overwrite: false });
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 md:px-10">{t}</span>
          <span className="text-gold-ink">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div data-track className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
