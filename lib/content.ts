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
    slug: "videa-films",
    name: "Videa Films",
    label: "Film production",
    short: "Feature-film production banner",
    summary:
      "Feature-film development and production for theatrical, satellite, digital and international audiences. Story-led, commercially aware and professionally managed.",
    intro: [
      "Videa Films is the feature-film banner leading the studio's current movie-production phase, with a focus on distinctive concepts, disciplined execution and mainstream audience connection.",
      "It is being built as a professionally managed production house — combining strong concepts, talent partnerships and quality mainstream entertainment, supported by PRF Music, the studio's post-production infrastructure and a full-fledged shooting floor near Bengaluru. Bombay Dada is its first major public project.",
    ],
    covers: [
      "Feature-film development and production",
      "Cross-language projects — Kannada, Malayalam, Tamil",
      "Franchise and long-term IP development",
      "Project-specific co-productions and creative partnerships",
      "Theatrical, satellite, digital and international release planning",
    ],
    audiences: ["Writers & directors", "Co-producers", "Distributors", "Streaming & satellite partners"],
    services: ["development", "pre-production", "production", "post-production", "delivery-support"],
    photo: "cinema",
    logo: "/brand/videa-films-white.webp",
  },
  {
    slug: "prf-music",
    name: "PRF Music",
    label: "Music & audio",
    short: "Soundtracks, independent & regional music",
    summary:
      "Film soundtracks, independent music, devotional and regional content, artist collaborations, music videos and digital release strategy.",
    intro: [
      "PRF Music continues a publishing tradition that began with Saptaswara Audio Company — more than 150 music titles, including approximately 45–50 devotional titles — and carries it into original soundtracks and artist collaborations.",
      "From a film's full soundtrack to an independent single, devotional album or regional collection, PRF Music handles composition support, recording, production and the music video that carries it.",
    ],
    covers: [
      "Film soundtracks and background score",
      "Independent releases and singles",
      "Devotional and regional music",
      "Music video production",
      "Artist collaborations",
      "Digital release strategy and catalogue stewardship",
    ],
    audiences: ["Film producers", "Composers & independent artists", "Devotional & regional performers", "Labels & publishers"],
    services: ["music-and-sound", "production", "digital-and-promotion"],
    photo: "music",
  },
  {
    slug: "prf-digital",
    name: "PRF Digital",
    label: "Digital first",
    short: "YouTube, short-form & branded content",
    summary:
      "YouTube programming, short-form entertainment, interviews, behind-the-scenes content, branded entertainment and original digital series.",
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
  {
    slug: "production-services",
    name: "PRF Studios",
    label: "Studio services",
    short: "Studio services & production infrastructure",
    summary:
      "Creative development, production planning, shooting support, editing, CG, sound, music recording, post-production supervision and final delivery.",
    intro: [
      "PRF Studios is the operating core of the platform — the people, rooms and process that take a project from a page of ideas to a delivered master.",
      "Producers can bring us a complete production or a single requirement. Either way, every job runs through the same planning discipline, the same supervision and the same standard of delivery.",
    ],
    covers: [
      "Creative development and production planning",
      "Shooting-floor access and on-set coordination",
      "Editing, CG and visual finishing",
      "Sound, music recording and audio production",
      "Post-production supervision",
      "Final project delivery and deliverables management",
    ],
    audiences: ["Feature-film producers", "Directors & independent filmmakers", "Brands & agencies", "Music labels & artists"],
    services: ["development", "pre-production", "production", "post-production", "delivery-support"],
    photo: "set",
  },
];

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
      "Scheduling",
      "Casting support",
      "Technical-team coordination",
      "Location planning",
      "Floor and studio preparation",
    ],
    outcome: "A locked plan — schedule, budget, crew and space — ready for the first day of shooting.",
    photo: "set",
  },
  {
    slug: "production",
    name: "Production",
    step: "03",
    short: "Shoot management, production coordination, controlled studio access and project execution.",
    description:
      "From our shooting floor to location work, PRF Studios provides the space, coordination and supervision a shoot needs. We manage the day-to-day of production so directors can focus on performance and picture.",
    includes: [
      "Shoot management",
      "Production coordination",
      "Studio-floor operations",
      "Project execution and reporting",
    ],
    outcome: "Footage captured on schedule and on budget, organised and ready for the edit.",
    photo: "set",
  },
  {
    slug: "music-and-sound",
    name: "Music & Sound",
    step: "04",
    short: "Recording, soundtrack development, artist collaboration, sound production and audio finishing.",
    description:
      "Sound is half of the picture. Our music-recording and audio-production rooms handle a film's songs and soundtrack through to the finished mix — backed by the publishing experience of Saptaswara Audio Company and PRF Music.",
    includes: [
      "Music recording",
      "Soundtrack production",
      "Artist collaboration",
      "Sound integration",
      "Audio finishing",
    ],
    outcome: "A finished soundtrack and mix that carries the story as strongly as the image.",
    photo: "music",
  },
  {
    slug: "post-production",
    name: "Post-Production",
    step: "05",
    short: "Editing, CG, visual enhancement, finishing and mastering.",
    description:
      "Post is where the film is truly made. Our editing suites, CG capability and post supervisors bring the cut, visual effects, colour and sound together into a finished film — tracked against schedule all the way.",
    includes: [
      "Editing",
      "Computer graphics (CG)",
      "Visual enhancement",
      "Sound integration",
      "Finishing and mastering",
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
      "Promotional films and trailers",
      "Behind-the-scenes content",
      "Music videos",
      "YouTube programming",
      "Digital adaptation",
    ],
    outcome: "A release campaign that builds anticipation and keeps the conversation going.",
    photo: "edit",
  },
  {
    slug: "delivery-support",
    name: "Delivery Support",
    step: "07",
    short: "Promotional adaptation, platform-ready packaging and distribution coordination.",
    description:
      "Each platform asks for something different. We prepare and manage the deliverables a project needs to reach theatres, satellite channels, streaming services and international partners — so the last mile doesn't become the hardest one.",
    includes: [
      "Content packaging",
      "Platform-ready delivery",
      "Theatrical and digital formats",
      "Distribution coordination",
      "Deliverables tracking",
    ],
    outcome: "A complete set of approved deliverables, accepted by every platform you release on.",
    photo: "cinema",
  },
];

