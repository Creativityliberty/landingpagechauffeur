import { BackgroundBeams, Navbar, Footer, B2BContactButton, BookingSection } from "@/ui";
import { CONFIG } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, Clock, FileText, Shield, Star, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services VTC pour les Professionnels | Chauffeur Privé Normandie",
    description: "Solutions de mobilité haut de gamme pour les entreprises, hôtels et agences événementielles en Normandie. Facturation simplifiée et chauffeurs dédiés.",
    openGraph: {
        title: "Services VTC pour les Professionnels | Chauffeur Privé Normandie",
        description: "Solutions de mobilité haut de gamme pour les entreprises, hôtels et agences événementielles en Normandie.",
        url: `https://chauffeur-prive-normandie.fr/entreprises`,
        images: ['/hero_bg.png'],
    }
};

const B2B_FEATURES = [
    {
        icon: Clock,
        title: "Disponibilité 24/7",
        description: "Un service de chauffeurs VIP disponible de jour comme de nuit pour répondre aux urgences et aux horaires stricts de vos dirigeants."
    },
    {
        icon: FileText,
        title: "Facturation Centralisée",
        description: "Fini les notes de frais éparpillées. Nous proposons une facturation mensuelle globale avec relevé détaillé de toutes les courses."
    },
    {
        icon: Shield,
        title: "Confidentialité Absolue",
        description: "Nos chauffeurs sont formés au secret professionnel. Vos collaborateurs peuvent travailler et échanger en toute sécurité durant le trajet."
    },
    {
        icon: Users,
        title: "Gestion d'Évènements",
        description: "Séminaires, congrès, festivals... Nous mettons à disposition une flotte de véhicules premium pour gérer tous les transferts de vos invités."
    },
    {
        icon: Briefcase,
        title: "Chauffeurs Bilingues",
        description: "Un accueil personnalisé en anglais pour vos clients internationaux dès leur arrivée à l'aéroport (CDG, Orly) ou à la gare."
    },
    {
        icon: Star,
        title: "Accueil VIP en Gare & Aéroport",
        description: "Prise en charge avec tablette nominative dès la sortie des bagages, port des valises et accompagnement jusqu'au véhicule premium."
    }
];

export default function EntreprisesPage() {
    const isDarkMode = true; // Premium look for B2B
    const theme = CONFIG.theme.modes.dark;

    return (
        <div className="min-h-screen dark bg-black text-white">
            <Navbar isDarkMode={isDarkMode} />

            {/* B2B Hero Section */}
            <section className="relative min-h-[75vh] flex items-center pt-32 pb-16 px-4 md:px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero_bg.png" /* You can later replace this with a business meeting/car image */
                        alt="Chauffeur VTC Corporate"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
                </div>

                <BackgroundBeams className="z-[2]" />

                <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-black/40 text-[#D4AF37] text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-lg backdrop-blur-md">
                        Solutions Entreprises
                    </div>

                    <h1 className={`${CONFIG.theme.typography.hero} font-black leading-[1] mb-8 text-white max-w-4xl`}>
                        Une Mobilité d'Excellence pour <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#E1C45A] italic">
                            Vos Dirigeants & Clients
                        </span>
                    </h1>

                    <p className={`${CONFIG.theme.typography.body} text-lg md:text-xl font-medium opacity-80 max-w-3xl mb-12 leading-relaxed`}>
                        Devenez partenaire de Chauffeur Privé Normandie. Nous offrons aux entreprises, hôtels de luxe et organisateurs d'événements un service de transport sur-mesure, fiable et d'une discrétion absolue.
                    </p>

                    <div className="flex justify-center gap-6">
                        <a
                            href="#contact-pro"
                            className="bg-[#D4AF37] text-black shadow-2xl shadow-[#D4AF37]/30 py-4 px-8 rounded-xl font-black text-lg hover:bg-[#E1C45A] transition-colors"
                        >
                            Contactez-nous
                        </a>
                        <a
                            href="#avantages"
                            className="glass-dark border border-white/10 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-white/5 transition-colors hidden md:block"
                        >
                            Découvrir les avantages
                        </a>
                    </div>
                </div>
            </section>

            {/* B2B Advantages Grid */}
            <section id="avantages" className="py-24 px-4 md:px-6 relative z-10 bg-black">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Pourquoi nous choisir ?</h2>
                        <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full opacity-50"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {B2B_FEATURES.map((feature, i) => (
                            <div
                                key={i}
                                className="glass-dark border border-white/5 p-8 rounded-3xl hover:border-[#D4AF37]/30 transition-all duration-300 group hover:-translate-y-2 bg-[#111]"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                                    <feature.icon size={24} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="opacity-60 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* B2B Partnership Types */}
            <section className="py-24 px-4 md:px-6 relative bg-[#111] border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-8">
                                Des solutions adaptées à <span className="text-[#D4AF37]">chaque secteur</span>.
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Hôtels & Palaces", desc: "Un service de conciergerie irréprochable pour le transfert de vos résidents vers les aéroports et lieux touristiques." },
                                    { title: "Agences Événementielles", desc: "Coordination du transport lors de vos séminaires, congrès, mariages ou Fashion Weeks en Normandie." },
                                    { title: "Comités de Direction", desc: "Transport sécurisé et confidentiel pour les V.I.P., membres du board et investisseurs." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold shrink-0 mt-1">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                            <p className="opacity-60 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent blur-3xl -z-10 rounded-full"></div>
                            <div className="glass-dark p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-[100px] -z-10"></div>
                                <h3 className="text-2xl font-black mb-6">Ouverture de Compte Pro</h3>
                                <p className="opacity-70 text-sm mb-8">Devenez partenaire officiel et bénéficiez de tarifs préférentiels, d'une ligne prioritaire et du paiement différé mensuel.</p>
                                <B2BContactButton className="block w-full text-center py-4 bg-white text-black font-black uppercase text-sm rounded-xl hover:bg-gray-200 transition-colors">
                                    Envoyer une demande
                                </B2BContactButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Pro */}
            <section id="contact-pro" className="py-32 px-4 md:px-6 relative text-center">
                <BackgroundBeams className="opacity-50" />
                <div className="max-w-3xl mx-auto relative z-10 glass-dark p-12 rounded-[3rem] border border-[#D4AF37]/20 shadow-2xl shadow-[#D4AF37]/10">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">
                        L'Excellence n'attend pas.
                    </h2>
                    <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto">
                        Contactez notre équipe dédiée aux entreprises pour mettre en place votre compte pro en moins de 24 heures.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href={`tel:${CONFIG.contact.phone.replace(/\s/g, '')}`} className="px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-black uppercase tracking-wider hover:bg-[#E1C45A] transition-colors">
                            Appeler le service Pro
                        </a>
                        <B2BContactButton className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                            Nous écrire
                        </B2BContactButton>
                    </div>
                </div>
            </section>

            <BookingSection isDarkMode={isDarkMode} />

            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}
