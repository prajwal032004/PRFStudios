import Link from "next/link";
import { banners, films, photos, studioStats } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon, { type IconName } from "@/components/Icon";
import { ArrowLink, FilmPoster, PageHero, SectionHeading } from "@/components/ui";
import { CrownWatermark, LeafPetal, RootsDivider } from "@/components/EmblemArt";

export const metadata = pageMeta({
  title: "Heritage — Since 1994",
  description:
    "The story behind PRF Studios: Swati Movies, Saptaswara Audio Company, Sri Raghavendra Films and Shivashakti Cine Combines — production, music publishing and distribution across Kannada, Tamil and Telugu cinema, with selected Hindi titles, since 1994.",
  path: "/legacy/",
  photo: "cinema",
  keywords: ["Swati Movies", "Saptaswara Audio", "Sri Raghavendra Films", "Shivashakti Cine Combines", "Kannada cinema history"],
});

const banner = (slug: string) => banners.find((b) => b.slug === slug)!;
const postersOf = (slug: string) => films.filter((f) => f.bannerSlug === slug);
const filmIndex = (title: string) => films.findIndex((f) => f.title === title);

const LANGUAGES = ["Kannada", "Tamil", "Telugu", "Hindi"];

type Chapter = {
  mark: string;
  role: string;
  icon: IconName;
  title: string;
  text: string;
  extra: "posters" | "catalogue" | "languages" | "today" | null;
  slug?: string;
};

const chapters: Chapter[] = [
  { ...pick("swati-movies"), icon: "film", extra: "posters" },
  { ...pick("saptaswara-audio"), icon: "mic", extra: "catalogue" },
  { ...pick("sri-raghavendra-films"), icon: "camera", extra: "posters" },
  { ...pick("shivashakti-cine-combines"), icon: "globe", extra: "languages" },
  {
    mark: "Today",
    role: "One integrated platform",
    icon: "spark",
    title: "PRF Studios",
    text: "The banners come together as one integrated platform for film, music, digital content and production services — with Videa Films, PRF Music and PRF Digital alongside.",
    extra: "today",
  },
];

function pick(slug: string) {
  const b = banner(slug);
  return { mark: b.mark, role: b.role, title: b.name, text: b.description, slug };
}

// How each historic strength lives on in today's studio.
const lineage = [
  {
    then: "Film production",
    from: "Swati Movies · Sri Raghavendra Films",
    now: "Videa Films",
    text: "Feature-film development and production for theatrical, satellite, digital and international audiences.",
    href: "/divisions/videa-films/",
    icon: "film" as IconName,
  },
  {
    then: "Music publishing",
    from: "Saptaswara Audio Company",
    now: "PRF Music",
    text: "Soundtracks, independent, devotional and regional music, artist collaborations and catalogue stewardship.",
    href: "/divisions/prf-music/",
    icon: "mic" as IconName,
  },
  {
    then: "Film distribution",
    from: "Shivashakti Cine Combines",
    now: "Delivery & distribution",
    text: "Content packaging, platform-ready delivery and distribution coordination for every release window.",
    href: "/services/delivery-support/",
    icon: "globe" as IconName,
  },
];

