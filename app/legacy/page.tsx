import Link from "next/link";
import { banners, photos } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import { PageHero, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "Our Legacy — Since 1994",
  description:
    "The story behind PRF Studios: Swati Movies, Saptaswara Audio Company, Sri Raghavendra Films and Shivashakti Cine Combines — production, music publishing and distribution in Kannada, Tamil and Telugu cinema since 1994.",
  path: "/legacy/",
  photo: "cinema",
  keywords: ["Swati Movies", "Saptaswara Audio", "Sri Raghavendra Films", "Shivashakti Cine Combines", "Kannada cinema history"],
});

const chapters = [
  {
    mark: "1994",
    title: "The beginning",
    text: "The Pothraj Group's entertainment journey begins in Bengaluru — the start of a legacy in film that PRF Studios carries today.",
  },
  ...banners.map((b) => ({ mark: b.role, title: b.name, text: b.description, films: b.films })),
  {
    mark: "Today",
    title: "PRF Studios",
    text: "The banners come together as one integrated platform for film, music, digital content and production services — with Videa Films, PRF Music and PRF Digital alongside.",
  },
];

export default function LegacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legacy"
        title="A legacy in entertainment since 1994."
        lead="Four banners across production, music publishing and distribution laid the foundations for PRF Studios."
        photo="cinema"
        crumbs={[{ name: "Legacy", path: "/legacy/" }]}
        compact
      />

      <section className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Chapters"
              title="How the studio came to be."
              lead="Production, music and distribution — each banner added a strength the studio still relies on."
            />
          </div>

          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-ash" />
            <span aria-hidden="true" data-progress-line className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gold" />
            {chapters.map((c) => (
              <li key={c.title} data-reveal className="relative pb-14 pl-12 last:pb-0">
                <span className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-gold bg-ivory" />
                <p className="plex-label text-gold-ink">{c.mark}</p>
                <h2 className="mt-1 text-[30px] font-serif font-normal tracking-[-0.02em] text-onyx md:text-[36px]">{c.title}</h2>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-graphite">{c.text}</p>
                {"films" in c && c.films && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.films.map((f) => (
                      <li key={f} className="tag bg-sand text-carbon">
                        <Icon name="film" size={14} className="text-gold-ink" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-midnight text-white">
        <div data-parallax="0.15" className="absolute inset-0 -z-10 opacity-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos.music.src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/40" />
        <div className="container-x py-28 text-center md:py-40">
          <p data-reveal="fade" className="eyebrow text-champagne">
            Kannada · Tamil · Telugu
          </p>
          <p data-split className="display mx-auto mt-5 max-w-[22ch]">
            Rooted in Karnataka. Made for every screen.
          </p>
          <div data-reveal className="mt-10 flex justify-center gap-3">
            <Link href="/work/" className="btn btn-white">
              See the filmography
            </Link>
            <Link href="/studio/" className="btn btn-ghost">
              About the studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
