import Link from "next/link";

export default function Logo({ onNavigate, compact = false }: { onNavigate?: () => void; compact?: boolean }) {
  return (
    <Link href="/" onClick={onNavigate} aria-label="PRF Studios — home" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/pothraj-group-light.webp"
        alt="Pothraj Group"
        width={636}
        height={160}
        className="h-[26px] w-auto transition-opacity duration-300 group-hover:opacity-85 sm:h-[30px] md:h-8"
      />
      {!compact && (
        <>
          <span aria-hidden="true" className="h-6 w-px bg-white/25 sm:h-7" />
          <span className="flex flex-col leading-none text-white">
            <span className="whitespace-nowrap font-serif text-[14px] uppercase tracking-[0.14em] sm:text-[16px]">PRF Studios</span>
            <span className="mt-1 whitespace-nowrap text-[9px] font-medium uppercase sm:text-[10px] tracking-[0.18em] text-champagne/70">Since 1994</span>
          </span>
        </>
      )}
    </Link>
  );
}
