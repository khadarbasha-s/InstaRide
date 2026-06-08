import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Rental Policy — FastRental",
  description: "Complete car rental policy for FastRental self drive vehicles in Goa, Jaipur and Chandigarh.",
  alternates: { canonical: "/rental-policy" },
};

export default function RentalPolicyPage() {
  return (
    <div className="container max-w-3xl py-12 lg:py-16 prose-fastrental">
      <h1>Car Rental Policy</h1>
      <p className="text-sm text-neutral-500">Last updated: June 2026</p>

      <h2>1. Minimum booking</h2>
      <p>
        All FastRental bookings have a minimum duration of 2 days. We do not
        offer 1-day rentals in Goa.
      </p>

      <h2>2. Documents required</h2>
      <ul>
        <li>Valid Indian driving licence (or International Driving Permit + home-country licence for foreigners).</li>
        <li>Original Aadhaar card OR passport.</li>
        <li>A secondary photo ID (recommended) — PAN or Voter ID.</li>
      </ul>

      <h2>3. Security deposit</h2>
      <p>
        Refundable security deposits are based on car category:
      </p>
      <ul>
        <li>Hatchbacks — ₹3,000</li>
        <li>Sedans &amp; Compact SUVs — ₹5,000</li>
        <li>SUVs &amp; MPVs — ₹7,500</li>
        <li>Thar &amp; Luxury cars — ₹10,000</li>
      </ul>
      <p>Deposits are refunded via UPI within 24 hours of return, subject to no damage and full-fuel return.</p>

      <h2>4. Fuel</h2>
      <p>
        Vehicles are handed over with a recorded fuel level and must be returned
        with the same level. Differences are billed at prevailing pump prices
        plus a ₹200 refueling fee.
      </p>

      <h2>5. Kilometres</h2>
      <p>
        All rentals include unlimited kilometres within Goa. Inter-state travel
        requires prior approval and may involve additional permit fees.
      </p>

      <h2>6. Late return</h2>
      <p>
        Returns within 1 hour of the agreed time are free. Beyond that, ₹200
        per hour is charged, capped at one additional rental day.
      </p>

      <h2>7. Damage policy</h2>
      <p>
        Minor damage (up to ₹3,000) is settled from the security deposit at fair
        repair rates. Major damage is governed by the rental agreement and
        applicable insurance. Always notify us immediately of any accident or
        damage.
      </p>

      <h2>8. Prohibited use</h2>
      <ul>
        <li>Driving under the influence of alcohol or drugs.</li>
        <li>Sub-renting or transferring the vehicle to unregistered drivers.</li>
        <li>Off-road use (except for off-road-capable vehicles).</li>
        <li>Use for racing, motor sports, or unlawful activities.</li>
      </ul>

      <h2>9. Pickup and drop</h2>
      <p>
        Free pickup and drop within 5 km of our office. Goa Dabolim Airport:
        ₹999 each way. Mopa Airport: ₹1,499 each way. Free one-way pickup for
        rentals of 5+ days.
      </p>

      <h2>10. Cancellation</h2>
      <p>
        Free cancellation up to 48 hours before pickup. Cancellations within 48
        hours forfeit the booking advance.
      </p>
    </div>
  );
}
