const BRANDS = [
  "MARUTI", "HYUNDAI", "TOYOTA", "KIA",
  "MAHINDRA", "TATA", "MG", "AUDI", "MINI",
];

export function BrandsCarousel() {
  return (
    <section className="py-16 lg:py-20 bg-brand-cream overflow-hidden relative">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-[0.25em] text-brand-terracotta uppercase mb-3">
            Manufacturers
          </span>
          <h2 className="text-brand-cocoa">
            Hand-picked across India&apos;s{" "}
            <span className="serif-italic text-brand-terracotta">most trusted</span> brands.
          </h2>
        </div>

        <div className="relative">
          {/* Edge fades into cream */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-brand-cream to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-cream to-transparent z-10" />

          <div className="flex marquee-track gap-14 py-4">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div
                key={`${b}-${i}`}
                className="shrink-0 grid place-items-center"
              >
                <span className="serif text-3xl lg:text-4xl font-bold tracking-tight text-brand-cocoa/70 hover:text-brand-cocoa transition-colors">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
