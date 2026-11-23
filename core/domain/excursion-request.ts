/**
 * Domain Entity: Cruise Excursion Request & Port Schedule Safety Validation
 * Pure TypeScript — zero framework dependencies.
 */

export type ExcursionSlug =
  | "etretat-honfleur"
  | "etretat"
  | "honfleur"
  | "mont-saint-michel"
  | "dday-landing-beaches"
  | "custom";

export type GuestCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export function getVehicleCategory(guestsCount: GuestCount): "sedan" | "van" {
  return guestsCount <= 4 ? "sedan" : "van";
}

export type PreferredLanguage =
  | "English"
  | "French"
  | "Spanish"
  | "German"
  | "Other";

export type ScheduleStatus = "comfortable" | "tight" | "insufficient" | "unknown";

export interface ScheduleAssessment {
  status: ScheduleStatus;
  portWindowMinutes: number | null;
  recommendedMinimumMinutes: number;
  estimatedExcursionMinutes: number;
  safetyBufferMinutes: number;
}

export interface ExcursionRequestProps {
  id: string;
  fullName: string;
  email: string;
  phoneOrWhatsapp: string;
  cruiseShipName: string;
  arrivalDate: string;
  shipArrivalTime: string;
  allAboardTime: string;
  preferredExcursion: ExcursionSlug;
  guestsCount: GuestCount;
  preferredLanguage: PreferredLanguage;
  additionalRequests?: string;
  createdAt: Date;
}

const EXCURSION_MINIMUM_MINUTES: Record<
  ExcursionSlug,
  { estimatedMinutes: number; minimumPortMinutes: number }
> = {
  "etretat-honfleur": { estimatedMinutes: 420, minimumPortMinutes: 480 },
  etretat: { estimatedMinutes: 240, minimumPortMinutes: 300 },
  honfleur: { estimatedMinutes: 240, minimumPortMinutes: 300 },
  "dday-landing-beaches": { estimatedMinutes: 480, minimumPortMinutes: 540 },
  "mont-saint-michel": { estimatedMinutes: 540, minimumPortMinutes: 630 },
  custom: { estimatedMinutes: 240, minimumPortMinutes: 300 },
};

function parseTimeToMinutes(timeStr: string): number | null {
  if (!timeStr || !/^\d{2}:\d{2}$/.test(timeStr)) return null;
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }
  return hours * 60 + minutes;
}

/**
 * Assesses whether the requested excursion safely fits within the ship's port call
 * while preserving a 60-minute return buffer before all-aboard time.
 */
export function assessCruiseSchedule(
  shipArrivalTime: string,
  allAboardTime: string,
  excursion: ExcursionSlug,
): ScheduleAssessment {
  const spec = EXCURSION_MINIMUM_MINUTES[excursion];
  const safetyBufferMinutes = 60;
  const arrivalMin = parseTimeToMinutes(shipArrivalTime);
  const allAboardMin = parseTimeToMinutes(allAboardTime);

  if (arrivalMin === null || allAboardMin === null) {
    return {
      status: "unknown",
      portWindowMinutes: null,
      recommendedMinimumMinutes: spec.minimumPortMinutes,
      estimatedExcursionMinutes: spec.estimatedMinutes,
      safetyBufferMinutes,
    };
  }

  // Handle late-evening departures cleanly if all-aboard is same day
  const portWindowMinutes =
    allAboardMin > arrivalMin ? allAboardMin - arrivalMin : 0;

  if (portWindowMinutes <= 0 || portWindowMinutes < spec.estimatedMinutes) {
    return {
      status: "insufficient",
      portWindowMinutes,
      recommendedMinimumMinutes: spec.minimumPortMinutes,
      estimatedExcursionMinutes: spec.estimatedMinutes,
      safetyBufferMinutes,
    };
  }

  if (portWindowMinutes < spec.minimumPortMinutes) {
    return {
      status: "tight",
      portWindowMinutes,
      recommendedMinimumMinutes: spec.minimumPortMinutes,
      estimatedExcursionMinutes: spec.estimatedMinutes,
      safetyBufferMinutes,
    };
  }

  return {
    status: "comfortable",
    portWindowMinutes,
    recommendedMinimumMinutes: spec.minimumPortMinutes,
    estimatedExcursionMinutes: spec.estimatedMinutes,
    safetyBufferMinutes,
  };
}

export class ExcursionRequest {
  private constructor(public readonly props: ExcursionRequestProps) {}

  static create(
    input: Omit<ExcursionRequestProps, "id" | "createdAt">,
  ): ExcursionRequest {
    const email = input.email.trim();
    if (!input.fullName.trim()) {
      throw new Error("Full name is required.");
    }
    if (!email || !email.includes("@")) {
      throw new Error("A valid email address is required.");
    }
    if (!input.phoneOrWhatsapp.trim()) {
      throw new Error("WhatsApp or phone number is required.");
    }
    if (!input.cruiseShipName.trim()) {
      throw new Error("Cruise ship name is required.");
    }
    if (!input.arrivalDate.trim()) {
      throw new Error("Date of arrival in Le Havre is required.");
    }
    if (input.guestsCount < 1 || input.guestsCount > 8) {
      throw new Error("Capacity is 1 to 8 guests (Sedan 1–4 or Van 5–8).");
    }

    return new ExcursionRequest({
      ...input,
      id: crypto.randomUUID(),
      fullName: input.fullName.trim(),
      email,
      phoneOrWhatsapp: input.phoneOrWhatsapp.trim(),
      cruiseShipName: input.cruiseShipName.trim(),
      additionalRequests: input.additionalRequests?.trim() || "",
      createdAt: new Date(),
    });
  }
}
