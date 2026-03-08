import { CONFIG } from "@/config";
import { Navbar, Footer } from "@/ui";

export default function MentionsLegales() {
    return (
        <div className="min-h-screen bg-[#0B0B0F] text-[#F5F5F7]">
            <Navbar isDarkMode={true} toggleTheme={() => { }} />
            <main className="pt-32 pb-24 px-4 md:px-6 max-w-4xl mx-auto min-h-[70vh]">
                <h1 className="text-4xl md:text-5xl font-black mb-12 text-[#D4AF37]">Mentions Légales</h1>

                <div className="space-y-8 opacity-80 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">1. Éditeur du site</h2>
                        <p>
                            Le site <strong>{CONFIG.content.brand.name}</strong> est édité par :<br />
                            [Nom de l'entreprise ou Auto-entrepreneur]<br />
                            Siège social : [Adresse] - Le Havre, France<br />
                            SIRET : [Numéro de SIRET]<br />
                            Contact : {CONFIG.contact.email} / {CONFIG.contact.phone}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">2. Directeur de la publication</h2>
                        <p>
                            Le directeur de la publication est [Nom du responsable].
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">3. Hébergement</h2>
                        <p>
                            Ce site est hébergé par Vercel Inc.<br />
                            440 N Barranca Ave #4133<br />
                            Covina, CA 91723<br />
                            États-Unis
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">4. Propriété intellectuelle</h2>
                        <p>
                            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                        </p>
                    </section>
                </div>
            </main>
            <Footer isDarkMode={true} />
        </div>
    );
}
