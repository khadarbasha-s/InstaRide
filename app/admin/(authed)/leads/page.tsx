import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const STATUS_VARIANTS: Record<string, "default" | "success" | "danger" | "muted"> = {
  NEW: "default",
  CONTACTED: "muted",
  CONVERTED: "success",
  LOST: "danger",
};

const SOURCE_LABELS: Record<string, string> = {
  CONTACT_FORM: "Contact Form",
  CAR_DETAIL_FORM: "Car Detail",
  WHATSAPP_CLICK: "WhatsApp",
  CALL_CLICK: "Call",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const status = typeof sp.status === "string" ? sp.status : undefined;

  const leads = await prisma.lead.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: { car: { select: { name: true } } },
    take: 100,
  });

  const counts = await prisma.lead.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const total = await prisma.lead.count();
  const countMap: Record<string, number> = {};
  for (const c of counts) countMap[c.status] = c._count._all;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Leads</h1>
          <p className="text-sm text-neutral-600">
            All customer inquiries from the website. Click a row to update status
            and notes.
          </p>
        </div>
      </div>

      {/* Status filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        <FilterChip href="/admin/leads" label={`All (${total})`} active={!status} />
        {(["NEW", "CONTACTED", "CONVERTED", "LOST"] as const).map((s) => (
          <FilterChip
            key={s}
            href={`/admin/leads?status=${s}`}
            label={`${s} (${countMap[s] ?? 0})`}
            active={status === s}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {leads.length === 0 ? (
            <div className="p-12 text-center text-neutral-500">
              No leads match this filter.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-brand-gray-bg text-xs uppercase tracking-wider text-neutral-600">
                <tr>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Phone</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Car</th>
                  <th className="text-left px-4 py-3">Source</th>
                  <th className="text-left px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-brand-gray-bg/60 cursor-pointer"
                  >
                    <td className="px-4 py-3 text-xs text-neutral-500">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-semibold text-brand-black hover:text-brand-yellow-600"
                      >
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`tel:${lead.phone}`} className="text-neutral-700 hover:underline">
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 text-xs">
                      {lead.email || "—"}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      {lead.car?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="muted">
                        {SOURCE_LABELS[lead.source] ?? lead.source}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANTS[lead.status] ?? "muted"}>
                        {lead.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
        active
          ? "bg-brand-yellow text-brand-black border-brand-yellow"
          : "bg-white border-neutral-300 text-neutral-700 hover:border-brand-yellow"
      }`}
    >
      {label}
    </Link>
  );
}
