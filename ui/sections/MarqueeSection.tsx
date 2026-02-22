'use client';

/**
 * Marquee Section - Destinations scrolling
 */

import { CONFIG } from '@/config';

interface MarqueeSectionProps {
    isDarkMode: boolean;
}

export function MarqueeSection({ isDarkMode }: MarqueeSectionProps) {
    const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

    return (
        <div
            className="w-full border-y py-4 overflow-hidden select-none"
            style={{ backgroundColor: theme.surface, borderColor: theme.border }}
        >
            <div className="animate-marquee whitespace-nowrap flex">
                {[...CONFIG.content.marquee, ...CONFIG.content.marquee].map((item, i) => (
                    <div key={i} className="flex items-center mx-6 md:mx-10">
                        <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-4" style={{ color: theme.muted }}>
                            <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
