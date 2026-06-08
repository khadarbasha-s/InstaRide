import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const PatchSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  brand: z.string().trim().min(2).optional(),
  pricePerDay: z.number().int().min(500).max(50000).optional(),
  minBookingDays: z.number().int().min(1).optional(),
  shortDesc: z.string().trim().max(500).optional(),
  longDesc: z.string().trim().optional(),
  rentalTerms: z.string().trim().optional(),
  isAvailable: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewsCount: z.number().int().min(0).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  try {
    const car = await prisma.car.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ ok: true, car });
  } catch (e) {
    console.error("[admin/cars PATCH]", e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
