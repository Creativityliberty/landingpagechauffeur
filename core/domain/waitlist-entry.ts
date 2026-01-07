/**
 * Waitlist Entry - Domain Entity
 * Pure business object, no dependencies on external frameworks
 */

export interface WaitlistEntry {
    id: string;
    email: string;
    createdAt: Date;
    status: WaitlistStatus;
}

export type WaitlistStatus = 'pending' | 'confirmed' | 'unsubscribed';

/**
 * Domain validation rules
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function createWaitlistEntry(email: string): WaitlistEntry {
    if (!isValidEmail(email)) {
        throw new WaitlistValidationError('Invalid email format');
    }

    return {
        id: crypto.randomUUID(),
        email: email.toLowerCase().trim(),
        createdAt: new Date(),
        status: 'pending',
    };
}

/**
 * Domain Error
 */
export class WaitlistValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'WaitlistValidationError';
    }
}
