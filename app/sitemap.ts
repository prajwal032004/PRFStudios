import type { MetadataRoute } from "next";
import { divisions, filmLead, projects, services } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// No lastModified: a build timestamp on every URL tells crawlers that everything changes on every
// deploy, which teaches them to ignore the field. Add real per-page dates if they are ever tracked.
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string) => ({ url: `${site.url}${path}` });

  return [
    page("/"),
    page("/studio/"),
    page("/films/"),
    ...projects.map((p) => page(`/films/${p.slug}/`)),
    page("/divisions/"),
    ...divisions.map((d) => page(`/divisions/${d.slug}/`)),
    page("/services/"),
    ...services.map((s) => page(`/services/${s.slug}/`)),
    page("/facilities/"),
    page(`/leadership/${filmLead.slug}/`),
    page("/legacy/"),
    page("/media/"),
    page("/contact/"),
    page("/privacy/"),
  ];
}
