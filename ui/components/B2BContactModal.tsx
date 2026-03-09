"use client";

import { useState } from "react";
import { X, Building, User, Mail, Calendar, Briefcase, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/config";

interface B2BContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function B2BContactModal({ isOpen, onClose }: B2BContactModalProps) {
    const [formData, setFormData] = useState({
        company: "",
        contactName: "",
        emailOrPhone: "",
        needType: "Transferts V.I.P",
        otherNeed: "",
        startDate: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalNeedType = formData.needType === "Autre demande" ? `Autre: ${formData.otherNeed}` : formData.needType;

        const message = encodeURIComponent(
            `*🔥 NOUVELLE DEMANDE PRO / B2B*\n\n` +
            `🏢 *Entreprise:* ${formData.company}\n` +
            `👤 *Contact:* ${formData.contactName}\n` +
            `📞 *Email / Tél:* ${formData.emailOrPhone}\n` +
            `💼 *Type de besoin:* ${finalNeedType}\n` +
            (formData.startDate ? `📅 *Date souhaitée:* ${formData.startDate}\n` : "") +
            `\nJe souhaite ouvrir un compte d'entreprise ou obtenir un devis pro.`
        );

        window.open(`https://wa.me/${CONFIG.contact.whatsapp}?text=${message}`, "_blank");
        onClose();
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all";
    const labelClasses = "block text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mb-2";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg glass-dark bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#D4AF37]/20 to-transparent p-6 md:p-8 flex justify-between items-start border-b border-white/10">
                            <div>
                                <h3 className="text-2xl font-black text-white mb-2">Ouverture de Compte Pro</h3>
                                <p className="text-sm opacity-70 text-white">Remplissez ce formulaire pour être recontacté en priorité.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClasses}>Nom de l'entreprise *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Building size={16} className="text-white/50" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className={`${inputClasses} pl-11`}
                                            placeholder="Ex: Hôtel Barrière"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Contact (Prénom & Nom) *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User size={16} className="text-white/50" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.contactName}
                                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                            className={`${inputClasses} pl-11`}
                                            placeholder="Ex: Jean Dupont"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Email ou Téléphone *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail size={16} className="text-white/50" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.emailOrPhone}
                                            onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                                            className={`${inputClasses} pl-11`}
                                            placeholder="Pour vous recontacter"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Type de besoin *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Briefcase size={16} className="text-white/50" />
                                        </div>
                                        <select
                                            required
                                            value={formData.needType}
                                            onChange={(e) => setFormData({ ...formData, needType: e.target.value })}
                                            className={`${inputClasses} pl-11 appearance-none`}
                                        >
                                            <option value="Transferts V.I.P" className="bg-[#111] text-white">Transferts V.I.P</option>
                                            <option value="Événementiel" className="bg-[#111] text-white">Événementiel / Congrès</option>
                                            <option value="Déplacements Quotidiens" className="bg-[#111] text-white">Déplacements Quotidiens</option>
                                            <option value="Autre demande" className="bg-[#111] text-white">Autre demande</option>
                                        </select>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {formData.needType === "Autre demande" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-2">
                                                <label className={labelClasses}>Précisez votre demande *</label>
                                                <textarea
                                                    required
                                                    value={formData.otherNeed}
                                                    onChange={(e) => setFormData({ ...formData, otherNeed: e.target.value })}
                                                    className={`${inputClasses} resize-none h-24`}
                                                    placeholder="Dites-nous en plus sur vos besoins..."
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div>
                                    <label className={labelClasses}>Date de début souhaitée <span className="text-white/30 lowercase">(Optionnel)</span></label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar size={16} className="text-white/50" />
                                        </div>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className={`${inputClasses} pl-11`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-wider rounded-xl hover:bg-[#E1C45A] transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                            >
                                <Send size={18} />
                                Envoyer la demande via WhatsApp
                            </button>
                            <p className="text-center text-[10px] text-white/40 mt-3">
                                Redirection instantanée vers WhatsApp pour validation.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
