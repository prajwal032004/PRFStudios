import { contact, site } from "@/lib/site";
import { divisions } from "@/lib/content";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: ["PRF Studios Bengaluru", "PRF", site.legalName],
  url: site.url,
  logo: `${site.url}/media-kit/prf-studios-logo-black.png`,
  image: `${site.url}/og/set.jpg`,
  description: site.description,
  slogan: site.headline,
  foundingDate: site.founded,
  foundingLocation: { "@type": "Place", name: "Bengaluru, Karnataka, India" },
  email: contact.email,
  telephone: contact.phoneIntl,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    addressLocality: contact.city,
    addressRegion: contact.region,
    postalCode: contact.postalCode,
    addressCountry: contact.country,
  },
  areaServed: ["Karnataka", "India"],
  knowsLanguage: ["kn", "en", "ta", "te", "ml"],
  knowsAbout: ["Film production", "Music recording", "Sound production", "Editing", "CG", "Post-production", "Digital content", "AI-assisted content"],
  parentOrganization: { "@type": "Organization", name: site.parent },
  subOrganization: divisions
    .filter((d) => d.name !== site.name)
    .map((d) => ({ "@type": "Organization", name: d.name, url: `${site.url}/divisions/${d.slug}/`, description: d.summary })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "media and business enquiries",
      email: contact.email,
      telephone: contact.phoneIntl,
      areaServed: "IN",
      availableLanguage: ["English", "Kannada"],
    },
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en-IN",
  publisher: { "@id": `${site.url}/#organization` },
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}
