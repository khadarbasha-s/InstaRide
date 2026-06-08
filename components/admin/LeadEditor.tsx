"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MessageCircle, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const STATUSES = ["NEW", "CONTACTED", "CONVERTED", "LOST"] as const;

interface LeadEditorProps {
  leadId: string;
  initialStatus: string;
  initialNotes: string;
  phone: string;
  carName?: string;
}

export function LeadEditor({
  leadId,
  initialStatus,
  initialNotes,
  phone,
  carName,
}: LeadEditorProps) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);

  async function save(patch: { status?: string; notes?: string }) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Saved");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const waHref = `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    `Hi, this is FastRental${carName ? ` regarding your inquiry about the ${carName}` : ""}. How can we help?`
  )}`;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border p-5">
        <Label className="mb-2">Status</Label>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              disabled={saving}
              onClick={() => {
                setStatus(s);
                void save({ status: s });
              }}
              className={`px-3 py-2 rounded-full text-xs font-semibold border transition ${
                status === s
                  ? "bg-brand-yellow text-brand-black border-brand-yellow"
                  : "bg-white border-neutral-300 hover:border-brand-yellow"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-5">
        <Label htmlFor="notes" className="mb-2">
          Internal Notes
        </Label>
        <Textarea
          id="notes"
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => {
            if (notes !== initialNotes) void save({ notes });
          }}
          placeholder="Add internal notes about this lead…"
        />
        <p className="text-xs text-neutral-500 mt-2">
          Saves automatically when you click outside.
        </p>
      </div>

      <div className="bg-white rounded-2xl border p-5 space-y-3">
        <Label>Quick Actions</Label>
        <Button asChild variant="call" className="w-full">
          <a href={`tel:${phone}`}>
            <Phone className="h-4 w-4 mr-2" />
            Call {phone}
          </a>
        </Button>
        <Button asChild variant="whatsapp" className="w-full">
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4 mr-2" />
            Open WhatsApp
          </a>
        </Button>
      </div>
      {saving && (
        <div className="text-xs text-neutral-500 flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Saving…
        </div>
      )}
    </div>
  );
}
