/**
 * Core Module - Public API
 * Export everything that adapters need to consume
 */

// Domain
export * from './domain/waitlist-entry';
export * from './domain/trip';

// Ports
export type { WaitlistRepository } from './ports/waitlist-repository';

// Application Services
export { JoinWaitlistService } from './application/join-waitlist';
export type { JoinWaitlistInput, JoinWaitlistOutput } from './application/join-waitlist';
export { CalculatePriceService } from './application/calculate-price';
