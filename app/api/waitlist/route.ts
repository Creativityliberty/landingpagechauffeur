/**
 * Waitlist API Route Handler
 * HTTP Adapter - only handles HTTP concerns, delegates to service
 */

import { container } from '@/lib';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Email is required' },
                { status: 400 }
            );
        }

        // Delegate to service
        const result = await container.services.joinWaitlist.execute({ email });

        return NextResponse.json(result, {
            status: result.success ? 201 : 400,
        });
    } catch (error) {
        console.error('Waitlist API error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const entries = await container.repositories.waitlist.findAll();
        const count = await container.repositories.waitlist.count();

        return NextResponse.json({
            count,
            entries: entries.map((e) => ({
                email: e.email,
                status: e.status,
                createdAt: e.createdAt,
            })),
        });
    } catch (error) {
        console.error('Waitlist API error:', error);
        return NextResponse.json(
            { success: false, message: 'An error occurred' },
            { status: 500 }
        );
    }
}
