"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { contact, nav } from "@/lib/site";
import { divisions, photos } from "@/lib/content";
import Logo from "./Logo";
import Icon from "./Icon";

const norm = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);

export default function Header() {
  const pathname = norm(usePathname() || "/");
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<string | null>(null); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const isActive = (href: string) => {
    const h = norm(href);
    return h === "/" ? pathname === "/" : pathname === h || pathname.startsWith(h + "/");
  };

  // Close everything when the route changes.
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setMenu(null);
    setMobileOpen(false);
  }

  // Hide on scroll down, reveal on scroll up; frost once past the top.
  useGSAP(() => {
    let last = window.scrollY;
    const show = gsap.quickTo(bar.current, "yPercent", { duration: 0.5, ease: "expo.out" });
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 240 && y > last + 4) show(-100);
      else if (y < last - 4 || y <= 240) show(0);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Desktop dropdown panels.
  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
      panels.forEach((p) => {
        const open = p.dataset.panel === menu;
        gsap.to(p, {
          autoAlpha: open ? 1 : 0,
          y: open ? 0 : -8,
          duration: open ? 0.45 : 0.2,
          ease: open ? "expo.out" : "power2.in",
          overwrite: true,
        });
        if (open) {
          gsap.fromTo(
            p.querySelectorAll("[data-item]"),
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, stagger: 0.035, duration: 0.5, ease: "expo.out", overwrite: true },
          );
        }
      });
    },
    { dependencies: [menu], scope: bar },
  );

  // Mobile overlay.
  useGSAP(
    () => {
      const el = overlay.current;
      if (!el) return;
      const lenis = getLenis();
      if (mobileOpen) {
        lenis?.stop();
        document.body.style.overflow = "hidden";
        gsap
          .timeline()
          .set(el, { display: "flex" })
          .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
          .fromTo(
            el.querySelectorAll("[data-m-item]"),
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, stagger: 0.05, duration: 0.8, ease: "expo.out" },
            "-=0.35",
          );
      } else {
        lenis?.start();
        document.body.style.overflow = "";
        gsap
          .timeline()
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut" })
          .set(el, { display: "none" });
      }
    },
    { dependencies: [mobileOpen] },
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = (key: string | null) => {
    clearTimeout(closeTimer.current);
    setMenu(key);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[90] -translate-y-24 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-carbon focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        ref={bar}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          menu || mobileOpen
            ? "bg-midnight"
            : scrolled
            ? "bg-midnight/80 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
        onMouseLeave={scheduleClose}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-6">
          <Logo onNavigate={() => setMobileOpen(false)} />

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href} className="relative" onMouseEnter={() => openMenu(item.children ? item.href : null)}>
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={`relative px-3 py-5 text-[15px] font-medium transition-colors duration-300 ${
                      isActive(item.href) ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3 bottom-[14px] h-[2px] origin-left rounded-full bg-white transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`Show ${item.label} menu`}
                      aria-expanded={menu === item.href}
                      aria-controls={`panel-${item.label}`}
                      onClick={() => setMenu(menu === item.href ? null : item.href)}
                      onFocus={() => openMenu(item.href)}
                      className="-ml-2 p-1 text-white/60 hover:text-white"
                    >
                      <Icon
                        name="chevron"
                        size={14}
                        className={`transition-transform duration-300 ${menu === item.href ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <Link href="/contact/" className="link-draw text-[15px] font-medium text-white/80 hover:text-white">
              Contact
            </Link>
            <Link href="/contact/#enquiry" className="btn btn-gold !py-2.5 !text-[15px]">
              Start a project
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/20 transition hover:bg-white/10 lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  mobileOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>

        {/* Desktop dropdown panels */}
        <div className="pointer-events-none absolute inset-x-0 top-full hidden lg:block">
          {/* Divisions — mega panel */}
          <div
            id="panel-Divisions"
            data-panel="/divisions/"
            onMouseEnter={() => openMenu("/divisions/")}
            onMouseLeave={scheduleClose}
            className="invisible pointer-events-auto border-t border-white/10 bg-midnight opacity-0 shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
          >
            <div className="container-x grid grid-cols-[1fr_2.6fr] gap-10 py-8">
              <div data-item className="flex flex-col justify-between border-r border-white/10 pr-10">
                <div>
                  <p className="eyebrow text-champagne">Divisions</p>
                  <p className="mt-3 text-[22px] font-bold leading-tight tracking-[-0.02em] text-white">
                    Four specialist teams. One integrated studio.
                  </p>
                </div>
                <Link href="/divisions/" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
                  View all divisions <Icon name="arrow" size={16} />
                </Link>
              </div>
              <ul className="grid grid-cols-4 gap-4">
                {divisions.map((d) => (
                  <li key={d.slug} data-item>
                    <Link href={`/divisions/${d.slug}/`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-carbon">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photos[d.photo].sm}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover opacity-80 transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-100"
                        />
                      </div>
                      <p className="plex-label mt-3 text-white">{d.name}</p>
                      <p className="text-sm text-white/55">{d.short}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services — process list */}
          <div
            id="panel-Services"
            data-panel="/services/"
            onMouseEnter={() => openMenu("/services/")}
            onMouseLeave={scheduleClose}
            className="invisible pointer-events-auto absolute inset-x-0 top-0 border-t border-white/10 bg-midnight opacity-0 shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
          >
            <div className="container-x grid grid-cols-[1fr_2.6fr] gap-10 py-8">
              <div data-item className="flex flex-col justify-between border-r border-white/10 pr-10">
                <div>
                  <p className="eyebrow text-champagne">Services</p>
                  <p className="mt-3 text-[22px] font-bold leading-tight tracking-[-0.02em] text-white">
                    End-to-end, or exactly the stage you need.
                  </p>
                </div>
                <Link href="/services/" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
                  How we work <Icon name="arrow" size={16} />
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-x-8">
                {nav
                  .find((n) => n.href === "/services/")!
                  .children!.map((c, i) => (
                    <li key={c.href} data-item>
                      <Link
                        href={c.href}
                        className="group flex items-center justify-between border-b border-white/10 py-3.5 text-white/80 transition-colors hover:text-white"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="plex-label text-xs text-white/35">0{i + 1}</span>
                          <span className="text-[17px] font-medium">{c.label}</span>
                        </span>
                        <Icon
                          name="arrowUpRight"
                          size={16}
                          className="-translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-0 z-40 hidden flex-col overflow-y-auto bg-midnight px-5 pb-10 pt-24 text-white lg:hidden"
        data-lenis-prevent
      >
        <ul className="flex flex-col">
          {[{ href: "/", label: "Home" }, ...nav, { href: "/contact/", label: "Contact" }].map((item) => (
            <li key={item.href} className="overflow-hidden border-b border-white/10">
              <div data-m-item className="flex items-center justify-between">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-4 text-[32px] font-serif font-normal tracking-[-0.02em] ${
                    isActive(item.href) ? "text-white" : "text-white/70"
                  }`}
                >
                  {item.label}
                </Link>
                {"children" in item && item.children && (
                  <button
                    type="button"
                    aria-label={`Expand ${item.label}`}
                    aria-expanded={mobileSection === item.href}
                    onClick={() => setMobileSection(mobileSection === item.href ? null : item.href)}
                    className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/20"
                  >
                    <Icon
                      name="plus"
                      size={18}
                      className={`transition-transform duration-300 ${mobileSection === item.href ? "rotate-45" : ""}`}
                    />
                  </button>
                )}
              </div>
              {"children" in item && item.children && (
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${
                    mobileSection === item.href ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <ul className="overflow-hidden" inert={mobileSection !== item.href}>
                    {item.children.map((c) => (
                      <li key={c.href} className="last:pb-4">
                        <Link
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between py-2 text-[17px] text-white/70"
                        >
                          {c.label}
                          <Icon name="arrow" size={16} className="text-white/40" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <div data-m-item>
            <Link href="/contact/#enquiry" onClick={() => setMobileOpen(false)} className="btn btn-gold w-full">
              Start a project
            </Link>
          </div>
          <div data-m-item className="mt-8 grid gap-1 text-sm text-white/60">
            <a href={`mailto:${contact.email}`} className="hover:text-white">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="hover:text-white">
              {contact.phone}
            </a>
            <p>{contact.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}
