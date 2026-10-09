"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/lib/content";

// The current slate. Bombay Dada leads as the featured card; on fine pointers every card
// tilts towards the cursor with a moving sheen.
export default function SlateCards() {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const cleanups = gsap.utils.toArray<HTMLElement>("[data-slate-card]").map((card) => {
        const inner = card.querySelector<HTMLElement>("[data-slate-inner]")!;
        const sheen = card.querySelector<HTMLElement>("[data-slate-sheen]")!;
        const tilt = card.dataset.featured ? 5 : 9;
        gsap.set(inner, { transformPerspective: 1000, transformStyle: "preserve-3d" });
        const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });
        const sx = gsap.quickTo(sheen, "xPercent", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * tilt);
          rx(-py * tilt);
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

  const [featured, ...rest] = projects;

  return (
    <ul ref={root} data-stagger="0.1" className="grid gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-4 xl:gap-5">
      <li data-slate-card data-featured="true" className="sm:col-span-2 xl:row-span-2">
        <article
          data-slate-inner
          className="grain relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[8px] bg-gradient-to-br from-[#3d2e1c] via-[#17120c] to-[#0b0906] p-6 text-white ring-1 ring-white/10 md:min-h-[520px] md:p-9"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-[90px]" />
          <Sheen />
          <div className="relative flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-midnight">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-midnight" />
              {featured.flag}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">Videa Films · {featured.kind}</span>
          </div>
          <span
            aria-hidden="true"
            className="text-outline pointer-events-none absolute -bottom-10 -right-4 select-none font-serif text-[clamp(180px,34vw,360px)] font-light leading-none"
          >
            01
          </span>
          <div className="relative max-w-xl">
            <p className="plex-label text-champagne">{featured.credits}</p>
            <h3 className="mt-3 font-serif text-[clamp(48px,9vw,104px)] font-light leading-[0.95] tracking-[-0.03em]">{featured.title}</h3>
            <p className="mt-4 text-[13px] font-medium uppercase tracking-[0.16em] text-white/60">{featured.genre}</p>
            <div className="mt-5 h-px w-12 bg-gold" />
            <p className="mt-5 text-[15px] leading-relaxed text-white/70 md:text-[16px]">{featured.text}</p>
          </div>
        </article>
      </li>

      {rest.map((p, i) => (
        <li key={p.slug} data-slate-card>
          <article
            data-slate-inner
            className="grain relative flex h-full min-h-[200px] flex-col justify-between md:min-h-[260px] overflow-hidden rounded-[8px] bg-gradient-to-br from-[#2e2418] via-[#16110c] to-[#0b0906] p-5 text-white ring-1 ring-white/10 md:p-6"
          >
            <Sheen />
            <div className="relative flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/80 md:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                {p.kind}
              </span>
              {p.languages && <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">{p.languages}</span>}
            </div>
            <span
              aria-hidden="true"
              className="text-outline pointer-events-none absolute -bottom-6 -right-2 select-none font-serif text-[clamp(110px,18vw,170px)] font-light leading-none"
            >
              {String(i + 2).padStart(2, "0")}
            </span>
            <div className="relative mt-10">
              <h3 className="font-serif text-[26px] font-light leading-[1.05] tracking-[-0.01em] md:text-[30px]">{p.title}</h3>
              {p.subtitle && <p className="mt-1 font-serif text-[17px] italic text-champagne">{p.subtitle}</p>}
              <div className="mt-4 h-px w-10 bg-gold" />
              <p className="mt-3 text-[14px] leading-relaxed text-white/60">{p.text}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

function Sheen() {
  return (
    <div
      data-slate-sheen
      aria-hidden="true"
      className="pointer-events-none invisible absolute -inset-y-10 left-1/4 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-champagne/15 to-transparent opacity-0"
    />
  );
}
