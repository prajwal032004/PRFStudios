"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

// Lenis drives the native scroll position, ticked by GSAP so ScrollTrigger reads the same frame.
// A layout effect (not a passive one) so the instance exists before Header / Template animations
// boot — they lock scrolling during the preloader and the mobile menu.
export default function SmoothScroll() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      autoRaf: false, // GSAP's ticker owns the frame loop
      lerp: 0.085, // frame-rate independent easing: steady on 60, 120 and 144 Hz screens
      smoothWheel: true,
      wheelMultiplier: 0.9,
      // Touch keeps the OS's native momentum — no input lag and no fight with the browser
      // (URL bar collapse, overscroll), which is where smooth-scroll jitter on phones comes from.
      syncTouch: false,
      touchMultiplier: 1,
      allowNestedScroll: true, // swipe rails and the menu scroll themselves
      stopInertiaOnNavigate: true, // a click on a Link never inherits leftover wheel momentum
      anchors: { offset: -88, duration: 1.4 },
      autoResize: true,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Pins add spacing and images settle late — make Lenis re-measure whenever ScrollTrigger does.
    const remeasure = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", remeasure);

    return () => {
      ScrollTrigger.removeEventListener("refresh", remeasure);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
