import { contact, site } from "@/lib/site";
import { pageMeta } from "@/lib/meta";
import { Breadcrumbs } from "@/components/ui";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How PRF Studios handles information you share through prfstudios.in.",
  path: "/privacy/",
});

const sections = [
  {
    title: "What we collect",
    body: "This website does not use accounts, cookies for tracking, or advertising scripts. When you send an enquiry, the form opens your own email app; we receive only what you choose to send — typically your name, contact details and project information.",
  },
  {
    title: "How we use it",
    body: "We use enquiry details solely to respond to you and to discuss the project or booking you asked about. We do not sell or rent personal information.",
  },
  {
    title: "Third-party services",
    body: "The contact page shows an embedded Google Map, and fonts are served with the site. When you interact with the map, Google's own privacy policy applies.",
  },
  {
    title: "Retention",
    body: "We keep correspondence for as long as needed to handle your enquiry and any resulting work, and as required by law.",
  },
  {
    title: "Your choices",
    body: `You can ask us to access, correct or delete the information you have sent by writing to ${contact.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-midnight pb-16 pt-36 text-white md:pt-44">
        <div className="container-x">
          <Breadcrumbs crumbs={[{ name: "Privacy", path: "/privacy/" }]} />
          <h1 data-split data-instant className="display mt-6">
            Privacy policy
          </h1>
          <p data-reveal data-instant className="mt-4 text-white/60">
            {site.legalName}
          </p>
        </div>
      </section>
      <section className="section-y bg-ivory">
        <div className="container-x max-w-3xl">
          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.title} data-reveal>
                <h2 className="heading text-onyx">{s.title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-graphite">{s.body}</p>
              </div>
            ))}
            <p data-reveal className="text-[15px] text-smoke">
              Questions? Contact {contact.email} or {contact.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
