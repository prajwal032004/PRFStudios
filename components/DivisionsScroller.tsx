"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { divisions, photos } from "@/lib/content";
import Icon from "./Icon";
import { CrownWatermark } from "./EmblemArt";

export default function DivisionsScroller() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const track = section.querySelector<HTMLElement>("[data-h-track]")!;
      const progress = section.querySelector<HTMLElement>("[data-h-progress]")!;
      const mm = gsap.matchMedia();
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        const sync = () => {
          const max = track.scrollWidth - track.clientWidth;
          gsap.set(progress, { scaleX: max > 0 ? Math.max(0.08, track.scrollLeft / max) : 1 });
        };
        sync();
        track.addEventListener("scroll", sync, { passive: true });
        window.addEventListener("resize", sync);
        return () => {
          track.removeEventListener("scroll", sync);
          window.removeEventListener("resize", sync);
        };
      });

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(track, { overflow: "visible", width: "max-content", scrollSnapType: "none" });
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-h-card] img").forEach((img) => {
          gsap.set(img, { scale: 1.18 });
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
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="divisions-title" className="glow-gold relative isolate overflow-hidden bg-midnight text-white">
      <CrownWatermark className="-right-[12%] -top-[4%] w-[78vw] max-w-[860px] md:w-[52vw]" />
      {/* Pinned on desktop: svh keeps the pin height stable while mobile browser chrome slides. */}
      <div className="flex flex-col justify-center py-20 md:py-24 lg:min-h-[100svh] lg:py-0">
        <div className="container-x flex flex-col gap-5 md:gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="xl:max-w-[50%]">
            <p data-reveal="fade" className="eyebrow text-champagne">
              Divisions
            </p>
            <h2 id="divisions-title" data-split className="heading-lg mt-4">
              One studio. <span className="accent">Multiple creative divisions.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-md text-[17px] text-white/60 md:text-lg">
            Each division has its own focus. Together they take a project from first idea to final release.
          </p>
        </div>

        <div data-h-track className="swipe-rail mt-10 gap-4 md:mt-12 md:gap-6 lg:mt-14 lg:gap-8">
          {divisions.map((d, i) => (
            <Link
              key={d.slug}
              href={`/divisions/${d.slug}/`}
              data-h-card
              data-cursor="Explore"
              className="group relative flex w-[84vw] max-w-[420px] shrink-0 flex-col overflow-hidden rounded-[8px] bg-carbon ring-1 ring-white/10 sm:w-[62vw] md:w-[44vw] md:max-w-none lg:w-[clamp(340px,calc(145svh-640px),38vw)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/11]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photos[d.photo].src}
                  alt={photos[d.photo].alt}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100 lg:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md md:left-6 md:top-6">
                  {String(i + 1).padStart(2, "0")} / {String(divisions.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative -mt-12 flex flex-1 flex-col p-5 md:-mt-16 md:p-6 xl:p-8">
                <p className="plex-label text-champagne">{d.label}</p>
                <h3 className="mt-2 text-[26px] font-serif font-normal tracking-[-0.02em] md:text-[30px]">{d.name}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">{d.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-white">
                  Explore {d.name}
                  <Icon name="arrow" size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="container-x mt-8 flex items-center gap-5 md:mt-10 lg:mt-12">
          <div className="h-px w-full bg-white/10">
            <div data-h-progress className="h-px origin-left scale-x-0 bg-gold" />
          </div>
          <span aria-hidden="true" className="plex-label flex shrink-0 items-center gap-2 text-[11px] text-white/45 lg:hidden">
            Swipe <Icon name="arrow" size={14} />
          </span>
        </div>
      </div>
    </section>
  );
}
