import Link from "next/link";
import { banners, disciplines, films, photos, studioStats } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import Marquee from "@/components/motion/Marquee";
import Magnetic from "@/components/motion/Magnetic";
import DivisionsScroller from "@/components/DivisionsScroller";
import ServicesIndex from "@/components/ServicesIndex";
import SlateCards from "@/components/SlateCards";
import Philosophy from "@/components/Philosophy";
import { ArrowLink, FilmPoster, SectionHeading } from "@/components/ui";

export const metadata = {
  ...pageMeta({
    title: "Film, Music & Production Studio in Bengaluru",
    description:
      "PRF Studios is a Bengaluru-based integrated film, music, digital-content and production-services platform. Development, shooting floor, music recording, editing, CG and delivery — with a legacy since 1994.",
    path: "/",
  }),
  title: { absolute: "PRF Studios — Film, Music & Production Studio in Bengaluru" },
};

// Legacy timeline: 1994 → the four banners → today
const timeline = [
  ...banners.map((b) => ({ mark: b.mark, title: b.name, text: `${b.role} · ${b.metric}` })),
  { mark: "Today", title: "PRF Studios", text: "One integrated entertainment platform" },
];

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------------ Hero */}
      <section className="relative isolate flex min-h-vp-100 overflow-hidden bg-midnight text-white">
        <div data-parallax="0.2" className="absolute inset-0 -z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos.set.src} alt={photos.set.alt} fetchPriority="high" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(17,17,17,0.55)_0%,rgba(17,17,17,0.25)_40%,rgba(17,17,17,0.85)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,17,17,0.7)_0%,rgba(17,17,17,0.1)_65%)]" />
        <div className="grain pointer-events-none absolute inset-0 -z-10 overflow-hidden" />

        <div className="container-x flex min-h-vp-100 w-full flex-col justify-between pb-[max(2rem,env(safe-area-inset-bottom))] pt-24 md:pb-12 md:pt-36 xl:pt-32">
          {/* Top: label + editorial headline */}
          <div>
            <p data-reveal="fade" data-instant className="label-wide flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70">
              Est. 1994 — Bengaluru, Karnataka
              <span className="hidden h-px w-12 bg-gold/70 md:block" />
              <span className="hidden text-white/45 md:inline">A Pothraj Group company</span>
            </p>
            <h1 data-split data-instant className="display-serif mt-5 text-[#fbf7f0] md:mt-8">
              <span className="block">Stories for</span>
              <span className="block italic text-champagne">generations.</span>
            </h1>
            <p data-reveal="fade" data-instant data-delay="0.6" className="label-wide mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-white/55 md:mt-10 md:gap-x-4">
              {["Stories", "Music", "Technology", "Production"].map((w, i) => (
                <span key={w} className="flex items-center gap-3 md:gap-4">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" />}
                  {w}
                </span>
              ))}
            </p>
          </div>

          {/* Bottom: introduction + actions, and the explore link */}
          <div className="mt-12 flex flex-col gap-8 md:mt-16 md:gap-10 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-[640px]">
              <p data-reveal data-instant data-delay="0.45" className="text-[16px] leading-relaxed text-white/80 md:text-[19px]">
                An integrated film, music, digital-content and production-services platform in Bengaluru — carrying a
                Kannada cinema legacy into development, production, music, editing, CG and delivery for every
                screen.
              </p>
              <div data-reveal data-instant data-delay="0.6" className="mt-7 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap min-[420px]:items-center md:mt-8">
                <Magnetic className="w-full min-[420px]:w-auto">
                  <Link href="/contact/#enquiry" className="btn btn-gold w-full min-[420px]:w-auto">
                    Start a project <Icon name="arrow" size={18} />
                  </Link>
                </Magnetic>
                <Magnetic className="w-full min-[420px]:w-auto">
                  <Link href="/work/" className="btn btn-ghost w-full min-[420px]:w-auto">
                    View our work
                  </Link>
                </Magnetic>
              </div>
            </div>

            <div data-reveal="fade" data-instant data-delay="0.8" className="flex items-center justify-between gap-10 xl:flex-col xl:items-end">
              <span className="flex items-center gap-3 text-[13px] text-white/50 xl:order-2">
                <span className="relative flex h-8 w-[18px] justify-center rounded-full ring-1 ring-white/30">
                  <span className="mt-1.5 h-1.5 w-[2px] animate-bounce rounded-full bg-white" />
                </span>
                <span className="hidden md:inline">Scroll</span>
              </span>
              <Link href="/studio/" className="label-wide group flex items-center gap-4 text-white">
                <span className="h-px w-10 bg-gold transition-all md:w-16 duration-700 ease-[var(--ease-out-expo)] group-hover:w-24" />
                Explore the studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Ticker */}
      <section aria-label="Disciplines" className="border-b border-ash bg-ivory py-5 md:py-7">
        <Marquee items={disciplines} className="text-[clamp(26px,4.4vw,48px)] font-serif font-normal tracking-[-0.02em] text-carbon" />
      </section>

      {/* ------------------------------------------------------- Intro + stats */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-[150px_1fr] md:gap-10 xl:grid-cols-[220px_1fr]">
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              The studio
            </p>
            <div>
              <p data-scrub-words className="text-[clamp(24px,6.6vw,30px)] md:text-[clamp(30px,4vw,40px)] xl:text-[clamp(36px,3.4vw,46px)] font-serif font-light leading-[1.15] tracking-[-0.02em] text-onyx">
                PRF Studios brings creative development, physical production, music, digital content, studio
                infrastructure and post-production together — so a story can travel from idea to every screen without
                leaving one roof.
              </p>
              <div data-reveal className="mt-10">
                <ArrowLink href="/studio/">About the studio</ArrowLink>
              </div>
            </div>
          </div>

          <dl data-stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-ash ring-1 ring-ash md:mt-20 md:grid-cols-3 xl:grid-cols-5">
            {studioStats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-ivory p-5 md:p-6 xl:p-8 ${i === 0 ? "col-span-2 md:col-span-1" : ""} ${
                  i === studioStats.length - 1 ? "md:col-span-2 xl:col-span-1" : ""
                }`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    data-counter={s.value}
                    data-counter-from={s.from ?? 0}
                    data-counter-suffix={s.suffix}
                    className="block font-serif text-[clamp(38px,11vw,56px)] md:text-[clamp(44px,6vw,64px)] xl:text-[clamp(56px,4.4vw,120px)] font-light leading-none tracking-[-0.03em] text-onyx tabular-nums"
                  >
                    {s.value}
                    {s.suffix}
                  </span>
                  <span className="mt-3 block max-w-[22ch] text-[14px] leading-snug text-graphite md:mt-4 md:text-[15px]">{s.label}</span>
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
          <div className="mt-10 md:mt-14">
            <ServicesIndex />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Facilities */}
      <section className="bg-fog">
        <div className="container-x grid items-center gap-10 py-20 md:gap-12 md:py-24 lg:grid-cols-2 lg:gap-16 xl:py-32">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Facilities
            </p>
            <h2 data-split className="heading-lg mt-4 text-onyx">
              Shoot. Edit. <span className="accent">Sound. Music.</span>
            </h2>
            <p data-reveal className="mt-5 max-w-lg text-[17px] leading-relaxed text-graphite md:text-lg">
              A full-fledged shooting floor near Bengaluru, and a post-production and music facility in the city — editing
              suites, computer graphics, music recording and sound, coordinated as one workflow.
            </p>
            <ul data-stagger className="mt-8 grid grid-cols-2 gap-2.5 md:mt-10 md:grid-cols-4 md:gap-3 lg:grid-cols-2">
              {[
                { icon: "camera", label: "Shooting floor" },
                { icon: "mic", label: "Music recording" },
                { icon: "scissors", label: "Editing suites" },
                { icon: "layers", label: "CG & finishing" },
              ].map((f) => (
                <li key={f.label} className="flex flex-col items-start gap-3 rounded-[8px] bg-ivory p-4 ring-1 ring-ash sm:flex-row sm:items-center md:flex-col md:items-start xl:flex-row xl:items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-gold-ink">
                    <Icon name={f.icon as "mic"} size={20} />
                  </span>
                  <span className="text-[14px] font-medium leading-snug text-carbon md:text-[15px]">{f.label}</span>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-10">
              <ArrowLink href="/facilities/">Tour the facilities</ArrowLink>
            </div>
          </div>
          <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[8px] rounded-tl-[40px] md:aspect-[16/10] md:rounded-tl-[60px] lg:aspect-[5/6]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.music.src} alt={photos.music.alt} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-[8px] bg-black/45 px-4 py-3 text-white backdrop-blur-md md:bottom-5 md:left-5 md:right-5 md:px-5 md:py-4">
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
            title={<>A legacy that began <span className="accent">in 1994.</span></>}
            lead="PRF Studios is the contemporary expression of an entertainment journey built across film production, music publishing and film distribution."
            action={<ArrowLink dark href="/legacy/">Our legacy</ArrowLink>}
          />

          {/* 1994 → Today: the line draws as the section scrolls through */}
          <div className="relative mt-12 md:mt-16">
            <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10 xl:hidden" />
            <span aria-hidden="true" data-draw="y" className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gold xl:hidden" />
            <span aria-hidden="true" className="absolute inset-x-0 top-[5px] hidden h-px bg-white/10 xl:block" />
            <span aria-hidden="true" data-draw="x" className="absolute inset-x-0 top-[5px] hidden h-px origin-left bg-gold xl:block" />
            <ol data-stagger="0.12" className="grid gap-9 md:grid-cols-2 md:gap-x-10 xl:grid-cols-5 xl:gap-6">
              {timeline.map((t, i) => (
                <li key={t.title} className="relative pl-8 xl:pl-0 xl:pt-10">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1 h-[11px] w-[11px] rounded-full ring-4 ring-midnight xl:top-0 ${
                      i === timeline.length - 1 ? "bg-gold" : "border border-gold bg-midnight"
                    }`}
                  />
                  <p className="font-serif text-[clamp(34px,8vw,48px)] font-light leading-none tracking-[-0.02em] text-champagne xl:text-[44px]">
                    {t.mark}
                  </p>
                  <h3 className="mt-3 text-[20px] font-serif font-normal tracking-[-0.01em]">{t.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/55">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="container-x flex items-end justify-between gap-4">
            <p data-reveal className="plex-label text-white">Heritage filmography</p>
            <Link href="/work/" className="link-draw text-sm text-white/70 hover:text-white">
              View all work
            </Link>
          </div>
          <ul
            data-stagger="0.06"
            className="swipe-rail mt-6 gap-3 pb-4 md:gap-4"
          >
            {films.map((f, i) => (
              <li key={f.title} className="w-[min(46vw,210px)] shrink-0 md:w-[220px] xl:w-[230px]">
                <Link href="/work/" data-cursor="View" className="block transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2">
                  <FilmPoster title={f.title} banner={f.banner} tone={f.tone} index={i} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- Current slate */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Current slate"
            title={<>The next chapter is <span className="accent">already in production.</span></>}
            lead="Four films, one growing studio ecosystem — advanced through Videa Films, with PRF Music supporting music and audio development and the wider studio providing production, post-production and technical support."
            action={<ArrowLink href="/divisions/videa-films/">About Videa Films</ArrowLink>}
          />
          <div className="mt-10 md:mt-14">
            <SlateCards />
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-ash pt-6 md:flex-row md:items-center md:justify-between">
            <p data-reveal className="flex flex-wrap gap-x-5 gap-y-1 text-[14px] font-medium uppercase tracking-[0.14em] text-carbon">
              <span>Commercially relevant.</span>
              <span>Culturally grounded.</span>
              <span className="text-gold-ink">Creatively differentiated.</span>
            </p>
            <p data-reveal className="max-w-md text-[14px] text-smoke">
              Project titles, posters and stills will be published as each project is announced.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Creative philosophy */}
      <Philosophy />

      {/* ------------------------------------------------------- Ways to work */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading center eyebrow="Working with us" title={<>Two ways to <span className="accent">work with us.</span></>} />
          <div data-stagger className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
            <article className="relative flex flex-col overflow-hidden rounded-[8px] bg-carbon p-6 text-white md:p-8 xl:p-10">
              <span className="tag w-fit bg-gold text-midnight">Most complete</span>
              <h3 className="mt-6 text-[26px] font-serif font-normal tracking-[-0.02em] md:text-[30px]">End-to-end production</h3>
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
              <div className="mt-auto pt-8 md:pt-10">
                <Link href="/contact/#enquiry" className="btn btn-white w-full sm:w-auto">
                  Plan a production
                </Link>
              </div>
            </article>
            <article className="flex flex-col rounded-[8px] bg-ivory p-6 ring-1 ring-ash md:p-8 xl:p-10">
              <span className="tag w-fit bg-sand text-carbon">Flexible</span>
              <h3 className="mt-6 text-[26px] font-serif font-normal tracking-[-0.02em] text-onyx md:text-[30px]">Individual services</h3>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-graphite">
                Book exactly what you need — the shooting floor, a music-recording session, an edit suite, CG, or delivery
                support — and plug it into your own production.
              </p>
              <ul className="mt-8 space-y-3 text-[15px] text-carbon">
                {["Book a single stage or facility", "Experienced studio crew on hand", "Scale up to end-to-end at any time"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <Icon name="check" size={18} className="text-gold-ink" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8 md:pt-10">
                <Link href="/services/" className="btn btn-outline w-full sm:w-auto">
                  Browse services
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Pothraj Group */}
      <section className="border-t border-ash bg-ivory">
        <div className="container-x flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:justify-between md:gap-10 md:py-14">
          <div data-reveal className="flex items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/pothraj-group-dark.webp" alt="Pothraj Group" width={636} height={160} loading="lazy" className="h-9 w-auto md:h-11 xl:h-12" />
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
