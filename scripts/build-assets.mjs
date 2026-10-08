// Generates every optimised image the site serves from the originals in /assets-src.
// Run with `npm run assets` whenever a source image changes.
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SRC = "assets-src";
const PUB = "public";

await mkdir(`${PUB}/brand`, { recursive: true });
await mkdir(`${PUB}/images`, { recursive: true });

// --- Brand marks ---------------------------------------------------------
// Light lockup (gold emblem + white wordmark) exactly as supplied, trimmed of empty margin.
const groupLight = await sharp(`${SRC}/pothraj-group-light.png`).trim().png().toBuffer();
await sharp(groupLight).resize({ height: 160 }).webp({ quality: 92 }).toFile(`${PUB}/brand/pothraj-group-light.webp`);

// Dark lockup for white surfaces: recolour the near-white wordmark to Carbon, keep the gold emblem.
{
  const { data, info } = await sharp(groupLight).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (r > 200 && g > 200 && b > 200) {
      data[i] = data[i + 1] = data[i + 2] = 0x1d;
    }
  }
  await sharp(data, { raw: info }).resize({ height: 160 }).webp({ quality: 92 }).toFile(`${PUB}/brand/pothraj-group-dark.webp`);
}

// Emblem only (left part of the lockup) — used for favicon and small marks.
const meta = await sharp(groupLight).metadata();
const emblem = await sharp(groupLight)
  .extract({ left: 0, top: 0, width: Math.round(meta.height * 0.93), height: meta.height })
  .trim()
  .png()
  .toBuffer();
await sharp(emblem).resize({ height: 192 }).webp({ quality: 90 }).toFile(`${PUB}/brand/emblem.webp`);

for (const name of ["logo-prf-studios", "logo-videa-films"]) {
  await sharp(`${SRC}/${name}.png`).trim().resize({ width: 400, withoutEnlargement: true }).webp({ quality: 92 }).toFile(`${PUB}/brand/${name}.webp`);
}

// --- Icons -----------------------------------------------------------------
async function iconOn(size, pad, radius) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(emblem).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const bg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#12100c"/></svg>`,
  );
  return sharp(bg).composite([{ input: mark, gravity: "center" }]).png().toBuffer();
}
await writeFile("app/icon.png", await iconOn(512, 0.14, 112));
await writeFile("app/apple-icon.png", await iconOn(180, 0.14, 0));
await writeFile(`${PUB}/icon-192.png`, await iconOn(192, 0.14, 42));
await writeFile(`${PUB}/icon-512.png`, await iconOn(512, 0.14, 112));
await sharp(await iconOn(48, 0.1, 10)).toFile(`${PUB}/favicon-48.png`);

// --- Photography -----------------------------------------------------------
const photos = ["set", "cinema", "music", "edit"];
for (const p of photos) {
  await sharp(`${SRC}/${p}.jpg`).resize({ width: 1600 }).webp({ quality: 80 }).toFile(`${PUB}/images/${p}.webp`);
  await sharp(`${SRC}/${p}.jpg`).resize({ width: 800 }).webp({ quality: 76 }).toFile(`${PUB}/images/${p}-sm.webp`);
}

// --- Open Graph images (1200x630), one per hero photograph -----------------
await mkdir(`${PUB}/og`, { recursive: true });
for (const p of photos) {
  const W = 1200;
  const H = 630;
  const photo = await sharp(`${SRC}/${p}.jpg`).resize(W, H, { fit: "cover", position: "centre" }).modulate({ brightness: 0.75 }).toBuffer();
  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#111" stop-opacity="0.95"/>
          <stop offset="0.6" stop-color="#111" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#111" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <text x="72" y="330" font-family="Georgia, Times New Roman, serif" font-weight="400" font-size="88" letter-spacing="-1" fill="#fbf8f2">PRF Studios</text>
      <text x="72" y="400" font-family="Inter, Segoe UI, Arial, sans-serif" font-weight="500" font-size="34" fill="#ffffff" fill-opacity="0.82">Stories. Music. Technology. Production.</text>
      <rect x="72" y="460" width="300" height="52" rx="26" fill="#c6a36e"/>
      <text x="222" y="494" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-weight="600" font-size="22" fill="#12100c">Bengaluru · Since 1994</text>
      <text x="72" y="580" font-family="Inter, Segoe UI, Arial, sans-serif" font-weight="500" font-size="20" fill="#ffffff" fill-opacity="0.6">prfstudios.in</text>
    </svg>`);
  const logo = await sharp(groupLight).resize({ height: 72 }).toBuffer();
  const og = await sharp(photo)
    .composite([{ input: overlay }, { input: logo, top: 64, left: 72 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
  await writeFile(`${PUB}/og/${p}.jpg`, og);
}

console.log("Assets built.");
