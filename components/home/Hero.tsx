import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

const PRESS = [
  "Conde Nast Traveller",
  "Lonely Planet",
  "Goa Tourism",
  "Travel + Leisure",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream bg-grain">
      {/* Soft warm spotlight */}
      <div className="absolute inset-0 bg-spotlight-warm pointer-events-none" />

      <div className="container relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-14 items-center">
          {/* Left */}
          <div className="relative z-10">
            <Reveal>
              <div className="flex items-center gap-3 mb-7">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-cocoa-muted">
                  <span className="h-px w-8 bg-brand-cocoa-muted/40" />
                  Est. 2008
                </span>
                <span className="text-brand-cocoa-muted">·</span>
                <span className="text-xs font-semibold text-brand-cocoa-muted">
                  India&apos;s most-loved self drive fleet
                </span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="text-brand-cocoa mb-6">
                Drive the{" "}
                <span className="serif-italic text-brand-terracotta">scenic route</span>.
                <br />
                Skip the taxi line.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-lg text-brand-cocoa-muted mb-8 max-w-xl leading-relaxed">
                Hand-picked cars across Goa, Jaipur &amp; Chandigarh. Unlimited
                kilometres. Hotel pickup. Paperwork done in ten minutes — so the
                trip can start when you say so.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" variant="primary" className="group">
                  <Link href="/goa/self-drive-car-rental-goa">
                    Browse the fleet
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="#how-it-works">How it works</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                <Stat
                  value={<AnimatedCounter to={10} suffix="K+" />}
                  label="Trips done"
                />
                <Stat
                  value={<AnimatedCounter to={72} />}
                  label="Cars in fleet"
                />
                <Stat
                  value={
                    <span className="inline-flex items-baseline gap-1">
                      <AnimatedCounter to={4.8} decimals={1} />
                      <Star className="h-5 w-5 fill-brand-mustard text-brand-mustard" />
                    </span>
                  }
                  label="2,140 reviews"
                />
              </dl>
            </Reveal>
          </div>

          {/* Right — hero image with editorial framing */}
          <Reveal delay={120}>
            <div className="relative">
              {/* Decorative warm peach panel behind */}
              <div className="absolute -inset-5 lg:-inset-8 bg-brand-peach/60 rounded-[2rem] -rotate-2 -z-10" />

              <div className="relative aspect-[4/3] lg:aspect-[5/4] w-full rounded-[1.5rem] overflow-hidden shadow-2xl animate-float">
                <Image
                  src="/hero/hero-thar.jpg"
                  alt="Mahindra Thar — Self drive car rental in Goa"
                  fill
                  priority
                  sizes="(min-width:1024px) 56vw, 100vw"
                  className="object-cover object-center animate-ken-burns"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-cocoa/40 to-transparent" />
              </div>

              {/* Sticker — "from ₹1,500/day" */}
              <div className="absolute -bottom-4 -left-3 lg:-left-8 bg-brand-mustard rounded-2xl px-5 py-3 shadow-xl rotate-stamp-1 animate-float-slow">
                <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-brand-cocoa/80">
                  Starting at
                </div>
                <div className="text-2xl font-bold text-brand-cocoa leading-none mt-0.5">
                  ₹1,500
                  <span className="text-sm font-medium text-brand-cocoa/70">/day</span>
                </div>
              </div>

              {/* Sticker — reviews */}
              <div className="absolute -top-3 -right-2 lg:-right-6 bg-white rounded-2xl px-4 py-3 shadow-xl rotate-stamp-2 border border-brand-cocoa/5">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-brand-mustard text-brand-mustard"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-brand-cocoa">4.8</span>
                </div>
                <div className="text-[10px] text-brand-cocoa-muted mt-0.5">
                  Trusted by 10,000+
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Press strip */}
        <Reveal delay={400}>
          <div className="mt-16 lg:mt-20 pt-8 border-t border-brand-cocoa/10">
            <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-8 text-brand-cocoa-muted">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                As mentioned in
              </span>
              {PRESS.map((p) => (
                <span
                  key={p}
                  className="serif text-base lg:text-lg font-semibold tracking-tight opacity-60 hover:opacity-100 transition-opacity"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="border-l-2 border-brand-mustard pl-3">
      <dt className="sr-only">{label}</dt>
      <dd className="text-2xl md:text-3xl font-bold text-brand-cocoa leading-none">
        {value}
      </dd>
      <span className="text-xs text-brand-cocoa-muted mt-1.5 block">{label}</span>
    </div>
  );
}
