"use client";

import { CONFIG } from "@/config";
import { Navbar, Footer } from "@/ui";

export default function Confidentialite() {
    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F5F5F7]">
            <Navbar isDarkMode={true} />
            <main className="pt-32 pb-24 px-4 md:px-6 max-w-4xl mx-auto min-h-[70vh]">
                <h1 className="text-4xl md:text-5xl font-black mb-12 text-[#D4AF37]">Politique de Confidentialité</h1>

                <div className="space-y-8 opacity-80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">1. Collecte des données personnelles</h2>
                        <p>
                            Nous collectons les données personnelles que vous nous fournissez volontairement lors de l'utilisation de notre formulaire de réservation ou de contact (nom, prénom, adresse e-mail, numéro de téléphone, adresse de prise en charge et de destination).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">2. Utilisation des données</h2>
                        <p>
                            Par <strong>{CONFIG.content.brand.name}</strong>, vos données sont utilisées exclusivement pour le traitement de vos réservations, la gestion de votre dossier client, la facturation et la communication liée à nos services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">3. Protection des données</h2>
                        <p>
                            Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour assurer la sécurité de vos données personnelles contre l'accès, la modification, la divulgation ou la destruction non autorisés.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">4. Vos droits</h2>
                        <p>
                            Conformément à la réglementation en vigueur (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition et de portabilité de vos données. Pour exercer ces droits, veuillez nous contacter à l'adresse : {CONFIG.contact.email}.
                        </p>
                    </section>
                </div>
            </main>
            <Footer isDarkMode={true} />
        </div>
    );
}
