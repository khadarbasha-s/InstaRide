import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — FastRental",
  description: "Terms and conditions for using the FastRental website and rental services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-12 lg:py-16 prose-fastrental">
      <h1>Terms &amp; Conditions</h1>
      <p className="text-sm text-neutral-500">Last updated: June 2026</p>

      <h2>1. Acceptance</h2>
      <p>
        By using the FastRental website or renting a vehicle from us, you agree
        to these Terms &amp; Conditions and to our Rental Policy and Privacy
        Policy.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        Renters must be at least 21 years old (23 for the Thar and luxury cars),
        hold a valid Indian driving licence (or International Driving Permit
        with home-country licence for foreign visitors), and have at least 1
        year of driving experience.
      </p>

      <h2>3. Booking and cancellation</h2>
      <p>
        A booking is confirmed only after payment of an advance via UPI. Free
        cancellation up to 48 hours before pickup; cancellations within 48 hours
        forfeit the advance.
      </p>

      <h2>4. Pricing</h2>
      <p>
        Rates are in INR per day. Minimum booking is 2 days. Fuel, tolls, and
        parking are not included. Airport pickup/drop fees apply where chosen.
      </p>

      <h2>5. Use of vehicle</h2>
      <p>
        The vehicle must be driven only by the registered renter(s), within
        India, and only on legal roads. Inter-state travel requires prior
        written approval. Off-road use is permitted only for vehicles explicitly
        marked as off-road capable (e.g., Thar, Jimny).
      </p>

      <h2>6. Damages and accidents</h2>
      <p>
        The renter is responsible for any damage to the vehicle during the
        rental period, subject to the rental agreement and applicable insurance.
        Report any accident immediately on +91 88245 83708.
      </p>

      <h2>7. Liability</h2>
      <p>
        FastRental is not liable for traffic violations, fines, penalties, or
        accidents caused by the renter&apos;s actions. The renter indemnifies
        FastRental against any third-party claims arising from such actions.
      </p>

      <h2>8. Modifications</h2>
      <p>
        We may update these terms; the current version is always available on
        this page.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes are subject
        to the jurisdiction of courts in Goa.
      </p>
    </div>
  );
}
