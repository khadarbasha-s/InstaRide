import Link from "next/link";
import { ArrowRight, Headphones, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  {
    icon: Zap,
    title: "Lightning pickup",
    desc: "Ten-minute hand-over at your hotel. No long queues, no paperwork drama.",
  },
  {
    icon: Sparkles,
    title: "Honest pricing",
    desc: "Daily rate is the price. No surge, no surprise fees. The deposit comes back.",
  },
  {
    icon: Headphones,
    title: "Always reachable",
    desc: "On-call support 24×7 for active rentals. Bookings answered within thirty minutes.",
  },
];

export function WhyRideWithUs() {
  return (
    <section className="py-20 lg:py-28 bg-brand-cream-deep">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
          {/* Left intro */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="inline-block text-xs font-bold tracking-[0.25em] text-brand-terracotta uppercase mb-3">
                Why us
              </span>
              <h2 className="text-brand-cocoa mb-5">
                We act like a friend who happens to{" "}
                <span className="serif-italic text-brand-terracotta">own cars</span>.
              </h2>
              <p className="text-lg text-brand-cocoa-muted leading-relaxed mb-7">
                Not a faceless aggregator. Not a discount-driven race-to-the-bottom.
                Three things have kept customers coming back for almost two decades.
              </p>
              <Button asChild variant="primary" size="lg" className="group">
                <Link href="/goa/self-drive-car-rental-goa">
                  Start with the Goa fleet
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* Right items */}
          <div className="space-y-4">
            {ITEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <article className="bg-brand-cream rounded-3xl p-7 lg:p-8 border border-brand-cocoa/5 card-lift">
                  <div className="flex items-start gap-5">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-brand-mustard grid place-items-center">
                      <item.icon className="h-5 w-5 text-brand-cocoa" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-brand-cocoa mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-brand-cocoa-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
