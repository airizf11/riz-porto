// src/components/MobileMenu.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-4 right-4 w-[calc(100vw-2rem)] max-w-xs bg-dark/80 backdrop-blur-lg border border-light/10 rounded-xl shadow-2xl z-50"
          >
            <div className="flex justify-between items-center p-4 border-b border-light/10">
              <span className="font-bold text-light">Navigation</span>
              <button
                onClick={onClose}
                className="text-light/70 hover:text-light"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="px-4 py-3 text-lg text-light/80 hover:bg-light/10 hover:text-light rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
