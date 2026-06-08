import { prisma } from "@/lib/prisma";
import type { CarCardData } from "@/components/cars/CarCard";

export type CarQueryArgs = {
  citySlug?: string;
  categories?: string[];
  brands?: string[];
  transmission?: string;
  maxPrice?: number;
  q?: string;
  whereOverride?: Record<string, unknown>;
};

export async function queryCarsForListing(
  args: CarQueryArgs
): Promise<CarCardData[]> {
  const where: Record<string, unknown> = { ...(args.whereOverride || {}) };

  if (args.citySlug) {
    where.city = { is: { slug: args.citySlug } };
  }
  if (args.categories && args.categories.length) {
    where.category = { in: args.categories };
  }
  if (args.brands && args.brands.length) {
    where.brand = { in: args.brands };
  }
  if (args.transmission) {
    where.transmission = args.transmission;
  }
  if (args.maxPrice !== undefined) {
    where.pricePerDay = { lte: args.maxPrice };
  }
  if (args.q && args.q.trim().length) {
    const q = args.q.trim();
    where.OR = [
      { name: { contains: q } },
      { brand: { contains: q } },
      { model: { contains: q } },
    ];
  }

  const cars = await prisma.car.findMany({
    where,
    include: { images: { where: { isPrimary: true }, take: 1 } },
    orderBy: [{ isAvailable: "desc" }, { sortOrder: "asc" }],
  });

  return cars.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    brand: c.brand,
    category: c.category,
    transmission: c.transmission,
    fuelType: c.fuelType,
    seats: c.seats,
    mileage: c.mileage,
    pricePerDay: c.pricePerDay,
    minBookingDays: c.minBookingDays,
    isAvailable: c.isAvailable,
    rating: c.rating,
    reviewsCount: c.reviewsCount,
    image: c.images[0]?.url ?? null,
  }));
}

export function parseListingSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): Omit<CarQueryArgs, "citySlug"> {
  const get = (k: string): string | undefined => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };
  return {
    categories: get("category")?.split(",").filter(Boolean),
    brands: get("brand")?.split(",").filter(Boolean),
    transmission: get("transmission") || undefined,
    maxPrice: get("maxPrice") ? Number(get("maxPrice")) : undefined,
    q: get("q") || undefined,
  };
}
