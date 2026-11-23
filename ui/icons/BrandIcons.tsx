import React from "react";

interface BrandCrestProps {
  className?: string;
  size?: number;
}

/**
 * Custom Maritime Compass & Monogram Crest for CARINE NORMANDY PRIVATE
 */
export function BrandCrest({ className = "", size = 24 }: BrandCrestProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeOpacity="0.45"
      />
      <circle
        cx="32"
        cy="32"
        r="23"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
        strokeOpacity="0.45"
      />
      {/* Four-point maritime compass star */}
      <path
        d="M32 6L35.2 28.8L58 32L35.2 35.2L32 58L28.8 35.2L6 32L28.8 28.8L32 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <circle cx="32" cy="32" r="4.5" fill="currentColor" />
    </svg>
  );
}
