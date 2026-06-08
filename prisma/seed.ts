/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const COMMON_TERMS = `- Minimum driver age: 21 years.
- Minimum 1 year driving experience required.
- Valid Indian Driving License mandatory at pickup.
- Original Aadhaar Card or Passport required as ID.
- Refundable security deposit collected at pickup (₹3,000–₹10,000 depending on car category).
- Minimum booking duration: 2 days.
- Unlimited kilometers included.
- Fuel, tolls, and parking are renter's responsibility.
- Late return: ₹200/hour after grace period of 1 hour.
- Damage/scratch policy applies as per signed agreement.
- Cars must be returned with the same fuel level.`;

type CarSeed = {
  citySlug: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: "HATCHBACK" | "SEDAN" | "SUV" | "MPV" | "COMPACT_SUV" | "LUXURY" | "OFF_ROAD";
  transmission: "MANUAL" | "AUTOMATIC";
  fuelType: "PETROL" | "DIESEL" | "CNG" | "ELECTRIC" | "HYBRID";
  seats: number;
  mileage: number;
  engineCC?: number;
  driveType?: string;
  pricePerDay: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
  sortOrder: number;
  rating?: number;
  reviewsCount?: number;
  images: string[];
};

// Description templates by category
const FEATURES_BY_CAT: Record<string, string[]> = {
  HATCHBACK: ["AC", "Power Windows", "Power Steering", "Music System", "USB Charger", "ABS", "Airbags", "Bluetooth"],
  SEDAN: ["AC", "Power Windows", "Bluetooth", "Music System", "ABS", "Airbags", "Central Locking", "USB Charger", "Reverse Camera"],
  SUV: ["AC", "Touchscreen Infotainment", "Bluetooth", "Cruise Control", "Sunroof", "Reverse Camera", "ABS", "Airbags", "Alloy Wheels"],
  MPV: ["AC", "Power Windows", "Bluetooth", "Music System", "Reverse Camera", "ABS", "Airbags", "Alloy Wheels"],
  COMPACT_SUV: ["AC", "Touchscreen Infotainment", "Bluetooth", "Cruise Control", "Reverse Camera", "ABS", "Airbags", "Alloy Wheels"],
  OFF_ROAD: ["AC", "4x4 Drive", "Touchscreen Infotainment", "Bluetooth", "Hill Hold Assist", "ABS", "Airbags", "Roof Carrier Ready"],
  LUXURY: ["AC", "Premium Leather", "Touchscreen Infotainment", "Bluetooth", "Cruise Control", "Sunroof", "Reverse Camera", "ABS", "Airbags", "Premium Audio"],
};

function shortDescFor(name: string, category: string): string {
  const templates: Record<string, string> = {
    HATCHBACK: `Compact, fuel-efficient hatchback — perfect for couples or small families exploring the city.`,
    SEDAN: `Comfortable sedan with a spacious boot — ideal for airport runs and longer drives.`,
    SUV: `Mid-size SUV with premium cabin, smooth ride, and a long list of features.`,
    MPV: `Spacious family MPV — flexible seating, big boot, fuel-friendly.`,
    COMPACT_SUV: `Stylish compact SUV — hatchback agility with SUV ground clearance.`,
    OFF_ROAD: `Authentic 4x4 off-roader — ready for beach trips, monsoon drives, and Western Ghats adventures.`,
    LUXURY: `Premium luxury car — make any occasion unforgettable.`,
  };
  return templates[category] ?? `Well-maintained rental car — book on call or WhatsApp.`;
}

function longDescFor(name: string, category: string, city: string): string {
  const cityName = city === "goa" ? "Goa" : city === "jaipur" ? "Jaipur" : "Chandigarh";
  const base: Record<string, string> = {
    HATCHBACK: `The ${name} is one of India's most loved hatchbacks. Smart interiors, comfortable seating, and great fuel economy make it ideal for navigating ${cityName}'s narrow lanes and longer day trips. Easy to park, easy to drive, and easy on the pocket.`,
    SEDAN: `The ${name} delivers sedan comfort at hatchback running costs. Generous boot space, comfortable rear seat, smooth ride — a perennial favourite for both city commutes and intercity travel from ${cityName}.`,
    SUV: `The ${name} offers a premium SUV experience — refined cabin, smooth ride, and a long list of features. Excellent for exploring ${cityName} in comfort, whether it's family trips or executive travel.`,
    MPV: `The ${name} is a true family vehicle — 6–7 seats, flexible boot, and proven reliability. Perfect for groups travelling together in ${cityName}.`,
    COMPACT_SUV: `The ${name} packs SUV character into compact dimensions. Bold styling, raised ride height, and feature-packed cabin — a great pick for couples or small families in ${cityName}.`,
    OFF_ROAD: `The ${name} brings real 4x4 capability to your ${cityName} trip. Whether you're tackling rough beach approaches, monsoon mud, or simply enjoying the elevated commanding view, this is the most fun rental in our fleet.`,
    LUXURY: `The ${name} is a head-turner — premium leather cabin, sophisticated tech, and refined road manners. Hire it for special occasions, photoshoots, or to add some sparkle to your ${cityName} road trip.`,
  };
  return (
    (base[category] ?? base["HATCHBACK"]!) +
    ` Includes unlimited kilometres, full insurance, and 24x7 roadside assistance. Pickup can be arranged at your hotel or our office in ${cityName}.`
  );
}