export type Banner = {
  slug: string;
  name: string;
  role: string;
  mark: string;
  metric: string;
  description: string;
  films?: string[];
};

export const banners: Banner[] = [
  {
    slug: "swati-movies",
    name: "Swati Movies",
    role: "Film production",
    mark: "1994",
    metric: "Where the journey began",
    description:
      "The early production banner and the starting point of the group's entertainment journey in 1994 — associated with the Kannada features Megha Maale, Madhura Maitri and Ganesha I Love You.",
    films: ["Megha Maale", "Madhura Maitri", "Ganesha I Love You"],
  },
  {
    slug: "saptaswara-audio",
    name: "Saptaswara Audio Company",
    role: "Music & audio publishing",
    mark: "150+",
    metric: "Music titles",
    description:
      "More than 150 music titles, including a substantial devotional catalogue of approximately 45–50 titles — a significant portion of which was later sold to Lahari Music.",
  },
  {
    slug: "sri-raghavendra-films",
    name: "Sri Raghavendra Films",
    role: "Film production",
    mark: "Cinema",
    metric: "Across languages and formats",
    description:
      "Feature film production across languages and formats — including the Kannada features Thayi Illada Thavaru, Angayalli Apsare, Hettavaru and Dayadi.",
    films: ["Thayi Illada Thavaru", "Angayalli Apsare", "Hettavaru", "Dayadi"],
  },
  {
    slug: "shivashakti-cine-combines",
    name: "Shivashakti Cine Combines",
    role: "Film distribution",
    mark: "150+",
    metric: "Films distributed",
    description:
      "More than 150 films distributed across Kannada, Tamil, Telugu and selected Hindi cinema.",
  },
];

