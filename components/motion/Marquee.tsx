"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import Icon from "@/components/Icon";

// Endless ticker whose speed and direction react to scroll velocity. It pauses while hovered and has
// a pause button, since content that moves for more than five seconds must be stoppable (WCAG 2.2.2).
export default function Marquee({
  items,
  speed = 40,
  className = "",
  separator = "✦",
  dark = false,
}: {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
  dark?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const held = useRef({ paused: false, hover: false, onScreen: true });
  const [paused, setPaused] = useState(false);

  // Runs only when the strip is on screen, not hovered and not paused by the visitor.
  const sync = () => {
    const h = held.current;
    if (h.onScreen && !h.hover && !h.paused) loopRef.current?.resume();
    else loopRef.current?.pause();
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = root.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: speed, repeat: -1, force3D: true });
      loopRef.current = loop;
      sync();

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
        held.current.onScreen = entry.isIntersecting;
        sync();
        if (entry.isIntersecting) gsap.ticker.add(tick);
        else gsap.ticker.remove(tick);
      });
      visible.observe(root.current!);

      return () => {
        loopRef.current = null;
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
    <div
      ref={root}
      onPointerEnter={() => ((held.current.hover = true), sync())}
      onPointerLeave={() => ((held.current.hover = false), sync())}
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
    >
      <div data-track className="flex w-max will-change-transform">
        {row(false)}
        {row(true)}
      </div>
      <button
        type="button"
        onClick={() => {
          held.current.paused = !paused;
          setPaused(!paused);
          sync();
        }}
        aria-pressed={paused}
        aria-label={paused ? "Play scrolling text" : "Pause scrolling text"}
        className={`absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full font-sans ring-1 backdrop-blur transition-colors motion-reduce:hidden md:right-4 ${
          dark ? "bg-midnight/80 text-white ring-white/20 hover:bg-white/10" : "bg-ivory/90 text-carbon ring-ash hover:bg-sand"
        }`}
      >
        {paused ? (
          <Icon name="play" size={14} />
        ) : (
          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <rect x="2" y="1.5" width="2.6" height="9" rx="0.6" />
            <rect x="7.4" y="1.5" width="2.6" height="9" rx="0.6" />
          </svg>
        )}
      </button>
    </div>
  );
}
