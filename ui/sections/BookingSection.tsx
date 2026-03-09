"use client";

/**
 * Booking Section - Booking form with detailed price estimation
 */

import { CONFIG } from "@/config";
import { calculatePrice, PriceBreakdown } from "@/lib/pricing"; // Import direct logic
import { ShinyButton, AddressAutocomplete } from "@/ui";
import { useJsApiLoader } from "@react-google-maps/api";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  CreditCard,
  MapPin,
  MessageCircle,
  Zap,
  Navigation,
  Loader2,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";

interface BookingSectionProps {
  isDarkMode: boolean;
}

interface FormData {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  distancePickup: number; // Approach
  distanceTrip: number;   // Course
  distanceDropoff: number;// Return
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

const LIBRARIES: ("places")[] = ["places"];
const CENTER_BASE = "Gare du Havre, France";

export function BookingSection({ isDarkMode }: BookingSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  const [formData, setFormData] = useState<FormData>({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    distancePickup: 0,
    distanceTrip: 0,
    distanceDropoff: 0,
  });

  const [estimate, setEstimate] = useState<PriceBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto calculate distances when pickup or dropoff changes
  const updateDistances = useCallback(async (pickup: string, dropoff: string) => {
    if (!pickup || !dropoff || !window.google) return;

    setIsCalculating(true);
    const service = new google.maps.DistanceMatrixService();

    try {
      const response = await service.getDistanceMatrix({
        origins: [CENTER_BASE, pickup, dropoff],
        destinations: [pickup, dropoff, CENTER_BASE],
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(Date.now() + 1000), // trafic maintenant
          trafficModel: google.maps.TrafficModel.BEST_GUESS,
        },
      });

      if (response.rows.length >= 3) {
        // Row 0: Center -> Pickup (Approach)
        const distancePickup = response.rows[0].elements[0].distance.value / 1000;
        // Row 1: Pickup -> Dropoff (Trip)
        const distanceTrip = response.rows[1].elements[1].distance.value / 1000;
        // Row 2: Dropoff -> Center (Return)
        const distanceDropoff = response.rows[2].elements[2].distance.value / 1000;

        setFormData(prev => ({
          ...prev,
          pickup,
          dropoff,
          distancePickup: Math.round(distancePickup * 10) / 10,
          distanceTrip: Math.round(distanceTrip * 10) / 10,
          distanceDropoff: Math.round(distanceDropoff * 10) / 10,
        }));
      }
    } catch (error) {
      console.error("Distance Matrix Error:", error);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  // Recalculate price whenever distances change
  useEffect(() => {
    if (formData.distanceTrip > 0) {
      const result = calculatePrice(
        formData.distancePickup,
        formData.distanceTrip,
        formData.distanceDropoff
      );
      setEstimate(result);
    }
  }, [formData.distancePickup, formData.distanceTrip, formData.distanceDropoff]);

  const calculateEstimate = () => {
    // If user clicks, force update if possible
    if (!formData.distanceTrip) return;
    const result = calculatePrice(
      formData.distancePickup,
      formData.distanceTrip,
      formData.distanceDropoff
    );
    setEstimate(result);
  };

  return (
    <section
      id="reserver"
      className={CONFIG.theme.spacing.section}
      style={{ backgroundColor: theme.surface2 }}
    >
      <div className={CONFIG.theme.spacing.container}>
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-[#D4AF37]/20"
          >
            Réservation
          </motion.div>
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className={`${CONFIG.theme.typography.h2} font-black tracking-tighter mb-6 md:mb-8 leading-[0.9]`}
            style={{ color: theme.text }}
          >
            Réserver Votre Chauffeur
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto opacity-70"
            style={{ color: theme.muted }}
          >
            Saisissez vos adresses pour obtenir un tarif précis et automatique.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Form */}
          <motion.div
            {...fadeInUp}
            className="lg:col-span-7 glass-dark p-8 md:p-16 rounded-[4rem] border shadow-3xl"
            style={{ borderColor: theme.border }}
          >
            {!isLoaded ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
                <p className="font-bold opacity-50">Chargement de Google Maps...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">
                  {/* Pickup Address */}
                  <div className="space-y-3 col-span-1 sm:col-span-2">
                    <label
                      className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block"
                      style={{ color: theme.muted }}
                    >
                      Lieu de départ
                    </label>
                    <AddressAutocomplete
                      placeholder="Adresse complète (Départ)"
                      defaultValue={formData.pickup}
                      onAddressSelect={(address) => {
                        setFormData(prev => ({ ...prev, pickup: address }));
                        if (formData.dropoff) updateDistances(address, formData.dropoff);
                      }}
                      className="w-full border-2 rounded-2xl pl-12 pr-5 py-5 outline-none font-bold text-sm md:text-base focus:border-[#D4AF37]"
                      style={{
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                        color: theme.text,
                      }}
                    />
                  </div>

                  {/* Dropoff Address */}
                  <div className="space-y-3 col-span-1 sm:col-span-2">
                    <label
                      className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block"
                      style={{ color: theme.muted }}
                    >
                      Lieu d&apos;arrivée
                    </label>
                    <AddressAutocomplete
                      placeholder="Aéroport, Gare, Destination..."
                      defaultValue={formData.dropoff}
                      onAddressSelect={(address) => {
                        setFormData(prev => ({ ...prev, dropoff: address }));
                        if (formData.pickup) updateDistances(formData.pickup, address);
                      }}
                      className="w-full border-2 rounded-2xl pl-12 pr-5 py-5 outline-none font-bold text-sm md:text-base focus:border-[#D4AF37]"
                      style={{
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                        color: theme.text,
                      }}
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-3">
                    <label
                      className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block"
                      style={{ color: theme.muted }}
                    >
                      Date du trajet
                    </label>
                    <input
                      type="date"
                      className="w-full border-2 rounded-2xl px-6 py-5 outline-none font-bold text-sm md:text-base focus:border-[#D4AF37]"
                      style={{
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                        color: theme.text,
                      }}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-3">
                    <label
                      className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] block"
                      style={{ color: theme.muted }}
                    >
                      Heure de prise en charge
                    </label>
                    <input
                      type="time"
                      className="w-full border-2 rounded-2xl px-6 py-5 outline-none font-bold text-sm md:text-base focus:border-[#D4AF37]"
                      style={{
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                        color: theme.text,
                      }}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-2 border-t pt-8 mt-4 hidden" style={{ borderColor: theme.border }}>
                    {/* Distances Hidden - Logic remains for calculation */}
                  </div>

                </div>

                <ShinyButton
                  onClick={calculateEstimate}
                  disabled={isCalculating}
                  className={`w-full shadow-xl ${isDarkMode
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-black text-white hover:bg-gray-900"
                    } ${isCalculating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-center gap-4">
                    {isCalculating ? "CALCUL..." : "ÉVALUER LE TRAJET"} <ArrowRight size={26} />
                  </div>
                </ShinyButton>
              </>
            )}
          </motion.div>

          {/* Estimate Display */}
          <div className="lg:col-span-5 flex flex-col gap-8 h-full">
            <AnimatePresence mode="wait">
              {estimate ? (
                <motion.div
                  key="est"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 md:p-16 rounded-[4rem] border-2 border-[#D4AF37]/40 flex-1 relative overflow-hidden shadow-3xl"
                  style={{ backgroundColor: theme.surface }}
                >
                  <div
                    className="text-5xl md:text-8xl font-black mb-4 tracking-tighter"
                    style={{ color: theme.text }}
                  >
                    {estimate.total.toFixed(2)}
                    <span className="text-xl md:text-3xl ml-2 text-[#D4AF37]">
                      €
                    </span>
                  </div>
                  <p
                    className="text-sm md:text-lg font-medium opacity-80 mb-6 leading-relaxed italic"
                    style={{ color: theme.muted }}
                  >
                    &quot;Tarif fixe et garanti, incluant le trafic en temps réel&quot;
                  </p>

                  {/* Plus d'affichage de distance ici */}

                  <div className="space-y-5">
                    <button className="w-full py-6 bg-[#D4AF37] text-black rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 shadow-2xl shadow-[#D4AF37]/30 hover:bg-[#E1C45A] transition-all">
                      <CreditCard size={22} /> RÉSERVER & PAYER (CB)
                    </button>
                    <button
                      onClick={() => {
                        const message = encodeURIComponent(
                          `*NOUVELLE RÉSERVATION*\n\n` +
                          `📍 *Départ:* ${formData.pickup}\n` +
                          `🏁 *Arrivée:* ${formData.dropoff}\n` +
                          `📅 *Date:* ${formData.date}\n` +
                          `🕒 *Heure:* ${formData.time}\n\n` +

                          `💰 *Tarif Fixe Garanti:* ${estimate.total.toFixed(2)}€\n\n` +
                          `Je souhaite confirmer cette réservation.`
                        );
                        window.open(
                          `https://wa.me/${CONFIG.contact.whatsapp}?text=${message}`,
                          "_blank",
                        );
                      }}
                      className={`w-full py-6 border-2 rounded-2xl font-black text-lg md:text-xl flex items-center justify-center gap-3 transition-all ${isDarkMode
                        ? "border-white/20 text-white hover:bg-white/5 hover:border-white/30"
                        : "border-black/20 text-black hover:bg-black/5 hover:border-black/30"
                        }`}
                    >
                      <MessageCircle size={22} className="text-[#25D366]" />{" "}
                      PAYER EN ESPÈCES
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div
                  className="h-full border-2 border-dashed rounded-[4rem] flex flex-col items-center justify-center text-center p-12 min-h-[400px]"
                  style={{ borderColor: theme.border }}
                >
                  <Zap
                    size={40}
                    className="opacity-20 mb-10"
                    style={{ color: theme.text }}
                  />
                  <p
                    className="text-lg md:text-xl font-medium leading-relaxed opacity-40 max-w-xs"
                    style={{ color: theme.muted }}
                  >
                    Choisissez vos adresses pour obtenir votre tarif immédiat.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
