"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarCard, type CarCardData } from "@/components/cars/CarCard";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedCarsCarousel({ cars }: { cars: CarCardData[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-20 lg:py-28 bg-brand-peach">
      <div className="container">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 mb-12 items-end">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.25em] text-brand-terracotta uppercase mb-3">
                Most rented
              </span>
              <h2 className="text-brand-cocoa">
                Crowd favourites &mdash; ready to{" "}
                <span className="serif-italic text-brand-terracotta">go</span>.
              </h2>
            </div>
            <div className="hidden md:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                aria-label="Previous"
                className="border-brand-cocoa/20 hover:bg-brand-cocoa hover:text-brand-cream hover:border-brand-cocoa"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                aria-label="Next"
                className="border-brand-cocoa/20 hover:bg-brand-cocoa hover:text-brand-cream hover:border-brand-cocoa"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[48%] lg:basis-[31%] xl:basis-[24%]"
                >
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
