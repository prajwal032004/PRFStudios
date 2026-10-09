import type { MetadataRoute } from "next";
import { divisions, filmLead, projects, services } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/studio/", 0.9),
    page("/divisions/", 0.9),
    ...divisions.map((d) => page(`/divisions/${d.slug}/`, 0.8)),
    page("/services/", 0.9),
    ...services.map((s) => page(`/services/${s.slug}/`, 0.7)),
    page("/films/", 0.9, "weekly"),
    ...projects.map((p) => page(`/films/${p.slug}/`, 0.8, "weekly")),
    page(`/leadership/${filmLead.slug}/`, 0.6),
    page("/media/", 0.6),
    page("/facilities/", 0.8),
    page("/legacy/", 0.6, "yearly"),
    page("/contact/", 0.8, "yearly"),
    page("/privacy/", 0.2, "yearly"),
  ];
}
