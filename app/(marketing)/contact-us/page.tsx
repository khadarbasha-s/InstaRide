import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/data/contact";
import { buildWhatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with FastRental for self drive car rental bookings in Goa, Jaipur and Chandigarh. Call, WhatsApp or send a message.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-gray-bg py-10 lg:py-14">
        <div className="container">
          <h1 className="text-brand-black mb-3">Contact Us</h1>
          <p className="text-neutral-700 max-w-2xl">
            Have a question, want to check availability, or ready to book?
            We&apos;re here to help — call, WhatsApp, or send us a message.
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="container grid lg:grid-cols-[1fr_1.4fr] gap-10">
          {/* Info */}
          <div className="space-y-5">
            <InfoCard
              icon={Phone}
              label="Call us"
              value={CONTACT.phoneDisplay}
              href={`tel:${CONTACT.phoneTel}`}
              note={CONTACT.hours}
            />
            <InfoCard
              icon={MessageCircle}
              label="WhatsApp"
              value={CONTACT.phoneDisplay}
              href={buildWhatsappLink()}
              note="Get instant replies"
            />
            <InfoCard
              icon={Mail}
              label="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
            <div className="bg-white border rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-yellow grid place-items-center shrink-0">
                  <MapPin className="h-5 w-5 text-brand-black" />
                </div>
                <div>
                  <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">
                    Office
                  </div>
                  <div className="font-bold text-brand-black">
                    {CONTACT.address.line1}
                  </div>
                  <div className="text-sm text-neutral-700">
                    {CONTACT.address.locality}, {CONTACT.address.city}{" "}
                    {CONTACT.address.pincode}
                  </div>
                  <div className="text-sm text-neutral-700">
                    {CONTACT.address.country}
                  </div>
                  <div className="text-xs text-neutral-500 mt-2">
                    {CONTACT.corporate.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  href,
  note,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  note?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="bg-white border rounded-2xl p-5 hover:shadow-md transition flex items-start gap-3"
    >
      <div className="h-10 w-10 rounded-xl bg-brand-yellow grid place-items-center shrink-0">
        <Icon className="h-5 w-5 text-brand-black" />
      </div>
      <div>
        <div className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-1">
          {label}
        </div>
        <div className="font-bold text-brand-black">{value}</div>
        {note && <div className="text-xs text-neutral-500 mt-1">{note}</div>}
      </div>
    </a>
  );
}