const goaCars: CarSeed[] = [
  { citySlug: "goa", slug: "goa-nexa-xl6-manual", name: "Brand New Nexa XL6 (Manual)", brand: "Maruti", model: "XL6", category: "MPV", transmission: "MANUAL", fuelType: "PETROL", seats: 6, mileage: 19, engineCC: 1462, pricePerDay: 2800, sortOrder: 10, images: ["/cars/xl6-1.jpg", "/cars/xl6-2.jpg"], reviewsCount: 64, isFeatured: true },
  { citySlug: "goa", slug: "goa-baleno-manual", name: "Baleno New Model (Manual)", brand: "Maruti", model: "Baleno", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, engineCC: 1197, pricePerDay: 1700, sortOrder: 20, images: ["/cars/baleno-1.jpg", "/cars/baleno-1.jpg"], reviewsCount: 168, isFeatured: true },
  { citySlug: "goa", slug: "goa-innova-hycross-auto", name: "Brand New Innova Hycross Automatic", brand: "Toyota", model: "Innova Hycross", category: "MPV", transmission: "AUTOMATIC", fuelType: "HYBRID", seats: 7, mileage: 21, engineCC: 1987, pricePerDay: 6500, sortOrder: 30, images: ["/cars/innova-hycross-1.jpg", "/cars/innova-hycross-2.jpg"], reviewsCount: 47, isFeatured: true },
  { citySlug: "goa", slug: "goa-baleno-auto", name: "Maruti Baleno New (Automatic)", brand: "Maruti", model: "Baleno", category: "HATCHBACK", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 2000, sortOrder: 40, images: ["/cars/baleno-1.jpg", "/cars/baleno-1.jpg"], reviewsCount: 112 },
  { citySlug: "goa", slug: "goa-swift-auto", name: "Swift New Model (Automatic)", brand: "Maruti", model: "Swift", category: "HATCHBACK", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1800, sortOrder: 50, images: ["/cars/swift-1.jpg", "/cars/swift-2.jpg"], reviewsCount: 96 },
  { citySlug: "goa", slug: "goa-thar-hardtop-auto", name: "Mahindra Thar Automatic New Hard Top", brand: "Mahindra", model: "Thar", category: "OFF_ROAD", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 4, mileage: 15, engineCC: 2184, driveType: "4x4", pricePerDay: 4500, sortOrder: 60, isFeatured: true, isAvailable: false, images: ["/cars/thar-1.jpg", "/cars/thar-2.jpg"], reviewsCount: 287 },
  { citySlug: "goa", slug: "goa-thar-convertible-auto", name: "Mahindra Thar Convertible Automatic 4x4 (Soft Top)", brand: "Mahindra", model: "Thar", category: "OFF_ROAD", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 4, mileage: 15, driveType: "4x4", pricePerDay: 4800, sortOrder: 70, isFeatured: true, images: ["/cars/thar-convertible-1.jpg", "/cars/thar-convertible-2.jpg"], reviewsCount: 156 },
  { citySlug: "goa", slug: "goa-swift-manual", name: "Maruti Swift New (Manual)", brand: "Maruti", model: "Swift", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1500, sortOrder: 80, images: ["/cars/swift-1.jpg", "/cars/swift-2.jpg"], reviewsCount: 142, isFeatured: true },
  { citySlug: "goa", slug: "goa-i20-manual", name: "Hyundai i20 New (Manual)", brand: "Hyundai", model: "i20", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 20, pricePerDay: 1800, sortOrder: 90, images: ["/cars/i20-1.jpg", "/cars/i20-2.jpg"], reviewsCount: 102 },
  { citySlug: "goa", slug: "goa-i20-auto", name: "Hyundai i20 New Model (Automatic)", brand: "Hyundai", model: "i20", category: "HATCHBACK", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 20, pricePerDay: 2100, sortOrder: 100, images: ["/cars/i20-1.jpg", "/cars/i20-2.jpg"], reviewsCount: 73 },
  { citySlug: "goa", slug: "goa-creta-manual", name: "Hyundai Creta New (Manual)", brand: "Hyundai", model: "Creta", category: "SUV", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 17, pricePerDay: 2800, sortOrder: 110, images: ["/cars/creta-1.jpg", "/cars/creta-2.jpg"], reviewsCount: 134 },
  { citySlug: "goa", slug: "goa-creta-auto-sunroof", name: "Creta New Automatic - Panoramic Sunroof", brand: "Hyundai", model: "Creta", category: "SUV", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 17, pricePerDay: 3200, sortOrder: 120, isFeatured: true, images: ["/cars/creta-1.jpg", "/cars/creta-2.jpg"], reviewsCount: 198 },
  { citySlug: "goa", slug: "goa-alcazar-auto-sunroof", name: "Alcazar Automatic Panoramic Sunroof", brand: "Hyundai", model: "Alcazar", category: "SUV", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 7, mileage: 18, pricePerDay: 4000, sortOrder: 130, images: ["/cars/alcazar-1.png", "/cars/alcazar-2.png"], reviewsCount: 62 },
  { citySlug: "goa", slug: "goa-ertiga-manual", name: "Maruti Ertiga New 7 Seater (Manual)", brand: "Maruti", model: "Ertiga", category: "MPV", transmission: "MANUAL", fuelType: "PETROL", seats: 7, mileage: 19, pricePerDay: 2300, sortOrder: 140, isFeatured: true, images: ["/cars/ertiga-1.jpg", "/cars/ertiga-2.jpg"], reviewsCount: 211 },
  { citySlug: "goa", slug: "goa-kia-carens-manual", name: "Kia Carens (Manual)", brand: "Kia", model: "Carens", category: "MPV", transmission: "MANUAL", fuelType: "PETROL", seats: 7, mileage: 18, pricePerDay: 2700, sortOrder: 150, images: ["/cars/carens-1.jpg", "/cars/carens-2.jpg"], reviewsCount: 58 },
  { citySlug: "goa", slug: "goa-ertiga-auto", name: "Maruti Suzuki Ertiga New Model (Auto)", brand: "Maruti", model: "Ertiga", category: "MPV", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 7, mileage: 19, pricePerDay: 2700, sortOrder: 160, images: ["/cars/ertiga-1.jpg", "/cars/ertiga-2.jpg"], reviewsCount: 89 },
  { citySlug: "goa", slug: "goa-thar-hardtop-manual", name: "Mahindra Thar New Manual Hard Top", brand: "Mahindra", model: "Thar", category: "OFF_ROAD", transmission: "MANUAL", fuelType: "DIESEL", seats: 4, mileage: 15, driveType: "4x4", pricePerDay: 4200, sortOrder: 170, isFeatured: true, images: ["/cars/thar-1.jpg", "/cars/thar-2.jpg"], reviewsCount: 213 },
  { citySlug: "goa", slug: "goa-jimny-auto", name: "Maruti Jimny New Model Automatic", brand: "Maruti", model: "Jimny", category: "OFF_ROAD", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 4, mileage: 16, driveType: "4x4", pricePerDay: 3500, sortOrder: 180, isFeatured: true, images: ["/cars/jimny-1.jpg", "/cars/jimny-1.jpg"], reviewsCount: 56 },
  { citySlug: "goa", slug: "goa-thar-roxx-auto", name: "Mahindra Thar Roxx Automatic", brand: "Mahindra", model: "Thar Roxx", category: "SUV", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 5, mileage: 16, driveType: "4x4", pricePerDay: 5500, sortOrder: 190, isFeatured: true, isAvailable: false, images: ["/cars/thar-roxx-1.svg", "/cars/thar-roxx-2.svg"], reviewsCount: 41 },
  { citySlug: "goa", slug: "goa-ignis-manual", name: "Maruti Suzuki Ignis (Manual)", brand: "Maruti", model: "Ignis", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 20, pricePerDay: 1400, sortOrder: 200, images: ["/cars/ignis-1.jpg", "/cars/ignis-1.jpg"], reviewsCount: 38 },
  { citySlug: "goa", slug: "goa-sonet-venue-auto-sunroof", name: "Sonet / Venue Automatic Sunroof", brand: "Kia", model: "Sonet", category: "COMPACT_SUV", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 18, pricePerDay: 2800, sortOrder: 210, images: ["/cars/sonet-1.jpg", "/cars/sonet-2.jpg"], reviewsCount: 78 },
  { citySlug: "goa", slug: "goa-thar-convertible-manual", name: "Mahindra Thar Convertible Manual (Open Roof)", brand: "Mahindra", model: "Thar", category: "OFF_ROAD", transmission: "MANUAL", fuelType: "DIESEL", seats: 4, mileage: 15, driveType: "4x4", pricePerDay: 4400, sortOrder: 220, images: ["/cars/thar-convertible-1.jpg", "/cars/thar-convertible-2.jpg"], reviewsCount: 82 },
  { citySlug: "goa", slug: "goa-fronx-manual", name: "Maruti Fronx Manual (Brand New)", brand: "Maruti", model: "Fronx", category: "COMPACT_SUV", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 21, pricePerDay: 2200, sortOrder: 230, isAvailable: false, images: ["/cars/fronx-1.jpg", "/cars/fronx-2.jpg"], reviewsCount: 64 },
  { citySlug: "goa", slug: "goa-fortuner-auto", name: "Toyota Fortuner Automatic (Brand New)", brand: "Toyota", model: "Fortuner", category: "SUV", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 7, mileage: 13, engineCC: 2755, driveType: "4x4", pricePerDay: 7500, sortOrder: 240, images: ["/cars/fortuner-1.jpg", "/cars/fortuner-2.jpg"], reviewsCount: 91 },
  { citySlug: "goa", slug: "goa-innova-crysta-auto", name: "Innova Crysta (Automatic)", brand: "Toyota", model: "Innova Crysta", category: "MPV", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 7, mileage: 14, pricePerDay: 4500, sortOrder: 250, images: ["/cars/innova-crysta-1.jpg", "/cars/innova-crysta-2.jpg"], reviewsCount: 132 },
  { citySlug: "goa", slug: "goa-innova-crysta-manual", name: "Toyota Innova Crysta (Manual)", brand: "Toyota", model: "Innova Crysta", category: "MPV", transmission: "MANUAL", fuelType: "DIESEL", seats: 7, mileage: 14, pricePerDay: 4000, sortOrder: 260, images: ["/cars/innova-crysta-1.jpg", "/cars/innova-crysta-2.jpg"], reviewsCount: 87 },
  { citySlug: "goa", slug: "goa-venue-manual", name: "Hyundai Venue New (Manual)", brand: "Hyundai", model: "Venue", category: "COMPACT_SUV", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 18, pricePerDay: 2200, sortOrder: 270, isFeatured: true, images: ["/cars/venue-1.jpg", "/cars/venue-2.jpg"], reviewsCount: 119 },
  { citySlug: "goa", slug: "goa-dzire-manual", name: "Swift Dzire New (Manual)", brand: "Maruti", model: "Dzire", category: "SEDAN", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1700, sortOrder: 280, images: ["/cars/dzire-1.jpg", "/cars/dzire-2.jpg"], reviewsCount: 95 },
  { citySlug: "goa", slug: "goa-mini-cooper-convertible", name: "Mini Cooper Convertible", brand: "Mini", model: "Cooper Convertible", category: "LUXURY", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 4, mileage: 12, pricePerDay: 12000, sortOrder: 290, images: ["/cars/mini-cooper-1.jpg", "/cars/mini-cooper-2.jpg"], reviewsCount: 34 },
  { citySlug: "goa", slug: "goa-audi-a3-convertible", name: "Audi A3 Convertible", brand: "Audi", model: "A3 Cabriolet", category: "LUXURY", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 4, mileage: 11, pricePerDay: 18000, sortOrder: 300, images: ["/cars/audi-a3-1.jpg", "/cars/audi-a3-2.jpg"], reviewsCount: 22 },
  { citySlug: "goa", slug: "goa-venue-sunroof-auto", name: "Hyundai Venue New Sunroof (Automatic)", brand: "Hyundai", model: "Venue", category: "COMPACT_SUV", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 18, pricePerDay: 2600, sortOrder: 310, isAvailable: false, images: ["/cars/venue-1.jpg", "/cars/venue-2.jpg"], reviewsCount: 71 },
];

