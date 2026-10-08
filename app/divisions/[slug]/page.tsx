import Link from "next/link";
import { notFound } from "next/navigation";
import { divisions, photos, services } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import { ArrowLink, PageHero, SectionHeading } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/divisions/[slug]">) {
  const { slug } = await params;
  const d = divisions.find((x) => x.slug === slug);
  if (!d) return {};
  return pageMeta({
    title: `${d.name} — ${d.short}`,
    description: `${d.summary} ${d.intro[0]}`.slice(0, 300),
    path: `/divisions/${d.slug}/`,
    photo: d.photo,
    keywords: [d.name, ...d.covers],
  });
}

export default async function DivisionPage({ params }: PageProps<"/divisions/[slug]">) {
  const { slug } = await params;
  const index = divisions.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const d = divisions[index];
  const next = divisions[(index + 1) % divisions.length];
  const related = services.filter((s) => d.services.includes(s.slug));

  return (
    <>
      <PageHero
        eyebrow={`Division ${String(index + 1).padStart(2, "0")} · ${d.label}`}
        title={d.name}
        lead={d.summary}
        photo={d.photo}
        crumbs={[
          { name: "Divisions", path: "/divisions/" },
          { name: d.name, path: `/divisions/${d.slug}/` },
        ]}
        compact
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact/#enquiry" className="btn btn-gold">
            Talk to {d.name} <Icon name="arrow" size={18} />
          </Link>
          {d.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={d.logo} alt={`${d.name} logo`} className="ml-3 h-16 w-auto" />
          )}
        </div>
      </PageHero>

      {/* Overview */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Overview
            </p>
            <h2 data-split className="heading-lg mt-4 text-onyx">
              {d.short}.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-graphite">
            {d.intro.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What it covers — dark presentation */}
      <section className="section-y bg-midnight text-white">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading dark eyebrow="What we cover" title={`Inside ${d.name}.`} />
            <ul data-stagger className="mt-10 border-t border-white/10">
              {d.covers.map((c, i) => (
                <li key={c} className="flex items-baseline gap-5 border-b border-white/10 py-5">
                  <span className="plex-label text-sm text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[19px] font-medium tracking-[-0.01em]">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <div data-clip className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos[d.photo].src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div data-reveal className="rounded-[8px] bg-white/5 p-7 ring-1 ring-white/10">
              <p className="plex-label text-white">Who we work with</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {d.audiences.map((a) => (
                  <li key={a} className="tag bg-white/10 text-white/85">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Related services"
            title="The stages this division leads."
            action={<ArrowLink href="/services/">All services</ArrowLink>}
          />
          <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="group flex h-full flex-col rounded-[8px] bg-fog p-7 transition-colors duration-500 hover:bg-sand"
                >
                  <span className="plex-label text-gold-ink">{s.step}</span>
                  <h3 className="mt-3 text-[24px] font-serif font-normal tracking-[-0.02em] text-onyx">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite">{s.short}</p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-carbon">
                    Learn more <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next division */}
      <section className="border-t border-ash bg-ivory">
        <Link
          href={`/divisions/${next.slug}/`}
          data-cursor="Next"
          className="container-x group flex items-center justify-between gap-6 py-16 md:py-20"
        >
          <div>
            <p className="plex-label text-smoke">Next division</p>
            <p className="display mt-2 text-onyx transition-colors duration-500 group-hover:text-gold-ink">{next.name}</p>
          </div>
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full ring-1 ring-ash transition duration-500 group-hover:bg-carbon group-hover:text-white md:h-20 md:w-20">
            <Icon name="arrow" size={26} />
          </span>
        </Link>
      </section>
    </>
  );
}
