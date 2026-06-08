"use client";
import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "HATCHBACK", label: "Hatchback" },
  { value: "SEDAN", label: "Sedan" },
  { value: "SUV", label: "SUV" },
  { value: "MPV", label: "MPV" },
  { value: "COMPACT_SUV", label: "Compact SUV" },
  { value: "LUXURY", label: "Luxury" },
  { value: "OFF_ROAD", label: "Off-Road" },
];

const BRANDS = ["Maruti", "Hyundai", "Mahindra", "Toyota", "Kia"];

export function CarFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = React.useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const selectedCats = React.useMemo(
    () => new Set((searchParams.get("category") || "").split(",").filter(Boolean)),
    [searchParams]
  );
  const selectedBrands = React.useMemo(
    () => new Set((searchParams.get("brand") || "").split(",").filter(Boolean)),
    [searchParams]
  );
  const transmission = searchParams.get("transmission") || "";
  const search = searchParams.get("q") || "";
  const maxPrice = Number(searchParams.get("maxPrice") || 6000);

  function toggleSet(
    key: "category" | "brand",
    setRef: Set<string>,
    value: string
  ) {
    const next = new Set(setRef);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    updateParam(key, next.size ? Array.from(next).join(",") : null);
  }

  const activeFiltersCount =
    selectedCats.size +
    selectedBrands.size +
    (transmission ? 1 : 0) +
    (maxPrice !== 6000 ? 1 : 0) +
    (search ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-brand-black">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="text-xs font-semibold text-brand-yellow-600 hover:underline flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" /> Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search-cars">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            id="search-cars"
            type="search"
            placeholder="Search by name or brand…"
            defaultValue={search}
            onChange={(e) => updateParam("q", e.target.value || null)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <Label>Category</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCats.has(cat.value);
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => toggleSet("category", selectedCats, cat.value)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                  active
                    ? "bg-brand-yellow text-brand-black border-brand-yellow"
                    : "bg-white border-neutral-300 text-neutral-700 hover:border-brand-yellow"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-2">
        <Label>Brand</Label>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((brand) => {
            const active = selectedBrands.has(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleSet("brand", selectedBrands, brand)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                  active
                    ? "bg-brand-yellow text-brand-black border-brand-yellow"
                    : "bg-white border-neutral-300 text-neutral-700 hover:border-brand-yellow"
                )}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <Label>Transmission</Label>
        <div className="flex gap-2">
          {["", "MANUAL", "AUTOMATIC"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateParam("transmission", t || null)}
              className={cn(
                "flex-1 px-3 py-2 rounded-lg text-xs font-semibold border transition",
                transmission === t
                  ? "bg-brand-yellow text-brand-black border-brand-yellow"
                  : "bg-white border-neutral-300 text-neutral-700 hover:border-brand-yellow"
              )}
            >
              {t === "" ? "Any" : t === "MANUAL" ? "Manual" : "Automatic"}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Max price / day</Label>
          <Badge variant="muted">₹{maxPrice.toLocaleString()}</Badge>
        </div>
        <Slider
          min={1000}
          max={6000}
          step={500}
          defaultValue={[maxPrice]}
          onValueChange={(v) => updateParam("maxPrice", String(v[0]))}
        />
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => router.replace(pathname, { scroll: false })}
        >
          Reset all filters
        </Button>
      )}
    </div>
  );
}
