"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { initMotion } from "@/components/motion/initMotion";

declare global {
  interface Window {
    __motionBooted?: boolean;
  }
}

// True only for the very first page rendered in this browser tab.
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [isFirst] = useState(() => firstLoad);

  useGSAP(
    (_ctx, contextSafe) => {
      firstLoad = false;
      window.__motionBooted = true;
      const curtain = root.current?.querySelector<HTMLElement>("[data-curtain]");

      if (prefersReducedMotion()) {
        document.documentElement.classList.remove("js-motion");
        if (curtain) curtain.style.display = "none";
        return;
      }

      if (!isFirst && !window.location.hash) getLenis()?.scrollTo(0, { immediate: true, force: true });

      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      let loadDelay = 0.35;

      if (curtain && isFirst) {
        const counter = curtain.querySelector<HTMLElement>("[data-count]");
        const progress = { v: 0 };
        tl.from(curtain.querySelectorAll("[data-pre]"), { autoAlpha: 0, y: 24, stagger: 0.08, duration: 0.8, ease: "expo.out" })
          .to(
            progress,
            {
              v: 100,
              duration: 1.1,
              ease: "power2.inOut",
              onUpdate: () => {
                if (counter) counter.textContent = String(Math.round(progress.v)).padStart(3, "0");
              },
            },
            0.1,
          )
          .fromTo(curtain.querySelector("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0.1)
          .to(curtain.querySelectorAll("[data-pre]"), { autoAlpha: 0, y: -20, stagger: 0.04, duration: 0.5, ease: "power2.in" })
          .to(curtain, { yPercent: -100, duration: 1.1 }, "-=0.15")
          .set(curtain, { display: "none" });
        loadDelay = 1.75;
      } else if (curtain) {
        tl.fromTo(curtain, { yPercent: 0 }, { yPercent: -100, duration: 0.9, delay: 0.05 })
          .from(curtain.querySelector("[data-mark]"), { autoAlpha: 0, scale: 0.8, duration: 0.4, ease: "power2.out" }, 0)
          .set(curtain, { display: "none" });
      }

      const start = contextSafe!(() => {
        if (root.current) initMotion(root.current, { loadDelay });
        requestAnimationFrame(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
      });

      // SplitText must measure the real webfont, not the fallback.
      if (document.fonts && document.fonts.status !== "loaded") document.fonts.ready.then(start);
      else start();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {isFirst ? (
        <div
          data-curtain
          aria-hidden="true"
          className="curtain fixed inset-0 z-[100] flex-col items-center justify-center bg-midnight text-white"
        >
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-pre src="/brand/emblem.webp" alt="" width={72} height={72} className="h-[72px] w-auto" />
            <p data-pre className="mt-6 font-serif text-[30px] font-light uppercase tracking-[0.16em] text-champagne">
              PRF Studios
            </p>
            <p data-pre className="eyebrow mt-2 max-w-[22rem] px-6 text-center text-white/50 md:max-w-none">
              Stories · Music · Technology · Production
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-[max(2.5rem,env(safe-area-inset-bottom))] mx-auto flex w-[min(420px,80vw)] items-center gap-4">
            <div className="h-px flex-1 bg-white/15">
              <div data-bar className="h-px origin-left bg-gold" />
            </div>
            <span data-count className="plex-label w-10 text-right text-sm tabular-nums text-white/60">
              000
            </span>
          </div>
        </div>
      ) : (
        <div
          data-curtain
          aria-hidden="true"
          className="curtain fixed inset-0 z-[100] items-center justify-center bg-midnight"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-mark src="/brand/emblem.webp" alt="" width={56} height={56} className="h-14 w-auto" />
        </div>
      )}
      {children}
    </div>
  );
}
