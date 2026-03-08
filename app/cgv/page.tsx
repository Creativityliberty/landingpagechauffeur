"use client";

import { CONFIG } from "@/config";
import { Navbar, Footer } from "@/ui";

export default function CGV() {
    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F5F5F7]">
            <Navbar isDarkMode={true} toggleTheme={() => { }} />
            <main className="pt-32 pb-24 px-4 md:px-6 max-w-4xl mx-auto min-h-[70vh]">
                <h1 className="text-4xl md:text-5xl font-black mb-12 text-[#D4AF37]">Conditions Générales de Vente (CGV)</h1>

                <div className="space-y-8 opacity-80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">1. Objet</h2>
                        <p>
                            Les présentes Conditions Générales de Vente régissent les prestations de transport de personnes (VTC) fournies par <strong>{CONFIG.content.brand.name}</strong>. En réservant une course, le client accepte ces conditions sans réserve.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">2. Tarifs et Réservation</h2>
                        <p>
                            Les tarifs sont communiqués à l'avance lors de la réservation via notre outil en ligne ou par téléphone. Ils sont forfaitaires pour les transferts aéroports et au kilomètre pour les trajets locaux. La réservation est considérée comme validée une fois la confirmation envoyée au client.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">3. Annulation et Retard</h2>
                        <p>
                            Toute annulation doit être effectuée au moins [X] heures avant l'heure prévue de prise en charge. En cas d'annulation tardive, des frais peuvent s'appliquer. En cas de retard du client, une franchise d'attente de [X] minutes est accordée ; au-delà, des frais d'attente seront facturés.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">4. Bagages</h2>
                        <p>
                            Le client doit informer <strong>{CONFIG.content.brand.name}</strong> lors de la réservation du nombre et de la taille de ses bagages afin qu'un véhicule adapté soit fourni. Les bagages demeurent sous la responsabilité du client.
                        </p>
                    </section>
                </div>
            </main>
            <Footer isDarkMode={true} />
        </div>
    );
}
