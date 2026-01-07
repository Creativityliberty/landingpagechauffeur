'use client';

/**
 * Support Button and Menu for VTC
 */

import { X, Bell, MessageCircle, Send, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { CONFIG } from '@/config';

interface SupportMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
}

export function SupportButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 left-8 w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-xl shadow-[#D4AF37]/30 hover:scale-110 transition-all active:scale-95 z-[60] group border-4 border-[#0B0B0F]"
            aria-label="Ouvrir le support"
        >
            <Bell size={32} className="group-hover:animate-bounce" />
            <span className="absolute left-20 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gray-100">
                Besoin d&apos;aide ?
            </span>
        </button>
    );
}

export function SupportMenu({ isOpen, onClose }: SupportMenuProps) {
    if (!isOpen) return null;

    const content = CONFIG.content.support;

    const options = [
        { name: 'Appeler', icon: <Phone className="w-7 h-7 text-[#D4AF37]" />, link: `tel:${CONFIG.contact.phone.replace(/\s/g, '')}` },
        { name: 'WhatsApp', icon: <MessageCircle className="w-7 h-7 text-[#25D366]" />, link: `https://wa.me/${CONFIG.contact.whatsapp}` },
        { name: 'Telegram', icon: <Send className="w-7 h-7 text-[#0088CC]" />, link: `https://t.me/${CONFIG.contact.whatsapp}` },
        { name: 'Email', icon: <Mail className="w-7 h-7 text-gray-500" />, link: `mailto:${CONFIG.contact.email}` }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-lg bg-[#F9F9F9] rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
                <div className="p-7 text-white relative bg-[#0B0B0F]">
                    <button onClick={onClose} className="absolute top-7 right-7 hover:bg-white/20 p-1.5 rounded-full transition-all active:scale-90">
                        <X size={26} strokeWidth={2.5} />
                    </button>
                    <h2 className="text-2xl font-black tracking-tight">{content.headerTitle}</h2>
                    <p className="text-[15px] opacity-70 mt-0.5">{content.headerSub}</p>
                </div>

                <div className="p-8 md:p-10 pb-12">
                    <h3 className="text-[1.85rem] leading-[1.1] font-black text-[#111111] mb-10 max-w-[90%] tracking-tight">
                        {content.mainQuestion}
                    </h3>

                    <div className="space-y-4 flex flex-col">
                        {options.map((option) => (
                            <a
                                key={option.name}
                                href={option.link}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-white hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center gap-5 p-5 rounded-[2rem] shadow-sm border border-black/5 text-left group"
                            >
                                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md shrink-0">
                                    {option.icon}
                                </div>
                                <span className="text-2xl font-black text-black">
                                    {option.name}
                                </span>
                            </a>
                        ))}
                    </div>

                    <footer className="mt-12 text-center px-4">
                        <p className="text-[13px] italic text-gray-400 font-bold leading-relaxed">
                            {content.availability}
                        </p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
}
