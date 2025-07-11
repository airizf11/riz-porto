// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-20 bg-dark/70 backdrop-blur-md border-b border-light/10 rounded-b-2xl px-6">
          <Link
            href="/"
            className="text-xl font-bold text-light hover:text-accent transition-transform hover:scale-105 active:scale-95"
          >
            Riziyan
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-transform hover:scale-105 active:scale-95 transition-colors ${
                    isActive ? "text-accent" : "text-light/70 hover:text-light"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          {/* TODO: mobile menu */}
        </div>
      </div>
    </header>
  );
};
