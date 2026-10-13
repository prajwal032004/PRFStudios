# PRF Studios — prfstudios.in

Showcase website for **PRF Studios**, the film, music, digital-content and production-services company of the Pothraj Group (Bengaluru, since 1994).

Built with Next.js 16 (App Router, static export), Tailwind CSS v4, GSAP 3 (ScrollTrigger, SplitText, Flip) and Lenis smooth scrolling.

## Commands

```bash
npm install
npm run dev      # local development at http://localhost:3000
npm run build    # static site written to /out
npm run start    # preview /out locally
npm run assets   # regenerate optimised images, icons and OG images from /assets-src
```

## Deploying to prfstudios.in

Production runs on **Vercel**, with `https://www.prfstudios.in` as the primary domain (the bare domain and `http://` redirect to it). `site.url` in `lib/site.ts` must match, since canonical URLs, the sitemap and Open Graph tags are built from it. `vercel.json` holds the redirects (`/work/` → `/films/`), security headers and image caching.

`npm run build` produces a fully static site in `out/`, so the site can also be uploaded to any other host:

- **cPanel / Apache (Hostinger, GoDaddy, BigRock…)**: upload to `public_html/`. The included `.htaccess` mirrors `vercel.json`: HTTPS, bare domain → `www`, trailing slashes, the 404 page and caching.
- **Netlify / Cloudflare Pages / Vercel**: build command `npm run build`, output directory `out`.
- **Nginx**: point `root` at `out/` and use `try_files $uri $uri/ $uri.html =404; error_page 404 /404.html;`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/studio/` | About the studio |
| `/divisions/` + `/divisions/[slug]/` | PRF Studios, Videa Films, PRF Music, PRF Digital |
| `/services/` + `/services/[slug]/` | The seven production stages |
| `/films/` + `/films/[slug]/` | Current Videa Films slate, heritage filmography (filterable), project pages |
| `/leadership/vindhya-balaji-pothraj/` | Leadership profile |
| `/media/` | Media & press kit |
| `/facilities/` | Shooting floor, recording, dubbing, editing, CG |
| `/legacy/` | The four heritage banners |
| `/contact/` | Enquiry form, details, map |
| `/privacy/` | Privacy policy |

`/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` are generated at build time.

## Editing content

- **Contact details, navigation, SEO keywords** — `lib/site.ts`
- **Divisions, services, projects, banners, filmography, facilities** — `lib/content.ts`. Divisions and services carry their own `seoTitle` / `seoDescription` (keep them near 60 / 155 characters). A project's page, sitemap entry, Movie structured data and Open Graph `video.movie` tags are all generated from its entry in `projects`: add `directors`, `writers`, `releaseDate` or a `trailer` there once they are officially announced, and the page picks them up.
- **Images** — drop originals into `assets-src/` and run `npm run assets`

## Motion

Pages are server components that opt into animation with data attributes, handled by `components/motion/initMotion.ts`:

`data-split` (masked line reveal) · `data-reveal` · `data-stagger` · `data-clip` (image wipe) · `data-parallax` · `data-counter` · `data-scrub-words` · `data-progress-line` · `data-instant` (play on load).

`app/template.tsx` runs the logo intro and the curtain transition between routes. The intro plays on every full page load. Every load and refresh starts at the top of the page unless the URL has a #section anchor.

## Maintenance notice

`components/MaintenanceNotice.tsx` shows a blocking "under maintenance" popup over a blurred page, with scrolling disabled. It appears after the logo intro. To take it down, delete that file and the two `MaintenanceNotice` lines in `app/layout.tsx`. Everything respects `prefers-reduced-motion`, and content stays visible if JavaScript fails to load.

## Enquiry form

`components/ContactForm.tsx` adapts its follow-up question to the enquiry type and validates inline. Links can preselect a type: `/contact/?interest=prf-music#enquiry`, or `?interest=production-services&stage=post-production` for a service stage.

Submissions go to `NEXT_PUBLIC_ENQUIRY_ENDPOINT` as a JSON POST when it is set (Formspree, Web3Forms and Basin all work; see `.env.example`). Without it, the form opens the visitor's email app addressed to the studio email in `lib/site.ts`. A hidden honeypot field drops basic bot submissions. The privacy page text follows whichever mode is configured.

## Analytics

`lib/analytics.ts` sends events to `window.dataLayer`, plus `gtag` or Plausible when present. Setting `NEXT_PUBLIC_GA_ID` loads GA4; without it no analytics script loads at all.

| Event | When | Properties |
| --- | --- | --- |
| `cta_click` | Any link to the contact page, or an element with `data-track` | `cta`, `to`, `from` |
| `email_click` / `phone_click` | `mailto:` / `tel:` links | `from` |
| `project_view` | A film page is opened | `project` |
| `video_play` / `video_complete` | Any `<video>` starts (first play) or ends | `video`, `from` |
| `enquiry_start` / `enquiry_submit` / `enquiry_error` | Form focus, success, validation or network failure | `interest`, `method`, `fields` |

Events never contain names, emails, phone numbers or message text.
