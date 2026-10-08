import Link from "next/link";
import { services } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import { PageHero, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "Services — Development to Delivery",
  description:
    "Seven production stages, available end-to-end or individually: development, pre-production, production, music & sound, post-production, digital & promotion and delivery support.",
  path: "/services/",
  photo: "edit",
  keywords: ["film production services", "pre-production", "post-production", "dubbing", "delivery support"],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every stage of production, under one roof."
        lead="Choose end-to-end execution, or book exactly the stage you need. Either way, the same team and the same standard."
        photo="edit"
        crumbs={[{ name: "Services", path: "/services/" }]}
        compact
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact/#enquiry" className="btn btn-gold">
            Start a project <Icon name="arrow" size={18} />
          </Link>
          <Link href="/facilities/" className="btn btn-ghost">
            View facilities
          </Link>
        </div>
      </PageHero>

      {/* Process timeline */}
      <section className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The process"
              title="Seven stages, one continuous line."
              lead="Each stage hands cleanly to the next. Start at any point — we'll pick up where your project is today."
            />
          </div>

          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-ash" />
            <span aria-hidden="true" data-progress-line className="absolute bottom-6 left-[23px] top-6 w-px origin-top bg-gold" />
            {services.map((s) => (
              <li key={s.slug} data-reveal className="relative pb-12 pl-20 last:pb-0">
                <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-sm font-semibold text-carbon ring-1 ring-ash">
                  <span className="plex-label text-[14px]">{s.step}</span>
                </span>
                <Link href={`/services/${s.slug}/`} className="group block">
                  <h2 className="flex items-center gap-3 text-[28px] font-serif font-normal tracking-[-0.02em] text-onyx transition-colors group-hover:text-gold-ink md:text-[34px]">
                    {s.name}
                    <Icon name="arrowUpRight" size={22} className="opacity-0 transition duration-300 group-hover:opacity-100" />
                  </h2>
                  <p className="mt-2 text-lg leading-relaxed text-graphite">{s.short}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.includes.slice(0, 3).map((inc) => (
                      <li key={inc} className="tag bg-fog text-[13px] text-graphite">
                        {inc}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Engagement models */}
      <section className="section-y bg-midnight text-white">
        <div className="container-x">
          <SectionHeading dark center eyebrow="Engagement" title="End-to-end, or exactly what you need." />
          <div data-stagger className="mt-14 grid gap-px overflow-hidden rounded-[8px] bg-white/10 md:grid-cols-3">
            {[
              {
                label: "Full production",
                title: "End-to-end",
                text: "We carry the project through all seven stages with one point of accountability, an integrated schedule and a single budget.",
              },
              {
                label: "Stage-based",
                title: "Pick your stages",
                text: "Bring us in for development, the shoot, post, or any combination — and keep the rest of the production with your own team.",
              },
              {
                label: "Facilities",
                title: "Book the rooms",
                text: "Floor time, recording, dubbing, editing or CG sessions, with studio crew available to support your team.",
              },
            ].map((m) => (
              <div key={m.title} className="bg-midnight p-8 md:p-10">
                <p className="plex-label text-white">{m.label}</p>
                <h3 className="mt-4 text-[28px] font-serif font-normal tracking-[-0.02em]">{m.title}</h3>
                <p className="mt-3 text-[15px] font-light leading-relaxed text-white/65">{m.text}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-12 flex justify-center">
            <Link href="/contact/#enquiry" className="btn btn-gold">
              Discuss your project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
