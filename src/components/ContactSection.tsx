// src/components/ContactSection.tsx
/* eslint-disable react/no-unescaped-entities */
import { AnimatedSection } from "./AnimatedSection";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";

export const ContactSection = () => {
  return (
    <AnimatedSection
      id="contact"
      className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm"
    >
      <div className="container mx-auto max-w-4xl px-8">
        <h2 className="heading text-4xl md:text-5xl text-center mb-4">
          Let's <span className="text-secondary">Connect</span>
        </h2>
        <p className="text-center text-light/70 mb-12">
          Have a project in mind or just want to say hi? Feel free to reach out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <h3 className="heading text-2xl text-accent">Contact Info</h3>
            <a
              href="mailto:rizian.business99@gmail.com"
              className="flex items-center gap-4 group text-lg"
            >
              <Mail className="w-6 h-6 text-tertiary" />
              <span className="group-hover:text-tertiary transition-colors">
                rizian.business99@gmail.com
              </span>
            </a>
            <a
              href="https://instagram.com/rizyan.people"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group text-lg"
            >
              <FaInstagram className="w-6 h-6 text-tertiary" />
              <span className="group-hover:text-tertiary transition-colors">
                @rizyan.people
              </span>
            </a>
            <a
              href="https://wa.me/6281358511368"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group text-lg"
            >
              <FaWhatsapp className="w-6 h-6 text-tertiary" />
              <span className="group-hover:text-tertiary transition-colors">
                WhatsApp Business
              </span>
            </a>
          </div>

          <form className="flex flex-col gap-4">
            <h3 className="heading text-2xl text-accent">Send a Message</h3>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full p-3 bg-dark/50 border border-light/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full p-3 bg-dark/50 border border-light/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Your Message"
                className="w-full p-3 bg-dark/50 border border-light/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95"
            >
              Send
            </button>
            <p className="text-xs text-light/50 mt-2">
              Note: This form is for display. Backend integration is needed.
            </p>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
};
