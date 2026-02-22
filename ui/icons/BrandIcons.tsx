/**
 * Brand Icons (Payment Methods)
 */

export const BrandIcons = {
    tara: () => (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-blue-500">
            <path d="M12 2L4 9L12 22L20 9L12 2Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M4 9H20M12 2L8 9L12 22L16 9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    ),
    orange: () => (
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FF7900] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 overflow-hidden">
            <div className="w-8 h-8 bg-black/10 rounded-sm transform rotate-12" />
        </div>
    ),
    mtn: () => (
        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFCC00] rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <div className="w-8 h-4 bg-black/10 rounded-full" />
        </div>
    ),
    paypal: () => (
        <div className="w-12 h-8 md:w-14 md:h-10 bg-[#003087] rounded-lg flex items-center justify-center text-white font-black italic text-lg md:text-xl">P</div>
    ),
    visa: () => (
        <div className="w-14 h-8 md:w-16 md:h-10 bg-white/10 rounded flex flex-col justify-center px-2 border border-white/20">
            <div className="h-0.5 md:h-1 w-full bg-[#f7b600] rounded-full mb-1"></div>
            <div className="text-[8px] md:text-[10px] font-black italic text-white uppercase tracking-tighter">VISA</div>
        </div>
    ),
    mastercard: () => (
        <div className="flex -space-x-4 md:-space-x-5">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#EB001B] opacity-90"></div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F79E1B] opacity-90"></div>
        </div>
    ),
    google: () => (
        <div className="w-12 h-8 md:w-14 md:h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
            <span className="font-bold text-gray-500 text-xs md:text-sm">G Pay</span>
        </div>
    ),
    amazon: () => (
        <div className="w-12 h-8 md:w-14 md:h-10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white">
                <path d="M5 10L12 6L19 10V14L12 18L5 14V10Z" strokeWidth="2" strokeLinejoin="round" />
                <path d="M5 10L12 14L19 10" strokeWidth="2" strokeLinejoin="round" />
            </svg>
        </div>
    )
} as const;
