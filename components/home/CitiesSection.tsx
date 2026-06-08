import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const CITIES = [
  {
    name: "Goa",
    image: "/locations/goa.jpg",
    href: "/goa/self-drive-car-rental-goa",
    fleet: "31 cars",
    note: "Beaches · Thar · Sunset drives",
  },
  {
    name: "Jaipur",
    image: "/locations/jaipur.jpg",
    href: "/jaipur/self-drive-car-rental-jaipur",
    fleet: "29 cars",
    note: "Palaces · Heritage · CNG options",
  },
  {
    name: "Chandigarh",
    image: "/locations/chandigarh.jpg",
    href: "/chandigarh/self-drive-car-rental-chandigarh",
    fleet: "12 cars",
    note: "Himachal-bound · Mountain runs",
  },
];

export function CitiesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 mb-14 items-end">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.25em] text-brand-terracotta uppercase mb-3">
                Three cities, one fleet
              </span>
              <h2 className="text-brand-cocoa">
                Pick where you&apos;re{" "}
                <span className="serif-italic text-brand-terracotta">headed</span>.
              </h2>
            </div>
            <p className="text-lg text-brand-cocoa-muted leading-relaxed max-w-xl lg:justify-self-end">
              Each city has a curated fleet tuned to local needs — beach
              hatchbacks, royal SUVs, and Himalaya-ready 4×4s. More cities on the
              way next year.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {CITIES.map((city, i) => (
            <Reveal key={city.name} delay={i * 100}>
              <Link
                href={city.href}
                className="group block relative aspect-[4/5] rounded-[1.5rem] overflow-hidden card-lift"
              >
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-110"
                />
                {/* Warm overlay that lifts on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-cocoa/85 via-brand-cocoa/30 to-transparent transition-opacity duration-500" />

                {/* Top-right arrow chip */}
                <div className="absolute top-5 right-5 h-11 w-11 rounded-full bg-brand-cream text-brand-cocoa grid place-items-center group-hover:bg-brand-mustard transition-colors">
                  <ArrowUpRight className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                </div>

                {/* Bottom info */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7 text-brand-cream">
                  <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-mustard mb-3">
                    <span>India</span>
                    <span>{city.fleet}</span>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-2 tracking-tight">
                    {city.name}
                  </h3>
                  <p className="text-sm text-brand-cream/80 font-medium">
                    {city.note}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
