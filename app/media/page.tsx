import Link from "next/link";
import { divisions, engagementModels, mission, studioStats, vision } from "@/lib/content";
import { contact, site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import CopyButton from "@/components/CopyButton";
import { PageHero, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "Media & Press Kit",
  description:
    "PRF Studios media kit: approved boilerplate, key facts, approved PRF Studios and Videa Films logos, and media and business contact — A POTHRAJ COMPANY.",
  path: "/media/",
  photo: "edit",
  keywords: ["PRF Studios media kit", "PRF Studios logo", "Videa Films logo", "PRF Studios press"],
});

const logos = [
  { name: "PRF Studios — logo", file: "prf-studios-logo", preview: "prf-studios", variants: ["gold", "white", "black"] },
  { name: "PRF Studios — emblem", file: "prf-studios-emblem", preview: "prf-emblem", variants: ["gold", "white", "black"] },
  { name: "Videa Films — logo", file: "videa-films-logo", preview: "videa-films", variants: ["white", "black", "gold"] },
] as const;

const facts = [
  ["Headquarters", "Bengaluru, Karnataka, India"],
  ["Entertainment legacy", "Since 1994"],
  ["Divisions", divisions.map((d) => d.name).join(" · ")],
  ["Film production banner", "Videa Films"],
  ["First major public project", "Bombay Dada (Sharan × Diganth)"],
  ["Brand line", site.descriptor],
] as const;

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media & press"
        title="A clear public story: legacy, renewal and a larger vision."
        lead="Approved boilerplate, key facts, logos and contacts for press, partners and platforms."
        photo="edit"
        crumbs={[{ name: "Media", path: "/media/" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a href="/media-kit/prf-studios-media-kit.zip" download className="btn btn-gold">
            Download media kit <Icon name="arrowUp" size={18} className="rotate-180" />
          </a>
          <a href={`mailto:${contact.email}?subject=Media%20enquiry%20%E2%80%94%20PRF%20Studios`} className="btn btn-ghost">
            Media contact
          </a>
        </div>
      </PageHero>

      {/* Boilerplate + facts */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Short media boilerplate
            </p>
            <p data-reveal className="mt-6 font-serif text-[clamp(22px,2.6vw,32px)] font-light leading-[1.4] tracking-[-0.01em] text-onyx">
              {site.boilerplate}
            </p>
            <div data-reveal className="mt-8">
              <CopyButton text={site.boilerplate} label="Copy boilerplate" />
            </div>
          </div>
          <dl data-stagger className="divide-y divide-ash border-y border-ash">
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="plex-label text-[13px] text-smoke">{k}</dt>
                <dd className="text-[16px] font-medium text-carbon">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="container-x">
          <dl data-stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] bg-ash ring-1 ring-ash md:mt-20 md:grid-cols-4">
            {studioStats.map((s) => (
              <div key={s.label} className="bg-ivory p-5 md:p-7">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    data-counter={s.value}
                    data-counter-from={s.from ?? 0}
                    data-counter-suffix={s.suffix}
                    className="block font-serif text-[clamp(38px,5vw,72px)] font-light leading-none tracking-[-0.03em] text-onyx tabular-nums"
                  >
                    {s.value}
                    {s.suffix}
                  </span>
                  <span className="mt-3 block text-[14px] text-graphite md:text-[15px]">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Approved logos */}
      <section className="section-y bg-midnight text-white">
        <div className="container-x">
          <SectionHeading
            dark
            eyebrow="Approved logos"
            title={<>Use the approved marks, <span className="accent">as supplied.</span></>}
            lead={`The brand line is “${site.descriptor}”. Please use the approved logos without alteration and avoid earlier descriptor variants in public material.`}
          />
          <ul data-stagger className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3">
            {logos.map((l) => (
              <li key={l.file} className="flex flex-col overflow-hidden rounded-[8px] ring-1 ring-white/10">
                <div className="grid grid-cols-2">
                  <div className="col-span-2 flex aspect-[16/10] items-center justify-center bg-onyx p-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/brand/${l.preview}-${l.variants[0]}.webp`} alt={l.name} loading="lazy" className="max-h-full w-auto max-w-[70%] object-contain" />
                  </div>
                  <div className="flex aspect-[16/9] items-center justify-center bg-ivory p-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/brand/${l.preview}-black.webp`} alt="" loading="lazy" className="max-h-full w-auto max-w-[70%] object-contain" />
                  </div>
                  <div className="flex aspect-[16/9] items-center justify-center bg-carbon p-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/brand/${l.preview}-${l.variants.find((v) => v !== l.variants[0] && v !== "black")}.webp`} alt="" loading="lazy" className="max-h-full w-auto max-w-[70%] object-contain" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col bg-white/[0.03] p-5">
                  <h3 className="font-serif text-[20px] font-normal tracking-[-0.01em]">{l.name}</h3>
                  <p className="mt-1 text-[13px] text-white/50">Transparent PNG</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {l.variants.map((v) => (
                      <a
                        key={v}
                        href={`/media-kit/${l.file}-${v}.png`}
                        download
                        className="tag bg-white/10 text-[13px] capitalize text-white/85 transition-colors hover:bg-gold hover:text-midnight"
                      >
                        {v} ↓
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <div data-stagger className="grid gap-px overflow-hidden rounded-[8px] bg-ash ring-1 ring-ash md:grid-cols-2">
            {[
              { label: "Vision", text: vision },
              { label: "Mission", text: mission },
            ].map((v) => (
              <div key={v.label} className="bg-ivory p-6 md:p-10">
                <p className="eyebrow text-gold-ink">{v.label}</p>
                <p className="mt-4 font-serif text-[21px] font-light leading-[1.4] tracking-[-0.01em] text-onyx md:text-[24px]">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships + media contact */}
      <section className="section-y bg-fog">
        <div className="container-x grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Media, partnerships & contact"
              title={<>Built for owned IP. <span className="accent">Open to serious collaboration.</span></>}
            />
            <ol data-stagger className="mt-10 divide-y divide-ash border-y border-ash">
              {engagementModels.map((m, i) => (
                <li key={m.title} className="flex gap-5 py-5">
                  <span className="plex-label w-7 shrink-0 pt-1 text-[12px] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-serif text-[21px] font-normal tracking-[-0.01em] text-onyx">{m.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-graphite">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside data-reveal className="self-start rounded-[8px] bg-midnight p-7 text-white md:p-9 lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/prf-studios-gold.webp" alt="PRF Studios — A Pothraj Company" width={520} height={440} loading="lazy" className="h-24 w-auto" />
            <p className="plex-label mt-8 text-champagne">Media / Business</p>
            <ul className="mt-4 space-y-4 text-[15px] text-white/75">
              <li className="flex gap-3">
                <Icon name="mail" size={18} className="mt-0.5 shrink-0 text-champagne" />
                <a href={`mailto:${contact.email}`} className="link-draw break-all hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" size={18} className="mt-0.5 shrink-0 text-champagne" />
                <a href={contact.phoneHref} className="link-draw hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-champagne" />
                <span>{contact.address}</span>
              </li>
            </ul>
            <Link href="/contact/#enquiry" className="btn btn-gold mt-8 w-full">
              Contact the studio <Icon name="arrow" size={18} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
