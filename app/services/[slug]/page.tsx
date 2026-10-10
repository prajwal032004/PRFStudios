import Link from "next/link";
import { notFound } from "next/navigation";
import { divisions, photos, services } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import { LeafPetal } from "@/components/EmblemArt";
import { PageHero } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.name} Services in Bengaluru`,
    description: `${s.short} ${s.description}`.slice(0, 300),
    path: `/services/${s.slug}/`,
    photo: s.photo,
    keywords: [s.name, ...s.includes],
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const index = services.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const s = services[index];
  const prev = services[index - 1];
  const next = services[index + 1];
  const leads = divisions.filter((d) => d.services.includes(s.slug));

  return (
    <>
      <PageHero
        eyebrow={`Stage ${s.step} of 07`}
        title={s.name}
        lead={s.short}
        photo={s.photo}
        crumbs={[
          { name: "Services", path: "/services/" },
          { name: s.name, path: `/services/${s.slug}/` },
        ]}
      >
        <Link href="/contact/#enquiry" className="btn btn-gold">
          Enquire about {s.name.toLowerCase()} <Icon name="arrow" size={18} />
        </Link>
      </PageHero>

      {/* Stage progress */}
      <nav aria-label="Production stages" className="border-b border-ash bg-ivory">
        <ol className="container-x flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((x) => (
            <li key={x.slug} className="shrink-0">
              <Link
                href={`/services/${x.slug}/`}
                aria-current={x.slug === s.slug ? "page" : undefined}
                className={`tag transition-colors ${x.slug === s.slug ? "bg-carbon text-white" : "text-graphite hover:bg-fog"}`}
              >
                <span className="plex-label text-[12px] opacity-60">{x.step}</span> {x.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              About this stage
            </p>
            <p data-split className="heading mt-4 text-onyx">
              {s.description}
            </p>

            <div className="mt-14">
              <h2 data-reveal className="plex-label text-carbon">
                What&apos;s included
              </h2>
              <ul data-stagger="0.06" className="mt-5 grid gap-3 sm:grid-cols-2">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-3 rounded-[8px] bg-fog p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-midnight">
                      <LeafPetal className="h-auto w-3.5" />
                    </span>
                    <span className="text-[15px] font-medium text-carbon">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="grid gap-6 md:grid-cols-2 md:items-start lg:sticky lg:top-28 lg:flex lg:flex-col lg:self-start">
            <div data-clip className="aspect-[4/3] overflow-hidden rounded-[8px] md:row-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photos[s.photo].src} alt={photos[s.photo].alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div data-reveal className="rounded-[8px] bg-midnight p-7 text-white">
              <p className="plex-label text-champagne">The outcome</p>
              <p className="mt-3 text-[19px] font-semibold leading-snug tracking-[-0.01em]">{s.outcome}</p>
            </div>
            {leads.length > 0 && (
              <div data-reveal className="rounded-[8px] p-7 ring-1 ring-ash">
                <p className="plex-label text-carbon">Led by</p>
                <ul className="mt-3 space-y-2">
                  {leads.map((d) => (
                    <li key={d.slug}>
                      <Link href={`/divisions/${d.slug}/`} className="group flex items-center justify-between text-[16px] font-medium text-carbon">
                        <span className="link-draw">{d.name}</span>
                        <Icon name="arrow" size={16} className="text-smoke transition group-hover:translate-x-1 group-hover:text-carbon" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Prev / next */}
      <section className="border-t border-ash bg-ivory">
        <div className="container-x grid sm:grid-cols-2">
          {prev ? (
            <Link href={`/services/${prev.slug}/`} className="group border-ash py-10 sm:border-r sm:pr-10 md:py-12">
              <p className="plex-label flex items-center gap-2 text-smoke">
                <Icon name="arrow" size={16} className="rotate-180" /> Previous stage
              </p>
              <p className="heading-lg mt-2 text-onyx transition-colors group-hover:text-gold-ink">{prev.name}</p>
            </Link>
          ) : (
            <Link href="/services/" className="group border-ash py-10 sm:border-r sm:pr-10 md:py-12">
              <p className="plex-label flex items-center gap-2 text-smoke">
                <Icon name="arrow" size={16} className="rotate-180" /> Overview
              </p>
              <p className="heading-lg mt-2 text-onyx transition-colors group-hover:text-gold-ink">All services</p>
            </Link>
          )}
          {next ? (
            <Link href={`/services/${next.slug}/`} className="group border-t border-ash py-10 text-right sm:border-t-0 sm:pl-10 md:py-12">
              <p className="plex-label flex items-center justify-end gap-2 text-smoke">
                Next stage <Icon name="arrow" size={16} />
              </p>
              <p className="heading-lg mt-2 text-onyx transition-colors group-hover:text-gold-ink">{next.name}</p>
            </Link>
          ) : (
            <Link href="/contact/#enquiry" className="group border-t border-ash py-10 text-right sm:border-t-0 sm:pl-10 md:py-12">
              <p className="plex-label flex items-center justify-end gap-2 text-smoke">
                Ready? <Icon name="arrow" size={16} />
              </p>
              <p className="heading-lg mt-2 text-onyx transition-colors group-hover:text-gold-ink">Start a project</p>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
