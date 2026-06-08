"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Car = {
  id: string;
  name: string;
  brand: string;
  pricePerDay: number;
  minBookingDays: number;
  shortDesc: string;
  longDesc: string;
  rentalTerms: string;
  isAvailable: boolean;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
};

export function CarEditForm({ car }: { car: Car }) {
  const router = useRouter();
  const [form, setForm] = useState(car);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof Car>(key: K, value: Car[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/cars/${form.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          brand: form.brand,
          pricePerDay: Number(form.pricePerDay),
          minBookingDays: Number(form.minBookingDays),
          shortDesc: form.shortDesc,
          longDesc: form.longDesc,
          rentalTerms: form.rentalTerms,
          isAvailable: form.isAvailable,
          isFeatured: form.isFeatured,
          rating: Number(form.rating),
          reviewsCount: Number(form.reviewsCount),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Update failed");
      }
      toast.success("Car updated");
      router.push("/admin/cars");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-white rounded-2xl border p-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="price">Price / day (₹)</Label>
          <Input
            id="price"
            type="number"
            value={form.pricePerDay}
            onChange={(e) => update("pricePerDay", Number(e.target.value))}
            required
            min={500}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="minBooking">Min. booking (days)</Label>
          <Input
            id="minBooking"
            type="number"
            value={form.minBookingDays}
            onChange={(e) => update("minBookingDays", Number(e.target.value))}
            min={1}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            value={form.rating}
            onChange={(e) => update("rating", Number(e.target.value))}
            min={0}
            max={5}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="shortDesc">Short description</Label>
        <Textarea
          id="shortDesc"
          rows={2}
          value={form.shortDesc}
          onChange={(e) => update("shortDesc", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="longDesc">Long description</Label>
        <Textarea
          id="longDesc"
          rows={6}
          value={form.longDesc}
          onChange={(e) => update("longDesc", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="terms">Rental terms</Label>
        <Textarea
          id="terms"
          rows={6}
          value={form.rentalTerms}
          onChange={(e) => update("rentalTerms", e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isAvailable}
            onChange={(e) => update("isAvailable", e.target.checked)}
            className="h-4 w-4 accent-brand-yellow"
          />
          <span className="text-sm font-medium">Available for booking</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => update("isFeatured", e.target.checked)}
            className="h-4 w-4 accent-brand-yellow"
          />
          <span className="text-sm font-medium">Featured on homepage</span>
        </label>
      </div>

      <div className="flex gap-3 pt-3 border-t">
        <Button type="submit" variant="primary" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Save Changes
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push("/admin/cars")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
