import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CarEditForm } from "@/components/admin/CarEditForm";

export const dynamic = "force-dynamic";

export default async function AdminCarEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();

  return (
    <div>
      <Link
        href="/admin/cars"
        className="inline-flex items-center text-sm text-neutral-600 hover:text-brand-black mb-3"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to cars
      </Link>
      <h1 className="text-2xl lg:text-3xl font-bold mb-1">Edit Car</h1>
      <p className="text-sm text-neutral-600 mb-6">
        {car.name} · slug <code className="text-xs">{car.slug}</code>
      </p>
      <CarEditForm
        car={{
          id: car.id,
          name: car.name,
          brand: car.brand,
          pricePerDay: car.pricePerDay,
          minBookingDays: car.minBookingDays,
          shortDesc: car.shortDesc,
          longDesc: car.longDesc,
          rentalTerms: car.rentalTerms,
          isAvailable: car.isAvailable,
          isFeatured: car.isFeatured,
          rating: car.rating,
          reviewsCount: car.reviewsCount,
        }}
      />
    </div>
  );
}
