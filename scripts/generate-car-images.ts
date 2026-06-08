// Generates editorial-style SVG cards for every car model.
// Each SVG identifies brand + model + category with the Sun-Drenched palette.
// Run:  pnpm tsx scripts/generate-car-images.ts
//
// Each SVG is 1200x900 (4:3). When a model needs more than one image
// (gallery), we generate -1 and -2 variants with swapped accent tones.

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join(__dirname, "..", "public", "cars");
mkdirSync(OUT_DIR, { recursive: true });

type Variant = "warm" | "sage" | "sand" | "peach" | "cream";

const VARIANT_COLORS: Record<Variant, { bg: string; accent: string; chip: string; chipText: string }> = {
  warm:  { bg: "#FBF3DC", accent: "#D4A24B", chip: "#D4A24B", chipText: "#2A2520" },
  sage:  { bg: "#EDF1E5", accent: "#7B8B6F", chip: "#7B8B6F", chipText: "#FAF6F0" },
  sand:  { bg: "#E8DFC9", accent: "#B88836", chip: "#2A2520", chipText: "#FAF6F0" },
  peach: { bg: "#F4E5DC", accent: "#C67D5E", chip: "#C67D5E", chipText: "#FAF6F0" },
  cream: { bg: "#FAF6F0", accent: "#2A2520", chip: "#2A2520", chipText: "#FAF6F0" },
};

const CATEGORY_VARIANT: Record<string, Variant> = {
  HATCHBACK: "peach",
  SEDAN: "cream",
  SUV: "sage",
  MPV: "sand",
  COMPACT_SUV: "warm",
  OFF_ROAD: "warm",
  LUXURY: "cream",
};

type Car = {
  slug: string;
  brand: string;
  model: string;
  category: string;
};

const CARS: Car[] = [
  // Maruti
  { slug: "swift",          brand: "MARUTI SUZUKI", model: "Swift",          category: "HATCHBACK" },
  { slug: "baleno",         brand: "MARUTI NEXA",   model: "Baleno",         category: "HATCHBACK" },
  { slug: "dzire",          brand: "MARUTI SUZUKI", model: "Swift Dzire",    category: "SEDAN"     },
  { slug: "ertiga",         brand: "MARUTI SUZUKI", model: "Ertiga",         category: "MPV"       },
  { slug: "xl6",            brand: "MARUTI NEXA",   model: "XL6",            category: "MPV"       },
  { slug: "fronx",          brand: "MARUTI NEXA",   model: "Fronx",          category: "COMPACT_SUV" },
  { slug: "jimny",          brand: "MARUTI NEXA",   model: "Jimny",          category: "OFF_ROAD"  },
  { slug: "ignis",          brand: "MARUTI NEXA",   model: "Ignis",          category: "HATCHBACK" },
  { slug: "alto",           brand: "MARUTI SUZUKI", model: "Alto",           category: "HATCHBACK" },
  { slug: "brezza",         brand: "MARUTI SUZUKI", model: "Brezza",         category: "COMPACT_SUV" },
  { slug: "vitara-brezza",  brand: "MARUTI SUZUKI", model: "Vitara Brezza",  category: "COMPACT_SUV" },
  { slug: "glanza",         brand: "TOYOTA",        model: "Glanza",         category: "HATCHBACK" },

  // Hyundai
  { slug: "i20",            brand: "HYUNDAI",       model: "i20",            category: "HATCHBACK" },
  { slug: "i10-nios",       brand: "HYUNDAI",       model: "Grand i10 Nios", category: "HATCHBACK" },
  { slug: "aura",           brand: "HYUNDAI",       model: "Aura",           category: "SEDAN"     },
  { slug: "venue",          brand: "HYUNDAI",       model: "Venue",          category: "COMPACT_SUV" },
  { slug: "creta",          brand: "HYUNDAI",       model: "Creta",          category: "SUV"       },
  { slug: "alcazar",        brand: "HYUNDAI",       model: "Alcazar",        category: "SUV"       },

  // Kia
  { slug: "sonet",          brand: "KIA",           model: "Sonet",          category: "COMPACT_SUV" },
  { slug: "seltos",         brand: "KIA",           model: "Seltos",         category: "SUV"       },
  { slug: "carens",         brand: "KIA",           model: "Carens",         category: "MPV"       },

  // Mahindra
  { slug: "thar",           brand: "MAHINDRA",      model: "Thar",           category: "OFF_ROAD"  },
  { slug: "thar-convertible", brand: "MAHINDRA",    model: "Thar Convertible", category: "OFF_ROAD" },
  { slug: "thar-roxx",      brand: "MAHINDRA",      model: "Thar Roxx",      category: "SUV"       },
  { slug: "scorpio",        brand: "MAHINDRA",      model: "Scorpio S11",    category: "SUV"       },
  { slug: "scorpio-n",      brand: "MAHINDRA",      model: "Scorpio N",      category: "SUV"       },
  { slug: "xuv-300",        brand: "MAHINDRA",      model: "XUV 300",        category: "COMPACT_SUV" },
  { slug: "xuv-700",        brand: "MAHINDRA",      model: "XUV 700",        category: "SUV"       },
  { slug: "bolero-neo",     brand: "MAHINDRA",      model: "Bolero Neo",     category: "SUV"       },

  // Tata
  { slug: "tigor",          brand: "TATA",          model: "Tigor",          category: "SEDAN"     },
  { slug: "punch",          brand: "TATA",          model: "Punch",          category: "COMPACT_SUV" },
  { slug: "altroz",         brand: "TATA",          model: "Altroz",         category: "HATCHBACK" },

  // Toyota
  { slug: "fortuner",       brand: "TOYOTA",        model: "Fortuner",       category: "SUV"       },
  { slug: "innova-crysta",  brand: "TOYOTA",        model: "Innova Crysta",  category: "MPV"       },
  { slug: "innova-hycross", brand: "TOYOTA",        model: "Innova Hycross", category: "MPV"       },

  // Premium / other
  { slug: "hector",         brand: "MG MOTOR",      model: "Hector",         category: "SUV"       },
  { slug: "mini-cooper",    brand: "MINI",          model: "Cooper Convertible", category: "LUXURY" },
  { slug: "audi-a3",        brand: "AUDI",          model: "A3 Cabriolet",   category: "LUXURY"    },
];

