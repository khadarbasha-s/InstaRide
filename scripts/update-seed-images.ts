// Remaps every car's images array to the new SVG paths in prisma/seed.ts.
// Each car slug maps to a base model slug; the images become
// [`/cars/${base}-1.svg`, `/cars/${base}-2.svg`].
//
// Run:  pnpm tsx scripts/update-seed-images.ts

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const SEED_PATH = join(__dirname, "..", "prisma", "seed.ts");

const MAP: Record<string, string> = {
  // Goa
  "goa-nexa-xl6-manual": "xl6",
  "goa-baleno-manual": "baleno",
  "goa-innova-hycross-auto": "innova-hycross",
  "goa-baleno-auto": "baleno",
  "goa-swift-auto": "swift",
  "goa-thar-hardtop-auto": "thar",
  "goa-thar-convertible-auto": "thar-convertible",
  "goa-swift-manual": "swift",
  "goa-i20-manual": "i20",
  "goa-i20-auto": "i20",
  "goa-creta-manual": "creta",
  "goa-creta-auto-sunroof": "creta",
  "goa-alcazar-auto-sunroof": "alcazar",
  "goa-ertiga-manual": "ertiga",
  "goa-kia-carens-manual": "carens",
  "goa-ertiga-auto": "ertiga",
  "goa-thar-hardtop-manual": "thar",
  "goa-jimny-auto": "jimny",
  "goa-thar-roxx-auto": "thar-roxx",
  "goa-ignis-manual": "ignis",
  "goa-sonet-venue-auto-sunroof": "sonet",
  "goa-thar-convertible-manual": "thar-convertible",
  "goa-fronx-manual": "fronx",
  "goa-fortuner-auto": "fortuner",
  "goa-innova-crysta-auto": "innova-crysta",
  "goa-innova-crysta-manual": "innova-crysta",
  "goa-venue-manual": "venue",
  "goa-dzire-manual": "dzire",
  "goa-mini-cooper-convertible": "mini-cooper",
  "goa-audi-a3-convertible": "audi-a3",
  "goa-venue-sunroof-auto": "venue",

  // Jaipur
  "jaipur-toyota-glanza-manual": "glanza",
  "jaipur-tata-tigor-manual": "tigor",
  "jaipur-i10-nios-cng": "i10-nios",
  "jaipur-aura-cng": "aura",
  "jaipur-i20-cng": "i20",
  "jaipur-thar-4x4-hardtop-manual": "thar",
  "jaipur-swift-new-manual": "swift",
  "jaipur-swift-old-manual": "swift",
  "jaipur-tata-punch-auto": "punch",
  "jaipur-dzire-manual": "dzire",
  "jaipur-baleno-new-manual": "baleno",
  "jaipur-baleno-old-manual": "baleno",
  "jaipur-brezza-sunroof": "brezza",
  "jaipur-vitara-brezza-manual": "vitara-brezza",
  "jaipur-scorpio-s11-manual": "scorpio",
  "jaipur-scorpio-n-sunroof": "scorpio-n",
  "jaipur-kia-carens-manual": "carens",
  "jaipur-altroz-manual": "altroz",
  "jaipur-ertiga-new-manual": "ertiga",
  "jaipur-kia-seltos-auto": "seltos",
  "jaipur-fortuner-manual": "fortuner",
  "jaipur-fortuner-auto": "fortuner",
  "jaipur-mg-hector-manual": "hector",
  "jaipur-bolero-neo": "bolero-neo",
  "jaipur-i10-nios-mt": "i10-nios",
  "jaipur-creta-new": "creta",
  "jaipur-xuv300-sunroof": "xuv-300",
  "jaipur-i20-new-manual": "i20",
  "jaipur-innova-crysta": "innova-crysta",

  // Chandigarh
  "chd-swift-new-manual": "swift",
  "chd-swift-new-auto": "swift",
  "chd-baleno-new-manual": "baleno",
  "chd-alto-manual": "alto",
  "chd-i20-new-manual": "i20",
  "chd-creta-new-manual": "creta",
  "chd-brezza-smart-hybrid": "brezza",
  "chd-innova-crysta-manual": "innova-crysta",
  "chd-scorpio-n-auto": "scorpio-n",
  "chd-xuv700-manual": "xuv-700",
  "chd-thar-hardtop-manual-4x4": "thar",
  "chd-thar-hardtop-auto-4x4": "thar",
};

let src = readFileSync(SEED_PATH, "utf8");

let updated = 0;
let missed: string[] = [];

for (const [carSlug, base] of Object.entries(MAP)) {
  const newImages = `["/cars/${base}-1.svg", "/cars/${base}-2.svg"]`;
  // Pattern: on the same line as slug: "xxx", replace images: [...]
  // Lines are single-line car entries.
  const pattern = new RegExp(
    `(slug:\\s*"${carSlug.replace(/-/g, "\\-")}",[\\s\\S]*?images:\\s*)\\[[^\\]]*\\]`,
    "g"
  );
  const before = src;
  src = src.replace(pattern, `$1${newImages}`);
  if (src !== before) {
    updated++;
  } else {
    missed.push(carSlug);
  }
}

writeFileSync(SEED_PATH, src, "utf8");
console.log(`Updated ${updated} car image arrays.`);
if (missed.length) {
  console.log(`Did not match (check slug names):`, missed);
}
