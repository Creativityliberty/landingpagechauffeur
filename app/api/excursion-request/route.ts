import { NextResponse } from "next/server";
import { container } from "@/lib/container";
import type {
  ExcursionSlug,
  GuestCount,
  PreferredLanguage,
} from "@/core/domain/excursion-request";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await container.services.submitExcursionRequest.execute({
      fullName: String(body.fullName || ""),
      email: String(body.email || ""),
      phoneOrWhatsapp: String(body.phoneOrWhatsapp || ""),
      cruiseShipName: String(body.cruiseShipName || ""),
      arrivalDate: String(body.arrivalDate || ""),
      shipArrivalTime: String(body.shipArrivalTime || ""),
      allAboardTime: String(body.allAboardTime || ""),
      preferredExcursion: (body.preferredExcursion || "etretat") as ExcursionSlug,
      guestsCount: Number(body.guestsCount || 2) as GuestCount,
      preferredLanguage: (body.preferredLanguage || "English") as PreferredLanguage,
      additionalRequests: body.additionalRequests
        ? String(body.additionalRequests)
        : "",
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to process excursion request.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
