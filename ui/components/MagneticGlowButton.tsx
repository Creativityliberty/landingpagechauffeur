"use client";

/**
 * MagneticGlowButton — Interactive cursor-tracking spotlight button
 * with smooth background & text color inversion on hover.
 * Hardware-accelerated via Framer Motion values (60fps, zero re-renders).
 */

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export type MagneticGlowVariant = "gold" | "navy" | "glass" | "outline";

export interface MagneticGlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: MagneticGlowVariant;
  glowColor?: string;
  glowSize?: number;
  className?: string;
  ariaLabel?: string;
}

const variantClasses: Record<MagneticGlowVariant, string> = {
  gold: "bg-[#C8A45D] text-[#06101E] border-[#C8A45D] hover:bg-[#0A1628] hover:text-[#F8FAFC] hover:border-[#C8A45D]/70 shadow-lg shadow-[#0A1628]/15",
  navy: "bg-[#0A1628] text-white border-[#0A1628] hover:bg-[#C8A45D] hover:text-[#06101E] hover:border-[#C8A45D] shadow-lg shadow-[#0A1628]/15",
  glass:
    "bg-[#06101E]/65 text-white border-white/25 backdrop-blur-md hover:bg-[#C8A45D] hover:text-[#06101E] hover:border-[#C8A45D]",
  outline:
    "bg-transparent text-[#0A1628] border-[#0B192C]/20 hover:bg-[#0A1628] hover:text-white hover:border-[#0A1628]",
};

export function MagneticGlowButton({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  variant = "gold",
  glowColor,
  glowSize = 130,
  className = "",
  ariaLabel,
}: MagneticGlowButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const magnetX = useSpring(0, { stiffness: 260, damping: 22 });
  const magnetY = useSpring(0, { stiffness: 260, damping: 22 });
  const glowOpacity = useMotionValue(0);

  const defaultGlow =
    variant === "navy" || variant === "glass"
      ? "rgba(255, 255, 255, 0.35)"
      : "rgba(200, 164, 93, 0.45)";
  const resolvedGlow = glowColor ?? defaultGlow;

  const spotlightBg = useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${resolvedGlow}, transparent 70%)`;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    glowOpacity.set(1);

    if (!prefersReducedMotion) {
      const pullX = (x / rect.width - 0.5) * 5;
      const pullY = (y / rect.height - 0.5) * 4;
      magnetX.set(pullX);
      magnetY.set(pullY);
    }
  };

  const handleMouseLeave = () => {
    glowOpacity.set(0);
    magnetX.set(0);
    magnetY.set(0);
  };

  const sharedClasses = `group relative overflow-hidden border transition-colors duration-300 ease-out active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`;

  const innerContent = (
    <>
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: spotlightBg,
            opacity: glowOpacity,
          }}
        />
      )}
      <span className="relative z-10 inline-flex w-full items-center justify-between gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <motion.div
          style={prefersReducedMotion ? undefined : { x: magnetX, y: magnetY }}
          className="inline-flex"
        >
          <Link
            href={href}
            onClick={onClick}
            aria-label={ariaLabel}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={sharedClasses}
          >
            {innerContent}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        style={prefersReducedMotion ? undefined : { x: magnetX, y: magnetY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={sharedClasses}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      style={prefersReducedMotion ? undefined : { x: magnetX, y: magnetY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={sharedClasses}
    >
      {innerContent}
    </motion.button>
  );
}
