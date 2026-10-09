import Link from "next/link";
import { notFound } from "next/navigation";
import { filmLead, projects, slateNote, type Project } from "@/lib/content";
import { ogImageUrl, ogVideo, pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";
import Icon from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ArrowLink, PageHero } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const LANG: Record<string, string> = { Kannada: "kn", Malayalam: "ml", Tamil: "ta", Telugu: "te", Hindi: "hi" };
const languagesOf = (p: Project) => (p.languages ? p.languages.split("/").map((l) => l.trim()) : []);
const fullTitle = (p: Project) => (p.subtitle ? `${p.title} — ${p.subtitle}` : p.title);

// video:tag values: genre words, languages, format and banner
const tagsOf = (p: Project) =>
  [...(p.genre ? p.genre.split("·").map((g) => g.trim()) : []), ...languagesOf(p), p.kind, "Videa Films", "PRF Studios"].filter(
    (t, i, a) => a.indexOf(t) === i,
  );

export async function generateMetadata({ params }: PageProps<"/films/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const where = p.languages ? ` (${p.languages})` : "";
  return pageMeta({
    title: `${fullTitle(p)} — Videa Films`,
    description: `${fullTitle(p)}${where}: ${p.text}`.slice(0, 300),
    path: `/films/${p.slug}/`,
    ogImage: `film-${p.slug}`,
    keywords: [p.title, ...(p.subtitle ? [p.subtitle] : []), ...(p.actors ?? []), ...tagsOf(p)],
    openGraph: {
      type: "video.movie",
      ...(p.actors?.length ? { actors: p.actors } : {}),
      ...(p.directors?.length ? { directors: p.directors } : {}),
      ...(p.writers?.length ? { writers: p.writers } : {}),
      ...(p.releaseDate ? { releaseDate: p.releaseDate } : {}),
      tags: tagsOf(p),
      ...(p.trailer ? { videos: [ogVideo(p.trailer)] } : {}),
    },
  });
}

