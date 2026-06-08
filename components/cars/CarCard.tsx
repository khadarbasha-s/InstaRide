import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Phone, Settings2, Star, Users, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR, titleCase } from "@/lib/utils";
import { PHONE_TEL, buildWhatsappLink } from "@/lib/whatsapp";

export type CarCardData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  transmission: string;
  fuelType: string;
  seats: number;
  mileage: number;
  pricePerDay: number;
  minBookingDays: number;
  isAvailable: boolean;
  rating: number;
  reviewsCount: number;
  image: string | null;
};

export function CarCard({ car }: { car: CarCardData }) {
  const unavailable = !car.isAvailable;
  return (
    <article className="group flex flex-col h-full bg-white rounded-[1.25rem] overflow-hidden card-lift border border-brand-cocoa/5">
      <Link
        href={`/rental-car/${car.slug}`}
        className="relative aspect-[5/4] w-full overflow-hidden bg-brand-cream-deep"
      >
        {car.image && (
          <Image
            src={car.image}
            alt={car.name}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
              unavailable ? "grayscale" : ""
            }`}
          />
        )}
        {unavailable && (
          <div className="absolute inset-0 grid place-items-center bg-brand-cocoa/30">
            <span className="bg-brand-cocoa text-brand-cream text-xs font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full">
              Fully booked
            </span>
          </div>
        )}

        {/* Top-left category */}
        <span className="absolute top-3 left-3 bg-brand-cream text-brand-cocoa text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full">
          {titleCase(car.category)}
        </span>

        {/* Top-right view arrow */}
        <span className="absolute top-3 right-3 h-9 w-9 rounded-full bg-brand-cream/95 text-brand-cocoa grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <div className="text-[10px] text-brand-cocoa-muted font-semibold tracking-[0.12em] uppercase mb-0.5">
              {car.brand}
            </div>
            <h3 className="text-base font-bold leading-tight text-brand-cocoa">
              {car.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-brand-cocoa pt-1">
            <Star className="h-3.5 w-3.5 fill-brand-mustard text-brand-mustard" />
            {car.rating.toFixed(1)}
          </div>
        </div>

        <div className="text-xs text-brand-cocoa-muted mb-4">
          {car.reviewsCount} trips · Min. {car.minBookingDays}-day booking
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-brand-cocoa-muted mb-5 pb-5 border-b border-brand-cocoa/8">
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5" strokeWidth={1.6} />
            {car.transmission === "AUTOMATIC" ? "Auto" : "Manual"}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" strokeWidth={1.6} />
            {car.seats}-seater
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5" strokeWidth={1.6} />
            {titleCase(car.fuelType)}
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-2xl font-bold text-brand-cocoa leading-none">
              {formatINR(car.pricePerDay)}
            </span>
            <span className="text-sm font-medium text-brand-cocoa-muted">
              / day
            </span>
            <span className="text-xs text-brand-cocoa-muted ml-auto inline-flex items-center gap-1">
              <Gauge className="h-3 w-3" strokeWidth={1.6} />
              {car.mileage} km/l
            </span>
          </div>

          {unavailable ? (
            <Button asChild variant="outline" size="default" className="w-full text-xs">
              <Link href={`/rental-car/${car.slug}`}>See similar cars</Link>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                asChild
                variant="primary"
                size="default"
                className="flex-1 text-xs"
              >
                <a href={PHONE_TEL} aria-label={`Call to book ${car.name}`}>
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  Call
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="default"
                className="flex-1 text-xs"
              >
                <a
                  href={buildWhatsappLink(car.name, "Goa")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// Keep Badge import path-compatible (some places might import it)
export { Badge };
