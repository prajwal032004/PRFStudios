"use client";

import { useRef, useState } from "react";
import { Flip } from "gsap/Flip";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { banners, films } from "@/lib/content";
import { FilmPoster } from "./ui";

gsap.registerPlugin(Flip);

const filters = [{ slug: "all", name: "All titles" }, ...banners.filter((b) => b.films?.length).map((b) => ({ slug: b.slug, name: b.name }))];

// Filterable heritage filmography; cards glide into their new positions with Flip.
export default function FilmGrid() {
  const root = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const flipState = useRef<Flip.FlipState | null>(null);

  const choose = (slug: string) => {
    flipState.current = Flip.getState("[data-film]");
    setFilter(slug);
  };

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 0.8,
        ease: "expo.inOut",
        absolute: true,
        stagger: 0.03,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "expo.out" }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.4 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
      flipState.current = null;
    },
    { dependencies: [filter], scope: root },
  );

  return (
    <div ref={root}>
      <div role="group" aria-label="Filter by banner" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.slug}
            type="button"
            aria-pressed={filter === f.slug}
            onClick={() => choose(f.slug)}
            className={`tag transition-colors duration-300 ${
              filter === f.slug ? "bg-carbon text-white" : "bg-sand text-carbon hover:bg-linen"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {films.map((f, i) => {
          const visible = filter === "all" || f.bannerSlug === filter;
          return (
            <li key={f.title} data-film className={visible ? "" : "hidden"} data-flip-id={f.title}>
              <article className="rounded-[8px] p-2 ring-1 ring-ash transition-shadow duration-500 hover:shadow-[var(--shadow-card)]">
                <FilmPoster title={f.title} banner={f.banner} tone={f.tone} index={i} />
                <div className="px-2 pb-2 pt-4">
                  <h3 className="text-[17px] font-serif font-normal tracking-[-0.01em] text-onyx">{f.title}</h3>
                  <p className="text-[14px] text-smoke">
                    {f.language} feature · {f.banner}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
