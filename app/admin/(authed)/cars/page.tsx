import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CarToggleRow } from "@/components/admin/CarToggleRow";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminCarsPage() {
  const cars = await prisma.car.findMany({
    include: { images: { where: { isPrimary: true }, take: 1 } },
    orderBy: { sortOrder: "asc" },
  });

  const rows = cars.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    brand: c.brand,
    category: c.category,
    pricePerDay: c.pricePerDay,
    isAvailable: c.isAvailable,
    isFeatured: c.isFeatured,
    image: c.images[0]?.url ?? null,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-1">Cars</h1>
          <p className="text-sm text-neutral-600">
            Toggle availability/featured inline. Click the pencil icon to edit
            details.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/goa/self-drive-car-rental-goa" target="_blank">
            View Public Listing →
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-brand-gray-bg text-xs uppercase tracking-wider text-neutral-600">
              <tr>
                <th className="text-left px-3 py-3">Photo</th>
                <th className="text-left px-3 py-3">Name</th>
                <th className="text-left px-3 py-3">Category</th>
                <th className="text-left px-3 py-3">Price/day</th>
                <th className="text-left px-3 py-3">Available</th>
                <th className="text-left px-3 py-3">Featured</th>
                <th className="text-right px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <CarToggleRow key={row.id} car={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
