"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { philosophy } from "@/lib/content";
import { CrownWatermark, PetalDrift } from "./EmblemArt";

const statement = ["Story first.", "Technology enabled.", "Professionally executed."];

export default function Philosophy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-ph-line]");
        const items = gsap.utils.toArray<HTMLElement>("[data-ph-item]");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });
        gsap.set(lines, { opacity: 0.14 });
        gsap.set(items, { autoAlpha: 0, y: 30 });
        lines.forEach((line, i) => {
          tl.to(line, { opacity: 1, duration: 1 }, i * 1.2).to(
            items.slice(i === 0 ? 0 : i === 1 ? 2 : 4, i === 0 ? 2 : i === 1 ? 4 : 5),
            { autoAlpha: 1, y: 0, stagger: 0.25, duration: 0.8, ease: "power2.out" },
            i * 1.2 + 0.2,
          );
        });
        tl.to("[data-ph-bar]", { scaleY: 1, duration: tl.duration() }, 0);
      });
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: root.current, start: "top 75%", once: true };
        gsap.from("[data-ph-line]", { yPercent: 40, autoAlpha: 0, stagger: 0.12, duration: 1, scrollTrigger: trigger });
        gsap.from("[data-ph-item]", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.9,
          scrollTrigger: { trigger: "[data-ph-list]", start: "top 85%", once: true },
        });
        gsap.fromTo(
          "[data-ph-bar]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 0.3 } },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-ph-bar]", { scaleY: 1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="glow-gold relative isolate overflow-hidden bg-midnight text-white" aria-labelledby="ph-title">
      <CrownWatermark className="-bottom-[18%] -left-[14%] w-[80vw] max-w-[820px] md:w-[46vw]" />
      <PetalDrift count={6} />
      <div className="container-x grid gap-12 py-20 md:py-28 lg:min-h-[100svh] lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="relative flex gap-6 md:gap-8">
          <div aria-hidden="true" className="relative w-px shrink-0 bg-white/10">
            <div data-ph-bar className="absolute inset-0 origin-top scale-y-0 bg-gold" />
          </div>
          <div>
            <p data-reveal="fade" className="eyebrow text-champagne">
              Creative philosophy
            </p>
            <h2 id="ph-title" className="display mt-5 lg:mt-6">
              {statement.map((s, i) => (
                <span key={s} data-ph-line className={`block ${i === 2 ? "accent" : ""}`}>
                  {s}
                </span>
              ))}
            </h2>
            <p data-reveal className="mt-8 max-w-md text-[17px] leading-relaxed text-white/60 md:text-lg">
              Stories don&apos;t just need to be told. They need to be produced.
            </p>
          </div>
        </div>

        <ol data-ph-list className="border-y border-white/10">
          {philosophy.map((p, i) => (
            <li key={p.title} data-ph-item className="flex gap-5 border-t border-white/10 py-5 first:border-t-0 md:py-6">
              <span className="plex-label w-7 shrink-0 pt-1 text-[12px] text-champagne">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-serif text-[21px] font-normal tracking-[-0.01em] md:text-[23px]">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
