"use client";

/**
 * Stepped Cruise Passenger Booking & Personalized Quotation Section
 * Features Visual Excursion Chips (inspired by lehavrecruisetransfers.com) + Live Port Window Safety Check.
 */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Ship,
} from "lucide-react";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import {
  assessCruiseSchedule,
  ExcursionSlug,
  GuestCount,
  PreferredLanguage,
} from "@/core/domain/excursion-request";

interface BookingSectionProps {
  isDarkMode: boolean;
  initialExcursion?: ExcursionSlug;
  headingAs?: "h1" | "h2";
}

export function BookingSection({
  isDarkMode,
  initialExcursion,
  headingAs = "h2",
}: BookingSectionProps) {
  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;
  const { t, selectedExcursion } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneOrWhatsapp, setPhoneOrWhatsapp] = useState("");
  const [cruiseShipName, setCruiseShipName] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [shipArrivalTime, setShipArrivalTime] = useState("08:00");
  const [allAboardTime, setAllAboardTime] = useState("18:00");
  const [preferredExcursion, setPreferredExcursion] = useState<ExcursionSlug>(
    initialExcursion || selectedExcursion || "etretat-honfleur",
  );
  const [guestsCount, setGuestsCount] = useState<GuestCount>(2);
  const [preferredLanguage, setPreferredLanguage] =
    useState<PreferredLanguage>("English");
  const [additionalRequests, setAdditionalRequests] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (initialExcursion) {
      setPreferredExcursion(initialExcursion);
    } else if (selectedExcursion) {
      setPreferredExcursion(selectedExcursion);
    }
  }, [initialExcursion, selectedExcursion]);

  const scheduleAssessment = useMemo(
    () =>
      assessCruiseSchedule(shipArrivalTime, allAboardTime, preferredExcursion),
    [shipArrivalTime, allAboardTime, preferredExcursion],
  );

  const selectedExcursionLabel =
    t.booking.excursionOptions.find((o) => o.value === preferredExcursion)
      ?.label || preferredExcursion;

  const formatHours = (minutes: number | null) => {
    if (minutes === null || minutes <= 0) return "—";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h${m > 0 ? `${m.toString().padStart(2, "0")}` : "00"}`;
  };

  const buildWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello ${CONFIG.brand.name}! I would like to request a private shore excursion from Le Havre Cruise Port:\n\n` +
        `- Name: ${fullName || "Not specified"}\n` +
        `- Email: ${email || "Not specified"}\n` +
        `- Ship: ${cruiseShipName || "Not specified"}\n` +
        `- Arrival Date: ${arrivalDate || "Not specified"}\n` +
        `- Ship Arrival: ${shipArrivalTime} | All Aboard: ${allAboardTime}\n` +
        `- Excursion: ${selectedExcursionLabel}\n` +
        `- Guests: ${guestsCount} (Private Sedan)\n` +
        `- Preferred Language: ${preferredLanguage}\n` +
        (additionalRequests ? `- Notes: ${additionalRequests}\n` : "") +
        `\nPlease let me know availability and a personalized quotation.`,
    );
    return `https://wa.me/${CONFIG.contact.whatsapp}?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/excursion-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phoneOrWhatsapp,
          cruiseShipName,
          arrivalDate,
          shipArrivalTime,
          allAboardTime,
          preferredExcursion,
          guestsCount,
          preferredLanguage,
          additionalRequests,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Please check all required fields.");
      }

      setSubmittedRequestId(data.requestId);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    backgroundColor: isDarkMode ? "#06101E" : "#F8FAFC",
    borderColor: theme.border,
    color: theme.text,
  };

  return (
    <section
      id="booking"
      className={`${CONFIG.theme.spacing.section} dot-grid`}
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div className={CONFIG.theme.spacing.container}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.22em] mb-4 border"
            style={{
              backgroundColor: theme.accentBgSoft,
              borderColor: theme.border,
              color: theme.accentText,
            }}
          >
            {t.booking.eyebrow}
          </div>
          {headingAs === "h1" ? (
            <h1
              className={`font-editorial ${CONFIG.theme.typography.h2} tracking-tight leading-[1.04] mb-4`}
            >
              <span className="font-normal">{t.booking.titleLead} </span>
              <span
                className="font-bold italic"
                style={{ color: theme.accentText }}
              >
                {t.booking.titleAccent}
              </span>
            </h1>
          ) : (
            <h2
              className={`font-editorial ${CONFIG.theme.typography.h2} tracking-tight leading-[1.04] mb-4`}
            >
              <span className="font-normal">{t.booking.titleLead} </span>
              <span
                className="font-bold italic"
                style={{ color: theme.accentText }}
              >
                {t.booking.titleAccent}
              </span>
            </h2>
          )}
          <p className="text-base md:text-lg" style={{ color: theme.muted }}>
            {t.booking.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: CONFIG.theme.animations.ease }}
            className="lg:col-span-7 p-1.5 rounded-[2rem] ring-1"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(11,25,44,0.04)",
              borderColor: theme.border,
            }}
          >
            <div
              className="rounded-[calc(2rem-0.375rem)] p-6 sm:p-8 md:p-10 space-y-8"
              style={{ backgroundColor: theme.surface }}
            >
              {/* Visual Excursion Picker Chips */}
              <div className="space-y-3">
                <label
                  htmlFor="preferredExcursion"
                  className="text-xs font-bold uppercase tracking-[0.2em] block"
                  style={{ color: theme.accentText }}
                >
                  {t.booking.fields.preferredExcursion} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {t.booking.excursionOptions.map((opt) => {
                    const isSelected = preferredExcursion === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setPreferredExcursion(opt.value as ExcursionSlug)
                        }
                        className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#C8A45D] text-[#06101E] border-[#C8A45D] shadow-md"
                            : "hover:border-[#C8A45D]/60"
                        }`}
                        style={
                          isSelected
                            ? undefined
                            : {
                                backgroundColor: isDarkMode
                                  ? "#06101E"
                                  : "#F8FAFC",
                                borderColor: theme.border,
                                color: theme.text,
                              }
                        }
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                {/* Sync hidden/accessible select for form accessibility & testing */}
                <select
                  id="preferredExcursion"
                  value={preferredExcursion}
                  onChange={(e) =>
                    setPreferredExcursion(e.target.value as ExcursionSlug)
                  }
                  className="sr-only"
                  aria-label={t.booking.fields.preferredExcursion}
                >
                  {t.booking.excursionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Group 1: Cruise Schedule */}
              <div
                className="space-y-4 pt-4 border-t"
                style={{ borderColor: theme.borderSubtle }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: theme.accentText }}
                >
                  {t.booking.sectionCruise}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="cruiseShipName"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.cruiseShipName} *
                    </label>
                    <input
                      id="cruiseShipName"
                      type="text"
                      required
                      value={cruiseShipName}
                      onChange={(e) => setCruiseShipName(e.target.value)}
                      placeholder={t.booking.placeholders.cruiseShipName}
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="arrivalDate"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.arrivalDate} *
                    </label>
                    <input
                      id="arrivalDate"
                      type="date"
                      required
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="shipArrivalTime"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.shipArrivalTime} *
                    </label>
                    <input
                      id="shipArrivalTime"
                      type="time"
                      required
                      value={shipArrivalTime}
                      onChange={(e) => setShipArrivalTime(e.target.value)}
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="allAboardTime"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.allAboardTime} *
                    </label>
                    <input
                      id="allAboardTime"
                      type="time"
                      required
                      value={allAboardTime}
                      onChange={(e) => setAllAboardTime(e.target.value)}
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Guests & Language */}
              <div
                className="space-y-4 pt-4 border-t"
                style={{ borderColor: theme.borderSubtle }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: theme.accentText }}
                >
                  {t.booking.sectionTrip}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="guestsCount"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.guestsCount} *
                    </label>
                    <select
                      id="guestsCount"
                      value={guestsCount}
                      onChange={(e) =>
                        setGuestsCount(Number(e.target.value) as GuestCount)
                      }
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    >
                      {t.booking.guestOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="preferredLanguage"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.preferredLanguage} *
                    </label>
                    <select
                      id="preferredLanguage"
                      value={preferredLanguage}
                      onChange={(e) =>
                        setPreferredLanguage(
                          e.target.value as PreferredLanguage,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    >
                      {t.booking.languageOptions.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Group 3: Contact */}
              <div
                className="space-y-4 pt-4 border-t"
                style={{ borderColor: theme.borderSubtle }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: theme.accentText }}
                >
                  {t.booking.sectionContact}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.fullName} *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.booking.placeholders.fullName}
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.email} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.booking.placeholders.email}
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="phoneOrWhatsapp"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.phoneOrWhatsapp} *
                    </label>
                    <input
                      id="phoneOrWhatsapp"
                      type="tel"
                      required
                      value={phoneOrWhatsapp}
                      onChange={(e) => setPhoneOrWhatsapp(e.target.value)}
                      placeholder={t.booking.placeholders.phoneOrWhatsapp}
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors"
                      style={inputStyle}
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label
                      htmlFor="additionalRequests"
                      className="text-xs font-semibold block"
                      style={{ color: theme.muted }}
                    >
                      {t.booking.fields.additionalRequests}
                    </label>
                    <textarea
                      id="additionalRequests"
                      rows={3}
                      value={additionalRequests}
                      onChange={(e) => setAdditionalRequests(e.target.value)}
                      placeholder={t.booking.placeholders.additionalRequests}
                      className="w-full rounded-xl border px-4 py-3 text-sm font-medium focus:border-[#C8A45D] transition-colors resize-none"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              {submittedRequestId && (
                <div className="p-5 rounded-2xl bg-[#16A34A]/10 border border-[#16A34A]/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#16A34A] font-bold">
                    <CheckCircle2 size={18} />
                    <span>{t.booking.successTitle}</span>
                  </div>
                  <p className="text-sm" style={{ color: theme.muted }}>
                    {t.booking.successBody}
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-between pl-7 pr-2.5 py-2.5 rounded-full bg-[#C8A45D] hover:bg-[#D9B873] text-[#06101E] font-bold text-sm md:text-base tracking-wide transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting && (
                      <Loader2 size={16} className="animate-spin" />
                    )}
                    {isSubmitting ? t.booking.submitting : t.booking.submitCta}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#06101E]/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={18} />
                  </span>
                </button>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-full border flex items-center justify-center gap-2.5 text-sm font-semibold hover:border-[#16A34A] transition-colors"
                  style={{ borderColor: theme.border }}
                >
                  <MessageCircle size={17} className="text-[#16A34A]" />
                  <span>{t.booking.whatsappDirect}</span>
                </a>
              </div>
            </div>
          </motion.form>

          {/* Right: Sticky Live Port Schedule Check */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div
              className="p-1.5 rounded-[2rem] ring-1"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(11,25,44,0.04)",
                borderColor: theme.border,
              }}
            >
              <div
                className="rounded-[calc(2rem-0.375rem)] p-7 sm:p-8 space-y-6"
                style={{ backgroundColor: theme.surface }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: theme.accentBgSoft,
                      borderColor: theme.border,
                      color: theme.accentText,
                    }}
                  >
                    <Ship size={18} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-[0.18em]"
                      style={{ color: theme.accentText }}
                    >
                      {t.booking.summaryTitle}
                    </p>
                    <p className="text-sm font-semibold">
                      {cruiseShipName || t.booking.summaryDefaultTerminal}
                    </p>
                  </div>
                </div>

                <div
                  className="p-5 rounded-2xl border space-y-3"
                  style={{
                    borderColor: theme.border,
                    backgroundColor: isDarkMode ? "#06101E" : "#F8FAFC",
                  }}
                >
                  <div className="flex items-center justify-between text-sm gap-2">
                    <span style={{ color: theme.muted }}>
                      {t.booking.summaryLabels.portWindow}
                    </span>
                    <span className="font-bold flex items-center gap-1.5">
                      <Clock size={14} style={{ color: theme.accentText }} />
                      {shipArrivalTime} → {allAboardTime} (
                      {formatHours(scheduleAssessment.portWindowMinutes)})
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm gap-2">
                    <span style={{ color: theme.muted }}>
                      {t.booking.summaryLabels.excursion}
                    </span>
                    <span className="font-semibold text-right">
                      {selectedExcursionLabel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm gap-2">
                    <span style={{ color: theme.muted }}>
                      {t.booking.summaryLabels.vehicle}
                    </span>
                    <span className="font-semibold text-right">
                      {t.booking.summaryLabels.privateSedan} ({guestsCount}{" "}
                      {guestsCount === 1
                        ? t.booking.summaryLabels.guestSingular
                        : t.booking.summaryLabels.guestPlural}
                      )
                    </span>
                  </div>

                  <div
                    className="pt-3 border-t"
                    style={{ borderColor: theme.borderSubtle }}
                  >
                    {scheduleAssessment.status === "comfortable" && (
                      <div className="flex items-start gap-2.5 text-xs font-semibold text-[#16A34A]">
                        <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                        <span>{t.booking.statusMessages.comfortable}</span>
                      </div>
                    )}
                    {scheduleAssessment.status === "tight" && (
                      <div className="flex items-start gap-2.5 text-xs font-semibold text-[#D97706]">
                        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                        <span>{t.booking.statusMessages.tight}</span>
                      </div>
                    )}
                    {scheduleAssessment.status === "insufficient" && (
                      <div className="flex items-start gap-2.5 text-xs font-semibold text-[#DC2626]">
                        <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                        <span>{t.booking.statusMessages.insufficient}</span>
                      </div>
                    )}
                    {scheduleAssessment.status === "unknown" && (
                      <p className="text-xs" style={{ color: theme.muted }}>
                        {t.booking.statusMessages.unknown}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: theme.accentBgSoft,
                    borderColor: theme.border,
                  }}
                >
                  <p className="text-xs sm:text-sm leading-relaxed font-medium">
                    {t.booking.disclaimer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
