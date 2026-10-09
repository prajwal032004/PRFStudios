"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll, scrollToTarget } from "@/lib/lenis";
import { initMotion } from "@/components/motion/initMotion";
import Logo from "@/components/Logo";

declare global {
  interface Window {
    __motionBooted?: boolean;
  }
}

// True only for the very first page rendered in this browser tab.
let firstLoad = true;

const endPreload = () => document.documentElement.classList.remove("preloading");

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
        endPreload();
        if (curtain) curtain.style.display = "none";
        return;
      }

      if (!isFirst && !window.location.hash) scrollToTarget(0, { immediate: true });

      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      let loadDelay = 0.35;
      let release: (() => void) | undefined;

      const fly = root.current?.querySelector<HTMLElement>("[data-fly-logo]");
      const navLogo = document.querySelector<HTMLElement>('[data-logo="nav"]');

      if (curtain && isFirst && fly && navLogo) {
        // Hold the page still under the preloader so nothing scrolls past unseen.
        release = lockScroll();
        const counter = curtain.querySelector<HTMLElement>("[data-count]");
        const tagline = curtain.querySelector<HTMLElement>("[data-tagline]");
        const parts = fly.querySelectorAll("[data-logo-part]");
        const rule = fly.querySelector("[data-logo-rule]");
        const progress = { v: 0 };

        // FLIP: the flying copy lives exactly where the navbar logo sits (same markup, same size),
        // then is transformed out to a larger centred pose. Flying "home" is just x/y/scale → 0/0/1.
        let pose = { x: 0, y: 0, scale: 1 };
        const anchor = () => {
          const r = navLogo.getBoundingClientRect();
          gsap.set(fly, { left: r.left, top: r.top, transformOrigin: "0 0" });
          return r;
        };
        const centre = () => {
          const r = anchor();
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const scale = Math.min(vw < 768 ? 1.7 : 3, (vw * 0.82) / r.width);
          pose = {
            scale,
            x: vw / 2 - (r.width * scale) / 2 - r.left,
            y: vh / 2 - (r.height * scale) / 2 - r.top - (vw < 768 ? 28 : 40),
          };
          gsap.set(fly, pose);
          if (tagline) gsap.set(tagline, { top: r.top + pose.y + r.height * scale + (vw < 768 ? 22 : 30) });
        };
        centre();
        const onResize = () => centre();
        window.addEventListener("resize", onResize);

        tl.set(fly, { autoAlpha: 1 })
          // Lockup assembles: mark rises, hairline draws, name slides up out of its mask.
          .from(parts[0], { autoAlpha: 0, y: 18, scale: 0.92, duration: 0.9, ease: "expo.out" }, 0.05)
          .from(rule, { scaleY: 0, duration: 0.8, ease: "expo.out" }, 0.25)
          .from([parts[1], parts[2]], { yPercent: 120, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: "expo.out" }, 0.3)
          .from(curtain.querySelectorAll("[data-pre]"), { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.8, ease: "expo.out" }, 0.45)
          .to(
            progress,
            {
              v: 100,
              duration: 1.2,
              ease: "power2.inOut",
              onUpdate: () => {
                if (counter) counter.textContent = String(Math.round(progress.v)).padStart(3, "0");
              },
            },
            0.15,
          )
          .fromTo(curtain.querySelector("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0.15)
          .to(curtain.querySelectorAll("[data-pre]"), { autoAlpha: 0, y: -12, stagger: 0.04, duration: 0.4, ease: "power2.in" }, 1.4)
          .addLabel("fly", 1.65)
          // Re-measure at take-off (webfonts may have shifted the navbar since), keeping the
          // on-screen pose unchanged so there is no jump.
          .add(() => {
            window.removeEventListener("resize", onResize);
            const before = fly.getBoundingClientRect();
            const r = anchor();
            const x = before.left - r.left;
            const y = before.top - r.top;
            gsap.set(fly, { x, y });
            // A lifted arc home: rise first, then glide across into the navbar slot.
            tl.add(
              gsap.to(fly, {
                duration: 1.25,
                ease: "expo.inOut",
                scale: 1,
                motionPath: { path: [{ x, y }, { x: x * 0.78, y: y * 0.18 }, { x: 0, y: 0 }], curviness: 1.2 },
              }),
              "fly",
            );
          }, "fly")
          .add(() => release?.(), "fly+=0.2")
          .to(curtain, { yPercent: -100, duration: 1.15 }, "fly+=0.2")
          // The rest of the navbar settles in around the arriving logo.
          .fromTo(
            document.querySelectorAll("[data-nav-reveal]"),
            { autoAlpha: 0, y: -14 },
            { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.9, ease: "expo.out", clearProps: "transform,visibility,opacity" },
            "fly+=0.75",
          )
          .add(() => {
            // Hand-off: the real navbar logo takes over in the same frame the copy disappears.
            endPreload();
            gsap.set(fly, { autoAlpha: 0 });
          }, "fly+=1.25")
          .set(curtain, { display: "none" });
        loadDelay = 2.0;
      } else if (curtain && isFirst) {
        // Header not found (should not happen) — plain lift.
        endPreload();
        tl.to(curtain, { yPercent: -100, duration: 1, delay: 0.2 }).set(curtain, { display: "none" });
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

      return () => {
        release?.();
        endPreload();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {isFirst ? (
        <>
          <div
            data-curtain
            aria-hidden="true"
            className="curtain fixed inset-0 z-[100] flex-col items-center justify-center bg-midnight text-white"
          >
            <div aria-hidden="true" className="glow-gold pointer-events-none absolute inset-0" />
            <p data-tagline className="absolute inset-x-0 top-1/2 px-6 text-center">
              <span data-pre className="eyebrow inline-block text-white/50">
                Stories · Music · Technology · Production
              </span>
            </p>
            <div className="absolute inset-x-0 bottom-[max(2.5rem,env(safe-area-inset-bottom))] mx-auto flex w-[min(420px,80vw)] items-center gap-4">
              <div data-pre className="h-px flex-1 bg-white/15">
                <div data-bar className="h-px origin-left bg-gold" />
              </div>
              <span data-pre data-count className="plex-label w-10 text-right text-sm tabular-nums text-white/60">
                000
              </span>
            </div>
          </div>
          {/* The lockup that flies from centre stage into the navbar */}
          <div data-fly-logo className="curtain-fly pointer-events-none fixed left-0 top-0 z-[101] invisible will-change-transform">
            <Logo decorative />
          </div>
        </>
      ) : (
        <div
          data-curtain
          aria-hidden="true"
          className="curtain fixed inset-0 z-[100] items-center justify-center bg-midnight"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img data-mark src="/brand/prf-emblem-gold.webp" alt="" width={168} height={160} className="h-16 w-auto" />
        </div>
      )}
      {children}
    </div>
  );
}
