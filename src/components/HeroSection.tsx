// src/components/HeroSection.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-dark text-light p-8">
      <div className="text-center max-w-3xl pt-32">
        <motion.h1 className="heading text-5xl md:text-7xl lg:text-8xl mb-4">
          <span className="block">Hi, I’m Riziyan.</span>
          <br />
          <span className="block">I build and share things</span>
          <span className="block">
            for the <span className="text-primary">curious</span> mind.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="narrative text-lg md:text-xl text-light/80 mb-8"
        >
          Digital enthusiast with a passion for tech, education, and meaningful
          content creation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
          >
            Explore My Work{" "}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="/contact"
            className="group flex items-center justify-center gap-2 px-6 py-3 border-2 border-light/50 text-light font-bold rounded-full transition-colors hover:bg-light/10 active:bg-light/20"
          >
            Contact Me <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
