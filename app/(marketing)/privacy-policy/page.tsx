import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FastRental",
  description: "Privacy policy for the FastRental website and rental services.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl py-12 lg:py-16 prose-fastrental">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-neutral-500">Last updated: June 2026</p>

      <p>
        FastRental India Private Limited (&quot;FastRental,&quot; &quot;we,&quot; &quot;us,&quot;
        or &quot;our&quot;) respects your privacy. This Privacy Policy explains what
        information we collect, how we use it, and your rights in relation to
        that information.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        When you contact us through the website (contact form, car-detail
        inquiry form, or phone/WhatsApp click), we collect: your name, phone
        number, email address (if provided), pickup and return dates, the car
        you are interested in, your message, and basic usage data (IP address,
        device, referrer).
      </p>
      <p>
        At pickup of a rented vehicle, we additionally collect: a copy of your
        driving license, identity proof (Aadhaar or Passport), and signed rental
        agreement.
      </p>

      <h2>2. How we use it</h2>
      <ul>
        <li>To respond to your inquiry and arrange a booking.</li>
        <li>To process and manage rentals, including identity verification.</li>
        <li>To send booking confirmations and follow-ups.</li>
        <li>To improve our website and services.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>3. Sharing your information</h2>
      <p>
        We do not sell your data. We only share information with: (a) service
        providers who help us deliver the service (e.g., email sending,
        analytics, payment processors), under strict confidentiality; and (b)
        law-enforcement or regulators when legally required.
      </p>

      <h2>4. Data retention</h2>
      <p>
        We retain inquiry and rental data for as long as necessary to provide
        services and comply with legal obligations (typically 3 years after the
        last interaction).
      </p>

      <h2>5. Your rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal
        data by emailing{" "}
        <a href="mailto:fastrentalindia@gmail.com">fastrentalindia@gmail.com</a>.
      </p>

      <h2>6. Cookies and analytics</h2>
      <p>
        We use cookies and analytics tools (such as Google Analytics, Microsoft
        Clarity, and Meta Pixel) to understand usage and improve our site. You
        can opt out via your browser settings.
      </p>

      <h2>7. Updates</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        posted on this page with a revised &quot;last updated&quot; date.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions? Reach us at{" "}
        <a href="mailto:fastrentalindia@gmail.com">fastrentalindia@gmail.com</a>{" "}
        or call +91 88245 83708.
      </p>
    </div>
  );
}
