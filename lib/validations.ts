import { z } from "zod";

export const PhoneSchema = z
  .string()
  .trim()
  .regex(/^(\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian phone number");

export const LeadCreateSchema = z
  .object({
    name: z.string().trim().min(2, "Name is too short").max(80),
    phone: PhoneSchema,
    email: z
      .string()
      .trim()
      .email("Enter a valid email")
      .optional()
      .or(z.literal("")),
    pickupDate: z.coerce.date().optional(),
    returnDate: z.coerce.date().optional(),
    carId: z.string().optional(),
    carName: z.string().optional(),
    locationName: z.string().trim().max(80).optional(),
    message: z.string().trim().max(2000).optional(),
    source: z
      .enum(["CONTACT_FORM", "CAR_DETAIL_FORM", "WHATSAPP_CLICK", "CALL_CLICK"])
      .default("CONTACT_FORM"),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
  })
  .refine(
    (d) => !d.pickupDate || !d.returnDate || d.returnDate > d.pickupDate,
    {
      message: "Return date must be after pickup date",
      path: ["returnDate"],
    }
  );

export type LeadCreateInput = z.infer<typeof LeadCreateSchema>;

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email"),
  phone: PhoneSchema,
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

export const QuickInquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: PhoneSchema,
  pickupDate: z.coerce.date().optional(),
  returnDate: z.coerce.date().optional(),
});

export type QuickInquiryInput = z.infer<typeof QuickInquirySchema>;
