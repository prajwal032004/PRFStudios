"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Icon, { type IconName } from "./Icon";
import { PalmCrown } from "./EmblemArt";

export type Pillar = { label: string; title: string; text: string; icon: IconName; points: string[] };

// Cards stick and stack as you scroll; each one settles back (scales down, dims) as the
// next arrives over it. Sticky does the pinning, GSAP scrubs the settle.
export default function PillarStack({ pillars }: { pillars: Pillar[] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-pillar]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const inner = card.querySelector<HTMLElement>("[data-pillar-inner]")!;
          const trigger = { trigger: next, start: "top bottom", end: "top 20%", scrub: true };
          gsap.to(inner, { scale: 0.92, ease: "none", transformOrigin: "50% 0%", scrollTrigger: trigger });
          gsap.to(card.querySelector("[data-pillar-dim]"), { opacity: 0.5, ease: "none", scrollTrigger: trigger });
        });
        // Each card's big word rises as the card lands
        cards.forEach((card) => {
          gsap.from(card.querySelector("[data-pillar-word]"), {
            yPercent: 60,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 70%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="relative">
      {pillars.map((p, i) => (
        <li
          key={p.label}
          data-pillar
          className="sticky mb-6 md:mb-10"
          style={{ top: `calc(84px + ${i * 14}px)` }}
        >
          <article
            data-pillar-inner
            className="grain relative isolate flex will-change-transform min-h-[64svh] flex-col overflow-hidden rounded-[10px] bg-midnight p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 md:min-h-[72svh] md:rounded-[14px] md:p-12 lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-16"
          >
            <div aria-hidden="true" data-pillar-dim className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-gold/15 blur-[100px]" />
            <PalmCrown className="pointer-events-none absolute -bottom-16 -right-10 -z-10 h-auto w-[70%] max-w-[560px] text-gold/[0.08]" width={1} />

            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-4">
                <span className="plex-label text-[12px] text-champagne">{String(i + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}</span>
                <span className="h-px w-10 bg-gold/60" />
              </div>
              <p
                data-pillar-word
                className="mt-10 font-serif text-[clamp(64px,17vw,180px)] font-light italic leading-[0.9] tracking-[-0.04em] text-champagne lg:mt-0"
              >
                {p.label}
              </p>
            </div>

            <div className="mt-10 flex flex-col justify-end lg:mt-0">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon name={p.icon} size={22} />
              </span>
              <h3 className="mt-6 font-serif text-[clamp(26px,3vw,40px)] font-normal leading-[1.1] tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/65 md:text-[17px]">{p.text}</p>
              <ul className="mt-7 grid gap-2.5 border-t border-white/10 pt-6 text-[15px] text-white/80">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {pt}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
