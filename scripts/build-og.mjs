// Renders the Open Graph banners from scripts/og/og-template.html with headless Chrome.
// Usage: node scripts/build-og.mjs [outDir=public/og]
// Needs Chrome/Edge (set CHROME_PATH to override) and network access for Google Fonts.
// Each banner is captured only after the template sets window.__ogReady.
import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { tmpdir } from "node:os";
import sharp from "sharp";

const outDir = resolve(process.argv[2] ?? "public/og");
const photos = ["set", "cinema", "music", "edit"];

// Film and profile banners use the live content (lib/content.ts) so they never drift.
const content = JSON.parse(
  execFileSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--no-warnings",
      "-e",
      "import('./lib/content.ts').then(m => process.stdout.write(JSON.stringify({ projects: m.projects, filmLead: m.filmLead })))",
    ],
    { encoding: "utf8" },
  ),
);

const filmStats = (p) => {
  const langs = p.languages ? p.languages.split("/").map((l) => l.trim()) : [];
  return [...(p.actors ?? []).map((a) => [a, "Cast"]), ...langs.map((l) => [l, "Language"]), [p.kind, "Format"]].slice(0, 3);
};

const jobs = [
  ...photos.map((photo) => ({ file: photo, photo })),
  ...content.projects.map((p) => ({
    file: `film-${p.slug}`,
    photo: "cinema",
    data: {
      eyebrow: `Videa Films · ${p.kind}`,
      title: p.title,
      em: p.subtitle ?? p.genre ?? "",
      stats: filmStats(p),
      label: "Videa Films",
      caption: p.flag ?? "Current slate",
    },
  })),
  (() => {
    const L = content.filmLead;
    const [first, ...rest] = L.name.split(" ");
    const last = rest.pop();
    return {
      file: `profile-${L.slug}`,
      photo: "cinema",
      data: {
        eyebrow: "Leadership · Videa Films",
        title: [first, ...rest].join(" "),
        em: last,
        stats: [
          ["Videa Films", "Banner"],
          [String(content.projects.length), "Slate projects"],
          ["1994", "Studio legacy"],
        ],
        label: "Leadership",
        caption: L.jobTitle,
      },
    };
  })(),
];

const chrome = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
]
  .filter(Boolean)
  .find((p) => existsSync(p));
if (!chrome) throw new Error("Chrome not found — set CHROME_PATH");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9400 + Math.floor(Math.random() * 400);
const profile = join(tmpdir(), `prf-og-${Date.now()}`);
const proc = spawn(
  chrome,
  ["--headless=new", "--hide-scrollbars", "--allow-file-access-from-files", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"],
  { stdio: "ignore" },
);

try {
  let wsUrl;
  for (let i = 0; i < 80 && !wsUrl; i++) {
    await sleep(150);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      wsUrl = list.find((t) => t.type === "page")?.webSocketDebuggerUrl;
    } catch {}
  }
  if (!wsUrl) throw new Error("Could not connect to Chrome");

  const ws = new WebSocket(wsUrl);
  await new Promise((r, j) => ((ws.onopen = r), (ws.onerror = j)));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((r) => {
      const i = ++id;
      pending.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  mkdirSync(outDir, { recursive: true });
  const template = pathToFileURL(resolve("scripts/og/og-template.html")).href;

  for (const { file, photo, data } of jobs) {
    const query = `photo=${photo}${data ? `&data=${encodeURIComponent(JSON.stringify(data))}` : ""}`;
    await send("Page.navigate", { url: `${template}?${query}` });
    let ready = false;
    for (let i = 0; i < 150 && !ready; i++) {
      await sleep(100);
      const r = await send("Runtime.evaluate", { expression: "window.__ogReady === true", returnByValue: true });
      ready = r.result?.result?.value === true;
    }
    if (!ready) throw new Error(`Template never became ready for "${file}"`);
    await sleep(150); // one more paint after the photo swaps in
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
    const png = Buffer.from(shot.result.data, "base64");
    await sharp(png).jpeg({ quality: 88, mozjpeg: true }).toFile(join(outDir, `${file}.jpg`));
    console.log(`og/${file}.jpg`);
  }
  ws.close();
} finally {
  proc.kill();
  await sleep(300);
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}
