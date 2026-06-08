import {
  Award,
  Clock,
  HandCoins,
  KeyRound,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = [
  {
    icon: Award,
    title: "Well-kept cars",
    desc: "Serviced before and after every booking. No compromises on safety or comfort.",
  },
  {
    icon: ShieldCheck,
    title: "Sanitised interiors",
    desc: "Deep-cleaned cabin, first-aid kit, and 24×7 roadside assistance included.",
  },
  {
    icon: KeyRound,
    title: "Ten-minute pickup",
    desc: "No paperwork queues. Bring your licence and one ID — we handle the rest.",
  },
  {
    icon: Truck,
    title: "Delivered to you",
    desc: "Hotel, villa, airport — we drop the car where you are.",
  },
  {
    icon: HandCoins,
    title: "Transparent pricing",
    desc: "Daily rate, refundable deposit. No surge fees, no surprise charges.",
  },
  {
    icon: Clock,
    title: "Unlimited kilometres",
    desc: "Drive across the state without watching the odometer.",
  },
];

export function FeaturesBenefits() {
  return (
    <section className="py-20 lg:py-28 bg-brand-sage">
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.25em] text-brand-terracotta uppercase mb-3">
              What you get
            </span>
            <h2 className="text-brand-cocoa">
              Built on what matters when
              <br />
              <span className="serif-italic text-brand-terracotta">you&apos;re on the road</span>.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="group h-full p-7 rounded-3xl bg-brand-cream hover:bg-white transition-colors border border-brand-cocoa/5">
                <div className="h-11 w-11 rounded-full bg-brand-mustard grid place-items-center mb-5 group-hover:rotate-6 transition-transform">
                  <f.icon className="h-5 w-5 text-brand-cocoa" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-brand-cocoa mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-brand-cocoa-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