export default function LegacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Heritage since 1994"
        title="Historic banners. One contemporary identity."
        lead="PRF Studios consolidates production, music publishing and distribution experience accumulated through earlier group banners over more than three decades."
        photo="cinema"
        crumbs={[{ name: "Heritage", path: "/legacy/" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="#chapters" className="btn btn-gold">
            Read the story <Icon name="arrow" size={18} className="rotate-90" />
          </Link>
          <Link href="/films/" className="btn btn-ghost">
            Today&apos;s slate
          </Link>
        </div>
      </PageHero>

      {/* ------------------------------------------------------------ Numbers */}
      <section aria-label="Legacy in numbers" className="border-b border-ash bg-ivory">
        <div className="container-x py-14 md:py-16">
          <dl data-stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-ash ring-1 ring-ash md:grid-cols-5">
            {[...studioStats, { value: LANGUAGES.length, suffix: "", label: "Languages distributed", from: 0 }].map((s, i) => (
              <div key={s.label} className={`bg-ivory p-5 md:p-6 ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    data-counter={s.value}
                    data-counter-from={"from" in s ? (s.from ?? 0) : 0}
                    data-counter-suffix={s.suffix}
                    className="block font-serif text-[clamp(38px,9vw,52px)] font-light leading-none tracking-[-0.03em] text-onyx tabular-nums md:text-[clamp(40px,4.4vw,64px)]"
                  >
                    {s.value}
                    {s.suffix}
                  </span>
                  <span className="mt-3 block text-[14px] leading-snug text-graphite">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ----------------------------------------------------------- Chapters */}
      <section id="chapters" className="section-y scroll-mt-16 bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Five chapters"
            title={<>Four banners. <span className="accent">One lineage.</span></>}
            lead="Production, music publishing and distribution — each banner added a strength the studio still relies on."
          />

          <ol className="relative mt-14 md:mt-20">
            {/* the gold line draws down the spine as the story scrolls past */}
            <span aria-hidden="true" data-progress-line className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gold md:left-[220px] xl:left-[280px]" />
            {chapters.map((c, i) => (
              <li
                key={c.title}
                className="relative grid border-l border-ash pb-16 pl-7 last:pb-0 md:grid-cols-[220px_1fr] md:border-l-0 md:pb-24 md:pl-0 xl:grid-cols-[280px_1fr]"
              >
                <span aria-hidden="true" className="absolute -left-[6px] top-2 h-[11px] w-[11px] rounded-full border border-gold bg-ivory md:hidden" />

                {/* Mark column */}
                <div data-reveal className="mb-6 md:mb-0 md:pr-10 md:text-right">
                  <p className="plex-label text-[12px] text-smoke">Chapter {String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-serif text-[clamp(52px,12vw,76px)] font-light leading-none tracking-[-0.03em] text-gold-ink md:text-[clamp(56px,6vw,88px)]">
                    {c.mark}
                  </p>
                </div>

                {/* Story column */}
                <div className="relative min-w-0 md:border-l md:border-ash md:pl-12 xl:pl-16">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[7px] top-2 hidden h-[13px] w-[13px] rounded-full md:block ${
                      i === chapters.length - 1 ? "bg-gold" : "border-2 border-gold bg-ivory"
                    }`}
                  />
                  <p data-reveal="fade" className="flex items-center gap-2.5 plex-label text-gold-ink">
                    <Icon name={c.icon} size={16} /> {c.role}
                  </p>
                  <h2 data-split className="mt-3 font-serif text-[clamp(30px,6vw,40px)] font-normal leading-[1.08] tracking-[-0.02em] text-onyx md:text-[clamp(36px,3.4vw,52px)]">
                    {c.title}
                  </h2>
                  <p data-reveal className="mt-4 max-w-2xl text-[17px] leading-relaxed text-graphite md:text-lg">
                    {c.text}
                  </p>

                  {c.extra === "posters" && c.slug && (
                    <ul
                      data-stagger="0.08"
                      className="-mr-[var(--gutter)] mt-8 flex max-w-2xl gap-3 overflow-x-auto pb-2 pr-[var(--gutter)] [scrollbar-width:none] sm:mr-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pr-0 md:gap-4 [&::-webkit-scrollbar]:hidden"
                    >
                      {postersOf(c.slug).map((f) => (
                        <li
                          key={f.title}
                          className="w-[44vw] max-w-[180px] shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 sm:w-auto sm:max-w-none"
                        >
                          <FilmPoster title={f.title} banner={f.banner} tone={f.tone} index={filmIndex(f.title)} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {c.extra === "catalogue" && (
                    <dl data-stagger className="mt-8 grid max-w-2xl gap-px overflow-hidden rounded-[8px] bg-ash ring-1 ring-ash sm:grid-cols-3">
                      {[
                        ["150+", "Music titles published"],
                        ["45–50", "Devotional titles (approx.)"],
                        ["Lahari Music", "Later acquired a significant portion of the devotional catalogue"],
                      ].map(([v, l]) => (
                        <div key={l} className="bg-fog p-5">
                          <dt className="sr-only">{l}</dt>
                          <dd>
                            <span className="block font-serif text-[30px] font-light leading-tight tracking-[-0.02em] text-onyx">{v}</span>
                            <span className="mt-1.5 block text-[14px] leading-snug text-graphite">{l}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {c.extra === "languages" && (
                    <ul data-stagger="0.06" className="mt-8 flex max-w-2xl flex-wrap gap-2.5">
                      {LANGUAGES.map((l) => (
                        <li key={l} className="tag bg-sand py-2 pl-3 pr-4 text-[15px] text-carbon">
                          <LeafPetal className="h-auto w-4 text-gold-ink" />
                          {l}
                          {l === "Hindi" && <span className="text-smoke">· selected titles</span>}
                        </li>
                      ))}
                    </ul>
                  )}

                  {c.extra === "today" && (
                    <ul data-stagger="0.06" className="mt-8 flex max-w-2xl flex-wrap gap-2.5">
                      {[
                        ["Videa Films", "/divisions/videa-films/"],
                        ["PRF Music", "/divisions/prf-music/"],
                        ["PRF Digital", "/divisions/prf-digital/"],
                        ["Studio services", "/divisions/production-services/"],
                      ].map(([label, href]) => (
                        <li key={label}>
                          <Link
                            href={href}
                            className="tag group bg-carbon py-2 pl-4 pr-3 text-[15px] text-white transition-colors duration-300 hover:bg-gold hover:text-midnight"
                          >
                            {label}
                            <Icon name="arrowUpRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- Then → Now */}
      <section className="section-y root-lattice glow-gold relative isolate overflow-hidden bg-midnight text-white">
        <CrownWatermark className="-right-[16%] top-[6%] w-[80vw] max-w-[760px] md:w-[44vw]" />
        <div className="container-x">
          <SectionHeading
            dark
            eyebrow="Then → Now"
            title={<>The same strengths, <span className="accent">carried forward.</span></>}
            lead="The purpose is not to erase earlier identities, but to carry their experience, relationships and catalogue knowledge into one modern studio."
          />
          <ol data-stagger className="mt-12 grid gap-px overflow-hidden rounded-[8px] bg-white/10 md:mt-16 lg:grid-cols-3">
            {lineage.map((l) => (
              <li key={l.now} className="flex flex-col bg-midnight/95 p-6 md:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon name={l.icon} size={20} />
                </span>
                <p className="plex-label mt-6 text-[12px] text-white/45">Then · {l.then}</p>
                <p className="mt-1 text-[15px] text-white/70">{l.from}</p>
                <div aria-hidden="true" className="my-5 flex items-center gap-3 text-gold">
                  <span className="h-px flex-1 bg-gradient-to-r from-gold/0 via-gold/60 to-gold" />
                  <Icon name="arrow" size={16} />
                </div>
                <p className="plex-label text-[12px] text-champagne">Now</p>
                <h3 className="mt-1 font-serif text-[28px] font-normal tracking-[-0.02em]">{l.now}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{l.text}</p>
                <div className="mt-auto pt-7">
                  <ArrowLink dark href={l.href}>
                    Explore
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------- Filmography rail */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Heritage filmography"
            title="Kannada features from the historic banners."
            action={<ArrowLink href="/films/">Today&apos;s slate</ArrowLink>}
          />
        </div>
        <ul data-stagger="0.06" className="swipe-rail mt-10 gap-3 pb-4 md:mt-14 md:gap-4">
          {films.map((f, i) => (
            <li key={f.title} className="w-[min(46vw,210px)] shrink-0 md:w-[230px]">
              <div className="transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2">
                <FilmPoster title={f.title} banner={f.banner} tone={f.tone} index={i} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ----------------------------------------------------------- Purpose */}
      <section className="section-y bg-sand">
        <div className="container-x">
          <RootsDivider className="mb-12 md:mb-16" />
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote data-split className="font-serif text-[clamp(28px,4.2vw,56px)] font-light leading-[1.16] tracking-[-0.02em] text-onyx">
              Not to erase earlier identities — but to carry forward their experience, relationships and catalogue
              knowledge within one modern, technology-aware studio.
            </blockquote>
            <figcaption data-reveal className="plex-label mt-8 text-gold-ink">
              The purpose of PRF Studios
            </figcaption>
          </figure>
        </div>
      </section>

      {/* --------------------------------------------------------- Closing */}
      <section className="relative isolate overflow-hidden bg-midnight text-white">
        <div data-parallax="0.15" className="absolute inset-0 -z-10 opacity-45">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos.music.src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/75 to-midnight/45" />
        <div className="container-x py-24 text-center md:py-32 xl:py-40">
          <p data-reveal="fade" className="eyebrow text-champagne">
            Kannada · Tamil · Telugu · Selected Hindi titles
          </p>
          <p data-split className="display mx-auto mt-5 max-w-[22ch]">
            Rooted in Karnataka. Made for every screen.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/films/" className="btn btn-gold">
              Explore the current slate <Icon name="arrow" size={18} />
            </Link>
            <Link href="/studio/" className="btn btn-ghost">
              About PRF Studios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
