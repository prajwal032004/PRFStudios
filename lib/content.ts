export type Photo = "set" | "cinema" | "music" | "edit";

export const photos: Record<Photo, { src: string; sm: string; alt: string }> = {
  set: {
    src: "/images/set.webp",
    sm: "/images/set-sm.webp",
    alt: "A film crew working around a camera dolly on a lit shooting floor",
  },
  cinema: {
    src: "/images/cinema.webp",
    sm: "/images/cinema-sm.webp",
    alt: "A projector beam lighting the screen of an empty cinema auditorium",
  },
  music: {
    src: "/images/music.webp",
    sm: "/images/music-sm.webp",
    alt: "An analogue mixing console in a warm music recording control room",
  },
  edit: {
    src: "/images/edit.webp",
    sm: "/images/edit-sm.webp",
    alt: "An editor at a colour-grading suite in front of a large cinema display",
  },
};

/* -------------------------------------------------------------------------- */
/* Divisions                                                                  */
/* -------------------------------------------------------------------------- */

export type Division = {
  slug: string;
  name: string;
  label: string;
  short: string;
  summary: string;
  intro: string[];
  covers: string[];
  audiences: string[];
  services: string[];
  photo: Photo;
  logo?: string;
};

export const divisions: Division[] = [
  {
    slug: "production-services",
    name: "PRF Studios",
    label: "Production",
    short: "Production services & studio infrastructure",
    summary:
      "Creative development, production planning, shooting-floor access, editing, CG, sound, music recording, post-production supervision and project delivery.",
    intro: [
      "PRF Studios is the operating core of the platform — the people, rooms and process that take a project from a page of ideas to a delivered master.",
      "Producers can bring us a complete production or a single requirement. Either way, every job runs through the same planning discipline, the same supervision and the same standard of delivery.",
    ],
    covers: [
      "Creative development and production planning",
      "Shooting-floor access and on-set coordination",
      "Editing, CG and visual finishing",
      "Sound design, dubbing and music recording",
      "Post-production supervision",
      "Final project delivery and deliverables management",
    ],
    audiences: ["Feature-film producers", "Directors & independent filmmakers", "Brands & agencies", "Music labels & artists"],
    services: ["development", "pre-production", "production", "post-production", "delivery-support"],
    photo: "set",
  },
  {
    slug: "videa-films",
    name: "Videa Films",
    label: "Cinema",
    short: "Feature-film production banner",
    summary:
      "Developing commercially viable and culturally rooted cinema for theatrical, satellite, digital and international audiences.",
    intro: [
      "Videa Films is the feature-film banner of PRF Studios. It carries forward three decades of Kannada filmmaking into a new slate built for every screen.",
      "We look for stories that are rooted in the culture they come from and strong enough to travel — films that can open in theatres, live on satellite and streaming, and find audiences abroad.",
    ],
    covers: [
      "Original feature development",
      "Co-productions and partnerships",
      "Theatrical release planning",
      "Satellite and digital rights strategy",
      "International festival and market positioning",
    ],
    audiences: ["Writers & directors", "Co-producers", "Distributors", "Streaming & satellite partners"],
    services: ["development", "pre-production", "production", "post-production", "delivery-support"],
    photo: "cinema",
    logo: "/brand/logo-videa-films.webp",
  },
  {
    slug: "prf-music",
    name: "PRF Music",
    label: "Music",
    short: "Soundtracks, independent & regional music",
    summary:
      "Film soundtracks, independent music, devotional and regional content, music videos and artist collaborations.",
    intro: [
      "PRF Music continues a catalogue tradition that began with Saptaswara Audio Company — and pairs it with a modern recording room and release pipeline.",
      "From a film's full soundtrack to an independent single, devotional album or regional collection, PRF Music handles composition support, recording, production and the music video that carries it.",
    ],
    covers: [
      "Film soundtracks and background score",
      "Independent releases and singles",
      "Devotional and regional music",
      "Music video production",
      "Artist collaborations",
    ],
    audiences: ["Film producers", "Composers & independent artists", "Devotional & regional performers", "Labels & publishers"],
    services: ["music-and-sound", "production", "digital-and-promotion"],
    photo: "music",
  },
  {
    slug: "prf-digital",
    name: "PRF Digital",
    label: "Digital",
    short: "YouTube, short-form & branded content",
    summary:
      "YouTube programming, short-form entertainment, interviews, behind-the-scenes features, promotional films, branded content and original digital series.",
    intro: [
      "PRF Digital is where the studio meets the feed. It builds programming for YouTube and social platforms with the same craft we bring to the big screen.",
      "That includes the content around a film — interviews, behind-the-scenes, promotional cuts — as well as branded work and original series made for digital first.",
    ],
    covers: [
      "YouTube programming and channel content",
      "Short-form entertainment",
      "Interviews and behind-the-scenes features",
      "Promotional films and trailers",
      "Branded content",
      "Original digital series",
    ],
    audiences: ["Films in release", "Brands & agencies", "Creators & presenters", "Platforms & channels"],
    services: ["production", "post-production", "digital-and-promotion"],
    photo: "edit",
  },
];

