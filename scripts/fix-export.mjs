// Next.js on Windows writes static-export segment payloads into nested folders
// (out/studio/__next.studio/__PAGE__.txt) while the client requests the flat,
// dotted filename (out/studio/__next.studio.__PAGE__.txt). Flatten them so client
// navigation prefetches resolve on any host. A no-op for builds made on Linux/macOS.
import { readdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";

const OUT = "out";
let moved = 0;

async function flatten(dir, prefix, target) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await flatten(full, name, target);
    else {
      await rename(full, path.join(target, name));
      moved++;
    }
  }
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      await flatten(full, entry.name, dir);
      await rm(full, { recursive: true, force: true });
    } else if (entry.name !== "_next") {
      await walk(full);
    }
  }
}

if (await stat(OUT).catch(() => null)) {
  await walk(OUT);
  console.log(moved ? `fix-export: flattened ${moved} segment files` : "fix-export: nothing to flatten");

  // The export also writes the not-found page as /404/ and /_not-found/, which hosts serve with a
  // 200 status. Only out/404.html (served with a real 404) is needed.
  for (const dir of ["404", "_not-found"]) await rm(path.join(OUT, dir), { recursive: true, force: true });
}
