"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { photos, services } from "@/lib/content";
import Icon from "./Icon";

// Numbered list of the seven stages; on desktop a preview frame trails the pointer.
export default function ServicesIndex() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    gsap.to(preview.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
  };
  const enter = (i: number, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setActive(i);
    gsap.set(preview.current, { x: e.clientX, y: e.clientY });
    gsap.to(preview.current, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" });
  };
  const leave = () => {
    setActive(null);
    gsap.to(preview.current, { autoAlpha: 0, scale: 0.8, duration: 0.35, ease: "power2.in" });
  };

  useGSAP(
    () => {
      gsap.set(preview.current, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.8 });
      // Scrolling the list out from under a resting pointer never fires pointerleave.
      ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top", onLeave: leave, onLeaveBack: leave });
    },
    { scope: root },
  );

  return (
    <div ref={root} onPointerMove={move} onPointerLeave={leave} className="relative">
      <ol data-stagger className="border-t border-ash">
        {services.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}/`}
              onPointerEnter={(e) => enter(i, e)}
              className="group grid grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-ash py-6 transition-colors duration-500 md:grid-cols-[80px_1.1fr_1.4fr_auto] md:gap-8 md:py-8"
            >
              <span className="plex-label text-smoke transition-colors group-hover:text-gold-ink">{s.step}</span>
              <span className="text-[24px] font-serif font-normal tracking-[-0.02em] text-carbon transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:text-[34px]">
                {s.name}
              </span>
              <span className="hidden text-[15px] leading-relaxed text-graphite md:block">{s.short}</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ash transition duration-500 group-hover:bg-carbon group-hover:text-white group-hover:ring-carbon">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[220px] w-[320px] overflow-hidden rounded-[8px] shadow-[var(--shadow-card)] lg:block"
      >
        {services.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.slug}
            src={photos[s.photo].sm}
            alt=""
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
    </div>
  );
}
