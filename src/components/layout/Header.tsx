// src/components/layout/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

// Shadcn Imports
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={cn(
            "flex items-center justify-between h-16 px-6 rounded-full transition-all duration-300",
            // Glassmorphism effect using semantic colors
            "bg-background/50 backdrop-blur-md border border-border/40 shadow-sm",
            !isScrolled && "scale-[1.02] border-border/20 shadow-lg"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            Aku Riziyan
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  asChild
                  className={cn(
                    "rounded-full text-sm font-medium transition-colors hover:bg-muted",
                    isActive
                      ? "text-primary bg-primary/10 font-bold hover:bg-primary/20"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              );
            })}
          </nav>

          {/* Mobile Navigation (Shadcn Sheet) */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground hover:text-foreground"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] border-l border-border bg-background/95 backdrop-blur-xl"
            >
              <SheetHeader className="text-left border-b border-border pb-4 mb-4">
                <SheetTitle className="text-xl font-bold text-foreground">
                  Navigation
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));

                  return (
                    <SheetClose key={link.name} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Optional: Add Socials or CTA inside mobile menu footer */}
              <div className="absolute bottom-8 left-6 right-6">
                <Button asChild className="w-full" size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
