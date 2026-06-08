import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "FAQs — Self Drive Car Rental in Goa",
  description:
    "Frequently asked questions about self drive car rental in Goa — documents, deposit, pickup, return, damage policy and more.",
  alternates: { canonical: "/goa/faqs" },
};

const CATEGORY_LABELS: Record<string, string> = {
  general: "General Questions",
  goa: "Goa-Specific",
  booking: "Booking & Payment",
  policy: "Policies",
};

export default async function FaqsPage() {
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });

  const grouped: Record<string, typeof faqs> = {};
  for (const f of faqs) {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category]!.push(f);
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="bg-brand-gray-bg py-10 lg:py-14">
        <div className="container">
          <h1 className="text-brand-black mb-3">Frequently Asked Questions</h1>
          <p className="text-neutral-700 max-w-3xl">
            Everything you need to know about renting a self drive car in Goa
            with FastRental. Still have a question? Call us on{" "}
            <a
              href="tel:+918824583708"
              className="font-bold underline underline-offset-2"
            >
              +91 88245 83708
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="container max-w-3xl">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">
                {CATEGORY_LABELS[cat] ?? cat}
              </h2>
              <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border px-4 sm:px-6">
                {items.map((f) => (
                  <AccordionItem key={f.id} value={f.id}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="leading-relaxed">{f.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
