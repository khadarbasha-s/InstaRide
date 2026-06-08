"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Pencil, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR, titleCase } from "@/lib/utils";

type Row = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  pricePerDay: number;
  isAvailable: boolean;
  isFeatured: boolean;
  image: string | null;
};

export function CarToggleRow({ car }: { car: Row }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [available, setAvailable] = useState(car.isAvailable);
  const [featured, setFeatured] = useState(car.isFeatured);

  async function update(patch: { isAvailable?: boolean; isFeatured?: boolean }) {
    try {
      const res = await fetch(`/api/admin/cars/${car.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Updated");
      startTransition(() => router.refresh());
    } catch {
      toast.error("Failed to update");
      // revert local state
      if (patch.isAvailable !== undefined) setAvailable(car.isAvailable);
      if (patch.isFeatured !== undefined) setFeatured(car.isFeatured);
    }
  }

  return (
    <tr className="hover:bg-brand-gray-bg/60">
      <td className="px-3 py-2">
        {car.image ? (
          <div className="relative h-12 w-16 rounded overflow-hidden bg-neutral-100">
            <Image src={car.image} alt={car.name} fill sizes="64px" className="object-cover" />
          </div>
        ) : (
          <div className="h-12 w-16 rounded bg-neutral-100" />
        )}
      </td>
      <td className="px-3 py-2">
        <div className="font-semibold text-sm">{car.name}</div>
        <div className="text-xs text-neutral-500">{car.brand}</div>
      </td>
      <td className="px-3 py-2">
        <Badge variant="muted">{titleCase(car.category)}</Badge>
      </td>
      <td className="px-3 py-2 font-semibold text-sm">
        {formatINR(car.pricePerDay)}
      </td>
      <td className="px-3 py-2">
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            const next = !available;
            setAvailable(next);
            void update({ isAvailable: next });
          }}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${available ? "bg-success" : "bg-neutral-300"}`}
          aria-label="Toggle availability"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${available ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </button>
      </td>
      <td className="px-3 py-2">
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            const next = !featured;
            setFeatured(next);
            void update({ isFeatured: next });
          }}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${featured ? "bg-brand-yellow" : "bg-neutral-300"}`}
          aria-label="Toggle featured"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${featured ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </button>
      </td>
      <td className="px-3 py-2">
        <div className="flex gap-1 justify-end">
          <Button asChild size="icon" variant="ghost" title="Edit">
            <Link href={`/admin/cars/${car.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost" title="View public page">
            <Link
              href={`/rental-car/${car.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}
