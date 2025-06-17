// src/components/Divider.tsx
"use client";

import { motion } from "framer-motion";

export const Divider = () => {
  return (
    <div className="container mx-auto px-8">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: [0.6, 0.01, -0.05, 0.95] }}
        style={{ transformOrigin: "center" }}
        className="h-px w-full my-16 md:my-24 bg-gradient-to-r from-transparent via-accent to-transparent"
      />
    </div>
  );
};
