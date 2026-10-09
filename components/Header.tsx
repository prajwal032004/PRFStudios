"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll } from "@/lib/lenis";
import { contact, nav } from "@/lib/site";
import { divisions, photos } from "@/lib/content";
import Logo from "./Logo";
import Icon from "./Icon";
import Magnetic from "./motion/Magnetic";

const norm = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);
const mobileItems = [{ href: "/", label: "Home" }, ...nav, { href: "/contact/", label: "Contact" }];

export default function Header() {
  const pathname = norm(usePathname() || "/");
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const pillOn = useRef(false);
  const [menu, setMenu] = useState<string | null>(null); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const openRef = useRef(false);
  const barHidden = useRef(false);
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
  // Lenis drives the native scroll position, so window scroll events carry its smoothed value.
  useGSAP(() => {
    const el = bar.current!;
    let last = window.scrollY;
    let travel = 0; // accumulated distance in the current direction, ignores tiny jitters
    const slide = (hide: boolean) => {
      if (hide === barHidden.current) return;
      barHidden.current = hide;
      gsap.to(el, {
        yPercent: hide ? -140 : 0,
        duration: hide ? 0.45 : 0.6,
        ease: hide ? "power3.in" : "expo.out",
        overwrite: true,
      });
    };
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - last;
      last = y;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) gsap.set(progress.current, { scaleX: max > 0 ? Math.min(1, y / max) : 0 });
      if (openRef.current || y < 160) return slide(false);
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      if (travel > 24) slide(true);
      else if (travel < -12) slide(false);
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
          clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          duration: open ? 0.6 : 0.3,
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

  // Mobile / tablet menu: curtain wipe, masked link rise, then the footer details.
  const mounted = useRef(false);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const releaseScroll = useRef<(() => void) | null>(null);
  useEffect(() => () => releaseScroll.current?.(), []);
  useGSAP(
    () => {
      const el = overlay.current;
      openRef.current = mobileOpen;
      if (!el) return;
      if (!mounted.current) {
        mounted.current = true;
        if (!mobileOpen) return; // nothing to close on first render
      }

      // The page behind the dialog is out of reach for focus and assistive tech.
      const behind = [document.getElementById("main"), document.querySelector<HTMLElement>("body > footer")];
      behind.forEach((n) => n?.toggleAttribute("inert", mobileOpen));

      const items = el.querySelectorAll("[data-m-item]");
      const fades = el.querySelectorAll("[data-m-fade]");
      menuTl.current?.kill(); // rapid taps: never let open and close fight over the same props

      if (mobileOpen) {
        releaseScroll.current?.();
        releaseScroll.current = lockScroll();
        barHidden.current = false;
        gsap.to(bar.current, { yPercent: 0, duration: 0.4, overwrite: true });
        menuTl.current = gsap
          .timeline()
          .set(el, { display: "flex" })
          .fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "expo.inOut" },
          )
          .fromTo(items, { yPercent: 105 }, { yPercent: 0, stagger: 0.045, duration: 0.9, ease: "expo.out" }, "-=0.35")
          .fromTo(fades, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.7, ease: "expo.out" }, "-=0.7")
          .add(() => el.querySelector<HTMLElement>("[data-m-scroll]")?.focus({ preventScroll: true }), 0.4);
        return;
      }

      releaseScroll.current?.();
      releaseScroll.current = null;
      if (el.contains(document.activeElement)) toggle.current?.focus({ preventScroll: true });
      menuTl.current = gsap
        .timeline()
        .to([...fades].reverse(), { autoAlpha: 0, y: 8, stagger: 0.02, duration: 0.2, ease: "power2.in" })
        .to(items, { yPercent: -105, stagger: 0.02, duration: 0.3, ease: "power2.in" }, 0)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "expo.inOut" }, 0.15)
        .set(el, { display: "none" })
        .add(() => setMobileSection(null));
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
    // Rotating a tablet into desktop width swaps to the full nav — drop the overlay.
    const wide = window.matchMedia("(min-width: 1280px)");
    const onWide = () => wide.matches && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, []);

  // Hover pill for the desktop links.
  const movePill = (li: HTMLElement) => {
    const el = pill.current;
    if (!el) return;
    const to = { x: li.offsetLeft, width: li.offsetWidth };
    if (!pillOn.current) {
      gsap.set(el, to);
      gsap.to(el, { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
    } else gsap.to(el, { ...to, autoAlpha: 1, duration: 0.5, ease: "expo.out", overwrite: "auto" });
    pillOn.current = true;
  };
  const hidePill = () => {
    pillOn.current = false;
    if (pill.current) gsap.to(pill.current, { autoAlpha: 0, duration: 0.3, overwrite: "auto" });
  };

  const openMenu = (key: string | null) => {
    clearTimeout(closeTimer.current);
    setMenu(key);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 140);
  };

  // Floating pill below 1280px, full-width bar on desktop.
  const surface = mobileOpen
    ? "bg-transparent"
    : menu
    ? "bg-midnight"
    : scrolled
    ? "bg-midnight/90 shadow-[0_10px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/10 backdrop-blur-xl backdrop-saturate-150 xl:shadow-[0_1px_0_rgba(255,255,255,0.06)] xl:ring-0"
    : "bg-transparent";

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[90] -translate-y-24 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-carbon focus:translate-y-0"
      >
        Skip to content
      </a>

      {/* Desktop: dim the page behind an open dropdown */}
      <div
        aria-hidden="true"
        onMouseEnter={scheduleClose}
        onClick={() => setMenu(null)}
        className={`fixed inset-0 z-40 hidden bg-black/45 backdrop-blur-[2px] transition-opacity duration-500 xl:block ${
          menu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        ref={bar}
        className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] will-change-transform"
        onMouseLeave={scheduleClose}
      >
        {/* Legibility scrim over bright hero photos while the bar is clear */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent transition-opacity duration-500 ${
            scrolled || mobileOpen || menu ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`relative mx-[max(8px,calc(var(--gutter)-14px))] mt-2.5 rounded-[22px] transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] md:mt-3 xl:mx-0 xl:mt-0 xl:rounded-none ${surface}`}
        >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 hidden h-px transition-opacity duration-500 xl:block ${
            scrolled && !menu ? "opacity-100" : "opacity-0"
          }`}
        >
          <div ref={progress} className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold/40 via-gold to-champagne" />
        </div>
        <nav
          aria-label="Primary"
          className={`flex h-14 items-center justify-between gap-3 px-3.5 transition-[height] duration-500 ease-[var(--ease-out-expo)] md:h-16 xl:gap-8 xl:px-[var(--gutter)] ${
            scrolled && !menu ? "xl:h-16" : "xl:h-20"
          }`}
        >
          <Logo onNavigate={() => setMobileOpen(false)} />

          {/* Desktop links: a soft pill glides to whichever link is hovered or focused */}
          <ul className="relative hidden items-center xl:flex" onMouseLeave={hidePill}>
            <span
              ref={pill}
              aria-hidden="true"
              className="pointer-events-none invisible absolute left-0 top-1/2 h-10 -translate-y-1/2 rounded-full bg-white/[0.08] opacity-0 ring-1 ring-inset ring-white/10"
            />
            {nav.map((item) => {
              const active = isActive(item.href);
              const open = menu === item.href;
              return (
                <li
                  key={item.href}
                  data-nav-reveal
                  className="relative flex items-center"
                  onMouseEnter={(e) => {
                    openMenu(item.children ? item.href : null);
                    movePill(e.currentTarget);
                  }}
                  onFocus={(e) => movePill(e.currentTarget)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group/link relative flex h-10 items-center rounded-full text-[15px] font-medium transition-colors duration-300 ${
                      item.children ? "pl-4 pr-1" : "px-4"
                    } ${active || open ? "text-white" : "text-white/70 hover:text-white"}`}
                  >
                    {/* Label rolls up to a fresh copy on hover */}
                    <span className="relative block overflow-hidden leading-[1.3]">
                      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:-translate-y-full">
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-full block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:-translate-y-full"
                      >
                        {item.label}
                      </span>
                    </span>
                    {active && (
                      <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                    )}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`Show ${item.label} menu`}
                      aria-expanded={open}
                      aria-controls={`panel-${item.label}`}
                      onClick={() => setMenu(open ? null : item.href)}
                      onFocus={() => openMenu(item.href)}
                      className={`flex h-10 items-center pl-1 pr-3.5 transition-colors ${open ? "text-gold" : "text-white/55 hover:text-white"}`}
                    >
                      <Icon name="chevron" size={14} className={`transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 xl:flex">
            <Link
              href="/contact/"
              data-nav-reveal
              className={`flex h-10 items-center rounded-full px-4 text-[15px] font-medium transition-colors duration-300 hover:bg-white/[0.08] ${
                isActive("/contact/") ? "text-white" : "text-white/75 hover:text-white"
              }`}
            >
              Contact
            </Link>
            <span data-nav-reveal>
              <Magnetic strength={0.2}>
                <Link href="/contact/#enquiry" className="btn btn-gold group/cta !gap-3 !py-1.5 !pl-5 !pr-1.5 !text-[15px]">
                  Start a project
                  <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-midnight text-champagne">
                    <Icon name="arrow" size={15} className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-[3px]" />
                  </span>
                </Link>
              </Magnetic>
            </span>
          </div>

          <div data-nav-reveal className="flex shrink-0 items-center gap-2.5 xl:hidden">
            {/* Tablet: keep the primary action in reach next to the menu button */}
            <Link
              href="/contact/#enquiry"
              onClick={() => setMobileOpen(false)}
              className={`btn btn-gold hidden !py-2.5 !text-[15px] transition-opacity duration-300 md:inline-flex ${
                mobileOpen ? "pointer-events-none opacity-0" : ""
              }`}
              tabIndex={mobileOpen ? -1 : undefined}
            >
              Start a project
            </Link>
            <button
              ref={toggle}
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={`relative flex h-11 w-11 items-center justify-center gap-3 rounded-full text-white ring-1 transition-[background-color,box-shadow] duration-300 sm:w-auto sm:pl-4 sm:pr-3.5 ${
                mobileOpen ? "bg-white/10 ring-white/25" : "ring-white/20 hover:bg-white/10"
              }`}
            >
              {/* Label rolls between Menu and Close */}
              <span aria-hidden="true" className="relative hidden h-4 overflow-hidden text-[12px] font-medium uppercase leading-4 tracking-[0.18em] sm:block">
                <span
                  className={`block transition-transform duration-500 ease-[var(--ease-out-expo)] ${mobileOpen ? "-translate-y-4" : ""}`}
                >
                  <span className="block h-4">Menu</span>
                  <span className="block h-4">Close</span>
                </span>
              </span>
              <span aria-hidden="true" className="relative block h-[10px] w-[20px]">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    mobileOpen ? "translate-y-[4.25px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 right-0 h-[1.5px] rounded-full bg-current transition-[transform,width] duration-500 ease-[var(--ease-out-expo)] ${
                    mobileOpen ? "w-full -translate-y-[4.25px] -rotate-45" : "w-[70%]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
        </div>

        {/* Desktop dropdown panels */}
        <div className="pointer-events-none absolute inset-x-0 top-full hidden xl:block">
          {/* Divisions — mega panel */}
          <div
            id="panel-Divisions"
            data-panel="/divisions/"
            onMouseEnter={() => openMenu("/divisions/")}
            onMouseLeave={scheduleClose}
            className="invisible pointer-events-auto border-t border-white/10 bg-midnight opacity-0 shadow-[0_24px_48px_rgba(0,0,0,0.35)] [clip-path:inset(0%_0%_100%_0%)]"
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
            className="invisible pointer-events-auto absolute inset-x-0 top-0 border-t border-white/10 bg-midnight opacity-0 shadow-[0_24px_48px_rgba(0,0,0,0.35)] [clip-path:inset(0%_0%_100%_0%)]"
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

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        ref={overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-x-0 top-0 z-40 hidden h-vp-100 flex-col bg-midnight text-white xl:hidden"
      >
        <div aria-hidden="true" className="glow-gold pointer-events-none absolute inset-0" />
        <div
          data-m-scroll
          data-lenis-prevent
          tabIndex={-1}
          className="relative flex flex-1 flex-col overflow-y-auto overscroll-contain px-[var(--gutter)] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(env(safe-area-inset-top)+92px)] outline-none md:pt-[calc(env(safe-area-inset-top)+120px)]"
        >
          <p data-m-fade className="eyebrow text-champagne/80">
            Navigate
          </p>

          <ul className="mt-3 md:mt-5 md:grid md:grid-cols-2 md:gap-x-12">
            {mobileItems.map((item, i) => {
              const active = isActive(item.href);
              const expandable = "children" in item && item.children;
              const open = mobileSection === item.href;
              return (
                <li key={item.href} className="border-b border-white/10">
                  <div className="flex items-center gap-2 overflow-hidden pr-px">
                    <div data-m-item className="flex min-w-0 flex-1 items-center gap-2">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="group flex min-w-0 flex-1 items-baseline gap-3 py-3 md:py-4"
                      >
                        <span className="w-6 shrink-0 text-[11px] font-medium tabular-nums tracking-[0.12em] text-white/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`truncate font-serif text-[clamp(28px,8.2vw,36px)] font-normal leading-[1.15] tracking-[-0.02em] transition-colors duration-300 md:text-[40px] ${
                            active ? "text-white" : "text-white/60 group-hover:text-white group-active:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                        {active && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 self-center rounded-full bg-gold" />}
                      </Link>
                      {expandable && (
                        <button
                          type="button"
                          aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
                          aria-expanded={open}
                          aria-controls={`m-sub-${i}`}
                          onClick={() => setMobileSection(open ? null : item.href)}
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 transition-colors duration-300 ${
                            open ? "bg-gold text-midnight ring-gold" : "text-white ring-white/20"
                          }`}
                        >
                          <Icon
                            name="plus"
                            size={18}
                            className={`transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "rotate-45" : ""}`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  {expandable && (
                    <div
                      id={`m-sub-${i}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <ul className="overflow-hidden pl-9" inert={!open}>
                        {item.children!.map((c) => (
                          <li key={c.href} className="last:pb-4">
                            <Link
                              href={c.href}
                              onClick={() => setMobileOpen(false)}
                              aria-current={isActive(c.href) ? "page" : undefined}
                              className={`flex items-center justify-between gap-4 rounded-[10px] px-3 py-2.5 text-[16px] transition-colors active:bg-white/5 ${
                                isActive(c.href) ? "text-champagne" : "text-white/70"
                              }`}
                            >
                              <span className="min-w-0">
                                <span className="block">{c.label}</span>
                                {c.note && <span className="mt-0.5 block text-[13px] text-white/40">{c.note}</span>}
                              </span>
                              <Icon name="arrow" size={16} className="shrink-0 text-white/35" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-10">
            <div data-m-fade className="grid grid-cols-2 gap-2.5 md:max-w-md">
              <a
                href={contact.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full py-3 text-[15px] font-medium ring-1 ring-white/15 transition-colors active:bg-white/10"
              >
                <Icon name="phone" size={17} className="text-champagne" /> Call
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-center gap-2 rounded-full py-3 text-[15px] font-medium ring-1 ring-white/15 transition-colors active:bg-white/10"
              >
                <Icon name="mail" size={17} className="text-champagne" /> Email
              </a>
            </div>
            <div data-m-fade className="mt-2.5 md:hidden">
              <Link href="/contact/#enquiry" onClick={() => setMobileOpen(false)} className="btn btn-gold w-full">
                Start a project <Icon name="arrow" size={18} />
              </Link>
            </div>
            <div
              data-m-fade
              className="mt-8 flex items-end justify-between gap-6 border-t border-white/10 pt-5 text-[13px] leading-relaxed text-white/45"
            >
              <p className="max-w-[26ch]">{contact.address}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/pothraj-group-light.webp" alt="Pothraj Group" width={636} height={160} loading="lazy" className="h-6 w-auto shrink-0 opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
