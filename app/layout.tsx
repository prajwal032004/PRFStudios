import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import { JsonLd, organizationLd, websiteLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
// Editorial serif for the home hero — matches the Pothraj Group display face.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});
const plex = IBM_Plex_Sans({ variable: "--font-ibm-plex-sans", subsets: ["latin"], weight: ["600"], display: "swap" });

const title = "PRF Studios — Film, Music & Production Studio in Bengaluru";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.parent,
  category: "entertainment",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/og/set.jpg", width: 1200, height: 630, alt: "PRF Studios — Stories. Music. Technology. Production." }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og/set.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { email: false, address: false, telephone: false },
  other: { "geo.region": "IN-KA", "geo.placename": "Bengaluru" },
};

export const viewport: Viewport = {
  themeColor: "#12100c",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Chrome Android: the on-screen keyboard overlays content instead of shrinking dvh layouts.
  interactiveWidget: "resizes-visual",
};

// Browsers without dvh (Chrome Android < 108, older WebViews): mirror the visible height into --vh.
const vhFallback = `(function(){try{if(window.CSS&&CSS.supports('height','1dvh'))return;var r=document.documentElement,f=function(){r.style.setProperty('--vh',window.innerHeight*0.01+'px')};f();addEventListener('resize',f,{passive:true});addEventListener('orientationchange',f)}catch(e){}})();`;

// Hide motion targets before first paint; un-hide if the JS bundle never boots.
const motionBoot = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('js-motion','preloading');setTimeout(function(){if(!window.__motionBooted)d.classList.remove('js-motion','preloading')},5000)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${plex.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: vhFallback + motionBoot }} />
      </head>
      <body className="min-h-vp-100 bg-ivory">
        <JsonLd data={[organizationLd, websiteLd]} />
        <SmoothScroll />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Cursor />
      </body>
    </html>
  );
}
