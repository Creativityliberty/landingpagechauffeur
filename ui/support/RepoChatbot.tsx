'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CONFIG } from '@/config';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface RepoChatbotProps {
    isDarkMode: boolean;
    isOpen: boolean;
    onClose: () => void;
}

const SUGGESTIONS = [
    "Combien pour aller à l'aéroport CDG ?",
    "Quels véhicules proposez-vous ?",
    "Comment se passe une réservation ?"
];

export function RepoChatbot({ isDarkMode, isOpen, onClose }: RepoChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Bonjour, je suis Mikmik, l'assistant intelligent de **CARINE VTC**. \n\nComment puis-je vous aider aujourd'hui ?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async (text: string = input) => {
        if (!text.trim() || isLoading) return;

        const userMsg: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/repo-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages.concat(userMsg).map(m => ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        content: m.content
                    }))
                }),
            });
            const data = await res.json();
            if (data.content) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, je n'ai pas pu obtenir de réponse." }]);
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, j'ai rencontré une erreur de connexion." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop for mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="md:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-x-0 bottom-0 top-24 md:top-auto md:inset-auto md:bottom-24 md:right-8 md:w-[420px] md:h-[650px] z-[110] flex flex-col overflow-hidden shadow-3xl "
                        style={{
                            borderRadius: '32px 32px 0 0', // Mobile specific
                            ...((typeof window !== 'undefined' && window.innerWidth >= 768) && { borderRadius: '32px' }), // Desktop override
                            borderColor: isDarkMode ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.3)',
                            borderWidth: '1px',
                            backgroundColor: isDarkMode ? '#111' : '#fff'
                        }}
                    >
                        {/* Header */}
                        <div className={`p-4 md:p-6 border-b flex items-center justify-between shadow-sm relative z-10 ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-gray-50/90 border-black/10'} backdrop-blur-md`}>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-black shadow-lg">
                                        <Bot size={22} className="opacity-90" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full shadow-sm"></span>
                                </div>
                                <div>
                                    <h3 className="font-black text-sm md:text-base uppercase tracking-widest" style={{ color: theme.text }}>Mikmik <span className="text-[#D4AF37]">IA</span></h3>
                                    <p className="text-[10px] md:text-xs uppercase tracking-tighter opacity-60 font-medium" style={{ color: theme.text }}>Assistant Conciergerie</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-full transition-all ${isDarkMode ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-black/5 text-black/40 hover:text-black'}`}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide relative bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
                            {messages.map((m, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {m.role === 'assistant' && (
                                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mr-2 mt-1 shrink-0">
                                            <Bot size={12} />
                                        </div>
                                    )}
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] md:text-sm leading-relaxed shadow-sm ${m.role === 'user'
                                        ? 'bg-gradient-to-br from-[#D4AF37] to-[#C5A028] text-black font-semibold rounded-br-none'
                                        : isDarkMode
                                            ? 'bg-[#1A1A1A] text-white/90 border border-white/5 rounded-bl-none'
                                            : 'bg-white text-gray-800 border border-black/5 rounded-bl-none'
                                        }`}>
                                        {m.role === 'assistant' ? (
                                            <div className={`space-y-4 prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-[#D4AF37] prose-a:font-bold prose-headings:font-bold ${isDarkMode ? 'prose-invert prose-strong:text-[#D4AF37]' : 'prose-strong:text-[#D4AF37]'}`}>
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        code({ node, inline, className, children, ...props }: any) {
                                                            const match = /language-json/.exec(className || '');
                                                            if (!inline && match) {
                                                                try {
                                                                    const data = JSON.parse(String(children).replace(/\n/g, ''));
                                                                    if (data.type === 'quote') {
                                                                        return (
                                                                            <div className="not-prose my-5 p-5 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-transparent space-y-3 relative overflow-hidden group">
                                                                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
                                                                                <div className="flex justify-between items-center text-[#D4AF37] font-black uppercase text-xs tracking-widest">
                                                                                    <span>Proposition</span>
                                                                                    <span className="text-lg">{data.price}€</span>
                                                                                </div>
                                                                                <p className="text-xs md:text-sm font-medium opacity-90">{data.details}</p>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        onClose();
                                                                                        document.getElementById('reserver')?.scrollIntoView({ behavior: 'smooth' });
                                                                                    }}
                                                                                    className="w-full mt-2 py-3 bg-[#D4AF37] text-black rounded-xl font-black uppercase text-[10px] md:text-xs hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
                                                                                >
                                                                                    Finaliser la réservation <ArrowRight size={14} />
                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    }
                                                                } catch (e) { /* Fallback to standard code block */ }
                                                            }
                                                            return (
                                                                <code className={className} {...props}>
                                                                    {children}
                                                                </code>
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {m.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            m.content
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
                                        <Bot size={12} />
                                    </div>
                                    <div className={`${isDarkMode ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-black/5'} p-3 md:p-4 rounded-2xl rounded-bl-none border shadow-sm flex items-center gap-2`}>
                                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"></div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className={`p-4 md:p-5 border-t relative z-10 ${isDarkMode ? 'bg-black/90 border-white/10' : 'bg-white border-black/5'} backdrop-blur-md`}>
                            {/* Suggestions */}
                            {messages.length === 1 && !isLoading && (
                                <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide snap-x">
                                    {SUGGESTIONS.map((sug, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(sug)}
                                            className={`snap-start shrink-0 px-4 py-2 rounded-full text-[11px] md:text-xs font-semibold max-w-[200px] truncate border transition-all ${isDarkMode
                                                ? 'bg-[#1A1A1A] border-white/10 text-white/80 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
                                                : 'bg-gray-50 border-black/5 text-gray-700 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 hover:text-[#D4AF37]'
                                                }`}
                                        >
                                            {sug}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Écrivez votre message..."
                                    className={`w-full border rounded-2xl py-3.5 pl-5 pr-12 text-base md:text-sm focus:outline-none focus:border-[#D4AF37]/70 transition-colors shadow-inner ${isDarkMode
                                        ? 'bg-[#1A1A1A] border-white/10 placeholder:text-white/30'
                                        : 'bg-gray-50 border-black/10 placeholder:text-black/30'
                                        }`}
                                    style={{ color: theme.text }}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    className={`absolute right-2 p-2 rounded-xl transition-all ${!input.trim() || isLoading ? 'opacity-30 cursor-not-allowed text-gray-500' : 'bg-[#D4AF37] text-black hover:scale-105 shadow-md shadow-[#D4AF37]/20'}`}
                                >
                                    <Send size={16} className={input.trim() && !isLoading ? "translate-x-[1px]" : ""} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[9px] opacity-40 uppercase tracking-widest font-bold" style={{ color: theme.text }}>Powered by Gemini AI</p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
