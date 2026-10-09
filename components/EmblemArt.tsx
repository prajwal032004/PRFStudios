import { emblem, emblemBox } from "@/lib/emblem";

// Gold line-art props cut from the PRF emblem. Strokes stay hairline at any size and carry
// pathLength=1 so initMotion can draw them in ([data-draw-svg]).
type Art = keyof typeof emblem;

function Strokes({ art, width = 1.5 }: { art: Art; width?: number }) {
  return (
    <>
      {emblem[art].map((d) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={width}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );
}

/** Ground line with roots that grow downward as it scrolls into view. */
export function RootsDivider({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none flex justify-center ${className}`}>
      <svg
        data-draw-svg
        viewBox={emblemBox.roots}
        className={`h-auto w-[min(220px,52vw)] md:w-[260px] ${dark ? "text-gold/70" : "text-gold"}`}
      >
        <Strokes art="roots" width={1.4} />
      </svg>
    </div>
  );
}

/** The palm crown — used as a large, faint, floating watermark or a small ornament. */
export function PalmCrown({ className = "", width = 1.2, draw = false }: { className?: string; width?: number; draw?: boolean }) {
  return (
    <svg aria-hidden="true" data-draw-svg={draw || undefined} viewBox={emblemBox.crown} className={className}>
      <Strokes art="crown" width={width} />
    </svg>
  );
}

/** Large crown watermark that drifts with scroll and breathes slowly. */
export function CrownWatermark({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" data-float-parallax className={`pointer-events-none absolute -z-10 ${className}`}>
      <div data-float>
        <PalmCrown className="h-auto w-full text-gold/[0.12]" width={1} />
      </div>
    </div>
  );
}

/** A single leaf petal — list bullet and drifting particle. */
export function LeafPetal({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox={emblemBox.leaf} className={className}>
      <Strokes art="leaf" width={1.4} />
    </svg>
  );
}

/** A few gold petals drifting slowly through a dark section (animated by initMotion). */
export function PetalDrift({ count = 6 }: { count?: number }) {
  const seeds = [
    [8, 22, 34, -18],
    [22, 70, 22, 24],
    [41, 38, 28, -32],
    [63, 18, 20, 12],
    [78, 62, 30, -8],
    [91, 30, 18, 28],
    [54, 82, 24, -22],
  ].slice(0, count);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {seeds.map(([x, y, size, rot], i) => (
        <span
          key={i}
          data-petal
          className="absolute block text-gold/25"
          style={{ left: `${x}%`, top: `${y}%`, width: size, transform: `rotate(${rot}deg)` }}
        >
          <LeafPetal className="h-auto w-full" />
        </span>
      ))}
    </div>
  );
}
