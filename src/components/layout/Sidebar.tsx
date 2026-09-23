"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LogOut,
  ShieldCheck,
  Wrench,
  LayoutDashboard,
  ListChecks,
  PlusCircle,
  Bell,
  History,
  UserCircle,
} from "lucide-react";

const NAV_CONFIG = {
  dashboard: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard#requests", label: "My Requests", icon: ListChecks },
    { href: "/dashboard/history", label: "History", icon: History },
    { href: "/services/requests", label: "New Request", icon: PlusCircle },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/requests", label: "Requests", icon: ListChecks },
  ],
} as const;

// Screens designed but not built yet — shown as disabled so the nav matches
// the mockup without linking to pages that don't exist.
const DASHBOARD_SOON_ITEMS = [
  { label: "Notifications", icon: Bell },
  { label: "Profile", icon: UserCircle },
] as const;

type SidebarProps = {
  variant: keyof typeof NAV_CONFIG;
  showProfile?: boolean;
  roleBadge?: string;
};

const Sidebar = ({ variant, showProfile = false, roleBadge }: SidebarProps) => {
  const navItems = NAV_CONFIG[variant];
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    // Index routes ("/dashboard", "/admin") need an exact match so they
    // don't also light up on nested routes like "/dashboard/history".
    if (base === "/" || base === "/dashboard" || base === "/admin") {
      return pathname === base;
    }
    return pathname.startsWith(base);
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-card sticky top-0">
      <Link href="/" className="flex items-center gap-2 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
          <Wrench className="h-4.5 w-4.5" />
        </div>
        <span className="text-xl font-bold text-primary">Fixora</span>
        {roleBadge && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            <ShieldCheck className="h-3 w-3" />
            {roleBadge}
          </span>
        )}
      </Link>

      {showProfile && session?.user && (
        <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl bg-background p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {session.user.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">
              {session.user.name}
            </p>
            <p className="truncate text-xs text-muted">{session.user.email}</p>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href} className="block">
              <motion.div
                whileHover={{ x: active ? 0 : 3 }}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-background hover:text-text"
                }`}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </motion.div>
            </Link>
          );
        })}

        {variant === "dashboard" &&
          DASHBOARD_SOON_ITEMS.map((item) => (
            <div
              key={item.label}
              title="Coming soon"
              className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted/50"
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
              <span className="ml-auto rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold text-muted/70">
                Soon
              </span>
            </div>
          ))}
      </nav>

      <div className="px-4 pb-6">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-error"
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
