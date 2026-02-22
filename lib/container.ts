/**
 * Dependency Container (Composition Root)
 * Wires all dependencies together
 * Simple manual DI - no framework needed
 */

import { JoinWaitlistService, CalculatePriceService } from '@/core';
import { InMemoryWaitlistRepository } from '@/infra';

// Singleton instances
const waitlistRepository = new InMemoryWaitlistRepository();

// Pre-wired services
export const container = {
    services: {
        joinWaitlist: new JoinWaitlistService(waitlistRepository),
        calculatePrice: new CalculatePriceService(),
    },
    repositories: {
        waitlist: waitlistRepository,
    },
} as const;

// Type-safe access
export type Container = typeof container;