export type Film = { title: string; banner: string; bannerSlug: string; language: string; tone: string };

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
    label: "Shoot",
    where: "Near Bengaluru",
    description:
      "A full-fledged shooting floor near Bengaluru for film, television, advertising, music videos, digital programming and controlled indoor shoots.",
    photo: "set" as Photo,
  },
  {
    name: "Music Recording",
    label: "Music",
    where: "Bengaluru",
    description:
      "Music-recording infrastructure at our Bengaluru post-production and music facility — for film soundtracks, independent releases, devotional and regional work.",
    photo: "music" as Photo,
  },
  {
    name: "Sound & Audio",
    label: "Sound",
    where: "Bengaluru",
    description: "Sound and audio-production capabilities — soundtrack production, sound integration and audio finishing to picture.",
    photo: "music" as Photo,
  },
  {
    name: "Editing Suites",
    label: "Editing",
    where: "Bengaluru",
    description: "Professional editing suites built for long-form cinema and fast-turnaround digital work, with post-production supervision.",
    photo: "edit" as Photo,
  },
  {
    name: "CG & Finishing",
    label: "Finish",
    where: "Bengaluru",
    description:
      "Computer graphics and visual-content facilities, with finishing, mastering, content packaging and delivery for theatrical and digital formats.",
    photo: "edit" as Photo,
  },
];

export const disciplines = ["Development", "Production", "Music", "Recording", "Editing", "CG", "Sound", "Mastering", "Digital", "Delivery"];

export const studioStats = [
  { value: 1994, from: 1960, suffix: "", label: "Entertainment legacy" },
  { value: 10, suffix: "+", label: "Feature films produced" },
  { value: 150, suffix: "+", label: "Music titles" },
  { value: 150, suffix: "+", label: "Films distributed" },
];

export type Video = { url: string; type: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  kind: "Film" | "Development" | "IP / Film";
  languages?: string;
  credits?: string;
  genre?: string;
  flag?: string;
  text: string;
  /** Lead cast — emitted as video:actor. */
  actors?: string[];
  /** Fill in once officially announced; each is emitted only when set. */
  directors?: string[];
  writers?: string[];
  /** ISO date, e.g. "2027-03-14". */
  releaseDate?: string;
  /** Trailer hosted under /public (e.g. "/media/bombay-dada-trailer.mp4") — emitted as og:video. */
  trailer?: Video;
};

export const projects: Project[] = [
  {
    slug: "bombay-dada",
    title: "Bombay Dada",
    kind: "Film",
    flag: "First major public project",
    credits: "Sharan × Diganth",
    actors: ["Sharan", "Diganth"],
    genre: "Retro comedy · Alternate history",
    text: "A mainstream entertainer that blends comedy, nostalgia and an imaginative alternate-history premise against a recognisable Bombay setting. The project anchors the public launch phase of Videa Films within the PRF Studios ecosystem.",
  },
  {
    slug: "koosa-mattu-kutumba",
    title: "Koosa Mattu Kutumba",
    kind: "Film",
    languages: "Kannada / Malayalam",
    text: "A Videa Films project within the current cross-language production pipeline.",
  },
  {
    slug: "maarsan",
    title: "Maarsan",
    subtitle: "Mallappa vs Marappa",
    kind: "Film",
    languages: "Kannada / Tamil",
    text: "A Videa Films project designed for regional-language adaptation and scalable audience reach.",
  },
  {
    slug: "mkp-sarai-king",
    title: "MKP",
    subtitle: "Sarai King",
    kind: "Development",
    languages: "Kannada",
    text: "Story and project development in progress; intended as an owned or controlled studio IP track.",
  },
  {
    slug: "jungle-diaries",
    title: "Jungle Diaries",
    subtitle: "Naagarahole",
    kind: "IP / Film",
    languages: "Kannada",
    text: "Jungle Diaries is the umbrella IP; Naagarahole is the first Kannada project being developed under it.",
  },
];

export const slateNote =
  "Project titles, casting, collaborators, production status, IP structures and commercial arrangements are subject to definitive agreements and final public announcements.";

export const filmLead = {
  slug: "vindhya-balaji-pothraj",
  name: "Vindhya Balaji Pothraj",
  firstName: "Vindhya",
  lastName: "Pothraj",
  jobTitle: "Head of Film Production",
  role: "Head of Film Production · Videa Films",
  bio: "Her approach brings corporate discipline, structured planning and long-term thinking into creative production. Videa Films is being built as a professionally managed production house capable of combining strong concepts, talent partnerships and quality mainstream entertainment.",
  quote: "Bombay Dada is the first step in our journey and the beginning of a larger vision across cinema, music and digital content.",
};

