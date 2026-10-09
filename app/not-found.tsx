import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-vp-100 items-center overflow-hidden bg-midnight text-white">
      <div className="grain pointer-events-none absolute inset-0 overflow-hidden" />
      <div className="container-x relative">
        <p className="eyebrow text-champagne">Error 404 · Scene missing</p>
        <h1 className="display-xl mt-4 max-w-[16ch]">This scene didn&apos;t make the final cut.</h1>
        <p className="mt-6 max-w-lg text-lg text-white/65">The page you&apos;re looking for has moved or never existed.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-gold">
            Back to home <Icon name="arrow" size={18} />
          </Link>
          <Link href="/contact/" className="btn btn-ghost">
            Contact the studio
          </Link>
        </div>
      </div>
      <p aria-hidden="true" className="text-outline pointer-events-none absolute -bottom-10 right-0 select-none text-[38vw] font-serif font-light leading-none tracking-[-0.04em]">
        404
      </p>
    </section>
  );
}
