import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CarsGrid } from "@/components/cars/CarsGrid";
import { ReadMoreText } from "@/components/cars/ReadMoreText";
import { queryCarsForListing } from "@/lib/cars-query";

export const metadata: Metadata = {
  title: "Thar Rental in Goa | Mahindra Thar Self Drive | FastRental",
  description:
    "Rent Mahindra Thar in Goa for self drive — hard top, automatic, manual & Thar Roxx. Best prices, unlimited KMs, hotel pickup.",
  alternates: { canonical: "/goa/thar-rental-in-goa" },
};

const INTRO = `The Mahindra Thar has become Goa's most iconic self drive rental — and FastRental has the largest Thar fleet in the state. Whether you want the hard top automatic for relaxed beach trips, the manual for serious off-roading, or the new 5-door Thar Roxx for family adventures, we have a variant ready for you. Our Thars come with 4WD as standard, the proven mHawk diesel engine, and every safety feature you'd expect — hill descent control, hill hold assist, ABS, multiple airbags. We deliver to your hotel or villa anywhere in North Goa, with airport pickup at Dabolim available. Note: Thar bookings have a slightly higher security deposit (₹10,000) and minimum driver age of 23. Bookings fill up fast — we recommend reserving at least 2 weeks ahead for weekends in November–February and the Christmas/New Year period.`;

const BULLETS = [
  "4WD with Low Range",
  "Hard Top & Roxx options",
  "Unlimited KMs",
  "Hotel & Airport Pickup",
  "₹10,000 Refundable Deposit",
  "Min. Driver Age 23",
];

export default async function TharPage() {
  const cars = await queryCarsForListing({
    citySlug: "goa",
    whereOverride: { brand: "Mahindra", model: { contains: "Thar" } },
  });
  return (
    <>
      <section className="bg-brand-gray-bg py-10 lg:py-14">
        <div className="container">
          <h1 className="text-brand-black mb-4 max-w-4xl">
            Thar Rental in Goa | Self Drive Mahindra Thar at Best Prices
          </h1>
          <ReadMoreText text={INTRO} />
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-neutral-700">
            {BULLETS.map((b) => (
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
          <CarsGrid cars={cars} />
        </div>
      </section>
    </>
  );
}
