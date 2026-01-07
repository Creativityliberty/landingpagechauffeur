/**
 * In-Memory Waitlist Repository
 * Concrete implementation of the WaitlistRepository port
 * For demo/prototype purposes - swap with DB implementation later
 */

import type { WaitlistEntry } from '@/core/domain/waitlist-entry';
import type { WaitlistRepository } from '@/core/ports/waitlist-repository';

// In-memory storage (persists only during runtime)
const storage = new Map<string, WaitlistEntry>();

export class InMemoryWaitlistRepository implements WaitlistRepository {
    async save(entry: WaitlistEntry): Promise<void> {
        storage.set(entry.email, entry);
    }

    async findByEmail(email: string): Promise<WaitlistEntry | null> {
        return storage.get(email.toLowerCase().trim()) ?? null;
    }

    async findAll(): Promise<WaitlistEntry[]> {
        return Array.from(storage.values());
    }

    async count(): Promise<number> {
        return storage.size;
    }
}
