"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis";
import { contact, nav, site } from "@/lib/site";
import Icon from "./Icon";
import Magnetic from "./motion/Magnetic";

const studioLinks = [
  { href: "/studio/", label: "About PRF Studios" },
  { href: "/films/", label: "Films & current slate" },
  { href: "/facilities/", label: "Studio infrastructure" },
  { href: "/legacy/", label: "Heritage since 1994" },
  { href: "/media/", label: "Media & press kit" },
  { href: "/contact/", label: "Work with PRF" },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-wordmark] span", {
        yPercent: 100,
        duration: 1.4,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-wordmark]", start: "top 98%", once: true },
      });
      gsap.from("[data-foot-cta] > *", {
        autoAlpha: 0,
        y: 40,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-foot-cta]", start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  const toTop = () => {
    scrollToTarget(0);
  };

  const divisions = nav.find((n) => n.href === "/divisions/")!.children!;
  const services = nav.find((n) => n.href === "/services/")!.children!;

  return (
    <footer ref={root} className="glow-gold relative overflow-hidden bg-midnight text-white">
      {/* CTA band */}
      <div className="container-x pb-16 pt-20 md:pb-24 md:pt-28 xl:pb-28 xl:pt-32">
        <div data-foot-cta className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="md:max-w-[85%] lg:max-w-[62%]">
            <p className="eyebrow text-champagne">Start a project</p>
            <h2 className="display mt-4">Have a story worth telling? <span className="accent">Let&apos;s make it together.</span></h2>
          </div>
          <div className="grid gap-3 min-[420px]:flex min-[420px]:flex-wrap">
            <Magnetic className="w-full min-[420px]:w-auto">
              <Link href="/contact/#enquiry" className="btn btn-gold w-full min-[420px]:w-auto">
                Start a project <Icon name="arrow" size={18} />
              </Link>
            </Magnetic>
            <Magnetic className="w-full min-[420px]:w-auto">
              <a href={contact.phoneHref} className="btn btn-ghost w-full min-[420px]:w-auto">
                <Icon name="phone" size={18} /> Call the studio
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/10 py-12 sm:grid-cols-3 md:gap-y-12 md:py-16 xl:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 sm:col-span-3 md:col-span-2 xl:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/prf-studios-gold.webp"
              alt="PRF Studios — A Pothraj Company"
              width={520}
              height={440}
              loading="lazy"
              className="h-28 w-auto md:h-32 xl:h-36"
            />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/60">
              A Bengaluru-based integrated film, music and digital-content studio with an entertainment legacy dating back
              to 1994.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/pothraj-group-light.webp"
              alt="Pothraj Group"
              width={636}
              height={160}
              loading="lazy"
              className="mt-8 h-6 w-auto opacity-70"
            />
          </div>

          <FooterColumn title="Studio" links={studioLinks} />
          <FooterColumn title="Divisions" links={divisions} />
          <FooterColumn title="Services" links={services} />

          <div className="col-span-2 sm:col-span-3 md:col-span-1 md:row-start-1 md:col-start-3 xl:col-start-auto xl:row-start-auto xl:col-span-1">
            <h3 className="plex-label text-white">Visit &amp; contact</h3>
            <ul className="mt-5 space-y-4 break-words text-[15px] text-white/60">
              <li className="flex gap-3">
                <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-champagne" />
                <span>
                  {contact.addressLines.slice(0, 2).join(", ")}
                  <br />
                  {contact.addressLines.slice(2).join(", ")}
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" size={18} className="mt-0.5 shrink-0 text-champagne" />
                <span>
                  <span className="block text-[12px] uppercase tracking-[0.14em] text-white/35">Media / Business</span>
                  <a href={`mailto:${contact.email}`} className="link-draw hover:text-white">
                    {contact.email}
                  </a>
                </span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" size={18} className="mt-0.5 shrink-0 text-champagne" />
                <a href={contact.phoneHref} className="link-draw hover:text-white">
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden="true" className="container-x select-none">
        <p
          data-wordmark
          className="flex justify-between overflow-hidden text-[12.6vw] font-serif font-light leading-[0.9] tracking-[-0.01em] text-outline"
        >
          {"PRF STUDIOS".split("").map((ch, i) => (
            <span key={i} className="inline-block">
              {ch === " " ? " " : ch}
            </span>
          ))}
        </p>
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-4 border-t border-white/10 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-7 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.descriptor}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/privacy/" className="hover:text-white">
              Privacy
            </Link>
            <a href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </a>
            <button
              type="button"
              onClick={toTop}
              className="group inline-flex items-center gap-2 rounded-full py-1 pl-3 pr-1 text-white/70 ring-1 ring-white/15 transition hover:text-white hover:ring-white/40"
            >
              Back to top
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-gold">
                <Icon name="arrowUp" size={14} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="plex-label text-white">{title}</h3>
      <ul className="mt-5 space-y-3 text-[15px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-draw text-white/60 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
