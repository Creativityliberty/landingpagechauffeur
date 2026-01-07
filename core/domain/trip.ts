/**
 * TRIP DOMAIN ENTITY
 * Business rules for a VTC trip request
 */

export type TripType = 'local' | 'airport' | 'long' | 'pro';

export interface TripRequest {
    type: TripType;
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    passengers: number;
}

export interface PriceEstimate {
    amount: number;
    rule: string;
    currency: string;
}

export class Trip {
    constructor(public readonly request: TripRequest) { }

    isValid(): boolean {
        return (
            this.request.pickup.length > 0 &&
            this.request.dropoff.length > 0 &&
            this.request.date.length > 0 &&
            this.request.time.length > 0
        );
    }

    isNightOrWeekend(): boolean {
        if (!this.request.date || !this.request.time) return false;

        const d = new Date(`${this.request.date}T${this.request.time}`);
        const hour = d.getHours();
        const day = d.getDay(); // 0 is Sunday, 6 is Saturday

        return (hour >= 22 || hour < 6 || day === 0 || day === 6);
    }
}
