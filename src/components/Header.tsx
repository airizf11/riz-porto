// src/components/Header.tsx
"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "pt-2" : "pt-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-8">
          <div
            className={`flex items-center justify-between h-16 bg-dark/70 backdrop-blur-md border border-light/10 rounded-full px-6 shadow-lg transition-all duration-300 ${
              isScrolled ? "" : "scale-105"
            }`}
          >
            <Link
              href="/"
              className="text-xl font-bold text-light hover:text-accent transition-colors"
            >
              Riziyan
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-medium transition-colors text-sm ${
                      isActive
                        ? "text-accent"
                        : "text-light/70 hover:text-light"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-light/80 hover:text-light"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};
