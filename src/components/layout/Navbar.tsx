"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Menu,
  X,
  Wrench,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = session?.user?.role === "ADMIN";
  const dashboardHref = isAdmin ? "/admin" : "/dashboard";

  const links = isAdmin
    ? []
    : [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        // { href: "/services/requests", label: "Request Service" },
      ];

  const isActive = (href: string) => pathname === href;

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={isAdmin ? "/admin" : "/"}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
            <Wrench className="h-4.5 w-4.5" />
          </div>
          <span className="text-xl font-bold text-primary">Fixora</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-background text-primary"
                  : "text-muted hover:bg-background hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-background" />
          ) : session ? (
            <>
              <Link
                href={dashboardHref}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-muted transition hover:bg-background hover:text-primary"
              >
                {isAdmin ? (
                  <ShieldCheck className="h-4 w-4" />
                ) : (
                  <LayoutDashboard className="h-4 w-4" />
                )}
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </Link>

              <div className="mx-1 h-6 w-px bg-border" />

              <div className="flex items-center gap-2 pr-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <span className="max-w-[120px] truncate text-sm font-medium text-text">
                  {session.user?.name}
                </span>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition hover:bg-background hover:text-primary"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition hover:bg-background hover:text-primary"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text hover:bg-background md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-border bg-card px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-background text-primary"
                    : "text-muted hover:bg-background"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 h-px bg-border" />

            {status === "loading" ? null : session ? (
              <>
                <Link
                  href={dashboardHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-muted hover:bg-background"
                >
                  {isAdmin ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <LayoutDashboard className="h-4 w-4" />
                  )}
                  {isAdmin ? "Admin Dashboard" : "Dashboard"}
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-medium text-muted hover:bg-background"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-muted hover:bg-background"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white hover:bg-primary-hover"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
