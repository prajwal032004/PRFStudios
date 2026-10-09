"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact } from "@/lib/site";
import Icon from "./Icon";

const interests = ["Co-production", "Production services", "Videa Films", "PRF Music", "Digital & AI content", "Media enquiry", "Something else"];
const budgets = ["Not sure yet", "Under ₹10 lakh", "₹10–50 lakh", "₹50 lakh – ₹1 crore", "₹1 crore+"];

// The site is a static export, so the enquiry opens the visitor's mail app with a
// pre-filled message to the studio. Swap `send` for an API/form service if one is added.
export default function ContactForm() {
  const root = useRef<HTMLFormElement>(null);
  const [interest, setInterest] = useState(interests[0]);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      if (sent) gsap.fromTo("[data-sent]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" });
    },
    { scope: root, dependencies: [sent] },
  );

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Project enquiry — ${interest} — ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Company / production: ${data.get("company") || "—"}`,
      `Interested in: ${interest}`,
      `Budget: ${data.get("budget")}`,
      `Timeline: ${data.get("timeline") || "—"}`,
      "",
      `${data.get("message")}`,
    ].join("\n");
    window.location.assign(`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setSent(true);
  };

  const field =
    "peer w-full rounded-[8px] bg-white px-4 pb-2.5 pt-6 text-[16px] text-carbon ring-1 ring-ash outline-none transition placeholder:text-transparent focus:ring-2 focus:ring-gold";
  const label =
    "pointer-events-none absolute left-4 top-4 origin-left text-[15px] text-smoke transition-all duration-300 peer-focus:top-2 peer-focus:text-[12px] peer-focus:text-gold-ink peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[12px]";

  return (
    <form ref={root} onSubmit={send} className="space-y-6" noValidate={false}>
      <fieldset>
        <legend className="plex-label text-carbon">I&apos;m interested in</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((i) => (
            <button
              key={i}
              type="button"
              aria-pressed={interest === i}
              onClick={() => setInterest(i)}
              className={`tag transition-colors duration-300 ${interest === i ? "bg-carbon text-white" : "bg-sand text-carbon hover:bg-linen"}`}
            >
              {i}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
          <label htmlFor="name" className={label}>
            Your name *
          </label>
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="Email" className={field} />
          <label htmlFor="email" className={label}>
            Email address *
          </label>
        </div>
        <div className="relative">
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone" className={field} />
          <label htmlFor="phone" className={label}>
            Phone
          </label>
        </div>
        <div className="relative">
          <input id="company" name="company" autoComplete="organization" placeholder="Company" className={field} />
          <label htmlFor="company" className={label}>
            Company or production
          </label>
        </div>
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
        <div className="relative">
          <input id="timeline" name="timeline" placeholder="Timeline" className={field} />
          <label htmlFor="timeline" className={label}>
            Timeline (e.g. shoot in March)
          </label>
        </div>
      </div>

      <div className="relative">
        <textarea id="message" name="message" required rows={5} placeholder="Message" className={`${field} resize-none`} />
        <label htmlFor="message" className={label}>
          Tell us about the project *
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-relaxed text-smoke">
          Sends from your email app to {contact.email}.
        </p>
        <button type="submit" className="btn btn-gold shrink-0">
          Send enquiry <Icon name="send" size={18} />
        </button>
      </div>

      {sent && (
        <p data-sent role="status" className="flex items-center gap-3 rounded-[8px] bg-sand p-4 text-[15px] text-carbon">
          <Icon name="check" size={18} className="text-gold-ink" />
          Your email app should open with the enquiry ready to send. If it didn&apos;t, write to{" "}
          <a href={`mailto:${contact.email}`} className="font-medium underline">
            {contact.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
