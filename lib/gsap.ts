"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  // Chrome Android / iOS resize the viewport as the URL bar slides; refreshing on that
  // makes every trigger jump mid-scroll. Width changes (rotation) still refresh.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Coarse device tier, read once per page init — drives motion intensity. */
export type DeviceTier = "phone" | "tablet" | "desktop";
export const deviceTier = (): DeviceTier => {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(max-width: 767px)").matches) return "phone";
  if (window.matchMedia("(max-width: 1279px)").matches) return "tablet";
  return "desktop";
};
export const isTouch = () => typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
