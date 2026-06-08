import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { CitiesSection } from "@/components/home/CitiesSection";
import { FeaturedCarsCarousel } from "@/components/home/FeaturedCarsCarousel";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FeaturesBenefits } from "@/components/home/FeaturesBenefits";
import { BrandsCarousel } from "@/components/home/BrandsCarousel";
import { WhyRideWithUs } from "@/components/home/WhyRideWithUs";
import type { CarCardData } from "@/components/cars/CarCard";

export const revalidate = 60;

async function getFeaturedCars(): Promise<CarCardData[]> {
  const cars = await prisma.car.findMany({
    where: { isFeatured: true, isAvailable: true },
    include: { images: { where: { isPrimary: true }, take: 1 } },
    orderBy: { sortOrder: "asc" },
    take: 8,
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

export default async function HomePage() {
  const featured = await getFeaturedCars();
  return (
    <>
      <Hero />
      <CitiesSection />
      <HowItWorks />
      <FeaturedCarsCarousel cars={featured} />
      <FeaturesBenefits />
      <Testimonials />
      <WhyRideWithUs />
      <BrandsCarousel />
    </>
  );
}
