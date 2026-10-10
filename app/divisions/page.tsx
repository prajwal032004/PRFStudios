import Link from "next/link";
import { divisions, photos } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import { PageHero } from "@/components/ui";

export const metadata = pageMeta({
  title: "Divisions — Production, Videa Films, PRF Music & PRF Digital",
  description:
    "One studio, multiple creative divisions: Videa Films for feature-film production, PRF Music, PRF Digital and PRF Studios production services — from development to delivery.",
  path: "/divisions/",
  photo: "cinema",
  keywords: ["Videa Films", "PRF Music", "PRF Digital", "production services Bengaluru"],
});

export default function DivisionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Divisions"
        title="One studio. Multiple creative divisions."
        lead="A connected operating model designed to retain creative control, reduce production fragmentation and build long-term film, music and digital intellectual property."
        photo="cinema"
        crumbs={[{ name: "Divisions", path: "/divisions/" }]}
      />

      <section className="section-y bg-ivory">
        <div className="container-x space-y-24 lg:space-y-32">
          {divisions.map((d, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={d.slug} className="grid items-center gap-7 md:gap-10 lg:grid-cols-2 lg:gap-16">
                <Link
                  href={`/divisions/${d.slug}/`}
                  data-cursor="Explore"
                  data-clip
                  className={`group relative block aspect-[4/3] overflow-hidden rounded-[8px] md:aspect-[16/10] lg:aspect-[4/3] ${flip ? "lg:order-2 lg:rounded-tr-[60px]" : "lg:rounded-tl-[60px]"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photos[d.photo].src}
                    alt={photos[d.photo].alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  {d.logo && (
                    <span className="absolute bottom-5 left-5 rounded-[8px] bg-black/55 p-3 backdrop-blur-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={d.logo} alt={`${d.name} logo`} className="h-14 w-auto" />
                    </span>
                  )}
                </Link>
                <div>
                  <p data-reveal="fade" className="plex-label text-gold-ink">
                    {String(i + 1).padStart(2, "0")} — {d.label}
                  </p>
                  <h2 data-split className="heading-lg mt-3 text-onyx">
                    {d.name}
                  </h2>
                  <p data-reveal className="mt-5 text-lg leading-relaxed text-graphite">
                    {d.summary}
                  </p>
                  <ul data-stagger="0.05" className="mt-7 flex flex-wrap gap-2">
                    {d.covers.slice(0, 4).map((c) => (
                      <li key={c} className="tag bg-sand text-carbon">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div data-reveal className="mt-9">
                    <Link href={`/divisions/${d.slug}/`} className="btn btn-dark">
                      Explore {d.name} <Icon name="arrow" size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
