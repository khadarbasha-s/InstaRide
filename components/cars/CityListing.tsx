import { Check } from "lucide-react";
import { CarFilters } from "@/components/cars/CarFilters";
import { CarsGrid } from "@/components/cars/CarsGrid";
import { ReadMoreText } from "@/components/cars/ReadMoreText";
import type { CarCardData } from "@/components/cars/CarCard";

interface CityListingProps {
  cityName: string;
  h1: string;
  intro: string;
  bullets?: string[];
  cars: CarCardData[];
}

const DEFAULT_BULLETS = [
  "Unlimited KMs",
  "Pickup & Drop",
  "Manual & Automatic",
  "Govt Approved",
  "No Hidden Charges",
  "Best Prices",
  "No Middleman",
  "90% Repeat Customers",
];

export function CityListing({
  cityName,
  h1,
  intro,
  bullets = DEFAULT_BULLETS,
  cars,
}: CityListingProps) {
  return (
    <>
      <section className="bg-brand-cream-deep py-10 lg:py-14">
        <div className="container">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-brand-yellow-600 uppercase mb-3">
            {cityName} · Self Drive
          </span>
          <h1 className="text-brand-black mb-4 max-w-4xl">{h1}</h1>
          <ReadMoreText text={intro} />
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-neutral-700">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-success" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="container grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl border p-5 lg:shadow-sm">
              <CarFilters />
            </div>
          </aside>
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-neutral-600">
                Showing <span className="font-bold">{cars.length}</span> cars in{" "}
                {cityName}
              </p>
            </div>
            <CarsGrid cars={cars} />
          </div>
        </div>
      </section>
    </>
  );
}
