import Link from "next/link";

// Endorsed-brand lockup: the Pothraj Group mark, a hairline, then the studio name.
export default function Logo({ onNavigate, compact = false }: { onNavigate?: () => void; compact?: boolean }) {
  return (
    <Link href="/" onClick={onNavigate} aria-label="PRF Studios — home" className="group flex shrink-0 items-center gap-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/pothraj-group-light.webp"
        alt="Pothraj Group"
        width={636}
        height={160}
        className="h-[30px] w-auto transition-opacity duration-300 group-hover:opacity-85 md:h-8"
      />
      {!compact && (
        <>
          <span aria-hidden="true" className="h-7 w-px bg-white/25" />
          <span className="flex flex-col leading-none text-white">
            <span className="font-serif text-[16px] uppercase tracking-[0.14em]">PRF Studios</span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-champagne/70">Since 1994</span>
          </span>
        </>
      )}
    </Link>
  );
}