const jaipurCars: CarSeed[] = [
  { citySlug: "jaipur", slug: "jaipur-toyota-glanza-manual", name: "Toyota Glanza Manual", brand: "Toyota", model: "Glanza", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1700, sortOrder: 10, images: ["/cars/glanza-1.jpg", "/cars/glanza-2.jpg"], reviewsCount: 48 },
  { citySlug: "jaipur", slug: "jaipur-tata-tigor-manual", name: "Tata Tigor Manual", brand: "Tata", model: "Tigor", category: "SEDAN", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 20, pricePerDay: 1600, sortOrder: 20, images: ["/cars/tigor-1.jpg", "/cars/tigor-2.jpg"], reviewsCount: 35 },
  { citySlug: "jaipur", slug: "jaipur-i10-nios-cng", name: "Hyundai i10 Nios CNG (Manual)", brand: "Hyundai", model: "Grand i10 Nios", category: "HATCHBACK", transmission: "MANUAL", fuelType: "CNG", seats: 5, mileage: 28, pricePerDay: 1400, sortOrder: 30, images: ["/cars/i10-nios-1.jpg", "/cars/i10-nios-2.jpg"], reviewsCount: 41 },
  { citySlug: "jaipur", slug: "jaipur-aura-cng", name: "Hyundai Aura CNG", brand: "Hyundai", model: "Aura", category: "SEDAN", transmission: "MANUAL", fuelType: "CNG", seats: 5, mileage: 28, pricePerDay: 1600, sortOrder: 40, images: ["/cars/aura-1.jpg", "/cars/aura-2.jpg"], reviewsCount: 29 },
  { citySlug: "jaipur", slug: "jaipur-i20-cng", name: "Hyundai i20 CNG", brand: "Hyundai", model: "i20", category: "HATCHBACK", transmission: "MANUAL", fuelType: "CNG", seats: 5, mileage: 26, pricePerDay: 1800, sortOrder: 50, images: ["/cars/i20-1.jpg", "/cars/i20-2.jpg"], reviewsCount: 33 },
  { citySlug: "jaipur", slug: "jaipur-thar-4x4-hardtop-manual", name: "Mahindra Thar 4x4 (New Model) Manual - Hard Top", brand: "Mahindra", model: "Thar", category: "OFF_ROAD", transmission: "MANUAL", fuelType: "DIESEL", seats: 4, mileage: 15, driveType: "4x4", pricePerDay: 4500, sortOrder: 60, isFeatured: true, images: ["/cars/thar-1.jpg", "/cars/thar-2.jpg"], reviewsCount: 124 },
  { citySlug: "jaipur", slug: "jaipur-swift-new-manual", name: "Maruti Suzuki Swift New (Manual)", brand: "Maruti", model: "Swift", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1500, sortOrder: 70, isFeatured: true, images: ["/cars/swift-1.jpg", "/cars/swift-2.jpg"], reviewsCount: 88 },
  { citySlug: "jaipur", slug: "jaipur-swift-old-manual", name: "Maruti Suzuki Swift Old (Manual)", brand: "Maruti", model: "Swift", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1200, sortOrder: 80, images: ["/cars/swift-1.jpg", "/cars/swift-2.jpg"], reviewsCount: 67 },
  { citySlug: "jaipur", slug: "jaipur-tata-punch-auto", name: "Tata Punch New (Automatic)", brand: "Tata", model: "Punch", category: "COMPACT_SUV", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 18, pricePerDay: 2200, sortOrder: 90, images: ["/cars/punch-1.png", "/cars/punch-1.png"], reviewsCount: 52 },
  { citySlug: "jaipur", slug: "jaipur-dzire-manual", name: "Maruti Suzuki Swift Dzire New (Manual)", brand: "Maruti", model: "Dzire", category: "SEDAN", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1700, sortOrder: 100, images: ["/cars/dzire-1.jpg", "/cars/dzire-2.jpg"], reviewsCount: 71 },
  { citySlug: "jaipur", slug: "jaipur-baleno-new-manual", name: "Maruti Nexa Baleno New (Manual)", brand: "Maruti", model: "Baleno", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1700, sortOrder: 110, isFeatured: true, images: ["/cars/baleno-1.jpg", "/cars/baleno-1.jpg"], reviewsCount: 94 },
  { citySlug: "jaipur", slug: "jaipur-baleno-old-manual", name: "Maruti Nexa Baleno Old (Manual)", brand: "Maruti", model: "Baleno", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1400, sortOrder: 120, images: ["/cars/baleno-1.jpg", "/cars/baleno-1.jpg"], reviewsCount: 58 },
  { citySlug: "jaipur", slug: "jaipur-brezza-sunroof", name: "Maruti Brezza Sunroof", brand: "Maruti", model: "Brezza", category: "COMPACT_SUV", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 17, pricePerDay: 2800, sortOrder: 130, images: ["/cars/brezza-1.png", "/cars/brezza-1.png"], reviewsCount: 76 },
  { citySlug: "jaipur", slug: "jaipur-vitara-brezza-manual", name: "Maruti Vitara Brezza New (Manual)", brand: "Maruti", model: "Vitara Brezza", category: "COMPACT_SUV", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 17, pricePerDay: 2400, sortOrder: 140, images: ["/cars/vitara-brezza-1.png", "/cars/vitara-brezza-1.png"], reviewsCount: 62 },
  { citySlug: "jaipur", slug: "jaipur-scorpio-s11-manual", name: "Mahindra Scorpio S11 (Manual)", brand: "Mahindra", model: "Scorpio", category: "SUV", transmission: "MANUAL", fuelType: "DIESEL", seats: 7, mileage: 14, engineCC: 2179, pricePerDay: 3500, sortOrder: 150, images: ["/cars/scorpio-1.jpg", "/cars/scorpio-2.jpg"], reviewsCount: 81 },
  { citySlug: "jaipur", slug: "jaipur-scorpio-n-sunroof", name: "Mahindra Scorpio N Open Sunroof", brand: "Mahindra", model: "Scorpio N", category: "SUV", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 7, mileage: 14, pricePerDay: 4500, sortOrder: 160, isFeatured: true, images: ["/cars/scorpio-n-1.jpg", "/cars/scorpio-n-2.jpg"], reviewsCount: 65 },
  { citySlug: "jaipur", slug: "jaipur-kia-carens-manual", name: "Kia Carens (Manual)", brand: "Kia", model: "Carens", category: "MPV", transmission: "MANUAL", fuelType: "PETROL", seats: 7, mileage: 18, pricePerDay: 2700, sortOrder: 170, images: ["/cars/carens-1.jpg", "/cars/carens-2.jpg"], reviewsCount: 44 },
  { citySlug: "jaipur", slug: "jaipur-altroz-manual", name: "Tata Altroz New (Manual)", brand: "Tata", model: "Altroz", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 20, pricePerDay: 1700, sortOrder: 180, images: ["/cars/altroz-1.jpg", "/cars/altroz-2.jpg"], reviewsCount: 39 },
  { citySlug: "jaipur", slug: "jaipur-ertiga-new-manual", name: "Maruti Suzuki Ertiga New (Manual)", brand: "Maruti", model: "Ertiga", category: "MPV", transmission: "MANUAL", fuelType: "PETROL", seats: 7, mileage: 19, pricePerDay: 2300, sortOrder: 190, images: ["/cars/ertiga-1.jpg", "/cars/ertiga-2.jpg"], reviewsCount: 86 },
  { citySlug: "jaipur", slug: "jaipur-kia-seltos-auto", name: "Kia Seltos (Automatic)", brand: "Kia", model: "Seltos", category: "SUV", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 16, pricePerDay: 3500, sortOrder: 200, isAvailable: false, images: ["/cars/seltos-1.jpg", "/cars/seltos-1.jpg"], reviewsCount: 92 },
  { citySlug: "jaipur", slug: "jaipur-fortuner-manual", name: "Toyota Fortuner New Model (Manual)", brand: "Toyota", model: "Fortuner", category: "SUV", transmission: "MANUAL", fuelType: "DIESEL", seats: 7, mileage: 13, driveType: "4x4", pricePerDay: 6500, sortOrder: 210, images: ["/cars/fortuner-1.jpg", "/cars/fortuner-2.jpg"], reviewsCount: 102 },
  { citySlug: "jaipur", slug: "jaipur-fortuner-auto", name: "Toyota Fortuner New (Automatic)", brand: "Toyota", model: "Fortuner", category: "SUV", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 7, mileage: 13, driveType: "4x4", pricePerDay: 7500, sortOrder: 220, isFeatured: true, images: ["/cars/fortuner-1.jpg", "/cars/fortuner-2.jpg"], reviewsCount: 121 },
  { citySlug: "jaipur", slug: "jaipur-mg-hector-manual", name: "MG Hector (Manual) - 7 Seater", brand: "MG", model: "Hector Plus", category: "SUV", transmission: "MANUAL", fuelType: "DIESEL", seats: 7, mileage: 14, pricePerDay: 4200, sortOrder: 230, isAvailable: false, images: ["/cars/hector-1.svg", "/cars/hector-2.svg"], reviewsCount: 47 },
  { citySlug: "jaipur", slug: "jaipur-bolero-neo", name: "Mahindra Bolero Neo", brand: "Mahindra", model: "Bolero Neo", category: "SUV", transmission: "MANUAL", fuelType: "DIESEL", seats: 7, mileage: 16, pricePerDay: 2500, sortOrder: 240, images: ["/cars/bolero-neo-1.jpg", "/cars/bolero-neo-2.jpg"], reviewsCount: 31 },
  { citySlug: "jaipur", slug: "jaipur-i10-nios-mt", name: "Hyundai i10 Nios MT", brand: "Hyundai", model: "Grand i10 Nios", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 21, pricePerDay: 1400, sortOrder: 250, isAvailable: false, images: ["/cars/i10-nios-1.jpg", "/cars/i10-nios-2.jpg"], reviewsCount: 26 },
  { citySlug: "jaipur", slug: "jaipur-creta-new", name: "Hyundai Creta (New Model)", brand: "Hyundai", model: "Creta", category: "SUV", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 17, pricePerDay: 2800, sortOrder: 260, images: ["/cars/creta-1.jpg", "/cars/creta-2.jpg"], reviewsCount: 78 },
  { citySlug: "jaipur", slug: "jaipur-xuv300-sunroof", name: "Mahindra XUV 300 Open Sunroof", brand: "Mahindra", model: "XUV 300", category: "COMPACT_SUV", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 17, pricePerDay: 2400, sortOrder: 270, isAvailable: false, images: ["/cars/xuv-300-1.jpg", "/cars/xuv-300-2.jpg"], reviewsCount: 43 },
  { citySlug: "jaipur", slug: "jaipur-i20-new-manual", name: "Hyundai i20 New (Manual)", brand: "Hyundai", model: "i20", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 20, pricePerDay: 1800, sortOrder: 280, isAvailable: false, images: ["/cars/i20-1.jpg", "/cars/i20-2.jpg"], reviewsCount: 54 },
  { citySlug: "jaipur", slug: "jaipur-innova-crysta", name: "Toyota Innova Crysta", brand: "Toyota", model: "Innova Crysta", category: "MPV", transmission: "MANUAL", fuelType: "DIESEL", seats: 7, mileage: 14, pricePerDay: 4000, sortOrder: 290, isAvailable: false, images: ["/cars/innova-crysta-1.jpg", "/cars/innova-crysta-2.jpg"], reviewsCount: 87 },
];

