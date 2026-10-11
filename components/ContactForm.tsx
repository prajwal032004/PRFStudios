"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { track } from "@/lib/analytics";
import { contact, integrations } from "@/lib/site";
import { services } from "@/lib/content";
import Icon from "./Icon";

// Each enquiry type asks only what the studio needs to route it. `?interest=<slug>` on the contact
// URL (and `&stage=<service slug>` for production services) preselects the type from a CTA.
type Interest = {
  slug: string;
  label: string;
  /** Follow-up question shown for this type, if any. */
  detail?: { name: string; label: string; options: string[]; multiple?: boolean };
  budget: boolean;
  timeline: boolean;
  prompt: string;
};

const interests: Interest[] = [
  {
    slug: "co-production",
    label: "Co-production",
    detail: { name: "stage", label: "Where is the project now?", options: ["Idea or treatment", "Script ready", "Packaging & financing", "In production", "Completed"] },
    budget: true,
    timeline: true,
    prompt: "Tell us about the project — story, language, key talent attached",
  },
  {
    slug: "production-services",
    label: "Production services",
    detail: { name: "services", label: "Which stages do you need?", options: services.map((s) => s.name), multiple: true },
    budget: true,
    timeline: true,
    prompt: "Tell us about the production and what you need from the studio",
  },
  {
    slug: "videa-films",
    label: "Videa Films",
    detail: { name: "regarding", label: "What is this about?", options: ["Story or script submission", "Talent & creative collaboration", "Distribution or platform partnership", "Something else"] },
    budget: false,
    timeline: false,
    prompt: "Tell us what you would like to discuss with Videa Films",
  },
  {
    slug: "prf-music",
    label: "PRF Music",
    detail: { name: "music", label: "What kind of music project?", options: ["Film soundtrack", "Independent release", "Devotional or regional", "Music video", "Recording session"] },
    budget: true,
    timeline: true,
    prompt: "Tell us about the music project",
  },
  {
    slug: "digital-ai",
    label: "Digital & AI content",
    detail: { name: "format", label: "What format?", options: ["YouTube or short-form", "Branded content", "Trailers & promotional content", "AI-assisted content", "Original digital series"] },
    budget: true,
    timeline: true,
    prompt: "Tell us about the content you have in mind",
  },
  { slug: "media", label: "Media enquiry", budget: false, timeline: true, prompt: "Your outlet, the story and what you need from us" },
  { slug: "other", label: "Something else", budget: false, timeline: false, prompt: "How can we help?" },
];

// Older links and division pages map onto the enquiry types above.
const aliases: Record<string, string> = {
  "production-services": "production-services",
  "prf-digital": "digital-ai",
  digital: "digital-ai",
  music: "prf-music",
};

const budgets = ["Not sure yet", "Under ₹10 lakh", "₹10–50 lakh", "₹50 lakh – ₹1 crore", "₹1 crore+"];

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "mailto" | "failed";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(email)) errors.email = "That email address doesn’t look right — please check it.";
  if (phone && !PHONE.test(phone)) errors.phone = "Use digits, spaces and an optional + country code.";
  if (message.length < 10) errors.message = "Please tell us a little about the project (at least a sentence).";
  return errors;
}

