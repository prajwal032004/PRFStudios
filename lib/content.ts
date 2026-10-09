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
      "Sound, music recording and audio production",
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
      "Videa Films is the feature-film banner of PRF Studios, carrying forward a production legacy that began in 1994. The studio's current four-film slate is being developed through this banner.",
      "We look for stories that are commercially viable and culturally rooted — films that can open in theatres, live on satellite and streaming, and find audiences abroad — supported by PRF Music, the studio's post-production infrastructure and its full-fledged shooting floor near Bengaluru.",
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
      "PRF Music continues a publishing tradition that began with Saptaswara Audio Company — more than 150 music titles, including approximately 45–50 devotional titles — and carries it into original soundtracks and artist collaborations.",
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
    short: "Shooting-floor access, crew and on-set management, start to wrap.",
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
    short: "Music recording, soundtrack production, artist collaboration and audio finishing.",
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
    short: "Content packaging, platform-ready delivery and distribution coordination.",
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

/* -------------------------------------------------------------------------- */
/* Heritage banners & filmography                                             */
/* -------------------------------------------------------------------------- */

export type Banner = {
  slug: string;
  name: string;
  role: string;
  /** Headline figure or year shown on timelines */
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
      "A music-publishing house that produced and released more than 150 titles, including approximately 45–50 devotional titles — a devotional library later acquired by Lahari Music.",
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
    metric: "Distributed titles",
    description:
      "A Bengaluru distribution operation across Kannada, Tamil and Telugu cinema, with selected Hindi titles — more than 150 films distributed.",
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

/* -------------------------------------------------------------------------- */
/* Studio facts — as published on the Pothraj Group's PRF Studios pages       */
/* -------------------------------------------------------------------------- */

export const studioStats = [
  { value: 1994, from: 1960, suffix: "", label: "Entertainment legacy begins" },
  { value: 10, suffix: "+", label: "Feature films produced" },
  { value: 150, suffix: "+", label: "Music titles" },
  { value: 150, suffix: "+", label: "Distributed titles" },
  { value: 4, suffix: "", label: "Active film projects" },
];

export const slate = [
  { code: "Project 01", stage: "In development" },
  { code: "Project 02", stage: "In production" },
  { code: "Project 03", stage: "In development" },
  { code: "Project 04", stage: "In development" },
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
