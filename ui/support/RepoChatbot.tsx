'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
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

export function RepoChatbot({ isDarkMode, isOpen, onClose }: RepoChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Moi c'est Mikmik, l'expert de ce projet ! Comment puis-je vous aider ?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: 'user', content: input };
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
            }
        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, j'ai rencontré une erreur technique." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:w-[380px] max-h-[70vh] md:max-h-[600px] z-[110] rounded-[2rem] flex flex-col overflow-hidden border glass-dark shadow-3xl"
                    style={{
                        borderColor: isDarkMode ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.1)',
                        backgroundColor: isDarkMode ? undefined : 'rgba(255, 255, 255, 0.95)'
                    }}
                >
                    {/* Header */}
                    <div className={`p-4 md:p-5 border-b flex items-center justify-between ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/5'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h3 className="font-black text-[11px] md:text-xs uppercase tracking-widest" style={{ color: theme.text }}>Mikmik Agent IA</h3>
                                <p className="text-[9px] uppercase tracking-tighter opacity-50" style={{ color: theme.text }}>Expert Architecture</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className={`p-1.5 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-black/5 text-black/40 hover:text-black'}`}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-hide">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-[11px] md:text-xs leading-relaxed ${m.role === 'user'
                                    ? 'bg-[#D4AF37] text-black font-medium'
                                    : isDarkMode
                                        ? 'bg-white/5 text-white/80 border border-white/10'
                                        : 'bg-white text-gray-800 border border-black/5 shadow-sm'
                                    }`}>
                                    {m.role === 'assistant' ? (
                                        <div className={`space-y-4 prose prose-xs max-w-none prose-p:leading-relaxed prose-a:text-[#D4AF37] ${isDarkMode ? 'prose-invert prose-strong:text-white' : 'prose-strong:text-black'}`}>
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
                                                                        <div className="not-prose my-4 p-4 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 space-y-2 shadow-inner">
                                                                            <div className="flex justify-between items-center text-[#D4AF37] font-black uppercase text-[10px] tracking-widest">
                                                                                <span>Devis Estimatif</span>
                                                                                <span>{data.price}€</span>
                                                                            </div>
                                                                            <p className="text-[11px] opacity-80">{data.details}</p>
                                                                            <button
                                                                                onClick={() => document.getElementById('reserver')?.scrollIntoView({ behavior: 'smooth' })}
                                                                                className="w-full py-2 bg-[#D4AF37] text-black rounded-lg font-black uppercase text-[9px] hover:bg-[#E1C45A] transition-colors"
                                                                            >
                                                                                Réserver ce trajet
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
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} p-3 md:p-4 rounded-2xl border`}>
                                    <Loader2 size={14} className="animate-spin text-[#D4AF37]" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className={`p-4 md:p-5 border-t ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/5'}`}>
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Posez une question..."
                                className={`w-full border rounded-xl py-2.5 pl-4 pr-10 text-[11px] md:text-xs focus:outline-none focus:border-[#D4AF37]/50 transition-colors ${isDarkMode
                                    ? 'bg-white/5 border-white/10'
                                    : 'bg-gray-50 border-black/10'
                                    }`}
                                style={{ color: theme.text }}
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
