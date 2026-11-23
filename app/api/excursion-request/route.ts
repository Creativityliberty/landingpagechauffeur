import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONFIG } from "@/config";
import { container } from "@/lib/container";
import {
  buildAdminExcursionEmail,
  buildClientConfirmationEmail,
} from "@/lib/email/excursion-emails";
import type {
  ExcursionRequestProps,
  ExcursionSlug,
  GuestCount,
  PreferredLanguage,
} from "@/core/domain/excursion-request";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const input = {
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
    };

    const result = await container.services.submitExcursionRequest.execute(input);

    const requestProps: ExcursionRequestProps = {
      id: result.requestId,
      ...input,
      createdAt: new Date(result.submittedAt),
    };

    const resendApiKey = process.env.RESEND_API_KEY;
    let adminEmailId: string | null = null;
    let clientEmailId: string | null = null;
    let emailWarning: string | null = null;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const fromEmail =
        process.env.RESEND_FROM_EMAIL ||
        "CARINE NORMANDY PRIVATE <onboarding@resend.dev>";
      const adminTo = process.env.RESEND_TO_EMAIL || CONFIG.contact.email;

      const adminMail = buildAdminExcursionEmail(
        requestProps,
        result.scheduleAssessment
      );
      const { data: adminData, error: adminError } =
        await resend.emails.send({
          from: fromEmail,
          to: [adminTo],
          replyTo: requestProps.email,
          subject: adminMail.subject,
          html: adminMail.html,
        });

      if (adminError) {
        console.error("[Resend admin send error]", adminError);
        emailWarning = adminError.message;
      } else {
        adminEmailId = adminData?.id ?? null;
      }

      const clientMail = buildClientConfirmationEmail(requestProps);
      const { data: clientData, error: clientError } =
        await resend.emails.send({
          from: fromEmail,
          to: [requestProps.email],
          replyTo: adminTo,
          subject: clientMail.subject,
          html: clientMail.html,
        });

      if (clientError) {
        console.error("[Resend client confirmation error]", clientError);
        if (!emailWarning) emailWarning = clientError.message;
      } else {
        clientEmailId = clientData?.id ?? null;
      }
    }

    return NextResponse.json({
      success: true,
      ...result,
      emailDelivery: {
        configured: Boolean(resendApiKey),
        adminEmailId,
        clientEmailId,
        warning: emailWarning,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to process excursion request.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
