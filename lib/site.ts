export const site = {
  name: "PRF Studios",
  legalName: "PRF Studios — A Pothraj Company",
  descriptor: "A POTHRAJ COMPANY",
  url: "https://www.prfstudios.in",
  ogVersion: "2",
  social: {
    twitter: undefined as string | undefined,
    facebookAppId: undefined as string | undefined,
  },
  showreel: undefined as undefined | { url: string; type: string; width: number; height: number },
  tagline: "Stories. Music. Technology. Production.",
  headline: "Entertainment built on legacy. Created for the future.",
  description:
    "Bengaluru-based PRF Studios develops films, music and digital content and provides integrated production, post-production and studio services — with an entertainment legacy dating back to 1994.",

  boilerplate:
    "PRF Studios is a Bengaluru-based integrated film, music and digital-content studio with an entertainment legacy dating back to 1994. Through Videa Films, PRF Music, PRF Digital and its studio-services platform, PRF Studios develops original entertainment and supports creative partners from concept through production, post-production and delivery.",
  founded: "1994",
  locale: "en_IN",
  parent: "Pothraj Group",
  keywords: [
    "PRF Studios",
    "film production Bengaluru",
    "production house Bengaluru",
    "Kannada film production",
    "Videa Films",
    "Bombay Dada",
    "music recording studio Bengaluru",
    "post-production Bengaluru",
    "editing and CG studio",
    "AI content production",
    "PRF Music",
    "PRF Digital",
    "Pothraj Group",
  ],
};

export const contact = {
  addressLines: ["Trinity Pothraj Building", "154 Old Madras Road, Trinity Circle", "Bengaluru 560008", "Karnataka, India"],
  address: "Trinity Pothraj Building, 154 Old Madras Road, Trinity Circle, Bengaluru 560008",
  street: "Trinity Pothraj Building, 154 Old Madras Road, Trinity Circle",
  city: "Bengaluru",
  region: "Karnataka",
  postalCode: "560008",
  country: "IN",
  email: "balaji@pothrajgroup.com",
  phone: "+91 91641 41888",
  phoneHref: "tel:+919164141888",
  phoneIntl: "+91-91641-41888",
  mapsQuery: "Trinity Pothraj Building, 154 Old Madras Road, Trinity Circle, Bengaluru 560008",
};

export type NavItem = { href: string; label: string; children?: { href: string; label: string; note?: string }[] };

export const nav: NavItem[] = [
  { href: "/studio/", label: "About" },
  { href: "/films/", label: "Films" },
  {
    href: "/divisions/",
    label: "Divisions",
    children: [
      { href: "/divisions/videa-films/", label: "Videa Films", note: "Feature-film production" },
      { href: "/divisions/prf-music/", label: "PRF Music", note: "Music & audio" },
      { href: "/divisions/prf-digital/", label: "PRF Digital", note: "Digital-first content" },
      { href: "/divisions/production-services/", label: "PRF Studios", note: "Studio services" },
    ],
  },
  {
    href: "/services/",
    label: "Studio & Services",
    children: [
      { href: "/services/development/", label: "Development" },
      { href: "/services/pre-production/", label: "Pre-Production" },
      { href: "/services/production/", label: "Production" },
      { href: "/services/music-and-sound/", label: "Music & Sound" },
      { href: "/services/post-production/", label: "Post-Production" },
      { href: "/services/digital-and-promotion/", label: "Digital & Promotion" },
      { href: "/services/delivery-support/", label: "Delivery Support" },
    ],
  },
  { href: "/legacy/", label: "Heritage" },
];

/**
 * Optional integrations, set as environment variables at build time (see .env.example).
 * Both are public by design: they end up in the browser bundle, so never put a secret here.
 */
export const integrations = {
  /** Form-service URL that accepts a JSON POST (Formspree, Web3Forms, Basin, or your own API). */
  enquiryEndpoint: process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || undefined,
  /** Public access key some form services expect in the payload (e.g. Web3Forms). */
  enquiryAccessKey: process.env.NEXT_PUBLIC_ENQUIRY_ACCESS_KEY || undefined,
  /** Google Analytics 4 measurement ID, e.g. G-XXXXXXXXXX. Without it no analytics script loads. */
  gaId: process.env.NEXT_PUBLIC_GA_ID || undefined,
};
