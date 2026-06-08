import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeadCreateSchema } from "@/lib/validations";
import { sendLeadEmails } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        pickupDate: data.pickupDate ?? null,
        returnDate: data.returnDate ?? null,
        carId: data.carId || null,
        locationName: data.locationName || null,
        message: data.message || null,
        source: data.source,
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
      },
    });

    // Fire-and-forget email (don't block response on email failure).
    sendLeadEmails({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      carName: data.carName ?? null,
      locationName: lead.locationName,
      message: lead.message,
      pickupDate: lead.pickupDate,
      returnDate: lead.returnDate,
      source: lead.source,
      createdAt: lead.createdAt,
    }).catch((err) => console.error("[leads] email error:", err));

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[leads] db error:", err);
    return NextResponse.json(
      { error: "Failed to save inquiry. Please try calling us." },
      { status: 500 }
    );
  }
}
