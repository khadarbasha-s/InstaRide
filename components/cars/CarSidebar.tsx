import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/utils";
import { PHONE_TEL, PHONE_DISPLAY, buildWhatsappLink } from "@/lib/whatsapp";
import { QuickInquiryForm } from "@/components/forms/QuickInquiryForm";

interface CarSidebarProps {
  carId: string;
  carName: string;
  pricePerDay: number;
  minBookingDays: number;
  isAvailable: boolean;
}

export function CarSidebar({
  carId,
  carName,
  pricePerDay,
  minBookingDays,
  isAvailable,
}: CarSidebarProps) {
  if (!isAvailable) {
    return (
      <div className="bg-white rounded-2xl border p-6 shadow-md">
        <Badge variant="danger" className="mb-3 text-sm px-3 py-1">
          Fully Booked
        </Badge>
        <p className="text-sm text-neutral-700 mb-4">
          This car is currently unavailable. Browse other options or call us to
          check for cancellations.
        </p>
        <Button asChild variant="primary" className="w-full">
          <Link href="/goa/self-drive-car-rental-goa">Browse Other Cars</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-md overflow-hidden">
      <div className="bg-brand-yellow-50 p-5 border-b">
        <div className="text-xs font-semibold text-neutral-600 mb-1">
          Starting from
        </div>
        <div className="text-3xl font-extrabold text-brand-black leading-none">
          {formatINR(pricePerDay)}
          <span className="text-base font-medium text-neutral-600">/day</span>
        </div>
        <div className="text-xs text-neutral-600 mt-2">
          Minimum {minBookingDays} day booking · Unlimited KMs
        </div>
      </div>

      <div className="p-5 space-y-3">
        <Button asChild variant="call" size="lg" className="w-full">
          <a href={PHONE_TEL} aria-label="Call to book">
            <Phone className="h-4 w-4 mr-2" />
            Call to Book — {PHONE_DISPLAY}
          </a>
        </Button>
        <Button asChild variant="whatsapp" size="lg" className="w-full">
          <a
            href={buildWhatsappLink(carName, "Goa")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp to Book
          </a>
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-neutral-500">or</span>
          </div>
        </div>

        <QuickInquiryForm carId={carId} carName={carName} />
      </div>
    </div>
  );
}
