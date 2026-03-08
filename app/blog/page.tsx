import { BackgroundBeams, Navbar, Footer, BookingSection } from "@/ui";
import { getAllPosts } from "@/lib/blog";
import { CONFIG } from "@/config";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

export const metadata = {
    title: "Le Blog du Chauffeur Privé | Normandie & Paris",
    description: "Découvrez nos articles sur le transport de personnes, le tourisme en Normandie et les conseils pour vos transferts aéroport (CDG, Orly).",
};

export default function BlogList() {
    const posts = getAllPosts();
    const theme = CONFIG.theme.modes.dark; // The blog will have the premium dark mode by default
    const isDarkMode = true;

    return (
        <div className="min-h-screen dark bg-black">
            <Navbar isDarkMode={isDarkMode} />

            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center pt-32 pb-16 px-4 md:px-6 overflow-hidden">
                <BackgroundBeams className="z-[2]" />
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-black/40 text-[#D4AF37] text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-10 shadow-lg backdrop-blur-md">
                        Expertise & Actualités
                    </div>
                    <h1 className={`${CONFIG.theme.typography.hero} font-black leading-[0.9] mb-8 text-white`}>
                        Le Blog Chauffeur Privé
                    </h1>
                    <p className={`${CONFIG.theme.typography.body} text-lg font-medium opacity-70 max-w-2xl`}>
                        Conseils de transport, découverte du patrimoine Normand et nouveautés de notre service VTC.
                    </p>
                </div>
            </section>

            {/* Blog List Section */}
            <section className="py-20 px-4 md:px-6 z-10 relative">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full flex flex-col">
                            <article className="border border-white/10 rounded-3xl overflow-hidden bg-[#1A1A1A] hover:bg-[#222] transition-colors h-full flex flex-col shadow-xl">
                                <div className="h-48 w-full bg-[#111] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                    <img
                                        src={post.imageUrl || '/hero_bg.png'}
                                        alt={post.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                                    <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold opacity-80 mb-4">
                                        <Calendar size={14} />
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </time>
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-black text-white mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-white/60 text-sm leading-relaxed mb-8 flex-1">
                                        {post.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-xs uppercase tracking-widest font-black text-white/50">{post.author}</span>
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                            <ChevronRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Booking CTA */}
            <BookingSection isDarkMode={isDarkMode} />

            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}
