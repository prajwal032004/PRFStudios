const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17L17 7M8 7h9v9",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
  chevron: "M6 9l6 6 6-6",
  plus: "M12 5v14M5 12h14",
  check: "M5 12.5l4.5 4.5L19 7.5",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21zM12 12.5a3 3 0 100-6 3 3 0 000 6z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  film: "M4 4h16v16H4zM8 4v16M16 4v16M4 8h4M4 12h4M4 16h4M16 8h4M16 12h4M16 16h4",
  mic: "M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zM5 11a7 7 0 0014 0M12 18v3",
  wave: "M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0",
  scissors: "M6 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM8.5 7.5L20 19M8.5 16.5L20 5",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  play: "M8 5v14l11-7z",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6",
  send: "M4 12l16-8-6 16-2.5-6.5L4 12z",
  menu: "M4 8h16M4 16h16",
  close: "M6 6l12 12M18 6L6 18",
  camera: "M3 8h4l2-3h6l2 3h4v11H3zM12 17a4 4 0 100-8 4 4 0 000 8z",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  link: "M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1.5 1.5M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1.5-1.5",
  download: "M12 4v11M7 10l5 5 5-5M5 20h14",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 2-2 5 5M15.5 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  share: "M12 15V3M8 7l4-4 4 4M5 12v8h14v-8",
  back: "M19 12H5M11 6l-6 6 6 6",
  reload: "M20 11a8 8 0 10-2.3 5.7M20 4v7h-7",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4",
  quote: "M7 7h4v4c0 3-1.5 5-4 6M14 7h4v4c0 3-1.5 5-4 6",
  home: "M4 11l8-7 8 7M6 9.5V20h12V9.5",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  palette:
    "M12 3a9 9 0 000 18c1.1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5 0-.8.7-1.5 1.5-1.5H16a5 5 0 005-5c0-4-4-7.5-9-7.5zM7.5 12a1 1 0 100-2 1 1 0 000 2zM10.5 8a1 1 0 100-2 1 1 0 000 2zM15 8.5a1 1 0 100-2 1 1 0 000 2z",
  highlight: "M5 20h14M8 16l8-8 3 3-8 8H8z",
} as const;

export type IconName = keyof typeof paths;

export default function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.5,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const filled = name === "play";
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
