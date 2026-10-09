import Link from "next/link";
import { divisions, photos } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import FilmGrid from "@/components/FilmGrid";
import { PageHero, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "Work & Filmography",
  description:
    "Heritage Kannada features from the PRF Studios family of banners — Megha Maale, Madhura Maitri, Ganesha I Love You, Thayi Illada Thavaru, Angayalli Apsare, Hettavaru and Dayadi — and the work we make today.",
  path: "/work/",
  photo: "cinema",
  keywords: ["Kannada films", "Swati Movies", "Sri Raghavendra Films", "Megha Maale", "Ganesha I Love You", "Dayadi"],
});

const formats = [
  { icon: "film", title: "Feature films", text: "Theatrical features under the Videa Films banner, developed for every release window.", division: "videa-films" },
  { icon: "mic", title: "Soundtracks & albums", text: "Film soundtracks, independent singles, devotional and regional collections.", division: "prf-music" },
  { icon: "play", title: "Music videos", text: "Performance and narrative videos that carry a song across platforms.", division: "prf-music" },
  { icon: "globe", title: "YouTube programming", text: "Channel content, interviews and behind-the-scenes features.", division: "prf-digital" },
  { icon: "spark", title: "Short-form & branded", text: "Short-form entertainment, promotional films and branded content.", division: "prf-digital" },
  { icon: "layers", title: "Original digital series", text: "Episodic stories made digital-first, from development to delivery.", division: "prf-digital" },
] as const;

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Three decades on screen. Plenty more to come."
        lead="A selection of heritage Kannada features from our family of banners — and the formats we create today across cinema, music and digital."
        photo="cinema"
        crumbs={[{ name: "Work", path: "/work/" }]}
        compact
      />

      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Heritage filmography"
            title="Kannada features from our banners."
            lead="Titles produced under Swati Movies and Sri Raghavendra Films — the production banners now brought together as PRF Studios."
          />
          <div className="mt-12">
            <FilmGrid />
          </div>
        </div>
      </section>

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
            Videa Films · New slate
          </p>
          <h2 data-split className="display mt-4 max-w-[18ch]">
            Have a story for the big screen?
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-lg text-white/70">
            Videa Films develops commercially viable, culturally rooted cinema for theatrical, satellite, digital and
            international audiences. We&apos;d like to hear from writers, directors and co-producers.
          </p>
          <div data-reveal className="mt-10">
            <Link href="/contact/#enquiry" className="btn btn-gold">
              Pitch a project <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
