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

`npm run build` produces a fully static site in `out/`. Upload the **contents** of `out/` to the web root.

- **cPanel / Apache (Hostinger, GoDaddy, BigRock…)**: upload to `public_html/`. The included `.htaccess` handles HTTPS, `www` → bare domain, trailing slashes, the 404 page and caching.
- **Netlify / Cloudflare Pages / Vercel**: build command `npm run build`, output directory `out`.
- **Nginx**: point `root` at `out/` and use `try_files $uri $uri/ $uri.html =404; error_page 404 /404.html;`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/studio/` | About the studio |
| `/divisions/` + `/divisions/[slug]/` | PRF Studios, Videa Films, PRF Music, PRF Digital |
| `/services/` + `/services/[slug]/` | The seven production stages |
| `/work/` | Heritage filmography (filterable) and formats |
| `/facilities/` | Shooting floor, recording, dubbing, editing, CG |
| `/legacy/` | The four heritage banners |
| `/contact/` | Enquiry form, details, map |
| `/privacy/` | Privacy policy |

`/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` are generated at build time.

## Editing content

- **Contact details, navigation, SEO keywords** — `lib/site.ts`
- **Divisions, services, banners, filmography, facilities** — `lib/content.ts`
- **Images** — drop originals into `assets-src/` and run `npm run assets`

## Motion

Pages are server components that opt into animation with data attributes, handled by `components/motion/initMotion.ts`:

`data-split` (masked line reveal) · `data-reveal` · `data-stagger` · `data-clip` (image wipe) · `data-parallax` · `data-counter` · `data-scrub-words` · `data-progress-line` · `data-instant` (play on load).

`app/template.tsx` runs the first-visit preloader and the curtain transition between routes. Everything respects `prefers-reduced-motion`, and content stays visible if JavaScript fails to load.

## Contact form

Because the site is static, the enquiry form opens the visitor's email app with a pre-filled message to `info@pothrajgroup.com`. To receive submissions directly, swap the `send` handler in `components/ContactForm.tsx` for a form service (Formspree, Web3Forms, Basin) or an API endpoint.
