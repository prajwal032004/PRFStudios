import Link from "next/link";
import { photos, type Photo } from "@/lib/content";
import { JsonLd, breadcrumbLd } from "./JsonLd";
import Icon from "./Icon";
import { PalmCrown } from "./EmblemArt";

export function PageHero({
  eyebrow,
  title,
  lead,
  photo,
  crumbs,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  photo: Photo;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
  compact?: boolean;
}) {
  const img = photos[photo];
  return (
    <section className={`relative isolate flex overflow-hidden bg-midnight text-white ${compact ? "min-h-vp-72" : "min-h-vp-88"}`}>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <div data-parallax="0.18" className="absolute inset-0 -z-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.src} alt={img.alt} fetchPriority="high" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,17,17,0.94)_0%,rgba(17,17,17,0.72)_45%,rgba(17,17,17,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-midnight to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

      <div className="container-x flex w-full flex-col justify-end pb-14 pt-28 md:pb-20 md:pt-40 xl:pb-24 xl:pt-36">
        <Breadcrumbs crumbs={crumbs} />
        <p data-reveal="fade" data-instant className="eyebrow mt-6 text-champagne md:mt-8">
          {eyebrow}
        </p>
        <h1 data-split data-instant className="display-xl mt-4 max-w-[18ch]">
          {title}
        </h1>
        {lead && (
          <p data-reveal data-instant data-delay="0.35" className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75 md:mt-7 md:text-xl">
            {lead}
          </p>
        )}
        {children && (
          <div data-reveal data-instant data-delay="0.5" className="mt-8 md:mt-10">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" data-reveal="fade" data-instant>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-white/55">
        <li>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-white/30">
              /
            </span>
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="text-white/90">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="hover:text-white">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
  center = false,
  action,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-6 md:gap-8 ${center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"}`}
    >
      <div className={center ? "max-w-[min(100%,26em)]" : "md:max-w-[80%] lg:max-w-[60%]"}>
        {center && <PalmCrown draw width={1.3} className={`mx-auto mb-6 h-auto w-16 ${dark ? "text-champagne" : "text-gold"}`} />}
        <p data-reveal="fade" className={`eyebrow ${dark ? "text-champagne" : "text-gold-ink"}`}>
          {eyebrow}
        </p>
        <h2 data-split className={`heading-lg mt-4 max-w-[26ch] ${center ? "mx-auto" : ""} ${dark ? "text-white" : "text-onyx"}`}>
          {title}
        </h2>
        {lead && (
          <p
            data-reveal
            data-delay="0.15"
            className={`mt-5 text-[17px] leading-relaxed md:text-lg ${dark ? "text-white/65" : "text-graphite"} ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
          >
            {lead}
          </p>
        )}
      </div>
      {action && (
        <div data-reveal data-delay="0.2" className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

export function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[15px] font-medium ${dark ? "text-white" : "text-carbon"}`}
    >
      <span className="link-draw">{children}</span>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 ${dark ? "bg-white/10 group-hover:bg-white group-hover:text-carbon" : "bg-sand group-hover:bg-carbon group-hover:text-white"
          }`}
      >
        <Icon name="arrow" size={15} />
      </span>
    </Link>
  );
}

export function FilmPoster({ title, banner, tone, index }: { title: string; banner: string; tone: string; index: number }) {
  return (
    <div className={`grain relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-[4px] bg-gradient-to-br p-5 text-white ${tone}`}>
      <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.18em] text-white/50">
        <span>ಕನ್ನಡ</span>
        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div aria-hidden="true" className="absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[180px] font-serif italic font-light leading-none text-champagne/[0.07]">
        {title.charAt(0)}
      </div>
      <div className="relative">
        <p className="font-serif text-[27px] font-light leading-[1.02] tracking-[-0.01em]">{title}</p>
        <div className="mt-4 h-px w-10 bg-gold" />
        <p className="plex-label mt-3 text-[13px] text-white/60">{banner}</p>
      </div>
    </div>
  );
}
