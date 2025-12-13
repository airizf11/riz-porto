// src/components/layout/Footer.tsx
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaTiktok, // FaDiscord
} from "react-icons/fa6";

// Shadcn & Utils
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Resume", href: "/resume" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Experiment", href: "/exp" },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/airizf11", label: "GitHub" },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/rizkifebrianm/",
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/rizyan.people",
      label: "Instagram",
    },
    { icon: FaXTwitter, href: "https://x.com/altriziyan", label: "X" },
    { icon: FaTiktok, href: "https://tiktok.com/@rizyan.gt", label: "TikTok" },
  ];

  return (
    <footer className="w-full bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-8 pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand Column (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors w-fit"
            >
              Aku Riziyan
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              I build and share things for the curious mind. A personal
              portfolio exploring technology, content creation, and digital
              experiments.
            </p>
          </div>

          {/* Navigation Column (Span 3) */}
          <div className="md:col-span-3">
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column (Span 4) */}
          <div className="md:col-span-4">
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Open for collaboration and new opportunities.
            </p>
          </div>
        </div>

        <Separator className="bg-border/60 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Riziyan. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with curiosity, code, and</span>
            <span className="text-accent font-medium">coffee</span>.
          </div>
        </div>
      </div>
    </footer>
  );
};
