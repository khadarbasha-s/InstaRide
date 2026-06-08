import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LeadEditor } from "@/components/admin/LeadEditor";

export const dynamic = "force-dynamic";

const SOURCE_LABELS: Record<string, string> = {
  CONTACT_FORM: "Contact Form",
  CAR_DETAIL_FORM: "Car Detail Page",
  WHATSAPP_CLICK: "WhatsApp click",
  CALL_CLICK: "Call click",
};

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { car: { select: { name: true, slug: true } } },
  });
  if (!lead) notFound();

  const rows: [string, React.ReactNode][] = [
    ["Submitted", `${formatDate(lead.createdAt)} at ${lead.createdAt.toLocaleTimeString("en-IN")}`],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "—"],
    [
      "Car",
      lead.car ? (
        <Link
          href={`/rental-car/${lead.car.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-yellow-600 hover:underline"
        >
          {lead.car.name}
        </Link>
      ) : (
        "—"
      ),
    ],
    ["Location", lead.locationName || "—"],
    [
      "Pickup",
      lead.pickupDate ? formatDate(lead.pickupDate) : "—",
    ],
    [
      "Return",
      lead.returnDate ? formatDate(lead.returnDate) : "—",
    ],
    ["Source", SOURCE_LABELS[lead.source] ?? lead.source],
    ["Message", lead.message || "—"],
  ];

  return (
    <div>
      <Link
        href="/admin/leads"
        className="inline-flex items-center text-sm text-neutral-600 hover:text-brand-black mb-3"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to leads
      </Link>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold">{lead.name}</h1>
        <Badge variant="muted">{lead.status}</Badge>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Inquiry Details</h2>
          <dl className="divide-y">
            {rows.map(([k, v]) => (
              <div
                key={k}
                className="py-3 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1 sm:gap-4"
              >
                <dt className="text-xs uppercase tracking-wider text-neutral-500 font-semibold pt-1">
                  {k}
                </dt>
                <dd className="text-sm text-brand-black whitespace-pre-wrap">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <LeadEditor
          leadId={lead.id}
          initialStatus={lead.status}
          initialNotes={lead.notes || ""}
          phone={lead.phone}
          carName={lead.car?.name}
        />
      </div>
    </div>
  );
}
