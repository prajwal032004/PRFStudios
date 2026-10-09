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

// --- Approved PRF Studios / Videa Films logos ("A POTHRAJ COMPANY") ---------
// The supplied artwork is single-colour (black on white, white on black), so ink coverage
// becomes the alpha channel and any brand colour can be laid in — crisp on every surface.
async function inkToAlpha(src, { invert, crop }) {
  let img = sharp(src).greyscale();
  if (crop) img = img.extract(crop);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const alpha = Buffer.alloc(info.width * info.height);
  for (let i = 0; i < alpha.length; i++) {
    const ink = invert ? 255 - data[i * info.channels] : data[i * info.channels];
    // Lift paper noise to 0 and solid ink to 255 for clean edges.
    alpha[i] = Math.max(0, Math.min(255, Math.round(((ink - 28) * 255) / 190)));
  }
  return { alpha, width: info.width, height: info.height };
}
async function tint({ alpha, width, height }, hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const px = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) px.set([r, g, b, alpha[i]], i * 4);
  return sharp(px, { raw: { width, height, channels: 4 } }).trim({ threshold: 2 }).png().toBuffer();
}
const BRAND = { gold: "#c6a36e", white: "#fbf8f2", black: "#12100c" };

await mkdir(`${PUB}/media-kit`, { recursive: true });
const prfInk = await inkToAlpha(`${SRC}/prf-studios-logo-source.jpg`, { invert: true });
// Emblem only: everything above the wordmark.
const prfEmblemInk = await inkToAlpha(`${SRC}/prf-studios-logo-source.jpg`, {
  invert: true,
  crop: { left: 0, top: 0, width: 1254, height: 840 },
});
// Wordmark only ("PRF STUDIOS", ink rows 868–996) — paired with the emblem in the navbar.
const prfWordInk = await inkToAlpha(`${SRC}/prf-studios-logo-source.jpg`, {
  invert: true,
  crop: { left: 0, top: 850, width: 1254, height: 165 },
});
// Videa Films: phone screenshot — crop away the status and navigation bars.
const videaInk = await inkToAlpha(`${SRC}/videa-films-logo-source.jpg`, {
  invert: false,
  crop: { left: 0, top: 480, width: 738, height: 640 },
});

for (const [name, colour] of Object.entries(BRAND)) {
  const lockup = await tint(prfInk, colour);
  await sharp(lockup).resize({ width: 520 }).webp({ quality: 92 }).toFile(`${PUB}/brand/prf-studios-${name}.webp`);
  await sharp(lockup).resize({ width: 2000, withoutEnlargement: true }).png().toFile(`${PUB}/media-kit/prf-studios-logo-${name}.png`);
  const mark = await tint(prfEmblemInk, colour);
  await sharp(mark).resize({ height: 160 }).webp({ quality: 92 }).toFile(`${PUB}/brand/prf-emblem-${name}.webp`);
  await sharp(mark).png().toFile(`${PUB}/media-kit/prf-studios-emblem-${name}.png`);
  await sharp(await tint(prfWordInk, colour)).resize({ height: 72 }).webp({ quality: 94 }).toFile(`${PUB}/brand/prf-wordmark-${name}.webp`);
  const videa = await tint(videaInk, colour);
  await sharp(videa).resize({ width: 460 }).webp({ quality: 92 }).toFile(`${PUB}/brand/videa-films-${name}.webp`);
  await sharp(videa).png().toFile(`${PUB}/media-kit/videa-films-logo-${name}.png`);
}
const prfEmblemGold = await tint(prfEmblemInk, BRAND.gold);

// --- Icons -----------------------------------------------------------------
async function iconOn(size, pad, radius) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(prfEmblemGold).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
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

// Open Graph banners are rendered from scripts/og/og-template.html — run `npm run og`.

console.log("Assets built.");
