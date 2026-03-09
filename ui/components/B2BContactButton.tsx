"use client";

import { useState } from "react";
import { B2BContactModal } from "./B2BContactModal";

interface B2BContactButtonProps {
    className?: string;
    children: React.ReactNode;
}

export function B2BContactButton({ className, children }: B2BContactButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={className}>
                {children}
            </button>
            <B2BContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
