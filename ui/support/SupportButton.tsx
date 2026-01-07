'use client';

/**
 * Support Button - Floating help button
 */

import { Bell } from 'lucide-react';

export function SupportButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 w-16 h-16 bg-[#FF4D00] rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-500/30 hover:scale-110 transition-all active:scale-95 z-[90] group border-4 border-white"
            aria-label="Ouvrir le support"
        >
            <Bell size={32} className="group-hover:animate-bounce" />
            <span className="absolute right-20 bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gray-100">
                Besoin d&apos;aide ?
            </span>
        </button>
    );
}
