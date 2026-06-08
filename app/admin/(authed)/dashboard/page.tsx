import Link from "next/link";
import { Car, FileText, Inbox, Star } from "lucide-react";
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

export default async function AdminDashboard() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalCars, availableCars, totalLeads, monthLeads, totalBlogs, recentLeads] =
    await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { isAvailable: true } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.blog.count({ where: { isPublished: true } }),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { car: { select: { name: true, slug: true } } },
      }),
    ]);

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Car} label="Available Cars" value={`${availableCars}/${totalCars}`} />
        <StatCard icon={Inbox} label="Total Leads" value={totalLeads} />
        <StatCard icon={Star} label="This Month's Leads" value={monthLeads} highlight />
        <StatCard icon={FileText} label="Published Blogs" value={totalBlogs} />
      </div>

      <section className="bg-white rounded-2xl border shadow-sm">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-bold">Recent Leads</h2>
          <Link
            href="/admin/leads"
            className="text-sm text-brand-yellow-600 font-semibold hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          {recentLeads.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              No leads yet. Share your homepage with potential customers.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-brand-gray-bg text-xs uppercase tracking-wider text-neutral-600">
                <tr>
                  <th className="text-left px-5 py-3">Date</th>
                  <th className="text-left px-5 py-3">Name</th>
                  <th className="text-left px-5 py-3">Phone</th>
                  <th className="text-left px-5 py-3">Car</th>
                  <th className="text-left px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-brand-gray-bg/60">
                    <td className="px-5 py-3 text-neutral-600 text-xs">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-semibold text-brand-black hover:text-brand-yellow-600"
                      >
                        {lead.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-neutral-700">{lead.phone}</td>
                    <td className="px-5 py-3 text-neutral-700">
                      {lead.car?.name ?? "—"}
                    </td>
                    <td className="px-5 py-3">
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
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border p-5 shadow-sm ${highlight ? "border-brand-yellow" : ""}`}
    >
      <div className={`h-10 w-10 rounded-xl ${highlight ? "bg-brand-yellow" : "bg-brand-gray-bg"} grid place-items-center mb-3`}>
        <Icon className="h-5 w-5 text-brand-black" />
      </div>
      <div className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-2xl font-extrabold text-brand-black">{value}</div>
    </div>
  );
}
