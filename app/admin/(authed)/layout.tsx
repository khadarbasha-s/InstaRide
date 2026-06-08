import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { SessionProvider } from "@/components/admin/SessionProvider";

export const metadata = {
  title: "Admin — FastRental",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Note: middleware already enforces auth, but double-check server-side.
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/admin/login");

  const name = session.user.name || session.user.email || "Admin";

  return (
    <SessionProvider>
      <div className="min-h-screen bg-brand-gray-bg lg:flex">
        <AdminNav name={name} />
        <div className="flex-1 min-w-0">
          <main className="p-4 lg:p-8 max-w-7xl">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
