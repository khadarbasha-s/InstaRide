import type { Metadata } from "next";
import { CityListing } from "@/components/cars/CityListing";
import { queryCarsForListing, parseListingSearchParams } from "@/lib/cars-query";

export const metadata: Metadata = {
  title: "Self Drive Car Rental in Jaipur | Best Prices, Unlimited KMs",
  description:
    "Rent self drive cars in Jaipur — hatchbacks, SUVs, Thar, Fortuner, Scorpio N. CNG options available. Pickup at hotel or Jaipur Airport.",
  alternates: { canonical: "/jaipur/self-drive-car-rental-jaipur" },
};

const INTRO = `FastRental Jaipur offers a wide range of self drive cars for tourists and locals exploring the Pink City and Rajasthan. From fuel-efficient CNG hatchbacks (i10 Nios, i20, Aura) ideal for budget-conscious travellers to premium SUVs (Fortuner, Scorpio N, Creta) and the legendary Thar for desert adventures, our Jaipur fleet has a vehicle for every itinerary. Plan a heritage circuit covering Amber Fort, Nahargarh and Jaigarh, drive out to Pushkar or Ranthambore National Park, or simply explore the Pink City's bazaars at your own pace. All rentals include unlimited kilometres within Rajasthan, full insurance, 24x7 roadside assistance, and no hidden charges. Pickup at your hotel, Jaipur International Airport, or our office in the city.`;

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function JaipurListingPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const args = parseListingSearchParams(sp);
  const cars = await queryCarsForListing({ ...args, citySlug: "jaipur" });

  return (
    <CityListing
      cityName="Jaipur"
      h1="Self Drive Car Rental in Jaipur — Palaces, Heritage & Royal Roads"
      intro={INTRO}
      cars={cars}
    />
  );
}
