"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormSchema, type ContactFormInput } from "@/lib/validations";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInput>({ resolver: zodResolver(ContactFormSchema) });

  async function onSubmit(data: ContactFormInput) {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "CONTACT_FORM" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }
      toast.success("Thanks! We'll get back to you within 30 minutes.");
      reset();
      setSubmitted(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (submitted) {
    return (
      <div className="bg-success/5 border border-success/20 rounded-2xl p-8 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-success/15 grid place-items-center mb-3">
          <span className="text-success text-2xl">✓</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Message sent</h3>
        <p className="text-neutral-700">
          We&apos;ve received your inquiry and will get back to you shortly. For
          instant help, call us on +91 88245 83708.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border rounded-2xl p-6 lg:p-8 shadow-md space-y-4"
    >
      <h3 className="text-2xl font-bold mb-2">Send us a message</h3>
      <p className="text-sm text-neutral-600 mb-4">
        We&apos;ll get back to you within 30 minutes during business hours.
      </p>

      <div className="space-y-1">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} placeholder="John Doe" />
        {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
          {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" {...register("phone")} placeholder="+91 9876543210" />
          {errors.phone && <p className="text-xs text-danger">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="Tell us about your trip dates, car preference and any questions…"
        />
        {errors.message && <p className="text-xs text-danger">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
        Send Message
      </Button>
    </form>
  );
}
