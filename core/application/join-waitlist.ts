/**
 * Join Waitlist - Use Case / Service
 * Orchestrates the business logic, uses ports for external dependencies
 */

import { createWaitlistEntry, WaitlistValidationError } from '../domain/waitlist-entry';
import type { WaitlistRepository } from '../ports/waitlist-repository';

export interface JoinWaitlistInput {
    email: string;
}

export interface JoinWaitlistOutput {
    success: boolean;
    message: string;
    position?: number;
}

export class JoinWaitlistService {
    constructor(private readonly repository: WaitlistRepository) { }

    async execute(input: JoinWaitlistInput): Promise<JoinWaitlistOutput> {
        // Check if already registered
        const existing = await this.repository.findByEmail(input.email.toLowerCase().trim());
        if (existing) {
            return {
                success: false,
                message: 'This email is already on the waitlist',
            };
        }

        // Create domain entity (validates internally)
        try {
            const entry = createWaitlistEntry(input.email);
            await this.repository.save(entry);

            const position = await this.repository.count();

            return {
                success: true,
                message: "You're on the list! We'll notify you soon.",
                position,
            };
        } catch (error) {
            if (error instanceof WaitlistValidationError) {
                return {
                    success: false,
                    message: error.message,
                };
            }
            throw error;
        }
    }
}
