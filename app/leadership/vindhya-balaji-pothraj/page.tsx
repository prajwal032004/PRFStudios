import Link from "next/link";
import { filmLead, projects, videaPrinciples } from "@/lib/content";
import { ogImageUrl, pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";
import Icon from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui";

const path = `/leadership/${filmLead.slug}/`;

export const metadata = pageMeta({
  title: `${filmLead.name} — ${filmLead.jobTitle}, Videa Films`,
  description: `${filmLead.name} is ${filmLead.jobTitle} at Videa Films, the feature-film banner of PRF Studios. ${filmLead.bio}`.slice(0, 300),
  path,
  ogImage: `profile-${filmLead.slug}`,
  keywords: [filmLead.name, "Videa Films", "Head of Film Production", "Bombay Dada"],
  openGraph: {
    type: "profile",
    firstName: filmLead.firstName,
    lastName: filmLead.lastName,
  },
});

export default function LeadershipProfile() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}${path}#person`,
    name: filmLead.name,
    givenName: filmLead.firstName,
    familyName: filmLead.lastName,
    jobTitle: filmLead.jobTitle,
    description: filmLead.bio,
    url: `${site.url}${path}`,
    image: new URL(ogImageUrl(`profile-${filmLead.slug}`), site.url).toString(),
    worksFor: {
      "@type": "Organization",
      name: "Videa Films",
      parentOrganization: { "@id": `${site.url}/#organization` },
    },
  };

  return (
    <>
      <JsonLd data={personLd} />
      <PageHero
        eyebrow="Leadership · Videa Films"
        title={filmLead.name}
        lead={`${filmLead.jobTitle} at Videa Films, the feature-film production banner within the PRF Studios ecosystem.`}
        photo="cinema"
        crumbs={[
          { name: "About", path: "/studio/" },
          { name: filmLead.name, path },
        ]}
      >
        <Link href="/films/" className="btn btn-gold">
          Videa Films slate <Icon name="arrow" size={18} />
        </Link>
      </PageHero>

      <section className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-reveal="fade"
              src="/brand/videa-films-black.webp"
              alt="Videa Films — A Pothraj Company"
              width={460}
              height={315}
              loading="lazy"
              className="h-auto w-[min(240px,60%)]"
            />
            <p data-reveal className="plex-label mt-10 text-gold-ink">
              {filmLead.role}
            </p>
            <p data-reveal className="mt-5 max-w-xl text-[17px] leading-relaxed text-graphite md:text-lg">
              {filmLead.bio}
            </p>
          </div>
          <figure data-reveal className="self-center border-l border-gold pl-6 md:pl-10">
            <blockquote className="font-serif text-[clamp(26px,3.4vw,46px)] font-light leading-[1.2] tracking-[-0.015em] text-onyx">
              &ldquo;{filmLead.quote}&rdquo;
            </blockquote>
            <figcaption className="plex-label mt-6 text-gold-ink">— {filmLead.name}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section-y bg-midnight text-white">
        <div className="container-x">
          <p data-reveal="fade" className="eyebrow text-champagne">
            How Videa Films works
          </p>
          <ol data-stagger className="mt-8 grid gap-px overflow-hidden rounded-[8px] bg-white/10 md:grid-cols-3">
            {videaPrinciples.map((v, i) => (
              <li key={v.title} className="bg-midnight p-6 md:p-8">
                <p className="plex-label text-[12px] text-champagne">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-serif text-[24px] font-normal tracking-[-0.01em]">{v.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-ivory">
        <div className="container-x">
          <p data-reveal="fade" className="eyebrow text-gold-ink">
            Leading the current slate
          </p>
          <ul data-stagger className="mt-6 divide-y divide-ash border-y border-ash">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/films/${p.slug}/`} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="font-serif text-[24px] text-onyx transition-colors group-hover:text-gold-ink">{p.title}</span>
                    {p.subtitle && <span className="font-serif text-[18px] italic text-gold-ink"> — {p.subtitle}</span>}
                    <span className="mt-1 block text-[14px] text-smoke">
                      {p.kind}
                      {p.languages ? ` · ${p.languages}` : ""}
                      {p.credits ? ` · ${p.credits}` : ""}
                    </span>
                  </span>
                  <Icon name="arrowUpRight" size={18} className="shrink-0 text-smoke transition group-hover:text-carbon" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
