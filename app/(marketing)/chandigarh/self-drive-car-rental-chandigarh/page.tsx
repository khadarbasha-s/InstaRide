import type { Metadata } from "next";
import { CityListing } from "@/components/cars/CityListing";
import { queryCarsForListing, parseListingSearchParams } from "@/lib/cars-query";

export const metadata: Metadata = {
  title: "Self Drive Car Rental in Chandigarh | Best Prices, Unlimited KMs",
  description:
    "Self drive cars in Chandigarh — gateway to Himachal Pradesh. Swift, Baleno, Creta, Thar, Scorpio N, XUV 700. Hotel pickup available.",
  alternates: { canonical: "/chandigarh/self-drive-car-rental-chandigarh" },
};

const INTRO = `FastRental Chandigarh is your launchpad for the Himalayas. Whether you're heading to Shimla, Manali, Spiti, Kasol, or Dharamshala, our well-maintained fleet of self drive cars in Chandigarh covers every need — from city-friendly hatchbacks like the Swift and Baleno to powerful SUVs like the Mahindra Scorpio N, XUV 700 and the iconic Thar 4x4 for serious mountain expeditions. Every car comes with unlimited kilometres, full insurance, and 24x7 roadside assistance for those late-night calls from a remote pass. We offer hotel pickup across Chandigarh, Panchkula and Mohali, plus pickup at Chandigarh International Airport. Paperwork in 10 minutes; on the road in under 30.`;

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ChandigarhListingPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const args = parseListingSearchParams(sp);
  const cars = await queryCarsForListing({ ...args, citySlug: "chandigarh" });

  return (
    <CityListing
      cityName="Chandigarh"
      h1="Self Drive Car Rental in Chandigarh — Gateway to the Himalayas"
      intro={INTRO}
      cars={cars}
    />
  );
}
