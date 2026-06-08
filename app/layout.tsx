import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/data/contact";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFC107",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Self Drive Car Rental in Goa, Jaipur & Chandigarh`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "India's trusted self drive car rental. Hatchbacks, SUVs, Thar & luxury cars. Pickup & drop, unlimited KMs, no hidden charges. Book on call or WhatsApp.",
  keywords: [
    "self drive car rental",
    "car rental goa",
    "thar rental goa",
    "rent a car in goa",
    "fastrental",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Self Drive Car Rental`,
    description:
      "Rent self drive cars in Goa, Jaipur & Chandigarh. Hatchbacks, SUVs, Thar & luxury cars. Unlimited KMs, no hidden charges.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Self Drive Car Rental`,
    description: "Self drive cars across India. Book on call or WhatsApp.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-brand-cream text-brand-cocoa antialiased">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
