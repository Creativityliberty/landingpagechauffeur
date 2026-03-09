import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { BackgroundBeams, Navbar, Footer, BookingSection } from "@/ui";
import { CONFIG } from "@/config";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';
import Link from "next/link";
import { ChevronLeft, Calendar, User } from "lucide-react";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);

    if (!post) {
        return { title: 'Article non trouvé' };
    }

    const title = `${post.title} | Blog CARINE VTC`;
    const baseUrl = 'https://www.carinevtc.com';

    return {
        title,
        description: post.description,
        openGraph: {
            title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            url: `${baseUrl}/blog/${post.slug}`,
            images: [
                {
                    url: post.imageUrl || '/hero_bg.png',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: post.description,
            images: [post.imageUrl || '/hero_bg.png'],
        },
        alternates: {
            canonical: `${baseUrl}/blog/${post.slug}`
        }
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    const isDarkMode = true;
    const baseUrl = 'https://www.carinevtc.com';

    // Schema.org pour Article de Blog (SEO E-E-A-T)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: `${baseUrl}${post.imageUrl || '/hero_bg.png'}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'CARINE VTC',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/hero_bg.png`, // Placeholder logo
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${post.slug}`,
        },
    };

    return (
        <div className="min-h-screen dark bg-black text-white">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Navbar isDarkMode={isDarkMode} />

            {/* Hero Article */}
            <section className="relative min-h-[50vh] flex items-end pt-32 pb-16 px-4 md:px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={post.imageUrl || '/hero_bg.png'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                </div>

                <BackgroundBeams className="z-[2]" />

                <div className="max-w-4xl mx-auto relative z-10 w-full mb-8">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mb-8">
                        <ChevronLeft size={16} /> Retour au blog
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="bg-[#D4AF37] text-black text-[10px] md:text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-white/70 text-xs font-bold">
                            <Calendar size={14} />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-xs font-bold">
                            <User size={14} />
                            <span>{post.author}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 text-white tracking-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl md:text-2xl font-medium opacity-80 text-[#D4AF37] leading-relaxed">
                        {post.description}
                    </p>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-16 md:py-24 px-4 md:px-6 z-10 relative bg-black">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg md:prose-xl prose-invert prose-p:leading-relaxed prose-a:text-[#D4AF37] prose-headings:font-black prose-strong:text-[#D4AF37] prose-img:rounded-3xl prose-img:shadow-2xl max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/10 flex justify-center">
                        <Link href="#reserver" className="bg-[#D4AF37] text-black shadow-2xl shadow-[#D4AF37]/30 py-4 px-8 rounded-xl font-black text-lg hover:bg-[#E1C45A] transition-colors">
                            Réserver votre trajet maintenant
                        </Link>
                    </div>
                </div>
            </section>

            {/* Booking Form Below Article */}
            <BookingSection isDarkMode={isDarkMode} />

            <Footer isDarkMode={isDarkMode} />
        </div>
    );
}
