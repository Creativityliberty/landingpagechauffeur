"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
    initial: { "--x": "100%", scale: 0.8 },
    animate: { "--x": "-100%", scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 1,
        type: "spring" as const,
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring" as const,
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
};

interface ShinyButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const ShinyButton = ({ children, className, onClick }: ShinyButtonProps) => {
    return (
        <motion.button
            {...animationProps}
            onClick={onClick}
            className={cn(
                "relative rounded-xl px-8 py-4 font-black backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl dark:bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.1)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]",
                className,
            )}
        >
            <span
                className="relative block h-full w-full text-sm uppercase tracking-widest text-[rgb(0,0,0,0.65)] dark:text-[rgb(255,255,255,0.9)]"
                style={{
                    maskImage:
                        "linear-gradient(-75deg,#D4AF37 calc(var(--x) + 20%),transparent calc(var(--x) + 30%),#D4AF37 calc(var(--x) + 100%))",
                }}
            >
                {children}
            </span>
            <span
                style={{
                    mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
                    maskComposite: "exclude",
                }}
                className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(212,175,55,0.1)_calc(var(--x)+20%),rgba(212,175,55,0.5)_calc(var(--x)+25%),rgba(212,175,55,0.1)_calc(var(--x)+100%))] p-px"
            ></span>
        </motion.button>
    );
};
