import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/data/contact";

const LINKS = [
  { href: "/contact-us", label: "About" },
  { href: "/fastrental-blog", label: "Stories" },
  { href: "/contact-us", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/rental-policy", label: "Rental policy" },
];

const CITIES = [
  { href: "/goa/self-drive-car-rental-goa", label: "Goa" },
  { href: "/jaipur/self-drive-car-rental-jaipur", label: "Jaipur" },
  { href: "/chandigarh/self-drive-car-rental-chandigarh", label: "Chandigarh" },
  { href: "/goa/thar-rental-in-goa", label: "Thar in Goa" },
  { href: "/goa/calangute", label: "Calangute" },
  { href: "/goa/baga", label: "Baga" },
];

export function Footer() {
  return (
    <footer className="bg-brand-cream-deep text-brand-cocoa mt-24 border-t border-brand-cocoa/10">
      <div className="container py-16 lg:py-20">
        {/* Top: tagline + brand */}
        <div className="border-b border-brand-cocoa/15 pb-12 mb-12 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-brand-cocoa-muted mb-3">
              Self drive · Since 2008
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-brand-cocoa max-w-2xl">
              Your road, on your <span className="serif-italic text-brand-terracotta">terms</span>.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-brand-cocoa grid place-items-center">
              <span className="serif text-brand-mustard text-xl font-bold leading-none">f</span>
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight">fastrental</div>
              <div className="text-xs text-brand-cocoa-muted">India&apos;s most-loved fleet</div>
            </div>
          </div>
        </div>

        {/* Bottom: 4-column links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.15em] text-brand-cocoa mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-brand-cocoa-muted hover:text-brand-terracotta transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-[0.15em] text-brand-cocoa mb-4">
              Cities
            </h4>
            <ul className="space-y-3">
              {CITIES.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-brand-cocoa-muted hover:text-brand-terracotta transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-[0.15em] text-brand-cocoa mb-4">
              Reach us
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="flex items-center gap-2.5 text-sm text-brand-cocoa-muted hover:text-brand-terracotta"
                >
                  <Phone className="h-4 w-4 text-brand-mustard-deep" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2.5 text-sm text-brand-cocoa-muted hover:text-brand-terracotta"
                >
                  <Mail className="h-4 w-4 text-brand-mustard-deep" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-brand-cocoa-muted">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-mustard-deep shrink-0" />
                <span>
                  {CONTACT.address.line1}, {CONTACT.address.locality},<br />
                  {CONTACT.address.city} {CONTACT.address.pincode}
                </span>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-[0.15em] text-brand-cocoa mb-4">
              Open hours
            </h4>
            <p className="text-sm text-brand-cocoa-muted mb-2">
              {CONTACT.hours}
            </p>
            <p className="text-xs text-brand-cocoa-muted/80 leading-relaxed">
              On-call support available round the clock for active rentals.
              For new bookings, our team is fastest between 9 AM and 9 PM.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-cocoa/15">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-cocoa-muted">
          <span>
            © 2008–{new Date().getFullYear()} {CONTACT.corporate.name}. All rights reserved.
          </span>
          <span className="serif italic">Crafted with care from Goa.</span>
        </div>
      </div>
    </footer>
  );
}
