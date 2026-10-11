"use client";

// Provider-agnostic event tracking. Events go to window.dataLayer (Google Tag Manager / GA4) and to
// gtag or Plausible when either is present; with no provider configured, nothing leaves the page.
// Never pass personal data (names, emails, phone numbers, message text) as event properties.

type Props = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  gtag?: (...args: unknown[]) => void;
  plausible?: (event: string, options?: { props?: Props }) => void;
};

export type EventName =
  | "cta_click"
  | "email_click"
  | "phone_click"
  | "project_view"
  | "video_play"
  | "video_complete"
  | "enquiry_start"
  | "enquiry_submit"
  | "enquiry_error";

export function track(event: EventName, props: Props = {}) {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  const clean = Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined)) as Props;
  try {
    (w.dataLayer ??= []).push({ event, ...clean });
    w.gtag?.("event", event, clean);
    w.plausible?.(event, { props: clean });
  } catch {
    // Analytics must never break the page.
  }
}
