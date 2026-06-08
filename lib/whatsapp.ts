const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "918824583708";

export function buildWhatsappLink(carName?: string, city?: string): string {
  const parts = ["Hi, I want to book"];
  if (carName) parts.push(`the ${carName}`);
  if (city) parts.push(`in ${city}`);
  parts.push("for self-drive rental. Please share details.");
  const message = parts.join(" ");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PHONE_TEL = `tel:${process.env.NEXT_PUBLIC_PHONE || "+918824583708"}`;
export const PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 88245 83708";
