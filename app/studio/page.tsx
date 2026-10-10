import Link from "next/link";
import { aiCapability, divisions, filmLead, groupLeaders, mission, photos, studioStats, vision } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import Marquee from "@/components/motion/Marquee";
import ExpandingImage from "@/components/ExpandingImage";
import PillarStack, { type Pillar } from "@/components/PillarStack";
import Philosophy from "@/components/Philosophy";
import { ArrowLink, PageHero, SectionHeading } from "@/components/ui";
import { CrownWatermark, RootsDivider } from "@/components/EmblemArt";

export const metadata = pageMeta({
  title: "About PRF Studios",
  description:
    "PRF Studios is a Bengaluru-based integrated entertainment and content-production platform with a legacy dating back to 1994 — Videa Films, PRF Music, PRF Digital, studio services and an AI-enabled content capability.",
  path: "/studio/",
  photo: "set",
  keywords: ["about PRF Studios", "Bengaluru production company", "Kannada film studio"],
});

const pillars: Pillar[] = [
  {
    label: "Stories",
    icon: "film",
    title: "Culturally rooted, built to travel",
    text: "We develop work that belongs to the place it comes from — and is strong enough to reach theatrical, satellite, digital and international audiences.",
    points: ["Original film, music and digital IP", "Commercially relevant, culturally grounded", "Cross-language development"],
  },
  {
    label: "Music",
    icon: "mic",
    title: "A catalogue tradition, renewed",
    text: "Saptaswara Audio Company released more than 150 titles. Today PRF Music records soundtracks, independent, devotional and regional work.",
    points: ["Film soundtracks and score", "Independent, devotional and regional releases", "Artist collaborations and music videos"],
  },
  {
    label: "Technology",
    icon: "layers",
    title: "Modern rooms, modern pipeline",
    text: "Editing, graphics, sound, digital distribution and content-management technologies integrated into the production workflow.",
    points: ["Editing suites and computer graphics", "AI-assisted content and previsualisation", "Platform-ready packaging and delivery"],
  },
  {
    label: "Production",
    icon: "camera",
    title: "Producer-first, start to finish",
    text: "Development, planning, shoot, post and delivery — available end-to-end or stage by stage, with the same supervision either way.",
    points: ["Full-fledged shooting floor near Bengaluru", "End-to-end or selected services", "One point of accountability"],
  },
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="About PRF Studios"
        title="Stories. Music. Technology. Production."
        lead="PRF Studios is a Bengaluru-based integrated entertainment and content-production platform. We develop original projects, collaborate with producers and creative talent, and provide the technical and production capability required to move content from development through delivery."
        photo="set"
        crumbs={[{ name: "About", path: "/studio/" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/films/" className="btn btn-gold">
            Explore projects <Icon name="arrow" size={18} />
          </Link>
          <Link href="/contact/#enquiry" className="btn btn-ghost">
            Work with PRF Studios
          </Link>
        </div>
      </PageHero>

      {/* ------------------------------------------------- Manifesto (scrub) */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-[150px_1fr] md:gap-10 xl:grid-cols-[220px_1fr]">
            <p data-reveal="fade" className="eyebrow pt-2 text-gold-ink">
              Executive profile
            </p>
            <p
              data-scrub-words
              className="font-serif text-[clamp(26px,6.6vw,34px)] font-light leading-[1.18] tracking-[-0.02em] text-onyx md:text-[clamp(32px,4vw,44px)] xl:text-[clamp(40px,3.4vw,58px)]"
            >
              A legacy reimagined for a new era of entertainment — the contemporary platform within the Pothraj ecosystem,
              bringing film production, music, digital content, studio infrastructure, post-production and emerging media
              into one coordinated creative business.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-[150px_1fr] md:gap-10 xl:grid-cols-[220px_1fr]">
            <span aria-hidden="true" />
            <div className="grid gap-8 text-[17px] leading-relaxed text-graphite md:grid-cols-2 md:gap-12 md:text-lg">
              <p data-reveal>
                Its entertainment heritage developed through established banners —{" "}
                <strong className="font-semibold text-carbon">Swati Movies</strong>,{" "}
                <strong className="font-semibold text-carbon">Saptaswara Audio Company</strong>,{" "}
                <strong className="font-semibold text-carbon">Sri Raghavendra Films</strong> and{" "}
                <strong className="font-semibold text-carbon">Shivashakti Cine Combines</strong>. The purpose is not to erase
                those identities, but to carry forward their experience, relationships and catalogue knowledge.{" "}
                <Link href="/legacy/" className="link-draw font-medium text-carbon">
                  Read the heritage
                </Link>
              </p>
              <p data-reveal data-delay="0.1">
                The platform develops original intellectual property, supports feature-film production through{" "}
                <Link href="/divisions/videa-films/" className="link-draw font-medium text-carbon">Videa Films</Link>, builds music
                through <Link href="/divisions/prf-music/" className="link-draw font-medium text-carbon">PRF Music</Link>, develops
                online programming through{" "}
                <Link href="/divisions/prf-digital/" className="link-draw font-medium text-carbon">PRF Digital</Link>, and provides{" "}
                <Link href="/divisions/production-services/" className="link-draw font-medium text-carbon">
                  production and post-production capability
                </Link>{" "}
                for owned and external projects.
              </p>
            </div>
          </div>

          <dl data-stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-ash ring-1 ring-ash md:mt-24 md:grid-cols-4">
            {studioStats.map((s) => (
              <div key={s.label} className="bg-ivory p-5 md:p-6 xl:p-8">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    data-counter={s.value}
                    data-counter-from={s.from ?? 0}
                    data-counter-suffix={s.suffix}
                    className="block font-serif text-[clamp(38px,11vw,56px)] font-light leading-none tracking-[-0.03em] text-onyx tabular-nums md:text-[clamp(44px,6vw,64px)] xl:text-[clamp(64px,5.2vw,120px)]"
                  >
                    {s.value}
                    {s.suffix}
                  </span>
                  <span className="mt-3 block text-[14px] leading-snug text-graphite md:text-[15px]">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ----------------------------------------------- Expanding image */}
      <ExpandingImage
        src={photos.edit.src}
        alt={photos.edit.alt}
        eyebrow="Bengaluru · Legacy since 1994"
        caption={
          <>
            From the first idea <span className="accent">to the final screen.</span>
          </>
        }
      />

      {/* --------------------------------------------------- Four pillars */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we do"
            title={<>Four strengths <span className="accent">every project draws on.</span></>}
            lead="Stories. Music. Technology. Production. Four words that describe the studio — and how a project moves through it."
            action={<ArrowLink href="/services/">How we work</ArrowLink>}
          />
          <div className="mt-12 md:mt-16">
            <PillarStack pillars={pillars} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ AI & emerging media */}
      <section id="ai" className="scroll-mt-16 bg-midnight text-white">
        <div className="section-y root-lattice glow-gold relative isolate overflow-hidden">
          <CrownWatermark className="-right-[14%] top-[4%] w-[80vw] max-w-[760px] md:w-[46vw]" />
          <div className="container-x">
            <SectionHeading
              dark
              eyebrow="AI & emerging media"
              title={<>Building a practical AI-enabled <span className="accent">creative production capability.</span></>}
              lead={aiCapability.intro}
            />
            <div data-stagger className="mt-10 grid gap-px overflow-hidden rounded-[8px] bg-white/10 md:mt-14 md:grid-cols-3">
              {aiCapability.model.map((m, i) => (
                <article key={m.label} className="group flex flex-col bg-midnight/95 p-6 transition-colors duration-500 hover:bg-carbon md:p-8">
                  <p className="flex items-center justify-between plex-label text-[12px] text-champagne">
                    {m.label}
                    <span className="text-white/30">{String(i + 1).padStart(2, "0")}</span>
                  </p>
                  <h3 className="mt-5 font-serif text-[26px] font-normal tracking-[-0.015em]">{m.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{m.text}</p>
                  {"link" in m && m.link && (
                    <a
                      href={m.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full py-1.5 pl-3.5 pr-2 text-[14px] font-medium text-champagne ring-1 ring-gold/40 transition-colors duration-300 hover:bg-gold hover:text-midnight"
                    >
                      {m.link.label}
                      <Icon name="arrowUpRight" size={15} />
                    </a>
                  )}
                  <span className="mt-6 h-px w-10 bg-gold transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:w-24" />
                </article>
              ))}
            </div>
            <p data-reveal className="mt-10 max-w-2xl text-[15px] leading-relaxed text-white/55">
              {aiCapability.stance}
            </p>
          </div>
        </div>
        <div className="border-y border-white/10 py-6 md:py-8">
          <Marquee
            items={aiCapability.useCases}
            speed={45}
            separator="✦"
            className="font-serif text-[clamp(24px,4vw,44px)] font-light tracking-[-0.02em] text-white/85"
          />
        </div>
      </section>

      {/* ------------------------------------------------ Vision & mission */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <RootsDivider className="mb-12 md:mb-16" />
          <div className="grid gap-px overflow-hidden rounded-[10px] bg-ash ring-1 ring-ash lg:grid-cols-2">
            {[
              { label: "Our vision", text: vision },
              { label: "Our mission", text: mission },
            ].map((v, i) => (
              <div key={v.label} className="bg-ivory p-6 md:p-12">
                <p data-reveal="fade" className="eyebrow text-gold-ink">
                  {v.label}
                </p>
                <p
                  data-split
                  data-delay={i * 0.1}
                  className="mt-5 font-serif text-[clamp(22px,2.4vw,32px)] font-light leading-[1.32] tracking-[-0.01em] text-onyx"
                >
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------- Creative philosophy (pinned) */}
      <Philosophy />

      {/* ---------------------------------------------------------- Leadership */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="Leadership" title={<>Stewardship, <span className="accent">carried forward.</span></>} />
          <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-[1.3fr_1fr]">
            <article data-reveal="scale" className="flex flex-col justify-between gap-10 rounded-[10px] bg-midnight p-6 text-white md:p-10">
              <figure>
                <blockquote className="font-serif text-[clamp(22px,2.4vw,34px)] font-light leading-[1.28] tracking-[-0.01em]">
                  &ldquo;{filmLead.quote}&rdquo;
                </blockquote>
              </figure>
              <div>
                <p className="font-serif text-[24px] font-normal tracking-[-0.01em]">{filmLead.name}</p>
                <p className="plex-label mt-2 text-[12px] text-champagne">{filmLead.role}</p>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">{filmLead.bio}</p>
                <div className="mt-6">
                  <ArrowLink dark href={`/leadership/${filmLead.slug}/`}>
                    Full profile
                  </ArrowLink>
                </div>
              </div>
            </article>
            <div data-stagger className="grid gap-4">
              {groupLeaders.map((l) => (
                <article key={l.name} className="rounded-[10px] bg-fog p-6 md:p-8">
                  <p className="plex-label text-[12px] text-gold-ink">{l.role}</p>
                  <h3 className="mt-3 font-serif text-[24px] font-normal tracking-[-0.01em] text-onyx">{l.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite">{l.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Divisions */}
      <section className="bg-fog">
        <div className="container-x py-20 md:py-28">
          <SectionHeading
            eyebrow="Divisions"
            title={<>One studio. <span className="accent">Multiple creative divisions.</span></>}
            action={<ArrowLink href="/divisions/">All divisions</ArrowLink>}
          />
          <ul data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 xl:grid-cols-4">
            {divisions.map((d, i) => (
              <li key={d.slug}>
                <Link
                  href={`/divisions/${d.slug}/`}
                  data-cursor="Explore"
                  className="group flex h-full flex-col overflow-hidden rounded-[10px] bg-ivory ring-1 ring-ash transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card)] hover:ring-gold/50"
                >
                  <div data-clip className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photos[d.photo].sm}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="plex-label text-[12px] text-gold-ink">{d.label}</p>
                    <h3 className="mt-1.5 font-serif text-[22px] font-normal tracking-[-0.01em] text-onyx">{d.name}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-graphite">{d.short}</p>
                    <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-carbon">
                      Explore <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- Parent group */}
      <section className="section-y bg-ivory">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              A Pothraj Company
            </p>
            <h2 data-split className="heading-lg mt-4 text-onyx">
              Backed by a group that builds for generations.
            </h2>
            <p data-reveal className="mt-5 text-lg leading-relaxed text-graphite">
              The Pothraj Group was founded in Mysuru in 1981 by M. K. Pothraj and is led today by Chairman &amp; CEO
              Balajhi Pothraj. Its businesses span infrastructure, hospitality, education, beverages, agri-energy,
              commerce and media — and PRF Studios is the group&apos;s home for film, music and content.
            </p>
          </div>
          <div data-reveal="scale" className="grain relative flex items-center justify-center overflow-hidden rounded-[10px] bg-midnight p-10 md:p-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/pothraj-group-light.webp" alt="Pothraj Group" width={636} height={160} loading="lazy" className="h-16 w-auto md:h-20" />
          </div>
        </div>
      </section>
    </>
  );
}
