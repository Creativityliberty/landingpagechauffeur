/**
 * Animation Variants (Framer Motion)
 * Réutilisables dans tous les composants
 */

import type { Transition, Variant, Variants } from 'framer-motion';

type EaseType = "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate";

export const anim = {
    pulse: {
        scale: [1, 1.03, 1] as number[],
        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as EaseType }
    },
    rubberBand: {
        scaleX: [1, 1.15, 0.85, 1.1, 0.95, 1.05, 1] as number[],
        scaleY: [1, 0.85, 1.15, 0.95, 1.05, 0.95, 1] as number[],
        transition: { duration: 0.7 }
    },
    tada: {
        scale: [1, 0.95, 1.05, 1.05, 1.05, 1] as number[],
        rotate: [0, -2, 2, -2, 2, 0] as number[],
        transition: { duration: 0.6 }
    },
    backInUp: {
        initial: { y: 60, scale: 0.9, opacity: 0 },
        animate: { y: 0, scale: 1, opacity: 1 },
        transition: { type: "spring" as const, damping: 20, stiffness: 100 }
    },
    fadeInUp: {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.6, ease: "easeOut" as EaseType }
    },
    zoomIn: {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { type: "spring" as const, damping: 15, stiffness: 80 }
    }
};
