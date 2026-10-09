import Link from "next/link";

// PRF Studios lockup: gold emblem, hairline, the brand wordmark and the approved descriptor.
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
  const className = "group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3";
  const body = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-logo-part
        src="/brand/prf-emblem-gold.webp"
        alt=""
        width={168}
        height={160}
        className="h-[34px] w-auto transition-opacity duration-300 group-hover:opacity-85 md:h-[38px]"
      />
      {!compact && (
        <>
          <span data-logo-rule aria-hidden="true" className="h-7 w-px bg-white/25 md:h-8" />
          <span className="flex flex-col items-start leading-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-logo-part
              src="/brand/prf-wordmark-white.webp"
              alt={decorative ? "" : "PRF Studios"}
              width={595}
              height={72}
              className="h-[14px] w-auto md:h-4"
            />
            <span
              data-logo-part
              className="mt-[5px] whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.3em] text-champagne/80 md:text-[8.5px]"
            >
              A Pothraj Company
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
    <Link href="/" onClick={onNavigate} aria-label="PRF Studios — A Pothraj Company — home" data-logo="nav" className={className}>
      {body}
    </Link>
  );
}
