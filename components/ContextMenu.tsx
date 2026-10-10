"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis";
import { site } from "@/lib/site";
import Icon, { type IconName } from "./Icon";

// Site-wide right-click menu. What it offers depends on what was clicked:
// a brand logo, an image, selected text, a link, or the page itself.
// Form fields, the map and Shift + right-click keep the browser's own menu.

type Brand = "prf" | "videa";
type Ctx =
  | { kind: "logo"; brand: Brand }
  | { kind: "image"; src: string; alt: string }
  | { kind: "selection"; text: string }
  | { kind: "link"; href: string; label: string }
  | { kind: "page" };

type Entry =
  | { type: "item"; label: string; icon: IconName; run: () => void | Promise<void>; hint?: string; accent?: boolean }
  | { type: "sep" }
  | { type: "row"; label: string; icon: IconName; chips: { label: string; color: string; run: () => void | Promise<void> }[] };

const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
const absolute = (href: string) => new URL(href, location.href).toString();
const fileName = (src: string) => decodeURIComponent(new URL(src, location.href).pathname.split("/").pop() || "image");

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

// Clipboard images must be PNG — redraw WebP/JPEG through a canvas first.
async function copyImage(src: string) {
  const blob = await (await fetch(src)).blob();
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0);
  const png = await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("encode"))), "image/png"));
  await navigator.clipboard.write([new ClipboardItem({ "image/png": png })]);
}

