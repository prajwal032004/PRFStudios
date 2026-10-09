import Link from "next/link";
import { aiCapability, divisions, filmLead, groupLeaders, mission, philosophy, photos, vision } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import { ArrowLink, PageHero, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "About PRF Studios",
  description:
    "PRF Studios is a Bengaluru-based integrated entertainment and content-production platform with a legacy dating back to 1994 — Videa Films, PRF Music, PRF Digital, studio services and an AI-enabled content capability.",
  path: "/studio/",
  photo: "set",
  keywords: ["about PRF Studios", "Bengaluru production company", "Kannada film studio"],
});

const pillars = [
  {
    label: "Stories",
    title: "Culturally rooted, built to travel",
    text: "We develop work that belongs to the place it comes from — and is strong enough to reach theatrical, satellite, digital and international audiences.",
  },
  {
    label: "Music",
    title: "A catalogue tradition, renewed",
    text: "Saptaswara Audio Company released more than 150 titles. Today PRF Music records soundtracks, independent, devotional and regional work.",
  },
  {
    label: "Technology",
    title: "Modern rooms, modern pipeline",
    text: "Editing, graphics, sound, digital distribution and content-management technologies integrated into the production workflow.",
  },
  {
    label: "Production",
    title: "Producer-first, start to finish",
    text: "Development, planning, shoot, post and delivery — available end-to-end or stage by stage, with the same supervision either way.",
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

      {/* Story */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Executive profile
            </p>
            <h2 data-split className="heading-lg mt-4 text-onyx">
              A legacy reimagined for a new era of entertainment.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-graphite">
            <p data-reveal>
              PRF Studios is the contemporary entertainment platform within the Pothraj ecosystem, bringing film production,
              music, digital content, studio infrastructure, post-production and emerging media into one coordinated
              creative business.
            </p>
            <p data-reveal>
              Its entertainment heritage developed through established banners —{" "}
              <strong className="font-semibold text-carbon">Swati Movies</strong>,{" "}
              <strong className="font-semibold text-carbon">Saptaswara Audio Company</strong>,{" "}
              <strong className="font-semibold text-carbon">Sri Raghavendra Films</strong> and{" "}
              <strong className="font-semibold text-carbon">Shivashakti Cine Combines</strong> — across film production,
              music publishing and distribution. The purpose of PRF Studios is not to erase those earlier identities, but to
              carry forward their experience, relationships and catalogue knowledge within one modern, technology-aware
              studio platform.
            </p>
            <p data-reveal>
              The platform develops original intellectual property, supports feature-film production through{" "}
              <Link href="/divisions/videa-films/" className="link-draw font-medium text-carbon">Videa Films</Link>, builds music
              through <Link href="/divisions/prf-music/" className="link-draw font-medium text-carbon">PRF Music</Link>, develops
              online programming through <Link href="/divisions/prf-digital/" className="link-draw font-medium text-carbon">PRF Digital</Link>,
              and provides professional{" "}
              <Link href="/divisions/production-services/" className="link-draw font-medium text-carbon">production and post-production capability</Link>{" "}
              for owned and external projects.
            </p>
          </div>
        </div>
      </section>

      {/* Wide image */}
      <section aria-hidden="true" className="bg-ivory">
        <div className="container-x">
          <div data-clip className="relative aspect-[16/9] overflow-hidden rounded-[8px] md:aspect-[21/9]">
            <div data-parallax="0.12" className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos.edit.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Four pillars — dark presentation section */}
      <section className="section-y mt-24 bg-midnight text-white lg:mt-32">
        <div className="container-x">
          <SectionHeading
            dark
            eyebrow="What we do"
            title="Four strengths every project draws on."
            lead="Four words that describe the studio — and the four strengths every project draws on."
          />
          <div data-stagger className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-16 md:gap-10 xl:grid-cols-4 xl:gap-8">
            {pillars.map((p) => (
              <div key={p.label} className="border-t border-white/15 pt-6">
                <p className="plex-label text-white">{p.label}</p>
                <h3 className="mt-4 text-[20px] font-bold leading-snug tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-white/65">{p.text}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-14">
            <Link href="/services/" className="btn btn-gold">
              See how we work
            </Link>
          </div>
        </div>
      </section>

      {/* AI & emerging media */}
      <section id="ai" className="section-y scroll-mt-16 bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="AI & emerging media"
            title={<>Building a practical AI-enabled <span className="accent">creative production capability.</span></>}
            lead={aiCapability.intro}
          />
          <div data-stagger className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
            {aiCapability.model.map((m) => (
              <article key={m.label} className="flex flex-col rounded-[8px] bg-fog p-6 md:p-8">
                <p className="plex-label text-[12px] text-gold-ink">{m.label}</p>
                <h3 className="mt-3 font-serif text-[24px] font-normal tracking-[-0.015em] text-onyx">{m.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-graphite">{m.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 grid gap-8 border-t border-ash pt-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <p data-reveal className="plex-label text-carbon">
                Priority use cases
              </p>
              <p data-reveal className="mt-4 max-w-sm text-[15px] leading-relaxed text-graphite">
                {aiCapability.stance}
              </p>
            </div>
            <ul data-stagger="0.05" className="flex flex-wrap content-start gap-2.5">
              {aiCapability.useCases.map((u) => (
                <li key={u} className="tag bg-sand text-[15px] text-carbon">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <div data-stagger className="grid gap-px overflow-hidden rounded-[8px] bg-ash ring-1 ring-ash md:grid-cols-2">
            {[
              { label: "Our vision", text: vision },
              { label: "Our mission", text: mission },
            ].map((v) => (
              <div key={v.label} className="bg-ivory p-6 md:p-10">
                <p className="eyebrow text-gold-ink">{v.label}</p>
                <p className="mt-4 font-serif text-[22px] font-light leading-[1.35] tracking-[-0.01em] text-onyx md:text-[26px]">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 md:mt-28">
            <SectionHeading
              eyebrow="Creative philosophy"
              title={<>Story first. Technology enabled. <span className="accent">Professionally executed.</span></>}
            />
          </div>
          <div data-stagger className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 xl:grid-cols-3">
            {philosophy.map((p, i) => (
              <article key={p.title} className="flex gap-4 rounded-[8px] bg-fog p-6 sm:gap-6 md:p-8">
                <span className="plex-label text-gold-ink">0{i + 1}</span>
                <div>
                  <h3 className="text-[22px] font-serif font-normal tracking-[-0.01em] text-onyx">{p.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-graphite">{p.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-y bg-midnight text-white">
        <div className="container-x">
          <SectionHeading dark eyebrow="Leadership" title={<>Stewardship, <span className="accent">carried forward.</span></>} />
          <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-[1.3fr_1fr]">
            <article data-reveal className="flex flex-col justify-between gap-10 rounded-[8px] bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-10">
              <figure>
                <blockquote className="font-serif text-[clamp(22px,2.4vw,32px)] font-light leading-[1.3] tracking-[-0.01em]">
                  &ldquo;{filmLead.quote}&rdquo;
                </blockquote>
              </figure>
              <div>
                <p className="font-serif text-[24px] font-normal tracking-[-0.01em]">{filmLead.name}</p>
                <p className="plex-label mt-2 text-[12px] text-champagne">{filmLead.role}</p>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">{filmLead.bio}</p>
              </div>
            </article>
            <div data-stagger className="grid gap-4">
              {groupLeaders.map((l) => (
                <article key={l.name} className="rounded-[8px] bg-white/[0.04] p-6 ring-1 ring-white/10 md:p-8">
                  <p className="plex-label text-[12px] text-champagne">{l.role}</p>
                  <h3 className="mt-3 font-serif text-[24px] font-normal tracking-[-0.01em]">{l.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{l.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divisions quick links */}
      <section className="bg-fog">
        <div className="container-x py-20 md:py-24">
          <SectionHeading
            eyebrow="Divisions"
            title="One studio. Multiple creative divisions."
            action={<ArrowLink href="/divisions/">All divisions</ArrowLink>}
          />
          <ul data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 xl:grid-cols-4">
            {divisions.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/divisions/${d.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-[8px] bg-ivory ring-1 ring-ash transition hover:ring-carbon"
                >
                  <div className="aspect-[4/3] overflow-hidden p-3 pb-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photos[d.photo].sm}
                      alt=""
                      loading="lazy"
                      className="h-full w-full rounded-[4px] object-cover transition duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="plex-label text-[14px] text-smoke">{d.label}</p>
                    <h3 className="mt-1 text-[20px] font-serif font-normal tracking-[-0.01em] text-onyx">{d.name}</h3>
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

      {/* Parent group */}
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
          <div data-reveal="scale" className="flex items-center justify-center rounded-[8px] bg-midnight p-10 md:p-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/pothraj-group-light.webp" alt="Pothraj Group" width={636} height={160} loading="lazy" className="h-16 w-auto md:h-20" />
          </div>
        </div>
      </section>
    </>
  );
}
