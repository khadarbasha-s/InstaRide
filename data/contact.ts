export const CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "fastrentalindia@gmail.com",
  phoneTel: process.env.NEXT_PUBLIC_PHONE || "+918824583708",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+91 88245 83708",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "918824583708",
  address: {
    line1: "Office 12, Beach Road",
    locality: "Calangute",
    city: "Goa",
    state: "Goa",
    pincode: "403516",
    country: "India",
  },
  hours: "Mon–Sun, 7:00 AM – 11:00 PM",
  corporate: {
    name: "Fastrental India Private Limited",
    gst: "30ABCDE1234F1Z5",
  },
} as const;

export const SITE_NAME = "FastRental";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
