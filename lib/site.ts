export const site = {
  name: "PRF Studios",
  legalName: "PRF Studios — A Pothraj Company",
  /** Approved brand descriptor — use exactly this, never earlier variants. */
  descriptor: "A POTHRAJ COMPANY",
  url: "https://prfstudios.in",
  tagline: "Stories. Music. Technology. Production.",
  headline: "Entertainment built on legacy. Created for the future.",
  description:
    "Bengaluru-based PRF Studios develops films, music and digital content and provides integrated production, post-production and studio services — with an entertainment legacy dating back to 1994.",
  /** Short media boilerplate (October 2026 profile). */
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
  /** Media and business enquiries */
  email: "balaji@pothrajgroup.com",
  phone: "+91 91641 41888",
  phoneHref: "tel:+919164141888",
  phoneIntl: "+91-91641-41888",
  mapsQuery: "Trinity Pothraj Building, 154 Old Madras Road, Trinity Circle, Bengaluru 560008",
};

export type NavItem = { href: string; label: string; children?: { href: string; label: string; note?: string }[] };

// Primary navigation, following the October 2026 website blueprint.
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
  { href: "/media/", label: "Media" },
];
