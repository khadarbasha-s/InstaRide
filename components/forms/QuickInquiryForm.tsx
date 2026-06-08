"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuickInquirySchema, type QuickInquiryInput } from "@/lib/validations";

interface QuickInquiryFormProps {
  carId: string;
  carName: string;
}

export function QuickInquiryForm({ carId, carName }: QuickInquiryFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuickInquiryInput>({
    resolver: zodResolver(QuickInquirySchema),
  });

  async function onSubmit(data: QuickInquiryInput) {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          carId,
          carName,
          source: "CAR_DETAIL_FORM",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }
      toast.success("Got it! We'll call you within 30 minutes.");
      reset();
      setSubmitted(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="mx-auto h-12 w-12 rounded-full bg-success/10 grid place-items-center mb-3">
          <span className="text-success text-xl">✓</span>
        </div>
        <h4 className="font-bold text-brand-black mb-1">Inquiry sent</h4>
        <p className="text-sm text-neutral-600">
          We&apos;ll call you within 30 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="qi-name">Your Name</Label>
        <Input id="qi-name" {...register("name")} placeholder="John Doe" />
        {errors.name && (
          <p className="text-xs text-danger">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="qi-phone">Phone Number</Label>
        <Input
          id="qi-phone"
          {...register("phone")}
          placeholder="+91 9876543210"
          type="tel"
        />
        {errors.phone && (
          <p className="text-xs text-danger">{errors.phone.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label htmlFor="qi-pickup" className="text-xs">
            Pickup
          </Label>
          <Input
            id="qi-pickup"
            type="date"
            {...register("pickupDate")}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="qi-return" className="text-xs">
            Return
          </Label>
          <Input
            id="qi-return"
            type="date"
            {...register("returnDate")}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
      {errors.returnDate && (
        <p className="text-xs text-danger">{errors.returnDate.message}</p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : null}
        Request Callback
      </Button>
      <p className="text-[11px] text-center text-neutral-500">
        By submitting, you agree to our{" "}
        <a href="/privacy-policy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
