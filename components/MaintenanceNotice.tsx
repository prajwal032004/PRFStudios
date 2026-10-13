"use client";

import { useEffect, useRef } from "react";
import { lockScroll } from "@/lib/lenis";
import { contact } from "@/lib/site";

/*
 * Site-wide "under maintenance" notice.
 *
 * Fully self-contained: its styles, scroll lock and focus handling live in this file only.
 * To take it down, delete this file and remove the two MaintenanceNotice lines in app/layout.tsx
 * (the import and <MaintenanceNotice />). The site then behaves exactly as before.
 *
 * It sits just under the logo intro (z-100) so the loading screen plays first, then the notice
 * animates in. It renders on the server too, so the notice and the scroll lock are in place from first paint,
 * before any JavaScript runs. data-nosnippet keeps its text out of search-result snippets.
 */

const copy = {
  eyebrow: "Scheduled maintenance",
  title: "We’re refining the studio.",
  body: "The PRF Studios website is being updated and will be back shortly. For projects, bookings or media enquiries, the team is reachable as usual.",
};

// Pre-hydration lock and entrance animation. Removed from the page together with the component.
const css = `
html, body { overflow: hidden !important; overscroll-behavior: none; }
@keyframes prf-mnt-fade { from { opacity: 0 } }
@keyframes prf-mnt-rise { from { opacity: 0; transform: translateY(16px) scale(.98) } }
.prf-mnt-backdrop { animation: prf-mnt-fade .5s ease-out both; }
.prf-mnt-card { animation: prf-mnt-rise .7s cubic-bezier(.16,1,.3,1) .1s both; }
/* Wait for the logo intro (html.preloading) to finish before the notice animates in */
html.preloading .prf-mnt-backdrop, html.preloading .prf-mnt-card { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .prf-mnt-backdrop, .prf-mnt-card { animation: none; } }
`;

export default function MaintenanceNotice() {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stop Lenis smooth scrolling (wheel, keys and touch) for as long as the notice is shown.
    const release = lockScroll();

    // Everything behind the notice is unreachable for keyboard and screen-reader users.
    const behind = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== root.current && !el.contains(root.current) && !el.hasAttribute("inert"),
    );
    behind.forEach((el) => el.setAttribute("inert", ""));
    card.current?.focus({ preventScroll: true });

    // Keep focus inside the notice.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !card.current) return;
      const items = card.current.querySelectorAll<HTMLElement>("a[href]");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === card.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      behind.forEach((el) => el.removeAttribute("inert"));
      release();
    };
  }, []);

  return (
    <div ref={root} data-nosnippet className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <style>{css}</style>

      {/* Blurred, dimmed view of the site behind */}
      <div aria-hidden="true" className="prf-mnt-backdrop absolute inset-0 bg-[#12100c]/40 backdrop-blur-xl backdrop-saturate-[1.2]" />

      <div
        ref={card}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="maintenance-title"
        aria-describedby="maintenance-body"
        tabIndex={-1}
        style={{ outline: "none", borderRadius: 20 }}
        className="prf-mnt-card relative isolate w-full max-w-[540px] overflow-hidden rounded-[20px] bg-[#12100c]/90 px-6 py-10 text-center text-white shadow-[0_30px_80px_rgba(0,0,0,0.5)] outline-none ring-1 ring-[#c6a36e]/30 sm:px-12 sm:py-14"
      >
        {/* Soft gold glow and hairline accent */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c6a36e]/25 blur-[80px]" />
        <div aria-hidden="true" className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#c6a36e] to-transparent" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/prf-emblem-gold.webp" alt="PRF Studios" width={168} height={160} className="mx-auto h-14 w-auto sm:h-16" />

        <p className="mt-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-[#dcc7a0]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#c6a36e] motion-safe:animate-pulse" />
          {copy.eyebrow}
        </p>

        <h2 id="maintenance-title" className="mt-4 font-serif text-[clamp(30px,6vw,42px)] font-light leading-[1.1] tracking-[-0.02em] text-[#fbf7f0]">
          {copy.title}
        </h2>

        <p id="maintenance-body" className="mx-auto mt-4 max-w-[40ch] text-[16px] leading-relaxed text-white/70">
          {copy.body}
        </p>

        <div className="mx-auto mt-8 h-px w-12 bg-[#c6a36e]" />

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <a href={`mailto:${contact.email}`} className="btn btn-gold justify-center">
            Email the studio
          </a>
          <a href={contact.phoneHref} className="btn btn-ghost justify-center">
            Call {contact.phone}
          </a>
        </div>

        <p className="mt-8 text-[13px] text-white/45">PRF Studios — A Pothraj Company · Bengaluru</p>
      </div>
    </div>
  );
}
