"use client";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

/**
 * Declarative scroll motion. Server-rendered markup opts in with data attributes:
 *
 *   data-reveal="up|fade|left|right|scale"  element rises / fades in on scroll
 *   data-split                              headline lines rise from a mask
 *   data-stagger                            direct children reveal in sequence
 *   data-clip                               image wipes up from its container
 *   data-parallax="0.15"                    child image drifts while scrolling
 *   data-counter="1994"                     number counts up when visible
 *   data-scrub-words                        words brighten as the reader scrolls
 *   data-delay="0.2"                        extra delay (seconds)
 *   data-instant                            animate on load, not on scroll
 *
 * Must be called inside a gsap.context / useGSAP scope so everything reverts on unmount.
 */
export function initMotion(root: HTMLElement, opts: { loadDelay?: number } = {}) {
  const loadDelay = opts.loadDelay ?? 0;
  const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & HTMLElement>(sel));
  const delayOf = (el: HTMLElement) => parseFloat(el.dataset.delay ?? "0") || 0;
  const triggerFor = (el: HTMLElement, start = "top 88%") =>
    el.hasAttribute("data-instant") ? undefined : { trigger: el, start, once: true };
  const extraDelay = (el: HTMLElement) => (el.hasAttribute("data-instant") ? loadDelay : 0) + delayOf(el);

  // Split headlines
  q("[data-split]").forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: "visible" });
        return gsap.from(self.lines, {
          yPercent: 115,
          rotate: 2,
          duration: 1.25,
          stagger: 0.09,
          delay: extraDelay(el),
          scrollTrigger: triggerFor(el),
        });
      },
    });
  });

  // Generic reveals
  q("[data-reveal]").forEach((el) => {
    const kind = el.dataset.reveal || "up";
    const from: gsap.TweenVars = { autoAlpha: 0 };
    if (kind === "up") from.y = 40;
    if (kind === "left") from.x = -48;
    if (kind === "right") from.x = 48;
    if (kind === "scale") Object.assign(from, { scale: 0.94, y: 24 });
    gsap.from(el, { ...from, duration: 1.2, delay: extraDelay(el), scrollTrigger: triggerFor(el) });
  });

  // Staggered children
  q("[data-stagger]").forEach((el) => {
    gsap.from(el.children, {
      autoAlpha: 0,
      y: 36,
      duration: 1,
      stagger: parseFloat(el.dataset.stagger || "") || 0.08,
      delay: extraDelay(el),
      scrollTrigger: triggerFor(el, "top 90%"),
    });
  });

  // Image clip wipes
  q("[data-clip]").forEach((el) => {
    // Parallax owns the image scale when both are present.
    const media = el.querySelector("[data-parallax]") ? null : el.querySelector("img, video");
    const tl = gsap.timeline({ delay: extraDelay(el), scrollTrigger: triggerFor(el, "top 85%") });
    tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
    if (media) tl.fromTo(media, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
  });

  // Parallax media
  q("[data-parallax]").forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || "0.15") * 100;
    const media = el.querySelector("img, video") ?? el;
    gsap.set(media, { scale: 1 + amount / 100 + 0.05 });
    gsap.fromTo(
      media,
      { yPercent: -amount / 2 },
      { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });

  // Count-ups
  q("[data-counter]").forEach((el) => {
    const end = parseFloat(el.dataset.counter || "0");
    const start = parseFloat(el.dataset.counterFrom || "0");
    const obj = { v: start };
    el.textContent = String(start);
    gsap.to(obj, {
      v: end,
      duration: 2,
      ease: "power3.out",
      delay: extraDelay(el),
      scrollTrigger: triggerFor(el),
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
      },
    });
  });

  // Vertical progress lines that draw down through their parent as it scrolls past
  q("[data-progress-line]").forEach((el) => {
    gsap.fromTo(
      el,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: { trigger: el.parentElement, start: "top 60%", end: "bottom 60%", scrub: true },
      },
    );
  });

  // Scroll-scrubbed word highlight
  q("[data-scrub-words]").forEach((el) => {
    SplitText.create(el, {
      type: "words",
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(
          self.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
          },
        );
      },
    });
  });

  // Images that load late change layout height — refresh trigger positions once they arrive.
  let timer: ReturnType<typeof setTimeout> | undefined;
  const refresh = () => {
    clearTimeout(timer);
    timer = setTimeout(() => ScrollTrigger.refresh(), 200);
  };
  q<HTMLImageElement>("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", refresh, { once: true });
  });
}
