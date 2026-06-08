import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-2">Settings</h1>
      <p className="text-sm text-neutral-600 mb-6">
        Account information and security.
      </p>

      <div className="bg-white rounded-2xl border p-6 shadow-sm mb-5 max-w-md">
        <h2 className="text-lg font-bold mb-3">Account</h2>
        <dl className="text-sm space-y-2">
          <div className="grid grid-cols-[80px_1fr] gap-2">
            <dt className="text-neutral-500">Name</dt>
            <dd className="font-semibold">{session?.user?.name ?? "—"}</dd>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-2">
            <dt className="text-neutral-500">Email</dt>
            <dd className="font-semibold">{session?.user?.email ?? "—"}</dd>
          </div>
        </dl>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
