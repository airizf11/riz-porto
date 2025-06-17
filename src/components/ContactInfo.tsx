// src/components/ContactInfo.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mail, Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const contactLinks = [
  {
    icon: <Mail className="w-6 h-6 text-tertiary" />,
    text: "rizian.business99@gmail.com",
    href: "mailto:rizian.business99@gmail.com",
  },
  {
    icon: <FaInstagram className="w-6 h-6 text-tertiary" />,
    text: "@rizyan.people",
    href: "https://instagram.com/rizyan.people",
  },
  {
    icon: <FaWhatsapp className="w-6 h-6 text-tertiary" />,
    text: "WhatsApp Business",
    href: "https://wa.me/6281358511368",
  },
];

type ContactInfoProps = {
  className?: string;
};

export const ContactInfo = ({ className }: ContactInfoProps) => {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <h3 className="heading text-2xl text-accent">Get in Touch</h3>
      {contactLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 group text-lg"
        >
          {link.icon}
          <span className="text-light/80 group-hover:text-light transition-colors">
            {link.text}
          </span>
        </a>
      ))}
    </div>
  );
};
