"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { slate } from "@/lib/content";

export default function SlateCards() {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const cleanups = gsap.utils.toArray<HTMLElement>("[data-slate-card]").map((card) => {
        const inner = card.querySelector<HTMLElement>("[data-slate-inner]")!;
        const sheen = card.querySelector<HTMLElement>("[data-slate-sheen]")!;
        gsap.set(inner, { transformPerspective: 900, transformStyle: "preserve-3d" });
        const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });
        const sx = gsap.quickTo(sheen, "xPercent", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * 10);
          rx(-py * 10);
          sx(px * 120);
        };
        const enter = () => gsap.to(sheen, { autoAlpha: 1, duration: 0.4 });
        const leave = () => {
          rx(0);
          ry(0);
          gsap.to(sheen, { autoAlpha: 0, duration: 0.5 });
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerenter", enter);
        card.addEventListener("pointerleave", leave);
        return () => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerenter", enter);
          card.removeEventListener("pointerleave", leave);
        };
      });
      return () => cleanups.forEach((c) => c());
    },
    { scope: root },
  );

  return (
    <ul ref={root} data-stagger="0.1" className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4 xl:gap-5">
      {slate.map((p, i) => {
        const live = p.stage === "In production";
        return (
          <li key={p.code} data-slate-card>
            <div
              data-slate-inner
              className="grain relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[8px] bg-gradient-to-br from-[#2e2418] via-[#16110c] to-[#0b0906] p-4 text-white ring-1 ring-white/10 md:p-6"
            >
              <div
                data-slate-sheen
                aria-hidden="true"
                className="pointer-events-none invisible absolute -inset-y-10 left-1/4 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-champagne/15 to-transparent opacity-0"
              />
              <div className="relative flex flex-col items-start gap-2 md:flex-row md:justify-between">
                <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 md:text-[11px]">Videa Films</span>
                <span
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] md:text-[11px] ${live ? "bg-gold text-midnight" : "bg-white/10 text-white/75"
                    }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse bg-midnight" : "bg-champagne"}`} />
                  {p.stage}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="text-outline pointer-events-none absolute -bottom-6 -right-2 select-none font-serif text-[clamp(120px,24vw,220px)] font-light leading-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <p className="font-serif text-[22px] font-light leading-tight tracking-[-0.01em] md:text-[28px]">{p.code}</p>
                <div className="mt-3 h-px w-10 bg-gold" />
                <p className="mt-3 text-[12px] leading-snug text-white/50 md:text-[13px]">Title to be announced</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
