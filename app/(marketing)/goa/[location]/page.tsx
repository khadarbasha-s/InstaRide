import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CarsGrid } from "@/components/cars/CarsGrid";
import { prisma } from "@/lib/prisma";
import { queryCarsForListing } from "@/lib/cars-query";

export const revalidate = 300;

export async function generateStaticParams() {
  const locs = await prisma.location.findMany({ select: { slug: true } });
  return locs.map((l) => ({ location: l.slug }));
}

const BLOCKED = new Set([
  "self-drive-car-rental-goa",
  "thar-rental-in-goa",
  "faqs",
]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  if (BLOCKED.has(location)) return {};
  const loc = await prisma.location.findFirst({ where: { slug: location } });
  if (!loc) return {};
  return {
    title:
      loc.seoTitle || `Self Drive Car Rental in ${loc.name}, Goa | FastRental`,
    description: loc.seoDesc ?? undefined,
    alternates: { canonical: `/goa/${loc.slug}` },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  if (BLOCKED.has(location)) notFound();
  const loc = await prisma.location.findFirst({ where: { slug: location } });
  if (!loc) notFound();
  const cars = await queryCarsForListing({});

  return (
    <>
      <section className="relative h-[280px] md:h-[360px] overflow-hidden">
        {loc.heroImage && (
          <Image
            src={loc.heroImage}
            alt={loc.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="container">
            <div className="max-w-2xl">
              <span className="inline-block bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                Goa · {loc.name}
              </span>
              <h1 className="text-white">
                Self Drive Car Rental in {loc.name}, Goa
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-gray-bg py-10 lg:py-14">
        <div className="container">
          {loc.content && (
            <div className="max-w-3xl prose-fastrental">
              <p className="whitespace-pre-line">{loc.content}</p>
            </div>
          )}
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-neutral-700">
            {[
              "Hotel Pickup",
              "Unlimited KMs",
              "No Hidden Charges",
              "24x7 Support",
            ].map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-success" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">
            Available Cars in {loc.name}
          </h2>
          <CarsGrid cars={cars} />
        </div>
      </section>
    </>
  );
}
