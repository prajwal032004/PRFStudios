import Link from "next/link";
import { divisions, filmLead, photos, slateNote, videaPrinciples } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import FilmGrid from "@/components/FilmGrid";
import SlateCards from "@/components/SlateCards";
import { RootsDivider } from "@/components/EmblemArt";
import { ArrowLink, PageHero, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "Films — Bombay Dada & the Videa Films Slate",
  description:
    "The current PRF Studios slate through Videa Films: Bombay Dada (Sharan × Diganth), Koosa Mattu Kutumba, Maarsan – Mallappa vs Marappa, MKP – Sarai King and Jungle Diaries / Naagarahole — plus heritage Kannada features since 1994.",
  path: "/films/",
  photo: "cinema",
  keywords: ["Bombay Dada", "Sharan", "Diganth", "Videa Films", "Koosa Mattu Kutumba", "Maarsan", "Naagarahole", "Kannada films"],
});

const formats = [
  { icon: "film", title: "Feature films", text: "Theatrical features under the Videa Films banner, developed for every release window.", division: "videa-films" },
  { icon: "mic", title: "Soundtracks & albums", text: "Film soundtracks, independent singles, devotional and regional collections.", division: "prf-music" },
  { icon: "play", title: "Music videos", text: "Performance and narrative videos that carry a song across platforms.", division: "prf-music" },
  { icon: "globe", title: "YouTube programming", text: "Channel content, interviews and behind-the-scenes features.", division: "prf-digital" },
  { icon: "spark", title: "Short-form & branded", text: "Short-form entertainment, branded entertainment and promotional content.", division: "prf-digital" },
  { icon: "layers", title: "Original digital series", text: "Episodic stories made digital-first, from development to delivery.", division: "prf-digital" },
] as const;

export default function FilmsPage() {
  return (
    <>
      <PageHero
        eyebrow="Films · Videa Films"
        title="Cinema with structure, scale and audience focus."
        lead="Videa Films is the feature-film production banner within the PRF Studios ecosystem, developing commercially viable and culturally relevant cinema for theatrical, satellite, digital and international audiences."
        photo="cinema"
        crumbs={[{ name: "Films", path: "/films/" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="#slate" className="btn btn-gold">
            Explore projects <Icon name="arrow" size={18} />
          </Link>
          <Link href="/contact/#enquiry" className="btn btn-ghost">
            Work with PRF Studios
          </Link>
        </div>
      </PageHero>

      {/* Current slate */}
      <section id="slate" className="section-y scroll-mt-16 bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Current slate & intellectual property"
            title={<>A multi-project pipeline across <span className="accent">languages and formats.</span></>}
            lead="The slate combines mainstream cinema, cross-language development and longer-term franchise and IP thinking."
          />
          <div className="mt-10 md:mt-14">
            <SlateCards />
          </div>
          <p data-reveal className="mt-8 max-w-3xl border-t border-ash pt-6 text-[14px] leading-relaxed text-smoke">
            Project stages and final rights structures remain subject to definitive production documentation. {slateNote}
          </p>
        </div>
      </section>

      {/* Videa Films leadership */}
      <section className="section-y glow-gold relative overflow-hidden bg-midnight text-white">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-reveal="fade"
              src="/brand/videa-films-white.webp"
              alt="Videa Films — A Pothraj Company"
              width={460}
              height={315}
              loading="lazy"
              className="h-auto w-[min(320px,70%)]"
            />
            <p data-reveal className="eyebrow mt-10 text-champagne">
              Leadership
            </p>
            <h2 data-split className="heading-lg mt-4">
              {filmLead.name}
            </h2>
            <p data-reveal className="plex-label mt-3 text-white/60">
              {filmLead.role}
            </p>
            <p data-reveal className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70 md:text-lg">
              {filmLead.bio}
            </p>
            <div data-reveal className="mt-8">
              <ArrowLink dark href={`/leadership/${filmLead.slug}/`}>
                Full profile
              </ArrowLink>
            </div>
          </div>
          <div>
            <figure data-reveal className="border-l border-gold pl-6 md:pl-10">
              <blockquote className="font-serif text-[clamp(26px,3.4vw,44px)] font-light leading-[1.2] tracking-[-0.015em]">
                &ldquo;{filmLead.quote}&rdquo;
              </blockquote>
              <figcaption className="plex-label mt-6 text-champagne">— {filmLead.name}</figcaption>
            </figure>
            <ol data-stagger className="mt-12 grid gap-px overflow-hidden rounded-[8px] bg-white/10 sm:grid-cols-3">
              {videaPrinciples.map((p, i) => (
                <li key={p.title} className="bg-midnight p-6">
                  <p className="plex-label text-[12px] text-champagne">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-serif text-[21px] font-normal tracking-[-0.01em]">{p.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/60">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Heritage filmography */}
      <section className="section-y bg-ivory">
        <RootsDivider className="mb-12 md:mb-16" />
        <div className="container-x">
          <SectionHeading
            eyebrow="Heritage filmography"
            title="Kannada features from our historic banners."
            lead="Titles produced under Swati Movies and Sri Raghavendra Films — production experience now carried forward within PRF Studios."
            action={<ArrowLink href="/legacy/">Heritage since 1994</ArrowLink>}
          />
          <div className="mt-12">
            <FilmGrid />
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="section-y bg-fog">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we make today"
            title="Cinema, music and digital — in one pipeline."
            action={
              <Link href="/divisions/" className="btn btn-outline">
                Explore divisions
              </Link>
            }
          />
          <ul data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 xl:grid-cols-3">
            {formats.map((f) => {
              const d = divisions.find((x) => x.slug === f.division)!;
              return (
                <li key={f.title} className="flex flex-col rounded-[8px] bg-ivory p-7 ring-1 ring-ash">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-gold-ink">
                    <Icon name={f.icon} size={20} />
                  </span>
                  <h3 className="mt-6 text-[22px] font-serif font-normal tracking-[-0.01em] text-onyx">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite">{f.text}</p>
                  <Link href={`/divisions/${d.slug}/`} className="mt-auto pt-6 text-sm font-medium text-carbon">
                    <span className="link-draw">{d.name}</span> →
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-midnight text-white">
        <div data-parallax="0.2" className="absolute inset-0 -z-10 opacity-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos.set.src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight via-midnight/80 to-midnight/30" />
        <div className="container-x py-24 md:py-32 xl:py-36">
          <p data-reveal="fade" className="eyebrow text-champagne">
            Built for owned IP · Open to serious collaboration
          </p>
          <h2 data-split className="display mt-4 max-w-[18ch]">
            Bring your project to the studio.
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-lg text-white/70">
            PRF Studios works with producers, directors, writers, artists, agencies, platforms and technology partners on
            clearly structured projects — from co-productions to selected production services.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact/#enquiry" className="btn btn-gold">
              Work with PRF Studios <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
