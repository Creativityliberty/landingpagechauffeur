/**
 * Branded HTML Email Templates for CARINE NORMANDY PRIVATE (Resend)
 * - Admin Notification Email
 * - Multilingual Client Confirmation Email (EN / FR / ES / DE)
 */

import type {
  ExcursionRequestProps,
  ScheduleAssessment,
} from "@/core/domain/excursion-request";
import { getVehicleCategory } from "@/core/domain/excursion-request";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildAdminExcursionEmail(
  request: ExcursionRequestProps,
  assessment: ScheduleAssessment
): { subject: string; html: string } {
  const vehicle =
    getVehicleCategory(request.guestsCount) === "sedan"
      ? `Private Sedan (${request.guestsCount} guests)`
      : `Private Van (${request.guestsCount} guests)`;

  const subject = `[Le Havre Shore Request] ${request.preferredExcursion} · ${request.cruiseShipName} (${request.arrivalDate})`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;background:#F4F7FB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0A1628;">
  <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
    <div style="background:#0A1628;padding:24px 28px;border-bottom:3px solid #C8A45D;">
      <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C8A45D;font-weight:700;">CARINE NORMANDY PRIVATE · LE HAVRE PORT</p>
      <h1 style="margin:8px 0 0;font-size:22px;color:#FFFFFF;font-weight:600;">New Private Shore Excursion Request</h1>
    </div>
    <div style="padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#64748B;width:42%;">Guest Name</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(request.fullName)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;">Email</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(request.email)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;">Phone / WhatsApp</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(request.phoneOrWhatsapp)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;">Preferred Language</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(request.preferredLanguage)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;">Cruise Ship</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(request.cruiseShipName)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;">Arrival Date</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(request.arrivalDate)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;">Port Window</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(request.shipArrivalTime)} → ${escapeHtml(request.allAboardTime)} (${escapeHtml(assessment.status)})</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;">Excursion</td><td style="padding:8px 0;font-weight:700;color:#8C6823;">${escapeHtml(request.preferredExcursion)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748B;">Vehicle</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(vehicle)}</td></tr>
      </table>
      ${
        request.additionalRequests
          ? `<div style="margin-top:16px;padding:14px;background:#F8FAFC;border-radius:10px;border:1px solid #E2E8F0;">
              <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#8C6823;font-weight:700;">Guest Notes</p>
              <p style="margin:0;font-size:14px;line-height:1.5;color:#334155;">${escapeHtml(request.additionalRequests)}</p>
            </div>`
          : ""
      }
      <p style="margin:20px 0 0;font-size:12px;color:#64748B;">Request ID: ${escapeHtml(request.id)} · Reply directly to this email to answer ${escapeHtml(request.fullName)}.</p>
    </div>
  </div>
</body>
</html>`.trim();

  return { subject, html };
}

const CLIENT_COPY = {
  French: {
    subject: "Demande d'excursion reçue · CARINE NORMANDY PRIVATE",
    heading: "Votre demande a bien été reçue",
    intro:
      "Merci pour votre confiance. Nous vérifions les horaires d'escale de votre navire et revenons vers vous rapidement avec votre devis personnalisé par véhicule.",
    recapTitle: "Récapitulatif de votre demande",
    footer:
      "Prise en charge directe au Terminal Croisière du Havre · Retour adapté à votre heure limite à bord.",
  },
  Spanish: {
    subject: "Solicitud recibida · CARINE NORMANDY PRIVATE",
    heading: "Hemos recibido su solicitud",
    intro:
      "Gracias por contactarnos. Estamos revisando la ventana de escala de su crucero y le enviaremos su presupuesto personalizado por vehículo muy pronto.",
    recapTitle: "Resumen de su solicitud",
    footer:
      "Recogida directa en la terminal de cruceros de Le Havre · Regreso garantizado antes del embarque.",
  },
  German: {
    subject: "Anfrage erhalten · CARINE NORMANDY PRIVATE",
    heading: "Vielen Dank für Ihre Anfrage",
    intro:
      "Wir prüfen aktuell die Liegezeiten Ihres Kreuzfahrtschiffes und melden uns in Kürze mit Ihrem persönlichen Festpreis-Angebot pro Fahrzeug.",
    recapTitle: "Ihre Reisedaten im Überblick",
    footer:
      "Direkte Abholung am Kreuzfahrtterminal Le Havre · Pünktliche Rückkehr vor Abfahrt.",
  },
  English: {
    subject: "Shore Excursion Request Received · CARINE NORMANDY PRIVATE",
    heading: "We Have Received Your Request",
    intro:
      "Thank you for reaching out. We are reviewing your cruise ship's port schedule and will reply shortly with your personalized per-vehicle quotation.",
    recapTitle: "Request Summary",
    footer:
      "Direct pick-up at Le Havre Cruise Terminal · Return timed safely to your ship's all-aboard schedule.",
  },
} as const;

export function buildClientConfirmationEmail(
  request: ExcursionRequestProps
): { subject: string; html: string } {
  const langKey =
    request.preferredLanguage in CLIENT_COPY
      ? (request.preferredLanguage as keyof typeof CLIENT_COPY)
      : "English";
  const copy = CLIENT_COPY[langKey];

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;background:#F4F7FB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0A1628;">
  <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
    <div style="background:#0A1628;padding:26px 28px;border-bottom:3px solid #C8A45D;">
      <p style="margin:0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C8A45D;font-weight:700;">CARINE NORMANDY PRIVATE</p>
      <h1 style="margin:8px 0 0;font-size:22px;color:#FFFFFF;font-weight:600;">${escapeHtml(copy.heading)}</h1>
    </div>
    <div style="padding:24px 28px;">
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#334155;">
        ${escapeHtml(request.fullName)},<br /><br />${escapeHtml(copy.intro)}
      </p>
      <div style="padding:16px;background:#F8FAFC;border-radius:12px;border:1px solid #E2E8F0;">
        <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8C6823;font-weight:700;">${escapeHtml(copy.recapTitle)}</p>
        <p style="margin:4px 0;font-size:14px;"><strong>Ship:</strong> ${escapeHtml(request.cruiseShipName)}</p>
        <p style="margin:4px 0;font-size:14px;"><strong>Date:</strong> ${escapeHtml(request.arrivalDate)} (${escapeHtml(request.shipArrivalTime)} → ${escapeHtml(request.allAboardTime)})</p>
        <p style="margin:4px 0;font-size:14px;"><strong>Excursion:</strong> ${escapeHtml(request.preferredExcursion)}</p>
        <p style="margin:4px 0;font-size:14px;"><strong>Guests:</strong> ${request.guestsCount}</p>
      </div>
      <p style="margin:20px 0 0;font-size:12px;color:#64748B;">${escapeHtml(copy.footer)}</p>
    </div>
  </div>
</body>
</html>`.trim();

  return { subject: copy.subject, html };
}