const chandigarhCars: CarSeed[] = [
  { citySlug: "chandigarh", slug: "chd-swift-new-manual", name: "Maruti Suzuki Swift New (Manual)", brand: "Maruti", model: "Swift", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1500, sortOrder: 10, isFeatured: true, images: ["/cars/swift-1.jpg", "/cars/swift-2.jpg"], reviewsCount: 58 },
  { citySlug: "chandigarh", slug: "chd-swift-new-auto", name: "Maruti Suzuki Swift New (Automatic)", brand: "Maruti", model: "Swift", category: "HATCHBACK", transmission: "AUTOMATIC", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1800, sortOrder: 20, images: ["/cars/swift-1.jpg", "/cars/swift-2.jpg"], reviewsCount: 42 },
  { citySlug: "chandigarh", slug: "chd-baleno-new-manual", name: "Maruti Suzuki Baleno New (Manual)", brand: "Maruti", model: "Baleno", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 22, pricePerDay: 1700, sortOrder: 30, isFeatured: true, images: ["/cars/baleno-1.jpg", "/cars/baleno-1.jpg"], reviewsCount: 51 },
  { citySlug: "chandigarh", slug: "chd-alto-manual", name: "Maruti Alto (Manual)", brand: "Maruti", model: "Alto", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 23, pricePerDay: 1100, sortOrder: 40, images: ["/cars/alto-1.jpg", "/cars/alto-1.jpg"], reviewsCount: 38 },
  { citySlug: "chandigarh", slug: "chd-i20-new-manual", name: "Hyundai i20 New Model (Manual)", brand: "Hyundai", model: "i20", category: "HATCHBACK", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 20, pricePerDay: 1800, sortOrder: 50, images: ["/cars/i20-1.jpg", "/cars/i20-2.jpg"], reviewsCount: 46 },
  { citySlug: "chandigarh", slug: "chd-creta-new-manual", name: "Hyundai Creta New Model (Manual)", brand: "Hyundai", model: "Creta", category: "SUV", transmission: "MANUAL", fuelType: "PETROL", seats: 5, mileage: 17, pricePerDay: 2800, sortOrder: 60, isFeatured: true, images: ["/cars/creta-1.jpg", "/cars/creta-2.jpg"], reviewsCount: 72 },
  { citySlug: "chandigarh", slug: "chd-brezza-smart-hybrid", name: "Brezza New Smart Hybrid", brand: "Maruti", model: "Brezza", category: "COMPACT_SUV", transmission: "AUTOMATIC", fuelType: "HYBRID", seats: 5, mileage: 19, pricePerDay: 2800, sortOrder: 70, images: ["/cars/brezza-1.png", "/cars/brezza-1.png"], reviewsCount: 49 },
  { citySlug: "chandigarh", slug: "chd-innova-crysta-manual", name: "Toyota Innova Crysta (Manual)", brand: "Toyota", model: "Innova Crysta", category: "MPV", transmission: "MANUAL", fuelType: "DIESEL", seats: 7, mileage: 14, pricePerDay: 4000, sortOrder: 80, images: ["/cars/innova-crysta-1.jpg", "/cars/innova-crysta-2.jpg"], reviewsCount: 68 },
  { citySlug: "chandigarh", slug: "chd-scorpio-n-auto", name: "Mahindra Scorpio N (Automatic)", brand: "Mahindra", model: "Scorpio N", category: "SUV", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 7, mileage: 14, pricePerDay: 4500, sortOrder: 90, images: ["/cars/scorpio-n-1.jpg", "/cars/scorpio-n-2.jpg"], reviewsCount: 41 },
  { citySlug: "chandigarh", slug: "chd-xuv700-manual", name: "Mahindra XUV 700 (Manual)", brand: "Mahindra", model: "XUV 700", category: "SUV", transmission: "MANUAL", fuelType: "DIESEL", seats: 7, mileage: 14, pricePerDay: 4500, sortOrder: 100, images: ["/cars/xuv-700-1.png", "/cars/xuv-700-2.png"], reviewsCount: 53 },
  { citySlug: "chandigarh", slug: "chd-thar-hardtop-manual-4x4", name: "Mahindra Thar Manual Hard Top 4x4", brand: "Mahindra", model: "Thar", category: "OFF_ROAD", transmission: "MANUAL", fuelType: "DIESEL", seats: 4, mileage: 15, driveType: "4x4", pricePerDay: 4200, sortOrder: 110, isFeatured: true, images: ["/cars/thar-1.jpg", "/cars/thar-2.jpg"], reviewsCount: 87 },
  { citySlug: "chandigarh", slug: "chd-thar-hardtop-auto-4x4", name: "Mahindra Thar Automatic Hard Top 4x4", brand: "Mahindra", model: "Thar", category: "OFF_ROAD", transmission: "AUTOMATIC", fuelType: "DIESEL", seats: 4, mileage: 15, driveType: "4x4", pricePerDay: 4500, sortOrder: 120, isFeatured: true, images: ["/cars/thar-1.jpg", "/cars/thar-2.jpg"], reviewsCount: 92 },
];

