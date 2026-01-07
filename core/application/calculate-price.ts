/**
 * CALCULATE PRICE SERVICE
 * Application Use Case for VTC price estimation
 */

import { Trip, PriceEstimate } from '../domain/trip';
import { CONFIG } from '@/config';

export class CalculatePriceService {
    execute(tripData: Trip): PriceEstimate {
        const { request } = tripData;
        let price = CONFIG.pricing.minPrice;
        let rule = "Tarif local estimé par zone";

        const destination = request.dropoff.toLowerCase();
        const forfait = CONFIG.pricing.forfaits.find(f => destination.includes(f.match));

        if (request.type === 'long' || request.type === 'airport') {
            if (forfait) {
                price = forfait.price;
                rule = `Forfait fixe garanti vers ${forfait.name}`;
            } else {
                price = 150;
                rule = "Estimation longue distance personnalisée";
            }
        } else {
            // Local estimation (normalized base for demo)
            price = 18 * CONFIG.pricing.baseRate;
            rule = "Tarif Normandie (Estimation base km)";
        }

        if (tripData.isNightOrWeekend()) {
            price *= CONFIG.pricing.nightWeekendPremium;
            rule += " • Majoration Nuit/WE (+15%)";
        }

        return {
            amount: Math.round(price),
            rule: rule,
            currency: "€"
        };
    }
}
