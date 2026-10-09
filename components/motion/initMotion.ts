"use client";

import { gsap, ScrollTrigger, SplitText, deviceTier } from "@/lib/gsap";

const tiers = {
  phone: { travel: 0.6, time: 0.8, parallax: 0.45, start: "top 94%", zoom: 1.12 },
  tablet: { travel: 0.8, time: 0.9, parallax: 0.7, start: "top 90%", zoom: 1.2 },
  desktop: { travel: 1, time: 1, parallax: 1, start: "top 88%", zoom: 1.3 },
};

export function initMotion(root: HTMLElement, opts: { loadDelay?: number } = {}) {
  const loadDelay = opts.loadDelay ?? 0;
  const tier = deviceTier();
  const t = tiers[tier];
  const d = (seconds: number) => seconds * t.time;
  const px = (distance: number) => Math.round(distance * t.travel);
  const q = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & HTMLElement>(sel));
  const delayOf = (el: HTMLElement) => parseFloat(el.dataset.delay ?? "0") || 0;
  const triggerFor = (el: HTMLElement, start = t.start) =>
    el.hasAttribute("data-instant") ? undefined : { trigger: el, start, once: true };
  const extraDelay = (el: HTMLElement) => (el.hasAttribute("data-instant") ? loadDelay : 0) + delayOf(el);

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
          rotate: tier === "phone" ? 0 : 2,
          duration: d(1.25),
          stagger: d(0.09),
          delay: extraDelay(el),
          scrollTrigger: triggerFor(el),
        });
      },
    });
  });

  // Generic reveals
  q("[data-reveal]").forEach((el) => {
    let kind = el.dataset.reveal || "up";
    // Sideways entrances read as layout glitches on a narrow single column.
    if (tier === "phone" && (kind === "left" || kind === "right")) kind = "up";
    const from: gsap.TweenVars = { autoAlpha: 0 };
    if (kind === "up") from.y = px(40);
    if (kind === "left") from.x = -px(48);
    if (kind === "right") from.x = px(48);
    if (kind === "scale") Object.assign(from, { scale: 0.96, y: px(24) });
    gsap.from(el, { ...from, duration: d(1.2), delay: extraDelay(el), scrollTrigger: triggerFor(el) });
  });

  // Staggered children
  q("[data-stagger]").forEach((el) => {
    gsap.from(el.children, {
      autoAlpha: 0,
      y: px(36),
      duration: d(1),
      stagger: d(parseFloat(el.dataset.stagger || "") || 0.08),
      delay: extraDelay(el),
      scrollTrigger: triggerFor(el, tier === "desktop" ? "top 90%" : t.start),
    });
  });

  // Image clip wipes
  q("[data-clip]").forEach((el) => {
    // Parallax owns the image scale when both are present.
    const media = el.querySelector("[data-parallax]") ? null : el.querySelector("img, video");
    const tl = gsap.timeline({ delay: extraDelay(el), scrollTrigger: triggerFor(el, tier === "desktop" ? "top 85%" : t.start) });
    tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: d(1.4), ease: "expo.inOut" });
    if (media) tl.fromTo(media, { scale: t.zoom }, { scale: 1, duration: d(1.8), ease: "expo.out" }, 0.1);
  });

  // Parallax media
  q("[data-parallax]").forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || "0.15") * 100 * t.parallax;
    const media = el.querySelector("img, video") ?? el;
    gsap.set(media, { scale: 1 + amount / 100 + 0.04, force3D: true });
    gsap.fromTo(
      media,
      { yPercent: -amount / 2 },
      {
        yPercent: amount / 2,
        ease: "none",
        // Touch scrolling is native (not Lenis-smoothed), so a little scrub lag hides frame jitter.
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: tier === "desktop" ? true : 0.4 },
      },
    );
  });

  // Count-ups
  q("[data-counter]").forEach((el) => {
    const end = parseFloat(el.dataset.counter || "0");
    const start = parseFloat(el.dataset.counterFrom || "0");
    const suffix = el.dataset.counterSuffix ?? "";
    const obj = { v: start };
    el.textContent = String(start) + suffix;
    gsap.to(obj, {
      v: end,
      duration: d(2),
      ease: "power3.out",
      delay: extraDelay(el),
      scrollTrigger: triggerFor(el),
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v)) + suffix;
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

  // Hairlines that draw along a timeline, scrubbed to scroll
  q("[data-draw]").forEach((el) => {
    const axis = el.dataset.draw === "y" ? "scaleY" : "scaleX";
    gsap.fromTo(
      el,
      { [axis]: 0 },
      {
        [axis]: 1,
        ease: "none",
        transformOrigin: axis === "scaleX" ? "left center" : "center top",
        scrollTrigger: {
          trigger: el.parentElement,
          start: tier === "phone" ? "top 80%" : "top 75%",
          end: axis === "scaleX" ? "bottom 55%" : "bottom 70%",
          scrub: tier === "desktop" ? 0.6 : 0.3,
        },
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
            scrollTrigger: {
              trigger: el,
              start: tier === "phone" ? "top 85%" : "top 80%",
              end: tier === "phone" ? "bottom 60%" : "bottom 50%",
              scrub: tier === "desktop" ? true : 0.3,
            },
          },
        );
      },
    });
  });

  initEmblemProps(root);

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

/**
 * Emblem props (see components/EmblemArt): line-art that draws in, the floating crown
 * watermark and drifting petals. Exported separately so the footer, which lives outside
 * the page template, can run it too. Call inside a gsap.context / useGSAP scope.
 */
export function initEmblemProps(root: HTMLElement) {
  const tier = deviceTier();
  const t = tiers[tier];
  const q = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

  q("[data-draw-svg]").forEach((el) => {
    gsap.fromTo(
      el.querySelectorAll("path"),
      { strokeDasharray: 1, strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 1.1 * t.time,
        stagger: 0.07 * t.time,
        ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: tier === "phone" ? "top 92%" : "top 85%", once: true },
      },
    );
  });

  q("[data-float-parallax]").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -12 * t.parallax },
      {
        yPercent: 12 * t.parallax,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: tier === "desktop" ? true : 0.4 },
      },
    );
  });
  q("[data-float]").forEach((el) => {
    gsap.to(el, { y: 18, rotation: 2.5, duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true });
  });

  q("[data-petal]").forEach((el, i) => {
    if (tier === "phone" && i % 2) {
      gsap.set(el, { display: "none" });
      return;
    }
    gsap.to(el, {
      y: gsap.utils.random(-90, -40),
      x: gsap.utils.random(-30, 30),
      rotation: `+=${gsap.utils.random(-40, 40)}`,
      duration: gsap.utils.random(9, 15),
      delay: gsap.utils.random(0, 3),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}
