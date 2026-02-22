"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
                className
            )}
        >
            <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {/* Beam 1 */}
            <motion.div
                initial={{ opacity: 0, x: -100, y: -100 }}
                animate={{ opacity: [0, 1, 1, 0], x: 500, y: 500 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute h-[500px] w-[500px] bg-gradient-to-br from-[#D4AF37]/20 to-transparent blur-[120px] rounded-full"
            />
            {/* Beam 2 */}
            <motion.div
                initial={{ opacity: 0, x: 800, y: 0 }}
                animate={{ opacity: [0, 0.8, 0.8, 0], x: -200, y: 600 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute h-[600px] w-[600px] bg-gradient-to-bl from-[#D4AF37]/10 to-transparent blur-[150px] rounded-full"
            />
        </div>
    );
};
