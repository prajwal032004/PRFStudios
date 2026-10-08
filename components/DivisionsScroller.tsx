"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { divisions, photos } from "@/lib/content";
import Icon from "./Icon";

// Desktop: the section pins and the four divisions travel sideways with scroll.
// Mobile / reduced motion: a plain vertical stack.
export default function DivisionsScroller() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>("[data-h-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-h-card] img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest("[data-h-card]"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
        gsap.to("[data-h-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="divisions-title" className="glow-gold relative overflow-hidden bg-midnight text-white">
      <div className="flex min-h-screen flex-col justify-center py-24 lg:py-0">
        <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="lg:max-w-[50%]">
            <p data-reveal="fade" className="eyebrow text-champagne">
              Divisions
            </p>
            <h2 id="divisions-title" data-split className="heading-lg mt-4">
              One platform, <span className="accent">four specialist teams.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-md text-lg text-white/60">
            Each division has its own focus. Together they take a project from first idea to final release.
          </p>
        </div>

        <div data-h-track className="mt-14 flex flex-col gap-6 px-[var(--gutter)] lg:w-max lg:flex-row lg:gap-8">
          {divisions.map((d, i) => (
            <Link
              key={d.slug}
              href={`/divisions/${d.slug}/`}
              data-h-card
              data-cursor="Explore"
              className="group relative block w-full shrink-0 overflow-hidden rounded-[8px] bg-carbon ring-1 ring-white/10 lg:w-[38vw]"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos[d.photo].src}
                  alt={photos[d.photo].alt}
                  loading="lazy"
                  className="h-full w-full scale-[1.18] object-cover opacity-75 transition-opacity duration-700 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent" />
                <span className="absolute left-6 top-6 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                  {String(i + 1).padStart(2, "0")} / {String(divisions.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative -mt-16 p-6 md:p-8">
                <p className="plex-label text-champagne">{d.label}</p>
                <h3 className="mt-2 text-[30px] font-serif font-normal tracking-[-0.02em]">{d.name}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">{d.summary}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                  Explore {d.name}
                  <Icon name="arrow" size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="container-x mt-12 hidden lg:block">
          <div className="h-px w-full bg-white/10">
            <div data-h-progress className="h-px origin-left scale-x-0 bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