export const videaPrinciples = [
  { title: "Story-led", text: "Clear concepts, strong character worlds and audience relevance." },
  { title: "Professionally managed", text: "Budget discipline, scheduling, documentation and production governance." },
  { title: "Audience-focused", text: "Commercially viable cinema with cultural grounding and multi-platform potential." },
];

export const groupLeaders = [
  {
    name: "M. K. Pothraj",
    role: "Founder · Pothraj Group",
    text: "Established the foundations of the Group in 1981 through trust, entrepreneurship and regional relationships.",
  },
  {
    name: "Balajhi Pothraj",
    role: "Chairman & CEO · Pothraj Group",
    text: "Unified the businesses into Pothraj Group and expanded it into a diversified institution.",
  },
];

export const aiCapability = {
  intro:
    "PRF Studios is developing an in-house AI-enabled content capability for concept development, video production, creative iteration and new digital formats — combining physical infrastructure, specialist creative supervision and a dedicated operating team.",
  stance:
    "The technology layer supports — not replaces — the studio's core strengths in story, production discipline, music and post.",
  model: [
    {
      label: "Creative hub",
      name: "PRF Studios",
      text: "Creative brief, pre-production, post-production, green-room access and shooting facilities for AI-assisted content and hybrid productions.",
    },
    {
      label: "Specialist partner",
      name: "Synkyn Studios / Dhiraj Kishore",
      text: "Creative and technical advisory for AI content workflows, team supervision and project delivery.",
      link: { href: "https://synkynstudios.com", label: "synkynstudios.com" },
    },
    {
      label: "Infrastructure",
      name: "Pothraj Infrastructure",
      text: "Studio and operating infrastructure to support the creative team, production requirements and scale-up of the capability.",
    },
  ],
  useCases: [
    "Concept visualisation",
    "Previsualisation",
    "AI-assisted video content",
    "Short-form digital programming",
    "Marketing assets",
    "Franchise / IP development",
    "Hybrid live-action + AI experimentation",
  ],
};

export const engagementModels = [
  { title: "Owned productions", text: "Studio-led film, music and digital IP developed within the PRF ecosystem." },
  { title: "Co-productions", text: "Project-specific collaboration with external producers and creative partners." },
  { title: "Production services", text: "Selective or end-to-end studio, post-production, music and delivery support." },
  { title: "Digital & AI content", text: "New-format content, promotional assets, short-form programming and emerging-media experimentation." },
  { title: "Music & rights", text: "Soundtrack creation, artist collaboration, catalogue stewardship and digital release strategy." },
];

export const vision =
  "To build PRF Studios into a respected integrated entertainment platform known for compelling stories, memorable music, professional production infrastructure and enduring creative partnerships.";
export const mission =
  "To develop, produce and support high-quality films, music and digital content by bringing together creative talent, technical capabilities, production discipline and modern distribution opportunities under one unified studio platform.";

export const philosophy = [
  { title: "Story first", text: "Every successful project begins with a strong story, a clear audience and a distinctive creative identity." },
  {
    title: "Professional execution",
    text: "Creative ambition supported by disciplined budgeting, scheduling, technical supervision and production management.",
  },
  { title: "Collaboration", text: "Long-term partnerships with producers, directors, writers, artists, musicians and technicians." },
  {
    title: "Technology-enabled production",
    text: "Editing, graphics, sound, digital distribution and content-management technologies integrated into the workflow.",
  },
  { title: "Long-term IP", text: "Building valuable film, music and digital-content intellectual property across languages, platforms and territories." },
];

export const whyPrf = [
  { title: "Legacy", text: "Three decades of experience across production, music and distribution." },
  { title: "Integration", text: "Creative, technical and production capabilities under one platform." },
  { title: "Infrastructure", text: "Production floor, editing, graphics, music and post-production capabilities." },
  { title: "Collaboration", text: "A platform built to work with producers, directors, writers, artists, musicians and technicians." },
];
