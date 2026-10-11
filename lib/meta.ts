import type { Metadata } from "next";
import type { Photo, Video } from "./content";
import { site } from "./site";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/** twitter:site / twitter:creator — only when the studio's X handle is configured. */
export const twitterHandles = () =>
  site.social.twitter ? { site: site.social.twitter, creator: site.social.twitter } : {};

/** Absolute, versioned URL for a banner in /public/og. */
export const ogImageUrl = (file: string) => `/og/${file}.jpg?v=${site.ogVersion}`;

/** og:video descriptor for a video hosted on the site. */
export const ogVideo = (v: Video) => ({
  url: new URL(v.url, site.url).toString(),
  secureUrl: new URL(v.url, site.url).toString(),
  type: v.type,
  width: v.width,
  height: v.height,
});

/** Trim a meta description to what search results show (~160 chars), ending on a whole word. */
export const clip = (text: string, max = 160) => {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
};

export function pageMeta({
  title,
  description,
  path,
  photo = "set",
  ogImage,
  keywords = [],
  openGraph,
}: {
  title: string;
  description: string;
  path: string;
  photo?: Photo;
  ogImage?: string;
  keywords?: string[];
  openGraph?: Partial<OpenGraph> & { type?: string };
}): Metadata {
  const image = {
    url: ogImageUrl(ogImage ?? photo),
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: `${title} — PRF Studios, Bengaluru`,
  };
  description = clip(description);
  return {
    title,
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images: [image],
      ...openGraph,
    } as OpenGraph,
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: image.url, alt: image.alt }],
      ...twitterHandles(),
    },
  };
}