function download(href: string, name = fileName(href)) {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Link that scrolls to and highlights the selected words (Text Fragments).
function highlightLink(text: string) {
  const enc = (s: string) => encodeURIComponent(s).replace(/-/g, "%2D");
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const frag = words.length > 10 ? `${enc(words.slice(0, 4).join(" "))},${enc(words.slice(-4).join(" "))}` : enc(words.join(" "));
  return `${location.origin}${location.pathname}#:~:text=${frag}`;
}

function detect(target: HTMLElement, x: number, y: number): Ctx | null {
  if (target.closest("input, textarea, select, [contenteditable=''], [contenteditable='true'], iframe, [data-native-menu]")) return null;

  const selection = window.getSelection()?.toString().trim();
  if (selection) return { kind: "selection", text: selection };

  let img = target.closest("img") as HTMLImageElement | null;
  // Photos often sit under gradient / grain overlays. If the click landed on an empty
  // spot (a layer or wrapper, not on any text), look through the stack for the image beneath.
  const ownText = Array.from(target.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
  // Only within the same section — never through the floating navbar, menus or overlays.
  const host = target.closest("section, article, figure, [data-clip]");
  const overlayUi = target.closest("header, nav, footer, [role=dialog], [role=menu], .curtain");
  if (!img && host && !overlayUi && !ownText && !target.closest("a, button, h1, h2, h3, h4, p, li, dt, dd, blockquote, figcaption")) {
    const below = document.elementsFromPoint(x, y).find((el) => el.tagName === "IMG") as HTMLImageElement | undefined;
    img = below && host.contains(below) ? below : null;
  }
  const logoEl = target.closest<HTMLElement>("[data-logo]");
  const src = img?.currentSrc || img?.src || "";
  const isOwnMark = src.includes("/brand/") && !src.includes("pothraj-group");
  if (logoEl || isOwnMark) return { kind: "logo", brand: src.includes("videa") ? "videa" : "prf" };
  if (img && src) return { kind: "image", src, alt: img.alt };

  const a = target.closest("a[href]") as HTMLAnchorElement | null;
  if (a && !a.href.startsWith("javascript:")) {
    const label = (a.getAttribute("aria-label") || a.textContent || "").replace(/\s+/g, " ").trim();
    return { kind: "link", href: a.href, label };
  }
  return { kind: "page" };
}

type Deps = { router: ReturnType<typeof useRouter>; notify: (message: string) => void };

// Builds the actions for a context. Runs when the menu opens (an event handler), not during render.
function makeEntries(ctx: Ctx, { router, notify }: Deps): Entry[] {
  const go = (href: string) => {
    const url = new URL(href, location.href);
    if (url.origin === location.origin) router.push(url.pathname + url.search + url.hash);
    else window.open(url.toString(), "_blank", "noopener");
  };
  const share = async (data: ShareData, fallback: string) => {
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }
    await copyText(fallback);
    notify("Link copied");
  };

  const entries = (ctx: Ctx): Entry[] => {
    switch (ctx.kind) {
      case "selection": {
        const t = ctx.text;
        return [
          { type: "item", label: "Copy", icon: "copy", hint: isMac() ? "⌘C" : "Ctrl+C", run: async () => (await copyText(t), notify("Copied")) },
          {
            type: "item",
            label: "Copy as quote",
            icon: "quote",
            run: async () => (await copyText(`“${t}”\n— ${site.name}, ${location.href.split("#")[0]}`), notify("Quote copied with credit")),
          },
          { type: "item", label: "Copy link to highlight", icon: "highlight", run: async () => (await copyText(highlightLink(t)), notify("Link to this text copied")) },
          { type: "sep" },
          { type: "item", label: "Share selection", icon: "share", run: () => share({ title: site.name, text: `“${t}”`, url: highlightLink(t) }, highlightLink(t)) },
          {
            type: "item",
            label: `Search “${t.length > 22 ? t.slice(0, 22) + "…" : t}”`,
            icon: "search",
            run: () => void window.open(`https://www.google.com/search?q=${encodeURIComponent(t)}`, "_blank", "noopener"),
          },
        ];
      }
      case "logo": {
        const videa = ctx.brand === "videa";
        const base = videa ? "/media-kit/videa-films-logo" : "/media-kit/prf-studios-logo";
        const variants = videa ? ["white", "black", "gold"] : ["gold", "white", "black"];
        const swatch: Record<string, string> = { gold: "#c6a36e", white: "#fbf8f2", black: "#12100c" };
        return [
          { type: "item", label: "Go to home", icon: "home", run: () => go("/") },
          {
            type: "row",
            label: "Download logo",
            icon: "download",
            chips: variants.map((v) => ({
              label: v[0].toUpperCase() + v.slice(1),
              color: swatch[v],
              run: () => (download(`${base}-${v}.png`), notify(`${videa ? "Videa Films" : "PRF Studios"} logo · ${v} PNG`)),
            })),
          },
          { type: "sep" },
          { type: "item", label: "Media & press kit", icon: "layers", run: () => go("/media/") },
          {
            type: "item",
            label: "Copy brand line",
            icon: "copy",
            run: async () => (await copyText(videa ? "Videa Films — A Pothraj Company" : "PRF Studios — A Pothraj Company"), notify("Brand line copied")),
          },
        ];
      }
      case "image":
        return [
          { type: "item", label: "Open image in new tab", icon: "external", run: () => void window.open(ctx.src, "_blank", "noopener") },
          { type: "item", label: "Save image", icon: "download", run: () => (download(ctx.src), notify("Saving image")) },
          {
            type: "item",
            label: "Copy image",
            icon: "image",
            run: async () => {
              try {
                await copyImage(ctx.src);
                notify("Image copied");
              } catch {
                await copyText(absolute(ctx.src));
                notify("Image address copied");
              }
            },
          },
          { type: "item", label: "Copy image address", icon: "link", run: async () => (await copyText(absolute(ctx.src)), notify("Image address copied")) },
          { type: "sep" },
          { type: "item", label: "Share this page", icon: "share", run: () => share({ title: document.title, url: location.href }, location.href) },
        ];
      case "link": {
        const internal = new URL(ctx.href).origin === location.origin;
        return [
          { type: "item", label: internal ? "Open" : "Open link", icon: "arrow", run: () => go(ctx.href) },
          { type: "item", label: "Open in new tab", icon: "external", run: () => void window.open(ctx.href, "_blank", "noopener") },
          { type: "item", label: "Copy link address", icon: "link", run: async () => (await copyText(ctx.href), notify("Link copied")) },
          { type: "sep" },
          { type: "item", label: "Share link", icon: "share", run: () => share({ title: ctx.label || site.name, url: ctx.href }, ctx.href) },
        ];
      }
      default:
        return [
          { type: "item", label: "Copy page link", icon: "link", run: async () => (await copyText(location.href.split("#")[0]), notify("Page link copied")) },
          { type: "item", label: "Share this page", icon: "share", run: () => share({ title: document.title, url: location.href }, location.href) },
          { type: "item", label: "Back to top", icon: "arrowUp", run: () => scrollToTarget(0) },
          { type: "sep" },
          { type: "item", label: "Start a project", icon: "spark", accent: true, run: () => go("/contact/#enquiry") },
          { type: "item", label: "Films & current slate", icon: "film", run: () => go("/films/") },
          { type: "item", label: "Media & press kit", icon: "layers", run: () => go("/media/") },
        ];
    }
  };
  return entries(ctx);
}

export default function ContextMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const menu = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<{ x: number; y: number; ctx: Ctx; items: Entry[] } | null>(null);
  const [toast, setToast] = useState("");

  const close = useCallback((restoreFocus = false) => {
    const el = menu.current;
    if (!el) return setState(null);
    gsap.to(el, {
      autoAlpha: 0,
      scale: 0.97,
      duration: 0.14,
      ease: "power2.in",
      overwrite: true,
      onComplete: () => {
        setState(null);
        if (restoreFocus) lastFocus.current?.focus({ preventScroll: true });
      },
    });
  }, []);

  const notify = useCallback((message: string) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    const el = toastRef.current;
    if (el) {
      gsap.fromTo(el, { autoAlpha: 0, y: 14, xPercent: -50 }, { autoAlpha: 1, y: 0, xPercent: -50, duration: 0.4, ease: "expo.out", overwrite: true });
      toastTimer.current = setTimeout(() => gsap.to(el, { autoAlpha: 0, y: 8, duration: 0.3, ease: "power2.in" }), 1800);
    }
  }, []);

  // Open on right-click (and the keyboard menu key / Shift+F10).
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return; // touch keeps native long-press
    const onContext = (e: MouseEvent) => {
      if (e.shiftKey) return; // escape hatch to the browser menu
      const target = e.target as HTMLElement;
      const ctx = detect(target, e.clientX, e.clientY);
      if (!ctx) return;
      e.preventDefault();
      lastFocus.current = document.activeElement as HTMLElement;
      let { clientX: x, clientY: y } = e;
      if (x === 0 && y === 0) {
        const r = target.getBoundingClientRect();
        x = r.left + Math.min(24, r.width / 2);
        y = r.top + Math.min(24, r.height / 2);
      }
      setState({ x, y, ctx, items: makeEntries(ctx, { router, notify }) });
    };
    document.addEventListener("contextmenu", onContext);
    return () => document.removeEventListener("contextmenu", onContext);
  }, [router, notify]);

  // Close on anything that moves the page out from under the menu.
  useEffect(() => {
    if (!state) return;
    const onDown = (e: PointerEvent) => {
      if (!menu.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
      }
    };
    const dismiss = () => close();
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("wheel", dismiss, { passive: true });
    window.addEventListener("resize", dismiss);
    window.addEventListener("blur", dismiss);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("resize", dismiss);
      window.removeEventListener("blur", dismiss);
    };
  }, [state, close]);

  // Route change: drop the menu without animating.
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setState(null);
  }

  // Position inside the viewport, then animate in from the cursor corner.
  useLayoutEffect(() => {
    const el = menu.current;
    if (!state || !el) return;
    const pad = 10;
    const { width, height } = el.getBoundingClientRect();
    const flipX = state.x + width + pad > innerWidth;
    const flipY = state.y + height + pad > innerHeight;
    const left = Math.max(pad, flipX ? state.x - width : state.x);
    const top = Math.max(pad, flipY ? Math.max(pad, state.y - height) : state.y);
    gsap.set(el, { left, top, transformOrigin: `${flipX ? "right" : "left"} ${flipY ? "bottom" : "top"}` });
    gsap.fromTo(el, { autoAlpha: 0, scale: 0.94, y: flipY ? 6 : -6 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.32, ease: "expo.out", overwrite: true });
    gsap.fromTo(el.querySelectorAll("[data-cm-anim]"), { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.018, ease: "power2.out", delay: 0.04 });
    el.querySelector<HTMLElement>("[role=menuitem]")?.focus({ preventScroll: true });
  }, [state]);

  const run = async (fn: () => void | Promise<void>) => {
    close();
    try {
      await fn();
    } catch {
      notify("That didn’t work — please try again");
    }
  };

  // Arrow-key navigation across every actionable control in the menu.
  const onMenuKey = (e: React.KeyboardEvent) => {
    const items = Array.from(menu.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? []);
    const i = items.indexOf(document.activeElement as HTMLElement);
    const move = (n: number) => {
      e.preventDefault();
      items[(n + items.length) % items.length]?.focus();
    };
    if (e.key === "ArrowDown") move(i + 1);
    else if (e.key === "ArrowUp") move(i - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(items.length - 1);
    else if (e.key === "Tab") close();
  };

  const header = (ctx: Ctx) => {
    switch (ctx.kind) {
      case "selection":
        return { icon: "quote" as IconName, title: "Selected text", sub: `“${ctx.text.length > 46 ? ctx.text.slice(0, 46) + "…" : ctx.text}”` };
      case "logo":
        return { icon: "spark" as IconName, title: ctx.brand === "videa" ? "Videa Films logo" : "PRF Studios logo", sub: site.descriptor };
      case "image":
        return { icon: "image" as IconName, title: "Image", sub: ctx.alt || fileName(ctx.src), thumb: ctx.src };
      case "link": {
        const u = new URL(ctx.href);
        return { icon: "link" as IconName, title: ctx.label.slice(0, 40) || "Link", sub: u.origin === location.origin ? u.pathname : u.host + u.pathname };
      }
      default:
        return { icon: "globe" as IconName, title: document.title.split("|")[0].trim() || site.name, sub: location.pathname };
    }
  };

  const ctx = state?.ctx;
  const head = ctx ? header(ctx) : null;

  return (
    <>
      {state && ctx && head && (
        <div
          ref={menu}
          role="menu"
          aria-label={`${head.title} menu`}
          onKeyDown={onMenuKey}
          onContextMenu={(e) => e.preventDefault()}
          className="invisible fixed z-[120] w-[264px] overflow-hidden rounded-[14px] bg-midnight/92 p-1.5 text-[14px] text-white shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_0_1px_rgba(198,163,110,0.22)] backdrop-blur-xl backdrop-saturate-150"
        >
          {/* Context header */}
          <div data-cm-anim className="flex items-center gap-3 border-b border-white/10 px-2.5 pb-2.5 pt-2">
            {"thumb" in head && head.thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={head.thumb} alt="" className="h-9 w-9 shrink-0 rounded-[6px] object-cover ring-1 ring-white/15" />
            ) : ctx.kind === "logo" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/brand/prf-emblem-gold.webp" alt="" className="h-9 w-9 shrink-0 object-contain" />
            ) : (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon name={head.icon} size={17} />
              </span>
            )}
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-white">{head.title}</span>
              <span className="block truncate text-[11.5px] text-white/45">{head.sub}</span>
            </span>
          </div>

          {/* Page context: browser-style navigation row */}
          {ctx.kind === "page" && (
            <div data-cm-anim className="grid grid-cols-3 gap-1 border-b border-white/10 p-1.5">
              {(
                [
                  ["Back", "back", () => history.back()],
                  ["Forward", "arrow", () => history.forward()],
                  ["Reload", "reload", () => location.reload()],
                ] as const
              ).map(([label, icon, fn]) => (
                <button
                  key={label}
                  type="button"
                  role="menuitem"
                  aria-label={label}
                  title={label}
                  onClick={() => run(fn)}
                  className="flex h-9 items-center justify-center rounded-[8px] text-white/70 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white"
                >
                  <Icon name={icon} size={17} />
                </button>
              ))}
            </div>
          )}

          <div className="pt-1">
            {state.items.map((entry, i) => {
              if (entry.type === "sep") return <div key={i} data-cm-anim className="mx-2.5 my-1 h-px bg-white/10" />;
              if (entry.type === "row")
                return (
                  <div key={i} data-cm-anim className="flex items-center gap-3 rounded-[8px] px-2.5 py-2">
                    <Icon name={entry.icon} size={17} className="shrink-0 text-white/55" />
                    <span className="flex-1 text-white/80">{entry.label}</span>
                    <span className="flex items-center gap-1.5">
                      {entry.chips.map((c) => (
                        <button
                          key={c.label}
                          type="button"
                          role="menuitem"
                          aria-label={`${entry.label}: ${c.label}`}
                          title={c.label}
                          onClick={() => run(c.run)}
                          style={{ background: c.color }}
                          className="h-[18px] w-[18px] rounded-full outline-none ring-1 ring-white/25 transition-transform duration-200 hover:scale-125 focus-visible:scale-125 focus-visible:ring-2 focus-visible:ring-gold"
                        />
                      ))}
                    </span>
                  </div>
                );
              return (
                <button
                  key={i}
                  type="button"
                  role="menuitem"
                  data-cm-anim
                  onClick={() => run(entry.run)}
                  className={`group flex w-full items-center gap-3 rounded-[8px] px-2.5 py-2 text-left outline-none transition-colors duration-150 ${
                    entry.accent
                      ? "text-champagne hover:bg-gold hover:text-midnight focus-visible:bg-gold focus-visible:text-midnight"
                      : "text-white/85 hover:bg-white/[0.09] hover:text-white focus-visible:bg-white/[0.09] focus-visible:text-white"
                  }`}
                >
                  <Icon
                    name={entry.icon}
                    size={17}
                    className={`shrink-0 transition-colors ${entry.accent ? "" : "text-white/55 group-hover:text-gold group-focus-visible:text-gold"}`}
                  />
                  <span className="flex-1 truncate">{entry.label}</span>
                  {entry.hint && <span className="text-[11.5px] text-white/35">{entry.hint}</span>}
                </button>
              );
            })}
          </div>

          <p data-cm-anim className="mt-1 border-t border-white/10 px-2.5 pb-1 pt-2 text-[11px] text-white/35">
            <kbd className="font-sans">⇧ Shift</kbd> + right-click for the browser menu
          </p>
        </div>
      )}

      {/* Feedback toast */}
      <div
        ref={toastRef}
        role="status"
        aria-live="polite"
        className="pointer-events-none invisible fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-[121] flex items-center gap-2.5 rounded-full bg-midnight/95 py-2.5 pl-3 pr-4 text-[14px] text-white opacity-0 shadow-[0_14px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(198,163,110,0.3)] backdrop-blur-xl"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-midnight">
          <Icon name="check" size={14} strokeWidth={2.2} />
        </span>
        {toast}
      </div>
    </>
  );
}
