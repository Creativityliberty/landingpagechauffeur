'use client';

/**
 * Booking Section - Booking form with price estimation (Service Layer)  
 */

import { useState } from 'react';
import { MapPin, Compass, ArrowRight, Zap, CreditCard, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '@/config';
import { container } from '@/lib/container';
import { Trip, TripType } from '@/core';

interface BookingSectionProps {
    isDarkMode: boolean;
}

interface FormData {
    type: TripType;
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    passengers: number;
}

interface Estimate {
    price: number;
    rule: string;
}

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
};

export function BookingSection({ isDarkMode }: BookingSectionProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    const [formData, setFormData] = useState<FormData>({
        type: 'local', pickup: '', dropoff: '', date: '', time: '', passengers: 1
    });
    const [estimate, setEstimate] = useState<Estimate | null>(null);

    const calculateEstimate = () => {
        const trip = new Trip(formData);

        if (!trip.isValid()) {
            return;
        }

        const estimate = container.services.calculatePrice.execute(trip);

        setEstimate({
            price: estimate.amount,
            rule: estimate.rule
        });
    };

    return (
        <section id="reserver" className={CONFIG.theme.spacing.section} style={{ backgroundColor: theme.surface2 }}>
            <div className={CONFIG.theme.spacing.container}>
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
                    <motion.div {...fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20">
                        Réservation
                    </motion.div>
                    <motion.h2
                        {...fadeInUp}
                        transition={{ delay: 0.1 }}
                        className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
                        style={{ color: isDarkMode ? '#F5F5F7' : theme.text }}
                    >
                        Réserver Votre Chauffeur
                    </motion.h2>
                    <motion.p
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
                        style={{ color: isDarkMode ? '#B7B7C2' : theme.muted }}
                    >
                        Remplissez le formulaire ci-dessous pour obtenir une estimation immédiate de votre trajet.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
                    {/* Form */}
                    <motion.div {...fadeInUp} className="lg:col-span-7 glass-dark p-8 md:p-16 rounded-[4rem] border shadow-3xl" style={{ borderColor: theme.border }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">
                            {/* Trip Type */}
                            <div className="col-span-1 sm:col-span-2">
                                <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-5 block" style={{ color: theme.muted }}>Type de Destination</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {['local', 'airport', 'long', 'pro'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setFormData({ ...formData, type: t as TripType })}
                                            className={`py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest border-2 transition-all ${formData.type === t ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-xl shadow-[#D4AF37]/20' : 'bg-transparent border-white/10 hover:border-[#D4AF37]'}`}
                                            style={{ color: formData.type === t ? '#000' : theme.text }}
                                        >
                                            {t === 'pro' ? 'Mise à dispo' : t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pickup */}
                            <div className="space-y-3">
                                <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block" style={{ color: theme.muted }}>Lieu de départ</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                                    <input
                                        type="text"
                                        placeholder="Adresse complète"
                                        className="w-full border-2 rounded-2xl pl-12 pr-5 py-5 outline-none focus:border-[#D4AF37] text-sm md:text-base font-bold transition-all"
                                        style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                                        onChange={e => setFormData({ ...formData, pickup: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Dropoff */}
                            <div className="space-y-3">
                                <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block" style={{ color: theme.muted }}>Lieu d&apos;arrivée</label>
                                <div className="relative">
                                    <Compass size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                                    <input
                                        type="text"
                                        placeholder="Aéroport, Gare, Ville..."
                                        className="w-full border-2 rounded-2xl pl-12 pr-5 py-5 outline-none focus:border-[#D4AF37] text-sm md:text-base font-bold transition-all"
                                        style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                                        onChange={e => setFormData({ ...formData, dropoff: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Date */}
                            <div className="space-y-3">
                                <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block" style={{ color: theme.muted }}>Date du trajet</label>
                                <input
                                    type="date"
                                    className="w-full border-2 rounded-2xl px-6 py-5 outline-none font-bold text-sm md:text-base focus:border-[#D4AF37]"
                                    style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            {/* Time */}
                            <div className="space-y-3">
                                <label className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block" style={{ color: theme.muted }}>Heure de prise en charge</label>
                                <input
                                    type="time"
                                    className="w-full border-2 rounded-2xl px-6 py-5 outline-none font-bold text-sm md:text-base focus:border-[#D4AF37]"
                                    style={{ backgroundColor: theme.bg, borderColor: theme.border, color: theme.text }}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateEstimate}
                            className="w-full py-6 md:py-8 rounded-3xl font-black text-lg md:text-2xl hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-4 group active:scale-[0.98]"
                            style={{ backgroundColor: isDarkMode ? '#FFF' : '#0F172A', color: isDarkMode ? '#000' : '#FFF' }}
                        >
                            CALCULER LE TARIF <ArrowRight size={26} className="group-hover:translate-x-3 transition-transform duration-500" />
                        </button>
                    </motion.div>

                    {/* Estimate Display */}
                    <div className="lg:col-span-5 flex flex-col gap-8 h-full">
                        <AnimatePresence mode="wait">
                            {estimate ? (
                                <motion.div
                                    key="est"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-10 md:p-16 rounded-[4rem] border-2 border-[#D4AF37]/40 flex-1 relative overflow-hidden shadow-3xl"
                                    style={{ backgroundColor: theme.surface }}
                                >
                                    <div className="text-6xl md:text-8xl font-black mb-6 tracking-tighter" style={{ color: theme.text }}>
                                        {estimate.price}<span className="text-2xl md:text-3xl ml-2 text-[#D4AF37]">€</span>
                                    </div>
                                    <p className="text-base md:text-lg font-medium opacity-80 mb-12 md:mb-16 leading-relaxed italic" style={{ color: theme.muted }}>
                                        &quot;{estimate.rule}&quot;
                                    </p>

                                    <div className="space-y-5">
                                        <button className="w-full py-6 bg-[#D4AF37] text-black rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 shadow-2xl shadow-[#D4AF37]/30 hover:bg-[#E1C45A] transition-all">
                                            <CreditCard size={22} /> RÉSERVER & PAYER (CB)
                                        </button>
                                        <button
                                            onClick={() => window.open(`https://wa.me/${CONFIG.contact.whatsapp}`, '_blank')}
                                            className="w-full py-6 border-2 rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                                            style={{ borderColor: theme.border, color: theme.text }}
                                        >
                                            <MessageCircle size={22} className="text-[#25D366]" /> PAYER EN ESPÈCES
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full border-2 border-dashed rounded-[4rem] flex flex-col items-center justify-center text-center p-12 min-h-[400px]" style={{ borderColor: theme.border }}>
                                    <Zap size={40} className="opacity-20 mb-10" style={{ color: theme.text }} />
                                    <p className="text-lg md:text-xl font-medium leading-relaxed opacity-40 max-w-xs" style={{ color: theme.muted }}>
                                        Complétez les informations pour débloquer votre tarif sur-mesure.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
