"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { integrations } from "@/lib/site";

const label = (el: Element) => (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
const videoName = (v: HTMLVideoElement) => v.dataset.track || new URL(v.currentSrc || v.querySelector("source")?.src || "", location.href).pathname;

// Site-wide, delegated instrumentation: email and phone links, calls to action pointing at the
// enquiry form or marked data-track, and <video> playback. Only page paths and link labels are
// recorded — never what a visitor types.
// Page views, including client-side route changes, come from GA4's enhanced measurement.
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("a[href], [data-track]");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      const from = location.pathname;
      if (href.startsWith("mailto:")) track("email_click", { from });
      else if (href.startsWith("tel:")) track("phone_click", { from });
      else if (el.dataset.track || href.includes("/contact/")) track("cta_click", { cta: el.dataset.track || label(el), to: href, from });
    };

    // Media events don't bubble; listen in the capture phase.
    const onPlay = (e: Event) => {
      const v = e.target;
      if (!(v instanceof HTMLVideoElement) || v.dataset.tracked) return;
      v.dataset.tracked = "1"; // first play only, not every resume
      track("video_play", { video: videoName(v), from: location.pathname });
    };
    const onEnded = (e: Event) => {
      if (e.target instanceof HTMLVideoElement) track("video_complete", { video: videoName(e.target), from: location.pathname });
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("play", onPlay, { capture: true });
    document.addEventListener("ended", onEnded, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("play", onPlay, { capture: true });
      document.removeEventListener("ended", onEnded, { capture: true });
    };
  }, []);

  if (!integrations.gaId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${integrations.gaId}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${integrations.gaId}');`}
      </Script>
    </>
  );
}

/** Records a single event when the page mounts (e.g. a project page view). */
export function TrackOnView({ event, props }: { event: "project_view"; props: Record<string, string> }) {
  const key = JSON.stringify(props);
  useEffect(() => {
    track(event, JSON.parse(key));
  }, [event, key]);
  return null;
}