export default async function FilmPage({ params }: PageProps<"/films/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const others = projects.filter((x) => x.slug !== p.slug);
  const url = `${site.url}/films/${p.slug}/`;

  const facts: [string, string][] = [
    ["Banner", "Videa Films · PRF Studios"],
    ["Format", p.kind],
    ...(p.languages ? ([["Language", p.languages]] as [string, string][]) : []),
    ...(p.actors?.length ? ([["Cast", p.actors.join(" · ")]] as [string, string][]) : []),
    ...(p.genre ? ([["Genre", p.genre]] as [string, string][]) : []),
    ...(p.directors?.length ? ([["Director", p.directors.join(", ")]] as [string, string][]) : []),
    ...(p.writers?.length ? ([["Writer", p.writers.join(", ")]] as [string, string][]) : []),
    ...(p.releaseDate ? ([["Release", new Date(p.releaseDate).toLocaleDateString("en-IN", { dateStyle: "long" })]] as [string, string][]) : []),
    ["Status", p.flag ?? (p.kind === "Development" ? "In development" : "Current slate")],
  ];

  const movieLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "@id": `${url}#movie`,
    name: p.title,
    ...(p.subtitle ? { alternateName: fullTitle(p) } : {}),
    description: p.text,
    url,
    image: new URL(ogImageUrl(`film-${p.slug}`), site.url).toString(),
    ...(p.languages ? { inLanguage: languagesOf(p).map((l) => LANG[l] ?? l) } : {}),
    ...(p.genre ? { genre: p.genre.split("·").map((g) => g.trim()) } : {}),
    ...(p.actors?.length ? { actor: p.actors.map((name) => ({ "@type": "Person", name })) } : {}),
    ...(p.directors?.length ? { director: p.directors.map((name) => ({ "@type": "Person", name })) } : {}),
    ...(p.writers?.length ? { author: p.writers.map((name) => ({ "@type": "Person", name })) } : {}),
    ...(p.releaseDate ? { datePublished: p.releaseDate } : {}),
    ...(p.trailer
      ? {
          trailer: {
            "@type": "VideoObject",
            name: `${p.title} — trailer`,
            contentUrl: new URL(p.trailer.url, site.url).toString(),
            thumbnailUrl: new URL(ogImageUrl(`film-${p.slug}`), site.url).toString(),
            description: p.text,
          },
        }
      : {}),
    productionCompany: {
      "@type": "Organization",
      name: "Videa Films",
      parentOrganization: { "@id": `${site.url}/#organization` },
    },
  };

  return (
    <>
      <JsonLd data={movieLd} />
      <PageHero
        eyebrow={`Videa Films · ${p.kind}${p.languages ? ` · ${p.languages}` : ""}`}
        title={
          <>
            {p.title}
            {p.subtitle && <span className="accent block">{p.subtitle}</span>}
          </>
        }
        lead={p.text}
        photo="cinema"
        crumbs={[
          { name: "Films", path: "/films/" },
          { name: p.title, path: `/films/${p.slug}/` },
        ]}
        compact
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/contact/#enquiry" className="btn btn-gold">
            Discuss this project <Icon name="arrow" size={18} />
          </Link>
          <Link href="/films/#slate" className="btn btn-ghost">
            All projects
          </Link>
        </div>
      </PageHero>

      {/* Details + typographic poster */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Project details
            </p>
            <dl data-stagger className="mt-6 divide-y divide-ash border-y border-ash">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="plex-label text-[13px] text-smoke">{k}</dt>
                  <dd className="text-[17px] font-medium text-carbon">{v}</dd>
                </div>
              ))}
            </dl>
            {p.trailer && (
              <div data-reveal className="mt-10 overflow-hidden rounded-[8px] bg-midnight ring-1 ring-ash">
                <video controls preload="metadata" playsInline className="aspect-video w-full" poster={ogImageUrl(`film-${p.slug}`)}>
                  <source src={p.trailer.url} type={p.trailer.type} />
                </video>
              </div>
            )}
            <p data-reveal className="mt-8 max-w-xl text-[14px] leading-relaxed text-smoke">
              {slateNote}
            </p>
          </div>

          <div data-reveal="scale">
            <div className="grain relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-[8px] rounded-tl-[60px] bg-gradient-to-br from-[#3d2e1c] via-[#17120c] to-[#0b0906] p-8 text-white shadow-[var(--shadow-card)] md:p-10">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-[80px]" />
              <div className="relative flex items-start justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
                <span>Videa Films</span>
                <span>{p.languages ?? p.kind}</span>
              </div>
              <span
                aria-hidden="true"
                className="text-outline pointer-events-none absolute -bottom-8 -right-3 select-none font-serif text-[clamp(160px,22vw,260px)] font-light leading-none"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                {p.actors?.length ? <p className="plex-label text-champagne">{p.actors.join(" × ")}</p> : null}
                <p className="mt-3 font-serif text-[clamp(40px,5vw,64px)] font-light leading-[0.98] tracking-[-0.02em]">{p.title}</p>
                {p.subtitle && <p className="mt-2 font-serif text-[22px] italic text-champagne">{p.subtitle}</p>}
                <div className="mt-5 h-px w-12 bg-gold" />
                <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-white/55">{p.genre ?? p.kind}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-y bg-sand">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-end lg:gap-20">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Produced under
            </p>
            <p data-reveal className="mt-4 font-serif text-[26px] text-onyx">
              {filmLead.name}
            </p>
            <p data-reveal className="plex-label mt-2 text-[13px] text-smoke">
              {filmLead.role}
            </p>
            <div data-reveal className="mt-6">
              <ArrowLink href={`/leadership/${filmLead.slug}/`}>Profile</ArrowLink>
            </div>
          </div>
          <blockquote data-reveal className="border-l border-gold pl-6 font-serif text-[clamp(22px,2.8vw,36px)] font-light leading-[1.25] text-onyx md:pl-10">
            &ldquo;{filmLead.quote}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* More from the slate */}
      <section className="section-y bg-ivory">
        <div className="container-x">
          <p data-reveal="fade" className="eyebrow text-gold-ink">
            More from the slate
          </p>
          <ul data-stagger className="mt-6 divide-y divide-ash border-y border-ash">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/films/${o.slug}/`} className="group flex items-center justify-between gap-6 py-5 md:py-6">
                  <span className="min-w-0">
                    <span className="font-serif text-[24px] text-onyx transition-colors group-hover:text-gold-ink md:text-[30px]">{o.title}</span>
                    {o.subtitle && <span className="font-serif text-[18px] italic text-gold-ink md:text-[20px]"> — {o.subtitle}</span>}
                    <span className="mt-1 block text-[14px] text-smoke">
                      {o.kind}
                      {o.languages ? ` · ${o.languages}` : ""}
                      {o.credits ? ` · ${o.credits}` : ""}
                    </span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-ash transition duration-500 group-hover:bg-carbon group-hover:text-white group-hover:ring-carbon">
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
