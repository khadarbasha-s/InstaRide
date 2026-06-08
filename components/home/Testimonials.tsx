import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface Testimonial {
  quote: string;
  name: string;
  trip: string;
  initials: string;
  bgClass: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Picked up the Thar at our villa in Anjuna at 6 AM and drove all the way to Arambol for sunrise. The whole thing was so smooth I keep telling my friends about it.",
    name: "Priya Menon",
    trip: "Bengaluru → Goa, 5 days",
    initials: "PM",
    bgClass: "bg-brand-mustard",
  },
  {
    quote:
      "Their team in Jaipur dropped a CNG i20 at our hotel and had us on the road in twenty minutes. Saved about ₹6,000 on what taxis would have cost.",
    name: "Rohan Sharma",
    trip: "Delhi → Jaipur, 3 days",
    initials: "RS",
    bgClass: "bg-brand-sage-deep text-white",
  },
  {
    quote:
      "We needed a 7-seater on short notice for a Chandigarh-Shimla family trip. They sorted an Innova within an hour. Genuinely impressed.",
    name: "Anjali Kapoor",
    trip: "Chandigarh → Shimla, 4 days",
    initials: "AK",
    bgClass: "bg-brand-terracotta text-white",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-brand-cream-deep">
      <div className="container">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 mb-14 items-end">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.25em] text-brand-terracotta uppercase mb-3">
                Word of mouth
              </span>
              <h2 className="text-brand-cocoa">
                10,000+ trips.
                <br />
                <span className="serif-italic text-brand-terracotta">Zero awkward returns</span>.
              </h2>
            </div>
            <p className="text-lg text-brand-cocoa-muted leading-relaxed max-w-xl lg:justify-self-end">
              Most of our customers come back. The other 10% recommend us to
              friends. Here&apos;s a few in their own words.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <article className="bg-white rounded-3xl p-7 lg:p-8 h-full flex flex-col card-lift border border-brand-cocoa/5 relative">
                <Quote
                  className="absolute top-6 right-6 h-7 w-7 text-brand-mustard/40"
                  strokeWidth={2.5}
                />
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-brand-mustard text-brand-mustard"
                    />
                  ))}
                </div>
                <blockquote className="text-brand-cocoa text-lg leading-relaxed mb-7 flex-grow">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-brand-cocoa/8">
                  <div
                    className={`h-11 w-11 rounded-full ${t.bgClass} grid place-items-center font-bold text-sm tracking-tight shrink-0`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-brand-cocoa text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-brand-cocoa-muted">{t.trip}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
