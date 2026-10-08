import Link from "next/link";
import { banners, disciplines, films, photos } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import Marquee from "@/components/motion/Marquee";
import Magnetic from "@/components/motion/Magnetic";
import DivisionsScroller from "@/components/DivisionsScroller";
import ServicesIndex from "@/components/ServicesIndex";
import { ArrowLink, FilmPoster, SectionHeading } from "@/components/ui";

export const metadata = {
  ...pageMeta({
    title: "Film, Music & Production Studio in Bengaluru",
    description:
      "PRF Studios is a Bengaluru-based integrated film, music, digital-content and production-services platform. Development, shooting floor, recording, dubbing, editing, CG and delivery — since 1994.",
    path: "/",
  }),
  title: { absolute: "PRF Studios — Film, Music & Production Studio in Bengaluru" },
};

const stats = [
  { value: 1994, from: 1960, label: "Our legacy in Kannada cinema begins" },
  { value: 4, label: "Specialist divisions under one roof" },
  { value: 7, label: "Production stages, end to end" },
  { value: 3, label: "Languages in our distribution history" },
];

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------------ Hero */}
      <section className="relative isolate flex min-h-[100svh] overflow-hidden bg-midnight text-white">
        <div data-parallax="0.2" className="absolute inset-0 -z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos.set.src} alt={photos.set.alt} fetchPriority="high" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,0.55)_0%,rgba(17,17,17,0.25)_40%,rgba(17,17,17,0.85)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,17,17,0.7)_0%,rgba(17,17,17,0.1)_65%)]" />
        <div className="grain pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

        <div className="container-x flex min-h-[100svh] flex-col justify-between pb-10 pt-28 md:pb-12 md:pt-32">
          {/* Top: label + editorial headline */}
          <div>
            <p data-reveal="fade" data-instant className="label-wide flex items-center gap-4 text-white/70">
              Est. 1994 — Bengaluru, Karnataka
              <span className="hidden h-px w-12 bg-gold/70 sm:block" />
              <span className="hidden text-white/45 sm:inline">A Pothraj Group company</span>
            </p>
            <h1 data-split data-instant className="display-serif mt-6 text-[#fbf7f0] md:mt-8">
              <span className="block">Stories for</span>
              <span className="block italic text-champagne">generations.</span>
            </h1>
            <p data-reveal="fade" data-instant data-delay="0.6" className="label-wide mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-white/55 md:mt-10">
              {["Stories", "Music", "Technology", "Production"].map((w, i) => (
                <span key={w} className="flex items-center gap-4">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" />}
                  {w}
                </span>
              ))}
            </p>
          </div>

          {/* Bottom: introduction + actions, and the explore link */}
          <div className="mt-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[640px]">
              <p data-reveal data-instant data-delay="0.45" className="text-[17px] leading-relaxed text-white/80 md:text-[19px]">
                An integrated film, music, digital-content and production-services platform in Bengaluru — carrying a
                Kannada cinema legacy into development, shooting floor, recording, dubbing, editing, CG and delivery for
                every screen.
              </p>
              <div data-reveal data-instant data-delay="0.6" className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link href="/contact/#enquiry" className="btn btn-gold">
                    Start a project <Icon name="arrow" size={18} />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="/work/" className="btn btn-ghost">
                    View our work
                  </Link>
                </Magnetic>
              </div>
            </div>

            <div data-reveal="fade" data-instant data-delay="0.8" className="flex items-center justify-between gap-10 lg:flex-col lg:items-end">
              <span className="flex items-center gap-3 text-[13px] text-white/50 lg:order-2">
                <span className="relative flex h-8 w-[18px] justify-center rounded-full ring-1 ring-white/30">
                  <span className="mt-1.5 h-1.5 w-[2px] animate-bounce rounded-full bg-white" />
                </span>
                <span className="hidden sm:inline">Scroll</span>
              </span>
              <Link href="/studio/" className="label-wide group flex items-center gap-4 text-white">
                <span className="h-px w-16 bg-gold transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:w-24" />
                Explore the studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Ticker */}
      <section aria-label="Disciplines" className="border-b border-ash bg-ivory py-7">
        <Marquee items={disciplines} className="text-[clamp(28px,4vw,48px)] font-serif font-normal tracking-[-0.02em] text-carbon" />
      </section>

      {/* ------------------------------------------------------- Intro + stats */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              The studio
            </p>
            <div>
              <p data-scrub-words className="text-[clamp(26px,3.4vw,46px)] font-serif font-light leading-[1.15] tracking-[-0.02em] text-onyx">
                PRF Studios brings creative development, physical production, music, digital content, studio
                infrastructure and post-production together — so a story can travel from idea to every screen without
                leaving one roof.
              </p>
              <div data-reveal className="mt-10">
                <ArrowLink href="/studio/">About the studio</ArrowLink>
              </div>
            </div>
          </div>

          <dl data-stagger className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-ash ring-1 ring-ash lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ivory p-6 md:p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    data-counter={s.value}
                    data-counter-from={s.from ?? 0}
                    className="block font-serif text-[clamp(48px,5.4vw,140px)] font-light leading-none tracking-[-0.03em] text-onyx tabular-nums"
                  >
                    {s.value}
                  </span>
                  <span className="mt-4 block max-w-[22ch] text-[15px] leading-snug text-graphite">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ Divisions */}
      <DivisionsScroller />

      {/* ------------------------------------------------------------- Services */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Services"
            title={<>From first draft to <span className="accent">final delivery.</span></>}
            lead="Bring us the whole production or a single requirement. Every stage is available end-to-end or on its own."
            action={<ArrowLink href="/services/">How we work</ArrowLink>}
          />
          <div className="mt-14">
            <ServicesIndex />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Facilities */}
      <section className="bg-fog">
        <div className="container-x grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-16 lg:py-32">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Facilities
            </p>
            <h2 data-split className="heading-lg mt-4 text-onyx">
              Recording. Dubbing. <span className="accent">Editing. Music.</span>
            </h2>
            <p data-reveal className="mt-5 max-w-lg text-lg leading-relaxed text-graphite">
              A shooting floor, recording and dubbing rooms, editing suites and CG — the infrastructure a production needs,
              in one place and supervised by one team.
            </p>
            <ul data-stagger className="mt-10 grid grid-cols-2 gap-3">
              {[
                { icon: "camera", label: "Shooting floor" },
                { icon: "mic", label: "Recording & dubbing" },
                { icon: "scissors", label: "Editing suites" },
                { icon: "layers", label: "CG & finishing" },
              ].map((f) => (
                <li key={f.label} className="flex items-center gap-3 rounded-[8px] bg-ivory p-4 ring-1 ring-ash">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-gold-ink">
                    <Icon name={f.icon as "mic"} size={20} />
                  </span>
                  <span className="text-[15px] font-medium text-carbon">{f.label}</span>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-10">
              <ArrowLink href="/facilities/">Tour the facilities</ArrowLink>
            </div>
          </div>
          <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[8px] rounded-tl-[60px] lg:aspect-[5/6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.music.src} alt={photos.music.alt} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-[8px] bg-black/45 px-5 py-4 text-white backdrop-blur-md">
              <span className="plex-label">Music recording</span>
              <span className="text-sm text-white/70">PRF Music</span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Legacy */}
      <section className="section-y glow-gold relative overflow-hidden bg-midnight text-white">
        <div className="container-x">
          <SectionHeading
            dark
            eyebrow="Legacy"
            title={<>Built on three decades of <span className="accent">Kannada cinema.</span></>}
            lead="PRF Studios brings together four established banners — in production, music publishing and distribution — whose work stretches back to 1994."
            action={<ArrowLink dark href="/legacy/">Our legacy</ArrowLink>}
          />

          <ul data-stagger className="mt-16 grid gap-px overflow-hidden rounded-[8px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {banners.map((b) => (
              <li key={b.slug} className="flex flex-col bg-midnight p-7">
                <p className="plex-label text-champagne">{b.role}</p>
                <h3 className="mt-3 text-[22px] font-serif font-normal tracking-[-0.01em]">{b.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">{b.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <div className="container-x flex items-end justify-between">
            <p data-reveal className="plex-label text-white">Heritage filmography</p>
            <Link href="/work/" className="link-draw text-sm text-white/70 hover:text-white">
              View all work
            </Link>
          </div>
          <ul
            data-stagger="0.06"
            className="container-x mt-6 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {films.map((f, i) => (
              <li key={f.title} className="w-[210px] shrink-0 snap-start md:w-[230px]">
                <Link href="/work/" data-cursor="View" className="block transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2">
                  <FilmPoster title={f.title} banner={f.banner} tone={f.tone} index={i} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- Ways to work */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading center eyebrow="Working with us" title={<>Two ways to <span className="accent">work with us.</span></>} />
          <div data-stagger className="mt-14 grid gap-5 md:grid-cols-2">
            <article className="relative flex flex-col overflow-hidden rounded-[8px] bg-carbon p-8 text-white md:p-10">
              <span className="tag w-fit bg-gold text-midnight">Most complete</span>
              <h3 className="mt-6 text-[30px] font-serif font-normal tracking-[-0.02em]">End-to-end production</h3>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/65">
                One team carries the project through all seven stages — development, planning, shoot, sound, post, promotion
                and delivery — with a single point of accountability.
              </p>
              <ul className="mt-8 space-y-3 text-[15px] text-white/80">
                {["One producer-side contact throughout", "Integrated schedule and budget", "Music, digital and delivery included"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Icon name="check" size={18} className="text-champagne" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Link href="/contact/#enquiry" className="btn btn-white">
                  Plan a production
                </Link>
              </div>
            </article>
            <article className="flex flex-col rounded-[8px] bg-ivory p-8 ring-1 ring-ash md:p-10">
              <span className="tag w-fit bg-sand text-carbon">Flexible</span>
              <h3 className="mt-6 text-[30px] font-serif font-normal tracking-[-0.02em] text-onyx">Individual services</h3>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-graphite">
                Book exactly what you need — floor time, a recording or dubbing session, an edit suite, CG, or delivery
                support — and plug it into your own production.
              </p>
              <ul className="mt-8 space-y-3 text-[15px] text-carbon">
                {["Book a single stage or facility", "Experienced studio crew on hand", "Scale up to end-to-end at any time"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Icon name="check" size={18} className="text-gold-ink" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Link href="/services/" className="btn btn-outline">
                  Browse services
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Pothraj Group */}
      <section className="border-t border-ash bg-ivory">
        <div className="container-x flex flex-col items-start gap-8 py-14 md:flex-row md:items-center md:justify-between">
          <div data-reveal className="flex items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/pothraj-group-dark.webp" alt="Pothraj Group" width={636} height={160} loading="lazy" className="h-10 w-auto md:h-12" />
          </div>
          <p data-reveal data-delay="0.1" className="max-w-xl text-[15px] leading-relaxed text-graphite">
            PRF Studios is part of the Pothraj Group — a diversified enterprise rooted in Mysuru since 1981, spanning
            infrastructure, hospitality, education, beverages, agri-energy, commerce and media.
          </p>
        </div>
      </section>
    </>
  );
}
