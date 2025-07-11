// src/components/admin/AdminHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, UserSearchIcon } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

const navLinks = [
  { name: "Dashboard", href: "/mudir", icon: LayoutDashboard },
  { name: "Content", href: "/mudir/content", icon: Newspaper },
  { name: "Socials", href: "/mudir/socials", icon: UserSearchIcon },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-8">
        <nav className="flex items-center justify-between h-20">
          <Link
            href="/mudir"
            className="text-xl font-bold text-light hover:text-accent transition-colors"
          >
            Admin Panel
          </Link>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-4 bg-dark/70 backdrop-blur-md border border-light/10 rounded-full px-6 py-3 shadow-lg">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/mudir" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                      isActive
                        ? "text-dark bg-accent"
                        : "text-light/70 hover:text-light"
                    }`}
                    title={link.name}
                  >
                    <link.icon className={`w-5 h-5`} />
                    <span className="hidden sm:inline text-sm font-semibold">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <LogoutButton />
          </div>
        </nav>
      </div>
    </header>
  );
}
