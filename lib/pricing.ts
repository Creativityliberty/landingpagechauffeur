/**
 * Calculates the price for a chauffeur trip based on specific distance rules from a reference point (Gare du Havre).
 * 
 * Rules:
 * 1. Base Fee (F): 10€ (Always applied)
 * 2. Approach (A): 0.50€/km for every km > 10km from center to pickup.
 * 3. Client Trip (C):
 *    - 0-50km: 2.00€/km
 *    - 50-100km: 1.50€/km for the portion > 50
 *    - >100km: 1.00€/km for the portion > 100
 * 4. Return (R): 0.50€/km for every km > 10km from center to dropoff.
 * 
 * Total = F + A + C + R
 * 
 * @param distancePickup Distance from center (Le Havre) to pickup location in km.
 * @param distanceTrip Distance of the actual trip with client in km.
 * @param distanceDropoff Distance from center (Le Havre) to dropoff location in km.
 * @returns Detailed price breakdown and total.
 */
export interface PriceBreakdown {
    base: number;
    approach: number;
    trip: number;
    return: number;
    total: number;
}

export function calculatePrice(
    distancePickup: number,
    distanceTrip: number,
    distanceDropoff: number
): PriceBreakdown {
    // 1. Base Fee
    const base = 10;

    // 2. Approach: max(0, Dp - 10) * 0.50
    const approachDistance = Math.max(0, distancePickup - 10);
    const approach = approachDistance * 0.50;

    // 3. Client Trip
    let trip = 0;
    if (distanceTrip <= 50) {
        trip = distanceTrip * 2.00;
    } else if (distanceTrip <= 100) {
        trip = (50 * 2.00) + (distanceTrip - 50) * 1.50;
    } else {
        trip = (50 * 2.00) + (50 * 1.50) + (distanceTrip - 100) * 1.00;
    }

    // 4. Return: max(0, Dd - 10) * 0.50
    const returnDistance = Math.max(0, distanceDropoff - 10);
    const returnFee = returnDistance * 0.50;

    const total = base + approach + trip + returnFee;

    return {
        base,
        approach,
        trip,
        return: returnFee,
        total
    };
}
