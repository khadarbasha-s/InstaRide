"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/goa/self-drive-car-rental-goa", label: "Goa" },
  { href: "/jaipur/self-drive-car-rental-jaipur", label: "Jaipur" },
  { href: "/chandigarh/self-drive-car-rental-chandigarh", label: "Chandigarh" },
  { href: "/goa/thar-rental-in-goa", label: "Thar" },
  { href: "/fastrental-blog", label: "Stories" },
  { href: "/contact-us", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-cream/85 backdrop-blur-md border-b border-brand-cocoa/8">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="FastRental home">
          <div className="h-9 w-9 rounded-full bg-brand-cocoa grid place-items-center">
            <span className="serif text-brand-mustard text-base font-bold leading-none">f</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-brand-cocoa">
            fastrental
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-brand-cocoa/80 hover:text-brand-cocoa hover:bg-brand-cream-deep px-3.5 py-2 rounded-full transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right: Call CTA + mobile menu */}
        <div className="flex items-center gap-2">
          <Button asChild size="default" variant="primary" className="hidden md:inline-flex">
            <a href={PHONE_TEL} aria-label={`Call ${PHONE_DISPLAY}`}>
              <Phone className="h-4 w-4 mr-2" />
              {PHONE_DISPLAY}
            </a>
          </Button>
          <Button asChild size="icon" variant="primary" className="md:hidden">
            <a href={PHONE_TEL} aria-label={`Call ${PHONE_DISPLAY}`}>
              <Phone className="h-4 w-4" />
            </a>
          </Button>
          <button
            type="button"
            className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-brand-cream-deep transition"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={cn(
          "lg:hidden border-t border-brand-cocoa/8 bg-brand-cream overflow-hidden transition-[max-height]",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="container py-2 flex flex-col">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-brand-cocoa border-b border-brand-cocoa/8 last:border-b-0 hover:text-brand-terracotta"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