const allCars = [...goaCars, ...jaipurCars, ...chandigarhCars];

const goaLocations = [
  { slug: "calangute", name: "Calangute", seoTitle: "Self Drive Car Rental in Calangute, Goa | FastRental", seoDesc: "Rent self drive cars at Calangute Beach. Hatchbacks, SUVs and Thar with hotel pickup & drop.", heroImage: "/locations/calangute.jpg", content: `Calangute is Goa's most famous beach town and a fantastic base for exploring North Goa. Renting a self drive car gives you the freedom to chase sunsets, explore inland Goan villages, and skip inflated taxi fares. We offer hotel pickup and drop across Calangute, including late-night arrivals at Dabolim Airport. Whether you want a compact hatchback for two or a Thar to tackle the unbeaten paths, our fleet has you covered with unlimited kilometres and transparent pricing.` },
  { slug: "baga", name: "Baga", seoTitle: "Self Drive Car Rental in Baga, Goa | FastRental", seoDesc: "Rent a car in Baga Beach for unlimited self-drive freedom.", heroImage: "/locations/baga.jpg", content: `Baga is the heart of Goa's nightlife. A self drive car here is the most efficient way to enjoy late nights and early mornings without depending on taxis. Our Baga pickup service brings the car to your hotel or villa, with paperwork done in 10 minutes.` },
  { slug: "candolim", name: "Candolim", seoTitle: "Self Drive Car Rental in Candolim, Goa | FastRental", seoDesc: "Rent self drive cars in Candolim with hotel pickup.", heroImage: "/locations/candolim.jpg", content: `Candolim is the upscale stretch between Calangute's buzz and Fort Aguada's tranquility. A self drive car gives you easy access to Fort Aguada, the Sinquerim shacks, and the inland Saligao–Assagao restaurant scene.` },
  { slug: "anjuna", name: "Anjuna", seoTitle: "Self Drive Car Rental in Anjuna, Goa | FastRental", seoDesc: "Self drive cars in Anjuna for flea market visits and beach hopping.", heroImage: "/locations/anjuna.jpg", content: `Anjuna is the cultural heart of Goa — the Wednesday flea market, cliffside restaurants, and iconic Curlies beach shack. A self drive car here lets you cover Anjuna–Vagator–Morjim–Ashwem in a single relaxed day.` },
  { slug: "vagator", name: "Vagator", seoTitle: "Self Drive Car Rental in Vagator, Goa | FastRental", seoDesc: "Rent a self drive car in Vagator.", heroImage: "/locations/vagator.jpg", content: `Vagator is famous for its cliffside views and legendary parties. A self drive car is essential — public transport is limited and taxis are pricey.` },
  { slug: "porvorim", name: "Porvorim", seoTitle: "Self Drive Car Rental in Porvorim, Goa | FastRental", seoDesc: "Convenient self drive car rental in Porvorim.", heroImage: "/locations/porvorim.jpg", content: `Porvorim sits between Panjim and Mapusa, making it the most strategically located base in Goa.` },
];

