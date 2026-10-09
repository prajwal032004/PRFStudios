import Link from "next/link";
import { divisions, photos } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import { ArrowLink, PageHero, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "About the Studio",
  description:
    "PRF Studios is a Bengaluru-based integrated entertainment and content-production company with a legacy extending back to 1994 — combining development, production, music, digital content, studio infrastructure and post-production.",
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
    text: "Music has been part of our story since Saptaswara Audio Company. Today PRF Music records soundtracks, independent, devotional and regional work.",
  },
  {
    label: "Technology",
    title: "Modern rooms, modern pipeline",
    text: "Shooting floor, recording and dubbing rooms, editing suites and CG — set up for long-form cinema and fast-turnaround digital alike.",
  },
  {
    label: "Production",
    title: "Producer-first, start to finish",
    text: "Development, planning, shoot, post and delivery — available end-to-end or stage by stage, with the same supervision either way.",
  },
];

const principles = [
  { title: "One roof, one standard", text: "Every stage — whether we run the whole project or a single session — is held to the same production discipline." },
  { title: "Commercially viable", text: "Creative ambition matched with honest budgets, realistic schedules and a clear view of the audience." },
  { title: "Rooted in Karnataka", text: "Three decades in Kannada cinema shape how we work, who we work with and the stories we choose." },
  { title: "Built for every screen", text: "Theatrical, satellite, streaming, YouTube and social — we plan for the release before the first frame is shot." },
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title="An integrated studio for stories, music and screen."
        lead="PRF Studios is a Bengaluru-based integrated entertainment and content-production company with a legacy extending back to 1994."
        photo="set"
        crumbs={[{ name: "Studio", path: "/studio/" }]}
      >
        <Link href="/contact/#enquiry" className="btn btn-gold">
          Start a project <Icon name="arrow" size={18} />
        </Link>
      </PageHero>

      {/* Story */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Who we are
            </p>
            <h2 data-split className="heading-lg mt-4 text-onyx">
              From four banners to one platform.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-graphite">
            <p data-reveal>
              The Pothraj Group&apos;s entertainment journey developed through established banners —{" "}
              <strong className="font-semibold text-carbon">Swati Movies</strong>,{" "}
              <strong className="font-semibold text-carbon">Saptaswara Audio Company</strong>,{" "}
              <strong className="font-semibold text-carbon">Sri Raghavendra Films</strong> and{" "}
              <strong className="font-semibold text-carbon">Shivashakti Cine Combines</strong> — working across feature
              production, music publishing and distribution.
            </p>
            <p data-reveal>
              Today, PRF Studios brings that experience together. The studio combines creative development, physical
              production, music, digital content, studio infrastructure and post-production services — giving producers,
              artists and brands a single partner from the first idea to the final deliverable.
            </p>
            <p data-reveal>
              Our work runs through four divisions: <Link href="/divisions/production-services/" className="link-draw font-medium text-carbon">PRF Studios</Link>{" "}
              for production services, <Link href="/divisions/videa-films/" className="link-draw font-medium text-carbon">Videa Films</Link>{" "}
              for feature films, <Link href="/divisions/prf-music/" className="link-draw font-medium text-carbon">PRF Music</Link>{" "}
              for music, and <Link href="/divisions/prf-digital/" className="link-draw font-medium text-carbon">PRF Digital</Link>{" "}
              for digital-first content.
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
            title="Stories. Music. Technology. Production."
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

      {/* Principles */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading eyebrow="Principles" title="How we approach every project." />
          <div data-stagger className="mt-14 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
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

      {/* Divisions quick links */}
      <section className="bg-fog">
        <div className="container-x py-20 md:py-24">
          <SectionHeading
            eyebrow="Divisions"
            title="Meet the four teams."
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
              Part of the Pothraj Group
            </p>
            <h2 data-split className="heading-lg mt-4 text-onyx">
              Backed by a group that builds for generations.
            </h2>
            <p data-reveal className="mt-5 text-lg leading-relaxed text-graphite">
              The Pothraj Group was founded in Mysuru in 1981 by M. K. Pothraj and is led today by Chairman &amp; Managing
              Director Balajhi Pothraj. Its businesses span infrastructure, hospitality, education, beverages, agri-energy,
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
