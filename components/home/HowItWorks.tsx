import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Choose your car",
    text: "Browse the fleet, pick by city and category, and call or WhatsApp us with your dates. We confirm availability within 30 minutes.",
    tone: "mustard" as const,
  },
  {
    n: "02",
    title: "We come to you",
    text: "We deliver the car to your hotel, villa or office anywhere in the city. Paperwork takes ten minutes — bring your licence and one ID.",
    tone: "sage" as const,
  },
  {
    n: "03",
    title: "Drive on your own time",
    text: "Unlimited kilometres, 24×7 roadside assistance, and a refundable deposit. Return when you're ready — same fuel level, same place.",
    tone: "terracotta" as const,
  },
];

const TONE_CLASSES: Record<
  "mustard" | "sage" | "terracotta",
  { panel: string; numberBg: string }
> = {
  mustard: {
    panel: "bg-brand-mustard-50",
    numberBg: "bg-brand-mustard text-brand-cocoa",
  },
  sage: {
    panel: "bg-brand-sage",
    numberBg: "bg-brand-sage-deep text-white",
  },
  terracotta: {
    panel: "bg-brand-peach",
    numberBg: "bg-brand-terracotta text-white",
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 mb-14 items-end">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.25em] text-brand-terracotta uppercase mb-3">
                How it works
              </span>
              <h2 className="text-brand-cocoa">
                Three steps,
                <br />
                <span className="serif-italic text-brand-terracotta">no hassle</span>.
              </h2>
            </div>
            <p className="text-lg text-brand-cocoa-muted leading-relaxed max-w-xl lg:justify-self-end">
              We&apos;ve simplified self-drive rentals to the absolute minimum.
              No queues, no hidden charges, no surprises. Just you, the car,
              and the road.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
          {STEPS.map((step, i) => {
            const cls = TONE_CLASSES[step.tone];
            return (
              <Reveal key={step.n} delay={i * 120}>
                <article className={`relative h-full ${cls.panel} rounded-3xl p-7 lg:p-8 overflow-hidden`}>
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className={`serif text-base font-bold tracking-tighter ${cls.numberBg} h-12 w-12 rounded-full grid place-items-center`}
                    >
                      {step.n}
                    </span>
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-cocoa/40">
                      Step
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-cocoa mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-brand-cocoa-muted leading-relaxed">
                    {step.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