const faqs = [
  { question: "How do I book a self-drive car with FastRental?", answer: "Booking is simple. Browse our fleet, pick your car, and either call us on +91 88245 83708 or click 'Book on WhatsApp' on any car card. We'll confirm availability, share pickup details, and reserve your vehicle. A small advance is taken via UPI to lock the booking.", category: "general", sortOrder: 1 },
  { question: "What are the airport pickup and drop charges in Goa?", answer: "We offer Goa Dabolim Airport pickup and drop at a flat ₹999 each way for most vehicles. For Mopa Airport (North Goa), the charge is ₹1,499 each way. If your rental is for 5+ days, we offer free one-way pickup.", category: "goa", sortOrder: 2 },
  { question: "What documents are required to rent a self-drive car?", answer: "Valid Indian Driving License (or International Driving Permit + home-country licence for foreigners), original Aadhaar Card OR Passport, and a secondary photo ID (PAN/Voter ID) helps speed up paperwork.", category: "general", sortOrder: 3 },
  { question: "How much security deposit is required?", answer: "Deposits range by category: ₹3,000 for hatchbacks, ₹5,000 for sedans and compact SUVs, ₹7,500 for SUVs and MPVs, and ₹10,000 for Thar and luxury cars. Refunded via UPI within 24 hours of return.", category: "booking", sortOrder: 4 },
  { question: "What is the return policy?", answer: "Return the car at the agreed time and location with the same fuel level as at pickup. We allow a 1-hour grace period beyond the booked return time; after that, ₹200/hour applies.", category: "policy", sortOrder: 5 },
  { question: "What if the car is damaged during the rental period?", answer: "Minor scratches and bumps occur — small damage (up to ₹3,000) is typically settled from the security deposit at fair repair rates. Major damage is governed by the rental agreement and applicable insurance.", category: "policy", sortOrder: 6 },
  { question: "Can I extend my booking?", answer: "Yes, extensions are possible subject to availability. Call us at least 6 hours before your scheduled return to request an extension.", category: "booking", sortOrder: 7 },
  { question: "Are kilometres really unlimited?", answer: "Yes — every rental on FastRental includes unlimited kilometres within the home city. Inter-state travel requires prior approval and may have additional permit fees.", category: "general", sortOrder: 8 },
];

