import { contact } from "@/lib/site";
import { engagementModels } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/ui";

export const metadata = pageMeta({
  title: "Contact — Work with PRF Studios",
  description:
    "Talk to PRF Studios about a co-production, production services, music, digital or AI content, or a media enquiry. Trinity Pothraj Building, 154 Old Madras Road, Trinity Circle, Bengaluru 560008 · balaji@pothrajgroup.com · +91 91641 41888.",
  path: "/contact/",
  photo: "set",
  keywords: ["contact PRF Studios", "book recording studio Bengaluru", "film production enquiry"],
});

const details = [
  { icon: "pin", label: "Studio", value: contact.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}` },
  { icon: "mail", label: "Media / Business", value: contact.email, href: `mailto:${contact.email}` },
  { icon: "phone", label: "Phone", value: contact.phone, href: contact.phoneHref },
] as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact/" }])} />

      <section className="relative overflow-hidden bg-midnight pb-16 pt-28 text-white md:pb-24 md:pt-40 xl:pb-28 xl:pt-44">
        <div className="grain pointer-events-none absolute inset-0 overflow-hidden" />
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[320px] w-[320px] rounded-full bg-gold/25 blur-[90px] md:h-[520px] md:w-[520px] md:blur-[120px]" />
        <div className="container-x relative">
          <Breadcrumbs crumbs={[{ name: "Contact", path: "/contact/" }]} />
          <p data-reveal="fade" data-instant className="eyebrow mt-8 text-champagne">
            Contact
          </p>
          <h1 data-split data-instant className="display-xl mt-4 max-w-[16ch]">
            Bring your project to the studio.
          </h1>
          <p data-reveal data-instant data-delay="0.35" className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
            Built for owned IP, open to serious collaboration. Tell us about your film, music, digital or AI-content project
            — or the studio services you need — and we&apos;ll come back with next steps.
          </p>
        </div>
      </section>

      <section id="enquiry" className="section-y scroll-mt-16 bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <aside>
            <h2 data-split className="heading-lg text-onyx">
              Visit, call or write.
            </h2>
            <ul data-stagger className="mt-10 divide-y divide-ash border-y border-ash">
              {details.map((d) => (
                <li key={d.label} className="flex gap-4 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-gold-ink">
                    <Icon name={d.icon} size={18} />
                  </span>
                  <div>
                    <p className="plex-label text-[14px] text-smoke">{d.label}</p>
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="link-draw text-[17px] font-medium text-carbon"
                    >
                      {d.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div data-reveal className="rounded-[8px] bg-fog p-6 md:p-10">
            <h2 className="heading text-onyx">Project enquiry</h2>
            <p className="mt-2 text-[15px] text-graphite">A few details help us put the right team on your project.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-fog">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <p data-reveal="fade" className="eyebrow text-gold-ink">
              Ways to work with PRF
            </p>
            <h2 data-split className="heading-lg mt-4 text-onyx">
              Clearly structured projects, <span className="accent">one studio.</span>
            </h2>
            <p data-reveal className="mt-5 max-w-md text-[17px] leading-relaxed text-graphite">
              We work with producers, directors, writers, artists, agencies, platforms and technology partners.
            </p>
          </div>
          <ol data-stagger className="divide-y divide-ash border-y border-ash">
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
      </section>

      <section aria-label="Map" className="bg-fog pb-24">
        <div className="container-x">
          <div data-clip className="relative aspect-[16/10] overflow-hidden rounded-[8px] ring-1 ring-ash md:aspect-[21/8]">
            <iframe
              title="PRF Studios — Trinity Pothraj Building, 154 Old Madras Road, Trinity Circle, Bengaluru"
              src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapsQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[0.9] contrast-[1.05]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
