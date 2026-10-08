export const site = {
  name: "PRF Studios",
  legalName: "PRF Studios — A Pothraj Group Company",
  url: "https://prfstudios.in",
  tagline: "Stories. Music. Technology. Production.",
  description:
    "PRF Studios is a Bengaluru-based integrated film, music, digital-content and production-services platform — a Pothraj Group company with a legacy in Kannada cinema since 1994.",
  founded: "1994",
  locale: "en_IN",
  parent: "Pothraj Group",
  keywords: [
    "PRF Studios",
    "film production Bengaluru",
    "production house Bengaluru",
    "Kannada film production",
    "music recording studio Bengaluru",
    "dubbing studio Bengaluru",
    "post-production Bengaluru",
    "editing and CG studio",
    "Videa Films",
    "PRF Music",
    "PRF Digital",
    "Pothraj Group",
  ],
};

export const contact = {
  addressLines: ["Trinity Pothraj", "M. G. Road", "Bengaluru, Karnataka", "India"],
  address: "Trinity Pothraj, M. G. Road, Bengaluru, Karnataka, India",
  street: "Trinity Pothraj, M. G. Road",
  city: "Bengaluru",
  region: "Karnataka",
  country: "IN",
  email: "info@pothrajgroup.com",
  phone: "+91 90088 98922",
  phoneHref: "tel:+919008898922",
  mapsQuery: "Trinity Pothraj, M.G. Road, Bengaluru, Karnataka",
};

export type NavItem = { href: string; label: string; children?: { href: string; label: string; note?: string }[] };

export const nav: NavItem[] = [
  { href: "/studio/", label: "Studio" },
  {
    href: "/divisions/",
    label: "Divisions",
    children: [
      { href: "/divisions/production-services/", label: "PRF Studios", note: "Production services & infrastructure" },
      { href: "/divisions/videa-films/", label: "Videa Films", note: "Feature-film banner" },
      { href: "/divisions/prf-music/", label: "PRF Music", note: "Soundtracks & independent music" },
      { href: "/divisions/prf-digital/", label: "PRF Digital", note: "YouTube, short-form & branded" },
    ],
  },
  {
    href: "/services/",
    label: "Services",
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
  { href: "/work/", label: "Work" },
  { href: "/facilities/", label: "Facilities" },
  { href: "/legacy/", label: "Legacy" },
];
