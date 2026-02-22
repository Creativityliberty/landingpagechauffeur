/**
 * CALCULATE PRICE SERVICE
 * Application Use Case for VTC price estimation
 */

import { CONFIG } from "@/config";
import { PriceEstimate, Trip } from "../domain/trip";

export class CalculatePriceService {
  execute(tripData: Trip): PriceEstimate {
    const { request } = tripData;
    const destination = request.dropoff.toLowerCase();
    const forfait = CONFIG.pricing.forfaits.find((f) =>
      destination.includes(f.match),
    );

    // Détection automatique : si forfait trouvé, utiliser le forfait fixe
    if (forfait) {
      let price = forfait.price;
      let rule = `Forfait fixe garanti vers ${forfait.name}`;

      if (tripData.isNightOrWeekend()) {
        const surcharge = Math.round(
          price * (CONFIG.pricing.nightWeekendPremium - 1),
        );
        price = Math.round(price * CONFIG.pricing.nightWeekendPremium);
        rule += ` • Majoration Nuit/WE (+${surcharge}€)`;
      }

      return {
        amount: price,
        rule: rule,
        currency: "€",
      };
    }

    // Si distance > 50 km sans forfait = longue distance personnalisée
    const distance = request.distance || 15;
    if (distance > 50) {
      return {
        amount: 150,
        rule: "Estimation longue distance personnalisée (contactez-nous pour un devis précis)",
        currency: "€",
      };
    }

    // Tarification locale avec zones
    let zoneSurcharge = 0;
    let zoneLabel = "Zone locale";

    // Déterminer la zone et le forfait hors zone
    if (distance > CONFIG.pricing.zones.local.radius) {
      if (distance <= CONFIG.pricing.zones.zone1.radius) {
        zoneSurcharge = CONFIG.pricing.zones.zone1.surcharge || 0;
        zoneLabel = CONFIG.pricing.zones.zone1.label;
      } else if (distance <= CONFIG.pricing.zones.zone2.radius) {
        zoneSurcharge = CONFIG.pricing.zones.zone2.surcharge || 0;
        zoneLabel = CONFIG.pricing.zones.zone2.label;
      } else if (distance <= CONFIG.pricing.zones.zone3.radius) {
        zoneSurcharge = CONFIG.pricing.zones.zone3.surcharge || 0;
        zoneLabel = CONFIG.pricing.zones.zone3.label;
      }
    }

    // Calcul du prix de base (distance × tarif/km)
    const basePrice = distance * CONFIG.pricing.baseRate;
    let totalPrice =
      Math.max(basePrice, CONFIG.pricing.minPrice) + zoneSurcharge;

    // Majoration nuit/week-end
    let nightWeekendSurcharge = 0;
    let rule = `${distance} km × ${CONFIG.pricing.baseRate}€/km`;

    if (zoneSurcharge > 0) {
      rule += ` + Forfait hors zone (${zoneSurcharge}€)`;
    }

    if (tripData.isNightOrWeekend()) {
      nightWeekendSurcharge = Math.round(
        totalPrice * (CONFIG.pricing.nightWeekendPremium - 1),
      );
      totalPrice = Math.round(totalPrice * CONFIG.pricing.nightWeekendPremium);
      rule += ` • Majoration Nuit/WE (+15%)`;
    }

    return {
      amount: Math.round(totalPrice),
      rule: rule,
      currency: "€",
      breakdown: {
        distance: distance,
        basePrice: Math.round(basePrice),
        zoneSurcharge: zoneSurcharge,
        nightWeekendSurcharge: nightWeekendSurcharge,
        total: Math.round(totalPrice),
      },
    };
  }
}