const CATEGORY_LABEL: Record<string, string> = {
  HATCHBACK: "HATCHBACK",
  SEDAN: "SEDAN",
  SUV: "SUV",
  MPV: "MPV · 7-SEATER",
  COMPACT_SUV: "COMPACT SUV",
  OFF_ROAD: "OFF-ROAD · 4×4",
  LUXURY: "LUXURY",
};

function svgFor(car: Car, suffix: "1" | "2"): string {
  const variant = CATEGORY_VARIANT[car.category] ?? "cream";
  const altMap: Record<Variant, Variant> = {
    peach: "warm",
    warm: "peach",
    sage: "sand",
    sand: "sage",
    cream: "warm",
  };
  const v = suffix === "1" ? variant : altMap[variant] ?? "warm";
  const { bg, accent, chip, chipText } = VARIANT_COLORS[v];
  const categoryLabel = CATEGORY_LABEL[car.category] ?? car.category;

  // ViewBox is 1500x1200 — exact 5:4 to match the CarCard image frame.
  // Important content lives in the safe area (300..1200 vertical) so even
  // with minor scaling it stays visible.
  const modelLen = car.model.length;
  const modelSize =
    modelLen > 20 ? 110 :
    modelLen > 15 ? 140 :
    modelLen > 10 ? 180 :
    220;

  const chipWidth = Math.max(260, categoryLabel.length * 18);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1200" preserveAspectRatio="xMidYMid slice">
  <rect width="1500" height="1200" fill="${bg}"/>

  <!-- Subtle grain dots -->
  <g opacity="0.06" fill="${accent}">
    <circle cx="180" cy="240" r="2"/>
    <circle cx="380" cy="380" r="2"/>
    <circle cx="600" cy="220" r="2"/>
    <circle cx="820" cy="420" r="2"/>
    <circle cx="1080" cy="280" r="2"/>
    <circle cx="1300" cy="440" r="2"/>
    <circle cx="260" cy="640" r="2"/>
    <circle cx="500" cy="780" r="2"/>
    <circle cx="780" cy="680" r="2"/>
    <circle cx="1040" cy="820" r="2"/>
    <circle cx="1280" cy="740" r="2"/>
  </g>

  <!-- Big decorative numeral on right (background art) -->
  <text x="1380" y="780"
        text-anchor="end"
        font-family="Fraunces, Georgia, serif"
        font-style="italic"
        font-size="520"
        font-weight="400"
        opacity="0.08"
        fill="#2A2520">${suffix}</text>

  <!-- Top hairline -->
  <line x1="120" y1="240" x2="280" y2="240" stroke="${accent}" stroke-width="3" opacity="0.6"/>

  <!-- Brand wordmark -->
  <text x="120" y="295"
        font-family="Inter, system-ui, sans-serif"
        font-size="28"
        font-weight="700"
        letter-spacing="7"
        fill="#2A2520">${car.brand}</text>

  <!-- Model name in serif (centered vertically) -->
  <text x="120" y="700"
        font-family="Fraunces, Georgia, serif"
        font-size="${modelSize}"
        font-weight="700"
        letter-spacing="-3"
        fill="#2A2520">${car.model}</text>

  <!-- Category chip -->
  <g transform="translate(120, 770)">
    <rect width="${chipWidth}" height="56" rx="28" fill="${chip}"/>
    <text x="${chipWidth / 2}" y="36"
          text-anchor="middle"
          font-family="Inter, system-ui, sans-serif"
          font-size="16"
          font-weight="700"
          letter-spacing="3.5"
          fill="${chipText}">${categoryLabel}</text>
  </g>

  <!-- Bottom-left micro-detail -->
  <text x="120" y="1110"
        font-family="Inter, system-ui, sans-serif"
        font-size="13"
        font-weight="600"
        letter-spacing="2.5"
        opacity="0.4"
        fill="#2A2520">SELF · DRIVE · INDIA</text>

  <!-- Bottom-right wordmark -->
  <text x="1380" y="1110"
        text-anchor="end"
        font-family="Fraunces, Georgia, serif"
        font-style="italic"
        font-size="28"
        opacity="0.45"
        fill="#2A2520">fastrental</text>
</svg>`;
}

let count = 0;
for (const car of CARS) {
  for (const suffix of ["1", "2"] as const) {
    const filename = `${car.slug}-${suffix}.svg`;
    writeFileSync(join(OUT_DIR, filename), svgFor(car, suffix), "utf8");
    count++;
  }
}

console.log(`Generated ${count} SVG cards in public/cars/`);
console.log(`Unique models: ${CARS.length}`);