/* -------------------------------------------------------------------------- */
/* Services — the seven stages                                                */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  name: string;
  step: string;
  short: string;
  description: string;
  includes: string[];
  outcome: string;
  photo: Photo;
};

export const services: Service[] = [
  {
    slug: "development",
    name: "Development",
    step: "01",
    short: "Shape the idea into a project that can be financed, cast and made.",
    description:
      "Every production starts as an idea that has to survive contact with budgets, schedules and audiences. Development is where we test it — refining story and script, defining the format and audience, and building the package that lets a project move forward with confidence.",
    includes: [
      "Concept and story development",
      "Script consultation and refinement",
      "Format and audience definition",
      "Project packaging and pitch materials",
      "Early budget and feasibility estimates",
    ],
    outcome: "A project with a clear creative direction, a defined audience and a realistic path to production.",
    photo: "cinema",
  },
  {
    slug: "pre-production",
    name: "Pre-Production",
    step: "02",
    short: "Plan the shoot so the days on set are spent making, not solving.",
    description:
      "Good productions are won in planning. We break the script down, build the schedule and budget, lock locations and floor time, and assemble the crew — so that when the camera rolls, the team knows exactly what each day has to deliver.",
    includes: [
      "Script breakdown and scheduling",
      "Detailed budgeting",
      "Crew assembly and casting coordination",
      "Location scouting and floor booking",
      "Equipment planning and logistics",
    ],
    outcome: "A locked plan — schedule, budget, crew and space — ready for the first day of shooting.",
    photo: "set",
  },
  {
    slug: "production",
    name: "Production",
    step: "03",
    short: "Shooting-floor access, crew and on-set management, start to wrap.",
    description:
      "From our shooting floor to location work, PRF Studios provides the space, coordination and supervision a shoot needs. We manage the day-to-day of production so directors can focus on performance and picture.",
    includes: [
      "Shooting-floor access",
      "Line production and on-set coordination",
      "Camera, lighting and grip planning",
      "Production management and reporting",
      "Data handling and dailies workflow",
    ],
    outcome: "Footage captured on schedule and on budget, organised and ready for the edit.",
    photo: "set",
  },
  {
    slug: "music-and-sound",
    name: "Music & Sound",
    step: "04",
    short: "Recording, dubbing, score and the full sound of the film.",
    description:
      "Sound is half of the picture. Our recording and dubbing rooms handle everything from a film's songs and background score to dialogue replacement and the final mix — backed by PRF Music's long catalogue experience.",
    includes: [
      "Music recording and production",
      "Background score support",
      "Dubbing and dialogue replacement",
      "Sound design and Foley coordination",
      "Mixing and audio finishing",
    ],
    outcome: "A finished soundtrack and mix that carries the story as strongly as the image.",
    photo: "music",
  },
  {
    slug: "post-production",
    name: "Post-Production",
    step: "05",
    short: "Editing, CG, colour and supervision through to the final master.",
    description:
      "Post is where the film is truly made. Our editing suites, CG capability and post supervisors bring the cut, visual effects, colour and sound together into a finished film — tracked against schedule all the way.",
    includes: [
      "Offline and online editing",
      "CG and visual effects",
      "Colour grading",
      "Titles and graphics",
      "Post-production supervision",
    ],
    outcome: "A locked, graded and finished master, ready for delivery.",
    photo: "edit",
  },
  {
    slug: "digital-and-promotion",
    name: "Digital & Promotion",
    step: "06",
    short: "Trailers, interviews, behind-the-scenes and the campaign around a release.",
    description:
      "A finished film still needs an audience. PRF Digital produces the promotional layer — trailers, teasers, interviews, behind-the-scenes features and short-form cuts — and programmes them for YouTube and social platforms.",
    includes: [
      "Trailers, teasers and promotional cuts",
      "Interviews and behind-the-scenes features",
      "Short-form and social content",
      "YouTube programming",
      "Branded and partner content",
    ],
    outcome: "A release campaign that builds anticipation and keeps the conversation going.",
    photo: "edit",
  },
  {
    slug: "delivery-support",
    name: "Delivery Support",
    step: "07",
    short: "Masters, versions and deliverables for theatrical, satellite and digital.",
    description:
      "Each platform asks for something different. We prepare and manage the deliverables a project needs to reach theatres, satellite channels, streaming services and international partners — so the last mile doesn't become the hardest one.",
    includes: [
      "Theatrical and digital masters",
      "Platform-specific versions and formats",
      "Subtitle and language version coordination",
      "Deliverables tracking and quality control",
      "Archive and asset management",
    ],
    outcome: "A complete set of approved deliverables, accepted by every platform you release on.",
    photo: "cinema",
  },
];

