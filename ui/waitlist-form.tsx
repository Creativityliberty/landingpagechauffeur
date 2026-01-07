'use client';

/**
 * Waitlist Form Component
 * UI only - no business logic, calls API endpoint
 */

import { useState, FormEvent } from 'react';

interface WaitlistFormProps {
    className?: string;
}

export function WaitlistForm({ className = '' }: WaitlistFormProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [position, setPosition] = useState<number | null>(null);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage(data.message);
                setPosition(data.position);
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.message);
            }
        } catch {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    }

    return (
        <div className={className}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={status === 'loading'}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-6 py-2.5 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
                    >
                        {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                    </button>
                </div>

                {status === 'success' && (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        {message}
                        {position && <span className="text-muted-foreground">(#{position})</span>}
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-sm text-red-600 dark:text-red-400">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}
