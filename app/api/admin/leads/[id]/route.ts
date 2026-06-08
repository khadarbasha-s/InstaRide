import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const PatchSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CONVERTED", "LOST"]).optional(),
  notes: z.string().max(5000).optional(),
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
    const lead = await prisma.lead.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ ok: true, lead });
  } catch (e) {
    console.error("[admin/leads PATCH]", e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
