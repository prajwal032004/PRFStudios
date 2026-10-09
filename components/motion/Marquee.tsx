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
      const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: speed, repeat: -1, force3D: true });

      // One eased value per frame instead of spawning tweens on every scroll event:
      // velocity sets a target, the ticker glides timeScale towards it and back to cruise.
      let direction = 1;
      let boost = 0;
      let current = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          direction = self.direction;
          boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 400, 5));
        },
      });
      const tick = (_t: number, dt: number) => {
        const f = Math.min(dt / 16.67, 3); // frame-rate independent
        boost *= Math.pow(0.92, f);
        const target = direction * (1 + boost);
        current += (target - current) * (1 - Math.pow(0.88, f));
        loop.timeScale(current);
      };
      // Only spend frames while the strip is on screen.
      const visible = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          loop.resume();
          gsap.ticker.add(tick);
        } else {
          loop.pause();
          gsap.ticker.remove(tick);
        }
      });
      visible.observe(root.current!);

      return () => {
        visible.disconnect();
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-5 md:px-8 xl:px-10">{t}</span>
          <span className="text-gold-ink">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div data-track className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
