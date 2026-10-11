import { contact, integrations, site } from "@/lib/site";
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
    body: integrations.enquiryEndpoint
      ? "This website has no accounts or advertising scripts. When you send an enquiry, the details you enter — your name, email, optional phone number and company, and your project information — are delivered to the studio team through a secure form-processing service. Nothing else is collected through the form."
      : "This website has no accounts or advertising scripts. When you send an enquiry, the form opens your own email app; we receive only what you choose to send — typically your name, contact details and project information.",
  },
  {
    title: "How we use it",
    body: "We use enquiry details solely to respond to you and to discuss the project or booking you asked about. We do not sell or rent personal information.",
  },
  ...(integrations.gaId
    ? [
        {
          title: "Analytics",
          body: "We use Google Analytics to understand how the site is used — pages visited, buttons clicked and whether an enquiry was sent. These measurements use cookies and never include what you type into the form. You can block them with your browser's privacy settings or an extension.",
        },
      ]
    : []),
  {
    title: "Third-party services",
    body: "Fonts are served with the site. The map on the contact page loads from Google only when you choose to show it; Google's own privacy policy then applies.",
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
