"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// A framed photo that stays pinned while it opens from a small rounded window to full-bleed,
// then a caption rises in. Pinning is CSS sticky (smooth with Lenis); GSAP only scrubs.
export default function ExpandingImage({
  src,
  alt,
  eyebrow,
  caption,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  caption: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const phone = window.matchMedia("(max-width: 767px)").matches;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: phone ? 0.4 : true },
        });
        tl.fromTo(
          "[data-xi-frame]",
          { clipPath: phone ? "inset(14% 8% 14% 8% round 24px)" : "inset(16% 24% 16% 24% round 32px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
          0,
        )
          .fromTo("[data-xi-img]", { scale: 1.3 }, { scale: 1, duration: 1 }, 0)
          .fromTo("[data-xi-shade]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6)
          .fromTo("[data-xi-copy] > *", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.3 }, 0.7);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-xi-shade]", { opacity: 1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[170svh] bg-ivory md:h-[210svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div data-xi-frame className="absolute inset-0 overflow-hidden will-change-[clip-path]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-xi-img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover will-change-transform" />
          <div data-xi-shade className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/30 to-transparent opacity-0" />
        </div>
        <div className="container-x absolute inset-x-0 bottom-0 pb-[max(3rem,env(safe-area-inset-bottom))] md:pb-20">
          <div data-xi-copy className="max-w-3xl text-white">
            <p className="eyebrow text-champagne">{eyebrow}</p>
            <p className="display mt-4">{caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