const blogs = [
  { slug: "top-10-places-goa-self-drive", title: "Top 10 Places to Visit in Goa with a Self Drive Car", excerpt: "Goa is one of those rare destinations where a self drive car genuinely transforms the trip. Here are 10 places that are best explored on your own schedule.", coverImage: "/blog/places-goa.jpg", tags: ["Goa", "Travel", "Self Drive"], content: `<p>Goa is one of those rare destinations where a self drive car genuinely transforms the trip. Public transport is sparse, taxi cartels keep prices high, and the best beaches, viewpoints and hidden eateries are spread across narrow village roads that scooter rentals can't comfortably reach. Here are our top 10 places to visit when you have your own wheels.</p><h2>1. Fort Aguada and Sinquerim Beach</h2><p>Early-morning drive to Fort Aguada is non-negotiable. The 17th-century Portuguese-built fortification overlooks the Mandovi River, and the views from the lighthouse at sunrise are stunning.</p><h2>2. Chapora Fort (Dil Chahta Hai Fort)</h2><p>Made famous by the iconic Bollywood film, Chapora Fort offers panoramic views of Vagator Beach and the Chapora River.</p><h2>3. Dudhsagar Falls</h2><p>A four-tiered waterfall that drops 310m through dense jungle. With a Thar or any 4x4, the alternate route via Tambdi Surla is a once-in-a-lifetime drive.</p><h2>4. Spice Plantations of Ponda</h2><p>Sahakari and Tropical Spice Plantations both offer guided tours, traditional Goan lunches, and the chance to walk through pepper, cardamom and vanilla forests.</p><h2>5. Old Goa and the Basilica of Bom Jesus</h2><p>UNESCO World Heritage churches, Portuguese colonial architecture, and the relics of St. Francis Xavier.</p><h2>6. Palolem Beach (South Goa)</h2><p>Crescent-shaped and laid back, Palolem is everything North Goa isn't.</p><h2>7. Cabo de Rama Fort</h2><p>Less visited than Fort Aguada but arguably more spectacular — perched on a cliff over the Arabian Sea.</p><h2>8. Anjuna Flea Market (Wednesdays)</h2><p>The original hippie flea market, every Wednesday during the season.</p><h2>9. Arambol Beach and the Sweet Water Lake</h2><p>North of the touristy beaches lies Arambol — a freshwater lake right next to the ocean, sunset drum circles, and a more bohemian atmosphere.</p><h2>10. Divar Island</h2><p>The Mandovi River ferry to Divar Island is itself a memorable experience. Once on the island, drive through sleepy Portuguese-era villages, churches, and rice paddies.</p>` },
  { slug: "thar-rental-goa-guide", title: "Why Renting a Thar in Goa is the Best Decision", excerpt: "The Mahindra Thar isn't just a car — in Goa, it's a vibe. Here's why so many travellers specifically request the Thar.", coverImage: "/blog/thar-guide.jpg", tags: ["Thar", "Goa", "SUV"], content: `<p>The Mahindra Thar has become the unofficial mascot of Goa road trips. Walk along any beach road in North Goa during peak season and you'll lose count of how many Thars roll past.</p><h2>The Practical Case</h2><p>Goa's hidden beaches and viewpoints are reached via narrow, often deeply rutted village roads. The Thar's 226mm ground clearance and 4WD with low range simply don't worry about any of this.</p><h2>The Emotional Case</h2><p>Driving with the hardtop on but the windows down through Mandrem at sunset is one of those experiences that makes a Goa trip stick in your memory.</p><h2>Hard Top vs Convertible</h2><p>For Goa, we recommend the hardtop — monsoon downpours can be sudden and intense.</p><h2>Manual vs Automatic</h2><p>The automatic gearbox makes a noticeable difference in Goa's stop-go traffic.</p><h2>Pre-Booking Tips</h2><p>Thars book up faster than any other rental in our fleet — especially November–February weekends.</p><h2>What to Expect at Pickup</h2><p>The Thar requires a ₹10,000 refundable security deposit and the minimum age is 23.</p>` },
  { slug: "self-drive-rental-documents-india", title: "Documents You Need for Self Drive Car Rental in India", excerpt: "Pickup day shouldn't be the first time you think about paperwork. Here's exactly what you'll need to bring.", coverImage: "/blog/documents.jpg", tags: ["Rentals", "Documents", "Guide"], content: `<p>Self drive car rentals in India have a deserved reputation for being more efficient than they used to be — but a few mandatory documents are still necessary at every pickup.</p><h2>For Indian Citizens</h2><p>Valid Indian Driving License, Original Aadhaar Card OR Passport, and a secondary photo ID (PAN/Voter ID).</p><h2>For Foreign Citizens</h2><p>International Driving Permit (IDP) — must be issued before you arrive. Original passport with valid Indian visa.</p><h2>What If Someone Else Drives Too?</h2><p>Each additional driver must be at pickup with their own valid licence.</p><h2>Age and Experience Requirements</h2><p>Minimum driver age is 21 for most categories. For the Thar and luxury cars, the minimum is 23.</p><h2>Security Deposit</h2><p>The deposit is collected at pickup, typically via UPI.</p><h2>What If My Licence Is Expired or Lost?</h2><p>We cannot rent to anyone with an expired licence — no exceptions.</p>` },
];

