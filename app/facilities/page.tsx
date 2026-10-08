import Link from "next/link";
import { facilities, photos } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import Marquee from "@/components/motion/Marquee";
import { PageHero, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "Facilities — Shooting Floor, Recording, Dubbing & Editing",
  description:
    "Shooting floor, music recording rooms, dubbing suites, editing suites and CG at PRF Studios, M. G. Road, Bengaluru — bookable for full productions or individual sessions.",
  path: "/facilities/",
  photo: "music",
  keywords: ["shooting floor Bengaluru", "recording studio Bengaluru", "dubbing studio Bengaluru", "editing suite Bengaluru"],
});

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="Recording. Dubbing. Editing. Music."
        lead="The rooms a production needs — floor, sound, edit and CG — in one place, supervised by one team."
        photo="music"
        crumbs={[{ name: "Facilities", path: "/facilities/" }]}
        compact
      >
        <Link href="/contact/#enquiry" className="btn btn-gold">
          Book a session <Icon name="arrow" size={18} />
        </Link>
      </PageHero>

      <section aria-label="Facilities" className="border-b border-ash bg-ivory py-6">
        <Marquee items={facilities.map((f) => f.name)} speed={30} className="text-[clamp(24px,3vw,36px)] font-serif font-normal tracking-[-0.02em] text-carbon" />
      </section>

      <section className="section-y bg-ivory">
        <div className="container-x space-y-20 lg:space-y-28">
          {facilities.map((f, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={f.name} className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                <div
                  data-clip
                  className={`relative aspect-[16/10] overflow-hidden rounded-[8px] ${flip ? "lg:order-2 lg:rounded-tr-[60px]" : "lg:rounded-tl-[60px]"}`}
                >
                  <div data-parallax="0.1" className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photos[f.photo].src} alt={photos[f.photo].alt} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div>
                  <p data-reveal="fade" className="plex-label text-gold-ink">
                    {String(i + 1).padStart(2, "0")} — {f.label}
                  </p>
                  <h2 data-split className="heading-lg mt-3 text-onyx">
                    {f.name}
                  </h2>
                  <p data-reveal className="mt-5 text-lg leading-relaxed text-graphite">
                    {f.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-y bg-midnight text-white">
        <div className="container-x">
          <SectionHeading dark eyebrow="Booking" title="How booking works." lead="Simple, transparent and planned around your schedule." />
          <ol data-stagger className="mt-14 grid gap-px overflow-hidden rounded-[8px] bg-white/10 md:grid-cols-4">
            {[
              { title: "Tell us the brief", text: "Share the project, the rooms you need and your preferred dates." },
              { title: "We plan it", text: "We confirm availability, crew and technical requirements with you." },
              { title: "Session day", text: "Arrive to a prepared room and studio crew ready to support." },
              { title: "Hand-off", text: "Files and media delivered in the formats your next stage needs." },
            ].map((s, i) => (
              <li key={s.title} className="bg-midnight p-7 md:p-8">
                <p className="plex-label text-white/40">Step {i + 1}</p>
                <h3 className="mt-3 text-[22px] font-serif font-normal tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-2 text-[15px] font-light leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-12">
            <Link href="/contact/#enquiry" className="btn btn-gold">
              Check availability
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