export default function ContactForm() {
  const root = useRef<HTMLFormElement>(null);
  const [interest, setInterest] = useState(interests[0]);
  const [preselected, setPreselected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const started = useRef(false);

  // Preselect from ?interest= / ?stage= (read on the client: the page is statically exported).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const key = q.get("interest");
    const match = key && interests.find((i) => i.slug === (aliases[key] ?? key));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off sync from the URL after hydration
    if (match) setInterest(match);
    const stage = services.find((s) => s.slug === q.get("stage"));
    if (stage) setPreselected([stage.name]);
  }, []);

  useGSAP(
    () => {
      if (status === "sent" || status === "mailto")
        gsap.fromTo("[data-sent]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" });
    },
    { scope: root, dependencies: [status] },
  );

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("enquiry_start", { interest: interest.slug });
  };

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never see or fill this field.
    if (String(data.get("website") ?? "")) return setStatus("sent");

    const found = validate(data);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Errors)[])[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      track("enquiry_error", { interest: interest.slug, fields: Object.keys(found).join(",") });
      return;
    }

    const detail = interest.detail ? data.getAll(interest.detail.name).map(String).filter(Boolean) : [];
    const fields: [string, string][] = [
      ["Enquiry type", interest.label],
      ["Name", String(data.get("name")).trim()],
      ["Email", String(data.get("email")).trim()],
      ["Phone", String(data.get("phone") || "—").trim()],
      ["Company / production", String(data.get("company") || "—").trim()],
      ...(interest.detail ? ([[interest.detail.label, detail.join(", ") || "—"]] as [string, string][]) : []),
      ...(interest.budget ? ([["Budget", String(data.get("budget"))]] as [string, string][]) : []),
      ...(interest.timeline ? ([["Timeline", String(data.get("timeline") || "—")]] as [string, string][]) : []),
      ["Message", String(data.get("message")).trim()],
    ];
    const subject = `Project enquiry — ${interest.label} — ${fields[1][1]}`;

    if (!integrations.enquiryEndpoint) {
      const body = fields.map(([k, v]) => (k === "Message" ? `\n${v}` : `${k}: ${v}`)).join("\n");
      window.location.assign(`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      track("enquiry_submit", { interest: interest.slug, method: "mailto" });
      return setStatus("mailto");
    }

    setStatus("sending");
    try {
      const res = await fetch(integrations.enquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...(integrations.enquiryAccessKey ? { access_key: integrations.enquiryAccessKey } : {}),
          subject,
          _subject: subject,
          from_name: "prfstudios.in",
          email: fields[2][1],
          replyto: fields[2][1],
          ...Object.fromEntries(fields),
          page: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("enquiry_submit", { interest: interest.slug, method: "form" });
      form.reset();
      setStatus("sent");
    } catch {
      track("enquiry_error", { interest: interest.slug, fields: "network" });
      setStatus("failed");
    }
  };

  const field =
    "peer w-full rounded-[8px] bg-white px-4 pb-2.5 pt-6 text-[16px] text-carbon ring-1 ring-ash outline-none transition placeholder:text-transparent focus:ring-2 focus:ring-gold-ink aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#b42318]";
  const label =
    "pointer-events-none absolute left-4 top-4 origin-left text-[15px] text-smoke transition-all duration-300 peer-focus:top-2 peer-focus:text-[12px] peer-focus:text-gold-ink peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[12px]";

  const err = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[#b42318]">
        {errors[name]}
      </p>
    ) : null;
  const invalid = (name: keyof Errors) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` } : {};

  if (status === "sent")
    return (
      <form ref={root} aria-live="polite">
        <div data-sent role="status" className="rounded-[8px] bg-ivory p-6 ring-1 ring-ash md:p-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-gold-ink">
            <Icon name="check" size={20} />
          </span>
          <h3 className="mt-5 font-serif text-[26px] font-normal tracking-[-0.01em] text-onyx">Thank you — your enquiry is with the studio.</h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-graphite">
            The team will reply by email. For anything urgent, call{" "}
            <a href={contact.phoneHref} className="font-medium text-carbon underline">
              {contact.phone}
            </a>
            .
          </p>
          <button type="button" onClick={() => setStatus("idle")} className="btn btn-outline mt-6">
            Send another enquiry
          </button>
        </div>
      </form>
    );

  return (
    <form ref={root} onSubmit={send} onFocusCapture={onStart} noValidate className="space-y-6">
      <fieldset>
        <legend className="plex-label text-carbon">I&apos;m interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((i) => (
            <label
              key={i.slug}
              className={`tag cursor-pointer transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-ink ${
                interest.slug === i.slug ? "bg-carbon text-white" : "bg-sand text-carbon hover:bg-linen"
              }`}
            >
              <input
                type="radio"
                name="interest"
                value={i.slug}
                checked={interest.slug === i.slug}
                onChange={() => setInterest(i)}
                className="sr-only"
              />
              {i.label}
            </label>
          ))}
        </div>
      </fieldset>

      {interest.detail && (
        <fieldset key={interest.slug}>
          <legend className="text-[15px] font-medium text-carbon">
            {interest.detail.label} <span className="font-normal text-smoke">(optional)</span>
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {interest.detail.options.map((o) => (
              <label
                key={o}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[8px] bg-white px-4 py-2.5 text-[15px] text-carbon ring-1 ring-ash transition has-[:checked]:ring-2 has-[:checked]:ring-carbon"
              >
                <input
                  type={interest.detail!.multiple ? "checkbox" : "radio"}
                  name={interest.detail!.name}
                  value={o}
                  defaultChecked={preselected.includes(o)}
                  className="h-4 w-4 shrink-0 accent-[#1c1915]"
                />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} {...invalid("name")} />
          <label htmlFor="name" className={label}>
            Your name *
          </label>
          {err("name")}
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" placeholder="Email" className={field} {...invalid("email")} />
          <label htmlFor="email" className={label}>
            Email address *
          </label>
          {err("email")}
        </div>
        <div className="relative">
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={field} {...invalid("phone")} />
          <label htmlFor="phone" className={label}>
            Phone (optional)
          </label>
          {err("phone")}
        </div>
        <div className="relative">
          <input id="company" name="company" autoComplete="organization" placeholder="Company" className={field} />
          <label htmlFor="company" className={label}>
            Company or production (optional)
          </label>
        </div>
        {interest.budget && (
          <div className="relative">
            <select id="budget" name="budget" defaultValue={budgets[0]} className={`${field} appearance-none`}>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <label htmlFor="budget" className="pointer-events-none absolute left-4 top-2 text-[12px] text-smoke">
              Estimated budget
            </label>
            <Icon name="chevron" size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-smoke" />
          </div>
        )}
        {interest.timeline && (
          <div className="relative">
            <input id="timeline" name="timeline" placeholder="Timeline" className={field} />
            <label htmlFor="timeline" className={label}>
              {interest.slug === "media" ? "Your deadline (optional)" : "Timeline, e.g. shoot in March (optional)"}
            </label>
          </div>
        )}
      </div>

      <div className="relative">
        <textarea id="message" name="message" required rows={5} placeholder="Message" className={`${field} resize-y`} {...invalid("message")} />
        <label htmlFor="message" className={label}>
          {interest.prompt} *
        </label>
        {err("message")}
      </div>

      {/* Honeypot for bots — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-relaxed text-smoke">
          {integrations.enquiryEndpoint ? "Sent securely to the studio team." : `Opens your email app, addressed to ${contact.email}.`} See our{" "}
          <Link href="/privacy/" className="underline">
            privacy policy
          </Link>
          .
        </p>
        <button type="submit" disabled={status === "sending"} className="btn btn-gold shrink-0 disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send enquiry"} <Icon name="send" size={18} />
        </button>
      </div>

      <div aria-live="polite">
        {status === "mailto" && (
          <p data-sent role="status" className="flex items-start gap-3 rounded-[8px] bg-sand p-4 text-[15px] text-carbon">
            <Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold-ink" />
            <span>
              Your email app should open with the enquiry ready to send. If it didn&apos;t, write to{" "}
              <a href={`mailto:${contact.email}`} className="font-medium underline">
                {contact.email}
              </a>
              .
            </span>
          </p>
        )}
        {status === "failed" && (
          <p role="alert" className="rounded-[8px] bg-[#fdecea] p-4 text-[15px] text-[#7a1c12]">
            We couldn&apos;t send your enquiry just now — please try again, or email{" "}
            <a href={`mailto:${contact.email}`} className="font-medium underline">
              {contact.email}
            </a>{" "}
            or call{" "}
            <a href={contact.phoneHref} className="font-medium underline">
              {contact.phone}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
