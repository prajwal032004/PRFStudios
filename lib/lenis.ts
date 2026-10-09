import type Lenis from "lenis";

// Single shared Lenis instance so any component can scroll programmatically.
let instance: Lenis | null = null;
let locks = 0;

export const setLenis = (l: Lenis | null) => {
  instance = l;
  if (l && locks > 0) l.stop();
};
export const getLenis = () => instance;

/**
 * Freeze page scrolling (preloader, mobile menu). Ref-counted, so overlapping locks
 * never release each other early. Returns an idempotent release function.
 */
export const lockScroll = () => {
  locks += 1;
  instance?.stop();
  document.documentElement.classList.add("scroll-locked");
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    if (locks === 0) {
      document.documentElement.classList.remove("scroll-locked");
      instance?.start();
    }
  };
};

/** Scroll to a position or element through Lenis when it is running, natively otherwise. */
export const scrollToTarget = (target: number | string | HTMLElement, opts: { immediate?: boolean; offset?: number } = {}) => {
  if (instance) {
    instance.scrollTo(target, { immediate: opts.immediate, offset: opts.offset, force: true, duration: 1.4 });
    return;
  }
  const behavior: ScrollBehavior = opts.immediate ? "instant" : "smooth";
  if (typeof target === "number") window.scrollTo({ top: target, behavior });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0), behavior });
  }
};
