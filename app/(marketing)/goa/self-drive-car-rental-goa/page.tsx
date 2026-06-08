import type { Metadata } from "next";
import { CityListing } from "@/components/cars/CityListing";
import { queryCarsForListing, parseListingSearchParams } from "@/lib/cars-query";

export const metadata: Metadata = {
  title: "Self Drive Car Rental in Goa | Car Rental at Goa Airport",
  description:
    "Rent self drive cars in Goa with unlimited KMs. Hatchbacks, SUVs, Thar & more. Pickup & drop at Goa Airport. Best prices, no hidden charges.",
  alternates: { canonical: "/goa/self-drive-car-rental-goa" },
};

const INTRO = `FastRental is one of India's most trusted self drive car rental companies, with our biggest fleet operating in Goa. We've been renting cars to travellers since 2008, and today serve over 10,000 happy customers every year. Our Goa fleet covers everything from fuel-efficient hatchbacks like the Maruti Swift and Baleno to luxury SUVs, the iconic Mahindra Thar, and convertible weekenders. Every car comes with unlimited kilometres, full insurance, 24x7 roadside assistance, and no per-km surprise charges. We offer pickup at Goa Dabolim Airport, Mopa Airport, or your hotel — paperwork takes 10 minutes and our team is available round-the-clock on call and WhatsApp.`;

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function GoaListingPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const args = parseListingSearchParams(sp);
  const cars = await queryCarsForListing({ ...args, citySlug: "goa" });

  return (
    <CityListing
      cityName="Goa"
      h1="Self Drive Car Rental in Goa | Car Rental at Goa Airport at Best Prices"
      intro={INTRO}
      cars={cars}
    />
  );
}
