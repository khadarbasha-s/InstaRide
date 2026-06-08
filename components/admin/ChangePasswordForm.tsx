"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (next !== confirm) {
      toast.error("New passwords do not match");
      return;
    }
    if (next.length < 10) {
      toast.error("New password must be at least 10 characters");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Password change failed");
      }
      toast.success("Password updated");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl border p-6 shadow-sm space-y-4 max-w-md"
    >
      <h2 className="text-lg font-bold">Change Password</h2>
      <div className="space-y-1">
        <Label htmlFor="current">Current Password</Label>
        <Input
          id="current"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="new">New Password</Label>
        <Input
          id="new"
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          required
          autoComplete="new-password"
          minLength={10}
        />
        <p className="text-xs text-neutral-500">Minimum 10 characters.</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="confirm">Confirm New Password</Label>
        <Input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>
      <Button type="submit" variant="primary" disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
        Update Password
      </Button>
    </form>
  );
}
