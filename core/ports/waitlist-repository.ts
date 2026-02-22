/**
 * Waitlist Repository Port
 * Interface that the core expects - implementation is in infra/
 */

import type { WaitlistEntry } from '../domain/waitlist-entry';

export interface WaitlistRepository {
    save(entry: WaitlistEntry): Promise<void>;
    findByEmail(email: string): Promise<WaitlistEntry | null>;
    findAll(): Promise<WaitlistEntry[]>;
    count(): Promise<number>;
}
