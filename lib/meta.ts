import type { Metadata } from "next";
import type { Photo } from "./content";
import { site } from "./site";

export function pageMeta({
  title,
  description,
  path,
  photo = "set",
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  photo?: Photo;
  keywords?: string[];
}): Metadata {
  const image = { url: `/og/${photo}.jpg`, width: 1200, height: 630, alt: `${title} — PRF Studios, Bengaluru` };
  return {
    title,
    description,
    keywords: [...keywords, ...site.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image.url],
    },
  };
}