async function main() {
  console.log("Seeding database…");

  // Admin user (only if none exists)
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    const email = (process.env.ADMIN_EMAIL || "admin@fastrental.local").toLowerCase();
    const password = process.env.ADMIN_PASSWORD || "ChangeMeInProd!2026";
    const name = process.env.ADMIN_NAME || "Site Admin";
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.create({ data: { email, passwordHash, name, role: "ADMIN" } });
    console.log(`   - admin user: ${email}`);
  }

  // Cities (all active now)
  const goa = await prisma.city.upsert({
    where: { slug: "goa" },
    update: { isActive: true },
    create: { slug: "goa", name: "Goa", isActive: true, heroImage: "/locations/goa.jpg", seoTitle: "Self Drive Car Rental in Goa | FastRental", seoDesc: "India's most trusted self drive car rental in Goa." },
  });
  const jaipur = await prisma.city.upsert({
    where: { slug: "jaipur" },
    update: { isActive: true },
    create: { slug: "jaipur", name: "Jaipur", isActive: true, heroImage: "/locations/jaipur.jpg", seoTitle: "Self Drive Car Rental in Jaipur | FastRental", seoDesc: "Self drive car rental in Jaipur — palaces, heritage, and the Royal Rajasthan." },
  });
  const chandigarh = await prisma.city.upsert({
    where: { slug: "chandigarh" },
    update: { isActive: true },
    create: { slug: "chandigarh", name: "Chandigarh", isActive: true, heroImage: "/locations/chandigarh.jpg", seoTitle: "Self Drive Car Rental in Chandigarh | FastRental", seoDesc: "Self drive cars in Chandigarh — gateway to Himachal and Punjab." },
  });

  const cityIdBySlug: Record<string, string> = {
    goa: goa.id,
    jaipur: jaipur.id,
    chandigarh: chandigarh.id,
  };

  // Goa locations
  for (const loc of goaLocations) {
    await prisma.location.upsert({
      where: { cityId_slug: { cityId: goa.id, slug: loc.slug } },
      update: {},
      create: { cityId: goa.id, slug: loc.slug, name: loc.name, heroImage: loc.heroImage, seoTitle: loc.seoTitle, seoDesc: loc.seoDesc, content: loc.content, isActive: true },
    });
  }

  // Cars — destructive: clear all car/carImage rows first to handle slug changes from older seed
  await prisma.carImage.deleteMany({});
  await prisma.car.deleteMany({});

  for (const c of allCars) {
    const features = FEATURES_BY_CAT[c.category] ?? FEATURES_BY_CAT.HATCHBACK!;
    await prisma.car.create({
      data: {
        slug: c.slug,
        cityId: cityIdBySlug[c.citySlug],
        name: c.name,
        brand: c.brand,
        model: c.model,
        category: c.category,
        transmission: c.transmission,
        fuelType: c.fuelType,
        seats: c.seats,
        mileage: c.mileage,
        engineCC: c.engineCC,
        driveType: c.driveType,
        pricePerDay: c.pricePerDay,
        unlimitedKm: true,
        isAvailable: c.isAvailable ?? true,
        isFeatured: c.isFeatured ?? false,
        sortOrder: c.sortOrder,
        shortDesc: shortDescFor(c.name, c.category),
        longDesc: longDescFor(c.name, c.category, c.citySlug),
        featuresJson: JSON.stringify(features),
        rentalTerms: COMMON_TERMS,
        rating: c.rating ?? 4.8,
        reviewsCount: c.reviewsCount ?? 0,
        images: {
          create: c.images.map((url, i) => ({
            url,
            alt: `${c.name} — view ${i + 1}`,
            sortOrder: i,
            isPrimary: i === 0,
          })),
        },
      },
    });
  }

  // FAQs
  for (const f of faqs) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (existing) {
      await prisma.faq.update({ where: { id: existing.id }, data: f });
    } else {
      await prisma.faq.create({ data: f });
    }
  }

  // Blogs
  for (const b of blogs) {
    const data = {
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      coverImage: b.coverImage,
      tagsJson: JSON.stringify(b.tags),
      isPublished: true,
      publishedAt: new Date(),
      seoTitle: b.title,
      seoDesc: b.excerpt,
    };
    await prisma.blog.upsert({ where: { slug: b.slug }, update: data, create: { slug: b.slug, ...data } });
  }

  const goaCount = goaCars.length;
  const jaipurCount = jaipurCars.length;
  const chdCount = chandigarhCars.length;
  console.log("✓ Seeded.");
  console.log(`   - Cities: 3 active (Goa, Jaipur, Chandigarh)`);
  console.log(`   - Cars: ${allCars.length} total (Goa ${goaCount}, Jaipur ${jaipurCount}, Chandigarh ${chdCount})`);
  console.log(`   - Locations: ${goaLocations.length} (Goa)`);
  console.log(`   - FAQs: ${faqs.length}`);
  console.log(`   - Blog posts: ${blogs.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