/* -------------------------------------------------------------------------- */
/* Heritage banners & filmography                                             */
/* -------------------------------------------------------------------------- */

export type Banner = {
  slug: string;
  name: string;
  role: string;
  description: string;
  films?: string[];
};

export const banners: Banner[] = [
  {
    slug: "swati-movies",
    name: "Swati Movies",
    role: "Feature production",
    description: "A production banner associated with the Kannada features Megha Maale, Madhura Maitri and Ganesha I Love You.",
    films: ["Megha Maale", "Madhura Maitri", "Ganesha I Love You"],
  },
  {
    slug: "sri-raghavendra-films",
    name: "Sri Raghavendra Films",
    role: "Feature production",
    description: "Produced the Kannada features Thayi Illada Thavaru, Angayalli Apsare, Hettavaru and Dayadi.",
    films: ["Thayi Illada Thavaru", "Angayalli Apsare", "Hettavaru", "Dayadi"],
  },
  {
    slug: "saptaswara-audio",
    name: "Saptaswara Audio Company",
    role: "Music publishing",
    description: "A music-publishing house with an extensive catalogue — the foundation of PRF Music today.",
  },
  {
    slug: "shivashakti-cine-combines",
    name: "Shivashakti Cine Combines",
    role: "Distribution",
    description: "A Bengaluru distribution operation working across Kannada, Tamil and Telugu cinema.",
  },
];

export type Film = { title: string; banner: string; bannerSlug: string; language: string; tone: string };

// Warm, logo-matched poster grades
const tones = [
  "from-[#3a2c1a] via-[#1d1610] to-[#0d0a07]",
  "from-[#2e2418] via-[#17120c] to-[#0b0906]",
  "from-[#433220] via-[#211810] to-[#0e0b07]",
  "from-[#2a2017] via-[#15110c] to-[#0a0806]",
  "from-[#4a3822] via-[#231a10] to-[#0f0c08]",
  "from-[#33291d] via-[#19140e] to-[#0b0907]",
  "from-[#3d2e1c] via-[#1e170f] to-[#0d0a07]",
];

export const films: Film[] = banners
  .flatMap((b) => (b.films ?? []).map((title) => ({ title, banner: b.name, bannerSlug: b.slug, language: "Kannada" })))
  .map((f, i) => ({ ...f, tone: tones[i % tones.length] }));

/* -------------------------------------------------------------------------- */
/* Facilities                                                                 */
/* -------------------------------------------------------------------------- */

export const facilities = [
  {
    name: "Shooting Floor",
    label: "Record",
    description: "Floor space for sets, interviews, music videos and branded shoots, with production support on hand.",
    photo: "set" as Photo,
  },
  {
    name: "Recording Rooms",
    label: "Music",
    description: "Rooms for songs, score, voice and instruments — set up for film soundtracks and independent releases alike.",
    photo: "music" as Photo,
  },
  {
    name: "Dubbing Suites",
    label: "Dubbing",
    description: "Dialogue replacement and language versions, recorded to picture with careful lip-sync supervision.",
    photo: "music" as Photo,
  },
  {
    name: "Editing Suites",
    label: "Editing",
    description: "Offline and online editing rooms built for long-form cinema and fast-turnaround digital work.",
    photo: "edit" as Photo,
  },
  {
    name: "CG & Finishing",
    label: "Finish",
    description: "CG, visual effects and finishing under one roof, supervised by our post team through to the final master.",
    photo: "edit" as Photo,
  },
];

export const disciplines = ["Recording", "Dubbing", "Editing", "Music", "CG", "Colour", "Sound", "Production", "Development", "Delivery"];
