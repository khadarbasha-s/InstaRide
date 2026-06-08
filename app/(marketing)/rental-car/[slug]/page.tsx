import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Cog,
  Fuel,
  Gauge,
  Users,
  Calendar,
  Truck,
  Star,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CarGallery } from "@/components/cars/CarGallery";
import { CarSidebar } from "@/components/cars/CarSidebar";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { parseJsonArray, titleCase } from "@/lib/utils";
import { SITE_URL } from "@/data/contact";

export const revalidate = 60;

export async function generateStaticParams() {
  const cars = await prisma.car.findMany({ select: { slug: true } });
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = await prisma.car.findUnique({
    where: { slug },
    include: { images: { where: { isPrimary: true }, take: 1 } },
  });
  if (!car) return {};
  return {
    title: `${car.name} — Self Drive Rental in Goa from ₹${car.pricePerDay}/day`,
    description: car.shortDesc,
    alternates: { canonical: `/rental-car/${car.slug}` },
    openGraph: {
      title: `${car.name} — Self Drive Rental from ₹${car.pricePerDay}/day`,
      description: car.shortDesc,
      images: car.images[0] ? [`${SITE_URL}${car.images[0].url}`] : undefined,
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = await prisma.car.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!car) notFound();

  const features = parseJsonArray(car.featuresJson);

  // Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: car.name,
    brand: { "@type": "Brand", name: car.brand },
    image: car.images.map((i) => `${SITE_URL}${i.url}`),
    vehicleTransmission: car.transmission === "AUTOMATIC" ? "Automatic" : "Manual",
    fuelType: titleCase(car.fuelType),
    seatingCapacity: car.seats,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: car.rating,
      reviewCount: car.reviewsCount,
    },
    offers: {
      "@type": "Offer",
      price: car.pricePerDay,
      priceCurrency: "INR",
      availability: car.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-brand-gray-bg border-b">
        <div className="container py-3 text-xs text-neutral-600 flex items-center gap-1">
          <Link href="/" className="hover:text-brand-black">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/goa/self-drive-car-rental-goa" className="hover:text-brand-black">
            Goa Cars
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-brand-black">{car.name}</span>
        </div>
      </nav>

      <section className="py-8 lg:py-12">
        <div className="container grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
          {/* Left content */}
          <div className="min-w-0 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge>{titleCase(car.category)}</Badge>
                <Badge variant="muted">{car.brand}</Badge>
              </div>
              <h1 className="text-brand-black mb-3">{car.name}</h1>
              <div className="flex items-center gap-3 text-sm text-neutral-600">
                <div className="flex items-center gap-1 font-semibold text-brand-black">
                  <Star className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
                  {car.rating.toFixed(1)}
                  <span className="text-neutral-500 font-normal">
                    ({car.reviewsCount} reviews)
                  </span>
                </div>
                <span className="text-neutral-300">·</span>
                <span>Min. {car.minBookingDays} day booking</span>
              </div>
            </div>

            <CarGallery
              images={car.images.map((i) => ({ url: i.url, alt: i.alt }))}
            />

            <p className="text-lg text-neutral-700 leading-relaxed">
              {car.shortDesc}
            </p>

            {/* Specs */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <SpecCard icon={Cog} label="Transmission" value={titleCase(car.transmission)} />
                <SpecCard icon={Fuel} label="Fuel Type" value={titleCase(car.fuelType)} />
                <SpecCard icon={Users} label="Seats" value={`${car.seats}`} />
                <SpecCard icon={Gauge} label="Mileage" value={`${car.mileage} km/l`} />
                {car.engineCC && (
                  <SpecCard icon={Cog} label="Engine" value={`${car.engineCC}cc`} />
                )}
                {car.driveType && (
                  <SpecCard icon={Truck} label="Drive" value={car.driveType} />
                )}
                <SpecCard
                  icon={Calendar}
                  label="Min. Booking"
                  value={`${car.minBookingDays} days`}
                />
              </div>
            </section>

            {/* Features */}
            {features.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-neutral-700 bg-brand-gray-bg rounded-lg px-3 py-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Long description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About this car</h2>
              <p className="text-neutral-700 leading-relaxed">{car.longDesc}</p>
            </section>

            {/* Rental Terms */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Rental Terms</h2>
              <div className="bg-brand-gray-bg rounded-2xl p-5">
                <pre className="whitespace-pre-wrap font-sans text-sm text-neutral-700 leading-relaxed">
                  {car.rentalTerms}
                </pre>
              </div>
            </section>

            {/* FAQ accordion */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="docs">
                  <AccordionTrigger>What documents do I need?</AccordionTrigger>
                  <AccordionContent>
                    A valid Indian Driving License and original Aadhaar/Passport.
                    Foreign visitors need an International Driving Permit
                    accompanied by their home-country licence.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="deposit">
                  <AccordionTrigger>How much is the security deposit?</AccordionTrigger>
                  <AccordionContent>
                    Deposits range from ₹3,000 (hatchbacks) to ₹10,000 (Thar &
                    luxury cars). Fully refundable, paid via UPI at pickup.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="km">
                  <AccordionTrigger>Are kilometres really unlimited?</AccordionTrigger>
                  <AccordionContent>
                    Yes — no per-km charges within Goa. Inter-state travel
                    requires prior approval and may include permit fees.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pickup">
                  <AccordionTrigger>Where can I pick up the car?</AccordionTrigger>
                  <AccordionContent>
                    At your hotel or villa within North Goa (free within 5km of
                    our office). Goa Airport pickup available at ₹999 each way.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 self-start">
            <CarSidebar
              carId={car.id}
              carName={car.name}
              pricePerDay={car.pricePerDay}
              minBookingDays={car.minBookingDays}
              isAvailable={car.isAvailable}
            />
          </aside>
        </div>
      </section>
    </>
  );
}

function SpecCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white border p-3">
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="font-bold text-brand-black text-sm">{value}</div>
    </div>
  );
}
