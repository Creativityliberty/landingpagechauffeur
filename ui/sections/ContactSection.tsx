"use client";

/**
 * Contact Section
 */

import { CONFIG } from "@/config";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";

interface ContactSectionProps {
  isDarkMode: boolean;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

export function ContactSection({ isDarkMode }: ContactSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

  const contacts = [
    {
      icon: Phone,
      title: "Appeler",
      value: CONFIG.contact.phone,
      link: `tel:${CONFIG.contact.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Message instantané",
      link: `https://wa.me/${CONFIG.contact.whatsapp}`,
    },
    {
      icon: Mail,
      title: "Email",
      value: CONFIG.contact.email,
      link: `mailto:${CONFIG.contact.email}`,
    },
  ];

  return (
    <section
      id="contact"
      className={CONFIG.theme.spacing.section}
      style={{ backgroundColor: theme.surface2 }}
    >
      <div className={CONFIG.theme.spacing.container}>
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20"
          >
            Support
          </motion.div>
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
            style={{ color: isDarkMode ? "#F5F5F7" : theme.text }}
          >
            Contactez-nous
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
            style={{ color: isDarkMode ? "#B7B7C2" : theme.muted }}
          >
            Une question ? Un trajet spécifique ? Notre équipe est à votre
            écoute 7j/7.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto px-4 md:px-6">
          {contacts.map((contact, i) => (
            <motion.a
              key={i}
              href={contact.link}
              {...fadeInUp}
              transition={{ delay: i * CONFIG.theme.animations.stagger }}
              className="p-8 md:p-10 lg:p-12 rounded-3xl md:rounded-[3rem] glass-dark border flex flex-col items-center group hover:border-[#D4AF37]/40 transition-all shadow-xl"
              style={{ borderColor: theme.border }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6 md:mb-8 border border-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                <contact.icon size={28} className="md:w-8 md:h-8" />
              </div>
              <h3
                className="text-lg md:text-xl lg:text-2xl font-black mb-2 md:mb-3 tracking-tight"
                style={{ color: isDarkMode ? "#F5F5F7" : theme.text }}
              >
                {contact.title}
              </h3>
              <p
                className="font-medium opacity-60 text-sm md:text-base"
                style={{ color: isDarkMode ? "#B7B7C2" : theme.muted }}
              >
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
