"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Car,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cars", label: "Cars", icon: Car },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminNav({ name }: { name: string }) {
  const pathname = usePathname();
  return (
    <aside className="bg-brand-black text-white w-full lg:w-64 lg:min-h-screen p-4 lg:p-6 flex lg:flex-col flex-row items-center lg:items-stretch gap-3 lg:gap-1">
      <div className="hidden lg:flex items-center gap-2 mb-6 px-2">
        <div className="h-9 w-9 rounded-full bg-brand-yellow grid place-items-center font-extrabold text-brand-black">
          F
        </div>
        <span className="text-base font-extrabold tracking-tight">
          Fast<span className="text-brand-yellow">Rental</span>
        </span>
      </div>
      <div className="lg:hidden flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-brand-yellow grid place-items-center font-extrabold text-brand-black text-sm">
          F
        </div>
      </div>
      <nav className="flex lg:flex-col gap-1 flex-1 overflow-x-auto">
        {ITEMS.map((it) => {
          const active =
            pathname === it.href || pathname.startsWith(`${it.href}/`);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap",
                active
                  ? "bg-brand-yellow text-brand-black"
                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
              )}
            >
              <it.icon className="h-4 w-4" />
              <span className="hidden lg:inline">{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="lg:mt-auto lg:pt-4 lg:border-t lg:border-neutral-800">
        <div className="hidden lg:block text-xs text-neutral-400 mb-2 px-2">
          Signed in as
        </div>
        <div className="hidden lg:block text-sm font-semibold mb-3 px-2">
          {name}
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition w-full"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden lg:inline">Logout</span>
        </button>
      </div>
    </aside>
  );
}
