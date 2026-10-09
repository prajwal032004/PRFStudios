import Link from "next/link";

// `decorative` renders the identical lockup without the link — the preloader flies that copy
// into the navbar, so both share exactly the same markup and responsive sizes.
export default function Logo({
  onNavigate,
  compact = false,
  decorative = false,
}: {
  onNavigate?: () => void;
  compact?: boolean;
  decorative?: boolean;
}) {
  const className = "group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3.5";
  const body = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-logo-part
        src="/brand/pothraj-group-light.webp"
        alt={decorative ? "" : "Pothraj Group"}
        width={636}
        height={160}
        className="h-[26px] w-auto transition-opacity duration-300 group-hover:opacity-85 sm:h-[30px] md:h-8"
      />
      {!compact && (
        <>
          <span data-logo-rule aria-hidden="true" className="h-6 w-px bg-white/25 sm:h-7" />
          <span className="flex flex-col leading-none text-white">
            <span data-logo-part className="whitespace-nowrap font-serif text-[14px] uppercase tracking-[0.14em] sm:text-[16px]">
              PRF Studios
            </span>
            <span data-logo-part className="mt-1 whitespace-nowrap text-[9px] font-medium uppercase sm:text-[10px] tracking-[0.18em] text-champagne/70">
              Since 1994
            </span>
          </span>
        </>
      )}
    </>
  );

  if (decorative) {
    return (
      <div aria-hidden="true" className={className}>
        {body}
      </div>
    );
  }
  return (
    <Link href="/" onClick={onNavigate} aria-label="PRF Studios — home" data-logo="nav" className={className}>
      {body}
    </Link>
  );
}
